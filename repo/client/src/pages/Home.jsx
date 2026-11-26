import { useRef } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import { Button, ArrowLink } from '../components/site/Button'
import { Section } from '../components/site/Section'
import { Label } from '../components/site/Layout'
import { CtaBand } from '../components/site/Shell'
import { PresenceGlobe } from '../components/site/PresenceGlobe'
import { LayerStack } from '../components/site/LayerStack'
import { TrustedStrip } from '../components/site/TrustedStrip'
import { CountUp, DrawRule } from '../components/site/CountUp'
import { SplitText } from '../components/site/motion/SplitText'
import { Magnet } from '../components/site/motion/Magnet'
import { startHere } from '../data/inquiries'
import { deployOptions, home } from '../data/site'
import { caseIndex } from '../data/caseStudies'
import { powerUseCases, businessApps, kogoHome } from '../data/commandcore'
import Illustration from '../components/site/Illustration';

/* Customers: slug + metric label come from home.proof; the figure is read from the case data */
const proofCases = home.proof.cases
  .map((p) => {
    const entry = caseIndex.find((e) => e.slug === p.slug)
    const m = entry?.useCase.metrics.find((x) => x.label === p.metric && x.basis === 'published')
    return entry && m ? { ...p, title: entry.useCase.title, sector: entry.sectorLabel, value: m.value } : null
  })
  .filter(Boolean)

