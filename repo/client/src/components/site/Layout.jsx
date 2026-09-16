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
