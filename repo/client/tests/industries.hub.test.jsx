// @vitest-environment jsdom
// Solutions hub: rows grouped like the header menu (Hardware / By industry / By function).
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Industries from '../src/pages/Industries.jsx';

vi.mock('@vercel/analytics/react', () => ({ Analytics: () => null }));
afterEach(cleanup);

describe('/industries hub grouping', () => {
  it('renders the three menu groups in order with the right items and no numerals', () => {
    const { container } = render(
      <MemoryRouter>
        <HelmetProvider>
          <Industries />
        </HelmetProvider>
      </MemoryRouter>
    );
    const headings = container.querySelectorAll('section[aria-labelledby] > h2');
    const labels = [...headings].map((h) => h.textContent);
    expect(labels).toEqual(['Hardware', 'By industry', 'By function']);
    const expected = {
      Hardware: ['CommandCore™'],
      'By industry': ['Fashion & Lifestyle OS', 'Manufacturing OS'],
      'By function': ['Marketing OS', 'Secure OS', 'Digital Twin++'],
    };
    for (const label of labels) {
      const group = screen.getByRole('heading', { level: 2, name: label }).closest('section');
      const names = within(group).getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
      expect(names).toEqual(expected[label]);
    }
    expect(container.textContent).not.toMatch(/(^|\D)0[1-6](\D|$)/);
  });
});
