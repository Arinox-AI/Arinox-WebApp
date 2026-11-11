// Booking — hermetic (no Google, no Supabase, no SMTP). Local mode uses the
// in-memory store, which enforces the same "one confirmed booking per start"
// rule as the Supabase unique index.
import { describe, it, expect } from 'vitest';
import { createRequire } from 'node:module';
import request from 'supertest';

const require = createRequire(import.meta.url);
const app = require('../src/app.js');
const { generateSlots } = require('../src/booking/availability.js');
const { buildInvite } = require('../src/booking/ics.js');

// Wednesday 2026-11-11 05:00 UTC = 10:30 IST.
const NOW = new Date('2026-11-11T05:00:00Z');
const istHour = (iso) => new Date(Date.parse(iso) + 330 * 60e3).toISOString().slice(11, 16);
const istDate = (iso) => new Date(Date.parse(iso) + 330 * 60e3).toISOString().slice(0, 10);

describe('generateSlots', () => {
  const slots = generateSlots({ now: NOW, busy: [], blockedDates: [] });

  it('offers only Mon–Fri, 10:00–17:30 IST on a 30-minute grid', () => {
    expect(slots.length).toBeGreaterThan(100);
    for (const s of slots) {
      const dow = new Date(Date.parse(s) + 330 * 60e3).getUTCDay();
      expect([1, 2, 3, 4, 5]).toContain(dow);
      const [h, m] = istHour(s).split(':').map(Number);
      expect(h * 60 + m).toBeGreaterThanOrEqual(600);
      expect(h * 60 + m).toBeLessThanOrEqual(17 * 60 + 30);
      expect(m % 30).toBe(0);
    }
  });

  it('respects the 4-hour minimum notice', () => {
    const first = slots.find((s) => istDate(s) === '2026-11-11');
    expect(istHour(first)).toBe('14:30'); // 10:30 + 4h
  });

  it('removes busy time plus the 15-minute buffer', () => {
    // Busy 12:00–13:00 IST on Thu 12 Nov = 06:30–07:30 UTC.
    const s = generateSlots({ now: NOW, busy: [{ start: '2026-11-12T06:30:00Z', end: '2026-11-12T07:30:00Z' }], blockedDates: [] });
    const thu = s.filter((x) => istDate(x) === '2026-11-12').map(istHour);
    expect(thu).toContain('11:00');       // ends 11:30, 30 min before — fine
    expect(thu).not.toContain('11:30');   // ends 12:00, inside the 15-min buffer
    expect(thu).not.toContain('12:00');
    expect(thu).not.toContain('12:30');
    expect(thu).not.toContain('13:00');   // starts at busy end, inside the buffer
    expect(thu).toContain('13:30');
  });

  it('skips blocked dates', () => {
    const s = generateSlots({ now: NOW, busy: [], blockedDates: ['2026-11-12'] });
    expect(s.some((x) => istDate(x) === '2026-11-12')).toBe(false);
  });
});

describe('buildInvite', () => {
  it('produces a REQUEST invite listing every attendee', () => {
    const ics = buildInvite({
      uid: 'u1@arinox.ai', start: '2026-11-12T05:00:00Z', end: '2026-11-12T05:30:00Z',
      summary: 'A; B, C', description: 'line1\nline2',
      organizer: { name: 'Arinox AI', email: 'assist@arinox.ai' },
      attendees: [{ email: 'assist@arinox.ai' }, { name: 'Priya', email: 'p@x.co' }],
    });
    expect(ics).toContain('METHOD:REQUEST');
    expect(ics).toContain('DTSTART:20261112T050000Z');
    expect(ics).toContain('SUMMARY:A\\; B\\, C');
    expect(ics).toContain('mailto:p@x.co');
    expect(ics).toContain('mailto:assist@arinox.ai');
  });
});

