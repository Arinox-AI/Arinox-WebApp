import { Link } from 'react-router-dom';
import { ShieldCheck, CloudOff, Receipt, ArrowRight, ArrowUpRight, Landmark, HeartPulse, Factory, Radar, Globe, Scale } from 'lucide-react';
import SEO from '../components/ui/SEO';
import Reveal from '../components/ui/Reveal';
import SectionHead from '../components/ui/SectionHead';
import LogoWall from '../components/ui/LogoWall';
import { img } from '../data/images';
import { organisations } from '../data/clients';
import { anonymisedStudies, anchorDeployment } from '../data/caseStudies';
import { team } from '../data/site';

const problems = [
  {
    Icon: CloudOff,
    title: 'Your data walks out the door',
    desc: 'Every cloud AI call sends your operational data to someone else\u2019s infrastructure. For regulated and IP-heavy businesses, that\u2019s not a trade-off \u2014 it\u2019s a liability.',
  },
  {
    Icon: Receipt,
    title: 'The per-token treadmill',
    desc: 'Cloud AI costs scale with usage forever. Running AI on your own hardware turns an operating bleed into an owned asset.',
  },
  {
    Icon: ShieldCheck,
    title: 'Compliance can\u2019t be retrofitted',
    desc: 'Regulators across BFSI, healthcare, defence, and government expect data residency and auditability by design \u2014 not as an afterthought.',
  },
];

const steps = [
  { step: '01', title: 'Assess',      desc: 'We map where AI creates real advantage in your operations \u2014 workflows, data readiness, constraints, and compliance exposure.' },
  { step: '02', title: 'Architect',   desc: 'We design the private AI stack for your environment: hardware footprint, agents, integrations, and governance.' },
  { step: '03', title: 'Deploy',      desc: 'CommandCore is installed inside your perimeter. KOGO agents are configured with your rules and handed over with full training.' },
  { step: '04', title: 'Run & scale', desc: 'We operate and measure with you \u2014 adding agents, workflows, and sites as your AI practice matures.' },
];

const sectors = [
  { Icon: Landmark,   label: 'BFSI',                  desc: 'Compliance AI, tender intelligence, incentive automation', img: 'banking',    to: '/solutions#bfsi' },
  { Icon: Radar,      label: 'Defence',               desc: 'Air-gapped intelligence & logistics systems',              img: 'defence',    to: '/solutions#defence' },
  { Icon: Globe,      label: 'Government',            desc: 'Policy continuity & public service analytics',             img: 'government', to: '/solutions#government' },
  { Icon: HeartPulse, label: 'Healthcare',            desc: 'Triage, claims & clinical knowledge systems',              img: 'healthcare', to: '/solutions#healthcare' },
  { Icon: Scale,      label: 'Legal & professional',  desc: 'AI-assisted legal intelligence',                           img: 'legal',      to: '/solutions' },
  { Icon: Factory,    label: 'Technology & industry', desc: 'Enterprise platforms & OT intelligence',                   img: 'technology', to: '/solutions#manufacturing' },
];

