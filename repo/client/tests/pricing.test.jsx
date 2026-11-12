// @vitest-environment jsdom
// Pricing + Price Discovery: wizard state logic (gates, caps, payload), the
// locked-price contract — Level 1 is the ONLY visible price line — and the
// wizard's live step flow (auto-advance, gating, cap note).
// Hermetic: no network, no real timers.
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  QUESTIONS,
  STEP_TOTAL,
  QUESTION_COUNT,
  budgetLabel,
  toggleOption,
  isCapReached,
  stepAnswered,
  validateContact,
  buildLeadPayload,
  blankAnswers,
  clearAnswers,
  loadAnswers,
  saveAnswers,
  hasAnyAnswer,
} from '../src/components/pricing/wizardLogic';
import { models } from '../src/data/pricing';
import { PlugPlayLadder } from '../src/components/pricing/PlugPlayLadder';
import { ClientIntake } from '../src/components/site/ClientIntake';
import { StartHere } from '../src/components/site/StartHere';
import axios from 'axios';

/* Axios stays mocked: the intake submit must never reach the network. */
vi.mock('axios', () => ({
  default: { post: vi.fn(async () => ({ data: { success: true } })) },
}));

const renderIntake = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <ClientIntake />
    </MemoryRouter>
  );

const wait = { timeout: 3000 };

describe('home client intake live flow', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    clearAnswers();
  });
  afterEach(() => {
    cleanup();
  });

  it('Continue is disabled until the step is answered', () => {
    renderIntake();
    const next = screen.getByRole('button', { name: 'Continue' });
    expect(next.disabled).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: /BFSI/ }));
    expect(next.disabled).toBe(false);
  });

  it('auto-advances ~250ms after a single-select pick and fills the profile card', async () => {
    renderIntake();
    expect(screen.getAllByText(/Which industry are you in\?/).length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('button', { name: /BFSI/ }));
    expect(await screen.findByText(/How many people work in your organisation\?/, {}, wait)).toBeTruthy();
    // The live profile card now shows the industry.
    expect(screen.getAllByText('BFSI').length).toBeGreaterThan(0);
  });

  it('multi-select waits for Continue and Back keeps answers', async () => {
    renderIntake();
    fireEvent.click(screen.getByRole('button', { name: /BFSI/ }));
    await screen.findByText(/How many people work in your organisation\?/, {}, wait);
    fireEvent.click(screen.getByRole('button', { name: /50–250/ }));
    await screen.findByText(/Which teams should benefit first\?/, {}, wait);

    const next = screen.getByRole('button', { name: 'Continue' });
    expect(next.disabled).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: /Operations/ }));
    fireEvent.click(screen.getByRole('button', { name: /Finance/ }));
    expect(next.disabled).toBe(false);
    expect(screen.queryByText(/Unselect one first/i)).toBeNull();
    fireEvent.click(next);

    await screen.findByText(/What do your teams run on today\?/, {}, wait);
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    await screen.findByText(/Which teams should benefit first\?/, {}, wait);
    expect(screen.getByRole('button', { name: /Operations/ }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('button', { name: /Finance/ }).getAttribute('aria-pressed')).toBe('true');
  });

  it('no survey question carries a cap', () => {
    expect(QUESTIONS.filter((q) => q.max)).toHaveLength(0);
  });

  it('persistence: answers survive a simulated refresh', async () => {
    const first = renderIntake();
    fireEvent.click(first.getByRole('button', { name: /BFSI/ }));
    await first.findByText(/How many people work in your organisation\?/, {}, wait);
    cleanup();

    const second = renderIntake();
    expect(second.getByRole('button', { name: /BFSI/ }).getAttribute('aria-pressed')).toBe('true');
    second.unmount();
    clearAnswers();
  });

  it('shows a typed budget, with its currency, in the profile card', () => {
    saveAnswers({ ...blankAnswers(), industry: 'BFSI', budget: '60 lakh', budgetCurrency: '₹' });
    renderIntake();
    expect(screen.getAllByText('₹ 60 lakh').length).toBeGreaterThan(0);
    clearAnswers();
  });

  it('has no price wording anywhere in the intake copy', async () => {
    const { intake } = await import('../src/data/inquiries');
    expect(JSON.stringify(intake)).not.toMatch(/pric/i);
    const budget = QUESTIONS.find((q) => q.key === 'budget');
    expect(budget.question).toBe('What have you set aside for AI over the next 12 months?');
    expect(budget.sub).toContain('Helps us scope; never shared.');
    expect(JSON.stringify(QUESTIONS)).not.toMatch(/pric/i);
  });

  it('submits the profile intent (axios mocked, nothing is sent)', async () => {
    saveAnswers({
      ...blankAnswers(),
      industry: 'BFSI', size: '50–250', teams: ['Finance'], apps: ['ERP'], data: 'On computers and servers in our own office',
      outcome: ['Cut operating costs'], stage: 'Haven’t started', blockers: ['Leadership buy-in'], timeline: 'ASAP',
    });
    renderIntake();
    for (let i = 0; i < QUESTION_COUNT; i += 1) {
      fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
      await new Promise((r) => setTimeout(r, 330));
    }
    fireEvent.change(await screen.findByLabelText(/full name/i), { target: { name: 'name', value: 'Test Visitor' } });
    fireEvent.change(screen.getByLabelText(/work email/i), { target: { name: 'email', value: 'visitor@example.com' } });
    fireEvent.change(screen.getByLabelText(/^company/i), { target: { name: 'company', value: 'Example Co' } });
    fireEvent.change(screen.getByLabelText(/your role/i), { target: { name: 'role', value: 'COO' } });
    fireEvent.click(screen.getByRole('button', { name: /send my profile/i }));

    expect(await screen.findByText(/An architect will be in touch/i, {}, wait)).toBeTruthy();
    const call = axios.post.mock.calls.at(-1);
    expect(call[0]).toBe('/api/v1/inquiries');
    expect(call[1].intent).toBe('profile');
    expect(call[1].source).toBe('home');
    expect(call[1].message).toContain('Business profile answers');
    expect(call[1].message).not.toMatch(/Price Discovery/);
  }, 20000);
});

