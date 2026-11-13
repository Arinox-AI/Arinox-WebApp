// @vitest-environment jsdom
// Header buttons, nav shape and the closing bands (site feedback plan, phase A).
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '../src/App.jsx';
import { nav } from '../src/data/site';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(async () => ({ data: { success: true, data: [] } })),
    post: vi.fn(async () => ({ data: { success: true } })),
  },
}));
vi.mock('@vercel/analytics/react', () => ({ Analytics: () => null }));

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </MemoryRouter>
  );

const h1 = (name) => screen.findByRole('heading', { level: 1, name }, { timeout: 15000 });
const header = () => within(screen.getByRole('banner'));

afterEach(cleanup);

describe('nav data', () => {
  it('has exactly five items, without Home, Contact or the roadmap button', () => {
    expect(nav.map((i) => i.label)).toEqual(['Products', 'Pricing', 'Case studies', 'Company', 'Blog']);
    expect(nav.find((i) => i.label === 'Case studies').to).toBe('/case-studies');
    const company = nav.find((i) => i.label === 'Company');
    expect(company.to).toBe('/people');
    expect(company.group.map((c) => c.to)).toEqual(['/people', '/partners', '/careers']);
  });
});

describe('header buttons', () => {
  for (const path of ['/', '/pricing']) {
    it(`shows Get your AI roadmap and Book a call on ${path} without scrolling`, async () => {
      renderAt(path);
      await h1(/./);
      const get = header().getAllByRole('link', { name: 'Get your AI roadmap' });
      const book = header().getAllByRole('link', { name: 'Book a call' });
      expect(get.some((a) => a.getAttribute('href') === '/get-started')).toBe(true);
      expect(book.some((a) => a.getAttribute('href') === '/contact')).toBe(true);
      expect(book.every((a) => !a.closest('[aria-hidden="true"]'))).toBe(true);
    }, 20000);
  }
});

describe('closing bands', () => {
  it('Home ends with one band: Get your AI roadmap -> /get-started, Or book a call -> /contact', async () => {
    renderAt('/');
    await h1(/ai native/i);
    expect(screen.queryByText(/start with one workflow/i)).toBeNull();
    const band = screen.getByRole('heading', { level: 2, name: /tell us about your business/i }).closest('section');
    const b = within(band);
    expect(b.getByRole('link', { name: 'Get your AI roadmap' }).getAttribute('href')).toBe('/get-started');
    expect(b.getByRole('link', { name: 'Or book a call' }).getAttribute('href')).toBe('/contact');
    expect(b.getByText(/10 questions/i)).toBeTruthy();
  }, 20000);

  it('People band carries Join us only', async () => {
    renderAt('/people');
    await h1(/people behind arinox/i);
    const band = screen.getByRole('heading', { level: 2, name: /want to work with this team/i }).closest('section');
    const b = within(band);
    expect(b.getByRole('link', { name: 'Join us' }).getAttribute('href')).toBe('/careers');
    expect(b.queryByRole('link', { name: 'Or book a call' })).toBeNull();
    expect(screen.queryByRole('link', { name: 'Talk to the team' })).toBeNull();
  }, 20000);
});
