const items = [
  {
    k: 'AI Engines',
    partners: [{ n: 'Kogo.ai', img: '/images/logos/kogo.png' }],
    d: 'Full-stack agentic operating system beneath every solution',
  },
  {
    k: 'Chipset',
    partners: [
      { n: 'NVIDIA', img: '/images/logos/NVIDIA_logo.svg' },
      { n: 'Qualcomm', img: '/images/logos/qualcomm.svg' },
    ],
    d: 'Acceleration from datacenter silicon to the edge',
  },
  {
    k: 'Infrastructure & compute',
    partners: [{ n: 'Altos', img: '/images/logos/altos.svg' }],
    d: 'Enterprise servers and AI workstations',
  },
]

/** Global partner network, with logos where a mark is available. */
export function EcosystemGrid({ className = '' }) {
  return (
    <div className={`grid gap-5 md:grid-cols-3 ${className}`}>
      {items.map((it) => (
        <div key={it.k} className="card-light p-8 text-left">
          <p className="eyebrow text-ember-deep">{it.k}</p>
          <div className="mt-6 flex min-h-[32px] flex-wrap items-center gap-x-5 gap-y-3">
            {it.partners.map((p) =>
              p.img ? (
                <img key={p.n} src={p.img} alt={p.n} loading="lazy" className="h-5 w-auto max-w-[110px] object-contain" />
              ) : (
                <span
                  key={p.n}
                  className="rounded-md border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft"
                >
                  {p.n}
                </span>
              ),
            )}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">{it.d}</p>
        </div>
      ))}
    </div>
  )
}
