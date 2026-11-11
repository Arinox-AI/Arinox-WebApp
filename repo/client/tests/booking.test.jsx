// @vitest-environment jsdom
// Booking widget + Contact toggle — hermetic (axios mocked, no network).
import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import BookingWidget from '../src/components/booking/BookingWidget.jsx';
import Contact from '../src/pages/Contact.jsx';

vi.mock('axios', () => ({ default: { get: vi.fn(), post: vi.fn() } }));
vi.mock('react-hot-toast', () => ({ default: { success: vi.fn(), error: vi.fn() } }));

// Two slots on one future day (local-time construction keeps the day stable in any tz).
const base = new Date();
base.setDate(base.getDate() + 3);
base.setHours(10, 0, 0, 0);
const SLOTS = [base.toISOString(), new Date(base.getTime() + 30 * 60e3).toISOString()];
const label = (iso) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

beforeEach(() => {
  axios.get.mockResolvedValue({ data: { success: true, data: { slots: SLOTS, durationMin: 30, timezone: 'Asia/Kolkata' } } });
  axios.post.mockResolvedValue({ data: { success: true, data: { startAt: SLOTS[0], meetLink: null } } });
});
afterEach(() => { cleanup(); vi.clearAllMocks(); });

const wrap = (ui) => render(<MemoryRouter><HelmetProvider>{ui}</HelmetProvider></MemoryRouter>);

describe('BookingWidget', () => {
  it('picks a time, takes details and confirms the booking', async () => {
    wrap(<BookingWidget />);
    fireEvent.click(await screen.findByRole('button', { name: label(SLOTS[0]) }));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    fireEvent.change(await screen.findByLabelText(/full name/i), { target: { name: 'name', value: 'Priya Shah' } });
    fireEvent.change(screen.getByLabelText(/work email/i), { target: { name: 'email', value: 'priya@meridian.example' } });
    fireEvent.click(screen.getByRole('button', { name: /confirm booking/i }));

    expect(await screen.findByText(/you.re booked, Priya/i)).toBeTruthy();
    const payload = axios.post.mock.calls[0][1];
    expect(axios.post.mock.calls[0][0]).toBe('/api/v1/booking');
    expect(payload).toMatchObject({ name: 'Priya Shah', email: 'priya@meridian.example', startAt: SLOTS[0], website: '' });
  });

  it('validates details before posting', async () => {
    wrap(<BookingWidget />);
    fireEvent.click(await screen.findByRole('button', { name: label(SLOTS[0]) }));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    fireEvent.click(await screen.findByRole('button', { name: /confirm booking/i }));
    expect(await screen.findAllByRole('alert')).toHaveLength(2); // name + email
    expect(axios.post).not.toHaveBeenCalled();
  });

  it('returns to the picker when the slot was just taken (409)', async () => {
    axios.post.mockRejectedValueOnce({ response: { status: 409, data: { message: 'taken' } } });
    wrap(<BookingWidget />);
    fireEvent.click(await screen.findByRole('button', { name: label(SLOTS[0]) }));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    fireEvent.change(await screen.findByLabelText(/full name/i), { target: { name: 'name', value: 'A B' } });
    fireEvent.change(screen.getByLabelText(/work email/i), { target: { name: 'email', value: 'a@b.co' } });
    fireEvent.click(screen.getByRole('button', { name: /confirm booking/i }));
    await waitFor(() => expect(screen.getByText(/30-minute discovery session/i)).toBeTruthy());
    expect(screen.queryByLabelText(/full name/i)).toBeNull(); // back on the picker
    expect(axios.get).toHaveBeenCalledTimes(2); // availability refetched
  });

  it('shows a live loading state while the calendar is being read', async () => {
    let release;
    axios.get.mockReturnValue(new Promise((resolve) => { release = () => resolve({ data: { success: true, data: { slots: SLOTS, durationMin: 30, timezone: 'Asia/Kolkata' } } }); }));

    wrap(<BookingWidget />);

    // The card shows the shape of the calendar that is coming, not a bare line.
    expect(await screen.findByText(/checking the calendar/i)).toBeTruthy();
    expect(screen.getByRole('status').getAttribute('aria-busy')).toBe('true');
    expect(document.querySelectorAll('.skeleton').length).toBeGreaterThan(10);

    release();
    expect(await screen.findByRole('button', { name: label(SLOTS[0]) })).toBeTruthy();
  });

  it('shows a graceful state when no times are open', async () => {
    axios.get.mockResolvedValue({ data: { success: true, data: { slots: [] } } });
    wrap(<BookingWidget />);
    expect(await screen.findByText(/no open times/i)).toBeTruthy();
  });
});

describe('Contact page toggle', () => {
  it('defaults to booking and switches to the message form', async () => {
    wrap(<Contact />);
    expect(await screen.findByText(/30-minute discovery session/i)).toBeTruthy();
    fireEvent.click(screen.getByRole('tab', { name: /send a message/i }));
    expect(screen.getByRole('button', { name: /send message/i })).toBeTruthy();
  });
});
