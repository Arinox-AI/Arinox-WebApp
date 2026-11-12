import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Map, Rocket, Layers } from 'lucide-react'
import SEO from '../components/ui/SEO'
import { useBookCta, BOOK_CTA_TRANSITION } from '../components/site/BookCtaContext'
import { Button } from '../components/site/Button'
import { Section } from '../components/site/Section'
import { Label } from '../components/site/Layout'
import { CtaBand } from '../components/site/Shell'
import { PresenceGlobe } from '../components/site/PresenceGlobe'
import { StartHere } from '../components/site/StartHere'
import { LayerStack } from '../components/site/LayerStack'
import { Marquee } from '../components/site/Marquee'
import { SplitText } from '../components/site/motion/SplitText'
import { Magnet } from '../components/site/motion/Magnet'
import { powerUseCases, businessApps, kogoHome } from '../data/commandcore'

const moves = [
  {
    n: '01',
    Icon: Map,
    t: 'Map',
    d: 'One free working session. We find the workflows worth transforming first, by cost, risk, and payback speed. You keep the map either way.',
    tag: 'One session',
    image: '/images/method/map.svg',
  },
  {
    n: '02',
    Icon: Layers,
    t: 'Build',
    d: 'We assemble agents on a proven agentic operating system, documents, voice, vision, decisions, wired into the tools your teams already use.',
    tag: 'Built on KOGO OS',
    image: '/images/method/build.svg',
  },
  {
    n: '03',
    Icon: Rocket,
    t: 'Run',
    d: 'You choose where it lives: your cloud, your infrastructure, or a CommandCore appliance in your building. Governed end to end.',
    tag: 'Inside your perimeter',
    image: '/images/method/run.svg',
  },
]

const deploy = [
  {
    t: 'Your public cloud',
    d: 'Dedicated, isolated compute that slots into the estate you already run.',
    li: ['Deploys into your cloud', 'Isolated tenancy', 'Scales as adoption spreads'],
    image: '/images/deploy/public-cloud.svg',
  },
  {
    t: 'Your virtual private cloud',
    d: 'We host it for you in a private cloud that stays yours alone.',
    li: ['Hosted by us in a private VPC', 'Dedicated, not shared', 'No hardware to own or manage'],
    image: '/images/deploy/private-cloud.svg',
  },
  {
    t: 'CommandCore™',
    d: 'The machine itself, air-gapped, in your building, answering to nobody’s cloud.',
    li: ['Zero data egress', 'Full audit trails', 'Remote and tactical sites'],
    sovereign: true,
    image: '/images/deploy/commandcore.svg',
  },
]

const model = [
  {
    n: '01',
    k: 'What',
    image: '/images/partnership/what.svg',
    title: 'We solve with purpose',
    desc: 'We build AI that drives business transformation, from roadmap to rollout: strategy, systems, and scale.',
    tags: ['Strategy', 'Systems', 'Scale'],
  },
  {
    n: '02',
    k: 'Who',
    image: '/images/partnership/who.svg',
    title: 'Trusted by the regulated',
    desc: 'Enterprises, governments, defence, and global system integrators, environments where AI has to survive the security review.',
    tags: ['BFSI', 'Healthcare', 'Defence', 'Government'],
  },
  {
    n: '03',
    k: 'How',
    image: '/images/partnership/how.svg',
    title: 'An end-to-end ecosystem',
    desc: 'Data readiness, implementation, and adoption, managed end to end so strategy becomes measurable value.',
    tags: ['Data readiness', 'Implementation', 'Adoption'],
  },
]

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

