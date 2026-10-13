import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

/* IndexStrip — the on-page index bar (01 · 02 · 03 …), extracted from the
   Marketing Suite page into a shared component. Items:
   [{ n: '01', label: 'What changed', href: '#changed' }].
   Highlights the section currently in view (IntersectionObserver). */
export function IndexStrip({ items, cols = 'sm:grid-cols-3', className = '' }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = items
      .map((it) => document.getElementById(it.href.replace('#', '')))
      .filter(Boolean);
    if (!els.length) return;
    const ids = items.map((it) => it.href.replace('#', ''));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(Math.max(0, ids.indexOf(en.target.id)));
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className={`border-b border-line bg-paper-2/50 ${className}`}>
      <div className="mx-auto max-w-6xl px-7">
        <ol className={`grid divide-y divide-line ${cols} sm:divide-x sm:divide-y-0`}>
          {items.map((it, i) => (
            <li key={it.href}>
              <a
                href={it.href}
                className={`group flex items-center gap-4 py-4 sm:px-6 ${
                  i === active ? 'text-ember-deep' : ''
                }`}
              >
                <span className="num font-mono text-[10.5px] text-ember-deep">{it.n}</span>
                <span
                  className={`font-display text-[17px] tracking-[-0.01em] transition-colors ${
                    i === active ? 'text-ember-deep' : 'text-ink group-hover:text-ember-deep'
                  }`}
                >
                  {it.label}
                </span>
                <ArrowDown
                  size={14}
                  strokeWidth={2.2}
                  className={`ml-auto transition-all duration-200 ${
                    i === active
                      ? 'translate-y-0.5 text-ember'
                      : 'text-ink-faint group-hover:translate-y-0.5 group-hover:text-ember'
                  }`}
                  aria-hidden
                />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}