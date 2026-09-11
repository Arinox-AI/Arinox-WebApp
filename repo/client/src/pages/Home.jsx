import { Link } from 'react-router-dom';
import {
  ArrowRight, ShieldCheck, RefreshCw, Cpu, Network,
  Compass, Code2, Boxes, Landmark, Building2, Scale, Activity,
} from 'lucide-react';
import SEO from '../components/ui/SEO';
import Reveal from '../components/ui/Reveal';
import LogoWall from '../components/ui/LogoWall';
import { img } from '../data/images';
import { anchorDeployment, anonymisedStudies } from '../data/caseStudies';
import { team, values } from '../data/site';
import { deliveryPartners } from '../data/clients';
import { samplePosts } from './Blog';

/* ── Why Arinox — the company's own differentiators ─────── */
const why = [
  {
    Icon: ShieldCheck,
    title: 'Sovereign AI',
    desc: 'Your data stays yours. Deploy on private cloud or on-premises, with compliance built in — not bolted on.',
  },
  {
    Icon: RefreshCw,
    title: 'AI that adapts',
    desc: 'Enterprise-grade solutions that bend to your operations. Zero compromise on security.',
  },
  {
    Icon: Cpu,
    title: 'Agents that fit',
    desc: 'Seamless integration into your existing workflows. Real reasoning, real work — results from day one.',
  },
  {
    Icon: Network,
    title: 'Ecosystem strength',
    desc: 'A global partner network bringing best-in-class technology, infrastructure, and outcomes.',
  },
];

/* ── What we do ──────────────────────────────────────────── */
const services = [
  {
    index: '01',
    Icon: Compass,
    title: 'Strategy & roadmap',
    desc: 'We solve with purpose. From roadmap to rollout, we decode how your enterprise runs today and redesign how it should operate tomorrow — strategy, systems, and scale.',
  },
  {
    index: '02',
    Icon: Code2,
    title: 'Private AI implementation',
    desc: 'We build and deploy AI systems inside your environment — on your data, under your governance, air-gapped where it matters, with no public-cloud dependency.',
  },
  {
    index: '03',
    Icon: Boxes,
    title: 'Ecosystem & adoption',
    desc: 'From discovery to delivery, we design and manage your AI ecosystem end to end — data readiness, implementation, and adoption that turns strategy into measurable business value.',
  },
];

/* ── The journey ─────────────────────────────────────────── */
const phases = [
  { n: '01', title: 'Assess',    desc: 'Current systems, data reality, compliance constraints — and where AI creates measurable advantage.', out: 'Opportunity map, business case' },
  { n: '02', title: 'Architect', desc: 'Target architecture, deployment model, integrations, and the governance that goes with them.',        out: 'Blueprint, deployment plan' },
  { n: '03', title: 'Deploy',    desc: 'Systems installed inside your perimeter, connected to your workflows, tested with your teams.',        out: 'Production AI in your environment' },
  { n: '04', title: 'Run',       desc: 'Measured operations, continuous improvement, and a roadmap for the next set of workflows.',            out: 'A running AI capability' },
];

/* ── Architecture stack ──────────────────────────────────── */
const stack = [
  { layer: 'Your teams & workflows',   note: 'Where the value shows up' },
  { layer: 'AI agents',                note: 'Built for your operations, governed by your rules' },
  { layer: 'KOGO OS',                  note: 'The agentic layer — builder, mesh, memory, guardrails' },
  { layer: 'Models & knowledge',       note: 'Running locally, answers cited to source' },
  { layer: 'CommandCore',              note: 'Sovereign AI infrastructure — S, M, XL' },
  { layer: 'Your premises',            note: 'Your network. Your compliance boundary.' },
];

const industries = [
  { Icon: Landmark,  label: 'Banking & finance',       note: 'Capital markets & compliance AI',   photo: 'banking',    to: '/solutions#bfsi' },
  { Icon: ShieldCheck, label: 'Defence & army',        note: 'Sovereign military AI systems',     photo: 'defence',    to: '/solutions#defence' },
  { Icon: Building2, label: 'Government',              note: 'Public sector intelligence',        photo: 'government', to: '/solutions#government' },
  { Icon: Activity,  label: 'Healthcare',              note: 'Clinical AI & health compliance',   photo: 'healthcare', to: '/solutions#healthcare' },
  { Icon: Cpu,       label: 'Technology & industry',   note: 'Enterprise platforms & OT AI',      photo: 'technology', to: '/solutions#manufacturing' },
  { Icon: Scale,     label: 'Legal & professional',    note: 'AI-assisted legal intelligence',    photo: 'legal',      to: '/solutions' },
];

