import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Switcher, FadeIn } from './shared'
import { whatItIs, kogo, deploymentSteps, powerUseCases, headlineClaims } from '../../data/commandcore'
import { anchorDeployment } from '../../data/caseStudies'
import { company } from '../../data/site'

const REDO = 'Repetition, grounded in the platform: what agents actually do.'
const LINES = [
  'Every document read.',
  'Every claim processed.',
  'Every ticket resolved.',
  'Every reconciliation posted.',
  'Every decision logged.',
]

const ANNOTATIONS = [
  { label: 'OPEN-WEIGHT MODELS', side: 'left', top: '18%' },
  { label: 'KOGO OS — AGENTIC LAYER', side: 'right', top: '34%' },
  { label: 'AI-READY DATA LAYER', side: 'left', top: '58%' },
  { label: 'AIR-GAPPED · ZERO EGRESS', side: 'right', top: '78%' },
]

const PIXELS = [
  { top: '12%', left: '6%', s: 10 },
  { top: '9%', left: '7.5%', s: 6 },
  { top: '26%', left: '92%', s: 12 },
  { top: '30%', left: '94.5%', s: 7 },
  { top: '74%', left: '3%', s: 14 },
  { top: '79%', left: '5%', s: 8 },
]

export default function ConceptB() {
  return (
    <div className="min-h-screen bg-[#F4F2EC] text-[#1B1917] antialiased">
      <style>{`
        .mono-display { font-family: 'IBM Plex Mono', ui-monospace, monospace; letter-spacing: -0.03em; }
        @keyframes tickerX { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .ticker-track { animation: tickerX 42s linear infinite }
      `}</style>

      <div className="border-b border-ink/15 bg-[#F4F2EC]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-7 py-2.5">
          <p className="mono-display overflow-hidden text-[11px] uppercase tracking-[0.06em] text-ink/70">
            <span className="ticker-track inline-block">
              {[0, 1].map((c) => (
                <span key={c} className="inline-block">
                  {` SOVEREIGN DEPLOYMENT VERIFIED — NATIONAL DATA CENTRE +++ BPO OS LIVE AT PSU BANKS, 426 AGENTS +++ DPIIT RECOGNISED · STARTUP INDIA +++ `.repeat(3)}
                </span>
              ))}
            </span>
          </p>
        </div>
      </div>

      <header className="border-b border-ink/15 bg-[#F4F2EC]/95 backdrop-blur">
        <div className="mx-auto flex h-[62px] max-w-7xl items-center justify-between px-7">
          <img src="/images/brand/logo-black.png" alt="Arinox" className="h-[19px] w-auto" />
          <nav className="mono-display hidden items-center gap-7 text-[11px] uppercase tracking-[0.1em] text-ink/60 md:flex">
            <a href="#machine" className="hover:text-ink">the machine</a>
            <a href="#kogo" className="hover:text-ink">kogo os</a>
            <a href="#proof" className="hover:text-ink">proof</a>
            <a href="#method" className="hover:text-ink">method</a>
          </nav>
          <Link to="/contact" className="mono-display inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[11px] uppercase tracking-[0.1em] text-[#F4F2EC] transition-colors hover:bg-black">
            Book a session <ArrowRight size={12} />
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        {PIXELS.map((p, i) => (
          <span
            key={i}
            className="absolute bg-ember/80"
            style={{ top: p.top, left: p.left, width: p.s, height: p.s }}
            aria-hidden
          />
        ))}
        <div className="mx-auto max-w-7xl px-7 pb-20 pt-16 md:pt-24">
          <FadeIn>
            <div className="mono-display flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-ink/50">
              <span className="inline-block h-2 w-2 bg-ember" aria-hidden />
              Private AI · implemented end-to-end · {company.recognition}
            </div>
            <h1 className="mono-display mt-8 max-w-[21ch] text-[34px] font-medium uppercase leading-[1.14] md:text-[54px]">
              <span className="text-ink/35">{LINES.map((l) => <span key={l} className="block">{l}</span>)}</span>
              <span className="mt-2 block text-ink">That&rsquo;s agency, deployed.</span>
            </h1>
            <p className="mono-display mt-4 max-w-[46ch] text-[15px] normal-case leading-relaxed text-ink/60">
              Demos create noise. Deployment creates value. Arinox builds agents that run the work
              you do by hand — on CommandCore, a sovereign AI appliance inside your own building.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/contact" className="mono-display inline-flex items-center gap-2 rounded-full bg-ember px-7 py-4 text-[12px] uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#D0500A]">
                Book a discovery session <ArrowRight size={13} />
              </Link>
              <a href="#machine" className="mono-display inline-flex items-center gap-2 rounded-full border border-ink/25 px-7 py-4 text-[12px] uppercase tracking-[0.1em] text-ink transition-colors hover:border-ink">
                inspect the machine
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-16 md:mt-20">
            <figure className="relative mx-auto max-w-4xl">
              <div className="relative rounded-lg border border-ink/20 bg-white px-10 py-12 shadow-[0_30px_60px_-40px_rgba(27,25,23,0.35)]">
                <img src="/images/commandcore/commandcore-xl2.webp" alt="CommandCore XL" className="mx-auto max-h-[360px] w-auto" />
                {ANNOTATIONS.map((a) => (
                  <div
                    key={a.label}
                    className={`absolute hidden items-center gap-2 md:flex ${a.side === 'left' ? 'left-0 -translate-x-full pr-0' : 'right-0 translate-x-full flex-row-reverse pl-0'}`}
                    style={{ top: a.top }}
                  >
                    <span className="mono-display whitespace-nowrap text-[9px] uppercase tracking-[0.16em] text-ink/60">{a.label}</span>
                    <span className={`block h-px w-14 border-t border-dashed border-ink/40 ${a.side === 'left' ? 'order-first' : ''}`} aria-hidden />
                    <span className="block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
                  </div>
                ))}
              </div>
              <figcaption className="mono-display mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-ink/45">
                <span>FIG. 01 — COMMANDCORE XL · {headlineClaims[0].big} {headlineClaims[0].small}</span>
                <span>SCALE 1:1 · {company.offices[0].city.toUpperCase()}</span>
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </section>

      <section className="border-y border-ink/15 bg-white">
        <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-10 px-7 py-16 md:grid-cols-3">
          {whatItIs.map((w, i) => (
            <FadeIn key={w.title} delay={i * 0.06}>
              <p className="mono-display text-[11px] uppercase tracking-[0.18em] text-ember">{String(i + 1).padStart(2, '0')} — {w.title}</p>
              <p className="mt-3.5 text-[14.5px] leading-relaxed text-ink/65">{w.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="kogo" className="mx-auto max-w-7xl px-7 py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <FadeIn>
            <p className="mono-display text-[11px] uppercase tracking-[0.18em] text-ink/50">{kogo.name} — {kogo.role}</p>
            <h2 className="mono-display mt-5 text-[28px] font-medium uppercase leading-[1.18] md:text-[38px]">
              The work runs itself.<br />Every step stays auditable.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink/60">{kogo.desc}</p>
            <div className="mono-display mt-7 flex flex-wrap gap-2">
              {kogo.badges.map((b) => (
                <span key={b} className="rounded-full border border-ink/20 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.1em] text-ink/60">{b}</span>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid gap-x-10 sm:grid-cols-2">
              {kogo.points.map((p) => (
                <p key={p} className="mono-display flex items-start gap-2.5 border-b border-ink/12 py-3 text-[11.5px] uppercase leading-relaxed tracking-[0.04em] text-ink/70">
                  <span className="mt-[5px] h-1 w-1 shrink-0 bg-ember" aria-hidden />{p}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="proof" className="border-y border-ink/15 bg-white">
        <div className="mx-auto max-w-7xl px-7 py-20 md:py-28">
          <FadeIn>
            <p className="mono-display text-[11px] uppercase tracking-[0.18em] text-ink/50">{anchorDeployment.label} — {anchorDeployment.client}</p>
            <h2 className="mono-display mt-5 max-w-3xl text-[28px] font-medium uppercase leading-[1.16] md:text-[40px]">
              {anchorDeployment.headline}
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-4">
            {[
              ['40%+', 'queries resolved by tier-1 agents', 'PSU banks'],
              ['~$1M', 'annual savings per BPO floor', 'published outcome'],
              ['15', 'languages, natively', 'voice + chat'],
              ['100%', 'QC coverage, automated', 'was 2% manual'],
            ].map(([v, l, n], i) => (
              <FadeIn key={l} delay={i * 0.06}>
                <div className="border-t-2 border-ink pt-5">
                  <p className="mono-display text-[40px] font-medium leading-none text-ink">{v}</p>
                  <p className="mono-display mt-3 text-[11px] uppercase leading-relaxed tracking-[0.08em] text-ink/55">{l}</p>
                  <p className="mono-display mt-1.5 text-[10px] uppercase tracking-[0.12em] text-ember">{n}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-7 py-20 md:py-24">
        <FadeIn>
          <p className="mono-display text-[11px] uppercase tracking-[0.18em] text-ink/50">sectors — hardest constraints first</p>
        </FadeIn>
        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {powerUseCases.map((s, i) => (
            <FadeIn key={s.sector} delay={i * 0.05}>
              <div className="flex items-center gap-3 border-b border-ink pb-3">
                <img src={s.image} alt="" className="h-8 w-8" />
                <p className="mono-display text-[12.5px] uppercase tracking-[0.08em]">{s.sector}</p>
              </div>
              <ul className="mt-3 space-y-1.5">
                {s.items.map((it) => (
                  <li key={it} className="mono-display text-[11px] uppercase leading-relaxed tracking-[0.04em] text-ink/55">{it}</li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="method" className="border-y border-ink/15 bg-[#1B1917] text-[#F4F2EC]">
        <div className="mx-auto max-w-7xl px-7 py-20 md:py-28">
          <FadeIn>
            <p className="mono-display text-[11px] uppercase tracking-[0.18em] text-ember-lite">method — four commands</p>
            <h2 className="mono-display mt-5 max-w-2xl text-[28px] font-medium uppercase leading-[1.16] md:text-[38px]">
              From assessment to an enterprise-wide AI practice.
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-4">
            {deploymentSteps.map((d, i) => (
              <FadeIn key={d.step} delay={i * 0.06}>
                <p className="mono-display text-[11px] uppercase tracking-[0.14em] text-ember-lite">{d.step}</p>
                <p className="mono-display mt-3 text-[15px] uppercase tracking-[0.02em] text-[#F4F2EC]">{d.title}</p>
                <p className="mt-2.5 text-[13px] leading-relaxed text-[#F4F2EC]/55">{d.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-7 py-24 text-center md:py-32">
        <FadeIn>
          <h2 className="mono-display mx-auto max-w-[24ch] text-[32px] font-medium uppercase leading-[1.12] md:text-[50px]">
            One free session.<br />
            <span className="text-ember">The roadmap is yours either way.</span>
          </h2>
          <div className="mt-10 flex justify-center">
            <Link to="/contact" className="mono-display inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-[12px] uppercase tracking-[0.1em] text-[#F4F2EC] transition-colors hover:bg-black">
              Book a discovery session <ArrowRight size={13} />
            </Link>
          </div>
          <p className="mono-display mt-8 text-[10px] uppercase tracking-[0.2em] text-ink/40">{company.tagline}</p>
        </FadeIn>
      </section>

      <Switcher current="b" />
    </div>
  )
}
