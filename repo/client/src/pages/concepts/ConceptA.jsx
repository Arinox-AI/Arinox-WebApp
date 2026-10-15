import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Switcher, FadeIn } from './shared'
import { deploymentSteps, kogo, businessApps } from '../../data/commandcore'
import { anchorDeployment, anonymisedStudies } from '../../data/caseStudies'
import { company } from '../../data/site'

const NAV = [
  ['The Machine', '#machine'],
  ['KOGO OS', '#kogo'],
  ['Deployments', '#deployments'],
  ['Method', '#method'],
]

const DUOTONE = 'grayscale contrast-[1.06] brightness-[0.72]'

function CornerTicks() {
  const t = 'absolute h-2.5 w-2.5 border-white/50'
  return (
    <span aria-hidden>
      <span className={`${t} left-0 top-0 border-l border-t`} />
      <span className={`${t} right-0 top-0 border-r border-t`} />
      <span className={`${t} bottom-0 left-0 border-b border-l`} />
      <span className={`${t} bottom-0 right-0 border-b border-r`} />
    </span>
  )
}

const MACHINE_TILES = [
  { src: '/images/commandcore/commandcore-xl2.webp', name: 'COMMANDCORE XL', spec: '2× RTX PRO 6000 Blackwell · 192 GB ECC · datacenter', span: 'md:col-span-2 md:row-span-2', contain: true },
  { src: '/images/commandcore/commandcore-m1.webp', name: 'COMMANDCORE M', spec: 'Grace Blackwell GB10 · desktop agents', span: '', contain: true },
  { src: '/images/commandcore/commandcore-s1.webp', name: 'COMMANDCORE S', spec: 'Jetson AGX Orin · edge · rugged', span: '', contain: true },
  { src: '/images/events/indian-government.jpeg', name: 'NATIONAL DATA CENTRE', spec: 'Verified sovereign deployment', span: 'md:col-span-2', duotone: true },
  { src: '/images/events/ai-summit.jpg', name: 'FIELD PRESENCE', spec: 'Defence & enterprise ecosystem', span: '', duotone: true },
]

function MachineTile({ tile }) {
  return (
    <a
      href="#kogo"
      className={`group relative overflow-hidden border border-white/10 bg-[#0e0e0f] ${tile.span} block`}
    >
      <img
        src={tile.src}
        alt={tile.name}
        className={`h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03] ${tile.duotone ? DUOTONE : 'object-contain p-8'}`}
      />
      {tile.duotone && <span className="absolute inset-0 bg-ember/25 mix-blend-multiply" aria-hidden />}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 to-transparent" aria-hidden />
      <div className="absolute inset-0 p-5">
        <CornerTicks />
      </div>
      <div className="absolute bottom-0 left-0 p-5">
        <p className="font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-white">{tile.name}</p>
        <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">{tile.spec}</p>
      </div>
    </a>
  )
}

