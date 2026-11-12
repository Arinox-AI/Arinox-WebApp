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

  it('team CC always carries solutions@arinox.ai, even when TEAM_CC is emptied', () => {
    delete process.env.TEAM_CC;
    expect(mailer.teamCc()).toEqual(['ajay@arinox.ai', 'solutions@arinox.ai']);
    process.env.TEAM_CC = '';
    expect(mailer.teamCc()).toEqual(['solutions@arinox.ai']);
  });

  it('customer emails CC only the shared inbox, never the recipient twice', () => {
    expect(mailer.customerCc('visitor@example.com')).toEqual(['solutions@arinox.ai']);
    expect(mailer.customerCc('Solutions@arinox.ai')).toEqual([]);
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
