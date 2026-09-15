import { useEffect, useState } from 'react'
import { halftoneDotsFromCanvas } from '../../lib/halftone-image'

/**
 * HalftoneImage, renders a drawn source (image URL or canvas painter) as a
 * one-time-sampled halftone dot SVG. Fills its positioned wrapper.
 */
export function HalftoneImage({
  draw,
  src,
  dotSize = 3.6,
  spacing = 13,
  dotColor = '#ff6301',
  baseColor = 'transparent',
  opacity = 1,
  width = 460,
  height = 520,
  className = '',
}) {
  const [dots, setDots] = useState([])

  useEffect(() => {
    let alive = true
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    const finish = () => {
      if (!alive) return
      setDots(halftoneDotsFromCanvas(canvas, { dotSize, spacing }))
    }
    if (draw) {
      draw(ctx, width, height)
      finish()
    } else if (src) {
      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.onload = () => {
        ctx.drawImage(image, 0, 0, width, height)
        finish()
      }
      image.src = src
    }
    return () => {
      alive = false
    }
  }, [draw, src, width, height, dotSize, spacing])

  return (
    <div className={`absolute inset-0 ${className}`} style={{ opacity }}>
      {baseColor !== 'transparent' && <div className="absolute inset-0" style={{ background: baseColor }} />}
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
        {dots.map((d, i) => (
          <circle key={i} cx={d.cx.toFixed(1)} cy={d.cy.toFixed(1)} r={d.r.toFixed(2)} fill={dotColor} />
        ))}
      </svg>
    </div>
  )
}
