import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Landmark, Activity, Settings2, Shield, Globe, ArrowRight, ChevronDown, ShoppingCart } from 'lucide-react';
import SEO from '../components/ui/SEO';
import DemoLink from '../components/ui/DemoLink';
import MouseTilt from '../components/ui/MouseTilt';
import FloatingOrbs from '../components/ui/FloatingOrbs';
// ── Sector + use-case data ─────────────────────────────────────────
const sectors = [
  {
    id: 'bfsi',
    label: 'BFSI',
    regHook: 'RBI · SEBI · data residency',
    Icon: Landmark,
    useCases: [
      {
        title: 'Call & Interaction Analyzer',
        problem: 'QA teams manually review less than 5% of calls. Compliance gaps accumulate undetected across branches.',
        agent: 'VoiceIQ™ Sovereign Agent',
        agentNote: 'Air-gapped · RBI data-residency compliant',
        outcome: '23% fewer compliance incidents in a 90-day pilot across 12 branches.',
        metric: '−23% incidents',
      },
      {
        title: 'Incentive & Payroll Intelligence',
        problem: 'Manual incentive calculation across thousands of field agents takes weeks and generates payment disputes.',
        agent: 'IncentiveOps™ Agent',
        agentNote: 'On-prem · immutable audit trail',
        outcome: '80% faster payout cycles. Zero disputes over a 6-month production run.',
        metric: '80% faster',
      },
      {
        title: 'Tender Intelligence (TIAR)',
        problem: 'High-value government tenders missed due to fragmented portal monitoring and delayed alerts.',
        agent: 'TIAR™ Agent',
        agentNote: 'Sovereign · no data leaves premises',
        outcome: '2.4× bid win rate sustained over a 12-month deployment.',
        metric: '2.4× wins',
      },
    ],
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    regHook: 'HIPAA · DPDP · clinical sovereignty',
    Icon: Activity,
    useCases: [
      {
        title: 'Patient Triage & Coordination',
        problem: '40-minute average wait times. Front-desk staff overwhelmed with routine appointment and follow-up queries.',
        agent: 'CarePath™ Agent',
        agentNote: 'On-prem · HIPAA/DPDP compliant',
        outcome: '60% reduction in triage time. Doctor-patient load shifted to AI first-touch.',
        metric: '−60% wait',
      },
      {
        title: 'Claims Processing',
        problem: 'Manual claims require 3 FTEs per 100 submissions. Re-submission errors compound cost and cycle time.',
        agent: 'ClaimsBridge™ Agent',
        agentNote: 'Air-gapped · EMR and billing system integration',
        outcome: '2× claims processed per FTE. Re-submission rate halved.',
        metric: '2× throughput',
      },
      {
        title: 'Knowledge Continuity',
        problem: 'Clinical protocols and specialist know-how lost on every staff turnover cycle.',
        agent: 'MedMemory™ Agent',
        agentNote: 'Sovereign · zero PHI leaves facility',
        outcome: 'Zero protocol loss on staff rotation. Onboarding time cut 65%.',
        metric: '0 knowledge loss',
      },
    ],
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    regHook: 'Industry 4.0 · IP protection · OT security',
    Icon: Settings2,
    useCases: [
      {
        title: 'Inventory & Demand Forecasting',
        problem: 'Inventory surplus costs ₹2 Cr/month. Stockouts disrupt production schedules and SLAs.',
        agent: 'DemandSense™ Agent',
        agentNote: 'On-prem · ERP/SCADA/MES integration',
        outcome: '38% inventory reduction. 99.2% demand forecast accuracy over 6 months.',
        metric: '−38% inventory',
      },
      {
        title: 'Predictive Maintenance',
        problem: 'Reactive repairs causing 180+ unplanned downtime hours per year across the plant floor.',
        agent: 'PlantGuard™ Agent',
        agentNote: 'Edge-deployed · air-gapped OT network',
        outcome: '40% reduction in unplanned downtime.',
        metric: '−40% downtime',
      },
      {
        title: 'Production Scheduling',
        problem: 'Disconnected ERP, MES, and SCADA systems create scheduling bottlenecks and idle capacity.',
        agent: 'FloorOps™ Agent',
        agentNote: 'Sovereign · legacy SCADA compatible',
        outcome: '22% throughput increase in a 90-day pilot.',
        metric: '+22% output',
      },
    ],
  },
  {
    id: 'defence',
    label: 'Defence',
    regHook: 'Classified networks · air-gapped · MoD',
    Icon: Shield,
    useCases: [
      {
        title: 'Situational Awareness',
        problem: 'Intelligence silos across branches block real-time decision-making and coordinated response.',
        agent: 'DGIS Sovereign Agent',
        agentNote: 'Air-gapped · open-source LLM · zero cloud dependency',
        outcome: '−82% alert-triage time. Deployed with Indian Army (DGIS).',
        metric: '−82% triage',
      },
      {
        title: 'Geospatial & Sentinel Analysis',
        problem: 'Manual satellite data processing takes days. Terrain analysis bottlenecks field operations.',
        agent: 'GeoSense™ Agent',
        agentNote: 'Edge-deployed · classified-network safe',
        outcome: '6× faster terrain analysis. Automated change-detection at scale.',
        metric: '6× faster',
      },
      {
        title: 'Logistics & Asset Intelligence',
        problem: 'Manual asset tracking for critical equipment creates accountability and audit gaps.',
        agent: 'SupplyOps™ Agent',
        agentNote: 'Sovereign · full audit trail · no cloud',
        outcome: '95% asset location accuracy. Zero manual reconciliation.',
        metric: '95% accuracy',
      },
    ],
  },
  {
    id: 'government',
    label: 'Government',
    regHook: 'Sovereign mandate · data localisation · audit trail',
    Icon: Globe,
    useCases: [
      {
        title: 'Tender Intelligence (TIAR)',
        problem: 'Departments missing ₹100 Cr+ tenders due to unmonitored portals and fragmented alert systems.',
        agent: 'TIAR™ Sovereign Agent',
        agentNote: 'On-prem · stays inside government network',
        outcome: '2.4× bid win rate. Tender alerts within 2 hours of publication.',
        metric: '2.4× wins',
      },
      {
        title: 'Policy & Knowledge Continuity',
        problem: 'Institutional knowledge erodes with every officer transfer. Policy continuity breaks down.',
        agent: 'PolicyMem™ Agent',
        agentNote: 'Air-gapped · full audit log · sovereign',
        outcome: 'Zero knowledge loss on rotation. 3× faster brief generation.',
        metric: '3× faster briefs',
      },
      {
        title: 'Public Service Analytics',
        problem: 'Disconnected citizen databases block data-driven policy design and cross-department anomaly detection.',
        agent: 'CivicIQ™ Agent',
        agentNote: 'Sovereign · data-localisation compliant',
        outcome: '3× faster policy reporting. Cross-department anomaly detection live.',
        metric: '3× faster reports',
      },
    ],
  },
  {
    id: 'fmcg',
    label: 'FMCG',
    regHook: 'Supply chain · demand planning · retail analytics',
    Icon: ShoppingCart,
    useCases: [
      {
        title: 'Demand Forecasting & Replenishment',
        problem: 'SKU-level forecasting is manual and fragmented, causing stockouts on fast-movers and dead stock on slow-movers simultaneously.',
        agent: 'DemandSense™ FMCG Agent',
        agentNote: 'On-prem · ERP/WMS integration · retailer feed support',
        outcome: '35% reduction in stockouts. 28% lower inventory carrying cost over 6 months.',
        metric: '−35% stockouts',
      },
      {
        title: 'Route-to-Market Intelligence',
        problem: 'Field sales teams operate without real-time visibility into distributor stock levels or secondary sales performance.',
        agent: 'RouteIQ™ Agent',
        agentNote: 'Edge-deployed · offline-capable · distributor portal sync',
        outcome: '18% increase in secondary sales. Beat target in 3 of 4 regions within 90 days.',
        metric: '+18% secondary sales',
      },
      {
        title: 'Shelf & Out-of-Stock Detection',
        problem: 'Identifying out-of-stock and planogram violations across thousands of retail outlets requires costly and slow field audits.',
        agent: 'ShelfAI™ Agent',
        agentNote: 'On-prem · image-model · retail data stays local',
        outcome: '40% faster OOS detection. Planogram compliance improved by 22% in pilot outlets.',
        metric: '−40% OOS detection time',
      },
    ],
  },
];

