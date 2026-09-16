import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapTrifold, RocketLaunch, StackSimple, Target, ShieldCheck, Stack } from '@phosphor-icons/react'
import SEO from '../components/ui/SEO'
import { useBookCta, BOOK_CTA_TRANSITION } from '../components/site/BookCtaContext'
import { Button } from '../components/site/Button'
import { Section } from '../components/site/Section'
import { Label } from '../components/site/Layout'
import { CtaBand } from '../components/site/Shell'
import { AsciiGlobe } from '../components/site/AsciiGlobe'
import { ComplianceStrip } from '../components/site/ComplianceStrip'
import { LayerStack } from '../components/site/LayerStack'
import { team, advisors } from '../data/site'
import { samplePosts } from './Blog'

const moves = [
  {
    n: '01',
    Icon: MapTrifold,
    t: 'Map',
    d: 'One free working session. We find the workflows worth transforming first, by cost, risk, and payback speed. You keep the map either way.',
    tag: 'One session',
  },
  {
    n: '02',
    Icon: StackSimple,
    t: 'Build',
    d: 'We assemble agents on a proven agentic operating system, documents, voice, vision, decisions, wired into the tools your teams already use.',
    tag: 'Built on KOGO OS',
  },
  {
    n: '03',
    Icon: RocketLaunch,
    t: 'Run',
    d: 'You choose where it lives: your cloud, your infrastructure, or a CommandCore appliance in your building. Governed end to end.',
    tag: 'Inside your perimeter',
  },
]

const deploy = [
  {
    t: 'Your public cloud',
    d: 'Dedicated, isolated compute that slots into the estate you already run.',
    li: ['Deploys into your cloud', 'Isolated tenancy', 'Scales as adoption spreads'],
  },
  {
    t: 'Your private infrastructure',
    d: 'On your metal, your network, your terms. Existing investments, new capability.',
    li: ['Runs on your private estate', 'BFSI and healthcare floors', 'Compliance as architecture'],
  },
  {
    t: 'CommandCore™',
    d: 'The machine itself, air-gapped, in your building, answering to nobody’s cloud.',
    li: ['Zero data egress', 'Full audit trails', 'Remote and tactical sites'],
    sovereign: true,
  },
]

const model = [
  {
    n: '01',
    k: 'What',
    Icon: Target,
    title: 'We solve with purpose',
    desc: 'We build AI that drives business transformation, from roadmap to rollout: strategy, systems, and scale.',
    tags: ['Strategy', 'Systems', 'Scale'],
  },
  {
    n: '02',
    k: 'Who',
    Icon: ShieldCheck,
    title: 'Trusted by the regulated',
    desc: 'Enterprises, governments, defence, and global system integrators, environments where AI has to survive the security review.',
    tags: ['BFSI', 'Healthcare', 'Defence', 'Government'],
  },
  {
    n: '03',
    k: 'How',
    Icon: Stack,
    title: 'An end-to-end ecosystem',
    desc: 'Data readiness, implementation, and adoption, managed end to end so strategy becomes measurable value.',
    tags: ['Data readiness', 'Implementation', 'Adoption'],
  },
]

const marquee = [
  'Any cloud, your estate',
  'Air-gapped option',
  'RBAC by default',
  'Full audit trails',
  'Scales with demand',
  'Zero data egress',
  'BFSI · Healthcare · Defence',
]

const trustedLogos = [
  { src: '/images/logos/ibm.svg', alt: 'IBM', h: 'h-9' },
  { src: '/images/logos/hpe.svg', alt: 'HPE', h: 'h-8' },
  { src: '/images/logos/hcltech.svg', alt: 'HCL Tech', h: 'h-7' },
  { src: '/images/logos/hitachi.svg', alt: 'Hitachi Systems', h: 'h-7' },
  { src: '/images/logos/Coforge.webp', alt: 'Coforge', h: 'h-8' },
  { src: '/images/logos/minera.svg', alt: 'Minera Steel and Power', h: 'h-8' },
  { src: '/images/logos/blackberrys.png', alt: 'Blackberrys', h: 'h-6' },
  { src: '/images/logos/lsdigital.png', alt: 'LS Digital', h: 'h-14' },
  { src: '/images/logos/hul.svg', alt: 'Hindustan Unilever', h: 'h-9' },
  { src: '/images/logos/centuryply.svg', alt: 'Century Ply', h: 'h-10' },
  { src: '/images/logos/innocean.png', alt: 'Innocean', h: 'h-7' },
  { src: '/images/logos/celkon.webp', alt: 'Celkon Mobile', h: 'h-7' },
  { src: '/images/logos/nikom.png', alt: 'Nikom', h: 'h-7' },
  { src: '/images/logos/langoor.png', alt: 'Langoor', h: 'h-12' },
  { src: '/images/logos/indian-army.png', alt: 'Indian Army', h: 'h-12' },
  { src: '/images/logos/sunmobility.png', alt: 'Sun Mobility', h: 'h-7' },
  { src: '/images/logos/kosmoderma.png', alt: 'Kosmoderma Clinics', h: 'h-7' },
]

