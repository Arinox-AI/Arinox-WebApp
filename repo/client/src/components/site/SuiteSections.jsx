import { ChevronDown, ChevronRight, RefreshCw } from 'lucide-react';

/* ─── Suite sections, shared by all three suite pages ───────
   The ledger style: hairline rules, square corners, no floating
   card shadows — the interior reads like a spec sheet, not SaaS cards.
   ──────────────────────────────────────────────────────────── */

/** Flow connector: dashed drift on desktop, vertical rail on mobile. */
const FlowArrow = () => (
  <div aria-hidden className="flex items-center justify-center">
    <div className="hidden w-full items-center lg:flex">
      <svg className="flow-dash h-2 min-w-0 flex-1" viewBox="0 0 40 8" preserveAspectRatio="none">
        <line x1="0" y1="4" x2="40" y2="4" stroke="var(--color-line)" strokeWidth="1.4" strokeDasharray="4 10" />
      </svg>
      <ChevronRight size={14} strokeWidth={2.4} className="shrink-0 text-ember" />
    </div>
    <div className="flex flex-col items-center py-3 lg:hidden">
      <svg className="flow-dash h-7 w-2" viewBox="0 0 8 40" preserveAspectRatio="none">
        <line x1="4" y1="0" x2="4" y2="40" stroke="var(--color-line)" strokeWidth="2" strokeDasharray="4 10" />
      </svg>
      <ChevronDown size={14} strokeWidth={2.4} className="shrink-0 text-ember" />
    </div>
  </div>
);

/** The suite as an index — ten numbered rows in two columns, the stage
    each one belongs to. A ruled ledger, not a card. */
export function SystemsPanel({ suite }) {
  const { systems } = suite;
  return (
    <div className="overflow-hidden border border-line bg-white">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line px-5 py-3.5">
        <span className="eyebrow text-ember-deep">{systems.label}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">{systems.note}</span>
      </div>
      <ul className="grid px-5 py-1 sm:grid-cols-2 sm:gap-x-10">
        {systems.items.map((s) => (
          <li
            key={s.n}
            className="grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-3 border-b border-line py-[7px] last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
          >
            <span className="font-mono text-[10px] text-ink-faint">{s.n}</span>
            <span className="font-display text-[16px] tracking-[-0.01em]">{s.t}</span>
            <span className="text-right font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">{s.stage}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2.5 border-t border-line bg-paper-2/60 px-5 py-3">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember" aria-hidden />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ember-deep">
          {systems.footer}
        </span>
      </div>
    </div>
  );
}

/** The concrete read of "more to watch": the list itself, in the suite's
    own terms, running on past the card. Dark-section ruled block. */
export function WatchListCard({ suite }) {
  const { gap } = suite;
  return (
    <div className="relative">
      <div className="overflow-hidden border border-white/10">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ember">{gap.watch.label}</span>
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-ember/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
          </span>
        </div>
        <ul>
          {gap.watch.rows.map((r) => (
            <li key={r.t} className="grid grid-cols-[auto_5.5rem_1fr] items-start gap-x-3 border-b border-white/10 px-5 py-3.5">
              <span aria-hidden className="mt-[7px] h-1.5 w-1.5 rounded-full bg-ember/80" />
              <span className="pt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ghost/60">{r.t}</span>
              <span className="text-[13.5px] leading-relaxed text-ghost">{r.d}</span>
            </li>
          ))}
          <li aria-hidden className="flex items-center justify-center py-3 font-mono text-[12px] tracking-[0.35em] text-ghost/40">
            …
          </li>
        </ul>
      </div>

      <p className="mt-8 max-w-md text-[15px] leading-relaxed text-ghost">{gap.multipliedNote}</p>
    </div>
  );
}

/** The control plane as a live loop, read left to right, looped back.
    One ruled board — signals → agents → decisions → return rail. */
export function LoopBoard({ suite }) {
  const { cockpit } = suite;

  return (
    <div className="mt-12 overflow-hidden border border-line bg-white">
      <div className="grid lg:grid-cols-[1fr_56px_minmax(280px,330px)_56px_1fr]">
        {/* Signals in */}
        <div className="p-6 md:p-7">
          <p className="eyebrow text-ink-faint">Signals in</p>
          <ul className="mt-4 border-t border-ink/80">
            {cockpit.signalsIn.map((s) => (
              <li key={s.t} className="group grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-line py-3.5">
                <span className="font-display text-[18px] tracking-[-0.01em] transition-colors group-hover:text-ember-deep">{s.t}</span>
                <span className="text-right font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-faint">{s.d}</span>
              </li>
            ))}
          </ul>
        </div>

        <FlowArrow />

        {/* The agents, the engine panel of the loop */}
        <div className="relative border-y border-line bg-paper-2/45 p-6 md:p-7 lg:border-x lg:border-y-0">
          <p className="eyebrow text-ember-deep">The agents</p>
          <ol className="mt-4 border-t border-ember/30">
            {cockpit.agents.map((a, i) => (
              <li key={a.t} className="grid grid-cols-[auto_1fr] items-start gap-x-3.5 border-b border-ember/20 py-4 last:border-b-0">
                <span className="num mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-ember/40 bg-white font-mono text-[10px] text-ember-deep">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-display text-[18px] tracking-[-0.01em]">{a.t}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{a.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-5 flex items-center gap-3 border border-ember/30 bg-white/80 px-4 py-3">
            <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden>
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-ember/60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ember" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ember-deep">{cockpit.approve}</span>
          </div>
        </div>

        <FlowArrow />

        {/* Decisions out */}
        <div className="p-6 md:p-7">
          <p className="eyebrow text-ink-faint">Decisions out</p>
          <ul className="mt-4 border-t border-ink/80">
            {cockpit.decisionsOut.map((d) => (
              <li key={d.t} className="group grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-line py-3.5">
                <span className="font-display text-[18px] tracking-[-0.01em] transition-colors group-hover:text-ember-deep">{d.t}</span>
                <span className="text-right font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-faint">{d.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Return rail: the decision feeds the next signal */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line bg-paper-2/60 px-5 py-3.5 md:px-6">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ember-deep">
          <RefreshCw size={12} strokeWidth={2.4} className="animate-spin [animation-duration:8s]" aria-hidden />
          the loop
        </span>
        <span
          aria-hidden
          className="hidden h-px min-w-[48px] flex-1 bg-[repeating-linear-gradient(90deg,var(--color-line)_0_5px,transparent_5px_10px)] sm:block"
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
          every action becomes the next signal
        </span>
      </div>
    </div>
  );
}
