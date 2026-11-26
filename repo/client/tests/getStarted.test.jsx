// @vitest-environment jsdom
// /get-started: one journey (your business -> who you are -> your call).
// Step navigation, the skip link, deep-link starting steps, the lead POST on
// Step 2, the optional call on Step 3, and the /contact redirect.
// Hermetic - axios is mocked, nothing leaves the browser.
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import App from '../src/App.jsx';
import { ClientIntake } from '../src/components/site/ClientIntake.jsx';
import { contactRedirectTarget } from '../src/lib/contactRedirect.js';
import { intake, inquiries } from '../src/data/inquiries.js';
import {
  QUESTIONS,
  blankAnswers,
  saveAnswers,
  clearAnswers,
  loadAnswers,
  roadmapSummary,
  bookingNotes,
  buildFlowPayload,
} from '../src/components/pricing/wizardLogic';

vi.mock('axios', () => ({ default: { get: vi.fn(), post: vi.fn() } }));
vi.mock('react-hot-toast', () => ({ default: { success: vi.fn(), error: vi.fn() } }));
vi.mock('@vercel/analytics/react', () => ({ Analytics: () => null }));

/* Two open times on one future day (local construction keeps the day stable in any tz). */
const base = new Date();
base.setDate(base.getDate() + 3);
base.setHours(10, 0, 0, 0);
const SLOTS = [base.toISOString(), new Date(base.getTime() + 30 * 60e3).toISOString()];
const time = (iso) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

const fullAnswers = () => {
  const a = blankAnswers();
  for (const q of QUESTIONS) {
    if (q.type === 'text') a[q.key] = '50 lakh';
    else if (q.type === 'single') a[q.key] = q.options[0];
    else a[q.key] = [q.options[0]];
  }
  return a;
};

const renderFlow = (props = {}) =>
  render(
    <MemoryRouter>
      <ClientIntake headingLevel="h1" {...props} />
    </MemoryRouter>
  );

const label = () => screen.getByTestId('step-label').textContent;
const fill = (re, value) => fireEvent.change(screen.getByLabelText(re), { target: { value } });
const fillYou = () => {
  fill(/full name/i, 'Asha Rao');
  fill(/work email/i, 'asha@northwind.in');
  fill(/^company/i, 'Northwind');
  fill(/your role/i, 'Head of Operations');
};
const sendDetails = () => fireEvent.click(screen.getByRole('button', { name: intake.contact.cta }));
const wait = { timeout: 3000 };

beforeEach(() => {
  window.sessionStorage.clear();
  clearAnswers();
  axios.get.mockResolvedValue({ data: { success: true, data: { slots: SLOTS, durationMin: 30, timezone: 'Asia/Kolkata' } } });
  axios.post.mockImplementation(async (url) =>
    url === '/api/v1/booking'
      ? { data: { success: true, data: { startAt: SLOTS[0], meetLink: null } } }
      : { data: { success: true, id: 7 } }
  );
});
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('step 1: your business', () => {
  it('opens on the first question with no up-front chooser', () => {
    renderFlow();
    expect(label()).toBe('Step 1 of 3 · Your business');
    expect(screen.getAllByText(QUESTIONS[0].question).length).toBeGreaterThan(0);
    expect(screen.queryByRole('tab')).toBeNull();
    expect(screen.queryByLabelText(/full name/i)).toBeNull();
  });

  it('walks the ten questions with Continue and Back, then lands on Step 2', async () => {
    saveAnswers(fullAnswers());
    renderFlow();
    for (let i = 0; i < QUESTIONS.length; i += 1) {
      await screen.findByText(QUESTIONS[i].question, {}, wait);
      if (i === 1) {
        fireEvent.click(screen.getByRole('button', { name: 'Back' }));
        await screen.findByText(QUESTIONS[0].question, {}, wait);
        fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
        await screen.findByText(QUESTIONS[1].question, {}, wait);
      }
      fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    }
    await screen.findByLabelText(/your role/i, {}, wait);
    expect(label()).toBe('Step 2 of 3 · Who you are');
  }, 20000);

  it('"Skip — just talk to us" jumps to Step 2 without saving anything', async () => {
    renderFlow();
    fireEvent.click(screen.getByRole('button', { name: /skip — just talk to us/i }));
    await screen.findByLabelText(/full name/i, {}, wait);
    expect(label()).toBe('Step 2 of 3 · Who you are');
    expect(axios.post).not.toHaveBeenCalled();
    // A plain skip is not an enquiry: no subject picker.
    expect(screen.queryByLabelText(/what is this about/i)).toBeNull();
  });
});

