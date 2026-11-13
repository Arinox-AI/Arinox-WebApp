import { useState } from 'react'

const layers = [
  {
    n: '01',
    name: 'Your estate',
    role: 'Where it runs',
    desc: 'CommandCore™ appliance, private cloud, or your own on-premises estate. The connection targets stay yours.',
    parts: ['Public cloud', 'Private cloud', 'CommandCore™'],
  },
  {
    n: '02',
    name: 'Data layer',
    role: 'The AI-ready foundation',
    desc: 'Scattered documents, systems and media are discovered, cleansed, structured, connected, governed and enriched into machine-readable knowledge, inside your perimeter. Without it, the layers above run on guesses.',
    parts: ['Discover', 'Cleanse', 'Structure', 'Connect', 'Govern', 'Enrich'],
  },
  {
    n: '03',
    name: 'KOGO OS',
    role: 'The agentic AI layer',
    desc: 'LLMOps, agent orchestration, agent registry, and memory — running on your hardware, grounded in the data layer beneath it.',
    parts: ['LLMOps', 'Orchestration', 'Registry', 'Memory'],
  },
  {
    n: '04',
    name: 'Business applications',
    role: 'Included in the OS',
    desc: 'ERP, HRMS, CRM, Accounting, Legal, SCM and CLM are built in, not stitched on, and every module is agent-addressable.',
    parts: ['ERP', 'HRMS', 'CRM', 'Accounting', 'Legal', 'SCM', 'CLM'],
  },
  {
    n: '05',
    name: 'AI Agents',
    role: 'What your teams touch',
    desc: 'Document, voice, vision, and governance agents, wired into the tools you already run, from SAP to Salesforce to plain email.',
    parts: ['Document', 'Voice', 'Vision', 'Governance'],
  },
]

// Top of the stack first, so the list reads like the drawing.
const stack = [...layers].reverse()
const DEFAULT_ACTIVE = '03'

// ---- Isometric drawing -------------------------------------------------------
// True 2:1 projection. Plate-floor coordinates (u, v) run -66..66 on a plate; u steps right-down,
// v steps left-down, z is height. screen x = CX + u - v, y = cy + (u + v) / 2 - z.
const W = 132
const H = 66
const PITCH = 134 // exploded view: each plate's objects clear the plate above
const CX = 200
const SCALE = 1.25 // objects are drawn at plate-unit size, then enlarged about the plate centre
const thick = (n) => (n === '01' ? 16 : 8)
const pts = (arr) => arr.map((p) => p.join(',')).join(' ')
const pathOf = (arr) => `M${arr.map((p) => p.map((n) => +n.toFixed(2)).join(' ')).join('L')}`
const isoAt = (cy) => (u, v, z = 0) => [CX + u - v, cy + (u + v) / 2 - z]
const rotUV = (u0, v0, x, y, deg) => {
  const t = (deg * Math.PI) / 180
  return [u0 + x * Math.cos(t) - y * Math.sin(t), v0 + x * Math.sin(t) + y * Math.cos(t)]
}

const ease = 'transition-colors duration-300 motion-reduce:transition-none'
const FACE = { top: 'fill-white', right: 'fill-paper', left: 'fill-paper-2' }

/** Isometric box: top, right (+u) and left (+v) faces. children draw details afterwards. */
function Box({ p, u, v, du, dv, h, children }) {
  const T = (a, b, z) => p(a, b, z)
  return (
    <g>
      <polygon points={pts([T(u, v + dv, h), T(u + du, v + dv, h), T(u + du, v + dv, 0), T(u, v + dv, 0)])} className={FACE.left} />
      <polygon points={pts([T(u + du, v, h), T(u + du, v + dv, h), T(u + du, v + dv, 0), T(u + du, v, 0)])} className={FACE.right} />
      <polygon points={pts([T(u, v, h), T(u + du, v, h), T(u + du, v + dv, h), T(u, v + dv, h)])} className={FACE.top} />
      {children}
    </g>
  )
}

/** Upright cylinder; `bands` are heights of extra rings around the body. */
function Cyl({ x, y0, rx, h, bands = [], children }) {
  const ry = rx / 2
  const y1 = y0 - h
  return (
    <g>
      <path d={`M${x - rx} ${y0}V${y1}H${x + rx}V${y0}A${rx} ${ry} 0 0 1 ${x - rx} ${y0}Z`} className={FACE.right} />
      {bands.map((z) => (
        <path key={z} d={`M${x - rx} ${y0 - z}A${rx} ${ry} 0 0 0 ${x + rx} ${y0 - z}`} />
      ))}
      <ellipse cx={x} cy={y1} rx={rx} ry={ry} className={FACE.top} />
      {children}
    </g>
  )
}

