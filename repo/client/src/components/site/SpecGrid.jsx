/** Spec grid, flat cards, hairline border, mono label, big value. */
export function SpecGrid({ specs, dark = false, cols = 4 }) {
  return (
    <div className={`grid gap-4 ${cols === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
      {specs.map((s) => (
        <div key={s.k} className={`p-8 ${dark ? 'card-dark' : 'card-light'}`}>
          <p className={`eyebrow ${dark ? 'text-ghost' : 'text-ink-faint'}`}>{s.k}</p>
          <p className={`num mt-3 font-display text-[22px] leading-tight tracking-[-0.01em] ${s.ember ? 'text-ember' : dark ? 'text-white' : ''}`}>
            {s.v}
          </p>
          {s.sub && <p className={`mt-1.5 text-[13px] leading-snug ${dark ? 'text-ghost' : 'text-ink-faint'}`}>{s.sub}</p>}
        </div>
      ))}
    </div>
  )
}
