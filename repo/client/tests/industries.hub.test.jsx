// @vitest-environment jsdom
// Solutions hub (/industries): hero stat row, capability ledger with one real
// figure each, sector rows linking to /case-studies?sector=, compact product
// list in header-menu order, how-we-engage, and the header's mega-menu data.
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, cleanup, within, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Industries from '../src/pages/Industries.jsx';
import { Nav } from '../src/components/site/Nav.jsx';
import { capabilities, products } from '../src/data/industries.js';
import { nav, solutionColumns } from '../src/data/site.js';
import { sectors, caseIndex } from '../src/data/caseStudies.js';

vi.mock('@vercel/analytics/react', () => ({ Analytics: () => null }));
afterEach(cleanup);

const renderPage = () =>
  render(
    <MemoryRouter>
      <HelmetProvider>
        <Industries />
      </HelmetProvider>
    </MemoryRouter>
  );

const filled = sectors.filter((s) => s.useCases.length > 0);
const NUMERIC = /^[~+\-−–$]*\s*\d/;
const onRequestValues = new Set(
  caseIndex.flatMap((c) => (c.useCase.metrics || []).filter((m) => m.basis === 'on-request').map((m) => m.value))
);

describe('/industries hub', () => {
  it('leads with the broad positioning and one filled primary action', () => {
    const { container } = renderPage();
    expect(container.querySelector('h1').textContent).toMatch(/AI for the work your business actually does./);
    const hero = container.querySelector('section');
    const roadmap = within(hero).getByRole('link', { name: 'Get your AI roadmap' });
    expect(roadmap.getAttribute('href')).toBe('/get-started');
    expect(within(container).getByRole('link', { name: /See the case studies/ }).getAttribute('href')).toBe('/case-studies');
    expect(hero.querySelectorAll('a.bg-ember')).toHaveLength(1);
  });

  it('stat row numbers are computed from the data', () => {
    const { container } = renderPage();
    const read = (k) => container.querySelector(`[data-stat="${k}"] .sr-only`).textContent;
    expect(read('products')).toBe(String(products.length));
    expect(read('capabilities')).toBe(String(capabilities.length));
    expect(read('cases')).toBe(String(caseIndex.length));
    expect(read('sectors')).toBe(String(filled.length));
    expect([read('products'), read('capabilities'), read('cases'), read('sectors')]).toEqual(['6', '8', '27', '8']);
  });

  it('reuses the trusted-by strip', () => {
    const { container } = renderPage();
    expect(container.querySelector('[data-trusted-strip]')).toBeTruthy();
  });

  it('renders eight capability rows with an anchor id per capability key', () => {
    const { container } = renderPage();
    const rows = [...container.querySelectorAll('[data-capability-row]')];
    expect(rows.map((r) => r.id)).toEqual(capabilities.map((c) => c.key));
    expect(rows.map((r) => r.querySelector('h3').textContent)).toEqual(capabilities.map((c) => c.name));
  });

  it('shows only publishable, numeric figures, each from a real case', () => {
    const { container } = renderPage();
    const figures = [...container.querySelectorAll('[data-metric]')];
    expect(figures.length).toBeGreaterThanOrEqual(8);
    figures.forEach((f) => {
      expect(onRequestValues.has(f.textContent), f.textContent).toBe(false);
      expect(f.textContent).toMatch(NUMERIC);
    });
    // every capability row names the case its figure came from and links to it
    container.querySelectorAll('[data-capability-row]').forEach((row) => {
      const cap = capabilities.find((c) => c.key === row.id);
      const link = row.querySelector('a.border-b');
      const entry = caseIndex.find((c) => `/case-studies/${c.slug}` === link.getAttribute('href'));
      expect(entry.useCase.capability).toBe(cap.key);
      expect(link.textContent).toBe(entry.useCase.title);
      expect(row.querySelector('[data-metric]').textContent).toBe(
        entry.useCase.metrics.find((m) => m.basis !== 'on-request' && NUMERIC.test(m.value)).value
      );
    });
  });

  it('lists each sector with its computed case count, linking to its case studies', () => {
    const { container } = renderPage();
    const rows = [...container.querySelectorAll('[data-sector-row]')];
    expect(rows).toHaveLength(filled.length);
    filled.forEach((s, i) => {
      expect(rows[i].textContent).toContain(s.label);
      expect(rows[i].querySelector('[data-sector-count]').textContent).toBe(
        `${s.useCases.length} case ${s.useCases.length === 1 ? 'study' : 'studies'}`
      );
      expect(rows[i].getAttribute('href')).toBe(`/case-studies?sector=${s.id}`);
    });
  });

  it('keeps all six products, in menu order, as links', () => {
    const { container } = renderPage();
    const items = [...container.querySelectorAll('[data-product]')];
    expect(items).toHaveLength(6);
    expect(items.map((a) => a.getAttribute('href'))).toEqual(nav[0].group.map((g) => g.to));
    expect(items.map((a) => a.querySelector('h3').textContent)).toEqual([
      'CommandCore™',
      'Marketing OS',
      'Fashion & Lifestyle OS',
      'Manufacturing OS',
      'Secure OS',
      'Digital Twin++',
    ]);
    expect(container.querySelector('#products')).toBeTruthy();
  });

  it('has the two ways to engage, and no 01-06 numerals', () => {
    const { container } = renderPage();
    const engage = container.querySelector('[data-engage]');
    expect(engage.querySelectorAll('h3')).toHaveLength(2);
    expect(within(engage).getByRole('link', { name: /ready-made products/i }).getAttribute('href')).toBe('/industries#products');
    expect(within(engage).getByRole('link', { name: /Tell us the workflow/i }).getAttribute('href')).toBe('/get-started');
    expect(container.textContent).not.toMatch(/(^|\D)0[1-6](\D|$)/);
  });
});

describe('Solutions mega-menu', () => {
  it('has three columns of 6 / 8 / 8, derived from the data', () => {
    expect(solutionColumns.map((c) => [c.label, c.items.length])).toEqual([
      ['Products', 6],
      ['Capabilities', 8],
      ['Industries', 8],
    ]);
    expect(solutionColumns[1].items.map((i) => i.to)).toEqual(capabilities.map((c) => `/industries#${c.key}`));
    expect(solutionColumns[2].items.map((i) => [i.label, i.to])).toEqual(
      filled.map((s) => [s.label, `/case-studies?sector=${s.id}`])
    );
  });

  it('renders the three columns and both "All..." links when opened', async () => {
    const { container, findByRole } = render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );
    const trigger = within(container).getByRole('link', { name: /^solutions$/i });
    fireEvent.mouseOver(trigger);
    fireEvent.focus(trigger);
    const panel = within(await findByRole('group', { name: 'Solutions' }));
    const cols = [...document.querySelectorAll('[data-menu-column]')];
    expect(cols.map((c) => c.getAttribute('data-menu-column'))).toEqual(['Products', 'Capabilities', 'Industries']);
    expect(cols.map((c) => c.querySelectorAll('a').length)).toEqual([6, 8, 8]);
    expect(panel.getByRole('link', { name: /all solutions/i }).getAttribute('href')).toBe('/industries');
    expect(panel.getByRole('link', { name: /all case studies/i }).getAttribute('href')).toBe('/case-studies');
    const bfsi = panel.getByRole('link', { name: /^BFSI/ });
    expect(bfsi.getAttribute('href')).toBe('/case-studies?sector=bfsi');
    expect(bfsi.textContent).toBe('BFSI');
  });
});
