import { useRef } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import { Button } from '../components/site/Button'
import { Section } from '../components/site/Section'
import { Label } from '../components/site/Layout'
import { CtaBand } from '../components/site/Shell'
import { PresenceGlobe } from '../components/site/PresenceGlobe'
import { LayerStack } from '../components/site/LayerStack'
import { Marquee } from '../components/site/Marquee'
import { CountUp, DrawRule } from '../components/site/CountUp'
import { SplitText } from '../components/site/motion/SplitText'
import { Magnet } from '../components/site/motion/Magnet'
import { startHere } from '../data/inquiries'
import { deployOptions, home } from '../data/site'
import { caseIndex } from '../data/caseStudies'
import { powerUseCases, businessApps, kogoHome } from '../data/commandcore'
/* Trusted-by strip. Same sizing rule as the Partners page: explicit w/h
   per logo (equal ~4,200px² footprint, max 150×44) so wide wordmarks don't
   dwarf square marks and vice versa. The flex row center-aligns everything,
   so all logos share one vertical axis. */
const trustedLogos = [
  { src: '/images/logos/ibm.svg', alt: 'IBM', w: 106, h: 40 },
  { src: '/images/logos/hpe.svg', alt: 'HPE', w: 100, h: 42 },
  { src: '/images/logos/hcltech.svg', alt: 'HCL Tech', w: 150, h: 27 },
  { src: '/images/logos/hitachi.svg', alt: 'Hitachi Systems', w: 150, h: 23 },
  { src: '/images/logos/Coforge.webp', alt: 'Coforge', w: 138, h: 30 },
  { src: '/images/logos/minera.svg', alt: 'Minera Steel and Power', w: 119, h: 35 },
  { src: '/images/logos/blackberrys.png', alt: 'Blackberrys', w: 150, h: 19 },
  { src: '/images/logos/lsdigital.png', alt: 'LS Digital', w: 52, h: 44 },
  { src: '/images/logos/hul.svg', alt: 'Hindustan Unilever', w: 112, h: 37 },
  { src: '/images/logos/centuryply.svg', alt: 'Century Ply', w: 97, h: 43 },
  { src: '/images/logos/innocean.png', alt: 'Innocean', w: 150, h: 22 },
  { src: '/images/logos/celkon.webp', alt: 'Celkon Mobile', w: 148, h: 29 },
  { src: '/images/logos/nikom.png', alt: 'Nikom', w: 124, h: 34 },
  { src: '/images/logos/langoor.png', alt: 'Langoor', w: 150, h: 15 },
  { src: '/images/logos/indian-army.png', alt: 'Indian Army', w: 58, h: 44 },
  { src: '/images/logos/sunmobility.png', alt: 'Sun Mobility', w: 113, h: 37 },
  { src: '/images/logos/kosmoderma.png', alt: 'Kosmoderma Clinics', w: 150, h: 27 },
  { src: '/images/logos/informage.png', alt: 'Informage', w: 133, h: 31 },
]

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
              <Button to="/contact" variant="ember">Book a call</Button>
              <Magnet>
                <Button to="/case-studies" variant="ghost">Explore case studies</Button>
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

      {/* Trust carousel — the track holds two IDENTICAL halves; keep them
          in sync or the -50% loop seam will jump */}
      <section className="border-t border-line py-12">
        <div className="mb-9 flex justify-center">
          <Label>Trusted by leaders</Label>
        </div>
        <div className="relative overflow-hidden">
          <Marquee duration={44}>
            <div className="flex items-center gap-16 pr-16">
              {trustedLogos.map((l) => (
                <img
                  key={l.alt}
                  src={l.src}
                  alt={l.alt}
                  loading="lazy"
                  style={{ width: l.w, height: l.h }}
                  className="shrink-0 object-contain opacity-55 transition-opacity duration-200 hover:opacity-90"
                />
              ))}
            </div>
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper to-transparent" />
        </div>
      </section>

      {/* The problem, dark statement: the objections buyers voice */}
      <Section dark border={false}>
        <Label dark>{home.problem.label}</Label>
        <h2 className="mt-5 max-w-3xl font-display text-[34px] leading-[1.08] tracking-[-0.02em] text-phos md:text-[52px]">
          {home.problem.title}
        </h2>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ghost">{home.problem.lead}</p>
        <p className="mt-12 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ghost">{home.problem.heard}</p>
        <div className="mt-5 grid gap-x-16 gap-y-10 md:grid-cols-3">
          {home.problem.rows.map((r) => (
            <div key={r.who} className="border-t border-white/20 pt-6">
              <p className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-phos">{r.who}</p>
              <p className="mt-4 font-display text-[24px] leading-[1.2] tracking-[-0.01em] text-phos">
                {'“'}{r.objection}{'”'}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ghost">{r.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Customers: deployed, not demoed */}
      <Section border={false}>
        <Label>{home.proof.label}</Label>
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
              <div className="mb-6 flex h-[120px] items-center">
                <img src={c.image} alt="" loading="lazy" className="max-h-full w-auto max-w-full object-contain object-left" />
              </div>
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
          <Button to="/case-studies" variant="ghost" size="sm">{home.proof.button}</Button>
        </div>
      </Section>

      {/* The method, big numerals, no tiles */}
      <Section border>
        <Label>{home.method.label}</Label>
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
              <div className="mt-7 flex h-[136px] items-center">
                <img src={m.image} alt="" loading="lazy" className="max-h-full w-full object-contain object-left" />
              </div>
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
      <Section border>
        <Label>{kogoHome.label}</Label>
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
          <p className="mt-3 flex flex-wrap font-display text-[22px] leading-snug tracking-[-0.01em] md:text-[26px]">
            {businessApps.map((a, i) => (
              <span key={a.name} className="whitespace-nowrap">
                {i > 0 && <span className="px-2.5 text-ember" aria-hidden>·</span>}
                {a.name}
              </span>
            ))}
          </p>
        </div>
        <div className="mt-10">
          <Button to={kogoHome.link.to} variant="dark">{kogoHome.link.label}</Button>
        </div>
      </Section>

      {/* Deployment: where it runs (light, so the illustrations read) */}
      <Section border>
        <Label>Deployment</Label>
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
              <div className="flex h-[136px] items-center">
                <img src={d.image} alt="" loading="lazy" className="max-h-full w-full object-contain object-left" />
              </div>
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
      <Section border>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label>Sectors</Label>
            <h2 className="mt-5 max-w-2xl font-display text-[32px] leading-[1.08] tracking-[-0.02em] md:text-[42px]">
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
              <div className="flex h-[136px] items-center">
                <img src={s.image} alt="" loading="lazy" className="max-h-full w-full object-contain object-left" />
              </div>
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
          <Button to="/case-studies" variant="ghost" size="sm">See the deployments</Button>
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