describe('wizard gating', () => {
  it('asks the advertised number of questions, then one contact step', () => {
    expect(QUESTIONS).toHaveLength(QUESTION_COUNT);
    expect(QUESTION_COUNT).toBe(10);
    expect(STEP_TOTAL).toBe(QUESTION_COUNT + 1);
    QUESTIONS.forEach((q) => {
      expect(['single', 'multi', 'text']).toContain(q.type);
      if (q.type !== 'text') expect(q.options.length).toBeGreaterThan(1);
    });
  });

  it('requires an answer before Next (single + multi)', () => {
    const a = blankAnswers();
    expect(stepAnswered(1, a)).toBe(false);
    a.industry = 'BFSI';
    expect(stepAnswered(1, a)).toBe(true);

    expect(stepAnswered(3, a)).toBe(false); // teams (multi)
    a.teams = ['Operations'];
    expect(stepAnswered(3, a)).toBe(true);

    expect(stepAnswered(STEP_TOTAL, a)).toBe(true); // contact gated separately
  });

  it('caps multi-select at question.max when a question sets one', () => {
    // No live question is capped any more; the mechanism stays supported.
    const outcome = { max: 3, options: ['a', 'b', 'c', 'd'] };
    let list = [];
    for (const opt of outcome.options.slice(0, 3)) list = toggleOption(list, opt, outcome.max);
    expect(list).toHaveLength(3);
    // A 4th pick is a no-op, and the cap is surfaced for the note
    list = toggleOption(list, outcome.options[3], outcome.max);
    expect(list).toHaveLength(3);
    expect(isCapReached(list, outcome.max, outcome.options[3])).toBe(true);
    // Selected options can always be removed, even at the cap
    list = toggleOption(list, outcome.options[0], outcome.max);
    expect(list).toHaveLength(2);
  });

  it('tells a single answer apart from a multi answer', () => {
    const industry = QUESTIONS.find((q) => q.key === 'industry');
    const teams = QUESTIONS.find((q) => q.key === 'teams');
    expect(industry.type).toBe('single');
    expect(teams.type).toBe('multi');
  });
});

