import { useState } from 'react';
import { Label } from './Layout';

/* ProductTour — the lifecycle tour, editorial style: a numbered stage
   rail (hairline, ember underline on the active stage), then a ruled
   spread — blurb + systems list left, the stage's own signals and drafts
   as hairline lists right. No app-window chrome; information only.
   Data shape (src/data/*.js → `tour`):
     { label, titleLead, titleAccent, note,
       stages: [{ id, name, blurb, systems: [..],
                  console: { rows: [{ k, v, tone }], approve?: { label, items } } }] }
   ──────────────────────────────────────────────────────────── */
export function ProductTour({ tour }) {
  const [activeId, setActiveId] = useState(tour.stages[0].id);
  const active = tour.stages.find((s) => s.id === activeId) ?? tour.stages[0];

  return (
    <>
      <Label>{tour.label}</Label>
      <h2 className="mt-5 max-w-3xl font-display text-[30px] leading-[1.08] tracking-[-0.02em] md:text-[40px]">
        {tour.titleLead} <span className="italic text-ember">{tour.titleAccent}</span>
      </h2>
      <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-ink-soft">{tour.note}</p>

      <div className="mt-10">
        {/* the stage rail */}
        <div role="group" aria-label="Choose a stage" className="flex flex-wrap gap-x-6 gap-y-2 border-y border-line py-3">
          {tour.stages.map((s, i) => {
            const selected = s.id === active.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveId(s.id)}
                aria-pressed={selected}
                className={`flex items-baseline gap-2 pb-1 transition-colors ${
                  selected ? 'text-ink shadow-[inset_0_-2px_0_var(--color-ember)]' : 'text-ink-faint hover:text-ink'
                }`}
              >
                <span className="font-mono text-[10px] text-ink-faint/70">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[13.5px] font-medium">{s.name}</span>
              </button>
            );
          })}
        </div>

        {/* the selected stage */}
        <div className="grid items-start gap-10 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16" aria-live="polite">
          <div>
            <p className="eyebrow text-ember-deep">{active.name}</p>
            <p className="mt-4 font-display text-[20px] leading-snug tracking-[-0.01em] md:text-[22px]">
              {active.blurb}
            </p>
            <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
              Systems on this stage
            </p>
            <ul className="mt-3 border-t border-line">
              {active.systems.map((sys) => (
                <li key={sys} className="flex items-center gap-2.5 border-b border-line py-2.5">
                  <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-ember" />
                  <span className="text-[13.5px] leading-relaxed text-ink-soft">{sys}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* the stage's own read — signals, then what the OS drafts */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
              Signals on this stage
            </p>
            <ul className="mt-3 border-t border-line">
              {active.console.rows.map((r) => (
                <li key={r.k} className="flex items-baseline gap-x-3 border-b border-line py-2.5">
                  <span
                    aria-hidden
                    className={`mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full ${
                      r.tone === 'flag' ? 'bg-ember' : r.tone === 'new' ? 'bg-ember/50' : 'bg-ink-faint/50'
                    }`}
                  />
                  <span className="w-24 shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
                    {r.k}
                  </span>
                  <span className="min-w-0 text-[13.5px] leading-relaxed text-ink-soft">{r.v}</span>
                </li>
              ))}
            </ul>

            {active.console.approve ? (
              <div className="mt-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ember-deep">
                  {active.console.approve.label}
                </p>
                <ul className="mt-3 border-t border-ember/30">
                  {active.console.approve.items.map((t) => (
                    <li key={t} className="flex items-baseline gap-x-3 border-b border-ember/20 py-2.5">
                      <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                      <span className="text-[13.5px] leading-relaxed text-ink">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
