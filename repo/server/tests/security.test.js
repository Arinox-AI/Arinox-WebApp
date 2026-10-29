// Security regressions — hermetic (no DB, no SMTP). Guards the 2026-10-22
// audit fixes: escaped email templates, server-owned auto-replies, and
// careers input validation.
import { describe, it, expect } from 'vitest';
import { createRequire } from 'node:module';
import request from 'supertest';

const require = createRequire(import.meta.url);
const app = require('../src/app.js');
const mailer = require('../src/utils/mailer.js');
const { getAutoReply } = require('../src/utils/autoReplies.js');

const EVIL = '<a href="https://evil.example">click</a>';

describe('email templates escape visitor input', () => {
  const html = [
    mailer.contactNotification({ name: EVIL, email: 'a@b.co', company: EVIL, phone: EVIL, subject: EVIL, message: `${EVIL}\nline two` }),
    mailer.contactAutoReply({ name: EVIL, subject: EVIL, body: EVIL, steps: [EVIL] }),
    mailer.leadNotification({ name: EVIL, email: 'a@b.co', company: EVIL, role: EVIL, phone: EVIL, message: EVIL }),
    mailer.applicationNotification({ fullName: EVIL, email: 'a@b.co', phone: EVIL, role: EVIL, department: EVIL, linkedIn: 'javascript:alert(1)', coverNote: EVIL, resumeName: EVIL }),
    mailer.applicationAutoReply({ fullName: EVIL, role: EVIL }),
  ].join('\n');

  it('never emits a visitor-supplied link or tag', () => {
    expect(html).not.toContain('href="https://evil.example"');
    expect(html).not.toContain('href="javascript:');
    expect(html).toContain('&lt;a href=&quot;https://evil.example&quot;&gt;');
  });

  it('keeps line breaks in messages', () => {
    expect(html).toContain('<br>line two');
  });
});

describe('lead auto-replies are server-owned', () => {
  it('resolves known template ids only', () => {
    expect(getAutoReply('marketing-os-deck')?.asset?.name).toMatch(/Marketing OS/);
    expect(getAutoReply('fashion-lifestyle-os-deck')?.asset?.name).toMatch(/Fashion & Lifestyle OS/);
    expect(getAutoReply('industrial-os-deck')?.asset?.name).toMatch(/Manufacturing OS/);
    expect(getAutoReply('nope')).toBeNull();
    expect(getAutoReply('__proto__')).toBeNull();
    expect(getAutoReply({ subject: 'x' })).toBeNull();
  });
});

describe('careers apply validates input before any DB/SMTP work', () => {
  const apply = (fields) => {
    const req = request(app).post('/api/v1/careers/apply');
    Object.entries(fields).forEach(([k, v]) => req.field(k, v));
    return req;
  };

  it('rejects missing required fields', async () => {
    const res = await apply({ fullName: 'A', email: 'a@b.co' });
    expect(res.status).toBe(400);
  });

  it('rejects a multi-recipient email', async () => {
    const res = await apply({ fullName: 'A', email: 'a@b.co, victim@x.co', role: 'Engineer' });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/email/i);
  });

  it('rejects a non-http LinkedIn value', async () => {
    const res = await apply({ fullName: 'A', email: 'a@b.co', role: 'Engineer', linkedIn: 'javascript:alert(1)' });
    expect(res.status).toBe(400);
  });

  it('rejects a disallowed file type with a 400, not a 500', async () => {
    const res = await request(app)
      .post('/api/v1/careers/apply')
      .field('fullName', 'A').field('email', 'a@b.co').field('role', 'Engineer')
      .attach('resume', Buffer.from('MZ'), 'resume.exe');
    expect(res.status).toBe(400);
  });
});
