/**
 * halftone.js, framework-agnostic halftone dot generator. No dependencies.
 *
 * Pure math: produces a grid of dots whose radius falls off along a gradient
 * direction, the "ordered dither" look used on twenty.com/halftone.
 *
 * Performance model:
 *  - Dots are computed once per container size. No animation frame loops.
 *  - The grid is exact-fit for the element, so there are no seams to hide.
 */

/** Normalize a gradient option to per-dot radius scale 0..1 at (x, y). */
function radiusScale(o, x, y) {
  const g = o.gradient
  if (g.type === 'none') return 1
  if (g.type === 'radial') {
    const cx = g.from === 'top-left' ? 0 : g.from === 'top-right' ? o.width : o.width / 2
    const cy = g.from === 'top-left' || g.from === 'top-right' ? 0 : o.height / 2
    const diag = Math.hypot(Math.max(cx, o.width - cx), Math.max(cy, o.height - cy)) || 1
    const d = Math.hypot(x - cx, y - cy) / diag
    return 1 - d
  }
  const rad = (g.angle * Math.PI) / 180
  const cs = Math.cos(rad)
  const sn = Math.sin(rad)
  const corners = [0, o.width * cs, o.height * sn, o.width * cs + o.height * sn]
  const pmin = Math.min(...corners)
  const pmax = Math.max(...corners)
  const t = ((x * cs + y * sn) - pmin) / (pmax - pmin || 1)
  return 1 - t
}

/** Pure dot-layout math, shared by the React layer and both exporters. */
export function halftoneDots(o) {
  const dots = []
  const step = Math.max(o.spacing, o.dotSize * 2)
  for (let y = step / 2; y <= o.height; y += step)
    for (let x = step / 2; x <= o.width; x += step) {
      const s = radiusScale(o, x, y)
      if (s <= 0.04) continue
      dots.push({ cx: x, cy: y, r: o.dotSize * s })
    }
  return dots
}

/** Serialize the current pattern to a standalone SVG string. */
export function halftoneToSVG(o) {
  const dots = halftoneDots(o)
  const circles = dots
    .map((d) => `<circle cx="${d.cx.toFixed(1)}" cy="${d.cy.toFixed(1)}" r="${d.r.toFixed(2)}"/>`)
    .join('')
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${o.width}" height="${o.height}" viewBox="0 0 ${o.width} ${o.height}">`,
    `<rect width="100%" height="100%" fill="${o.baseColor}"/>`,
    `<g fill="${o.dotColor}" opacity="${o.opacity}">${circles}</g>`,
    `</svg>`,
  ].join('')
}

/** Export the pattern as a PNG file (rasterizes once via an offscreen canvas). */
export function downloadHalftonePNG(o, filename = 'halftone.png') {
  const svg = halftoneToSVG(o)
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
  const img = new Image()
  img.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = o.width
    canvas.height = o.height
    canvas.getContext('2d').drawImage(img, 0, 0)
    URL.revokeObjectURL(url)
    const a = document.createElement('a')
    a.download = filename
    a.href = canvas.toDataURL('image/png')
    a.click()
  }
  img.src = url
}

/** Export the current pattern as an SVG file. */
export function downloadHalftoneSVG(o, filename = 'halftone.svg') {
  const a = document.createElement('a')
  a.download = filename
  a.href = URL.createObjectURL(new Blob([halftoneToSVG(o)], { type: 'image/svg+xml' }))
  a.click()
}

/** Vanilla drop-in mount. Returns a disconnect function. */
export function mountHalftone(el, opts = {}) {
  const defaults = {
    dotSize: 5,
    spacing: 22,
    baseColor: 'transparent',
    dotColor: '#ff6301',
    opacity: 0.35,
    gradient: { type: 'linear', angle: 0 },
    ...opts,
  }
  const render = () => {
    const rect = el.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    const full = {
      width: rect.width,
      height: rect.height,
      dotSize: defaults.dotSize,
      spacing: defaults.spacing,
      baseColor: defaults.baseColor,
      dotColor: defaults.dotColor,
      opacity: defaults.opacity,
      gradient: defaults.gradient,
    }
    el.innerHTML = halftoneToSVG(full)
  }
  render()
  const ro = new ResizeObserver(render)
  ro.observe(el)
  return () => ro.disconnect()
}
