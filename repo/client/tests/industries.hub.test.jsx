// @vitest-environment jsdom
// Solutions hub: one flat list, in the same order as the header's Solutions menu.
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Industries from '../src/pages/Industries.jsx';

vi.mock('@vercel/analytics/react', () => ({ Analytics: () => null }));
afterEach(cleanup);

describe('/industries hub list', () => {
  it('renders one flat list in menu order, with no group labels and no numerals', () => {
    const { container } = render(
      <MemoryRouter>
        <HelmetProvider>
          <Industries />
        </HelmetProvider>
      </MemoryRouter>
    );
    expect(container.textContent).not.toMatch(/Hardware|By industry|By function/);
    const names = [...container.querySelectorAll('h2')].map((h) => h.textContent).filter((t) => t !== 'Start with your industry.')
    expect(names).toEqual([
      'CommandCore™',
      'Marketing OS',
      'Fashion & Lifestyle OS',
      'Manufacturing OS',
      'Secure OS',
      'Digital Twin++',
    ]);
    expect(container.textContent).not.toMatch(/(^|\D)0[1-6](\D|$)/);
  });
});