describe('contact validation + lead payload', () => {
  const errorsText = { name: 'n', email: 'e', company: 'c', role: 'r' };

  it('rejects invalid emails and empty required fields', () => {
    const errs = validateContact({ name: '', email: 'nope', company: '', role: '' }, errorsText);
    expect(Object.keys(errs)).toEqual(['name', 'email', 'company', 'role']);

    const clean = validateContact(
      { name: 'A', email: 'a@company.com', company: 'C', role: 'R' },
      errorsText
    );
    expect(Object.values(clean).some(Boolean)).toBe(false);
  });

  it('tags the inquiry as a Price Discovery and carries answers + context', () => {
    const answers = { ...blankAnswers(), industry: 'BFSI', teams: ['Operations', 'Finance'] };
    const payload = buildLeadPayload({
      answers,
      contact: { name: 'A', email: 'a@company.com', company: 'C', role: 'COO', website: '' },
      context: { deployment: 'saas', currency: 'USD', cta: 'hero' },
    });
    expect(payload.message).toContain('Budget (next 12 months): n/a');
    expect(payload.message).toContain('Wants to be live: n/a');
    // The intent is what the client names; the server owns the source tag
    // (Leads.role) and the auto-reply template.
    expect(payload.intent).toBe('pricing');
    expect(payload.source).toBe('survey');
    expect(payload.role).toBeUndefined();
    expect(payload.companyType).toBe('BFSI');
    expect(payload.companySize).toBeNull();
    expect(payload.aiTools).toBeNull();
    expect(payload.useCases).toBe('Operations, Finance');
    expect(payload.message).toContain('Industry: BFSI');
    expect(payload.message).toContain('Deployment context: saas');
    expect(payload.message).toContain('Contact role: COO');
    expect(payload.autoReplyId).toBeUndefined();
  });

  it('tags the home intake as a business profile', () => {
    const { intent, source, message } = buildLeadPayload({
      answers: { ...blankAnswers(), industry: 'BFSI' },
      contact: { name: 'A', email: 'a@company.com', company: 'C', website: '' },
      intent: 'profile',
      heading: 'Business profile answers',
    });
    expect(intent).toBe('profile');
    expect(source).toBe('home');
    expect(message.startsWith('Business profile answers')).toBe(true);
  });

  it('never includes the honeypot-junk path in clean submits', () => {
    const answers = blankAnswers();
    const payload = buildLeadPayload({
      answers,
      contact: { name: 'A', email: 'a@company.com', company: 'C', website: '' },
    });
    expect(payload.website).toBe('');
  });
});

describe('sessionStorage persistence (answers only)', () => {
  beforeEach(() => clearAnswers());

  it('round-trips the answers', () => {
    const a = { ...blankAnswers(), industry: 'Energy', outcome: ['Cut operating costs'] };
    saveAnswers(a);
    expect(loadAnswers().industry).toBe('Energy');
    expect(loadAnswers().outcome).toEqual(['Cut operating costs']);
    clearAnswers();
    expect(loadAnswers()).toBeNull();
  });
});

describe('locked price contract — only Level 1 shows a price', () => {
  it('renders exactly one visible price line and four locked levels', () => {
    render(<PlugPlayLadder levels={models.ladder.levels} deploymentLabel="SaaS" />);

    // The single visible chip (the entry level) — never a number
    expect(screen.getAllByText(/Start here/i)).toHaveLength(1);

    // Levels 2–5 expose the accessible label, never raw bullets
    const locked = screen.getAllByLabelText('Price available after Price Discovery');
    expect(locked).toHaveLength(4);

    // Every level shows a "Delivered as SaaS" pill that follows the toggle
    expect(screen.getAllByText(/Delivered as SaaS/i)).toHaveLength(5);
    cleanup();
  });
});