/** A flat sheet of paper lying on the floor, rotated about its centre. */
function Sheet({ p, u, v, w, d, deg, z }) {
  const c = [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2]].map(([x, y]) => rotUV(u, v, x, y, deg))
  const at = (zz) => c.map(([a, b]) => p(a, b, zz))
  const ln = (y) => [rotUV(u, v, -w / 2 + 3, y, deg), rotUV(u, v, w / 2 - 3, y, deg)].map(([a, b]) => p(a, b, z))
  return (
    <g>
      <polygon points={pts(at(z - 1.8))} className={FACE.left} />
      <polygon points={pts(at(z))} className={FACE.top} />
      <path d={pathOf(ln(-d / 5))} />
      <path d={pathOf(ln(d / 5))} />
    </g>
  )
}

/* ---- 05 AI Agents: voice, document, vision --------------------------------- */
function Agent({ x, y0, glyph, acc }) {
  const rx = 15
  const h = 18
  const hy = y0 - h
  return (
    <g>
      <Cyl x={x} y0={y0} rx={rx} h={h} />
      <path d={`M${x} ${hy - 12.5}V${hy - 16.5}`} />
      <circle cx={x} cy={hy - 17.5} r={1.4} className={`${acc} ${ease}`} />
      <circle cx={x} cy={hy - 5} r={7.5} className={FACE.top} />
      <rect x={x - 4.5} y={hy - 8.2} width={9} height={4.4} rx={2.2} className={`${acc} ${ease}`} />
      <g transform={`translate(${x} ${y0 - 2})`}>
        {glyph === 'voice' && <path d="M-5 -1V1M-2.5 -3.5V3.5M0 -5.5V5.5M2.5 -3V3M5 -1V1" />}
        {glyph === 'doc' && (
          <>
            <rect x={-3.6} y={-5.2} width={7.2} height={10} rx={0.8} className={FACE.top} />
            <path d="M-1.6 -2.2H1.6M-1.6 0.3H1.6M-1.6 2.6H0.6" />
          </>
        )}
        {glyph === 'eye' && (
          <>
            <path d="M-6.4 0Q0 -6.4 6.4 0Q0 6.4 -6.4 0Z" className={FACE.top} />
            <circle r={1.9} className={`${acc} ${ease}`} />
          </>
        )}
      </g>
    </g>
  )
}

function Agents({ p, acc }) {
  const at = (u, v) => p(u, v)
  const [bx, by] = at(-6, -6)
  const [ax, ay] = at(-10, 32)
  const [cx, cyy] = at(32, -10)
  return (
    <g>
      <Agent x={bx} y0={by} glyph="doc" acc={acc} />
      <Agent x={ax} y0={ay} glyph="voice" acc={acc} />
      <Agent x={cx} y0={cyy} glyph="eye" acc={acc} />
    </g>
  )
}

/* ---- 04 Business applications: a 3 x 2 grid of app blocks ------------------- */
const APP_SIZE = 22
const APP_GAP = 6
const APP_HEIGHTS = [
  [12, 20, 16],
  [22, 14, 26],
]
const APP_LABELS = { '1,0': 'ERP', '0,1': 'CRM' }

function Apps({ p, acc }) {
  const u0 = -((3 * APP_SIZE + 2 * APP_GAP) / 2)
  const v0 = -((2 * APP_SIZE + APP_GAP) / 2)
  const cells = []
  for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) cells.push([i, j])
  cells.sort((a, b) => a[0] + a[1] - (b[0] + b[1]))
  return (
    <g>
      {cells.map(([i, j]) => {
        const u = u0 + i * (APP_SIZE + APP_GAP)
        const v = v0 + j * (APP_SIZE + APP_GAP)
        const h = APP_HEIGHTS[j][i]
        const label = APP_LABELS[`${i},${j}`]
        const [ox, oy] = p(u + 4, v + 14.5, h)
        const k = 4 // inset of the top panel
        return (
          <Box key={`${i}${j}`} p={p} u={u} v={v} du={APP_SIZE} dv={APP_SIZE} h={h}>
            {label ? (
              <text
                transform={`matrix(1 0.5 -1 0.5 ${ox} ${oy})`}
                fontSize={7.4}
                className={`max-lg:hidden font-mono ${ease} ${acc.replace('fill-ember', 'fill-ember-deep')}`}
                stroke="none"
              >
                {label}
              </text>
            ) : (
              <polygon points={pts([p(u + k, v + k, h), p(u + APP_SIZE - k, v + k, h), p(u + APP_SIZE - k, v + APP_SIZE - k, h), p(u + k, v + APP_SIZE - k, h)])} />
            )}
            {label && (
              <polygon
                points={pts([p(u + 2, v + 2, h), p(u + APP_SIZE - 2, v + 2, h), p(u + APP_SIZE - 2, v + APP_SIZE - 2, h), p(u + 2, v + APP_SIZE - 2, h)])}
                className="max-lg:hidden"
              />
            )}
            <path d={pathOf([p(u, v + APP_SIZE, h - 4), p(u + APP_SIZE, v + APP_SIZE, h - 4)])} />
            <path d={pathOf([p(u + APP_SIZE, v, h - 4), p(u + APP_SIZE, v + APP_SIZE, h - 4)])} />
          </Box>
        )
      })}
    </g>
  )
}