const faqs = [
  {
    q: 'What does “private AI” mean?',
    a: 'AI systems that run entirely inside your own environment — your hardware, your network, your governance. Your data, prompts, and outputs never leave your perimeter.',
  },
  {
    q: 'Do we have to move to the cloud?',
    a: 'No. That is the point. We deploy inside your existing infrastructure, including fully air-gapped environments with no external connectivity.',
  },
  {
    q: 'How long does an engagement take?',
    a: 'Discovery runs in weeks. The first production agents typically go live inside a quarter, depending on data readiness and integration scope.',
  },
  {
    q: 'Where does CommandCore fit?',
    a: 'CommandCore is the platform we deliver on — our own sovereign AI infrastructure, with the KOGO OS agentic layer built in. It is how we deliver the transformation, not what we lead with.',
  },
];

const featuredSlugs = [
  'langoor-arinox-sovereign-ai-launch',
  'bharat-digital-summit-bdia',
  'aks-workshop-global-sovereign-ai',
];

const Home = () => {
  const insights = featuredSlugs
    .map((slug) => samplePosts.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <>
      <SEO
        title="Arinox AI | AI Transformation, Implemented End-to-End"
        description="Arinox is an AI transformation company. We help large organisations implement private AI inside their own environment — strategy, deployment, integration, and operations. Deployed with the Indian Army. Built in India."
        canonical="https://www.arinox.ai/"
      />

      {/* ═══ HERO ═══ */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="container-wide grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="mono-label mono-label-accent">AI transformation company · Built in India</p>
              <h1 className="text-[2.6rem] leading-[1.05] md:text-[3.5rem] font-display tracking-[-0.02em] mb-6">
                We make AI work<br />inside your company.
              </h1>
              <p className="text-[16.5px] text-brand-muted leading-relaxed max-w-xl mb-9">
                Arinox is the AI transformation partner for large organisations. We bring the strategy,
                the engineering, and the platform — and we stay until AI is running on your data,
                in your environment, under your governance.
              </p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-4 mb-10">
                <Link to="/contact" className="btn btn-primary">
                  Start a conversation
                </Link>
                <a href="#why-arinox" className="arrow-link">
                  Why Arinox <ArrowRight size={15} />
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px] text-brand-muted pt-6 border-t border-brand-border">
                <span>Deployed with the Indian Army (DGIS)</span>
                <span aria-hidden="true" className="text-brand-border">·</span>
                <span>Recognised by Startup India (DPIIT)</span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.12}>
              <div className="rounded-lg border border-brand-border bg-brand-surface p-6 md:p-7">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { key: 'commandcore-s', label: 'CommandCore S' },
                    { key: 'commandcore-m', label: 'CommandCore M' },
                    { key: 'commandcore-xl', label: 'CommandCore XL' },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <div className="img-frame img-contain aspect-square bg-white">
                        <img src={img(key)} alt={label} fetchpriority="high" />
                      </div>
                      <p className="mono text-[9.5px] tracking-[0.1em] text-brand-subtle mt-2.5 text-center uppercase">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-5 pt-5 border-t border-brand-border gap-4">
                  <span className="mono text-[10px] tracking-[0.14em] text-brand-subtle uppercase shrink-0">Powered by</span>
                  <span className="text-[13px] font-medium text-right">KOGO OS — agentic layer, built in</span>
                </div>
              </div>
              <p className="photo-caption text-center">
                CommandCore — the private AI platform we build and operate inside your premises.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ TRUST ═══ */}
      <section className="border-y border-brand-border">
        <div className="container-wide py-12 md:py-14">
          <Reveal>
            <p className="text-[12.5px] text-brand-muted text-center mb-10">
              Trusted by enterprises, governments, and defence — delivered with
              world-class system integrators and technology partners.
            </p>
          </Reveal>
          <LogoWall items={deliveryPartners} cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" />
        </div>
      </section>

      {/* ═══ 01 · WHY ARINOX ═══ */}
      <section className="section-padding" id="why-arinox">
        <div className="container-wide">
          <div className="rule-head mb-16">
            <span className="index">01</span>
            <span className="label">Why Arinox</span>
            <span className="line" />
          </div>

          <div className="grid lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="text-3xl md:text-[2.75rem] leading-[1.12] tracking-[-0.02em]">
                  Wherever AI must perform<br />without compromise.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <p className="text-[16px] text-brand-muted leading-relaxed">
                  We deploy across every industry where data integrity, regulatory compliance, and
                  operational continuity are non-negotiable — engineered for the constraints of each
                  domain, not a generic AI layer stretched to fit.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {why.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="card card-hover p-7 h-full">
                  <div className="w-10 h-10 rounded-md border border-brand-border flex items-center justify-center mb-5 bg-white">
                    <Icon size={17} strokeWidth={1.8} className="text-brand-primary" />
                  </div>
                  <h3 className="text-[18px] font-display mb-2.5">{title}</h3>
                  <p className="text-[13.5px] text-brand-muted leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 02 · WHAT WE DO ═══ */}
      <section className="section-padding bg-brand-surface border-y border-brand-border">
        <div className="container-wide">
          <div className="rule-head mb-16">
            <span className="index">02</span>
            <span className="label">What we do</span>
            <span className="line" />
          </div>

          <div className="grid lg:grid-cols-12 gap-8 mb-14">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="text-3xl md:text-[2.75rem] leading-[1.12] tracking-[-0.02em]">
                  One partner for the<br />whole AI journey.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <p className="text-[16px] text-brand-muted leading-relaxed">
                  Strategy, systems, and scale — we take responsibility for the path from first
                  assessment to an AI capability that runs and improves inside your company.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {services.map(({ index, Icon, title, desc }, i) => (
              <Reveal key={index} delay={i * 0.07}>
                <div className="card card-hover p-7 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-md border border-brand-border flex items-center justify-center bg-white">
                      <Icon size={17} strokeWidth={1.8} className="text-brand-primary" />
                    </div>
                    <span className="step-num text-[12px]">{index}</span>
                  </div>
                  <h3 className="text-[19px] font-display mb-2.5">{title}</h3>
                  <p className="text-[13.5px] text-brand-muted leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="rounded-lg border border-brand-border bg-white px-7 py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <p className="text-[15px] font-display shrink-0">We don’t build everything — we curate the best.</p>
              <p className="text-[13.5px] text-brand-muted leading-relaxed">
                Through exclusive partnerships with AI pioneers, system integrators, and technology
                majors, we deliver proven solutions that work in your context — including IBM, HPE,
                HCLTech, Hitachi Systems, and more.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 03 · HOW WE WORK ═══ */}
      <section className="section-padding" id="how-we-work">
        <div className="container-wide">
          <div className="rule-head mb-16">
            <span className="index">03</span>
            <span className="label">How we work</span>
            <span className="line" />
          </div>

          <div className="grid lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="text-3xl md:text-[2.75rem] leading-[1.12] tracking-[-0.02em]">
                  From ambition to<br />production, in four moves.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <p className="text-[16px] text-brand-muted leading-relaxed">
                  The same operating method on every engagement — scaled to the size of the problem.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {phases.map(({ n, title, desc, out }, i) => (
              <Reveal key={n} delay={i * 0.06}>
                <div className="border-t-2 border-brand-text/80 pt-6 relative">
                  <span className="absolute -top-[5px] left-0 w-2 h-2 rounded-full bg-brand-primary" aria-hidden="true" />
                  <p className="step-num text-[12px] mb-5">{n}</p>
                  <h3 className="text-[19px] font-display mb-3">{title}</h3>
                  <p className="text-[13.5px] text-brand-muted leading-relaxed mb-6">{desc}</p>
                  <p className="mono text-[10.5px] text-brand-subtle leading-relaxed">{out}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 04 · THE PLATFORM ═══ */}
      <section className="section-padding bg-brand-surface border-y border-brand-border">
        <div className="container-wide">
          <div className="rule-head mb-16">
            <span className="index">04</span>
            <span className="label">The platform</span>
            <span className="line" />
          </div>

          <div className="grid lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="text-3xl md:text-[2.5rem] leading-[1.12] tracking-[-0.02em] mb-6">
                  The engine behind<br />the work.
                </h2>
                <p className="text-[16px] text-brand-muted leading-relaxed mb-5">
                  Every engagement runs on infrastructure we own and operate: <strong className="text-brand-text font-medium">CommandCore</strong>,
                  our sovereign AI platform, with the <strong className="text-brand-text font-medium">KOGO OS</strong> agentic
                  layer built in. Air-gapped, auditable, and entirely inside your perimeter.
                </p>
                <p className="text-[14px] text-brand-subtle leading-relaxed mb-8">
                  It is how we deliver the transformation — not what we lead with.
                </p>
                <Link to="/commandcore" className="arrow-link">
                  Explore the platform <ArrowRight size={15} />
                </Link>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <div className="rounded-lg border border-brand-border bg-white overflow-hidden">
                  {stack.map(({ layer, note }, i) => (
                    <div
                      key={layer}
                      className={`grid grid-cols-[40px_1fr_auto] md:grid-cols-[56px_1fr_auto] items-center gap-4 px-5 md:px-7 py-4 ${i > 0 ? 'border-t border-brand-border' : ''}`}
                    >
                      <span className="mono text-[10.5px] text-brand-subtle">{String(i + 1).padStart(2, '0')}</span>
                      <span className={`text-[15px] ${i === 0 ? 'font-medium' : ''}`}>{layer}</span>
                      <span className="mono text-[10px] text-brand-subtle text-right hidden sm:block">{note}</span>
                    </div>
                  ))}
                </div>
                <p className="photo-caption">One stack, entirely yours — from silicon to agents.</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 05 · WHERE WE WORK ═══ */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="rule-head mb-16">
            <span className="index">05</span>
            <span className="label">Where we work</span>
            <span className="line" />
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <Reveal>
              <h2 className="text-3xl md:text-[2.75rem] leading-[1.12] tracking-[-0.02em] max-w-2xl">
                Built for the industries<br />where failure isn’t an option.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <Link to="/solutions" className="arrow-link shrink-0">
                Solutions by sector <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map(({ Icon, label, note, photo, to }, i) => (
              <Reveal key={label} delay={(i % 3) * 0.06}>
                <Link to={to} className="card card-hover block overflow-hidden group h-full">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={img(photo)}
                      alt={label}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2.5 mb-2">
                      <Icon size={16} strokeWidth={1.8} className="text-brand-primary shrink-0" />
                      <h3 className="text-[16px] group-hover:text-brand-primary transition-colors">{label}</h3>
                    </div>
                    <p className="text-[13px] text-brand-muted">{note}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 06 · IN THE FIELD (dark band) ═══ */}
      <section className="band-dark">
        <div className="container-wide py-20 md:py-28">
          <div className="rule-head mb-14" style={{ borderBottomColor: 'rgba(255,255,255,0.12)' }}>
            <span className="index">06</span>
            <span className="label">In the field</span>
            <span className="line" />
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="mono text-[10.5px] tracking-[0.16em] mb-4" style={{ color: '#FF8A4A' }}>
                  {anchorDeployment.client.toUpperCase()} · {anchorDeployment.label.toUpperCase()}
                </p>
                <h2 className="text-2xl md:text-[2.1rem] leading-[1.2] tracking-[-0.02em] mb-6">
                  {anchorDeployment.headline}
                </h2>
                {anchorDeployment.body.map((para) => (
                  <p key={para.slice(0, 24)} className="text-[15px] leading-relaxed mb-4">
                    {para}
                  </p>
                ))}
                <ul className="mt-7 space-y-2.5">
                  {anchorDeployment.capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-3 text-[13.5px]">
                      <span className="mt-[9px] w-1 h-1 rounded-full shrink-0" style={{ background: '#FF8A4A' }} />
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="mono text-[10px] mt-8">
                  EXACT FIGURES AVAILABLE UNDER APPROPRIATE CLEARANCES
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <Reveal delay={0.1}>
                <div className="img-frame aspect-[4/3]">
                  <img src={img('indian-gov')} alt="Arinox with government leadership" loading="lazy" />
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mt-20">
            <Reveal>
              <p className="mono text-[10.5px] tracking-[0.16em] mb-6">ALSO DELIVERED — ANONYMISED</p>
            </Reveal>
            {anonymisedStudies.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <div
                  className="grid md:grid-cols-12 gap-x-8 gap-y-3 py-6"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <div className="md:col-span-2">
                    <span className="mono text-[10.5px] tracking-[0.12em]">{s.domain.toUpperCase()}</span>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-[16px]" style={{ color: '#F2EDE6' }}>{s.title}</h3>
                  </div>
                  <div className="md:col-span-7">
                    <p className="text-[14px] leading-relaxed">{s.outcome}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 07 · INSIGHTS ═══ */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="rule-head mb-16">
            <span className="index">07</span>
            <span className="label">Insights</span>
            <span className="line" />
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-[2.5rem] leading-[1.12] tracking-[-0.02em]">
                Field notes.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <Link to="/blog" className="arrow-link shrink-0">
                All insights <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {insights.map((post, i) => (
              <Reveal key={post._id} delay={(i % 3) * 0.05}>
                <Link to={`/blog/${post.slug}`} className="group block">
                  <div className="img-frame aspect-[16/10]">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
                      className="transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mono text-[10px] text-brand-subtle mt-4 mb-2">
                    {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}
                    {' · '}{post.readTime} MIN
                  </p>
                  <h3 className="text-[17px] leading-snug mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[13px] text-brand-muted leading-relaxed line-clamp-2">{post.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 08 · WHO WE ARE ═══ */}
      <section className="section-padding bg-brand-surface border-y border-brand-border">
        <div className="container-wide">
          <div className="rule-head mb-16">
            <span className="index">08</span>
            <span className="label">Who we are</span>
            <span className="line" />
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6">
              <Reveal>
                <h2 className="text-3xl md:text-[2.5rem] leading-[1.12] tracking-[-0.02em] mb-6">
                  Founded to make enterprise-grade<br />AI accessible to all.
                </h2>
                <p className="text-[15.5px] text-brand-muted leading-relaxed mb-5 max-w-xl">
                  We are pioneers in intelligent business transformation — decoding how enterprises run
                  today and redesigning how they should operate tomorrow. We don’t just improve
                  efficiency; we multiply it.
                </p>
                <p className="text-[15.5px] text-brand-muted leading-relaxed mb-8 max-w-xl">
                  Headquartered in India with a presence across New Delhi and Bengaluru, connecting
                  innovation to implementation for enterprises worldwide.
                </p>
                <Link to="/about" className="arrow-link">
                  Meet the company <ArrowRight size={15} />
                </Link>
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <div className="grid grid-cols-3 gap-5">
                {team.map(({ name, role, photo }, i) => (
                  <Reveal key={name} delay={i * 0.06}>
                    <div className="img-frame aspect-[3/4]">
                      <img src={img(photo)} alt={name} loading="lazy" className="object-[center_top]" />
                    </div>
                    <p className="text-[13px] mt-3 leading-snug">{name}</p>
                    <p className="mono text-[9.5px] text-brand-subtle mt-1 tracking-[0.08em]">{role.toUpperCase()}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Values strip */}
          <div className="mt-20">
            <Reveal>
              <p className="mono text-[10.5px] tracking-[0.16em] text-brand-subtle mb-6">WHAT WE STAND FOR</p>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-6">
              {values.map(({ letter, title, desc }, i) => (
                <Reveal key={letter} delay={i * 0.05}>
                  <div className="border-t border-brand-border pt-5">
                    <p className="step-num text-[18px] mb-2">{letter}</p>
                    <p className="text-[14px] font-display mb-1.5">{title}</p>
                    <p className="text-[12px] text-brand-muted leading-relaxed">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 09 · FAQ ═══ */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="rule-head mb-14">
            <span className="index">09</span>
            <span className="label">Common questions</span>
            <span className="line" />
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {faqs.map(({ q, a }, i) => (
              <Reveal key={q} delay={i * 0.05}>
                <h3 className="text-[18px] font-display mb-3">{q}</h3>
                <p className="text-[14px] text-brand-muted leading-relaxed">{a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA (dark band) ═══ */}
      <section className="band-dark">
        <div className="container-wide py-24 md:py-32">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-[2.75rem] leading-[1.1] tracking-[-0.02em] mb-6">
                Start with a problem.<br />We’ll build the system.
              </h2>
              <p className="text-[16px] leading-relaxed mb-9 max-w-xl">
                A focused conversation about where private AI fits your operations, strategy, and
                compliance needs — no jargon, no commitment.
              </p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link to="/contact" className="btn btn-accent">
                  Start a conversation
                </Link>
                <a href="mailto:assist@arinox.ai" className="text-[14px] transition-colors" style={{ color: 'rgba(242,237,230,0.7)' }}>
                  assist@arinox.ai
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Home;
