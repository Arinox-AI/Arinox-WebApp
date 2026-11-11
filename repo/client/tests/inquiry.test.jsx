// @vitest-environment jsdom
// The site's one enquiry form (the contact hub). Hermetic - axios is mocked,
// nothing leaves the browser.
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { InquiryForm } from '../src/components/site/InquiryForm.jsx';
import { inquiries } from '../src/data/inquiries.js';

vi.mock('axios', () => ({
  default: { post: vi.fn(async () => ({ data: { success: true } })) },
}));

const renderForm = (props = {}) =>
  render(
    <MemoryRouter>
      <InquiryForm
        subjects={inquiries.subjects}
        assets={inquiries.assets}
        label="Send a message"
        cta="Send message"
        messageRequired
        form={inquiries.form}
        {...props}
      />
    </MemoryRouter>
  );

const fill = (label, value) => fireEvent.change(screen.getByLabelText(label), { target: { value } });
const submit = () => fireEvent.click(screen.getByRole('button', { name: /send|request/i }));

beforeEach(() => {
  axios.post.mockClear();
});
afterEach(cleanup);

describe('the contact hub form', () => {
  it('posts to the unified intake with the intent the visitor chose', async () => {
    renderForm();

    // Default is a general inquiry - no document picker yet.
    expect(screen.queryByLabelText(/which one/i)).toBeNull();

    fill(/what is this about/i, '1'); // Request a deck
    expect(screen.getByLabelText(/which one/i)).toBeTruthy();
    fill(/which one/i, 'industrial-os');

    fill(/full name/i, 'Asha Rao');
    fill(/work email/i, 'asha@northwind.in');
    // Picking a deck changes the question the message field asks.
    fill(/anything we should know/i, 'We run 40 lines of cutting machines.');
    submit();

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    const [url, payload] = axios.post.mock.calls[0];
    expect(url).toBe('/api/v1/inquiries');
    expect(payload.intent).toBe('deck');
    expect(payload.asset).toBe('industrial-os');
    expect(payload.subject).toBe('Request a deck');
    expect(payload.message).toContain('40 lines of cutting machines');
    // Attribution travels with the enquiry - the funnel stops being blind.
    expect(typeof payload.landing_page).toBe('string');
    expect(payload.utm_source).toBeNull();
  });

  it('opens with the document already picked when a product page links in', () => {
    renderForm({ initialIntent: 'deck', initialAsset: 'industrial-os' });

    expect(screen.getByLabelText(/what is this about/i).value).toBe('1'); // Request a deck
    expect(screen.getByLabelText(/which one/i).value).toBe('industrial-os');
  });

  it('opens on partnership when the partners page links in', () => {
    renderForm({ initialIntent: 'partnership' });
    expect(screen.getByLabelText(/what is this about/i).value).toBe('2'); // Partnership
  });

  it('offers a pricing door that asks a different question', async () => {
    renderForm();

    // Pick "Pricing" — the message question changes with the intent.
    fill(/what is this about/i, '3');
    expect(screen.getByText(/what are you trying to price/i)).toBeTruthy();

    fill(/full name/i, 'Asha Rao');
    fill(/work email/i, 'asha@northwind.in');
    fill(/what are you trying to price/i, 'We want to price our cutting-floor workflow.');
    submit();

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    const [url, payload] = axios.post.mock.calls[0];
    expect(url).toBe('/api/v1/inquiries');
    expect(payload.intent).toBe('pricing');
    expect(payload.source).toBe('hub');
    expect(payload.message).toContain('cutting-floor workflow');
  });

  it('asks for a name, an email and a message before it posts', async () => {
    renderForm();

    submit();
    await waitFor(() => expect(screen.getAllByRole('alert').length).toBeGreaterThan(0));
    expect(axios.post).not.toHaveBeenCalled();
  });

  it('never sends the honeypot value as anything but the honeypot', async () => {
    renderForm();

    fill(/full name/i, 'Asha Rao');
    fill(/work email/i, 'asha@northwind.in');
    fill(/what should we look at first/i, 'We run 40 lines of cutting machines.');
    submit();

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post.mock.calls[0][1].website).toBe('');
  });
});