/* ---- 03 KOGO OS: orchestration hub and satellites --------------------------- */
function Kogo({ p, acc }) {
  const R = 40
  const sats = [30, 90, 150, 210, 270, 330]
    .map((deg) => rotUV(0, 0, R, 0, deg))
    .sort((a, b) => a[0] + a[1] - (b[0] + b[1]))
  const ring = (r, n = 48) =>
    Array.from({ length: n + 1 }, (_, i) => p(r * Math.cos((i / n) * 2 * Math.PI), r * Math.sin((i / n) * 2 * Math.PI)))
  const [hx, hy] = p(0, 0)
  const star = (s) =>
    `M${hx} ${hy - 10 - s}L${hx + s * 0.32} ${hy - 10 - s * 0.32}L${hx + s} ${hy - 10}L${hx + s * 0.32} ${hy - 10 + s * 0.32}L${hx} ${hy - 10 + s}L${hx - s * 0.32} ${hy - 10 + s * 0.32}L${hx - s} ${hy - 10}L${hx - s * 0.32} ${hy - 10 - s * 0.32}Z`
  return (
    <g>
      <path d={pathOf(ring(R))} strokeDasharray="2 3" />
      <path d={pathOf(ring(R * 0.5))} strokeDasharray="2 3" />
      {sats.map(([u, v]) => (
        <path key={`l${u}`} d={pathOf([p(0, 0), p(u, v)])} />
      ))}
      {sats.map(([u, v]) => {
        const [x, y] = p(u, v)
        return (
          <Cyl key={`s${u}`} x={x} y0={y} rx={7.5} h={6}>
            <circle cx={x} cy={y - 6} r={1.5} className={`${acc} ${ease}`} stroke="none" />
          </Cyl>
        )
      })}
      <Cyl x={hx} y0={hy} rx={17} h={10} bands={[]} />
      <path d={star(7.5)} className={`${acc} ${ease}`} />
    </g>
  )
}

/* ---- 02 Data layer: scattered sheets become a squared stack ----------------- */
function Data({ p, acc }) {
  const arrow = [p(-12, 20, 2), p(4, 22, 2)]
  const [tx, ty] = arrow[1]
  const [fx, fy] = arrow[0]
  const L = Math.hypot(tx - fx, ty - fy)
  const d = [(tx - fx) / L, (ty - fy) / L]
  const wing = (s) => {
    const c = Math.cos(0.5) * -5
    const sn = Math.sin(0.5) * 5 * s
    return [tx + d[0] * c - d[1] * sn, ty + d[1] * c + d[0] * sn]
  }
  const [w1, w2] = [wing(1), wing(-1)]
  const dbs = [
    [-4, -20, 20],
    [24, -20, 16],
  ]
  return (
    <g>
      {dbs.map(([u, v, h]) => {
        const [x, y] = p(u, v)
        return (
          <Cyl key={u} x={x} y0={y} rx={13} h={h} bands={[h / 3, (2 * h) / 3]}>
            <circle cx={x} cy={y - h} r={1.5} className={`${acc} ${ease}`} stroke="none" />
          </Cyl>
        )
      })}
      <Sheet p={p} u={-27} v={19} w={22} d={16} deg={-26} z={0} />
      <Sheet p={p} u={-24} v={16} w={22} d={16} deg={7} z={2.6} />
      <Sheet p={p} u={-27} v={20} w={22} d={16} deg={32} z={5.2} />
      <path d={pathOf(arrow)} strokeDasharray="2.5 2.5" />
      <path d={pathOf([w1, [tx, ty], w2])} />
      <Box p={p} u={14} v={17} du={20} dv={14} h={11}>
        <path d={pathOf([p(14, 31, 7.3), p(34, 31, 7.3)])} />
        <path d={pathOf([p(14, 31, 3.7), p(34, 31, 3.7)])} />
        <path d={pathOf([p(34, 17, 7.3), p(34, 31, 7.3)])} />
        <path d={pathOf([p(34, 17, 3.7), p(34, 31, 3.7)])} />
      </Box>
    </g>
  )
}

