import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/ui/SEO';
import Reveal from '../components/ui/Reveal';
import LogoWall from '../components/ui/LogoWall';
import { img } from '../data/images';
import { anchorDeployment, anonymisedStudies } from '../data/caseStudies';
import { team } from '../data/site';
import { deliveryPartners } from '../data/clients';
import { samplePosts } from './Blog';

const services = [
  {
    index: '01',
    title: 'Strategy & roadmap',
    desc: 'We find where AI actually pays off in your operations and sequence the path there — opportunity map, business case, data readiness, governance.',
    tags: 'Assessment · Business case · Roadmap',
  },
  {
    index: '02',
    title: 'Private AI implementation',
    desc: 'We design, build, and deploy AI systems inside your environment — on your data, under your governance, with no public-cloud dependency.',
    tags: 'Architecture · Deployment · Air-gapped',
  },
  {
    index: '03',
    title: 'Integration & adoption',
    desc: 'We connect AI to the systems you already run, redesign the workflows around it, and train the teams who will own it.',
    tags: 'ERP / CRM · Workflows · Enablement',
  },
  {
    index: '04',
    title: 'Operate & scale',
    desc: 'We run and improve the capability with you — measuring performance, hardening what matters, and expanding to new workflows and sites.',
    tags: 'Managed ops · Observability · Expansion',
  },
];

const phases = [
  { n: '01', title: 'Assess',    desc: 'Current systems, data reality, compliance constraints — and where AI creates measurable advantage.', out: 'Opportunity map, business case' },
  { n: '02', title: 'Architect', desc: 'Target architecture, deployment model, integrations, and the governance that goes with them.',        out: 'Blueprint, deployment plan' },
  { n: '03', title: 'Deploy',    desc: 'Systems installed inside your perimeter, connected to your workflows, tested with your teams.',        out: 'Production AI in your environment' },
  { n: '04', title: 'Run',       desc: 'Measured operations, continuous improvement, and a roadmap for the next set of workflows.',            out: 'A running AI capability' },
];

