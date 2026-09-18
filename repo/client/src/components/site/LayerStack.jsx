import { ArrowDown, Bot, Database, LayoutGrid, Server } from 'lucide-react'
import { TONES } from './tones'

/* KOGO OS mark: astronaut badge in the logo's flat, filled style —
   helmet ring, cut-out visor, sparkle, side pods, collar bands. */
const AstronautMark = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 3a8.6 8.6 0 1 0 0 17.2A8.6 8.6 0 0 0 12 3zm-3.4 5h6.8a2.8 2.8 0 0 1 2.8 2.8v1.8a2.8 2.8 0 0 1-2.8 2.8H8.6a2.8 2.8 0 0 1-2.8-2.8v-1.8A2.8 2.8 0 0 1 8.6 8z"
    />
    <circle cx="2.9" cy="11.6" r="1.5" fill="currentColor" />
    <circle cx="21.1" cy="11.6" r="1.5" fill="currentColor" />
    <path
      fill="currentColor"
      d="M15.1 9c.25 1.1.75 1.6 1.85 1.85-1.1.25-1.6.75-1.85 1.85-.25-1.1-.75-1.6-1.85-1.85C14.35 10.6 14.85 10.1 15.1 9z"
    />
    <rect x="9.6" y="19.9" width="4.8" height="1.7" rx="0.85" fill="currentColor" opacity="0.7" />
    <rect x="8.2" y="22.1" width="7.6" height="1.7" rx="0.85" fill="currentColor" opacity="0.45" />
  </svg>
)

const layers = [
  {
    n: '01',
    name: 'Your estate',
    role: 'Where it runs',
    desc: 'CommandCore™ appliance, private cloud, or your own on-premises estate. The connection targets stay yours.',
    chips: ['Public cloud', 'Private cloud', 'CommandCore™'],
    Icon: Server,
    tone: 'light',
  },
  {
    n: '02',
    name: 'Data layer',
    role: 'The AI-ready foundation',
    desc: 'Scattered documents, systems and media are discovered, cleansed, structured, connected, governed and enriched into machine-readable knowledge, inside your perimeter. Without it, the layers above run on guesses.',
    chips: ['Discover', 'Cleanse', 'Structure', 'Connect', 'Govern', 'Enrich'],
    Icon: Database,
    tone: 'ember',
  },
  {
    n: '03',
    name: 'KOGO OS',
    role: 'The agentic AI layer',
    desc: 'LLMOps, swarm orchestration, agent registry, and memory — running on your hardware, grounded in the data layer beneath it.',
    chips: ['LLMOps', 'Swarm', 'Registry', 'Memory'],
    Icon: AstronautMark,
    tone: 'dark',
  },
  {
    n: '04',
    name: 'Business applications',
    role: 'Included in the OS',
    desc: 'ERP, HRMS, CRM, Accounting, Legal, SCM and CLM are built in, not stitched on, and every module is agent-addressable.',
    chips: ['ERP', 'HRMS', 'CRM', 'Accounting', 'Legal', 'SCM', 'CLM'],
    Icon: LayoutGrid,
    tone: 'tint',
  },
  {
    n: '05',
    name: 'AI Agents',
    role: 'What your teams touch',
    desc: 'Document, voice, vision, and governance agents, wired into the tools you already run, from SAP to Salesforce to plain email.',
    chips: ['Document', 'Voice', 'Vision', 'Governance'],
    Icon: Bot,
    tone: 'dark',
  },
]

/** The platform as signed strata, foundation at the base, capability rising. */export function LayerStack({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-[0_28px_70px_-44px_rgba(11,11,13,0.55)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="hero-grid absolute inset-0 opacity-60" />
          <div className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(255,99,1,0.09),transparent_75%)]" />
        </div>

        <div className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line px-5 py-4 md:px-8">
          <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint">
            <ArrowDown size={13} strokeWidth={2.2} className="text-ember" />
            Foundation first · layer by layer
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
            Runs entirely inside your perimeter
          </span>
        </div>

        <ol className="relative">
          <span className="pointer-events-none absolute bottom-7 left-[36px] top-7 hidden w-px bg-line md:block" aria-hidden />

          {layers.map((l) => (
            <li
              key={l.name}
              className="group relative border-b border-line transition-colors duration-200 last:border-b-0 hover:bg-paper-2/45"
            >
              <div className="relative grid gap-4 px-5 py-6 md:grid-cols-[54px_auto_1fr_auto] md:items-center md:gap-7 md:px-8">
                <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2.5">
                  <span className="num font-mono text-[11px] text-ink-faint">{l.n}</span>
                  <span className="hidden h-2.5 w-2.5 rounded-full bg-line group-hover:bg-ink-faint md:block" aria-hidden />
                </div>

                <span
                  className={`relative flex h-[52px] w-[52px] items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-translate-y-0.5 ${TONES[l.tone] ?? TONES.light}`}
                >
                  <l.Icon size={22} strokeWidth={1.75} aria-hidden />
                  <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/15" aria-hidden />
                </span>

                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-[22px] tracking-[-0.015em]">{l.name}</h3>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.11em] text-ember-deep">{l.role}</span>
                  </div>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{l.desc}</p>
                </div>

                <div className="flex flex-wrap gap-2 md:max-w-[236px] md:justify-end">
                  {l.chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-line bg-paper-2/70 px-3.5 py-1.5 font-mono text-[11px] text-ink-soft transition-colors group-hover:border-ink/15"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
