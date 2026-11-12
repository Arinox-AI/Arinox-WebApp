import { useEffect, useMemo, useRef } from 'react'
import { isLand } from '../../lib/landmask'
import { useElementSize } from './HalftoneBackground'
import { company } from '../../data/site'

/* Brand colours as defaults for canvas drawing (CSS classes can't reach it). */
const INK = '23,23,26'
const EMBER = '255,99,1'

const RAD = Math.PI / 180
const ARC_STEPS = 56
/* The globe stands upright (poles vertical). Dragging may tip it a little,
   and it eases back to level when released. */
const PITCH_LIMIT = 0.3
const AUTO_SPEED = 0.00011 // rad per ms (~6 deg/s)

const offices = company.offices
  .flatMap((g) => g.cities)
  .map((c) => ({ ...c, hq: c.note === 'Headquarters' }))
const hq = offices.find((o) => o.hq) || offices[0]

const ARIA = `Arinox offices: ${offices.map((o) => (o.hq ? `${o.city} HQ` : o.city)).join(', ')}`

const toVec = (lat, lon) => {
  const la = lat * RAD
  const lo = lon * RAD
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)]
}

/* Land and ocean dots on a roughly equal-area lat/lon grid, built once.
   Land is dense ink halftone; ocean is a sparse ember stipple (the same
   paper/ink/ember split the old ASCII globe used). */
const [LAND, OCEAN] = (() => {
  const step = 1.9
  const land = []
  const ocean = []
  let row = 0
  for (let lat = -84; lat <= 84; lat += step, row++) {
    const cosL = Math.cos(lat * RAD)
    const lonStep = step / Math.max(0.2, cosL)
    let col = 0
    for (let lon = -180; lon < 180; lon += lonStep, col++) {
      if (isLand(lon, lat)) land.push(...toVec(lat, lon))
      else if (row % 2 === 0 && col % 2 === 0) ocean.push(...toVec(lat, lon))
    }
  }
  return [new Float32Array(land), new Float32Array(ocean)]
})()

/* Graticule: parallels and meridians every 30 degrees, as polylines. */
const GRATICULE = (() => {
  const lines = []
  for (let lat = -60; lat <= 60; lat += 30) {
    const l = []
    for (let lon = -180; lon <= 180; lon += 4) l.push(toVec(lat, lon))
    lines.push(l)
  }
  for (let lon = -180; lon < 180; lon += 30) {
    const l = []
    for (let lat = -90; lat <= 90; lat += 4) l.push(toVec(lat, lon))
    lines.push(l)
  }
  return lines
})()

/* Great-circle arc between two unit vectors, lifted above the surface. */
function buildArc(a, b) {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))
  const ang = Math.acos(dot)
  const sin = Math.sin(ang) || 1
  const lift = 0.06 + 0.2 * (ang / Math.PI)
  const out = []
  for (let i = 0; i <= ARC_STEPS; i++) {
    const t = i / ARC_STEPS
    const k1 = Math.sin((1 - t) * ang) / sin
    const k2 = Math.sin(t * ang) / sin
    const h = 1 + lift * Math.sin(Math.PI * t)
    out.push([(a[0] * k1 + b[0] * k2) * h, (a[1] * k1 + b[1] * k2) * h, (a[2] * k1 + b[2] * k2) * h])
  }
  return out
}

const hqVec = toVec(hq.lat, hq.lon)
const ARCS = offices.filter((o) => o !== hq).map((o) => buildArc(hqVec, toVec(o.lat, o.lon)))
const PINS = offices.map((o) => ({ ...o, v: toVec(o.lat, o.lon) }))

/* Rotate an absolute-frame vector into view space (yaw about Y, then pitch about X). */
function project(v, yaw, pitch) {
  const cyw = Math.cos(yaw)
  const syw = Math.sin(yaw)
  const x1 = v[0] * cyw - v[2] * syw
  const z1 = v[0] * syw + v[2] * cyw
  const cp = Math.cos(pitch)
  const sp = Math.sin(pitch)
  return [x1, v[1] * cp - z1 * sp, v[1] * sp + z1 * cp]
}

