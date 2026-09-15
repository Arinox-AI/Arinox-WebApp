import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { halftoneDots } from '../../lib/halftone'

/**
 * HalftoneBackground, drop-in behind any positioned section.
 * Renders an SVG dot layer filling the nearest positioned ancestor.
 */
export function HalftoneBackground({
  dotSize = 5,
  spacing = 22,
  baseColor = 'transparent',
  dotColor = 'var(--color-ember)',
  opacity = 0.3,
  gradient = { type: 'linear', angle: 90 },
  className = '',
}) {
  const ref = useRef(null)
  const [w, h] = useElementSize(ref)

  const full = useMemo(
    () => ({ width: w, height: h, dotSize, spacing, baseColor, dotColor, opacity, gradient }),
    [w, h, dotSize, spacing, baseColor, dotColor, opacity, gradient],
  )
  const dots = useMemo(() => (w && h ? halftoneDots(full) : []), [full, w, h])

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      {!baseColor.startsWith('transparent') && (
        <div className="absolute inset-0" style={{ background: baseColor }} />
      )}
      <svg width={w} height={h} className="absolute inset-0" shapeRendering="crispEdges" style={{ opacity }}>
        {dots.map((d, i) => (
          <circle key={i} cx={d.cx.toFixed(1)} cy={d.cy.toFixed(1)} r={d.r.toFixed(2)} fill={dotColor} />
        ))}
      </svg>
    </div>
  )
}

/** Tracks the parent's size, one RO callback per actual resize, rAF-batched. */
export function useElementSize(ref) {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        setSize(([pw, ph]) => (r.width !== pw || r.height !== ph ? [r.width, r.height] : [pw, ph]))
      })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [ref])
  return size
}