export default function ConceptA() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F2EFEA] antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&display=swap');
        .grotesk { font-family: 'Archivo', 'Inter Tight', sans-serif; }
        .caps-display { font-stretch: 92%; letter-spacing: -0.01em; }
        @keyframes tickerX { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .ticker-track { animation: tickerX 40s linear infinite }
      `}</style>

      <header className="border-b border-white/10 bg-[#0A0A0B]/95 backdrop-blur">
        <div className="mx-auto flex h-[64px] max-w-7xl items-center justify-between px-7">
          <div className="flex items-center gap-4">
            <img src="/images/brand/logo-white.png" alt="Arinox" className="h-[20px] w-auto" />
            <span className="hidden font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/35 lg:inline">
              AI transformation company · est. Bengaluru
            </span>
          </div>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map(([label, href]) => (
              <a key={label} href={href} className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-ember/70 px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ember transition-colors hover:bg-ember hover:text-white"
            >
              Request briefing
            </Link>
          </div>
        </div>
      </header>

      <section className="relative flex min-h-[88vh] flex-col overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img src="/images/events/sovereign-launch.jpeg" alt="" className={`h-full w-full object-cover object-top ${DUOTONE}`} />
          <span className="absolute inset-0 bg-ember/20 mix-blend-multiply" />
          <span className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/70 via-[#0A0A0B]/30 to-[#0A0A0B]" />
          <span className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_100%,rgba(10,10,11,0.9),transparent_70%)]" />
        </div>

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-7 pb-16 pt-24">
          <FadeIn>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/55">
              Private AI · implemented end-to-end
            </p>
            <h1 className="grotesk caps-display mt-6 max-w-[16ch] text-[13.5vw] font-semibold uppercase leading-[0.94] text-white md:text-[108px]">
              Sovereign AI for the regulated world.
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-8 border-t border-white/15 pt-7">
              <div className="flex items-center gap-3">
                <img src="/images/brand/arinox-a-orange.png" alt="" className="h-9 w-auto" />
                <p className="font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.2em] text-white/60">
                  100% AI<br />0% Internet
                </p>
              </div>
              <p className="max-w-md text-[15.5px] leading-relaxed text-white/60">
                CommandCore, the sovereign AI appliance, and KOGO OS, the agentic layer —
                deployed inside your perimeter, governed under your law.
              </p>
              <div className="flex items-center gap-8">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/60">
                  DPIIT recognised<br />Startup India
                </p>
                <Link
                  to="/contact"
                  className="grotesk inline-flex items-center gap-3 text-[15px] font-medium uppercase tracking-[0.06em] text-white transition-colors hover:text-ember"
                >
                  <span className="inline-block h-px w-10 bg-white/40 transition-colors group-hover:bg-ember" aria-hidden />
                  Start →
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-7 py-5">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4ade80]" aria-hidden />
            <div className="overflow-hidden">
              <div className="ticker-track flex w-max items-center gap-10">
                {[0, 1].map((copy) => (
                  <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-10">
                    {[
                      'Sovereign deployment verified — National Data Centre',
                      'BPO OS live at PSU banks — 426 agents, 15 languages',
                      'Hitachi Systems India — delivery partnership formalised',
                      'CommandCore XL — datacenter-grade, fully air-gapped',
                    ].map((t) => (
                      <span key={t} className="whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">{t}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="machine" className="mx-auto max-w-7xl px-7 py-20 md:py-28">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="grotesk caps-display text-[30px] font-semibold uppercase leading-[1.02] text-white md:text-[44px]">
              The machine, in three form factors.
            </h2>
            <p className="max-w-sm text-[14.5px] leading-relaxed text-white/50">
              A self-contained AI micro-datacenter: compute, open-weight models, agentic
              intelligence and governance. Plug-and-play, edge to datacenter.
            </p>
          </div>
        </FadeIn>
        <div className="mt-10 grid auto-rows-[240px] grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[250px]">
          {MACHINE_TILES.map((tile) => (
            <FadeIn key={tile.name} className={tile.span}>
              <MachineTile tile={tile} />
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="kogo" className="border-t border-white/10 bg-[#0d0d0e]">
        <div className="mx-auto max-w-7xl px-7 py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <FadeIn>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">KOGO OS · the agentic layer</p>
              <h2 className="grotesk caps-display mt-5 text-[30px] font-semibold uppercase leading-[1.03] text-white md:text-[40px]">
                Infrastructure becomes work.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-white/55">{kogo.desc}</p>
              <div className="mt-8 space-y-2.5">
                {kogo.security.slice(0, 4).map((s) => (
                  <p key={s} className="flex items-start gap-3 border-b border-white/8 pb-2.5 font-mono text-[11.5px] uppercase tracking-[0.08em] text-white/55">
                    <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-ember" aria-hidden />{s}
                  </p>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="rounded-sm border border-white/12 bg-[#101011]">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">agent mesh — operations feed</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#4ade80]">live</span>
                </div>
                <div className="grid gap-x-8 p-5 sm:grid-cols-2">
                  {businessApps.slice(0, 8).map((a) => (
                    <p key={a.name} className="flex items-baseline gap-3 border-b border-white/6 py-2.5">
                      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ember">{a.name.toLowerCase()}</span>
                      <span className="text-[12.5px] leading-relaxed text-white/45">{a.desc}</span>
                    </p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 px-5 py-3.5">
                  {kogo.badges.map((b) => (
                    <span key={b} className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">{b}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="deployments" className="mx-auto max-w-7xl px-7 py-20 md:py-28">
        <FadeIn>
          <div className="rule-head" style={{ borderBottom: '1px solid rgba(255,255,255,0.14)' }}>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/40">Deployments</span>
            <span className="line" style={{ background: 'rgba(255,255,255,0.14)' }} />
          </div>
          <h2 className="grotesk caps-display mt-10 max-w-3xl text-[32px] font-semibold uppercase leading-[1.03] text-white md:text-[46px]">
            {anchorDeployment.headline}
          </h2>
        </FadeIn>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <FadeIn>
            {anchorDeployment.body.map((p) => (
              <p key={p.slice(0, 20)} className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/55 first:mt-0">{p}</p>
            ))}
            <p className="mt-8 border-l border-ember pl-5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-white/45">
              {anchorDeployment.client} · {anchorDeployment.label}<br />
              {anchorDeployment.metricSlot.label} — {anchorDeployment.metricSlot.note}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid gap-3">
              {anonymisedStudies.map((s) => (
                <div key={s.title} className="border border-white/10 bg-[#101011] p-5">
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ember">{s.domain}</p>
                  <p className="mt-2 text-[14.5px] font-medium text-white/85">{s.title}</p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/45">{s.outcome}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="method" className="border-t border-white/10 bg-[#0d0d0e]">
        <div className="mx-auto max-w-7xl px-7 py-20 md:py-28">
          <FadeIn>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">Method</p>
            <h2 className="grotesk caps-display mt-5 max-w-2xl text-[30px] font-semibold uppercase leading-[1.03] text-white md:text-[42px]">
              Four moves. The whole journey.
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-4">
            {deploymentSteps.map((d, i) => (
              <FadeIn key={d.step} delay={i * 0.06}>
                <div className="border-t border-white/15 pt-5">
                  <p className="grotesk text-[15px] font-semibold uppercase tracking-[0.1em] text-ember">{d.step} — {d.title}</p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-white/50">{d.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-7 py-16">
          <FadeIn>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">Trusted by leaders</p>
            <div className="mt-7 grid grid-cols-3 items-center justify-items-center gap-x-8 gap-y-10 opacity-70 md:grid-cols-6">
              {[
                ['/images/logos/ibm.svg', 'IBM', 92],
                ['/images/logos/hpe.svg', 'HPE', 86],
                ['/images/logos/hitachi.svg', 'Hitachi', 120],
                ['/images/logos/hcltech.svg', 'HCL Tech', 120],
                ['/images/logos/NVIDIA_logo.svg', 'NVIDIA', 76],
                ['/images/logos/indian-army.png', 'Indian Army', 46],
              ].map(([src, alt, w]) => (
                <img key={alt} src={src} alt={alt} style={{ width: w }} className="w-auto object-contain brightness-[1.6] grayscale opacity-80 transition-opacity hover:opacity-100" />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10">
        <div className="mx-auto max-w-7xl px-7 py-24 text-center md:py-32">
          <FadeIn>
            <h2 className="grotesk caps-display mx-auto max-w-[18ch] text-[40px] font-semibold uppercase leading-[0.98] text-white md:text-[64px]">
              Start with one workflow.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[15.5px] leading-relaxed text-white/55">
              A free working session. We map the first workflow worth transforming — the roadmap is yours either way.
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 border border-ember/70 bg-ember/10 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-ember transition-colors hover:bg-ember hover:text-white"
              >
                Book a discovery session <ArrowRight size={14} />
              </Link>
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">
              {company.tagline}
            </p>
          </FadeIn>
        </div>
      </section>

      <Switcher current="a" />
    </div>
  )
}