describe('the longer survey', () => {
  it('quotes the real question count in its copy', async () => {
    const { wizard, QUESTION_COUNT: n } = await import('../src/data/pricing');
    expect(wizard.questions).toHaveLength(n);
    expect(wizard.title).toContain(`${n} questions`);
  });

  it('puts the chosen currency symbol in front of the typed budget', () => {
    const base = { ...blankAnswers(), budget: '60 lakh' };
    expect(budgetLabel({ ...base, budgetCurrency: '\u20B9' })).toBe('\u20B9 60 lakh');
    expect(budgetLabel({ ...base, budgetCurrency: '$' })).toBe('$ 60 lakh');
    expect(budgetLabel(blankAnswers())).toBe(''); // skipped stays empty
    const { message } = buildLeadPayload({ answers: { ...base, budgetCurrency: '\u20B9' }, contact: { name: 'A', email: 'a@company.com', company: 'C', website: '' } });
    expect(message).toContain('Budget (next 12 months): \u20B9 60 lakh');
  });

  it('offers ASAP first on the timeline question', () => {
    const timeline = QUESTIONS.find((q) => q.key === 'timeline');
    expect(timeline.options[0]).toBe('ASAP');
  });

  it('carries the new answers into the team email', () => {
    const answers = { ...blankAnswers(), stage: 'Live in one team', blockers: ['Our data isn\u2019t ready'], budget: '100K', budgetCurrency: '$', timeline: 'Within 3 months' };
    const { message } = buildLeadPayload({ answers, contact: { name: 'A', email: 'a@company.com', company: 'C', website: '' } });
    expect(message).toContain('AI today: Live in one team');
    expect(message).toContain('Blockers: Our data isn\u2019t ready');
    expect(message).toContain('Budget (next 12 months): $ 100K');
    expect(message).toContain('Wants to be live: Within 3 months');
  });

  it('lets the visitor type the budget, and skip it', () => {
    const budget = QUESTIONS.find((q) => q.key === 'budget');
    expect(budget.type).toBe('text');
    expect(budget.optionsByCurrency).toBeUndefined();
    const a = blankAnswers();
    expect(a.budget).toBe('');
    expect(stepAnswered(QUESTIONS.indexOf(budget) + 1, a)).toBe(true); // optional
  });
});

describe('home Start here', () => {
  afterEach(() => cleanup());

  it('only links out to /get-started and hosts no question', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <StartHere />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /tell us about your business/i });
    expect(link.getAttribute('href')).toBe('/get-started');
    expect(screen.queryByText(QUESTIONS[0].question)).toBeNull();
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});

describe('intake draft restore', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    clearAnswers();
  });
  afterEach(() => cleanup());

  it('drops answers that are no longer valid options', () => {
    saveAnswers({ ...blankAnswers(), industry: 'BFSI', data: 'It can never leave our premises', teams: ['Finance', 'Gone team'] });
    const a = loadAnswers();
    expect(a.industry).toBe('BFSI');
    expect(a.data).toBe('');
    expect(a.teams).toEqual(['Finance']);
  });

  it('announces a restored draft and Start over wipes it', () => {
    saveAnswers({ ...blankAnswers(), industry: 'BFSI' });
    render(
      <MemoryRouter initialEntries={['/get-started']}>
        <ClientIntake />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/picked up from earlier/i).length).toBeGreaterThan(0);
    fireEvent.click(screen.getAllByRole('button', { name: /start over/i })[0]);
    expect(screen.queryAllByText(/picked up from earlier/i)).toHaveLength(0);
    expect(hasAnyAnswer(loadAnswers())).toBe(false);
  });

  it('shows no notice on a fresh visit', () => {
    render(
      <MemoryRouter initialEntries={['/get-started']}>
        <ClientIntake />
      </MemoryRouter>
    );
    expect(screen.queryAllByText(/picked up from earlier/i)).toHaveLength(0);
  });
});
