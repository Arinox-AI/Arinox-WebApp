// @vitest-environment jsdom
// Home story, customer proof and the People "On the ground" gallery (site feedback plan, phase C).
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '../src/App.jsx';
import { home, gallery } from '../src/data/site';
import { caseIndex } from '../src/data/caseStudies';

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

afterEach(cleanup);

describe('Home data', () => {
  it('every customer case resolves to a case study with a published metric', () => {
    expect(home.proof.cases).toHaveLength(3);
    for (const c of home.proof.cases) {
      const e = caseIndex.find((x) => x.slug === c.slug);
      expect(e, c.slug).toBeTruthy();
      expect(e.useCase.metrics.some((m) => m.label === c.metric && m.basis === 'published')).toBe(true);
    }
  });
});

describe('Home story', () => {
  it('shows the objections, three customer links and no partnership section', async () => {
    renderAt('/');
    await screen.findByRole('heading', { level: 1, name: /ai native/i }, { timeout: 15000 });
    for (const r of home.problem.rows) {
      expect(screen.getByText(`“${r.objection}”`)).toBeTruthy();
    }
    expect(screen.getByRole('heading', { level: 2, name: /deployed, not demoed/i })).toBeTruthy();
    const links = screen.getAllByRole('link', { name: /read the case/i });
    expect(links).toHaveLength(3);
    for (const a of links) expect(a.getAttribute('href')).toMatch(/^\/case-studies\/[a-z0-9-]+$/);
    expect(screen.queryByText(/the partnership/i)).toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: /three moves/i })).toBeTruthy();
  }, 20000);
});

describe('People gallery', () => {
  it('renders every event label', async () => {
    renderAt('/people');
    await screen.findByRole('heading', { level: 1, name: /people behind arinox/i }, { timeout: 15000 });
    for (const g of gallery) expect(screen.getAllByText(g.event).length).toBeGreaterThan(0);
  }, 20000);
});
