/* Pill — the one chip pattern for the whole site (mono, pill, hairline).
   Replace ad-hoc chip class strings with this so look stays constant. */
const TONES = {
  neutral: 'border-line bg-white text-ink-soft',
  paper: 'border-line bg-paper-2 text-ink-soft',
  ember: 'border-ember/40 bg-ember/10 text-ember-deep',
  muted: 'border-line bg-transparent text-ink-faint',
  dark: 'border-white/15 bg-white/[0.04] text-ghost',
};

export function Pill({ children, tone = 'neutral', dot = false, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] ${TONES[tone]} ${className}`}
    >
      {dot && (
        <span
          aria-hidden
          className={`h-1.5 w-1.5 rounded-full ${tone === 'ember' ? 'bg-ember' : 'bg-ink-faint'}`}
        />
      )}
      {children}
    </span>
  );
}