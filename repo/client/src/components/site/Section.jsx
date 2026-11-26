import { Eyebrow } from './Eyebrow'

/** Section wrapper, optional top hairline, eyebrow → heading → sub.
 *  `margin` (opt-in, needs `eyebrow`): from lg up the eyebrow sits in a narrow
 *  left margin column and the heading + children in the wide right column,
 *  annual-report style. Below lg the layout is exactly the stacked default. */
export function Section({
  id,
  children,
  eyebrow,
  title,
  sub,
  dark = false,
  border = true,
  centered = false,
  dense = false,
  margin = false,
  className = '',
  headClassName = '',
}) {
  const c = centered ? 'text-center mx-auto' : ''
  const inMargin = margin && eyebrow && !centered
  const hasHead = (!inMargin && eyebrow) || title || sub

  const head = hasHead && (
    <div className={`mb-10 md:mb-12 ${inMargin ? "mt-4" : ""} ${c} ${headClassName}`}>
      {!inMargin && eyebrow && <Eyebrow dark={dark} centered={centered}>{eyebrow}</Eyebrow>}
      {title && (
        <h2
          className={`${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'} font-display text-[34px] md:text-[46px] leading-[1.08] tracking-[-0.02em] ${
            dark ? 'text-phos' : ''
          }`}
        >
          {title}
        </h2>
      )}
      {sub && (
        <p
          className={`mt-5 ${centered ? 'max-w-xl mx-auto' : 'max-w-xl'} text-[17px] leading-relaxed ${dark ? 'text-ghost' : 'text-ink-soft'}`}
        >
          {sub}
        </p>
      )}
    </div>
  )

  return (
    <section
      id={id}
      className={`${dark ? 'bg-void text-white' : 'bg-paper'} ${border && !dark ? 'border-t border-line' : ''} ${
        dense ? 'py-10 md:py-12' : 'py-14 md:py-[76px]'
      } ${className}`}
    >
      <div className="mx-auto max-w-6xl px-7">
        {inMargin ? (
          <div className="lg:grid lg:grid-cols-[10.5rem_minmax(0,1fr)] lg:gap-x-12" data-margin-grid>
            <div className="lg:pt-[9px]" data-margin-label>
              <span className="inline-flex items-center gap-3 lg:flex lg:flex-col lg:items-start lg:gap-3.5">
                <span className={`h-px w-7 shrink-0 ${dark ? 'bg-ember/70' : 'bg-ember'}`} aria-hidden />
                {/* In the narrow margin a "A · B" label breaks onto two clean lines
                    (no dangling dot); below lg it stays on one line with the dot. */}
                <span className={`eyebrow ${dark ? 'text-ghost' : 'text-ink-faint'}`}>
                  {typeof eyebrow === 'string' && eyebrow.includes(' · ')
                    ? eyebrow.split(' · ').map((part, i) => (
                        <span key={part}>
                          {i > 0 ? <span className="lg:hidden"> · </span> : null}
                          <span className="lg:block">{part}</span>
                        </span>
                      ))
                    : eyebrow}
                </span>
              </span>
            </div>
            <div className="min-w-0 lg:[&>:first-child]:mt-0">
              {head}
              {children}
            </div>
          </div>
        ) : (
          <>
            {head}
            {children}
          </>
        )}
      </div>
    </section>
  )
}
