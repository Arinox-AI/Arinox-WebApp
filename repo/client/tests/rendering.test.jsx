// @vitest-environment jsdom
// Rendering + navigation smoke - the "clicking all the pages" layer. Every
// public route must render real content (not just import cleanly), header nav
// links must route, legacy URLs must redirect, and unknown URLs must land on
// the 404 page. Hermetic: axios + analytics are mocked, no network.
// When adding a page: add a route entry here (keeps this and the sitemap in
// the same loop - see agent-docs/repo-map.md).
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '../src/App.jsx';

// Data-backed pages fetch on mount; return the API envelope with empty data so
// Blog/Careers fall back to their local content deterministically.
vi.mock('axios', () => ({
  default: {
    get: vi.fn(async () => ({ data: { success: true, data: [] } })),
    post: vi.fn(async () => ({ data: { success: true } })),
  },
}));

// Analytics injects scripts on mount; irrelevant for rendering tests.
vi.mock('@vercel/analytics/react', () => ({ Analytics: () => null }));

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </MemoryRouter>
  );

const heading = (name) =>
  screen.findByRole('heading', { level: 1, name }, { timeout: 15000 });

const mainNav = () => within(screen.getByRole('navigation', { name: 'Main' }));

afterEach(cleanup);

const routes = [
  { path: '/', heading: /ai native/i },
  { path: '/commandcore', heading: /commandcore/i },
  { path: '/case-studies', heading: /deployed inside the perimeter/i },
  { path: '/case-studies/situational-awareness', heading: /situational awareness/i },
  { path: '/case-studies/does-not-exist', heading: /case study not found/i },
  { path: '/industries', heading: /knows your industry/i },
  { path: '/industries/marketing', heading: /marketing\s+os/i },
  { path: '/partners', heading: /assembled around/i },
  { path: '/blog', heading: /from inside/i },
  { path: '/blog/aks-workshop-global-sovereign-ai', heading: /aks workshop global/i },
  { path: '/careers', heading: /build systems that/i },
  { path: '/contact', heading: /discovery session/i },
  { path: '/privacy', heading: /privacy policy/i },
  { path: '/terms', heading: /terms of service/i },
];

describe('every public route renders real content', () => {
  for (const route of routes) {
    it(`renders ${route.path}`, async () => {
      renderAt(route.path);
      expect(await heading(route.heading)).toBeTruthy();
    }, 20000);
  }
});

describe('header navigation', () => {
  it('top-level nav links route between pages', async () => {
    renderAt('/');
    fireEvent.click(mainNav().getByRole('link', { name: /^commandcore$/i }));
    expect(await heading(/commandcore/i)).toBeTruthy();

    fireEvent.click(mainNav().getByRole('link', { name: /^partners$/i }));
    expect(await heading(/assembled around/i)).toBeTruthy();
  }, 30000);

  it('dropdown group opens on hover and its links route', async () => {
    renderAt('/');
    const solutions = mainNav().getByRole('link', { name: /^solutions$/i });
    fireEvent.mouseOver(solutions);
    fireEvent.focus(solutions);
    const caseStudies = await mainNav().findByRole(
      'link',
      { name: /case studies/i },
      { timeout: 5000 }
    );
    fireEvent.click(caseStudies);
    expect(await heading(/deployed inside the perimeter/i)).toBeTruthy();
  }, 30000);
});

describe('legacy URL redirects', () => {
  it('/solutions redirects to CommandCore', async () => {
    renderAt('/solutions');
    expect(await heading(/commandcore/i)).toBeTruthy();
  }, 20000);

  it('/about redirects to the homepage', async () => {
    renderAt('/about');
    expect(await heading(/ai native/i)).toBeTruthy();
  }, 20000);
});

describe('share affordances', () => {
  it('blog post + case study expose WhatsApp, Email and Copy link', async () => {
    renderAt('/blog/aks-workshop-global-sovereign-ai');
    await screen.findByRole('link', { name: /whatsapp: aks workshop/i });
    expect(screen.getByRole('link', { name: /share by email/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /copy the page link/i })).toBeTruthy();
    cleanup();

    renderAt('/case-studies/situational-awareness');
    expect(await screen.findByRole('link', { name: /whatsapp: situational awareness/i })).toBeTruthy();
    expect(screen.getByRole('link', { name: /share by email/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /copy the page link/i })).toBeTruthy();
  }, 30000);
});

describe('404 page', () => {
  it('unknown URL renders the NotFound page', async () => {
    renderAt('/this-page-does-not-exist');
    expect(await heading(/left the perimeter/i)).toBeTruthy();
  }, 20000);

  it('"Back to home" button on the 404 returns to the homepage', async () => {
    renderAt('/nope');
    fireEvent.click(await screen.findByRole('link', { name: /back to home/i }, { timeout: 15000 }));
    expect(await heading(/ai native/i)).toBeTruthy();
  }, 30000);
});
