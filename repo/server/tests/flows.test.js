// Flow-level tests for the three write paths that email a human:
// contact, leads (incl. deck requests) and careers applications.
//
// Hermetic by construction: Supabase and the mailer are replaced at the
// module-cache level BEFORE the Express app is required, so the controllers
// (which destructure their dependencies at require time) pick up the stubs.
// The real email templates are kept, so we assert on rendered HTML.
//
// Covered: happy path (201 + DB write + both emails), validation rejects,
// honeypot swallow (silent 201, no DB write, no email), the deck-request
// flow (loud team subject, deck row, never an attachment) and the
// "email still sent when the DB write fails" guarantee for leads + careers.
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { createRequire } from 'node:module';
import request from 'supertest';

const require = createRequire(import.meta.url);

const MAILER_PATH = require.resolve('../src/utils/mailer.js');
const SUPABASE_PATH = require.resolve('../src/config/supabase.js');

// The real mailer is loaded first: only sendMail is stubbed, the template
// functions (contactNotification, leadNotification, ...) stay real so the
// assertions below run against the HTML the team actually receives.
const realMailer = require(MAILER_PATH);

/* ── Recorders ──────────────────────────────────────────────────────── */

const sent = [];   // every sendMail() call, in order
const writes = []; // every DB insert, in order
let dbMode = 'ok'; // 'ok' | 'fail' | 'missing-column'
let insertCalls = 0;

const mailStub = {
  ...realMailer,
  sendMail: async (options) => {
    sent.push(options);
    return { messageId: 'stub-message-id' };
  },
};

/* A tiny Supabase double: enough chain surface for the controllers
   (insert -> select -> single, and a bare awaited insert) plus storage.
   'missing-column' fails the FIRST insert the way Supabase does when the
   optional intent/asset columns have not been added yet - the controller
   must retry without them and still save the enquiry. */
function builder(table) {
  const state = { row: null };
  const result = () => {
    if (dbMode === 'fail') return { data: null, error: { message: 'stub db failure' } };
    if (dbMode === 'missing-column' && insertCalls === 1) {
      return {
        data: null,
        error: {
          code: '42703',
          message: "Could not find the 'asset' column of 'Leads' in the schema cache",
        },
      };
    }
    if (state.row) writes.push({ table, row: state.row });
    return { data: state.row ? { id: writes.length, ...state.row } : [], error: null };
  };
  const b = {
    select: () => b,
    insert: (row) => { state.row = row; insertCalls += 1; return b; },
    update: () => b,
    upsert: () => b,
    eq: () => b,
    order: () => b,
    limit: () => b,
    single: async () => result(),
    maybeSingle: async () => result(),
    then: (onOk, onErr) => Promise.resolve(result()).then(onOk, onErr),
  };
  return b;
}

const supabaseStub = {
  from: (table) => builder(table),
  storage: {
    from: (_bucket) => ({
      upload: async (key) => (dbMode === 'fail'
        ? { error: { message: 'stub storage failure' } }
        : { data: { path: key }, error: null }),
    }),
  },
};

/* ── App under test ─────────────────────────────────────────────────── */

let app;
const originalMailer = require.cache[MAILER_PATH];
const originalSupabase = require.cache[SUPABASE_PATH];

beforeAll(() => {
  require.cache[MAILER_PATH] = {
    id: MAILER_PATH, filename: MAILER_PATH, loaded: true,
    exports: mailStub, children: [], paths: [],
  };
  require.cache[SUPABASE_PATH] = {
    id: SUPABASE_PATH, filename: SUPABASE_PATH, loaded: true,
    exports: supabaseStub, children: [], paths: [],
  };
  // Required AFTER the stubs are in place: the controllers capture their
  // dependencies at require time.
  app = require('../src/app.js');
});

afterAll(() => {
  if (originalMailer) require.cache[MAILER_PATH] = originalMailer;
  else delete require.cache[MAILER_PATH];
  if (originalSupabase) require.cache[SUPABASE_PATH] = originalSupabase;
  else delete require.cache[SUPABASE_PATH];
});

beforeEach(() => {
  sent.length = 0;
  writes.length = 0;
  dbMode = 'ok';
  insertCalls = 0;
});

const teamMail = () => sent.find((m) => m.to !== 'visitor@example.com');
const visitorMail = () => sent.find((m) => m.to === 'visitor@example.com');

