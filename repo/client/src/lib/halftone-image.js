/**
 * halftone-image.js, converts any drawn source (image, glyph, canvas art)
 * into halftone dots by sampling one offscreen canvas exactly once.
 */

/** Darker ink → larger dots. Returns dots in source-canvas coordinates. */
export function halftoneDotsFromCanvas(canvas, opts) {
  const { width, height } = canvas
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  const data = ctx.getImageData(0, 0, width, height).data

  const step = Math.max(opts.spacing, opts.dotSize * 2)
  const dots = []
  const cell = Math.max(1, Math.round(step / 2))

  for (let y = step / 2; y < height; y += step) {
    for (let x = step / 2; x < width; x += step) {
      let sum = 0
      let n = 0
      for (let dy = -cell; dy <= cell; dy += 2) {
        for (let dx = -cell; dx <= cell; dx += 2) {
          const px = Math.min(width - 1, Math.max(0, Math.round(x + dx)))
          const py = Math.min(height - 1, Math.max(0, Math.round(y + dy)))
          const i = (py * width + px) * 4
          const a = data[i + 3] / 255
          const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255
          sum += a * (1 - lum)
          n++
        }
      }
      const ink = Math.min(1, sum / n)
      if (ink > 0.08) dots.push({ cx: x, cy: y, r: Math.max(0.6, opts.dotSize * ink) })
    }
  }
  return dots
}

/**
 * "AI orb" source painter, a neural mark drawn dark-on-white so luminance
 * sampling works on any theme.
 */
export function drawAIOrb(ctx, w, h) {
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, w, h)
  const ink = '#000'
  const cx = w / 2
  const cy = h / 2.15

  ctx.fillStyle = ink
  ctx.beginPath()
  ctx.arc(cx, cy, w * 0.17, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = ink
  ctx.lineWidth = w * 0.045
  ctx.beginPath()
  ctx.ellipse(cx, cy, w * 0.42, h * 0.3, (22 * Math.PI) / 180, 0, Math.PI * 2)
  ctx.stroke()
  ctx.lineWidth = w * 0.032
  ctx.beginPath()
  ctx.ellipse(cx, cy, w * 0.3, h * 0.22, (-38 * Math.PI) / 180, 0, Math.PI * 2)
  ctx.stroke()

  const nodes1 = [0.5, 1.4, 2.4, 3.3, 4.4, 5.5]
  nodes1.forEach((ang) => {
    const r = w * 0.42
    const nx = cx + Math.cos(ang) * r
    const ny = cy + Math.sin(ang) * h * 0.3 * 0.72
    ctx.beginPath()
    ctx.arc(nx, ny, w * 0.052, 0, Math.PI * 2)
    ctx.fill()
    ctx.lineWidth = w * 0.012
    ctx.strokeStyle = ink
    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(ang) * w * 0.13, cy + Math.sin(ang) * h * 0.1)
    ctx.lineTo(nx, ny)
    ctx.stroke()
  })
}