describe('security hardening', () => {
  it('cannot be tricked into extra invite lines or broken parameters via a name', () => {
    const ics = buildInvite({
      uid: 'u2@arinox.ai', start: '2026-11-12T05:00:00Z', end: '2026-11-12T05:30:00Z', summary: 's', description: 'd',
      organizer: { name: 'Arinox AI', email: 'assist@arinox.ai' },
      attendees: [{ name: 'Evil"; X-HACK:1\r\nBEGIN:VEVENT', email: 'e@x.co' }],
    });
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(1);
    const line = ics.split('\r\n').find((l) => l.startsWith('ATTENDEE'));
    expect(line.match(/"/g)).toHaveLength(2); // only our own quotes survive
    expect(ics).not.toMatch(/\r\nX-HACK/);
  });

  it('copies Vandana by default and BOOKING_CC overrides it', () => {
    const cfg = require('../src/booking/config.js');
    const prev = process.env.BOOKING_CC;
    delete process.env.BOOKING_CC;
    expect(cfg.ccEmails()).toEqual(['vandana@arinox.ai']);
    process.env.BOOKING_CC = 'a@x.co, b@x.co';
    expect(cfg.ccEmails()).toEqual(['a@x.co', 'b@x.co']);
    process.env.BOOKING_CC = '';
    expect(cfg.ccEmails()).toEqual([]);
    if (prev === undefined) delete process.env.BOOKING_CC; else process.env.BOOKING_CC = prev;
  });

  it('caps upcoming sessions per email (429) and treats case as the same address', async () => {
    const post = async (email, idx) => {
      const { body } = await request(app).get('/api/v1/booking/availability');
      return request(app).post('/api/v1/booking').send({ name: 'Cap Test', email, startAt: body.data.slots[idx] });
    };
    expect((await post('Cap@Example.com', 150)).status).toBe(201);
    expect((await post('cap@example.com', 200)).status).toBe(201);
    const third = await post('CAP@example.com', 250);
    expect(third.status).toBe(429);
  });
});

describe('booking API (local mode)', () => {
  const book = (over = {}) => ({ name: 'Test Person', email: 'test@example.com', company: 'Acme', topic: 'General', ...over });

  it('GET /availability returns future IST-grid slots', async () => {
    const res = await request(app).get('/api/v1/booking/availability');
    expect(res.status).toBe(200);
    expect(res.body.data.mode).toBe('local');
    expect(res.body.data.durationMin).toBe(30);
    expect(res.body.data.slots.length).toBeGreaterThan(50);
  });

  it('books a slot, then refuses the same slot (409) and hides it from availability', async () => {
    const { body } = await request(app).get('/api/v1/booking/availability');
    const slot = body.data.slots[3];
    const ok = await request(app).post('/api/v1/booking').send(book({ startAt: slot, timezone: 'America/New_York' }));
    expect(ok.status).toBe(201);
    expect(ok.body.data.startAt).toBe(slot);

    const again = await request(app).post('/api/v1/booking').send(book({ email: 'other@example.com', startAt: slot }));
    expect(again.status).toBe(409);

    const after = await request(app).get('/api/v1/booking/availability');
    expect(after.body.data.slots).not.toContain(slot);
  });

  it('also hides the neighbouring buffer slots around a booking', async () => {
    const { body } = await request(app).get('/api/v1/booking/availability');
    const slot = body.data.slots[40];
    await request(app).post('/api/v1/booking').send(book({ email: 'buffer@example.com', startAt: slot }));
    const after = (await request(app).get('/api/v1/booking/availability')).body.data.slots;
    const next = new Date(Date.parse(slot) + 30 * 60e3).toISOString();
    expect(after).not.toContain(next); // starts exactly at the booking's end → inside the buffer
  });

  it('rejects a time that was never offered (409), bad input (400)', async () => {
    const weekend = await request(app).post('/api/v1/booking').send(book({ startAt: '2026-11-14T05:00:00Z' }));
    expect(weekend.status).toBe(409);
    const noTime = await request(app).post('/api/v1/booking').send(book());
    expect(noTime.status).toBe(400);
    const badMail = await request(app).post('/api/v1/booking').send(book({ email: 'nope', startAt: '2026-11-12T05:00:00Z' }));
    expect(badMail.status).toBe(400);
    const noName = await request(app).post('/api/v1/booking').send({ email: 'a@b.co', startAt: '2026-11-12T05:00:00Z' });
    expect(noName.status).toBe(400);
  });

  it('rejects invalid guest emails', async () => {
    const { body } = await request(app).get('/api/v1/booking/availability');
    const res = await request(app).post('/api/v1/booking').send(book({ startAt: body.data.slots[60], guests: ['ok@x.co', 'bad'] }));
    expect(res.status).toBe(400);
  });

  it('swallows honeypot submissions silently without booking', async () => {
    const { body } = await request(app).get('/api/v1/booking/availability');
    const slot = body.data.slots[80];
    const res = await request(app).post('/api/v1/booking').send(book({ startAt: slot, website: 'http://spam.example' }));
    expect(res.status).toBe(201);
    expect(res.body.data).toBeUndefined();
    const after = await request(app).get('/api/v1/booking/availability');
    expect(after.body.data.slots).toContain(slot);
  });
});
