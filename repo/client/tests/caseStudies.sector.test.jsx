// @vitest-environment jsdom
// /case-studies?sector=<id> preselects that sector (menu deep link).
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, cleanup, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import CaseStudies from '../src/pages/CaseStudies.jsx';
import { sectors } from '../src/data/caseStudies.js';

vi.mock('@vercel/analytics/react', () => ({ Analytics: () => null }));
afterEach(cleanup);

const renderAt = (url) =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <HelmetProvider>
        <CaseStudies />
      </HelmetProvider>
    </MemoryRouter>
  );

const selected = (container) => within(container).getByRole('tab', { selected: true }).textContent;

describe('/case-studies ?sector=', () => {
  it('preselects the sector named in the query', () => {
    const s = sectors.find((x) => x.id === 'fmcg');
    const { container } = renderAt('/case-studies?sector=fmcg');
    expect(selected(container)).toContain(s.label);
    expect(container.querySelector('#sectors h2').textContent).toBe(s.label);
  });

  it('falls back to the first sector for an unknown slug or none', () => {
    expect(selected(renderAt('/case-studies?sector=nope').container)).toContain(sectors[0].label);
    cleanup();
    expect(selected(renderAt('/case-studies').container)).toContain(sectors[0].label);
  });
});