const Home = () => (
  <>
    <SEO
      title="Arinox AI | Private AI, Implemented End-to-End"
      description="Arinox is an AI transformation company. We help enterprises implement private AI on their own infrastructure through CommandCore and the KOGO agentic layer. Deployed with the Indian Army. Built in India."
      canonical="https://www.arinox.ai/"
    />

    {/* --- HERO --- */}
    <section className="pt-32 md:pt-40 pb-16 md:pb-24">
      <div className="container-wide grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="overline">AI transformation · Built in India</p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-display font-extrabold leading-[1.08] mb-6">
              Private AI,<br />
              <span className="text-gradient">working inside your company.</span>
            </h1>
            <p className="lead max-w-xl mb-8">
              Arinox helps enterprises put AI to real work — on your own infrastructure, under your control.
              Our platform, <strong className="text-brand-text">CommandCore</strong>, and the <strong className="text-brand-text">KOGO agentic layer</strong>{' '}
              turn AI ambition into production systems that respect your data, your compliance, and your economics.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link to="/contact" className="btn btn-primary">
                Start the conversation <ArrowRight size={16} />
              </Link>
              <Link to="/commandcore" className="btn btn-outline">
                Explore CommandCore
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-brand-muted">
              <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />Deployed with the Indian Army (DGIS)</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />Recognised by Startup India (DPIIT)</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />Bengaluru · New Delhi</span>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={0.15}>
            <div className="img-frame aspect-[4/3] relative">
              <img src={img('commandcore-hero')} alt="CommandCore sovereign AI infrastructure" fetchpriority="high" />
            </div>
            <div className="flex items-start gap-3 mt-4 px-1">
              <span className="w-2 h-2 rounded-sm bg-brand-primary mt-1.5 shrink-0" />
              <p className="text-xs text-brand-subtle leading-relaxed max-w-sm">
                CommandCore — sovereign AI infrastructure running entirely within the customer’s premises.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* --- WHO WE WORK WITH --- */}
    <section className="border-y border-brand-border bg-brand-surface py-12 md:py-16">
      <div className="container-wide">
        <Reveal>
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-brand-subtle mb-8" style={{ fontFamily: 'Manrope' }}>
            Delivery partners &amp; organisations we work with
          </p>
        </Reveal>
        <LogoWall items={organisations} cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" />
      </div>
    </section>

    {/* --- 01 · WHY PRIVATE AI --- */}
    <section className="section-padding">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <SectionHead
              overline="01 · Why private AI"
              title="Cloud AI asks you to rent your intelligence."
              lead="Sending every workflow through a shared cloud model means giving up control of your data, your margins, and your compliance story — forever."
            />
          </div>
          <div className="lg:col-span-8 grid md:grid-cols-3 gap-4">
            {problems.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="card card-hover p-6 h-full">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-4">
                    <Icon size={18} strokeWidth={1.8} className="text-brand-primary" />
                  </div>
                  <h3 className="font-display font-bold text-[15px] mb-2">{title}</h3>
                  <p className="text-[13px] text-brand-muted leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* --- 02 · WHAT WE DO --- */}
    <section className="section-padding bg-brand-surface border-y border-brand-border">
      <div className="container-wide">
        <SectionHead
          overline="02 · What we do"
          title="We bring the expertise for the whole journey."
          lead="Arinox is not a tool vendor. We take responsibility for the transformation — from first assessment to an AI practice that runs inside your company."
          align="center"
          className="mb-12"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-border border border-brand-border rounded-2xl overflow-hidden">
          {steps.map(({ step, title, desc }, i) => (
            <Reveal key={step} delay={i * 0.07} className="h-full">
              <div className="bg-brand-card h-full p-6 md:p-7">
                <p className="step-num text-sm mb-4">{step}</p>
                <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
                <p className="text-[13px] text-brand-muted leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="text-center mt-8">
          <Link to="/contact" className="btn btn-dark">
            Map your AI opportunity <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>

    {/* --- 03 · COMMANDCORE --- */}
    <section className="section-padding">
      <div className="container-wide grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="overline">03 · The platform</p>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold leading-[1.15] mb-5">
              CommandCore.<br />Sovereign AI infrastructure.
            </h2>
            <p className="lead mb-7">
              Our own product: AI compute engineered to live inside your walls — from compact edge units
              to datacenter-grade systems. Models, prompts, and data never leave your perimeter. Air-gapped
              operation supported end to end.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Runs on your hardware, in your network, under your governance',
                'Purpose-built agents execute real workflows — not just answer questions',
                'Role-based access and full audit trails on every AI decision',
                'Deployment measured in weeks, not multi-year programmes',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14px] text-brand-muted">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/commandcore" className="btn btn-primary">
              Explore CommandCore <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
        <div className="lg:col-span-6">
          <Reveal delay={0.12}>
            <div className="grid grid-cols-2 gap-4">
              <div className="img-frame aspect-[4/5]">
                <img src={img('m-series')} alt="CommandCore M edge unit" loading="lazy" />
              </div>
              <div className="img-frame aspect-[4/5] mt-8">
                <img src={img('xl-series')} alt="CommandCore XL datacenter-grade system" loading="lazy" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* --- 04 · KOGO (ink band) --- */}
    <section className="section-padding band-ink">
      <div className="container-wide grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="overline" style={{ color: '#F07A2E' }}>04 · The agentic layer</p>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold leading-[1.15] mb-5">
              From infrastructure to intelligence.
            </h2>
            <p className="lead mb-7" style={{ color: 'rgba(242,239,233,0.72)' }}>
              CommandCore’s intelligence comes from <strong className="text-white">KOGO</strong> — the agentic
              platform we deploy on every engagement. KOGO turns compute into working AI: agents that build,
              orchestrate, remember, and stay accountable.
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {[
                'Agent registry & lifecycle',
                'Multi-agent orchestration',
                'Governed RAG — cited to source',
                'LLMOps: models, prompts, memory',
                'Voice agents over telephony',
                'Human-in-the-loop approvals',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/80">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <Reveal delay={0.12}>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img src={img('kogo')} alt="KOGO agentic layer" loading="lazy" className="w-full object-cover aspect-[16/9]" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* --- 05 · SECTORS --- */}
    <section className="section-padding">
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <SectionHead
            overline="05 · Where it works"
            title="Wherever AI must perform without compromise."
            lead="Every engagement is engineered for the constraints of the domain — not a generic AI layer stretched to fit."
          />
          <Reveal delay={0.1}>
            <Link to="/solutions" className="btn btn-outline shrink-0">
              See solutions by sector <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map(({ Icon, label, desc, img: photo, to }, i) => (
            <Reveal key={label} delay={(i % 3) * 0.07}>
              <Link to={to} className="card card-hover block overflow-hidden group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={img(photo)}
                    alt={label}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5 flex items-start gap-3">
                  <Icon size={18} strokeWidth={1.8} className="text-brand-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display font-bold text-[15px] mb-1">{label}</h3>
                    <p className="text-[12.5px] text-brand-muted leading-snug">{desc}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* --- 06 · PROOF --- */}
    <section className="section-padding bg-brand-surface border-y border-brand-border">
      <div className="container-wide">
        <SectionHead
          overline="06 · Proof"
          title="Deployed where it matters most."
          lead="Our anchor deployment runs inside one of the most demanding environments in the country. The rest is delivered, measured, and expanding."
          align="center"
          className="mb-12"
        />

        {/* DGIS anchor */}
        <Reveal>
          <div className="card overflow-hidden grid lg:grid-cols-12">
            <div className="lg:col-span-5 relative min-h-[280px]">
              <img src={img('defence')} alt="Sovereign defence deployment" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1A12]/80 via-[#1F1A12]/10 to-transparent" />
              <span className="absolute bottom-4 left-4 chip !bg-[#1F1A12]/80 !text-white !border-white/20">
                {anchorDeployment.label}
              </span>
            </div>
            <div className="lg:col-span-7 p-7 md:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary mb-2" style={{ fontFamily: 'Manrope' }}>
                {anchorDeployment.client}
              </p>
              <h3 className="text-2xl font-display font-extrabold mb-4">{anchorDeployment.headline}</h3>
              {anchorDeployment.body.map((p) => (
                <p key={p.slice(0, 24)} className="text-sm text-brand-muted leading-relaxed mb-3">{p}</p>
              ))}
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mt-5">
                {anchorDeployment.capabilities.map((c) => (
                  <span key={c} className="flex items-start gap-2 text-[13px] text-brand-muted">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-primary shrink-0" />{c}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-brand-subtle mt-5">
                Exact performance figures are available on request under appropriate clearances.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Anonymised studies */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {anonymisedStudies.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="card card-hover p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="chip-neutral">{s.domain}</span>
                  <span className="text-[10px] text-brand-subtle uppercase tracking-widest font-semibold" style={{ fontFamily: 'Manrope' }}>Anonymised</span>
                </div>
                <h3 className="font-display font-bold text-[15px] mb-2">{s.title}</h3>
                <p className="text-[13px] text-brand-muted leading-relaxed mb-3">
                  <strong className="text-brand-text">Challenge.</strong> {s.challenge}
                </p>
                <p className="text-[13px] text-brand-muted leading-relaxed mb-4">
                  <strong className="text-brand-text">What we deployed.</strong> {s.what}
                </p>
                <p className="text-[13px] text-brand-text leading-relaxed mt-auto border-t border-brand-border pt-3">
                  {s.outcome}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* --- 07 · LEADERSHIP --- */}
    <section className="section-padding">
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <SectionHead
            overline="07 · Leadership"
            title="Architects of change."
            lead="Operators who have run large-scale transformations — now building the private AI layer for enterprise India."
          />
          <Reveal delay={0.1}>
            <Link to="/about" className="btn btn-outline shrink-0">
              Meet the company <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map(({ name, role, bio, photo }, i) => (
            <Reveal key={name} delay={i * 0.08}>
              <div className="card card-hover overflow-hidden h-full">
                <div className="aspect-[4/3] overflow-hidden bg-brand-surface">
                  <img src={img(photo)} alt={name} loading="lazy" className="w-full h-full object-cover object-[center_top]" />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-[15px]">{name}</h3>
                  <p className="text-xs text-brand-primary font-semibold mb-2 mt-0.5">{role}</p>
                  <p className="text-[13px] text-brand-muted leading-relaxed">{bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* --- CTA --- */}
    <section className="band-ink">
      <div className="container-wide py-20 md:py-24 text-center max-w-3xl">
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary mb-5" style={{ fontFamily: 'Manrope' }}>Ready?</p>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold leading-[1.15] mb-5">
            Start with a problem.<br />We’ll build the system.
          </h2>
          <p className="lead mb-8" style={{ color: 'rgba(242,239,233,0.72)' }}>
            A focused conversation where we map where private AI fits your operations, strategy, and compliance needs — no jargon, no commitment.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="btn btn-on-dark">
              Start the conversation <ArrowRight size={16} />
            </Link>
            <Link to="/commandcore" className="btn btn-on-dark-ghost">
              Explore CommandCore
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  </>
);

export default Home;