const Home = () => {
  const heroRef = useRef(null)
  const ctaSlotRef = useRef(null)
  const { passed, setPassed, setHasHero } = useBookCta()

  useEffect(() => {
    setHasHero(true)
    return () => {
      setHasHero(false)
      setPassed(false)
    }
  }, [setHasHero, setPassed])

  useEffect(() => {
    const onScroll = () => {
      const el = ctaSlotRef.current
      if (!el) return
      setPassed(el.getBoundingClientRect().bottom < 76)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [setPassed])

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

      {/* Hero */}
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
            <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.16em] text-ink-soft">
              AI transformation, implemented end-to-end.
            </p>
            <p className="mx-auto mt-6 max-w-[560px] text-[17px] leading-relaxed text-ink-soft md:text-lg lg:mx-0">
              From agentic automation and voice AI to sovereign on-premises compute and real-time
              decision intelligence, Arinox delivers enterprise AI across every industry and domain, entirely within your environment.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
              <motion.div
                ref={ctaSlotRef}
                initial={false}
                animate={{
                  opacity: passed ? 0 : 1,
                  y: passed ? -18 : 0,
                  scale: passed ? 0.94 : 1,
                }}
                transition={BOOK_CTA_TRANSITION}
                style={{ pointerEvents: passed ? 'none' : 'auto' }}
                aria-hidden={passed}
              >
                <Button to="/contact" variant="ember">Book a discovery session</Button>
              </motion.div>
              <Magnet>
                <Button to="/case-studies" variant="ghost">Explore case studies</Button>
              </Magnet>
            </div>
            <p className="num mt-6 font-mono text-[11.5px] uppercase tracking-[0.08em] text-ink-faint">
              Free discovery session · the roadmap is yours · zero egress
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

      {/* The problem, dark statement, hairline rows */}
      <Section dark border={false}>
        <Label dark>The problem</Label>
        <h2 className="mt-5 max-w-3xl font-display text-[34px] leading-[1.08] tracking-[-0.02em] text-phos md:text-[52px]">
          Most AI never leaves the demo stage.
        </h2>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ghost">
          Three questions decide whether AI ships: where the data goes, who owns the model, and what
          happens at the security review. We answer all three before we build.
        </p>
        <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-3">
          {[
            ['The data can’t move', 'Regulated data can’t be shipped to a vendor’s cloud, so the pilot never survives compliance. We run the models where the data already lives.'],
            ['The pilot never ends', 'Six months of “evaluation” and nothing in production. We deploy in days and expand workflow by workflow, with results at each step.'],
            ['Nobody can audit it', 'A model that can’t explain its decisions will never pass review. Every agent decision is logged, every time.'],
          ].map(([t, d]) => (
            <div key={t} className="border-t border-white/20 pt-6">
              <h3 className="font-display text-[22px] leading-tight tracking-[-0.01em] text-phos">{t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ghost">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* The partnership */}
      <Section border>
        <Label>The partnership</Label>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <h2 className="max-w-2xl font-display text-[34px] leading-[1.08] tracking-[-0.02em] md:text-[46px]">
            One partner for the whole AI journey.
          </h2>
          <p className="max-w-xs text-[15px] leading-relaxed text-ink-soft">
            Accountable for the outcome, from the first working session to the workflows running in
            production.
          </p>
        </div>

        <p className="mt-10 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
          You focus on your business. We carry the technical weight, from setting up your VPC to
          keeping your{' '}
          <span className="border-b border-ember pb-0.5 text-ink">AI journey safe and compliant.</span>
        </p>

        <div className="mt-12 grid gap-x-12 gap-y-14 md:grid-cols-3">
          {model.map((m) => (
            <div key={m.k} className="group">
              <div className="flex items-center gap-3 border-t border-ink/80 pt-6">
                <span className="num font-mono text-[12px] text-ember-deep">{m.n}</span>
                <span className="eyebrow text-ink-faint">{m.k}</span>
                <span
                  className="ml-auto h-px w-8 bg-line transition-all duration-300 group-hover:w-14 group-hover:bg-ember"
                  aria-hidden
                />
              </div>

              <div className="mt-7 flex h-[136px] items-center">
                <img
                  src={m.image}
                  alt=""
                  loading="lazy"
                  className="max-h-full w-full object-contain object-left transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <h3 className="mt-6 font-display text-[27px] leading-tight tracking-[-0.01em]">{m.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{m.desc}</p>

              <p className="mt-6 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint">
                {m.tags.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* The method, big numerals, no tiles */}
      <Section border={false}>
        <Label>The method</Label>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-2xl font-display text-[34px] leading-[1.08] tracking-[-0.02em] md:text-[46px]">
            Three moves. That’s the whole method.
          </h2>
        </div>
        <div className="mt-12 grid gap-x-12 gap-y-12 md:grid-cols-3">
          {moves.map((m) => (
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
          {deploy.map((d) => (
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

      {/* Get started: the client intake lives on its own page (/get-started);
          the people section moved to /people */}
      <StartHere />

      <CtaBand
        title="Start with one workflow."
        offer={
          <>
            A free working session. We map the first workflow worth transforming, and{' '}
            <b className="font-medium text-white">you keep the roadmap either way.</b>
          </>
        }
      />
    </>
  )
}

export default Home
