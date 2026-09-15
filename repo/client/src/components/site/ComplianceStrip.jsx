import { SealCheck } from '@phosphor-icons/react'
import { complianceGroups } from '../../data/compliance'

/**
 * Compliance, understated rows. Each mark carries its real basis:
 * Certified / Compliant / Empanelled. Labels stay neutral (no "hardware",
 * "software" or product codenames).
 */
export function ComplianceStrip({ groups = complianceGroups, className = '' }) {
  return (
    <div className={`border-y border-line ${className}`}>
      {groups.map((g, i) => (
        <div
          key={g.label}
          className={`grid gap-4 py-7 md:grid-cols-[180px_1fr] md:items-center md:gap-10 ${
            i > 0 ? 'border-t border-line' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-ink-faint">
              <SealCheck size={17} weight="duotone" />
            </span>
            <span className="eyebrow text-ink-faint">{g.label}</span>
          </div>

          <div>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((it) => (
                <li
                  key={it.k}
                  className="inline-flex items-baseline gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 transition-colors hover:border-ink/25"
                >
                  <span className="font-mono text-[11.5px] tracking-[0.02em] text-ink-soft">{it.k}</span>
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink-faint">{it.v}</span>
                </li>
              ))}
            </ul>
            {g.note && (
              <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-faint">{g.note}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