describe('contact form flow', () => {
  const payload = {
    name: 'Asha Rao',
    email: 'visitor@example.com',
    company: 'Northwind Textiles',
    phone: '+91 90000 00000',
    subject: 'General inquiry',
    intent: 'question',
    message: 'We run 40 lines of cutting machines and want to see what fits.',
  };

  it('stores the contact and emails both the team and the visitor', async () => {
    const res = await request(app).post('/api/v1/inquiries').send(payload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.id).toBeDefined();

    expect(writes).toHaveLength(1);
    expect(writes[0].table).toBe('Leads');
    expect(writes[0].row).toMatchObject({
      name: 'Asha Rao',
      email: 'visitor@example.com',
      company: 'Northwind Textiles',
      intent: 'question',
    });
    // The subject label rides on the source tag (the Leads table has no
    // subject column - the intent + role carry the meaning).
    expect(writes[0].row.role).toBe('General inquiry');
    expect(writes[0].row.message).toContain('cutting machines');
    expect(writes[0].row.createdAt).toBeTruthy();

    expect(sent).toHaveLength(2);
    const team = teamMail();
    // EMAIL_TO may hold a list of inboxes - the team notice goes to all of them.
    expect(team.to).toContain('assist@arinox.ai');
    expect(team.subject).toBe('[Arinox Inquiry] General inquiry - Asha Rao - Northwind Textiles');
    expect(team.replyTo).toBe('visitor@example.com');
    expect(team.html).toContain('Asha Rao');
    expect(team.html).toContain('cutting machines');

    const visitor = visitorMail();
    expect(visitor.to).toBe('visitor@example.com');
    expect(visitor.subject).toBe('We received your message');
    expect(visitor.html).toContain('Asha Rao');
  });

  it('rejects missing or invalid input with 400 and sends nothing', async () => {
    const noName = await request(app).post('/api/v1/inquiries').send({ ...payload, name: '' });
    expect(noName.status).toBe(400);

    const badMail = await request(app).post('/api/v1/inquiries').send({ ...payload, email: 'nope' });
    expect(badMail.status).toBe(400);

    expect(sent).toHaveLength(0);
    expect(writes).toHaveLength(0);
  });

  it('swallows honeypot submissions silently - no write, no email', async () => {
    const res = await request(app).post('/api/v1/inquiries').send({ ...payload, website: 'http://spam.example' });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(writes).toHaveLength(0);
    expect(sent).toHaveLength(0);
  });

  it('still emails the team when the DB write fails (an enquiry is never lost)', async () => {
    dbMode = 'fail';
    const res = await request(app).post('/api/v1/inquiries').send(payload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(writes).toHaveLength(0);
    expect(sent).toHaveLength(2);
  });

  it('keeps the legacy /api/v1/contact path working as an alias', async () => {
    const res = await request(app).post('/api/v1/contact').send(payload);

    expect(res.status).toBe(201);
    expect(writes).toHaveLength(1);
    expect(writes[0].table).toBe('Leads');
    expect(writes[0].row.intent).toBe('question');
    expect(sent).toHaveLength(2);
  });

  it('maps the legacy subject dropdown onto the intent', async () => {
    const res = await request(app)
      .post('/api/v1/contact')
      .send({ ...payload, subject: 'Partnership', intent: undefined });

    expect(res.status).toBe(201);
    expect(writes[0].row.intent).toBe('partnership');
    expect(writes[0].row.role).toContain('Partnership');
  });
});

describe('leads flow (deck requests)', () => {
  const payload = {
    name: 'Vikram N',
    email: 'visitor@example.com',
    company: 'Meridian Apparels',
    intent: 'deck',
    asset: 'industrial-os',
    message: 'We cut 40 styles a day and want to know where AI fits.',
    landing_page: 'https://www.arinox.ai/industries/industrial',
  };

  it('stores the inquiry and emails both the team and the requester', async () => {
    const res = await request(app).post('/api/v1/inquiries').send(payload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.id).toBeDefined();

    expect(writes).toHaveLength(1);
    expect(writes[0].table).toBe('Leads');
    expect(writes[0].row).toMatchObject({
      name: 'Vikram N',
      email: 'visitor@example.com',
      company: 'Meridian Apparels',
      intent: 'deck',
      asset: 'industrial-os',
    });
    // The source tag is the server's, not the client's.
    expect(writes[0].row.role).toBe('Deck request · Manufacturing OS deck');
    expect(writes[0].row.landingPage).toBe('https://www.arinox.ai/industries/industrial');
    expect(writes[0].row.status).toBe('new');

    expect(sent).toHaveLength(2);
    const team = sent.find((m) => m.to.includes('assist@arinox.ai'));
    expect(team.replyTo).toBe('visitor@example.com');
    expect(team.html).toContain('Vikram N');
    // The visitor's own words now travel with the request.
    expect(team.html).toContain('40 styles a day');

    const visitor = visitorMail();
    expect(visitor.to).toBe('visitor@example.com');
    expect(visitor.subject).toBe('Your Manufacturing OS deck');
    expect(visitor.html).toContain('Vikram N');
  });

  it('flags a deck request loudly and never attaches the deck', async () => {
    const res = await request(app).post('/api/v1/inquiries').send(payload);
    expect(res.status).toBe(201);

    const team = sent.find((m) => m.to.includes('assist@arinox.ai'));
    expect(team.subject).toContain('Deck request');
    expect(team.subject).toContain('Manufacturing OS deck');
    expect(team.html).toContain('Requested');
    expect(team.html).toContain('Manufacturing OS deck');

    // The deck is sent by a person from the team - never auto-attached.
    for (const mail of sent) {
      expect(mail.attachments).toBeUndefined();
    }
  });

  it('falls back to the general reply for an unknown asset or intent', async () => {
    const res = await request(app)
      .post('/api/v1/inquiries')
      .send({ ...payload, asset: 'not-a-deck', intent: 'not-an-intent' });
    expect(res.status).toBe(201);

    expect(writes[0].row.intent).toBe('question');
    expect(writes[0].row.asset).toBeNull();

    const team = sent.find((m) => m.to.includes('assist@arinox.ai'));
    expect(team.subject).not.toContain('Deck request');

    const visitor = visitorMail();
    expect(visitor.subject).toBe('We received your message');
  });

  it('keeps the legacy /api/v1/leads path working as an alias', async () => {
    const res = await request(app)
      .post('/api/v1/leads')
      .send({ ...payload, autoReplyId: 'industrial-os-deck' });

    expect(res.status).toBe(201);
    expect(writes[0].row.intent).toBe('deck');
    expect(writes[0].row.asset).toBe('industrial-os');
    expect(sent).toHaveLength(2);
  });

  it('rejects missing or invalid input with 400 and sends nothing', async () => {
    const noName = await request(app).post('/api/v1/inquiries').send({ ...payload, name: '' });
    expect(noName.status).toBe(400);

    const badMail = await request(app).post('/api/v1/inquiries').send({ ...payload, email: 'nope' });
    expect(badMail.status).toBe(400);

    expect(sent).toHaveLength(0);
    expect(writes).toHaveLength(0);
  });

  it('swallows honeypot submissions silently - no write, no email', async () => {
    const res = await request(app).post('/api/v1/inquiries').send({ ...payload, website: 'http://spam.example' });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(writes).toHaveLength(0);
    expect(sent).toHaveLength(0);
  });

  it('still emails the team when the DB write fails (a lead is never lost)', async () => {
    dbMode = 'fail';
    const res = await request(app).post('/api/v1/inquiries').send(payload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(writes).toHaveLength(0);
    expect(sent).toHaveLength(2);

    const team = sent.find((m) => m.to.includes('assist@arinox.ai'));
    expect(team.subject).toContain('Deck request');
  });

  it('saves the enquiry without intent/asset when the migration has not run', async () => {
    // Supabase rejects the row with "Could not find the 'asset' column" until
    // server/scripts/add-inquiry-intent-to-leads.sql is run. The enquiry must
    // still be saved (and emailed) - only the two new columns are dropped.
    dbMode = 'missing-column';
    const res = await request(app).post('/api/v1/inquiries').send(payload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.id).toBeDefined();
    expect(writes).toHaveLength(1);
    expect(writes[0].row.name).toBe('Vikram N');
    expect(writes[0].row.intent).toBeUndefined();
    expect(writes[0].row.asset).toBeUndefined();
    expect(sent).toHaveLength(2);
  });

  it('tags the pricing enquiry with the door it came in through', async () => {
    const res = await request(app).post('/api/v1/inquiries').send({
      name: 'Vikram N',
      email: 'visitor@example.com',
      company: 'Meridian Apparels',
      intent: 'pricing',
      source: 'quick',
      message: 'We want to price our cutting-floor workflow.',
    });

    expect(res.status).toBe(201);
    // The team sees which door converted - in the row and in the email.
    expect(writes[0].row.role).toBe('Price Discovery · quick form');

    const team = sent.find((m) => m.to.includes('assist@arinox.ai'));
    expect(team.subject).toContain('Price Discovery');
    expect(team.html).toContain('Came in via');
    expect(team.html).toContain('quick form');

    // The visitor still gets the price-discovery reply.
    expect(visitorMail().subject).toBe('Your Price Discovery answers are in review');
  });

  it('ignores an unknown source', async () => {
    const res = await request(app).post('/api/v1/inquiries').send({
      name: 'Vikram N',
      email: 'visitor@example.com',
      intent: 'pricing',
      source: '__proto__',
    });

    expect(res.status).toBe(201);
    expect(writes[0].row.role).toBe('Price Discovery');
  });

  it('carries campaign attribution onto the row', async () => {
    const res = await request(app).post('/api/v1/inquiries').send({
      ...payload,
      utm_source: 'linkedin',
      utm_campaign: 'fashion-os-q4',
      gclid: 'abc123',
      referrer: 'https://www.google.com/',
    });

    expect(res.status).toBe(201);
    expect(writes[0].row.utmSource).toBe('linkedin');
    expect(writes[0].row.utmCampaign).toBe('fashion-os-q4');
    expect(writes[0].row.gclid).toBe('abc123');
    expect(writes[0].row.referrer).toBe('https://www.google.com/');
    expect(sent.find((m) => m.to.includes('assist@arinox.ai')).html).toContain('linkedin');
  });
});

describe('careers application flow', () => {
  const fields = {
    fullName: 'Priya Nair',
    email: 'visitor@example.com',
    phone: '+91 90000 11111',
    role: 'Field Deployment Engineer',
    department: 'Delivery',
    linkedIn: 'linkedin.com/in/priyanair',
    coverNote: 'I have run factory AI deployments for six years.',
  };

  const apply = (over = {}) => {
    const req = request(app).post('/api/v1/careers/apply');
    Object.entries({ ...fields, ...over }).forEach(([k, v]) => req.field(k, v));
    return req;
  };

  it('stores the application, attaches the resume and auto-replies', async () => {
    const req = apply();
    req.attach('resume', Buffer.from('%PDF-1.4 fake resume'), 'priya-nair.pdf');
    const res = await req;

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);

    expect(writes).toHaveLength(1);
    expect(writes[0].table).toBe('JobApplications');
    expect(writes[0].row).toMatchObject({
      fullName: 'Priya Nair',
      email: 'visitor@example.com',
      role: 'Field Deployment Engineer',
      department: 'Delivery',
    });
    expect(writes[0].row.linkedIn).toBe('https://linkedin.com/in/priyanair');
    expect(writes[0].row.resumeName).toBe('priya-nair.pdf');

    expect(sent).toHaveLength(2);
    const team = sent.find((m) => m.to.includes('assist@arinox.ai'));
    expect(team.subject).toBe('[Arinox Careers] New Application - Field Deployment Engineer from Priya Nair');
    expect(team.replyTo).toBe('visitor@example.com');
    expect(team.html).toContain('Priya Nair');
    // Careers is the one flow that DOES attach a file - the resume.
    expect(team.attachments).toHaveLength(1);
    expect(team.attachments[0].filename).toBe('priya-nair.pdf');

    const visitor = visitorMail();
    expect(visitor.to).toBe('visitor@example.com');
    expect(visitor.subject).toBe('Application received - Field Deployment Engineer at Arinox AI');
    expect(visitor.html).toContain('Priya Nair');
  });

  it('rejects a missing role with 400 and sends nothing', async () => {
    const res = await apply({ role: '' });
    expect(res.status).toBe(400);
    expect(sent).toHaveLength(0);
    expect(writes).toHaveLength(0);
  });

  it('swallows honeypot submissions silently - no write, no email', async () => {
    const req = apply({ website: 'http://spam.example' });
    req.attach('resume', Buffer.from('%PDF-1.4 fake resume'), 'priya-nair.pdf');
    const res = await req;

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(writes).toHaveLength(0);
    expect(sent).toHaveLength(0);
  });

  it('still emails the team when the DB write fails (an applicant is never lost)', async () => {
    dbMode = 'fail';
    const req = apply();
    req.attach('resume', Buffer.from('%PDF-1.4 fake resume'), 'priya-nair.pdf');
    const res = await req;

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(writes).toHaveLength(0);
    expect(sent).toHaveLength(2);

    const team = sent.find((m) => m.to.includes('assist@arinox.ai'));
    expect(team.subject).toContain('New Application');
    expect(team.attachments).toHaveLength(1);
  });
});
