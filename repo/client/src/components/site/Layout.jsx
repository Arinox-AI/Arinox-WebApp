/* Layout archetypes */
/** Hairline label with a leading rule. */
export function Label({ children, dark = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className={`h-px w-7 shrink-0 ${dark ? 'bg-ember/70' : 'bg-ember'}`} aria-hidden />
      <span className={`eyebrow ${dark ? 'text-ghost' : 'text-ink-faint'}`}>{children}</span>
    </span>
  )
}