/**
 * PresenceGlobe: an interactive dotted globe with Arinox office pins and
 * great-circle arcs from HQ. Canvas 2D, no dependencies. Drag to rotate;
 * auto-rotates slowly; static when the user prefers reduced motion.
 */
export function PresenceGlobe({ className = '' }) {
  const hostRef = useRef(null)
  const canvasRef = useRef(null)
  const [w, h] = useElementSize(hostRef)
  const view = useRef({ yaw: hq.lon * RAD, pitch: 0, vel: 0, dragging: false, hover: false })
  const drag = useRef({ x: 0, y: 0, t: 0 })

  const reduced = useMemo(
    () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !w || !h) return undefined
    const ctx = canvas.getContext?.('2d')
    if (!ctx) return undefined

    const dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const cx = w / 2
    const cy = h / 2
    const R = (Math.min(w, h) / 2) * 0.8
    const st = view.current

    const draw = (t) => {
      const { yaw, pitch } = st
      ctx.clearRect(0, 0, w, h)

      // flat print look: no glossy body, no glow — graticule, halftone, hairline limb
      const cyw = Math.cos(yaw)
      const syw = Math.sin(yaw)
      const cp = Math.cos(pitch)
      const sp = Math.sin(pitch)

      // graticule (front hemisphere only)
      ctx.strokeStyle = `rgba(${INK},0.09)`
      ctx.lineWidth = 0.8
      GRATICULE.forEach((line) => {
        ctx.beginPath()
        let pen = false
        line.forEach((v) => {
          const [x, y, z] = project(v, yaw, pitch)
          if (z <= 0) { pen = false; return }
          if (pen) ctx.lineTo(cx + x * R, cy - y * R)
          else ctx.moveTo(cx + x * R, cy - y * R)
          pen = true
        })
        ctx.stroke()
      })

      // dots, sized and shaded by facing; square halftone cells
      const dots = (arr, rgb, aMin, aMax, sMin, sMax) => {
        ctx.fillStyle = `rgb(${rgb})`
        for (let i = 0; i < arr.length; i += 3) {
          const x0 = arr[i]
          const y0 = arr[i + 1]
          const z0 = arr[i + 2]
          const z1 = x0 * syw + z0 * cyw
          const z2 = y0 * sp + z1 * cp
          if (z2 <= 0.02) continue
          const x1 = x0 * cyw - z0 * syw
          const y2 = y0 * cp - z1 * sp
          const s = sMin + sMax * z2
          ctx.globalAlpha = aMin + aMax * z2
          ctx.fillRect(cx + x1 * R - s / 2, cy - y2 * R - s / 2, s, s)
        }
        ctx.globalAlpha = 1
      }
      dots(OCEAN, EMBER, 0.12, 0.3, 0.9, 0.9)
      dots(LAND, INK, 0.25, 0.55, 1.1, 1.5)

      // limb ring
      ctx.strokeStyle = `rgba(${INK},0.22)`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.stroke()

      // arcs + travelling pulses
      ARCS.forEach((arc, ai) => {
        const pts = arc.map((v) => project(v, yaw, pitch))
        const vis = pts.map((p) => p[2] > 0 || p[0] * p[0] + p[1] * p[1] > 1)
        const head = reduced ? -1 : (((t * 0.00022 + ai * 0.19) % 1) + 1) % 1
        for (let i = 0; i < ARC_STEPS; i++) {
          if (!vis[i] || !vis[i + 1]) continue
          const u = (i + 0.5) / ARC_STEPS
          let behind = head >= 0 ? head - u : 1
          if (behind < 0) behind += 1
          const trail = head >= 0 && behind < 0.22 ? 1 - behind / 0.22 : 0
          ctx.strokeStyle = `rgba(${EMBER},${(0.22 + 0.68 * trail).toFixed(3)})`
          ctx.lineWidth = 0.9 + trail * 0.9
          ctx.beginPath()
          ctx.moveTo(cx + pts[i][0] * R, cy - pts[i][1] * R)
          ctx.lineTo(cx + pts[i + 1][0] * R, cy - pts[i + 1][1] * R)
          ctx.stroke()
        }
        if (head >= 0) {
          const k = Math.min(ARC_STEPS, Math.floor(head * ARC_STEPS))
          if (vis[k]) {
            ctx.fillStyle = `rgba(${EMBER},1)`
            ctx.beginPath()
            ctx.arc(cx + pts[k][0] * R, cy - pts[k][1] * R, 2.2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      })

      // office pins (unlabelled — names live in the aria-label)
      PINS.forEach((o, oi) => {
        const [x, y, z] = project(o.v, yaw, pitch)
        if (z < 0.06) return
        const px = cx + x * R
        const py = cy - y * R
        const base = o.hq ? 3.4 : 2.4
        const phase = reduced ? 0.4 : (t * 0.0006 + oi * 0.27) % 1
        ctx.strokeStyle = `rgba(${EMBER},${(0.45 * (1 - phase) * z).toFixed(3)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(px, py, base + phase * (o.hq ? 10 : 7), 0, Math.PI * 2)
        ctx.stroke()
        ctx.fillStyle = `rgba(${EMBER},1)`
        ctx.beginPath()
        ctx.arc(px, py, base, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    if (reduced) {
      draw(0)
      return undefined
    }

    let frame = 0
    let last = performance.now()
    let onScreen = true
    let running = false

    const loop = (now) => {
      const dt = Math.min(48, now - last)
      last = now
      if (!st.dragging) {
        const auto = AUTO_SPEED * (st.hover ? 0.25 : 1)
        st.yaw += (auto + st.vel) * dt
        st.vel *= Math.pow(0.94, dt / 16)
        if (Math.abs(st.vel) < 1e-6) st.vel = 0
        st.pitch *= Math.pow(0.92, dt / 16) // ease back to upright
        if (Math.abs(st.pitch) < 1e-4) st.pitch = 0
      }
      draw(now)
      frame = requestAnimationFrame(loop)
    }
    const sync = () => {
      const should = onScreen && !document.hidden
      if (should && !running) {
        running = true
        last = performance.now()
        frame = requestAnimationFrame(loop)
      } else if (!should && running) {
        running = false
        cancelAnimationFrame(frame)
      }
    }
    const io = typeof IntersectionObserver === 'function'
      ? new IntersectionObserver(([e]) => {
        onScreen = e.isIntersecting
        sync()
      })
      : null
    io?.observe(canvas)
    document.addEventListener('visibilitychange', sync)
    sync()

    return () => {
      running = false
      cancelAnimationFrame(frame)
      io?.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [w, h, reduced])

  /* Pointer drag with inertia; hover slows the spin. */
  const onDown = (e) => {
    if (reduced) return
    e.currentTarget.setPointerCapture?.(e.pointerId)
    view.current.dragging = true
    view.current.vel = 0
    drag.current = { x: e.clientX, y: e.clientY, t: performance.now() }
  }
  const onMove = (e) => {
    const st = view.current
    if (!st.dragging) return
    const R = (Math.min(w, h) / 2) * 0.8 || 1
    const dx = e.clientX - drag.current.x
    const dy = e.clientY - drag.current.y
    const now = performance.now()
    const dt = Math.max(1, now - drag.current.t)
    st.yaw -= dx / R
    st.pitch = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, st.pitch + dy / R))
    st.vel = -(dx / R) / dt
    drag.current = { x: e.clientX, y: e.clientY, t: now }
  }
  const onUp = () => {
    view.current.dragging = false
  }

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={hostRef}
        className="relative aspect-square w-full"
        onPointerEnter={() => { view.current.hover = true }}
        onPointerLeave={() => { view.current.hover = false }}
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={ARIA}
          className={`absolute inset-0 h-full w-full ${reduced ? '' : 'cursor-grab active:cursor-grabbing'}`}
          style={{ touchAction: 'pan-y' }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        />
      </div>
    </div>
  )
}
