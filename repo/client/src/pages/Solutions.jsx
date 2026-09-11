import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, HeartPulse, Factory, Radar, Globe, ShoppingBasket, ArrowRight, ChevronDown, Check } from 'lucide-react';
import SEO from '../components/ui/SEO';
import Reveal from '../components/ui/Reveal';
import SectionHead from '../components/ui/SectionHead';
import { img } from '../data/images';
import { sectors } from '../data/caseStudies';
import { tiers } from '../data/commandcore';

const sectorIcons = {
  bfsi: Landmark,
  healthcare: HeartPulse,
  manufacturing: Factory,
  defence: Radar,
  government: Globe,
  fmcg: ShoppingBasket,
};

const CaseCard = ({ uc, i }) => {
  const [open, setOpen] = useState(false);
  const hasDetails = Boolean(uc.how || uc.capabilities?.length || uc.integrations);

  return (
    <Reveal delay={i * 0.07} className="h-full">
      <div className="card card-hover p-6 flex flex-col gap-4 h-full">
        <h4 className="font-display font-bold text-[16px] leading-snug">{uc.title}</h4>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-alert/70 mb-1.5" style={{ fontFamily: 'Manrope' }}>Problem</p>
          <p className="text-[13px] text-brand-muted leading-relaxed">{uc.problem}</p>
        </div>

        <div className="rounded-xl px-4 py-3 bg-brand-primary/[0.06] border border-brand-primary/20 self-stretch">
          <p className="text-[13px] font-bold text-brand-secondary">{uc.agent}</p>
          <p className="text-[11.5px] text-brand-subtle mt-0.5 leading-snug">{uc.agentNote}</p>
        </div>

        {hasDetails && (
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="self-start inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-primary hover:opacity-75 transition-opacity"
            style={{ fontFamily: 'Manrope' }}
          >
            How it works
            <ChevronDown size={14} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
          </button>
        )}

        <AnimatePresence initial={false}>
          {open && hasDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-brand-border flex flex-col gap-3">
                {uc.how && <p className="text-[13px] text-brand-muted leading-relaxed">{uc.how}</p>}
                {uc.capabilities?.length > 0 && (
                  <ul className="flex flex-col gap-1.5">
                    {uc.capabilities.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-[13px] text-brand-muted">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-primary shrink-0" />{c}
                      </li>
                    ))}
                  </ul>
                )}
                {uc.integrations && (
                  <p className="text-[11.5px] text-brand-subtle leading-snug">{uc.integrations}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto border-t border-brand-border pt-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-green-700/80 mb-1.5" style={{ fontFamily: 'Manrope' }}>Outcome</p>
          <p className="flex items-start gap-2 text-[13px] text-brand-text font-medium leading-relaxed">
            <Check size={14} className="text-brand-green shrink-0 mt-1" />
            <span>{uc.outcome}</span>
          </p>
        </div>
      </div>
    </Reveal>
  );
};

const Solutions = () => {
  const [activeSector, setActiveSector] = useState(sectors[0].id);
  const current = sectors.find((s) => s.id === activeSector);
  const location = useLocation();

  /* Support deep-links like /solutions#defence */
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const match = sectors.find((s) => s.id === id);
      if (match) setActiveSector(id);
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [location.hash]);

  return (
    <>
      <SEO
        title="Solutions | Private AI in Production | Arinox AI"
        description="How Arinox implements private AI across BFSI, Healthcare, Manufacturing, Defence, Government, and FMCG — on-premises on CommandCore with the KOGO agentic layer."
        canonical="https://www.arinox.ai/solutions"
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="pt-32 md:pt-40 pb-14 md:pb-16 border-b border-brand-border">
        <div className="container-wide">
          <Reveal>
            <p className="overline">Solutions</p>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold leading-[1.08] mb-6 max-w-3xl">
              Where private AI<br /><span className="text-gradient">goes to work.</span>
            </h1>
            <p className="lead max-w-2xl">
              Every solution here runs on the customer&rsquo;s own infrastructure — under their governance, on their
              data. Select a sector to see what we&rsquo;ve built and deployed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Sector board ──────────────────────────────────────── */}
      <div>
        {/* Sticky sector nav */}
        <nav
          aria-label="Sector navigation"
          className="sticky top-16 z-30 backdrop-blur-xl bg-brand-bg/92 border-b border-brand-border"
        >
          <div className="container-wide flex items-center gap-1.5 overflow-x-auto scrollbar-none py-2.5">
            {sectors.map(({ id, label }, i) => {
              const Icon = sectorIcons[id];
              return (
                <button
                  key={id}
                  onClick={() => setActiveSector(id)}
                  aria-pressed={activeSector === id}
                  className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-all ${
                    activeSector === id
                      ? 'bg-brand-primary text-white'
                      : 'text-brand-muted hover:text-brand-text hover:bg-black/[0.04]'
                  }`}
                >
                  <span className={`text-[11px] font-bold ${activeSector === id ? 'text-white/70' : 'text-brand-subtle'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {label}
                  <Icon size={14} strokeWidth={2} />
                </button>
              );
            })}
          </div>
        </nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSector}
            id={current.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="py-14 md:py-20 scroll-mt-32"
          >
            <div className="container-wide">
              {/* Sector header */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-10">
                {(() => {
                  const Icon = sectorIcons[current.id];
                  return (
                    <div className="w-11 h-11 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                      <Icon size={20} strokeWidth={1.8} className="text-brand-primary" />
                    </div>
                  );
                })()}
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-extrabold">{current.label}</h2>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-brand-subtle mt-0.5" style={{ fontFamily: 'Manrope' }}>
                    {current.regHook}
                  </p>
                </div>
                <span className="sm:ml-auto chip">Sovereign deployment</span>
              </div>

              {/* Case cards */}
              <div className="grid md:grid-cols-3 gap-4 items-stretch">
                {current.useCases.map((uc, i) => (
                  <CaseCard key={uc.title} uc={uc} i={i} />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Platform band ─────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-brand-surface border-y border-brand-border">
        <div className="container-wide">
          <SectionHead
            overline="The substrate"
            title="One platform. Every deployment."
            lead="CommandCore and the KOGO agentic layer run beneath every solution on this page — whether you're triaging intelligence in a classified facility or forecasting demand on a factory floor."
            align="center"
            className="mb-10"
          />

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {tiers.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.06}>
                <div className={`card card-hover p-6 h-full ${t.highlight ? 'border-brand-primary/40' : ''}`}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary mb-2" style={{ fontFamily: 'Manrope' }}>
                    {t.name}
                  </p>
                  <p className="font-display font-bold text-xl mb-1">{t.tagline}</p>
                  <p className="text-[13px] text-brand-muted leading-relaxed">{t.desc}</p>
                  {t.highlight && (
                    <span className="chip mt-3">Most deployed</span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="card p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-5">
              <div className="flex-1">
                <span className="chip mb-2">KOGO OS</span>
                <h3 className="font-display font-bold text-[16px] mb-1">Built-in agentic OS</h3>
                <p className="text-[13.5px] text-brand-muted leading-relaxed">
                  Agent Builder · Agent Store · Agentic Mesh orchestration · guardrails · red-teaming · 500+ connectors — all running on your hardware, never on ours.
                </p>
              </div>
              <Link to="/commandcore" className="btn btn-outline shrink-0">
                See CommandCore specs <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="band-ink">
        <div className="container-wide py-20 text-center max-w-3xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold leading-[1.15] mb-5">
              Start with a problem.<br />We’ll build the sovereign solution.
            </h2>
            <p className="lead mb-8" style={{ color: 'rgba(242,239,233,0.72)' }}>
              A focused call where we map your sector&rsquo;s constraints to a concrete deployment — zero jargon, zero commitment.
            </p>
            <Link to="/contact" className="btn btn-on-dark">
              Request a demo <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Solutions;
