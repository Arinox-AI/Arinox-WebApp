import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'

/* The hairline that opens a case: draws left to right once on scroll
 * (static under reduced motion). Parent must be `relative`. */
export function DrawRule({ className = '' }) {
  const reduce = useReducedMotion()
  const base = `absolute inset-x-0 top-0 h-px origin-left bg-ink/80 ${className}`
  if (reduce) return <span aria-hidden="true" className={base} />
  return (
    <motion.span
      aria-hidden="true"
      className={base}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}

/* Counts a published metric up once when it scrolls into view, keeping its
 * prefix/suffix and decimals ("97.4%", "15+", "426"). The final value is the
 * initial render, so no-JS, reduced-motion and screen-reader users always
 * get the real figure; the animated span is aria-hidden. */
const PARTS = /^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/

export function CountUp({ value, duration = 1.1, className = '' }) {
  const text = String(value)
  const m = PARTS.exec(text)
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-48px' })
  const [shown, setShown] = useState(m ? m[2] : text)

  useEffect(() => {
    if (!m || reduce || !inView) return undefined
    const target = parseFloat(m[2].replace(/,/g, ''))
    const decimals = (m[2].split('.')[1] || '').length
    const grouped = m[2].includes(',')
    const fmt = (n) =>
      n.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: grouped,
      })
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => setShown(fmt(n)),
      onComplete: () => setShown(m[2]),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, text, duration])

  if (!m) return <span className={className}>{text}</span>
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {m[1]}
        {shown}
        {m[3]}
      </span>
    </span>
  )
}
