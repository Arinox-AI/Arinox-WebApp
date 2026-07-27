import { useRef, useState } from 'react';
import { commandCoreClients } from '../data/clients';
import { Shield, Zap, Cpu, Link2, ClipboardCheck, Network, Download, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import DemoLink from '../components/ui/DemoLink';
import MouseTilt from '../components/ui/MouseTilt';
import FloatingOrbs from '../components/ui/FloatingOrbs';
import AuthModal from '../components/ui/AuthModal';
import { useAuth } from '../hooks/useAuth.jsx';
import LogoGrid from '../components/ui/LogoGrid';
import commandcoreHeroImg from '../assets/commandcore.jpg';
import mSeriesImg from '../assets/M-series.jpg';
import mSeriesProImg from '../assets/m-series-pro.jpg';
import xlSeriesImg from '../assets/xl-series.jpg';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

const features = [
  { Icon: Shield,        title: 'Data Sovereignty',    desc: 'Your data never leaves your premises. Complete isolation from public cloud.' },
  { Icon: Link2,         title: 'Native Integration',   desc: 'Zero barriers. Works with your existing tech stack out of the box.' },
  { Icon: ClipboardCheck,title: '100% Audit Coverage',  desc: 'RBAC, red teaming, and full audit trails — for complete governance on every AI decision.' },
  { Icon: Network,       title: 'Agentic Workspace',    desc: "True collaboration across specialized agents in a unified agentic workspace." },
  { Icon: Cpu,           title: '80+ Pre-built Agents', desc: 'No prototypes. 80+ enterprise-ready agents deployable today.' },
  { Icon: Zap,           title: 'Deploy in Days',       desc: 'Platform live in 1–2 days. Custom agents in 7–14 days. Not months.' },
];

/* ── Hardware tiers ─────────────────────────────────── */
const tiers = [
  {
    id: 's',
    img: mSeriesImg,
    badge: 'CommandCore™ S',
    tagline: 'Agentic Edge AI',
    subtitle: 'Real-time AI at the Edge',
    accelerator: 'NVIDIA Jetson AGX Orin',
    bestFor: [
      'Video analytics & computer vision',
      'Autonomous systems & IoT AI',
      'Remote & tactical deployments',
      'Batch processing',
    ],
    specs: [
      { label: 'GPU',    value: '2048 CUDA cores · 64 Tensor cores · 275 INT8 TOPS' },
      { label: 'CPU',    value: 'Arm Cortex-A78AE · 12-core' },
      { label: 'Memory', value: 'Up to 64 GB LPDDR5 (~204 GB/s)' },
    ],
    profile: 'Rugged · low-power · air-gappable',
    highlight: false,
  },
  {
    id: 'm',
    img: mSeriesProImg,
    badge: 'CommandCore™ M',
    tagline: 'Blackwell Powered Agents',
    subtitle: 'Desktop AI Powerhouse',
    accelerator: 'NVIDIA Grace Blackwell GB10 Superchip',
    bestFor: [
      'Secure AI labs & R&D',
      'Local LLM inference (200B+ params)',
      'Department-level analytics',
      'Cloud-free simulation',
    ],
    specs: [
      { label: 'GPU',         value: 'Blackwell · 5th-gen Tensor · 4th-gen RT cores' },
      { label: 'Performance', value: 'Up to 1 PFLOP FP4 (≈405B dual-node via ConnectX)' },
      { label: 'Memory',      value: '128 GB unified CPU+GPU · up to 4 TB NVMe' },
    ],
    profile: 'Desktop sovereign AI · no cloud dependency',
    highlight: false,
  },
  {
    id: 'xl',
    img: xlSeriesImg,
    badge: 'CommandCore™ XL',
    tagline: 'Datacenter-Grade AI',
    subtitle: 'Mission-Critical Infrastructure',
    accelerator: '2× NVIDIA RTX PRO 6000 Blackwell',
    bestFor: [
      'Enterprise AI operations',
      'Large model inference',
      'Multi-agent orchestration',
      'Real-time intelligence',
    ],
    specs: [
      { label: 'GPU',    value: '2× RTX PRO 6000 Blackwell (Workstation Ed.)' },
      { label: 'CPU',    value: 'Intel Xeon w7-2575X · 22C/44T · up to 4.8 GHz' },
      { label: 'Memory', value: '192 GB DDR5-4800 ECC' },
      { label: 'Storage', value: '1 TB NVMe (OS) + 4 TB SATA (data)' },
    ],
    profile: 'Fully air-gapped · 2000W PSU · 3-yr warranty',
    highlight: true,
  },
];

const CommandCore = () => {
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  const handleDownload = () => {
    if (!user) { setShowAuth(true); return; }
    const a = document.createElement('a');
    a.href = '/commandcore-brochure.pdf';
    a.download = 'CommandCore-Brochure.pdf';
    a.click();
  };

  return (
  <>
    <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onSwitchToQR={() => {}} defaultMode="register" />
    <SEO
      title="CommandCore™ — Sovereign AI Infrastructure | Arinox AI"
      description="CommandCore™ is Arinox AI's sovereign, private AI infrastructure for enterprises. On-premises AI compute with 80+ agents, full data sovereignty, and enterprise-grade security."
      canonical="https://www.arinox.ai/commandcore"
    />

    {/* ── Hero ──────────────────────────────────────────── */}
    <section className="relative pt-28 pb-16 grid-bg overflow-hidden">
      <FloatingOrbs preset="warm" />
      <div className="orb w-[500px] h-[500px] bg-brand-primary/10 top-0 right-0 translate-x-1/3 -translate-y-1/4" />
      <div className="orb w-[300px] h-[300px] bg-brand-primary/6 bottom-0 left-0 -translate-x-1/4" />

      <div className="container-wide relative grid lg:grid-cols-2 gap-6 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] text-brand-primary mb-5 border border-brand-primary/20 font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            Sovereign AI Platform
          </div>
          <h1 className="text-2xl md:text-[2rem] font-display font-bold text-white mb-3 leading-tight">
            Command<span className="text-gradient">Core</span>™
          </h1>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
            <span className="text-brand-primary font-bold text-xs">100% AI</span>
            <span className="text-brand-border text-xs">·</span>
            <span className="text-brand-muted text-xs font-medium">0% Internet</span>
            <span className="text-brand-border text-xs">·</span>
            <span className="text-brand-muted text-xs font-medium">0 Tokens</span>
            <span className="text-brand-border text-xs">·</span>
            <span className="text-brand-muted text-xs font-medium">0 Cloud</span>
          </div>
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
            <button
              onClick={handleDownload}
              className="px-6 py-3 rounded-xl glass border border-brand-border text-brand-text text-sm font-medium hover:border-brand-primary/50 transition-all flex items-center gap-2"
            >
              <Download size={15} strokeWidth={2.2} />
              Download Brochure
            </button>
          </div>
        </motion.div>

        {/* Product image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
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
                  className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary"
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.04, transition: { duration: 0.25 } }}
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
          <h2 className="text-xl md:text-2xl font-display font-bold text-white">Three tiers. <span className="text-gradient">One sovereign stack.</span></h2>
          <p className="text-sm text-brand-muted mt-2 max-w-xl mx-auto">From edge deployments to datacenter-grade AI — all running KOGO OS, all air-gappable, all yours.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 items-start">
          {tiers.map((tier, ti) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: ti * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
              className={`glass-card rounded-2xl overflow-hidden group relative ${tier.highlight ? 'border border-brand-primary/40 shadow-xl shadow-brand-primary/10' : ''}`}
            >
              {/* Featured badge */}
              {tier.highlight && (
                <div className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-brand-primary text-white text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-brand-primary/40">
                  Featured
                </div>
              )}

              {/* Product image */}
              <div className="h-48 bg-brand-bg overflow-hidden flex items-center justify-center">
                <img
                  src={tier.img}
                  alt={tier.badge}
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Header */}
              <div className="px-5 pt-4 pb-3 border-b border-brand-border/40">
                <p className="text-[10px] font-bold tracking-widest uppercase text-brand-primary mb-1">{tier.badge}</p>
                <h3 className="text-white font-bold text-base leading-tight">{tier.tagline}</h3>
                <p className="text-brand-muted text-xs mt-0.5 mb-2">{tier.subtitle}</p>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-brand-muted/60 bg-brand-surface/60 border border-brand-border/40 px-2.5 py-1 rounded-full leading-none">
                  <Cpu size={10} className="shrink-0" />
                  {tier.accelerator}
                </span>
              </div>

              {/* Best For */}
              <div className="px-5 py-3 border-b border-brand-border/40">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/50 mb-2">Best For</p>
                <ul className="space-y-1.5">
                  {tier.bestFor.map(item => (
                    <li key={item} className="flex items-start gap-2 text-xs text-brand-muted leading-snug">
                      <ChevronRight size={12} strokeWidth={2} className="text-brand-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specs */}
              <div className="px-5 py-3 border-b border-brand-border/40">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/50 mb-2">Specs</p>
                <div className="space-y-2">
                  {tier.specs.map(({ label, value }) => (
                    <div key={label} className="flex gap-2">
                      <span className="text-[10px] text-brand-primary/80 uppercase tracking-wider font-semibold w-24 shrink-0 pt-px">{label}</span>
                      <span className="text-[11px] text-brand-muted leading-snug">{value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-brand-muted/40 mt-3 leading-snug">{tier.profile}</p>
              </div>

              {/* CTA */}
              <div className="px-5 py-4">
                <DemoLink className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  tier.highlight
                    ? 'bg-brand-primary text-white hover:opacity-90'
                    : 'text-brand-primary border border-brand-primary/40 hover:bg-brand-primary/20 hover:border-brand-primary/60'
                }`}>
                  Learn More <ArrowRight size={13} />
                </DemoLink>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Trusted by ────────────────────────────────────── */}
    <section className="py-16 sm:py-20 border-y border-brand-border relative overflow-hidden">
      <div className="orb w-[350px] h-[350px] bg-brand-primary/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="container-wide text-center relative">
        <motion.p className="text-[11px] tracking-widest uppercase text-brand-muted mb-10" {...fadeUp()}>
          Who trusts CommandCore
        </motion.p>
        <motion.div {...fadeUp(0.05)} className="max-w-5xl mx-auto">
          <LogoGrid items={commandCoreClients} />
        </motion.div>
        <motion.blockquote
          {...fadeUp(0.1)}
          className="text-base md:text-lg font-display font-bold text-white max-w-xl mx-auto mt-10"
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
};

export default CommandCore;