/* ---- 01 Your estate: server rack, on-prem building, private cloud ----------- */
function Estate({ p, acc }) {
  const win = (u, v, dv, z1, z2) =>
    pts([p(u, v, z1), p(u, v + dv, z1), p(u, v + dv, z2), p(u, v, z2)])
  const [cx, cy0] = p(0, 0)
  return (
    <g>
      {/* building (back right) */}
      <Box p={p} u={10} v={-36} du={28} dv={24} h={26}>
        <polygon points={win(38, -33, 8, 13, 20)} />
        <polygon points={win(38, -22, 8, 13, 20)} />
        <polygon points={win(38, -33, 8, 4, 10)} />
        <polygon points={win(38, -22, 8, 4, 10)} />
        <polygon points={pts([p(14, -12, 20), p(22, -12, 20), p(22, -12, 13), p(14, -12, 13)])} />
        <polygon points={pts([p(26, -12, 20), p(34, -12, 20), p(34, -12, 13), p(26, -12, 13)])} />
        <polygon points={pts([p(14, -12, 10), p(22, -12, 10), p(22, -12, 4), p(14, -12, 4)])} />
        <polygon points={pts([p(26, -12, 10), p(34, -12, 10), p(34, -12, 4), p(26, -12, 4)])} />
      </Box>
      <Box p={(u, v, z) => p(u, v, z + 26)} u={20} v={-28} du={10} dv={8} h={5} />
      {/* server rack (front left) */}
      <Box p={p} u={-36} v={10} du={24} dv={26} h={38}>
        {[8, 15, 22, 29].map((z) => (
          <path key={z} d={pathOf([p(-33, 36, z), p(-15, 36, z)])} />
        ))}
        {[8, 15, 22].map((z) => (
          <g key={`r${z}`}>
            <path d={pathOf([p(-12, 17, z - 2.5), p(-12, 33, z - 2.5)])} />
            <circle cx={p(-12, 14, z - 1)[0]} cy={p(-12, 14, z - 1)[1]} r={1.4} className={`${acc} ${ease}`} stroke="none" />
          </g>
        ))}
      </Box>
      {/* private cloud floats between them, tethered to the floor */}
      <path d={pathOf([[cx, cy0 - 21], [cx, cy0 - 3]])} strokeDasharray="2 2.5" />
      <ellipse cx={cx} cy={cy0} rx={11} ry={5.5} strokeDasharray="2 2.5" />
      <g transform={`translate(${cx} ${cy0 - 31})`}>
        <path d="M-15 6H13A6 6 0 0 0 13 -6A8 8 0 0 0 -1 -9A7 7 0 0 0 -12 -3A5.5 5.5 0 0 0 -15 6Z" className={FACE.top} />
        <rect x={-3} y={-1.2} width={6} height={5} rx={0.8} className={`${acc} ${ease}`} />
        <path d="M-1.6 -1.2V-2.6A1.6 1.6 0 0 1 1.6 -2.6V-1.2" />
      </g>
    </g>
  )
}

const SCENES = { '01': Estate, '02': Data, '03': Kogo, '04': Apps, '05': Agents }