describe('deep links pick the starting step', () => {
  it('start=roadmap opens Step 1', () => {
    renderFlow({ start: 'roadmap' });
    expect(label()).toBe('Step 1 of 3 · Your business');
  });

  it('start=message opens Step 2 with the subject picker', () => {
    renderFlow({ start: 'message' });
    expect(label()).toBe('Step 2 of 3 · Who you are');
    expect(screen.getByLabelText(/what is this about/i).value).toBe('0'); // General inquiry
    expect(screen.queryByLabelText(/which one/i)).toBeNull();
  });

  it('start=book opens Step 2 (then Step 3 after it is sent), without the subject picker', () => {
    renderFlow({ start: 'book' });
    expect(label()).toBe('Step 2 of 3 · Who you are');
    expect(screen.queryByLabelText(/what is this about/i)).toBeNull();
  });

  it('intent=deck&asset=secure-os opens Step 2 with the deck and the asset picked', () => {
    renderFlow({ intent: 'deck', asset: 'secure-os' });
    expect(label()).toBe('Step 2 of 3 · Who you are');
    expect(screen.getByLabelText(/what is this about/i).value).toBe('1'); // Request a deck
    expect(screen.getByLabelText(/which one/i).value).toBe('secure-os');
    // The note asks the deck question, as the old form did.
    expect(screen.getByLabelText(/anything we should know/i)).toBeTruthy();
  });

  it('intent=partnership asks the partnership question', () => {
    renderFlow({ intent: 'partnership' });
    expect(screen.getByLabelText(/what is this about/i).value).toBe('2');
    expect(screen.getByLabelText(/what would you like to build together/i)).toBeTruthy();
  });

  it('ignores an unknown intent or asset', () => {
    renderFlow({ intent: 'bogus', asset: 'nope' });
    expect(label()).toBe('Step 1 of 3 · Your business');
  });
});

describe('step 2: who you are saves the lead', () => {
  it('validates before it posts', async () => {
    renderFlow({ start: 'message' });
    sendDetails();
    await waitFor(() => expect(screen.getAllByRole('alert').length).toBeGreaterThan(0));
    expect(axios.post).not.toHaveBeenCalled();
  });

  it('posts a plain question when nothing was answered, then offers the call', async () => {
    renderFlow({ start: 'message' });
    fillYou();
    fill(/what should we look at first/i, 'We run 40 lines of cutting machines.');
    sendDetails();

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    const [url, payload] = axios.post.mock.calls[0];
    expect(url).toBe('/api/v1/inquiries');
    expect(payload).toMatchObject({ name: 'Asha Rao', email: 'asha@northwind.in', company: 'Northwind', intent: 'question', website: '' });
    expect(payload.message).toContain('40 lines of cutting machines');
    expect(payload.message).toContain('Contact role: Head of Operations');
    // The existing attribution payload travels with it.
    expect(typeof payload.landing_page).toBe('string');
    expect(payload.utm_source).toBeNull();

    expect(await screen.findByText(intake.call.heading, {}, wait)).toBeTruthy();
    expect(label()).toBe('Step 3 of 3 · Your call (optional)');
  });

  it('keeps the named enquiry (deck + asset + subject) when it posts', async () => {
    renderFlow({ intent: 'deck', asset: 'industrial-os' });
    fillYou();
    sendDetails();
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    const payload = axios.post.mock.calls[0][1];
    expect(payload).toMatchObject({ intent: 'deck', asset: 'industrial-os', subject: 'Request a deck', source: 'hub' });
  });

  it('posts the profile intent, with the answers, when the questions were answered', async () => {
    saveAnswers(fullAnswers());
    renderFlow({ start: 'book' });
    fillYou();
    sendDetails();
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    const payload = axios.post.mock.calls[0][1];
    expect(payload.intent).toBe('profile');
    expect(payload.source).toBe('home');
    expect(payload.message).toContain('Business profile answers');
    expect(payload.message).toContain(`Industry: ${QUESTIONS[0].options[0]}`);
    expect(payload.companyType).toBe(QUESTIONS[0].options[0]);
    await screen.findByText(intake.call.heading, {}, wait);
    // Sent answers are not kept for the next visit.
    expect(loadAnswers()).toBeNull();
  });

  it('shows an error and stays on Step 2 when the save fails', async () => {
    axios.post.mockRejectedValueOnce({ response: { data: { message: 'Nope.' } } });
    renderFlow({ start: 'message' });
    fillYou();
    sendDetails();
    expect(await screen.findByText(/nope\./i, {}, wait)).toBeTruthy();
    expect(label()).toBe('Step 2 of 3 · Who you are');
  });

  it('builds the lead payload purely (named intent wins over answers)', () => {
    const contact = { name: 'A', email: 'a@b.co', company: 'C', role: 'R', notes: 'hello', website: '' };
    const withAnswers = buildFlowPayload({ answers: fullAnswers(), contact, enquiry: { intent: 'pricing', asset: null, subject: 'Pricing' } });
    expect(withAnswers.intent).toBe('pricing');
    expect(withAnswers.message).toContain('Industry:');
    expect(withAnswers.asset).toBeUndefined();
    const plain = buildFlowPayload({ answers: blankAnswers(), contact, enquiry: null });
    expect(plain.intent).toBe('question');
    expect(plain.source).toBe('hub');
  });
});

