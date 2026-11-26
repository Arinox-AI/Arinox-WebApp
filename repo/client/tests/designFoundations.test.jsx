// @vitest-environment jsdom
// F4 design foundations: Section margin variant (opt-in) and ArrowLink.
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Section } from '../src/components/site/Section';
import { ArrowLink } from '../src/components/site/Button';

afterEach(cleanup);

describe('Section margin variant', () => {
  it('puts the eyebrow in a margin column when opted in, with no numerals', () => {
    const { container } = render(
      <Section margin eyebrow="How we work"><h2>Heading</h2></Section>
    );
    const grid = container.querySelector('[data-margin-grid]');
    expect(grid).not.toBeNull();
    const label = grid.querySelector('[data-margin-label]');
    expect(label.textContent).toBe('How we work');
    expect(grid.children[1].textContent).toBe('Heading');
  });

  it('renders the default stacked layout when not opted in', () => {
    const { container } = render(
      <Section eyebrow="How we work"><h2>Heading</h2></Section>
    );
    expect(container.querySelector('[data-margin-grid]')).toBeNull();
    expect(screen.getByText('How we work')).toBeTruthy();
  });
});

describe('ArrowLink', () => {
  it('is a plain link with a trailing arrow and no fill', () => {
    render(<MemoryRouter><ArrowLink to="/case-studies">All cases</ArrowLink></MemoryRouter>);
    const a = screen.getByRole('link', { name: /All cases/ });
    expect(a.getAttribute('href')).toBe('/case-studies');
    expect(a.textContent).toContain('→');
    expect(a.className).not.toMatch(/bg-/);
  });
});
