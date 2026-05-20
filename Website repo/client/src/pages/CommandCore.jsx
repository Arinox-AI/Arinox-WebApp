import { useRef } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import DemoLink from '../components/ui/DemoLink';
import MouseTilt from '../components/ui/MouseTilt';
import FloatingOrbs from '../components/ui/FloatingOrbs';
import commandcoreHeroImg from '../assets/commandcore.jpg';
import mSeriesImg from '../assets/M-series.jpg';
import mSeriesProImg from '../assets/m-series-pro.jpg';
import xlSeriesImg from '../assets/xl-series.jpg';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24, rotateX: 15 },
  whileInView: { opacity: 1, y: 0, rotateX: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

/* ── Feature icons ─────────────────────────────────── */
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const ZapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const CpuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" />
    <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" />
  </svg>
);
const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </svg>
);
const AuditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
  </svg>
);
const MeshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
    <line x1="12" y1="7" x2="5" y2="17" /><line x1="12" y1="7" x2="19" y2="17" /><line x1="7" y1="19" x2="17" y2="19" />
  </svg>
);

const features = [
  { Icon: ShieldIcon,  title: 'Data Sovereignty',     desc: 'Your data never leaves your premises. Complete isolation from public cloud.' },
  { Icon: ZapIcon,     title: 'Deploy in Days',        desc: 'Platform live in 1–2 days. Custom agents in 14. Not months.' },
  { Icon: CpuIcon,     title: '80+ Pre-built Agents',  desc: 'No prototypes. 80+ enterprise-ready agents deployable today.' },
  { Icon: LinkIcon,    title: 'Native Integration',    desc: 'Zero barriers. Works with your existing tech stack out of the box.' },
  { Icon: AuditIcon,   title: '100% Audit Coverage',   desc: 'Full transparency on every AI decision. Enterprise governance built in.' },
  { Icon: MeshIcon,    title: 'Multi-Agent Mesh',      desc: "True collaboration across specialized agents — KOGO's agentic mesh." },
];

/* ── Hardware tiers ─────────────────────────────────── */
const tiers = [
  {
    img: mSeriesImg,
    label: 'M-Series Entry',
    models: [
      { model: 'CommandCore M1', ram: '128 GB', gpu: '1× H100', storage: '4 TB NVMe',  useCase: 'Departmental AI' },
      { model: 'CommandCore M2', ram: '256 GB', gpu: '2× H100', storage: '8 TB NVMe',  useCase: 'Enterprise Teams' },
    ],
  },
  {
    img: mSeriesProImg,
    label: 'M-Series Pro',
    models: [
      { model: 'CommandCore M3', ram: '512 GB', gpu: '4× H100', storage: '16 TB NVMe', useCase: 'Multi-Tenant' },
      { model: 'CommandCore S1', ram: '768 GB', gpu: '8× H100', storage: '32 TB NVMe', useCase: 'AI Factories' },
    ],
  },
  {
    img: xlSeriesImg,
    label: 'XL Enterprise',
    models: [
      { model: 'CommandCore XL1', ram: '1.5 TB', gpu: '16× H100', storage: '64 TB NVMe', useCase: 'Sovereign AI DC' },
    ],
  },
];

