// @vitest-environment jsdom
// Pricing + Price Discovery: wizard state logic (gates, caps, payload), the
// locked-price contract — Level 1 is the ONLY visible price line — and the
// wizard's live step flow (auto-advance, gating, cap note).
// Hermetic: no network, no real timers.
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
} from '../src/components/pricing/wizardLogic';
import { models } from '../src/data/pricing';
import { PlugPlayLadder } from '../src/components/pricing/PlugPlayLadder';
import PriceDiscovery from '../src/pages/PriceDiscovery';

/* Axios (HumanCheck/submit paths are gated behind step 7; still keep net off) */
vi.mock('axios', () => ({
  default: { post: vi.fn(async () => ({ data: { success: true } })) },
}));

const renderWizard = (entry = '/pricing/discovery') =>
  render(
    <MemoryRouter initialEntries={[entry]}>
      <HelmetProvider>
        <PriceDiscovery />
      </HelmetProvider>
    </MemoryRouter>
  );

describe('wizard live flow', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    clearAnswers();
  });
  afterEach(() => {
    cleanup();
  });

  /* Option rows are hairline ledger rows whose accessible name contains the
   * mono index ("01 BFSI"), so queries match on partial regexes. */
  it('next is disabled until the step is answered', () => {
    renderWizard();
    const next = screen.getByRole('button', { name: 'Next' });
    expect(next.disabled).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: /BFSI/ }));
    expect(next.disabled).toBe(false);
  });

  it('auto-advances ~250ms after a single-select pick', async () => {
    renderWizard();
    expect(screen.getByText(/Which industry are you in\?/)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /BFSI/ }));
    // 250ms later we are on the size step (URL drives the step)
    expect(
      await screen.findByText(/How many people work in your organisation\?/, {}, { timeout: 3000 })
    ).toBeTruthy();
  });

  it('multi-select waits for Next and Back keeps answers', async () => {
    renderWizard('/pricing/discovery?step=3'); // teams (multi)
    const next = screen.getByRole('button', { name: 'Next' });
    expect(next.disabled).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: /Operations/ }));
    expect(next.disabled).toBe(false);
    fireEvent.click(screen.getByRole('button', { name: /Finance/ }));
    fireEvent.click(next);

    // Now on the apps step; pick one app, then Back — answers persist.
    await screen.findByText(/What do your teams run on today\?/, {}, { timeout: 3000 });
    fireEvent.click(screen.getByRole('button', { name: /ERP/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    await screen.findByText(/Which teams should benefit first\?/, {}, { timeout: 3000 });
    expect(screen.getByRole('button', { name: /Operations/ }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('button', { name: /Finance/ }).getAttribute('aria-pressed')).toBe('true');
  });

  it('lets the outcome question take every pick, no cap', async () => {
    renderWizard('/pricing/discovery?step=6'); // outcome (multi, uncapped)
    await screen.findByText(/What outcome matters most\?/, {}, { timeout: 3000 });
    for (const name of [/Cut operating costs/, /Automate manual workflows/, /Compliance & security/, /New revenue streams/, /Get our data AI-ready/]) {
      fireEvent.click(screen.getByRole('button', { name }));
    }
    expect(screen.getByRole('button', { name: /New revenue streams/ }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('button', { name: /Get our data AI-ready/ }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.queryByText(/Unselect one first/i)).toBeNull();
  });

  it('lets the blockers question take every pick, no cap', async () => {
    renderWizard('/pricing/discovery?step=8'); // blockers (multi, uncapped)
    await screen.findByText(/What is holding AI back today\?/, {}, { timeout: 3000 });
    for (const name of [/Data privacy/, /No in-house AI skills/, /Unclear return/, /Leadership buy-in/]) {
      fireEvent.click(screen.getByRole('button', { name }));
    }
    expect(screen.getByRole('button', { name: /Leadership buy-in/ }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.queryByText(/Unselect one first/i)).toBeNull();
  });

  it('no survey question carries a cap', () => {
    expect(QUESTIONS.filter((q) => q.max)).toHaveLength(0);
  });

  it('persistence: answers survive a simulated refresh', async () => {
    const first = renderWizard();
    fireEvent.click(first.getByRole('button', { name: /BFSI/ }));
    // auto-advance fires and persists the answer via sessionStorage
    await first.findByText(/How many people work in your organisation\?/, {}, { timeout: 3000 });
    cleanup();

    // A cold render (same storage) shows the selection intact on step 1
    const second = renderWizard();
    expect(second.getByRole('button', { name: /BFSI/ }).getAttribute('aria-pressed')).toBe('true');
    second.unmount();
    clearAnswers();
  });
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

  it('completes with a typed budget without breaking the summary', async () => {
    saveAnswers({ ...blankAnswers(), industry: 'BFSI', budget: '60 lakh', budgetCurrency: '₹' });
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/pricing/discovery?step=done']}>
          <PriceDiscovery />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(await screen.findByText('₹ 60 lakh')).toBeTruthy();
    clearAnswers();
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
