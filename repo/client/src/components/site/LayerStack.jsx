import { HardDrives, Robot, Stack } from '@phosphor-icons/react'

const layers = [
  {
    n: '03',
    label: 'Layer 3',
    name: 'AI Agents',
    role: 'What your teams touch',
    desc: 'Document, voice, vision, and governance agents, wired into the tools you already run, from SAP to Salesforce to plain email.',
    chips: ['Document', 'Voice', 'Vision', 'Governance'],
    Icon: Robot,
    tone: 'dark',
  },
  {
    n: '02',
    label: 'Layer 2',
    name: 'KOGO OS',
    role: 'The agentic AI layer',
    desc: 'LLMOps, swarm orchestration, agent registry, and memory, running on your hardware, never on ours.',
    chips: ['LLMOps', 'Swarm', 'Registry', 'Memory'],
    Icon: Stack,
    tone: 'ember',
  },
  {
    n: '01',
    label: 'Layer 1',
    name: 'Your estate',
    role: 'Where it runs',
    desc: 'CommandCore™ appliance, private cloud, or your own on-premises estate. The connection targets stay yours.',
    chips: ['Public cloud', 'Private cloud', 'CommandCore™'],
    Icon: HardDrives,
    tone: 'light',
  },
]

const tools = [
  { file: 'sap.svg', bg: '#0a6ed1' },
  { file: 'salesforce.svg', bg: '#00a1e0' },
  { file: 'gmail.svg', bg: '#ea4335' },
  { file: 'hubspot.svg', bg: '#ff7a59' },
  { file: 'google.svg', bg: '#4285f4' },
]

const toneTile = {
  dark: 'bg-gradient-to-br from-ink to-black text-white shadow-[0_18px_34px_-18px_rgba(23,23,26,0.8)]',
  ember: 'bg-gradient-to-br from-ember to-ember-deep text-white shadow-[0_18px_36px_-14px_rgba(255,99,1,0.9)]',
  light: 'border border-line bg-gradient-to-br from-paper to-paper-2 text-ink',
}

/** The platform as three stacked layers, sheets with depth, top to bottom. */
export function LayerStack({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      {/* Ambient glow behind the stack */}
      <div
        className="pointer-events-none absolute -inset-x-8 -top-10 h-52 rounded-[48px] bg-[radial-gradient(55%_100%_at_50%_0%,rgba(255,99,1,0.12),transparent_72%)]"
        aria-hidden
      />

      <div className="relative space-y-6">
        {layers.map((l, i) => (
          <div key={l.name} className="group relative">
            {/* Sheet peeking above each card, the stacked-paper cue */}
            <span
              className="pointer-events-none absolute -top-2 left-5 right-5 h-4 rounded-t-2xl border border-b-0 border-line bg-paper-2/80"
              aria-hidden
            />
            {/* Ember underglow for the engine layer */}
            {l.tone === 'ember' && (
              <span
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-70"
                style={{ background: 'linear-gradient(120deg, rgba(255,99,1,0.16), transparent 55%)' }}
                aria-hidden
              />
            )}

            <div
              className={`relative grid gap-5 overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-[0_24px_60px_-38px_rgba(11,11,13,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_30px_70px_-34px_rgba(11,11,13,0.5)] md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8 md:p-8 ${
                l.tone === 'ember' ? 'ring-1 ring-ember/25' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <span className="num font-mono text-[11px] text-ink-faint">{l.n}</span>
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${toneTile[l.tone]}`}>
                    <l.Icon size={26} weight="duotone" />
                  </span>
                </div>
              </div>

              <div className="max-w-2xl">
                <span className="eyebrow text-ink-faint">{l.label}</span>
                <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-[24px] tracking-[-0.015em]">{l.name}</h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ember-deep">{l.role}</span>
                </div>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">{l.desc}</p>

                {i === 0 && (
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {tools.map((t) => (
                      <span
                        key={t.file}
                        className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 hover:-translate-y-0.5"
                        style={{ background: t.bg, boxShadow: '0 12px 20px -12px rgba(11,11,13,0.55)' }}
                      >
                        <img src={`/images/logos/apps/${t.file}`} alt="" style={{ height: 18, width: 18 }} />
                      </span>
                    ))}
                    <span className="rounded-xl border border-dashed border-line px-3 py-2 font-mono text-[11px] text-ink-faint">
                      +80 agents
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 md:max-w-[240px] md:justify-end">
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
          </div>
        ))}
      </div>
    </div>
  )
}
