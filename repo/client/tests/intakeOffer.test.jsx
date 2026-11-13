// @vitest-environment jsdom
// The client intake offered after someone reaches us: the "Received" screen
// shows the offer, the dialog opens with what they typed carried over, the
// lead is tagged with where it came from, and the offer is not shown again
// once this browser has sent the intake. Hermetic - axios is mocked.
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { InquiryForm } from '../src/components/site/InquiryForm.jsx';
import { IntakeOffer } from '../src/components/site/IntakeDialog.jsx';
import { inquiries, intakeOffer } from '../src/data/inquiries.js';
import { nav } from '../src/data/site.js';
import {
  QUESTIONS,
  DONE_KEY,
  blankAnswers,
  saveAnswers,
  clearAnswers,
  hasCompletedIntake,
  buildLeadPayload,
} from '../src/components/pricing/wizardLogic';

vi.mock('axios', () => ({
  default: { post: vi.fn(async () => ({ data: { success: true } })) },
}));

/* A complete set of answers, so a test can jump straight to the contact step. */
const fullAnswers = () => {
  const a = blankAnswers();
  for (const q of QUESTIONS) {
    if (q.type === 'text') a[q.key] = '50 lakh';
    else if (q.type === 'single') a[q.key] = q.options[0];
    else a[q.key] = [q.options[0]];
  }
  return a;
};

/* Click Continue through every (pre-answered) question, waiting for each
   step to render - the step transition is animated. */
const walkToContact = async () => {
  for (let i = 0; i < QUESTIONS.length; i += 1) {
    await screen.findByText(QUESTIONS[i].question, {}, { timeout: 3000 });
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
  }
  await screen.findByLabelText(/your role/i, {}, { timeout: 3000 });
};

const fill = (label, value) => fireEvent.change(screen.getByLabelText(label), { target: { value } });

beforeEach(() => {
  axios.post.mockClear();
  window.sessionStorage.clear();
  window.localStorage.clear();
  clearAnswers();
});
afterEach(cleanup);

describe('finding the intake', () => {
  it('is a header button (not a nav item), so it is one click from every page', () => {
    expect(nav.some((i) => i.to === '/get-started')).toBe(false);
  });
});

describe('the intake offered after a message', () => {
  const sendMessage = async () => {
    render(
      <MemoryRouter>
        <InquiryForm subjects={inquiries.subjects} label="Send a message" cta="Send message" form={inquiries.form} messageRequired />
      </MemoryRouter>
    );
    fill(/full name/i, 'Asha Rao');
    fill(/work email/i, 'asha@northwind.in');
    fill(/organisation/i, 'Northwind');
    fill(/what should we look at first|anything we should know|message/i, 'We run 40 lines.');
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await screen.findByText(intakeOffer.afterMessage.eyebrow);
  };

  it('shows the offer on the Received screen and opens the dialog prefilled', async () => {
    await sendMessage();
    fireEvent.click(screen.getByRole('button', { name: intakeOffer.afterMessage.cta }));

    const dialog = await screen.findByRole('dialog');
    expect(dialog.hasAttribute('open')).toBe(true);
    expect(screen.getByText(intakeOffer.dialog.title)).toBeTruthy();
    // The first question shows; the intake starts at step 1.
    expect(screen.getAllByText(QUESTIONS[0].question).length).toBeGreaterThan(0);
  });

  it('carries name, email and company to the contact step and tags the lead', async () => {
    saveAnswers(fullAnswers());
    await sendMessage();
    axios.post.mockClear();
    fireEvent.click(screen.getByRole('button', { name: intakeOffer.afterMessage.cta }));
    await screen.findByRole('dialog');

    // Walk to the contact step: every question is already answered.
    await walkToContact();
    const name = await screen.findByLabelText(/full name/i);
    expect(name.value).toBe('Asha Rao');
    expect(screen.getByLabelText(/work email/i).value).toBe('asha@northwind.in');
    expect(screen.getByLabelText(/company/i).value).toBe('Northwind');

    fill(/your role/i, 'Head of Operations');
    fireEvent.click(screen.getByRole('button', { name: /send my profile/i }));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    const [, payload] = axios.post.mock.calls[0];
    expect(payload.intent).toBe('profile');
    expect(payload.source).toBe('after-message');
    expect(payload.cta).toBe('intake-dialog');
    expect(hasCompletedIntake()).toBe(true);

    // Finish screen: Done closes the dialog, and the offer does not come back.
    fireEvent.click(await screen.findByRole('button', { name: intakeOffer.doneClose }));
    await waitFor(() => expect(screen.queryByRole('button', { name: intakeOffer.afterMessage.cta })).toBeNull());
  });

  it('closing half-way keeps the answers for next time', async () => {
    await sendMessage();
    fireEvent.click(screen.getByRole('button', { name: intakeOffer.afterMessage.cta }));
    await screen.findByRole('dialog');
    fireEvent.click(screen.getByRole('button', { name: new RegExp(QUESTIONS[0].options[0]) }));
    fireEvent.click(screen.getByRole('button', { name: intakeOffer.dialog.close }));

    expect(screen.queryByText(intakeOffer.dialog.title)).toBeNull();
    expect(screen.getByRole('button', { name: intakeOffer.afterMessage.cta })).toBeTruthy();
    expect(JSON.parse(window.sessionStorage.getItem('arinox-discovery-answers'))[QUESTIONS[0].key]).toBe(QUESTIONS[0].options[0]);
  });
});

describe('the offer itself', () => {
  it('is hidden once this browser has sent the intake', () => {
    window.localStorage.setItem(DONE_KEY, '1');
    render(
      <MemoryRouter>
        <IntakeOffer source="after-booking" eyebrow="Before we meet" text="t" cta="Answer 10 questions" />
      </MemoryRouter>
    );
    expect(screen.queryByRole('button', { name: 'Answer 10 questions' })).toBeNull();
  });

  it('after a booking, the finish screen does not ask them to book again', async () => {
    saveAnswers(fullAnswers());
    render(
      <MemoryRouter>
        <IntakeOffer
          source="after-booking"
          showBooking={false}
          prefill={{ name: 'Asha Rao', email: 'asha@northwind.in', company: 'Northwind' }}
          eyebrow="Before we meet"
          text="t"
          cta="Answer 10 questions"
        />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Answer 10 questions' }));
    await screen.findByRole('dialog');
    await walkToContact();
    fill(/your role/i, 'CIO');
    fireEvent.click(await screen.findByRole('button', { name: /send my profile/i }));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post.mock.calls[0][1].source).toBe('after-booking');
    await screen.findByRole('button', { name: intakeOffer.doneClose });
    expect(screen.queryByRole('link', { name: /book a time/i })).toBeNull();
  });

  it('the page intake keeps its own source tag', () => {
    const p = buildLeadPayload({ answers: fullAnswers(), contact: { name: 'A', email: 'a@b.co', company: 'C', role: 'R' }, intent: 'profile' });
    expect(p.source).toBe('home');
  });
});
