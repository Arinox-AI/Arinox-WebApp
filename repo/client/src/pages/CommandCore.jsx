import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowRight, Shield, FileCheck, LockKeyhole, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/ui/SEO';
import Reveal from '../components/ui/Reveal';
import SectionHead from '../components/ui/SectionHead';
import AuthModal from '../components/ui/AuthModal';
import { img } from '../data/images';
import { useAuth } from '../hooks/useAuth';
import {
  commandCoreIntro,
  headlineClaims,
  whatItIs,
  stack,
  tiers,
  powerUseCases,
  governance,
  deploymentSteps,
  kogo,
} from '../data/commandcore';

const governanceIcons = [Shield, FileCheck, LockKeyhole, Rocket];

const SpecRows = ({ specs }) => (
  <div className="rounded-xl border border-brand-border divide-y divide-brand-border/70 overflow-hidden">
    {specs.map(({ label, value }) => (
      <div key={label} className="grid grid-cols-[104px_minmax(0,1fr)] sm:grid-cols-[130px_minmax(0,1fr)] gap-3 px-4 py-3 bg-brand-surface/60">
        <span className="text-[10.5px] text-brand-primary uppercase tracking-wider font-bold pt-px" style={{ fontFamily: 'Manrope' }}>
          {label}
        </span>
        <div className="space-y-1">
          {value.map((line) => (
            <p key={line} className="text-[12.5px] text-brand-muted leading-snug">{line}</p>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const CommandCore = () => {
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [activeTier, setActiveTier] = useState('xl');
  const tier = tiers.find((t) => t.id === activeTier);

  const handleDownload = () => {
    if (!user) { setShowAuth(true); return; }
    const a = document.createElement('a');
    a.href = '/commandcore-brochure.pdf';
    a.download = 'CommandCore-Brochure.pdf';
    a.click();
  };

  return (
    <>
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} defaultMode="register" />
      <SEO
        title="CommandCore | Agentic AI in a Box | Arinox AI"
        description="CommandCore is Arinox's product: a fully air-gapped, sovereign AI micro-datacenter — 100% AI, 0% internet — with the KOGO OS agentic layer built in. Edge to datacenter, built in India."
        canonical="https://www.arinox.ai/commandcore"
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 border-b border-brand-border">
        <div className="container-wide grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="overline">{commandCoreIntro.overline} · {commandCoreIntro.product}</p>
              <h1 className="text-4xl md:text-5xl font-display font-extrabold leading-[1.08] mb-6">
                {commandCoreIntro.title}
              </h1>
              <p className="lead mb-7 max-w-xl">{commandCoreIntro.lead}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {commandCoreIntro.badges.map((b) => <span key={b} className="chip">{b}</span>)}
              </div>
              <p className="text-[13px] text-brand-subtle mb-8 border-l-2 border-brand-primary/50 pl-3">
                {commandCoreIntro.claim}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="btn btn-primary">
                  Request a demo <ArrowRight size={16} />
                </Link>
                <button onClick={handleDownload} className="btn btn-outline">
                  <Download size={15} /> Download brochure
                </button>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.15}>
              <div className="img-frame img-contain aspect-[16/12]">
                <img src={img('commandcore-xl')} alt="CommandCore XL — datacenter-grade private agentic AI" fetchpriority="high" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Headline claims strip ─────────────────────────────── */}
      <section className="bg-brand-surface border-b border-brand-border">
        <div className="container-wide grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-brand-border">
          {headlineClaims.map(({ big, small, note }, i) => (
            <Reveal key={big} delay={i * 0.06}>
              <div className="py-8 sm:px-8 first:sm:pl-0">
                <p className="font-display font-extrabold text-xl md:text-2xl leading-tight">
                  {big} <span className="text-gradient">{small}</span>
                </p>
                <p className="text-[13px] text-brand-muted leading-relaxed mt-2 max-w-xs">{note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── What CommandCore is ───────────────────────────────── */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHead
            overline="What it is"
            title="Four things, no asterisks."
            lead="Everything CommandCore does follows from one decision: the AI — the compute, the models, the agents, the audit trail — lives inside your perimeter."
            className="mb-12"
          />
          <div className="grid md:grid-cols-2 gap-4">
            {whatItIs.map(({ title, desc }, i) => (
              <Reveal key={title} delay={(i % 2) * 0.07}>
                <div className="card card-hover p-6 md:p-7 h-full flex gap-4">
                  <span className="step-num text-sm mt-1">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display font-bold text-[16px] mb-1.5">{title}</h3>
                    <p className="text-[13.5px] text-brand-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture stack ────────────────────────────────── */}
      <section className="section-padding bg-brand-surface border-y border-brand-border">
        <div className="container-wide grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionHead
              overline="Architecture"
              title="The stack, top to bottom."
              lead="Each layer belongs to you. Nothing on this diagram is rented, and nothing crosses your boundary."
            />
          </div>
          <div className="lg:col-span-8">
            <div className="border border-brand-border rounded-2xl overflow-hidden bg-brand-card">
              {stack.map(({ layer, desc }, i) => (
                <Reveal key={layer} delay={i * 0.05}>
                  <div className={`grid sm:grid-cols-[56px_220px_1fr] gap-3 sm:gap-5 items-start p-5 md:px-7 ${i > 0 ? 'border-t border-brand-border' : ''}`}>
                    <span className="step-num text-sm mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-display font-bold text-[14.5px]">{layer}</h3>
                    <p className="text-[13px] text-brand-muted leading-relaxed">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Hardware tiers ────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHead
            overline="Hardware"
            title="Three tiers. One sovereign stack."
            lead="From edge deployments to datacenter-grade AI — all fully air-gappable, all running KOGO OS, all yours."
            align="center"
            className="mb-10"
          />

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex flex-wrap justify-center gap-1.5 rounded-xl border border-brand-border bg-brand-card p-1.5">
              {tiers.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTier(t.id)}
                  aria-pressed={activeTier === t.id}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${
                    activeTier === t.id
                      ? 'bg-brand-primary text-white'
                      : 'text-brand-muted hover:text-brand-text'
                  }`}
                >
                  {t.name.replace('CommandCore ', '')}
                  <span className={`hidden sm:inline text-[11px] font-medium ${activeTier === t.id ? 'text-white/75' : 'text-brand-subtle'}`}>
                    {t.tagline.split(' ').slice(0, 2).join(' ')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tier detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="card overflow-hidden grid lg:grid-cols-12"
            >
              <div className="lg:col-span-5 relative bg-white border-b lg:border-b-0 lg:border-r border-brand-border flex items-center justify-center p-8 min-h-[320px]">
                <img src={img(tier.img)} alt={tier.name} loading="lazy" className="max-h-80 w-auto object-contain" />
                {tier.highlight && (
                  <span className="absolute top-4 right-4 chip">Most deployed</span>
                )}
              </div>
              <div className="lg:col-span-7 p-7 md:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary mb-1" style={{ fontFamily: 'Manrope' }}>
                  {tier.name}
                </p>
                <h3 className="text-2xl md:text-3xl font-display font-extrabold mb-2">{tier.tagline}</h3>
                <p className="text-sm text-brand-muted leading-relaxed mb-5 max-w-lg">{tier.desc}</p>

                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="chip">{tier.accelerator}</span>
                </div>

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-subtle mb-2.5" style={{ fontFamily: 'Manrope' }}>Best for</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-7">
                  {tier.bestFor.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13px] text-brand-muted">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-primary shrink-0" />{item}
                    </li>
                  ))}
                </ul>

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-subtle mb-2.5" style={{ fontFamily: 'Manrope' }}>Specifications</p>
                <div className="mb-8">
                  <SpecRows specs={tier.specs} />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link to="/contact" className="btn btn-primary">
                    Request this configuration <ArrowRight size={15} />
                  </Link>
                  <button onClick={handleDownload} className="btn btn-outline">
                    <Download size={14} /> Brochure
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── What it powers ────────────────────────────────────── */}
      <section className="section-padding bg-brand-surface border-y border-brand-border">
        <div className="container-wide">
          <SectionHead
            overline="Use cases"
            title="What CommandCore powers."
            lead="A self-contained AI micro-datacenter for the environments where cloud AI is not an option."
            className="mb-10"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {powerUseCases.map(({ sector, items }, i) => (
              <Reveal key={sector} delay={i * 0.06}>
                <div className="card card-hover p-6 h-full">
                  <h3 className="font-display font-bold text-[14.5px] mb-3">{sector}</h3>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] text-brand-muted leading-snug">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-primary shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Governance ────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHead
            overline="Governance"
            title="Sovereignty isn’t a claim. It’s architecture."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {governance.map(({ title, desc }, i) => {
              const Icon = governanceIcons[i];
              return (
                <Reveal key={title} delay={i * 0.06}>
                  <div className="card card-hover p-6 h-full">
                    <div className="w-10 h-10 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-4">
                      <Icon size={18} strokeWidth={1.8} className="text-brand-primary" />
                    </div>
                    <h3 className="font-display font-bold text-[14.5px] mb-1.5">{title}</h3>
                    <p className="text-[13px] text-brand-muted leading-relaxed">{desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── KOGO band ─────────────────────────────────────────── */}
      <section className="section-padding band-ink">
        <div className="container-wide grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="overline" style={{ color: '#F07A2E' }}>The agentic layer</p>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold leading-[1.15] mb-4">
                {kogo.name} — built into every unit.
              </h2>
              <div className="flex flex-wrap gap-2 mb-5">
                {kogo.badges.map((b) => (
                  <span key={b} className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/85">{b}</span>
                ))}
              </div>
              <p className="lead mb-7" style={{ color: 'rgba(242,239,233,0.72)' }}>{kogo.desc}</p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
                {kogo.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[13px] text-white/80">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-primary shrink-0" />{p}
                  </li>
                ))}
              </ul>
              <Link to="/solutions" className="btn btn-on-dark">
                See what agents do <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
          <div className="lg:col-span-6 space-y-6">
            <Reveal delay={0.1}>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img src={img('kogo')} alt="KOGO OS agentic layer" loading="lazy" className="w-full object-cover aspect-[16/10]" />
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50 mb-3" style={{ fontFamily: 'Manrope' }}>
                  Security architecture
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {kogo.security.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-[12.5px] text-white/75">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-primary shrink-0" />{s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Deployment journey ────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHead
            overline="The journey"
            title="Assess. Architect. Deploy. Run."
            lead="We own the path from first workshop to production AI — you keep the outcome."
            className="mb-12"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-border border border-brand-border rounded-2xl overflow-hidden">
            {deploymentSteps.map(({ step, title, desc }, i) => (
              <Reveal key={step} delay={i * 0.07} className="h-full">
                <div className="bg-brand-card h-full p-6 md:p-7">
                  <p className="step-num text-sm mb-4">{step}</p>
                  <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
                  <p className="text-[13px] text-brand-muted leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="band-ink">
        <div className="container-wide py-20 text-center max-w-3xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold leading-[1.15] mb-5">
              Start with a problem.<br />We’ll build the solution.
            </h2>
            <p className="lead mb-8" style={{ color: 'rgba(242,239,233,0.72)' }}>
              Tell us where AI should be working in your company — we’ll map the deployment.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/contact" className="btn btn-on-dark">
                Request a demo <ArrowRight size={16} />
              </Link>
              <button onClick={handleDownload} className="btn btn-on-dark-ghost">
                <Download size={15} /> Download brochure
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default CommandCore;
