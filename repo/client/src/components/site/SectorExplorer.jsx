import { useState } from 'react';
import { Shapes } from 'lucide-react';

/* SectorExplorer — the sector line sheet: big icon tiles so the range
   reads at a glance, then a ruled two-column spread for the selected
   sector — serif intro left, watch list right. Buttons + aria-pressed;
   no auto-rotation. Data shape (src/data/*.js → `explorer`):
     { label?, titleLead?, titleAccent?, watchLabel,
       sectors: [{ id, name, intro, watch: [{ t, d }] }] }
   `icons` — map of sector id → Lucide component (visual only).
   ──────────────────────────────────────────────────────────── */
export function SectorExplorer({ explorer, icons = {} }) {
  const [activeId, setActiveId] = useState(explorer.sectors[0].id);
  const active = explorer.sectors.find((s) => s.id === activeId) ?? explorer.sectors[0];

  return (
    <div className="mt-10">
      {/* the sector tiles — big icons first */}
      <div role="group" aria-label="Choose a sector" className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:flex">
        {explorer.sectors.map((s) => {
          const Icon = icons[s.id] ?? Shapes;
          const selected = s.id === active.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveId(s.id)}
              aria-pressed={selected}
              className={`group flex flex-1 flex-col items-center gap-3 border px-4 py-6 text-center transition-colors ${
                selected ? 'border-ember/60 bg-white' : 'border-line hover:border-ink/30'
              }`}
            >
              <Icon
                size={44}
                strokeWidth={1.5}
                aria-hidden
                className={selected ? 'text-ember' : 'text-ink-faint transition-colors group-hover:text-ink'}
              />
              <span className={`text-[13px] font-medium leading-snug ${selected ? 'text-ink' : 'text-ink-soft'}`}>
                {s.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* the selected sector's read */}
      <div className="grid gap-10 pt-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16" aria-live="polite">
        <div>
          <p className="eyebrow text-ember-deep">{active.name}</p>
          <p className="mt-4 font-display text-[22px] leading-snug tracking-[-0.01em] md:text-[26px]">
            {active.intro}
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
            {explorer.watchLabel}
          </p>
          <ul className="mt-3 border-t border-ink/80">
            {active.watch.map((r) => (
              <li key={r.t} className="grid grid-cols-[auto_7.5rem_1fr] items-start gap-x-3 border-b border-line py-3">
                <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-ember/80" />
                <span className="pt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">{r.t}</span>
                <span className="text-[13.5px] leading-relaxed text-ink-soft">{r.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