describe('step 3: your call', () => {
  const toCall = async (props = { start: 'book' }) => {
    renderFlow(props);
    fillYou();
    sendDetails();
    await screen.findByText(intake.call.heading, {}, wait);
  };

  it('booking without answering sends profileDone false (the email then asks for the questions)', async () => {
    await toCall();
    fireEvent.click(await screen.findByRole('button', { name: time(SLOTS[0]) }));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    fireEvent.click(await screen.findByRole('button', { name: /confirm booking/i }));
    await screen.findByText(/you.re booked, Asha/i, {}, wait);
    expect(axios.post.mock.calls[1][1].profileDone).toBe(false);
  });

  it('?booked=1 (link in the booking email): no skip link, and it finishes without offering the calendar', async () => {
    renderFlow({ start: 'roadmap', alreadyBooked: true });
    expect(screen.queryByRole('button', { name: /skip/i })).toBeNull();
    saveAnswers(fullAnswers());
    cleanup();
    renderFlow({ start: 'book', alreadyBooked: true });
    fillYou();
    sendDetails();
    expect(await screen.findByText(intake.done.prepared.heading, {}, wait)).toBeTruthy();
    expect(screen.queryByText(intake.call.heading)).toBeNull();
    expect(axios.post.mock.calls.map((c) => c[0])).toEqual(['/api/v1/inquiries']);
    expect(axios.post.mock.calls[0][1].intent).toBe('profile');
  });

  it('"No call yet — email me first" finishes with a received-only confirmation', async () => {
    await toCall();
    fireEvent.click(screen.getByRole('button', { name: /no call yet — email me first/i }));
    expect(await screen.findByText(intake.done.received.heading, {}, wait)).toBeTruthy();
    expect(screen.getByText(/asha@northwind\.in/)).toBeTruthy();
    expect(screen.queryByText(/you.re booked/i)).toBeNull();
    // Only the lead was posted - no booking.
    expect(axios.post.mock.calls.map((c) => c[0])).toEqual(['/api/v1/inquiries']);
  });

  it('books with name, email and company prefilled, the roadmap in the notes, and confirms both', async () => {
    saveAnswers(fullAnswers());
    await toCall();
    fireEvent.click(await screen.findByRole('button', { name: time(SLOTS[0]) }));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Nothing to retype.
    expect(await screen.findByText(/booking as/i)).toBeTruthy();
    expect(screen.queryByLabelText(/work email/i)).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /confirm booking/i }));

    expect(await screen.findByText(/you.re booked, Asha/i, {}, wait)).toBeTruthy();
    const calls = axios.post.mock.calls;
    expect(calls.map((c) => c[0])).toEqual(['/api/v1/inquiries', '/api/v1/booking']);
    const booking = calls[1][1];
    expect(booking).toMatchObject({ name: 'Asha Rao', email: 'asha@northwind.in', company: 'Northwind', startAt: SLOTS[0] });
    expect(booking.notes).toContain('Roadmap answers');
    expect(booking.notes).toContain(`Industry: ${QUESTIONS[0].options[0]}`);
    expect(booking.notes.length).toBeLessThanOrEqual(2000);
    // Answered -> the confirmation email thanks them instead of asking.
    expect(booking.profileDone).toBe(true);
    expect(screen.getByText('Received · Booked')).toBeTruthy();
  }, 20000);
});