function Plate({ layer, index, active, onSelect }) {
  const cy = H + index * PITCH
  const t = thick(layer.n)
  const p = isoAt(cy)
  const top = [[CX, cy - H], [CX + W, cy], [CX, cy + H], [CX - W, cy]]
  const left = [[CX - W, cy], [CX, cy + H], [CX, cy + H + t], [CX - W, cy + t]]
  const right = [[CX, cy + H], [CX + W, cy], [CX + W, cy + t], [CX, cy + H + t]]
  const Scene = SCENES[layer.n]
  const edge = active ? 'stroke-ember-deep' : 'stroke-ink'
  const objStroke = active ? 'stroke-ember-deep' : 'stroke-ink-soft'
  const acc = active ? 'fill-ember' : 'fill-ink-soft'
  return (
    <g data-plate={layer.n} data-active={active ? 'true' : 'false'} onMouseEnter={() => onSelect(layer.n)} onClick={() => onSelect(layer.n)}>
      <g
        className={`transition-transform duration-300 motion-reduce:transition-none ${
          active ? '-translate-y-[9px] motion-reduce:translate-y-0' : 'translate-y-0'
        }`}
      >
        <polygon points={pts(left)} strokeWidth={1.25} strokeLinejoin="round" className={`${edge} ${ease} ${active ? 'fill-ember-deep' : 'fill-paper-2'}`} />
        <polygon points={pts(right)} strokeWidth={1.25} strokeLinejoin="round" className={`${edge} ${ease} ${active ? 'fill-ember' : 'fill-paper-2'}`} />
        <polygon points={pts(top)} strokeWidth={1.25} strokeLinejoin="round" className={`${edge} ${ease} ${active ? 'fill-tint' : 'fill-paper'}`} />
        <g
          data-objects={layer.n}
          fill="none"
          strokeWidth={1.2 / SCALE}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${objStroke} [&_*]:transition-colors [&_*]:duration-300 motion-reduce:[&_*]:transition-none`}
        >
          <g transform={`translate(${CX} ${cy}) scale(${SCALE}) translate(${-CX} ${-cy})`}>
            <Scene p={p} acc={acc} />
          </g>
        </g>
        <line x1={30} y1={cy + t / 2} x2={CX - W - 6} y2={cy + t / 2} strokeWidth={1} strokeDasharray="2 3" className="stroke-ink/30" />
        <text x={0} y={cy + t / 2 + 4} className={`font-mono text-[11px] ${ease} ${active ? 'fill-ember-deep' : 'fill-ink-faint'}`}>
          {layer.n}
        </text>
      </g>
    </g>
  )
}

function StrataDrawing({ active, onSelect }) {
  const height = H * 2 + (stack.length - 1) * PITCH + thick('01') + 4
  return (
    <svg
      viewBox={`0 0 400 ${height}`}
      role="img"
      aria-label="Five stacked layers, from your estate at the base to AI agents at the top"
      className="mx-auto block h-auto w-full max-w-[280px] overflow-visible lg:max-w-[440px]"
    >
      {/* paint the bottom plate first so upper plates overlap it */}
      {[...stack].reverse().map((l) => (
        <Plate key={l.n} layer={l} index={stack.indexOf(l)} active={active === l.n} onSelect={onSelect} />
      ))}
    </svg>
  )
}

/** The platform as strata: an isometric stack on the left, the ruled list on the right. */
export function LayerStack({ className = '' }) {
  const [active, setActive] = useState(DEFAULT_ACTIVE)

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-line pb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
        <span>Foundation first · layer by layer</span>
        <span>Runs entirely inside your perimeter</span>
      </div>

      <div className="mt-10 grid gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <StrataDrawing active={active} onSelect={setActive} />
          </div>
        </div>

        <ol className="lg:col-span-7">
          {stack.map((l, i) => {
            const on = active === l.n
            return (
              <li
                key={l.n}
                tabIndex={0}
                data-layer={l.n}
                aria-current={on ? 'true' : undefined}
                onMouseEnter={() => setActive(l.n)}
                onFocus={() => setActive(l.n)}
                onClick={() => setActive(l.n)}
                className={`relative grid min-w-0 cursor-default grid-cols-1 gap-x-6 py-6 outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-4 focus-visible:ring-offset-paper sm:grid-cols-[64px_minmax(0,1fr)] ${
                  i === 0 ? 'border-t border-ink/80' : 'border-t border-line'
                } ${i === stack.length - 1 ? 'border-b border-line' : ''}`}
              >
                <span
                  aria-hidden
                  className={`absolute -top-px left-0 h-[2px] bg-ember transition-all duration-300 motion-reduce:transition-none ${on ? 'w-12' : 'w-0'}`}
                />
                <span className={`num font-mono text-[26px] leading-none ${ease} ${on ? 'text-ink' : 'text-ink-faint'}`}>{l.n}</span>
                <div className="mt-3 sm:mt-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-[24px] leading-tight tracking-[-0.015em]">{l.name}</h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.11em] text-ember-deep">{l.role}</span>
                  </div>
                  <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-ink-soft">{l.desc}</p>
                  <p className="mt-3 font-mono text-[11.5px] uppercase tracking-[0.08em] text-ink-soft">
                    {l.parts.map((c, j) => (
                      <span key={c}>
                        {j > 0 && (
                          <span className="mx-2 text-ember" aria-hidden>
                            ·
                          </span>
                        )}
                        {c}
                      </span>
                    ))}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
