/* Layout archetypes, variety without repeating the "eyebrow + centered title + card grid" pattern. */

/** Hairline label with a leading rule. */
export function Label({ children, dark = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className={`h-px w-7 shrink-0 ${dark ? 'bg-ember/70' : 'bg-ember'}`} aria-hidden />
      <span className={`eyebrow ${dark ? 'text-ghost' : 'text-ink-faint'}`}>{children}</span>
    </span>
  )
}

/** Hairline spec table, label / value / note rows. */
export function SpecTable({ rows, dark = false, className = '' }) {
  return (
    <div className={`border-t ${dark ? 'border-white/20' : 'border-ink/80'} ${className}`}>
      {rows.map((r, i) => (
        <div
          key={r.k || i}
          className={`grid gap-2 border-b py-6 md:grid-cols-[minmax(140px,0.7fr)_1.6fr] md:gap-10 ${
            dark ? 'border-white/10' : 'border-line'
          }`}
        >
          <span className={`eyebrow pt-1 ${dark ? 'text-ghost' : 'text-ink-faint'}`}>{r.k}</span>
          <div>
            <p className={`font-display text-[21px] leading-snug tracking-[-0.01em] ${dark ? 'text-phos' : 'text-ink'}`}>
              {r.v}
            </p>
            {r.note && (
              <p className={`mt-1.5 text-[14.5px] leading-relaxed ${dark ? 'text-ghost' : 'text-ink-soft'}`}>{r.note}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/** A single hero metric with context, replaces rows of repeated big numbers. */
export function StatBand({ value, label, note, dark = false, className = '' }) {
  return (
    <div className={`flex flex-col items-start gap-x-10 gap-y-4 md:flex-row md:items-end ${className}`}>
      <p className={`num font-display text-[76px] leading-[0.9] tracking-[-0.03em] md:text-[104px] ${dark ? 'text-phos' : 'text-ink'}`}>
        {value}
      </p>
      <div className="max-w-md pb-2">
        <p className={`font-mono text-[12px] uppercase tracking-[0.12em] ${dark ? 'text-ember' : 'text-ember-deep'}`}>{label}</p>
        {note && (
          <p className={`mt-3 text-[15.5px] leading-relaxed ${dark ? 'text-ghost' : 'text-ink-soft'}`}>{note}</p>
        )}
      </div>
    </div>
  )
}

/** Two-up editorial split, text beside a visual. */
export function EditorialSplit({ children, visual, reverse = false, className = '' }) {
  return (
    <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${className}`}>
      <div className={reverse ? 'lg:order-2' : ''}>{children}</div>
      <div className={reverse ? 'lg:order-1' : ''}>{visual}</div>
    </div>
  )
}
