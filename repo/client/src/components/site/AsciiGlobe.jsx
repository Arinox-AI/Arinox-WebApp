import { useEffect, useRef } from 'react'
import { isLand } from '../../lib/landmask'
import { useElementSize } from './HalftoneBackground'

const LAND = ' .:-=+*#%@'
const GRID_STEP = 30

/**
 * AsciiGlobe, a rotating ASCII Earth for the hero backdrop.
 * Three sphere cues on top of the ASCII: a lat/lon graticule, a soft ember
 * atmosphere, and a thin limb ring at the sphere's edge.
 */
export function AsciiGlobe({
  className = '',
  fontSize = 13,
  speed = 5,
  tilt = 18,
  scale = 1.0,
  landColor = '#17171a',
  oceanColor = '#ff6301',
  gridColor = '#17171a',
  landOpacity = 0.68,
  oceanOpacity = 0.5,
  gridOpacity = 0.32,
}) {
  const hostRef = useRef(null)
  const landRef = useRef(null)
  const oceanRef = useRef(null)
  const gridRef = useRef(null)
  const ringRef = useRef(null)
  const [w, h] = useElementSize(hostRef)

  useEffect(() => {
    const host = hostRef.current
    const landEl = landRef.current
    const oceanEl = oceanRef.current
    const gridEl = gridRef.current
    const ringEl = ringRef.current
    if (!host || !landEl || !oceanEl || !gridEl || !ringEl || !w || !h) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rad = Math.PI / 180
    const ct = Math.cos(tilt * rad)
    const st = Math.sin(tilt * rad)
    const Lx = -0.45
    const Ly = 0.45
    const Lz = 0.77

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.font = `${fontSize}px "IBM Plex Mono", ui-monospace, monospace`
    const charW = Math.max(1, ctx.measureText('0').width)
    const charH = fontSize

    const cols = Math.max(24, Math.floor(w / charW))
    const rows = Math.max(16, Math.floor(h / charH))
    const gridW = cols * charW
    const gridH = rows * charH
    const offX = (w - gridW) / 2
    const offY = (h - gridH) / 2
    const cx = w / 2
    const cy = h / 2
    const R = (Math.min(w, h) / 2) * scale * 0.92

    for (const el of [landEl, oceanEl, gridEl]) {
      el.style.width = `${gridW}px`
      el.style.height = `${gridH}px`
      el.style.left = `${offX}px`
      el.style.top = `${offY}px`
    }
    ringEl.style.width = `${R * 2}px`
    ringEl.style.height = `${R * 2}px`
    ringEl.style.left = `${cx - R}px`
    ringEl.style.top = `${cy - R}px`

    const cellDeg = (charH / R) * (180 / Math.PI) * 0.8

    const draw = (rot) => {
      let land = ''
      let ocean = ''
      let grid = ''
      for (let j = 0; j < rows; j++) {
        const py = (j + 0.5) * charH
        for (let i = 0; i < cols; i++) {
          const px = (i + 0.5) * charW
          const nx = (px - cx) / R
          const ny = (py - cy) / R
          const d2 = nx * nx + ny * ny
          if (d2 > 1) {
            land += ' '
            ocean += ' '
            grid += ' '
            continue
          }
          const nz = Math.sqrt(1 - d2)
          const vx = nx
          const vy = -ny
          const vz = nz
          const a = vy * ct + vz * st
          const b = -vy * st + vz * ct
          const lat = Math.asin(a < -1 ? -1 : a > 1 ? 1 : a) / rad
          let lon = Math.atan2(vx, b) / rad - rot
          lon = ((((lon + 180) % 360) + 360) % 360) - 180
          const litRaw = vx * Lx + vy * Ly + vz * Lz
          const lit = 0.12 + 0.88 * (litRaw > 0 ? litRaw : 0)

          const dLat = Math.abs(lat - Math.round(lat / GRID_STEP) * GRID_STEP)
          const dLon = Math.abs(lon - Math.round(lon / GRID_STEP) * GRID_STEP)
          const cosLat = Math.max(0.25, Math.abs(Math.cos(lat * rad)))
          const onGrid = dLat < cellDeg || dLon < cellDeg / cosLat

          if (isLand(lon, lat)) {
            const idx = Math.min(9, Math.max(1, Math.round(lit * 9)))
            land += LAND[idx]
            ocean += ' '
            grid += ' '
          } else {
            land += ' '
            ocean += lit > 0.55 ? ':' : '.'
            grid += onGrid ? '·' : ' '
          }
        }
        land += '\n'
        ocean += '\n'
        grid += '\n'
      }
      landEl.textContent = land
      oceanEl.textContent = ocean
      gridEl.textContent = grid
    }

    if (reduced) {
      draw(-30)
      return
    }

    let frame = 0
    let last = 0
    const start = performance.now()
    const loop = (t) => {
      if (t - last > 70) {
        last = t
        draw(-30 + ((t - start) / 1000) * speed)
      }
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [w, h, fontSize, speed, tilt, scale])

  return (
    <div ref={hostRef} className={`relative h-full w-full overflow-hidden ${className}`} aria-hidden>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 46%, rgba(255,99,1,0.13), transparent 62%)' }}
      />
      <pre
        ref={oceanRef}
        className="pointer-events-none absolute m-0 select-none whitespace-pre font-mono leading-none"
        style={{ fontSize: `${fontSize}px`, lineHeight: `${fontSize}px`, color: oceanColor, opacity: oceanOpacity }}
      />
      <pre
        ref={gridRef}
        className="pointer-events-none absolute m-0 select-none whitespace-pre font-mono leading-none"
        style={{ fontSize: `${fontSize}px`, lineHeight: `${fontSize}px`, color: gridColor, opacity: gridOpacity }}
      />
      <pre
        ref={landRef}
        className="pointer-events-none absolute m-0 select-none whitespace-pre font-mono leading-none"
        style={{ fontSize: `${fontSize}px`, lineHeight: `${fontSize}px`, color: landColor, opacity: landOpacity }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none absolute rounded-full border border-ink/15 transition-none"
        style={{
          boxShadow: 'inset 0 0 44px -18px rgba(255,99,1,0.55), 0 0 70px -26px rgba(255,99,1,0.6)',
        }}
      />
    </div>
  )
}
