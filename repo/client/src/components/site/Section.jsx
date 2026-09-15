import { Eyebrow } from './Eyebrow'

/** Section wrapper, optional top hairline, eyebrow → heading → sub. */
export function Section({
  id,
  children,
  eyebrow,
  title,
  sub,
  dark = false,
  border = true,
  centered = false,
  className = '',
  headClassName = '',
}) {
  const c = centered ? 'text-center mx-auto' : ''
  return (
    <section
      id={id}
      className={`${dark ? 'bg-void text-white' : 'bg-paper'} ${border && !dark ? 'border-t border-line' : ''} py-20 md:py-[104px] ${className}`}
    >
      <div className="mx-auto max-w-6xl px-7">
        {(eyebrow || title || sub) && (
          <div className={`mb-14 md:mb-20 ${c} ${headClassName}`}>
            {eyebrow && <Eyebrow dark={dark} centered={centered}>{eyebrow}</Eyebrow>}
            {title && (
              <h2
                className={`${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'} font-display text-3xl md:text-[44px] leading-[1.08] tracking-[-0.01em] ${
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
        )}
        {children}
      </div>
    </section>
  )
}
