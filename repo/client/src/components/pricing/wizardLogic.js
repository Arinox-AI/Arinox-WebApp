/* Price Discovery wizard — pure state logic, no React.
 * Kept separate so the gating / cap / payload rules are unit-testable
 * (client/tests/pricing.test.jsx) and the page stays presentational.
 *
 * Data hygiene: only the answers persist (sessionStorage) — contact
 * fields never leave component state (per the design brief).
 */
import { wizard } from '../../data/pricing';
import { validateContact as validateShared } from '../site/ContactFields';

export const QUESTIONS = wizard.questions;
export const QUESTION_COUNT = QUESTIONS.length;
export const STEP_TOTAL = QUESTION_COUNT + 1; // the questions + contact
export const ANSWERS_KEY = 'arinox-discovery-answers';

export function blankAnswers() {
  return {
    industry: '', size: '', teams: [], apps: [], data: '', outcome: [],
    stage: '', blockers: [], budget: '', budgetCurrency: '', timeline: '',
  };
}

/* Join selected options for the lead payload (empty → null, like the server). */
const join = (list) =>
  Array.isArray(list) ? (list.length ? list.join(', ') : null) : list || null;

/* Multi-select answers in the email summary: " | " so the team email can split
   them into one-per-line (answers themselves may contain commas). */
const joinLines = (list) =>
  Array.isArray(list) ? (list.length ? list.join(" | ") : null) : list || null;

/* Toggle an option in a multi-select answer, honouring the cap. Attempting to
 * exceed `max` is a no-op (the page surfaces a cap note instead). */
export function toggleOption(list, value, max) {
  if (list.includes(value)) return list.filter((v) => v !== value);
  if (max && list.length >= max) return list;
  return [...list, value];
}

/* True when a multi-select is at its cap and `value` is not selected. */
export function isCapReached(list, max, value) {
  return Boolean(max && list.length >= max && !list.includes(value));
}

/* A step (1..QUESTION_COUNT) is complete when its answer exists (single) or is non-empty
 * (multi). Steps 7+ (contact) have their own validation gate. */
export function stepAnswered(step, answers) {
  if (step < 1 || step > QUESTION_COUNT) return true;
  const question = QUESTIONS[step - 1];
  const a = answers[question.key];
  if (question.type === 'text') return question.optional ? true : Boolean(String(a || '').trim());
  return question.type === 'single' ? Boolean(a) : Array.isArray(a) && a.length > 0;
}

/* Default currency symbol for the budget: rupees for an Indian locale, else dollars. */
export function defaultCurrencySymbol() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (/Kolkata|Calcutta/.test(tz) || (navigator.language || '').includes('-IN')) return '\u20B9';
  } catch {
    /* fall through */
  }
  return '$';
}

/* The budget as the team reads it: the chosen symbol + what the visitor typed. */
export function budgetLabel(answers) {
  const text = String(answers.budget || '').trim();
  if (!text) return '';
  return `${answers.budgetCurrency || defaultCurrencySymbol()} ${text}`;
}

/* sessionStorage persistence — answers only, never contact fields. */
export function loadAnswers() {
  try {
    const raw = sessionStorage.getItem(ANSWERS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    /* Keep only answers that are still valid options: a draft saved before a
       question was reworded must not resurface with a dead answer. */
    const out = blankAnswers();
    for (const q of QUESTIONS) {
      const v = parsed?.[q.key];
      if (!Array.isArray(q.options)) {
        if (typeof v === 'string') out[q.key] = v.slice(0, q.maxLength || 200);
      } else if (q.type === 'multi') {
        out[q.key] = Array.isArray(v) ? v.filter((x) => q.options.includes(x)) : [];
      } else if (q.options.includes(v)) {
        out[q.key] = v;
      }
    }
    if (typeof parsed?.budgetCurrency === 'string') out.budgetCurrency = parsed.budgetCurrency;
    return out;
  } catch {
    return null;
  }
}

/* True when a restored draft actually carries at least one answer. */
export function hasAnyAnswer(answers) {
  return QUESTIONS.some((q) => {
    const v = answers?.[q.key];
    return Array.isArray(v) ? v.length > 0 : Boolean(String(v || '').trim());
  });
}

export function saveAnswers(answers) {
  try {
    sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
  } catch {
    /* storage unavailable (private mode) — in-memory state still works */
  }
}

export function clearAnswers() {
  try {
    sessionStorage.removeItem(ANSWERS_KEY);
  } catch {
    /* noop */
  }
}

/* Contact validation — the shared rules (name + email) plus the two the
 * survey adds (company, role). Same voice as the contact hub: short, human. */
export function validateContact(contact, errorText) {
  const errors = validateShared(contact);
  if (errors.name) errors.name = errorText.name;
  if (errors.email) errors.email = errorText.email;
  if (!contact.company.trim()) errors.company = errorText.company;
  if (!contact.role.trim()) errors.role = errorText.role;
  return errors;
}

/* Lead payload for POST /api/v1/inquiries (the unified intake: one endpoint,
 * one row, one team email - honeypot, rate limiting, team notification and
 * the server-owned auto-reply are all inherited). `intent` is what the team
 * sees; the answers ride along in the ICP columns the Leads table already
 * had. */
export function buildLeadPayload({ answers, contact, context = {}, intent = 'pricing', heading = 'Price Discovery answers' }) {
  const summary = [
    heading,
    `Industry: ${answers.industry || 'n/a'}`,
    `Organisation size: ${answers.size || 'n/a'}`,
    `Teams: ${joinLines(answers.teams) || 'n/a'}`,
    `Applications: ${joinLines(answers.apps) || 'n/a'}`,
    `Data: ${answers.data || 'n/a'}`,
    `Outcomes: ${joinLines(answers.outcome) || 'n/a'}`,
    `AI today: ${answers.stage || 'n/a'}`,
    `Blockers: ${joinLines(answers.blockers) || 'n/a'}`,
    `Budget (next 12 months): ${budgetLabel(answers) || 'n/a'}`,
    `Wants to be live: ${answers.timeline || 'n/a'}`,
    context.deployment ? `Deployment context: ${context.deployment}` : null,
    context.currency ? `Currency: ${context.currency}` : null,
    contact.role ? `Contact role: ${contact.role}` : null,
    contact.notes ? `Notes: ${contact.notes}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  return {
    name: contact.name.trim().slice(0, 120),
    email: contact.email.trim().slice(0, 255),
    company: contact.company.trim().slice(0, 160),
    companyType: answers.industry || null,
    companySize: answers.size || null,
    aiTools: join(answers.apps),
    useCases: join([...(answers.teams || []), ...(answers.outcome || [])]),
    message: summary,
    intent,
    source: intent === 'profile' ? 'home' : 'survey',
    website: contact.website, // honeypot: '' for humans, bot junk for bots
    turnstileToken: context.token || undefined,
    landing_page: typeof window !== 'undefined' ? window.location.href : undefined,
    cta: context.cta || null,
  };
}