const sectors = [
  { label: 'BFSI',                 note: 'Compliance, risk & operations agents',   to: '/solutions#bfsi' },
  { label: 'Defence',              note: 'Air-gapped intelligence & logistics',    to: '/solutions#defence' },
  { label: 'Government',           note: 'Policy continuity & public analytics',   to: '/solutions#government' },
  { label: 'Healthcare',           note: 'Triage, claims & clinical knowledge',    to: '/solutions#healthcare' },
  { label: 'Manufacturing',        note: 'Forecasting, maintenance & throughput',  to: '/solutions#manufacturing' },
  { label: 'Professional & legal', note: 'Knowledge, review & evidence work',      to: '/solutions' },
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
    a: 'CommandCore is the platform we deliver on — our own sovereign AI infrastructure, with the KOGO OS agentic layer built in. It is the engine behind the work, not the start of the conversation.',
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
              <p className="mono-label mono-label-accent">AI transformation company</p>
              <h1 className="text-[2.6rem] leading-[1.06] md:text-[3.4rem] font-display tracking-[-0.02em] mb-6">
                We implement private AI inside your company.
              </h1>
              <p className="text-[16.5px] text-brand-muted leading-relaxed max-w-xl mb-9">
                Arinox is the AI transformation partner for large organisations — strategy, deployment,
                integration, and operations, end to end. On your data, in your environment, under your governance.
              </p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-4 mb-10">
                <Link to="/contact" className="btn btn-primary">
                  Start a conversation
                </Link>
                <a href="#what-we-do" className="arrow-link">
                  What we do <ArrowRight size={15} />
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
              <div className="grid grid-cols-3 gap-4">
                {[
                  { key: 'commandcore-s', label: 'CommandCore S' },
                  { key: 'commandcore-m', label: 'CommandCore M' },
                  { key: 'commandcore-xl', label: 'CommandCore XL' },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <div className="img-frame img-contain aspect-square">
                      <img src={img(key)} alt={label} fetchpriority="high" />
                    </div>
                    <p className="mono text-[9.5px] tracking-[0.1em] text-brand-subtle mt-2.5 text-center uppercase">{label}</p>
                  </div>
                ))}
              </div>
              <p className="photo-caption text-center">
                The infrastructure behind the work — sovereign AI systems we build and operate inside your premises.
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
              Delivered with partners who bring enterprise relationships and deployment capability.
            </p>
          </Reveal>
          <LogoWall items={deliveryPartners} cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" />
        </div>
      </section>

      {/* ═══ 01 · WHAT WE DO ═══ */}
      <section className="section-padding" id="what-we-do">
        <div className="container-wide">
          <div className="rule-head mb-16">
            <span className="index">01</span>
            <span className="label">What we do</span>
            <span className="line" />
          </div>

          <div className="grid lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="text-3xl md:text-[2.75rem] leading-[1.12] tracking-[-0.02em]">
                  We make AI work<br />inside your company.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <p className="text-[16px] text-brand-muted leading-relaxed">
                  Most AI programmes stall between the pilot and production. Arinox exists to close that gap.
                  We bring the expertise for the whole journey — and stay accountable for the outcome.
                </p>
              </Reveal>
            </div>
          </div>

          <div>
            {services.map(({ index, title, desc, tags }, i) => (
              <Reveal key={index} delay={i * 0.04}>
                <div className="grid md:grid-cols-12 gap-x-8 gap-y-3 py-7 border-t border-brand-border">
                  <div className="md:col-span-1">
                    <span className="step-num text-[12px]">{index}</span>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-[19px] font-display tracking-[-0.01em]">{title}</h3>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-[14.5px] text-brand-muted leading-relaxed">{desc}</p>
                  </div>
                  <div className="md:col-span-3 md:text-right">
                    <span className="mono text-[10.5px] text-brand-subtle">{tags}</span>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-brand-border" />
          </div>
        </div>
      </section>

      {/* ═══ 02 · HOW WE WORK ═══ */}
      <section className="section-padding bg-brand-surface border-y border-brand-border">
        <div className="container-wide">
          <div className="rule-head mb-16">
            <span className="index">02</span>
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
                <div className="border-t border-brand-border pt-6">
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

      {/* ═══ 03 · WHERE IT WORKS ═══ */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="rule-head mb-16">
            <span className="index">03</span>
            <span className="label">Where it works</span>
            <span className="line" />
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <Reveal>
              <h2 className="text-3xl md:text-[2.75rem] leading-[1.12] tracking-[-0.02em] max-w-2xl">
                AI where the stakes are real.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <Link to="/solutions" className="arrow-link shrink-0">
                Solutions by sector <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16">
            {sectors.map(({ label, note, to }, i) => (
              <Reveal key={label} delay={(i % 2) * 0.05}>
                <Link
                  to={to}
                  className="group flex items-baseline justify-between gap-6 py-6 border-t border-brand-border"
                >
                  <div className="flex items-baseline gap-6 min-w-0">
                    <span className="mono text-[10.5px] text-brand-subtle shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <div className="min-w-0">
                      <h3 className="text-[19px] font-display group-hover:text-brand-primary transition-colors">{label}</h3>
                      <p className="text-[13px] text-brand-muted mt-1">{note}</p>
                    </div>
                  </div>
                  <ArrowRight size={15} className="text-brand-border group-hover:text-brand-primary transition-colors shrink-0" />
                </Link>
              </Reveal>
            ))}
            <div className="border-t border-brand-border md:col-span-2" />
          </div>
        </div>
      </section>

      {/* ═══ 04 · IN THE FIELD (dark band) ═══ */}
      <section className="band-dark">
        <div className="container-wide py-20 md:py-28">
          <div className="rule-head mb-14" style={{ borderBottomColor: 'rgba(255,255,255,0.12)' }}>
            <span className="index">04</span>
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

          {/* Anonymised outcomes — inside the band, quiet */}
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

      {/* ═══ 05 · THE PLATFORM (quiet) ═══ */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="rule-head mb-16">
            <span className="index">05</span>
            <span className="label">The platform</span>
            <span className="line" />
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="text-3xl md:text-[2.5rem] leading-[1.12] tracking-[-0.02em] mb-6">
                  The engine behind<br />the work.
                </h2>
                <p className="text-[16px] text-brand-muted leading-relaxed mb-5 max-w-xl">
                  Every engagement runs on infrastructure we own and operate: <strong className="text-brand-text font-medium">CommandCore</strong>,
                  our private AI platform, with the <strong className="text-brand-text font-medium">KOGO OS</strong> agentic
                  layer built in. Air-gapped, auditable, and entirely inside your perimeter.
                </p>
                <p className="text-[14px] text-brand-subtle leading-relaxed mb-8 max-w-xl">
                  It is how we deliver the transformation — not what we lead with.
                </p>
                <Link to="/commandcore" className="arrow-link">
                  Explore the platform <ArrowRight size={15} />
                </Link>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <ul>
                  {[
                    ['Deployment', 'On-premises, VPC, or fully air-gapped'],
                    ['Agentic layer', 'KOGO OS — agent builder, mesh, guardrails'],
                    ['Governance', 'Zero data egress, full audit on every decision'],
                    ['Scale', 'From edge units to datacenter-grade systems'],
                  ].map(([k, v], i) => (
                    <li key={k} className="flex items-baseline justify-between gap-6 py-4 border-t border-brand-border">
                      <span className="mono text-[10.5px] text-brand-subtle tracking-[0.1em] uppercase shrink-0">{k}</span>
                      <span className="text-[13.5px] text-brand-muted text-right">{v}</span>
                    </li>
                  ))}
                  <li className="border-t border-brand-border" />
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 06 · INSIGHTS ═══ */}
      <section className="section-padding bg-brand-surface border-y border-brand-border">
        <div className="container-wide">
          <div className="rule-head mb-16">
            <span className="index">06</span>
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

      {/* ═══ 07 · WHO WE ARE ═══ */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="rule-head mb-16">
            <span className="index">07</span>
            <span className="label">Who we are</span>
            <span className="line" />
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6">
              <Reveal>
                <h2 className="text-3xl md:text-[2.5rem] leading-[1.12] tracking-[-0.02em] mb-6">
                  Operators, not theorists.
                </h2>
                <p className="text-[15.5px] text-brand-muted leading-relaxed mb-6 max-w-xl">
                  Arinox is built by people who have run large-scale transformations — across enterprise
                  software, cloud platforms, and AI systems deployed in the most demanding environments
                  in the country. We combine that operating experience with deep engineering, and we stay
                  on the ground with you until AI is running.
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
        </div>
      </section>

      {/* ═══ 08 · FAQ ═══ */}
      <section className="pb-20 md:pb-28">
        <div className="container-wide">
          <div className="rule-head mb-14">
            <span className="index">08</span>
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
                <a href="mailto:assist@arinox.ai" className="arrow-link">
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
