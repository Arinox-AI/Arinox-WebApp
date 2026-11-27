import { ChevronDown, ChevronRight } from 'lucide-react';

/* ─── Suite sections, shared by every suite page ───────────
   The ledger style: hairline rules only — no filled panels, no
   boxes around copy, no shadows. The interior reads like a spec
   sheet printed on the page, not a SaaS dashboard.
   ──────────────────────────────────────────────────────────── */

/** Flow connector: a static dashed 1px rule — horizontal on desktop,
    vertical on mobile. A diagram rule, not an animation. */
const FlowArrow = () => (
  <div aria-hidden className="flex items-center justify-center">
    <div className="hidden w-full items-center px-2 lg:flex">
      <svg className="h-2 min-w-0 flex-1" viewBox="0 0 40 8" preserveAspectRatio="none">
        <line x1="0" y1="4" x2="40" y2="4" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
      </svg>
      <ChevronRight size={14} strokeWidth={2} className="shrink-0 text-ink-faint" />
    </div>
    <div className="flex flex-col items-center py-3 lg:hidden">
      <svg className="h-7 w-2" viewBox="0 0 8 40" preserveAspectRatio="none">
        <line x1="4" y1="0" x2="4" y2="40" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
      </svg>
      <ChevronDown size={14} strokeWidth={2} className="shrink-0 text-ink-faint" />
    </div>
  </div>
);

/** The suite as an index — ten numbered rows in two columns, the stage
    each one belongs to. A ruled ledger, not a card. */
export function SystemsPanel({ suite }) {
  const { systems } = suite;
  return (
    <div className="border-t border-ink/80">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line py-3.5">
        <span className="eyebrow text-ember-deep">{systems.label}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">{systems.note}</span>
      </div>
      <ul className="grid sm:grid-cols-2 sm:gap-x-10">
        {systems.items.map((s) => (
          <li
            key={s.n}
            className="grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-3 border-b border-line py-[7px]"
          >
            <span className="font-mono text-[11px] text-ink-faint">{s.n}</span>
            <span className="font-display text-[16px] tracking-[-0.01em]">{s.t}</span>
            <span className="text-right font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">{s.stage}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">{systems.footer}</p>
    </div>
  );
}

/** The concrete read of "more to watch": the list itself, in the suite's
    own terms, running on past the last rule. Dark-section ruled list. */
export function WatchListCard({ suite }) {
  const { gap } = suite;
  return (
    <div>
      <div className="border-t border-white/15">
        <div className="flex items-center justify-between border-b border-white/10 py-3.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ember">{gap.watch.label}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
        </div>
        <ul>
          {gap.watch.rows.map((r) => (
            <li key={r.t} className="grid grid-cols-[5.5rem_1fr] items-start gap-x-4 border-b border-white/10 py-3.5">
              <span className="pt-0.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ghost">{r.t}</span>
              <span className="text-[13.5px] leading-relaxed text-ghost">{r.d}</span>
            </li>
          ))}
          <li aria-hidden className="py-3 font-mono text-[12px] tracking-[0.35em] text-ghost/40">
            …
          </li>
        </ul>
      </div>

      <p className="mt-8 max-w-md text-[15px] leading-relaxed text-ghost">{gap.multipliedNote}</p>
    </div>
  );
}

/** The control plane as a loop, read left to right, looped back.
    Three ruled columns — signals → agents → decisions — and a return rule. */
export function LoopBoard({ suite }) {
  const { cockpit } = suite;

  return (
    <div className="mt-12">
      <div className="grid lg:grid-cols-[1fr_56px_minmax(280px,330px)_56px_1fr]">
        {/* Signals in */}
        <div>
          <p className="eyebrow text-ink-faint">Signals in</p>
          <ul className="mt-4 border-t border-ink/80">
            {cockpit.signalsIn.map((s) => (
              <li key={s.t} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-line py-3.5">
                <span className="font-display text-[18px] tracking-[-0.01em]">{s.t}</span>
                <span className="text-right font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">{s.d}</span>
              </li>
            ))}
          </ul>
        </div>

        <FlowArrow />

        {/* The agents — the engine of the loop */}
        <div>
          <p className="eyebrow text-ember-deep">The agents</p>
          <ol className="mt-4 border-t border-ink/80">
            {cockpit.agents.map((a, i) => (
              <li key={a.t} className="grid grid-cols-[2rem_1fr] items-baseline gap-x-3 border-b border-line py-4">
                <span className="num font-mono text-[11px] text-ember-deep">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="font-display text-[18px] tracking-[-0.01em]">{a.t}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{a.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ember-deep">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember" aria-hidden />
            {cockpit.approve}
          </p>
        </div>

        <FlowArrow />

        {/* Decisions out */}
        <div>
          <p className="eyebrow text-ink-faint">Decisions out</p>
          <ul className="mt-4 border-t border-ink/80">
            {cockpit.decisionsOut.map((d) => (
              <li key={d.t} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-line py-3.5">
                <span className="font-display text-[18px] tracking-[-0.01em]">{d.t}</span>
                <span className="text-right font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">{d.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Return rule: the decision feeds the next signal */}
      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ember-deep">the loop</span>
        <span
          aria-hidden
          className="hidden h-px min-w-[48px] flex-1 bg-[repeating-linear-gradient(90deg,var(--color-line)_0_4px,transparent_4px_10px)] sm:block"
        />
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
          every action becomes the next signal
        </span>
      </div>
    </div>
  );
}