// ── Platform tiers ─────────────────────────────────────────────────
const platformTiers = [
  {
    name: 'CommandCORE S',
    capacity: 'Up to 10 agents',
    useCase: 'Team / edge deployment',
    specs: '16-core · 64 GB · compact form factor',
    highlight: false,
  },
  {
    name: 'CommandCORE M',
    capacity: 'Up to 50 agents',
    useCase: 'Department-level deployment',
    specs: '32-core · 128 GB · rack unit',
    highlight: true,
  },
  {
    name: 'CommandCORE XL',
    capacity: '100+ AI FTEs',
    useCase: 'Enterprise / cluster-scale',
    specs: 'Custom NVIDIA/Qualcomm · cluster-ready',
    highlight: false,
  },
];

// ── Social proof ────────────────────────────────────────────────────
const proofStats = [
  { value: '100k+', label: 'Tasks automated monthly', note: 'across live deployments' },
  { value: '~40%', label: 'Lower TCO vs cloud AI', note: 'CommandCORE deployments' },
  { value: '3', label: 'Tier-1 global partners', note: 'Hitachi · Acer · HPE' },
];


// ── TripletCard ────────────────────────────────────────────────────
const TripletCard = ({ uc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="h-full"
  >
    <MouseTilt className="glass-card rounded-2xl overflow-hidden h-full flex flex-col" intensity={6}>
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-brand-border/30">
        <span className="inline-flex items-center bg-brand-primary/15 text-brand-primary text-xs font-bold px-2.5 py-1 rounded-full">
          {uc.metric}
        </span>
        <h4 className="text-sm font-bold text-white mt-2.5 leading-snug">{uc.title}</h4>
      </div>

      {/* Triplet body */}
      <div className="px-5 pb-5 pt-4 flex flex-col gap-3 flex-1">
        {/* Problem */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-red-400/60 mb-1.5">Problem</p>
          <p className="text-xs text-brand-muted leading-relaxed">{uc.problem}</p>
        </div>

        {/* Connector */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-border/30 to-brand-border/40" />
          <span className="text-brand-primary/50"><ArrowRight className="w-3 h-3 shrink-0" /></span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-brand-border/30 to-brand-border/40" />
        </div>

        {/* Agent */}
        <div className="bg-brand-primary/8 border border-brand-primary/20 rounded-xl px-4 py-3">
          <p className="text-xs font-bold text-brand-primary">{uc.agent}</p>
          <p className="text-[11px] text-brand-muted/75 mt-0.5 leading-snug">{uc.agentNote}</p>
        </div>

        {/* Connector */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-border/30 to-brand-border/40" />
          <span className="text-brand-primary/50"><ArrowRight className="w-3 h-3 shrink-0" /></span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-brand-border/30 to-brand-border/40" />
        </div>

        {/* Outcome */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/60 mb-1.5">Outcome</p>
          <p className="text-xs text-white font-medium leading-relaxed">{uc.outcome}</p>
        </div>
      </div>
    </MouseTilt>
  </motion.div>
);

// ── Main ───────────────────────────────────────────────────────────
const Solutions = () => {
  const [activeSector, setActiveSector] = useState(null);
  const panelRef = useRef(null);
  const current = sectors.find(s => s.id === activeSector);

  const handleSectorClick = (id) => {
    if (activeSector === id) {
      setActiveSector(null);
    } else {
      setActiveSector(id);
      setTimeout(() => {
        panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
    }
  };

  return (
    <>
      <SEO
        title="AI Solutions — Sovereign AI for Regulated Industries"
        description="Purpose-built sovereign AI solutions for BFSI, Healthcare, Manufacturing, Defence, and Government. Deployed on-premises on CommandCORE™ with KOGO OS — air-gapped and audit-ready from day one."
        canonical="https://www.arinox.ai/solutions"
      />

      {/* Hero */}
      <section className="relative pt-40 pb-20 grid-bg overflow-hidden">
        <FloatingOrbs preset="warm" />
        <div className="orb w-[500px] h-[500px] bg-brand-primary/8 top-0 left-1/4 -translate-y-1/3" />
        <div className="container-wide relative">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs tracking-widest uppercase text-brand-primary mb-4"
          >
            Solutions
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-display font-bold text-white mb-5 max-w-3xl leading-tight"
          >
            Outcomes by sector.<br />
            <span className="text-gradient">Sovereign by design.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-brand-muted text-sm md:text-base max-w-xl leading-relaxed mb-8"
          >
            Every solution runs on your hardware, under your governance, with your data never leaving your premises. Select your sector to see what we've built and deployed.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <DemoLink className="inline-flex px-7 py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-sm hover:opacity-90 transition-opacity">
              Book a Demo →
            </DemoLink>
          </motion.div>
        </div>
      </section>

      {/* Sector selector + use cases */}
      <section className="section-padding relative overflow-hidden">
        <FloatingOrbs preset="cool" />
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="text-xs tracking-widest uppercase text-brand-primary mb-3">By Industry</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
              Find your sector. <span className="text-gradient">See the deployment.</span>
            </h2>
            <p className="text-sm text-brand-muted max-w-lg mx-auto">
              Each use case is a real agent we've built or deployed — expressed as the problem it solves, the sovereign agent that runs, and what it delivered.
            </p>
          </div>

          {/* Sector cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-2">
            {sectors.map(({ id, label, regHook, Icon }) => (
              <button
                key={id}
                onClick={() => handleSectorClick(id)}
                className={`relative flex flex-col items-start gap-3 p-4 rounded-2xl border transition-all duration-200 text-left group
                  ${activeSector === id
                    ? 'border-brand-primary/60 bg-brand-primary/10 shadow-lg shadow-brand-primary/15'
                    : 'border-brand-border/40 bg-brand-surface/40 hover:border-brand-primary/30 hover:bg-brand-surface/70'
                  }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${
                  activeSector === id
                    ? 'text-brand-primary bg-brand-primary/20'
                    : 'text-brand-muted/60 bg-brand-border/15 group-hover:text-brand-primary/70 group-hover:bg-brand-primary/10'
                }`}>
                  <Icon />
                </div>
                <div className="flex-1 pr-4">
                  <p className="text-sm font-bold text-white leading-tight">{label}</p>
                  <p className="text-[10px] text-brand-muted/55 mt-1 leading-tight">{regHook}</p>
                </div>
                <div className={`absolute top-3.5 right-3.5 transition-transform duration-300 ${activeSector === id ? 'text-brand-primary rotate-180' : 'text-brand-muted/30'}`}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>

          {/* Use cases panel */}
          <div ref={panelRef}>
            <AnimatePresence mode="wait">
              {current ? (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="pt-6"
                >
                  {/* Regulatory hook banner */}
                  <div className="flex flex-wrap items-center gap-2 mb-6 px-1">
                    <span className="text-xs font-medium text-brand-primary bg-brand-primary/10 border border-brand-primary/20 px-3 py-1.5 rounded-full">
                      {current.regHook}
                    </span>
                    <span className="text-xs text-brand-muted">— sovereign deployment required for this sector</span>
                  </div>

                  {/* Triplet cards */}
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {current.useCases.map((uc, i) => (
                      <TripletCard key={uc.title} uc={uc} delay={i * 0.07} />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pt-10 text-center"
                >
                  <p className="text-sm text-brand-muted/40">Select a sector above to see deployed use cases</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Platform band */}
      <section className="py-20 bg-brand-surface border-y border-brand-border/25 relative overflow-hidden">
        <div className="orb w-[600px] h-[600px] bg-brand-primary/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="container-wide relative">
          <div className="text-center mb-10">
            <p className="text-xs tracking-widest uppercase text-brand-muted mb-3">The substrate</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
              One platform. <span className="text-gradient">Every deployment.</span>
            </h2>
            <p className="text-sm text-brand-muted max-w-xl mx-auto leading-relaxed">
              CommandCORE™ and KOGO OS run beneath every solution on this page — whether you're triaging intelligence in a classified facility or forecasting demand on a factory floor.
            </p>
          </div>

          {/* Hook stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center gap-3 bg-brand-primary/8 border border-brand-primary/20 rounded-2xl px-5 py-3.5">
              <span className="text-2xl font-bold text-gradient">~40%</span>
              <span className="text-sm text-white">lower TCO than cloud AI</span>
            </div>
            <div className="flex items-center gap-3 bg-brand-primary/8 border border-brand-primary/20 rounded-2xl px-5 py-3.5">
              <Shield className="w-4 h-4 text-brand-primary shrink-0" />
              <span className="text-sm text-white">Air-gapped · audit-ready from day one</span>
            </div>
          </div>

          {/* CommandCORE tiers */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {platformTiers.map((tier) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`glass-card rounded-2xl p-6 ${tier.highlight ? 'border border-brand-primary/35 shadow-lg shadow-brand-primary/10' : ''}`}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-2">{tier.name}</p>
                <p className="text-xl font-bold text-white mb-1">{tier.capacity}</p>
                <p className="text-xs text-brand-muted mb-4">{tier.useCase}</p>
                <p className="text-[11px] text-brand-muted/50 leading-relaxed">{tier.specs}</p>
                {tier.highlight && (
                  <span className="inline-block mt-3 text-[10px] font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">
                    Most deployed
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* KOGO OS callout */}
          <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">KOGO OS™</span>
              <h3 className="text-white font-bold text-base mt-1 mb-1.5">Full-stack agentic operating system</h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                LLMOps · Swarm Orchestration · Agent Registry · Memory Layer — all running on your hardware, never on ours.
              </p>
            </div>
            <Link
              to="/commandcore"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-brand-primary/35 text-brand-primary text-sm font-medium hover:bg-brand-primary/10 transition-colors"
            >
              See CommandCORE specs <ArrowRight className="w-3 h-3 shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="section-padding relative overflow-hidden">
        <FloatingOrbs preset="default" />
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="text-xs tracking-widest uppercase text-brand-primary mb-3">Proof</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
              Deployed. <span className="text-gradient">Measured. Trusted.</span>
            </h2>
          </div>

          {/* Hero pilot stat */}
          <MouseTilt className="glass-card rounded-2xl p-8 md:p-10 text-center mb-6 border border-brand-primary/15" intensity={4}>
            <p className="text-5xl md:text-6xl font-display font-bold text-gradient mb-2">−82%</p>
            <p className="text-white font-medium mb-2">alert-triage time</p>
            <p className="text-sm text-brand-muted">Indian Army (DGIS) · air-gapped sovereign deployment</p>
          </MouseTilt>

          {/* Stats grid */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {proofStats.map(({ value, label, note }) => (
              <div key={label} className="glass-card rounded-2xl p-5 text-center">
                <p className="text-2xl font-bold text-gradient mb-1">{value}</p>
                <p className="text-sm text-white font-medium mb-0.5">{label}</p>
                <p className="text-xs text-brand-muted">{note}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-brand-surface overflow-hidden">
        <div className="orb w-96 h-96 bg-brand-primary/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="container-wide text-center relative">
          <p className="text-xs tracking-widest uppercase text-brand-primary mb-4">Get Started</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-6">
            Start with a problem.<br />
            <span className="text-gradient">We'll build the sovereign solution.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <DemoLink className="inline-flex px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-sm hover:opacity-90 transition-opacity">
              Talk to an Expert →
            </DemoLink>
          </div>
          <p className="mt-3 text-xs text-brand-muted">
            A focused call where we map your sector's regulatory constraints to a concrete deployment — zero jargon, zero commitment.
          </p>
        </div>
      </section>
    </>
  );
};

export default Solutions;
