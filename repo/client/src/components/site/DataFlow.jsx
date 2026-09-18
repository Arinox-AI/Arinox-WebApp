import { dataReadiness } from '../../data/data'
import { TONES } from './tones'

const ICONS = [
  <svg key="data" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v7c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
    <path d="M4 12v7c0 1.66 3.58 3 8 3s8-1.34 8-3v-7" />
  </svg>,
  <svg key="ready" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l7 3v5c0 4.6-3 8.1-7 10-4-1.9-7-5.4-7-10V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>,
  <svg key="engine" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2.4" />
    <circle cx="5" cy="6" r="1.8" />
    <circle cx="19" cy="6" r="1.8" />
    <circle cx="5" cy="18" r="1.8" />
    <circle cx="19" cy="18" r="1.8" />
    <path d="M10.4 10.5L6.5 7.3M13.6 10.5l3.9-3.2M10.4 13.5l-3.9 3.2M13.6 13.5l3.9 3.2" />
  </svg>,
  <svg key="action" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
  </svg>,
]

const DOT = {
  light: 'border-line bg-white text-ink-faint',
  ember: 'border-ember bg-ember text-white',
  dark: 'border-void bg-void text-phos',
  tint: 'border-ember/40 bg-white text-ember-deep',
}

/** A rail with hanging card entries: the four stages of the data path. */
export function DataFlow({ className = '' }) {
  return (
    <div className={className}>
      <div className="relative">
        <span className="pointer-events-none absolute left-[13px] right-0 top-[13px] hidden h-px bg-line lg:block" aria-hidden />
        <span className="pointer-events-none absolute left-[13px] top-[13px] hidden h-px w-[40%] bg-gradient-to-r from-ember via-ember/45 to-transparent lg:block" aria-hidden />

        <ol className="grid gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {dataReadiness.flow.map((node, i) => (
            <li key={node.t} className="relative">
              <span className="pointer-events-none absolute left-[13px] top-[27px] hidden h-6 w-px bg-line lg:block" aria-hidden />

              <span
                className={`relative z-10 flex h-[27px] w-[27px] items-center justify-center rounded-full border font-mono text-[10.5px] ${DOT[node.tone] ?? DOT.light}`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="mt-6 rounded-xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/20">
                <div className="flex items-center gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${TONES[node.tone] ?? TONES.light}`}>
                    {ICONS[i]}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-ember-deep">{node.k}</span>
                </div>
                <p className="mt-4 font-display text-[20px] leading-[1.15] tracking-[-0.01em] text-ink">{node.t}</p>
                <p className="mt-2.5 text-[13px] leading-relaxed text-ink-soft">{node.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-4">
        <span className="h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
        <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ember-deep">{dataReadiness.governance}</span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-faint">· {dataReadiness.governanceNote}</span>
      </div>
    </div>
  )
}