function PersonGroup({ label, people }) {
  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <span className="eyebrow text-ember-deep">{label}</span>
        <span className="h-px flex-1 bg-line" aria-hidden />
      </div>
      <div className="grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((p) => (
          <div key={p.name} className="group overflow-hidden card-light">
            <div className="aspect-[4/4.2] overflow-hidden bg-paper-2">
              <img
                src={p.photo}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="p-5">
              <p className="font-display text-[18px] leading-tight tracking-[-0.01em]">{p.name}</p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ember-deep">{p.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

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

  const [featured, ...more] = samplePosts

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

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
          <div className="text-center lg:text-left">
            <Label className="justify-center lg:justify-start">AI transformation company</Label>
            <h1 className="mt-5 font-display text-[44px] leading-[1.02] font-normal tracking-[-0.02em] md:text-[64px] lg:text-[68px]">
              We transform how your
              <br />
              enterprise <span className="italic text-ember">works.</span>
            </h1>
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
              <Button to="/case-studies" variant="ghost">Explore case studies</Button>
            </div>
            <p className="num mt-6 font-mono text-[11.5px] uppercase tracking-[0.08em] text-ink-faint">
              Free discovery session · you keep the map · zero egress
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[540px]">
            <div className="relative aspect-square w-full">
              <AsciiGlobe fontSize={13} speed={4} tilt={20} scale={0.98} landOpacity={0.66} oceanOpacity={0.5} />
            </div>
          </div>
        </div>
      </section>

      {/* Trust carousel */}
      <section className="border-t border-line py-12">
        <div className="mb-9 flex justify-center">
          <Label>Trusted by leaders</Label>
        </div>
        <div className="group relative overflow-hidden">
          <div className="marquee-track flex w-max items-center">
            {[...trustedLogos, ...trustedLogos].map((l, i) => (
              <img
                key={`${l.alt}-${i}`}
                src={l.src}
                alt={l.alt}
                loading="lazy"
                aria-hidden={i >= trustedLogos.length}
                className={`mr-20 w-auto shrink-0 object-contain opacity-55 transition-opacity duration-200 hover:opacity-90 ${l.h}`}
              />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper to-transparent" />
        </div>
      </section>

      {/* Our model */}
      <Section border>
        <Label>Our model</Label>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <h2 className="max-w-2xl font-display text-[34px] leading-[1.08] tracking-[-0.02em] md:text-[46px]">
            One partner for the whole AI journey.
          </h2>
          <p className="max-w-xs text-[15px] leading-relaxed text-ink-soft">
            Assessment, architecture, deployment, and operations, held together by one accountable
            team.
          </p>
        </div>

        <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-3">
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

              <div className="mt-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-ember/10 text-ember-deep">
                <m.Icon size={28} weight="duotone" />
              </div>

              <h3 className="mt-6 font-display text-[27px] leading-tight tracking-[-0.01em]">{m.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{m.desc}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {m.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

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
        <div className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-3">
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

      {/* The method, big numerals, no tiles */}
      <Section border={false}>
        <Label>The method</Label>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-2xl font-display text-[34px] leading-[1.08] tracking-[-0.02em] md:text-[46px]">
            Three moves. That’s the whole method.
          </h2>
        </div>
        <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-3">
          {moves.map((m) => (
            <div key={m.n} className="border-t border-ink/80 pt-7">
              <p className="num font-display text-[48px] leading-none tracking-[-0.03em] text-ink">{m.n}</p>
              <h3 className="mt-6 font-display text-[24px] tracking-[-0.01em]">{m.t}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">{m.d}</p>
              <p className="mt-6 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint">{m.tag}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Marquee */}
      <section className="overflow-hidden border-y border-line bg-paper-2 py-5" aria-hidden>
        <div className="flex w-max animate-[marquee_36s_linear_infinite] gap-10">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="num whitespace-nowrap font-mono text-[13px] text-ink-soft">
              {m} <span className="ml-10 text-ember">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* The stack */}
      <Section border>
        <Label>The stack</Label>
        <h2 className="mt-5 max-w-2xl font-display text-[34px] leading-[1.08] tracking-[-0.02em] md:text-[46px]">
          The transformation stack, mapped.
        </h2>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">
          Agents that learn your context, an AI layer that runs on your hardware, and every existing
          system stays in its home. No rip-and-replace.
        </p>
        <div className="mt-12">
          <LayerStack />
        </div>
      </Section>

      {/* The fork, vertical rules, no cards */}
      <Section dark border={false}>
        <Label dark>Deployment</Label>
        <h2 className="mt-5 max-w-2xl font-display text-[34px] leading-[1.08] tracking-[-0.02em] text-phos md:text-[46px]">
          Where it runs is your call.
        </h2>
        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-3">
          {deploy.map((d) => (
            <div key={d.t} className="border-t border-white/20 pt-7">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-[22px] tracking-[-0.01em] text-phos">{d.t}</h3>
                {d.sovereign && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ember">Max sovereignty</span>
                )}
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-ghost">{d.d}</p>
              <ul className="mt-6">
                {d.li.map((l) => (
                  <li key={l} className="border-b border-white/10 py-2.5 text-sm text-ghost last:border-b-0">{l}</li>
                ))}
              </ul>
              {d.sovereign && (
                <Button to="/commandcore" variant="ghostDark" size="sm" className="mt-7">See the machine</Button>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Compliance, quiet, two groups */}
      <Section border>
        <Label>Compliance</Label>
        <div className="mt-6 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <h2 className="max-w-md font-display text-[28px] leading-tight tracking-[-0.01em] md:text-[38px]">
              Certified to run inside the wire.
            </h2>
            <p className="mt-4 max-w-sm text-[15.5px] leading-relaxed text-ink-soft">
              Both the machine and the platform are built for regulated environments.
            </p>
          </div>
          <ComplianceStrip className="self-center" />
        </div>
      </Section>

      {/* People */}
      <Section border>
        <Label>People</Label>
        <h2 className="mt-5 max-w-2xl font-display text-[32px] leading-[1.08] tracking-[-0.02em] md:text-[42px]">
          Operators, not evangelists.
        </h2>
        <div className="mt-12 space-y-16">
          <PersonGroup label="Leadership" people={team} />
          <PersonGroup label="Advisors" people={advisors} />
        </div>
      </Section>

      {/* Insights, one feature + compact list */}
      <Section border>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label>Insights</Label>
            <h2 className="mt-5 font-display text-[32px] leading-[1.08] tracking-[-0.02em] md:text-[42px]">Field notes.</h2>
          </div>
          <Button to="/blog" variant="ghost" size="sm">All insights</Button>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Link to={`/blog/${featured.slug}`} className="group block">
            <div className="img-frame aspect-[16/10] overflow-hidden rounded-2xl border border-line">
              <img
                src={featured.image}
                alt={featured.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-ember-deep">{featured.category}</p>
            <h3 className="mt-2 font-display text-[24px] leading-snug tracking-[-0.01em] group-hover:text-ember-deep transition-colors">
              {featured.title}
            </h3>
            <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-ink-soft line-clamp-2">{featured.excerpt}</p>
          </Link>

          <div className="border-t border-line">
            {more.slice(0, 4).map((p) => (
              <Link key={p._id} to={`/blog/${p.slug}`} className="group flex flex-col gap-2 border-b border-line py-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">{p.category} · {p.readTime} min</span>
                <span className="font-display text-[18px] leading-snug tracking-[-0.01em] group-hover:text-ember-deep transition-colors">
                  {p.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        title="Deploy your first AI solution today."
        offer={
          <>
            See results in hours, not months. Free session:{' '}
            <b className="font-medium text-white">
              we map where intelligent AI fits your organisation's operations, strategy, and compliance needs.
            </b>
          </>
        }
      />
    </>
  )
}

export default Home
