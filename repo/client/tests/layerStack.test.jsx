// @vitest-environment jsdom
// LayerStack "strata": five layers top-first, active plate follows hover/focus (site feedback plan, phase G).
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { LayerStack } from '../src/components/site/LayerStack.jsx';

afterEach(cleanup);

const activePlate = (c) => c.querySelector('[data-plate][data-active="true"]')?.getAttribute('data-plate');

describe('LayerStack', () => {
  it('lists the five layers top of the stack first', () => {
    const { container } = render(<LayerStack />);
    const rows = [...container.querySelectorAll('li[data-layer]')].map((li) => li.getAttribute('data-layer'));
    expect(rows).toEqual(['05', '04', '03', '02', '01']);
    expect(screen.getByRole('heading', { name: 'AI Agents' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Your estate' })).toBeTruthy();
    expect(container.querySelectorAll('[data-plate]')).toHaveLength(5);
  });

  it('defaults to KOGO OS and moves the active plate on hover and focus', () => {
    const { container } = render(<LayerStack />);
    expect(activePlate(container)).toBe('03');
    const row = (n) => container.querySelector(`li[data-layer="${n}"]`);
    fireEvent.mouseEnter(row('05'));
    expect(activePlate(container)).toBe('05');
    expect(row('05').getAttribute('aria-current')).toBe('true');
    fireEvent.focus(row('01'));
    expect(activePlate(container)).toBe('01');
    fireEvent.click(row('02'));
    expect(activePlate(container)).toBe('02');
  });
});
