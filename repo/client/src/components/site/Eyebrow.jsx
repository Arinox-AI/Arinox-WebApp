export function Eyebrow({ children, dark = false, tone, centered = false }) {
  const color = tone === 'ember' ? 'text-ember-deep' : dark ? 'text-ghost' : 'text-ink-faint'
  const rule = dark ? 'bg-ember/70' : 'bg-ember'
  return (
    <div className={`mb-4 ${centered ? 'flex justify-center' : ''}`}>
      <span className="inline-flex items-center gap-3">
        <span className={`h-px w-7 shrink-0 ${rule}`} aria-hidden />
        <span className={`eyebrow ${color}`} style={{ letterSpacing: '0.14em' }}>
          {children}
        </span>
      </span>
    </div>
  )
}
