// Mailer: solutions@ is copied on every chain, and the team inquiry email
// lays structured answers out as one table row per answer.
import { describe, it, expect, afterEach } from 'vitest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const mailer = require('../src/utils/mailer.js');

describe('mailer CC lists', () => {
  const saved = process.env.TEAM_CC;
  afterEach(() => {
    if (saved === undefined) delete process.env.TEAM_CC;
    else process.env.TEAM_CC = saved;
  });

  it('team CC is always ajay@ + solutions@, and TEAM_CC cannot drop them', () => {
    delete process.env.TEAM_CC;
    expect(mailer.teamCc()).toEqual(['ajay@arinox.ai', 'solutions@arinox.ai']);
    process.env.TEAM_CC = '';
    expect(mailer.teamCc()).toEqual(['ajay@arinox.ai', 'solutions@arinox.ai']);
  });

  it('team To is assist@ + vandana@ and never solutions@, even if EMAIL_TO lists it', () => {
    const savedTo = process.env.EMAIL_TO;
    process.env.EMAIL_TO = 'assist@arinox.ai, solutions@arinox.ai, vandana@arinox.ai';
    expect(mailer.teamTo()).toEqual(['assist@arinox.ai', 'vandana@arinox.ai']);
    delete process.env.EMAIL_TO;
    expect(mailer.teamTo()).toEqual(['assist@arinox.ai', 'vandana@arinox.ai']);
    if (savedTo === undefined) delete process.env.EMAIL_TO; else process.env.EMAIL_TO = savedTo;
  });

  it('has no customer CC helper - visitor emails carry no CC', () => {
    expect(mailer.customerCc).toBeUndefined();
  });
});

describe('team inquiry email', () => {
  it('turns "Label: value" lines into rows and multi answers into one per line', () => {
    const html = mailer.inquiryNotification({
      intentLabel: 'Business Profile',
      name: 'Asha',
      email: 'a@b.co',
      message: 'Business profile answers\nIndustry: BFSI\nTeams: Finance | HR\nData: Online, in tools like Google Workspace\nBudget (next 12 months): n/a',
    });
    expect(html).toContain('Business profile answers');
    expect(html).toContain('>Industry</td>');
    expect(html).toContain('&bull; Finance<br>&bull; HR');
    expect(html).toContain('Online, in tools like Google Workspace');
    expect(html).not.toContain('>Budget (next 12 months)</td>');
  });
});

describe('the client intake link in customer emails', () => {
  it('the booking confirmation asks them to fill in the intake before the call', () => {
    const html = mailer.bookingConfirmation({ name: 'Asha', when: 'Thu 20 Nov, 11:00 IST', topic: 'General' });
    expect(html).toContain('https://www.arinox.ai/get-started');
  });

  it('booked without answering: a Before-we-meet block with a button to the questions (calendar skipped)', () => {
    const html = mailer.bookingConfirmation({ name: 'Asha', when: 'Thu 20 Nov, 11:00 IST', topic: 'General', profileDone: false });
    expect(html).toContain('Before we meet');
    expect(html).toContain('Answer the 10 questions');
    expect(html).toContain('https://www.arinox.ai/get-started?start=roadmap&booked=1');
  });

  it('booked after answering: a thank-you, no questions link', () => {
    const html = mailer.bookingConfirmation({ name: 'Asha', when: 'Thu 20 Nov, 11:00 IST', topic: 'General', profileDone: true });
    expect(html).toContain('Thank you for answering our questions');
    expect(html).not.toContain('Answer the 10 questions');
    expect(html).not.toContain('booked=1');
  });

  it('the team notification says whether the questions were answered', () => {
    const base = { name: 'Asha', email: 'a@b.co', when: 'Thu 20 Nov, 11:00 IST', topic: 'General' };
    expect(mailer.bookingNotification({ ...base, profileDone: false })).toContain('Not answered yet');
    expect(mailer.bookingNotification({ ...base, profileDone: true })).toContain('Answered (see notes below)');
  });
});