describe('roadmap summary for the booking notes', () => {
  it('is empty with no answers, lists only answered rows, and respects the 2000-character limit', () => {
    expect(roadmapSummary(blankAnswers())).toBe('');
    const s = roadmapSummary({ ...blankAnswers(), industry: 'BFSI', teams: ['Finance', 'Operations'] });
    expect(s).toBe('Roadmap answers\nIndustry: BFSI\nTeams: Finance; Operations');
    expect(bookingNotes('x'.repeat(1990), s)).toHaveLength(2000);
    expect(bookingNotes('', '')).toBe('');
  });
});

describe('/contact redirects to /get-started and keeps the query', () => {
  it('maps the target pure-function cases', () => {
    expect(contactRedirectTarget('?intent=deck&asset=secure-os')).toBe('/get-started?intent=deck&asset=secure-os');
    expect(contactRedirectTarget('?tab=book')).toBe('/get-started?start=book');
    expect(contactRedirectTarget('?tab=message')).toBe('/get-started?start=message');
    expect(contactRedirectTarget('?tab=message&utm_source=li')).toBe('/get-started?utm_source=li&start=message');
    expect(contactRedirectTarget('?start=roadmap')).toBe('/get-started?start=roadmap');
    // A bare /contact used to open the calendar (the booking emails still link to it).
    expect(contactRedirectTarget('')).toBe('/get-started?start=book');
  });

  const Where = () => {
    const l = useLocation();
    return <p data-testid="where">{l.pathname + l.search}</p>;
  };
  const at = (path) =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <HelmetProvider>
          <App />
          <Where />
        </HelmetProvider>
      </MemoryRouter>
    );

  it('/contact?intent=deck&asset=secure-os lands on Step 2 with the deck picked', async () => {
    at('/contact?intent=deck&asset=secure-os');
    await screen.findByRole('heading', { level: 1, name: /tell us about your business/i }, { timeout: 15000 });
    expect(screen.getByTestId('where').textContent).toBe('/get-started?intent=deck&asset=secure-os');
    expect(screen.getByLabelText(/which one/i).value).toBe('secure-os');
    expect(label()).toBe('Step 2 of 3 · Who you are');
  }, 20000);

  it('/contact?tab=book becomes ?start=book and opens Step 2', async () => {
    at('/contact?tab=book');
    await screen.findByRole('heading', { level: 1, name: /tell us about your business/i }, { timeout: 15000 });
    expect(screen.getByTestId('where').textContent).toBe('/get-started?start=book');
    expect(label()).toBe('Step 2 of 3 · Who you are');
  }, 20000);

  it('/get-started with no params still starts at Step 1 (SDR emails use this URL)', async () => {
    at('/get-started');
    await screen.findByRole('heading', { level: 1, name: /tell us about your business/i }, { timeout: 15000 });
    expect(screen.getByTestId('where').textContent).toBe('/get-started');
    expect(label()).toBe('Step 1 of 3 · Your business');
  }, 20000);

  it('keeps /survey and /pricing/discovery working', async () => {
    at('/survey');
    await screen.findByRole('heading', { level: 1, name: /tell us about your business/i }, { timeout: 15000 });
    expect(screen.getByTestId('where').textContent).toBe('/get-started');
  }, 20000);
});

describe('copy', () => {
  it('names three steps and every enquiry subject has an intent the server knows', () => {
    expect(intake.steps.map((s) => s.key)).toEqual(['business', 'you', 'call']);
    for (const s of inquiries.subjects) expect(['question', 'deck', 'partnership', 'pricing']).toContain(s.intent);
  });
});