const Home = () => {
  const heroRef = useRef(null)

  /* Pointer light in the hero (CSS vars read by .hero-light). */
  const onHeroMove = (e) => {
    const el = heroRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <>
      <SEO
        title="Arinox AI | AI Transformation, Implemented End-to-End"
        description="Arinox is an AI transformation company. We build, deploy, and run private AI, on our CommandCore appliance or in your own infrastructure, orchestrated by KOGO, with zero data egress. Built in India."
        canonical="https://www.arinox.ai/"
      />

      {/* Hero: headline left, presence globe right (restored 2026-11-13 on the user's call). */}
      <section
        ref={heroRef}
        onMouseMove={onHeroMove}
        className="relative isolate overflow-hidden px-7 pb-20 pt-16 md:pt-24"
        style={{ '--mx': '50%', '--my': '32%' }}
      >
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="hero-vignette absolute inset-0" />
          <div className="hero-light absolute inset-0" />
        </div>

        <div className="relative mx-auto grid max-w-[68.5rem] items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
          <div className="text-center lg:text-left">
            <Label className="justify-center lg:justify-start">AI transformation company</Label>
            <SplitText
              className="mt-5 font-display text-[44px] leading-[1.02] font-normal tracking-[-0.02em] md:text-[64px] lg:text-[68px]"
              words={[
                { t: 'We make your enterprise' },
                { t: 'AI native.', accent: 'italic text-ember' },
              ]}
            />
            <p className="mt-5 hidden font-mono text-[12px] uppercase tracking-[0.16em] text-ink-soft sm:block">
              AI transformation, implemented end-to-end.
            </p>
            <p className="mx-auto mt-6 max-w-[560px] text-[17px] leading-relaxed text-ink-soft md:text-lg lg:mx-0">
              From agentic automation and voice AI to sovereign on-premises compute and real-time
              decision intelligence, Arinox delivers enterprise AI across every industry and domain, entirely within your environment.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
              <Button to="/get-started?start=book" variant="ember">Book a call</Button>
              <Magnet>
                <ArrowLink to="/case-studies">Explore case studies</ArrowLink>
              </Magnet>
            </div>
            <p className="num mt-6 font-mono text-[11.5px] uppercase tracking-[0.08em] text-ink-faint">
              Free first call · the roadmap is yours · zero egress
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[540px]">
            <PresenceGlobe />
          </div>
        </div>
      </section>

      <TrustedStrip />

      {/* The problem, dark statement: the objections buyers voice */}
      <Section dark border={false} margin eyebrow={home.problem.label}>
        <h2 className="mt-5 font-display text-[34px] leading-[1.08] tracking-[-0.02em] text-phos md:text-[52px]">
          {home.problem.title}
        </h2>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ghost">{home.problem.lead}</p>
        <p className="mt-12 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ghost">{home.problem.heard}</p>
        <div className="mt-5" data-problem-rows>
          {home.problem.rows.map((r) => (
            <div
              key={r.who}
              className="relative grid gap-y-3 py-8 lg:grid-cols-[8.5rem_minmax(0,1.4fr)_minmax(0,1fr)] lg:items-baseline lg:gap-x-10 lg:py-10"
              data-problem-row
            >
              <DrawRule className="!bg-white/20" />
              <p className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-phos">{r.who}</p>
              <p className="font-display text-[28px] leading-[1.15] tracking-[-0.01em] text-paper/70 md:text-[34px] lg:text-[36px]">
                {'“'}{r.objection}{'”'}
              </p>
              <p className="text-[16px] leading-relaxed text-phos">
                <span className="mr-2 text-ember" aria-hidden="true">→</span>
                {r.answer}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Customers: deployed, not demoed */}
      <Section border={false} margin eyebrow={home.proof.label}>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <h2 className="max-w-2xl font-display text-[34px] leading-[1.08] tracking-[-0.02em] md:text-[46px]">
            {home.proof.title}
          </h2>
          <p className="max-w-xs text-[15px] leading-relaxed text-ink-soft">{home.proof.note}</p>
        </div>
        <div className="mt-12 grid gap-x-12 gap-y-12 md:grid-cols-3">
          {proofCases.map((c) => (
            <div key={c.slug} className="relative flex flex-col pt-6">
              <DrawRule />
              <Illustration src={c.image} className="mb-6" />
              <CountUp value={c.value} className="num block font-display text-[48px] leading-none tracking-[-0.03em] text-ink" />
              <p className="mt-3 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint">{c.metric}</p>
              <h3 className="mt-6 font-display text-[22px] leading-tight tracking-[-0.01em]">{c.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{c.line}</p>
              <Link
                to={`/case-studies/${c.slug}`}
                className="mt-auto self-start pt-5 border-b border-ink/40 pb-0.5 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink transition-colors hover:border-ember hover:text-ember-deep"
              >
                {home.proof.linkLabel} {'→'}
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <ArrowLink to="/case-studies">{home.proof.button}</ArrowLink>
        </div>
      </Section>

      {/* The method, big numerals, no tiles */}
      <Section border margin eyebrow={home.method.label}>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <h2 className="max-w-2xl font-display text-[34px] leading-[1.08] tracking-[-0.02em] md:text-[46px]">
            {home.method.title}
          </h2>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-soft">{home.method.note}</p>
        </div>
        <div className="mt-12 grid gap-x-12 gap-y-12 md:grid-cols-3">
          {home.method.steps.map((m) => (
            <div key={m.n} className="border-t border-ink/80 pt-7">
              <p className="num font-display text-[48px] leading-none tracking-[-0.03em] text-ink">{m.n}</p>
              <Illustration src={m.image} className="mt-7" />
              <h3 className="mt-6 font-display text-[24px] tracking-[-0.01em]">{m.t}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">{m.d}</p>
              <p className="mt-6 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint">{m.tag}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* The stack */}
      <Section border>
        <Label>The stack</Label>
        <h2 className="mt-5 max-w-2xl font-display text-[34px] leading-[1.08] tracking-[-0.02em] md:text-[46px]">
          The transformation stack, mapped.
        </h2>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">
          Agents that learn your context, an AI layer that runs on your hardware, and the business
          systems you would otherwise buy separately, built in. Every system you already run stays
          in its home. No rip-and-replace.
        </p>
        <div className="mt-10">
          <LayerStack />
        </div>
      </Section>

      {/* The agentic layer: the precise KOGO summary; full detail on /commandcore#kogo */}
      <Section border margin eyebrow={kogoHome.label}>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <h2 className="max-w-2xl font-display text-[34px] leading-[1.08] tracking-[-0.02em] md:text-[46px]">
            {kogoHome.title}
          </h2>
          <p className="max-w-sm text-[15.5px] leading-relaxed text-ink-soft">{kogoHome.lead}</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-12 gap-y-10 md:grid-cols-4">
          {kogoHome.stats.map((s) => (
            <div key={s.small} className="border-t border-ink/80 pt-6">
              <p className="num font-display text-[44px] leading-none tracking-[-0.03em] text-ink">{s.big}</p>
              <p className="mt-3 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint">{s.small}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-line pt-6">
          <p className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint">{kogoHome.appsLabel}</p>
          {/* A ruled grid, not an inline run: an inline list with "·" separators
              wraps unevenly in the margin layout's narrower column. */}
          <ul className="mt-4 grid grid-cols-2 gap-x-8 sm:grid-cols-3">
            {businessApps.map((a) => (
              <li
                key={a.name}
                className="border-t border-line py-3 font-display text-[20px] leading-snug tracking-[-0.01em] md:text-[24px]"
              >
                {a.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10">
          <ArrowLink to={kogoHome.link.to}>{kogoHome.link.label}</ArrowLink>
        </div>
      </Section>

      {/* Deployment: where it runs (light, so the illustrations read) */}
      <Section border margin eyebrow="Deployment">
        <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <h2 className="max-w-2xl font-display text-[34px] leading-[1.08] tracking-[-0.02em] md:text-[46px]">
            Where it runs is your call.
          </h2>
          <p className="max-w-sm text-[15.5px] leading-relaxed text-ink-soft">
            Whichever you choose, everything above it runs the same.
          </p>
        </div>
        <div className="mt-12 grid gap-x-12 gap-y-12 md:grid-cols-3">
          {deployOptions.map((d) => (
            <div key={d.t} className="border-t border-ink/80 pt-7">
              <Illustration src={d.image} />
              <div className="mt-6 flex items-center justify-between gap-4">
                <h3 className="font-display text-[22px] tracking-[-0.01em]">{d.t}</h3>
                {d.sovereign && (
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ember-deep">Max sovereignty</span>
                )}
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{d.d}</p>
              <ul className="mt-6">
                {d.li.map((l) => (
                  <li key={l} className="border-b border-line py-2.5 text-sm text-ink-soft last:border-b-0">{l}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Sectors */}
      <Section border margin eyebrow="Sectors">
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="max-w-2xl font-display text-[32px] leading-[1.08] tracking-[-0.02em] md:text-[42px]">
              Deployed where the constraints are hardest.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-soft">
            Government, BFSI, industry and security, environments where AI has to pass the security
            review, not just the demo.
          </p>
        </div>

        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {powerUseCases.map((s) => (
            <div key={s.sector} className="border-t border-ink/80 pt-7">
              <Illustration src={s.image} />
              <p className="eyebrow mt-5 text-ember-deep">{s.sector}</p>
              <ul className="mt-3 space-y-2">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-2.5 text-[14px] leading-relaxed text-ink-soft">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ember" aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <ArrowLink to="/case-studies">See the deployments</ArrowLink>
        </div>
      </Section>

      {/* Closing band: the intake and the booking, side by side */}
      <CtaBand
        title={
          <>
            {startHere.titleLead}{' '}
            <span className="italic text-ember">{startHere.titleAccent}</span>
          </>
        }
        offer={startHere.offer}
        primary={startHere.primary}
        secondary={startHere.secondary}
        facts={startHere.facts}
      />
    </>
  )
}

export default Home