const CommandCore = () => (
  <>
    <SEO
      title="CommandCore — Sovereign AI Platform | Arinox AI"
      description="CommandCore is Arinox AI's sovereign, private AI infrastructure for enterprises. On-premises AI compute with 80+ agents, full data sovereignty, and enterprise-grade security."
      canonical="https://www.arinox.ai/commandcore"
    />

    {/* ── Hero ──────────────────────────────────────────── */}
    <section className="relative pt-28 pb-16 grid-bg overflow-hidden">
      <FloatingOrbs preset="warm" />
      <div className="orb w-[500px] h-[500px] bg-brand-primary/10 top-0 right-0 translate-x-1/3 -translate-y-1/4" />
      <div className="orb w-[300px] h-[300px] bg-brand-accent/6 bottom-0 left-0 -translate-x-1/4" />

      <div className="container-wide relative grid lg:grid-cols-2 gap-6 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -32, rotateY: 14 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1000 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] text-brand-primary mb-5 border border-brand-primary/20 font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            Sovereign AI Platform
          </div>
          <h1 className="text-2xl md:text-[2rem] font-display font-bold text-white mb-3 leading-tight">
            Command<span className="text-gradient">Core</span>™
          </h1>
          <p className="text-sm text-brand-muted mb-3 leading-relaxed max-w-md">
            Private AI infrastructure that never compromises. Your data stays inside. Your AI scales without limits.
          </p>
          <p className="text-sm text-brand-muted mb-3 leading-relaxed max-w-md">
            Deploy on-premises with complete sovereignty — 80+ agents, full audit coverage, and enterprise-grade performance.
          </p>
          <p className="text-sm text-brand-muted mb-7 leading-relaxed max-w-md">
            Built for both infrastructure and solution delivery — including Avox voice agent experiences and the broader CommandCore agent ecosystem.
          </p>
          <div className="flex gap-3 flex-wrap">
            <DemoLink className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-sm hover:opacity-90 hover:shadow-xl hover:shadow-brand-primary/25 transition-all">
              Request a Demo
            </DemoLink>
            <a href="/contact" className="px-6 py-3 rounded-xl glass border border-brand-border text-white text-sm font-medium hover:border-brand-primary/50 transition-all">
              Download Brochure
            </a>
          </div>
        </motion.div>

        {/* Product image */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotateY: -20 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ perspective: 1200 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-2xl bg-brand-primary/10 blur-2xl scale-105 pointer-events-none" />
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.35 }}
            className="relative glass-card rounded-2xl overflow-hidden border border-brand-primary/20 max-w-md mx-auto"
          >
            <div className="h-80 overflow-hidden">
              <img
                src={commandcoreHeroImg}
                alt="CommandCore AI Infrastructure"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="eager"
              />
            </div>
            {/* Stats bar */}
            <div className="bg-brand-bg/85 backdrop-blur-md border-t border-brand-border/50 px-4 py-2.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-brand-muted">GPU Utilization</span>
                <span className="text-[10px] text-brand-primary font-bold">94.2%</span>
              </div>
              <div className="h-1 rounded-full bg-brand-border overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '94%' }}
                  transition={{ duration: 2, delay: 0.8 }}
                  className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-accent"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2 text-center">
                {[['75%', 'Faster'], ['100%', 'Audit'], ['80+', 'Agents']].map(([v, l]) => (
                  <div key={l}>
                    <div className="text-xs font-bold text-gradient">{v}</div>
                    <div className="text-[10px] text-brand-muted">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-2.5 -right-2.5 px-2.5 py-1 rounded-full bg-brand-primary text-white text-[10px] font-bold shadow-lg shadow-brand-primary/40"
          >
            On-Premises
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* ── Why CommandCore ───────────────────────────────── */}
    <section className="section-padding bg-brand-surface relative overflow-hidden">
      <FloatingOrbs preset="cool" />
      <div className="container-wide">
        <motion.div className="text-center mb-10" {...fadeUp()}>
          <p className="text-[11px] tracking-widest uppercase text-brand-primary mb-2 font-semibold">Why CommandCore</p>
          <h2 className="text-xl md:text-2xl font-display font-bold text-white">Enterprise-Ready. <span className="text-gradient">Now.</span></h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{ perspective: 1200 }}>
          {features.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24, rotateX: 22 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, rotateY: 9, rotateX: -5, scale: 1.04, z: 25, transition: { duration: 0.25 } }}
              style={{ transformStyle: 'preserve-3d' }}
              className="glass-card rounded-xl p-5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-3 group-hover:bg-brand-primary/20 transition-colors duration-300">
                <Icon />
              </div>
              <h3 className="text-white font-bold text-sm mb-1.5">{title}</h3>
              <p className="text-xs text-brand-muted leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Hardware Models ───────────────────────────────── */}
    <section className="section-padding relative overflow-hidden">
      <FloatingOrbs preset="default" />
      <div className="container-wide">
        <motion.div className="text-center mb-10" {...fadeUp()}>
          <p className="text-[11px] tracking-widest uppercase text-brand-primary mb-2 font-semibold">Hardware Models</p>
          <h2 className="text-xl md:text-2xl font-display font-bold text-white">Built for <span className="text-gradient">every scale.</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5" style={{ perspective: 1200 }}>
          {tiers.map(({ img, label, models }, ti) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 28, rotateX: 28 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: ti * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, rotateY: 9, rotateX: -5, scale: 1.03, z: 30, transition: { duration: 0.28 } }}
              style={{ transformStyle: 'preserve-3d' }}
              className="glass-card rounded-2xl overflow-hidden group"
            >
              {/* Image */}
              <div className="overflow-hidden h-60 bg-brand-bg flex items-center justify-center">
                <img
                  src={img}
                  alt={label}
                  className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Label */}
              <div className="px-4 pt-3 pb-1 border-b border-brand-border/50">
                <span className="text-[10px] font-bold tracking-widest uppercase text-brand-primary">{label}</span>
              </div>

              {/* Specs */}
              <div className="px-4 py-3 space-y-2.5">
                {models.map(({ model, ram, gpu, storage, useCase }) => (
                  <div key={model} className="text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-semibold">{model}</span>
                      <span className="px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px]">{useCase}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-[11px] text-brand-muted">
                      <span>{ram} RAM</span>
                      <span className="text-brand-accent">{gpu}</span>
                      <span>{storage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Trusted by ────────────────────────────────────── */}
    <section className="py-12 border-y border-brand-border">
      <div className="container-wide text-center">
        <motion.p className="text-[11px] tracking-widest uppercase text-brand-muted mb-6" {...fadeUp()}>
          Who trusts CommandCore
        </motion.p>
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {['Indian Army', 'Michelin', 'Caryn Health', 'Hewlett Packard Enterprise', 'Coforge', 'Tech Mahindra', 'Sun Life'].map((c, i) => (
            <motion.span
              key={c}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-3 py-1.5 glass rounded-lg text-xs text-brand-muted hover:text-white transition-colors"
            >
              {c}
            </motion.span>
          ))}
        </div>
        <motion.blockquote
          {...fadeUp(0.1)}
          className="text-base md:text-lg font-display font-bold text-white max-w-xl mx-auto"
        >
          "75–80% AI agent utilization from day one."
        </motion.blockquote>
      </div>
    </section>

    {/* ── CTA ───────────────────────────────────────────── */}
    <section className="relative py-20 overflow-hidden">
      <div className="orb w-80 h-80 bg-brand-primary/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="container-wide text-center relative">
        <motion.h2
          {...fadeUp()}
          className="text-xl md:text-2xl font-display font-bold text-white mb-3"
        >
          Start with a problem.<br /><span className="text-gradient">We'll build the solution.</span>
        </motion.h2>
        <motion.p {...fadeUp(0.08)} className="text-sm text-brand-muted mb-6">
          Your first agent delivers value today.
        </motion.p>
        <motion.div {...fadeUp(0.14)}>
          <DemoLink className="inline-flex px-7 py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-sm hover:opacity-90 hover:shadow-xl hover:shadow-brand-primary/25 transition-all">
            Request CommandCore Demo
          </DemoLink>
        </motion.div>
      </div>
    </section>
  </>
);

export default CommandCore;
