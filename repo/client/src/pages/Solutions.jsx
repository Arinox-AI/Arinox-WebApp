import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Landmark, HeartPulse, Factory, Radar, Globe, ArrowRight, ShoppingBasket, Shield, Check, ChevronDown } from 'lucide-react';
import SEO from '../components/ui/SEO';
import DemoLink from '../components/ui/DemoLink';
import MouseTilt from '../components/ui/MouseTilt';
import FloatingOrbs from '../components/ui/FloatingOrbs';
import GlyphIcon from '../components/ui/GlyphIcon';
import DeploymentMarquee from '../components/ui/DeploymentMarquee';

// ── Sector + use-case data ─────────────────────────────────────────
const sectors = [
  {
    id: 'bfsi',
    label: 'BFSI',
    regHook: 'RBI · SEBI · data residency',
    Icon: Landmark,
    accent: '255, 229, 139',
    useCases: [
      {
        title: 'Call & Interaction Analyzer',
        problem: 'QA teams manually review less than 5% of calls. Compliance gaps accumulate undetected across branches.',
        agent: 'VoiceIQ Sovereign Agent',
        agentNote: 'Air-gapped · RBI data-residency compliant',
        outcome: '23% fewer compliance incidents in a 90-day pilot across 12 branches.',
        metric: '−23% incidents',
        how: 'VoiceIQ ingests every branch and contact-center call stream on-premises. Speech-to-text runs inside your perimeter, then the agent transcribes, diarises, and scores each interaction against your compliance rulebook in near real time. Reviewers see flagged calls within minutes of hang-up, ranked by risk instead of by random sampling.',
        capabilities: [
          '100% call coverage with automatic risk scoring and severity ranking',
          'Compliance rulebooks mapped to RBI, SEBI, and internal policy',
          'Speaker diarisation, sentiment, and interruption detection',
          'Automated daily MIS reports to compliance and audit teams',
        ],
        integrations: 'Runs beside your existing telephony and call-recording stack; recordings never leave your network.',
      },
      {
        title: 'Incentive & Payroll Intelligence',
        problem: 'Manual incentive calculation across thousands of field agents takes weeks and generates payment disputes.',
        agent: 'IncentiveOps Agent',
        agentNote: 'On-prem · immutable audit trail',
        outcome: '80% faster payout cycles. Zero disputes over a 6-month production run.',
        metric: '80% faster',
        how: 'IncentiveOps reads incentive schemes, payout rules, and attendance data from your systems, computes payouts agent-by-agent, and produces a fully auditable computation trail. Disputed payouts are resolved by querying the computation log instead of re-deriving spreadsheets.',
        capabilities: [
          'Scheme-rule engine encoding slab, target, and clawback rules',
          'Per-agent computation trail with immutable audit log',
          'Anomaly detection on payouts before disbursal',
          'One-click disbursal files for your payroll or banking system',
        ],
        integrations: 'On-premises deployment; connects to ERP/HRMS and banking files without cloud dependency.',
      },
      {
        title: 'Tender Intelligence (TIAR)',
        problem: 'High-value government tenders missed due to fragmented portal monitoring and delayed alerts.',
        agent: 'TIAR Agent',
        agentNote: 'Sovereign · no data leaves premises',
        outcome: '2.4× bid win rate sustained over a 12-month deployment.',
        metric: '2.4× wins',
        how: 'TIAR continuously monitors the tender portals you nominate, classifies new tenders against your eligibility profile, and escalates qualified opportunities with bid/no-bid context. Historical win data is mined to sharpen pricing and eligibility positioning over time.',
        capabilities: [
          'Round-the-clock portal monitoring with alert latency measured in hours',
          'Eligibility matching against credentials, turnover, and past performance',
          'Bid/no-bid scoring with rationale captured for review',
          'Tender document summarisation with requirement extraction',
        ],
        integrations: 'Stays inside your premises; portal access is outbound-only with no data publication.',
      },
    ],
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    regHook: 'HIPAA · DPDP · clinical sovereignty',
    Icon: HeartPulse,
    accent: '26, 106, 255',
    useCases: [
      {
        title: 'Patient Triage & Coordination',
        problem: '40-minute average wait times. Front-desk staff overwhelmed with routine appointment and follow-up queries.',
        agent: 'CarePath Agent',
        agentNote: 'On-prem · HIPAA/DPDP compliant',
        outcome: '60% reduction in triage time. Doctor-patient load shifted to AI first-touch.',
        metric: '−60% wait',
        how: 'CarePath answers first-touch patient queries over voice and chat inside the hospital network, checks doctor availability from your scheduling system, books and reschedules appointments, and escalates red-flag symptoms to staff immediately. Every conversation is logged for clinical audit.',
        capabilities: [
          'Symptom-aware routing with red-flag escalation to nursing staff',
          'Appointment booking, rescheduling, and reminder orchestration',
          'Follow-up and no-show recovery workflows',
          'Full conversation log for clinical audit and review',
        ],
        integrations: 'On-premises; interfaces with HMS scheduling and telephony, zero PHI outside the facility.',
      },
      {
        title: 'Claims Processing',
        problem: 'Manual claims require 3 FTEs per 100 submissions. Re-submission errors compound cost and cycle time.',
        agent: 'ClaimsBridge Agent',
        agentNote: 'Air-gapped · EMR and billing system integration',
        outcome: '2× claims processed per FTE. Re-submission rate halved.',
        metric: '2× throughput',
        how: 'ClaimsBridge ingests claim forms, policy documents, and billing records, extracts and validates the data points, checks them against policy rules, and routes exceptions to human reviewers with the reasoning attached, from submission through adjudication support.',
        capabilities: [
          'Document extraction for claims forms, discharge summaries, and bills',
          'Policy-rule validation with discrepancy flagging',
          'Straight-through processing for clean claims, exception queues for the rest',
          'Duplicate and fraud-pattern checks before adjudication',
        ],
        integrations: 'Air-gapped; connects to EMR and billing systems on your network.',
      },
      {
        title: 'Knowledge Continuity',
        problem: 'Clinical protocols and specialist know-how lost on every staff turnover cycle.',
        agent: 'MedMemory Agent',
        agentNote: 'Sovereign · zero PHI leaves facility',
        outcome: 'Zero protocol loss on staff rotation. Onboarding time cut 65%.',
        metric: '0 knowledge loss',
        how: 'MedMemory converts protocols, SOPs, case notes, and senior-staff know-how into a governed, searchable knowledge base. New staff query it in natural language, and every answer cites its source document so clinical judgement stays verifiable.',
        capabilities: [
          'Protocol and SOP ingestion with version control',
          'Cited answers, every response linked to its source',
          'Onboarding packs generated per role and department',
          'Knowledge-gap reporting on recurring unanswered queries',
        ],
        integrations: 'Runs on-premises; zero PHI leaves the facility.',
      },
    ],
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    regHook: 'Industry 4.0 · IP protection · OT security',
    Icon: Factory,
    accent: '232, 89, 12',
    useCases: [
      {
        title: 'Inventory & Demand Forecasting',
        problem: 'Inventory surplus costs ₹2 Cr/month. Stockouts disrupt production schedules and SLAs.',
        agent: 'DemandSense Agent',
        agentNote: 'On-prem · ERP/SCADA/MES integration',
        outcome: '38% inventory reduction. 99.2% demand forecast accuracy over 6 months.',
        metric: '−38% inventory',
        how: 'DemandSense fuses historical consumption, order books, and seasonality from your ERP to forecast demand at SKU level, then converts forecasts into reorder points and safety stock per line. Planners review and approve; execution flows through your existing purchase workflow.',
        capabilities: [
          'SKU-level forecasts with confidence intervals and seasonality handling',
          'Automatic reorder-point and safety-stock recommendations',
          'Slow-mover and dead-stock identification with disposition suggestions',
          'Planner override with full version history of every forecast',
        ],
        integrations: 'On-prem; reads ERP/MES/SCADA data without cloud dependency.',
      },
      {
        title: 'Predictive Maintenance',
        problem: 'Reactive repairs causing 180+ unplanned downtime hours per year across the plant floor.',
        agent: 'PlantGuard Agent',
        agentNote: 'Edge-deployed · air-gapped OT network',
        outcome: '40% reduction in unplanned downtime.',
        metric: '−40% downtime',
        how: 'PlantGuard learns the normal vibration, temperature, and cycle signatures of each machine from your OT network, flags drift before failure, and issues work orders ranked by risk, all inside the air-gapped plant network.',
        capabilities: [
          'Per-machine anomaly baselining with drift detection',
          'Remaining-useful-life estimates ranked by production impact',
          'Work-order generation routed to your maintenance system',
          'Edge-deployed inference, air-gapped from IT',
        ],
        integrations: 'Runs at the edge on plant hardware; legacy SCADA and sensor streams supported.',
      },
      {
        title: 'Production Scheduling',
        problem: 'Disconnected ERP, MES, and SCADA systems create scheduling bottlenecks and idle capacity.',
        agent: 'FloorOps Agent',
        agentNote: 'Sovereign · legacy SCADA compatible',
        outcome: '22% throughput increase in a 90-day pilot.',
        metric: '+22% output',
        how: 'FloorOps builds the production schedule from live machine states, material availability, and order priorities pulled from ERP/MES, resolving conflicts automatically and re-planning in minutes when a line breaks down.',
        capabilities: [
          'Constraint-aware scheduling across machines, tools, and shifts',
          'Automatic re-planning on breakdowns or rush orders',
          'Bottleneck detection with shift-level throughput projections',
          'What-if scenario simulation before committing a plan',
        ],
        integrations: 'Sovereign deployment; compatible with legacy SCADA/MES versions.',
      },
    ],
  },
  {
    id: 'defence',
    label: 'Defence',
    regHook: 'Classified networks · air-gapped · MoD',
    Icon: Radar,
    accent: '255, 77, 46',
    useCases: [
      {
        title: 'Situational Awareness',
        problem: 'Intelligence silos across branches block real-time decision-making and coordinated response.',
        agent: 'DGIS Sovereign Agent',
        agentNote: 'Air-gapped · open-source LLM · zero cloud dependency',
        outcome: '−82% alert-triage time. Deployed with Indian Army (DGIS).',
        metric: '−82% triage',
        how: 'Deployed within the classified network, the DGIS agent fuses multi-source intelligence feeds into a single operational picture, triages alerts against context, and presents ranked, explainable summaries to decision-makers with no cloud dependency at any layer.',
        capabilities: [
          'Multi-source alert fusion and de-duplication',
          'Context-ranked triage with explainable rationale',
          'Natural-language querying of the operational picture',
          'Fully air-gapped; open-source LLMs only',
        ],
        integrations: 'Air-gapped deployment on sovereign hardware; zero external connectivity.',
      },
      {
        title: 'Geospatial & Sentinel Analysis',
        problem: 'Manual satellite data processing takes days. Terrain analysis bottlenecks field operations.',
        agent: 'GeoSense Agent',
        agentNote: 'Edge-deployed · classified-network safe',
        outcome: '6× faster terrain analysis. Automated change-detection at scale.',
        metric: '6× faster',
        how: 'GeoSense processes satellite and sentinel imagery on deployed edge hardware, detects changes against baseline scenes, and pushes analyst-ready overlays covering terrain, infrastructure, and activity deltas into the existing geospatial workflow.',
        capabilities: [
          'Automated change detection against baseline imagery',
          'Terrain and infrastructure feature extraction',
          'Time-series comparison across revisit cycles',
          'Edge inference on classified-network-safe hardware',
        ],
        integrations: 'Edge-deployed; outputs plug into existing GIS toolchains.',
      },
      {
        title: 'Logistics & Asset Intelligence',
        problem: 'Manual asset tracking for critical equipment creates accountability and audit gaps.',
        agent: 'SupplyOps Agent',
        agentNote: 'Sovereign · full audit trail · no cloud',
        outcome: '95% asset location accuracy. Zero manual reconciliation.',
        metric: '95% accuracy',
        how: 'SupplyOps builds a live, queryable ledger of critical assets covering location, custody, movement, and service state, reconciled automatically, with every custody change stamped into an immutable audit trail.',
        capabilities: [
          'Live asset registry with custody and movement tracking',
          'Automatic reconciliation eliminating manual stock-takes',
          'Service-state and maintenance-flag monitoring',
          'Immutable audit trail for accountability reviews',
        ],
        integrations: 'Sovereign, no-cloud deployment with full audit logging.',
      },
    ],
  },
  {
    id: 'government',
    label: 'Government',
    regHook: 'Sovereign mandate · data localisation · audit trail',
    Icon: Globe,
    accent: '77, 141, 255',
    useCases: [
      {
        title: 'Tender Intelligence (TIAR)',
        problem: 'Departments missing ₹100 Cr+ tenders due to unmonitored portals and fragmented alert systems.',
        agent: 'TIAR Sovereign Agent',
        agentNote: 'On-prem · stays inside government network',
        outcome: '2.4× bid win rate. Tender alerts within 2 hours of publication.',
        metric: '2.4× wins',
        how: 'TIAR watches the portals departments nominate around the clock, matches new tenders against departmental eligibility, and delivers classified alerts with requirement summaries, all inside the government network.',
        capabilities: [
          'Continuous portal monitoring with alert latency measured in hours',
          'Eligibility profiling against credentials and turnover thresholds',
          'Requirement extraction and document summarisation',
          'Bid-history analytics to strengthen positioning',
        ],
        integrations: 'On-premises within the government network; no data publication.',
      },
      {
        title: 'Policy & Knowledge Continuity',
        problem: 'Institutional knowledge erodes with every officer transfer. Policy continuity breaks down.',
        agent: 'PolicyMem Agent',
        agentNote: 'Air-gapped · full audit log · sovereign',
        outcome: 'Zero knowledge loss on rotation. 3× faster brief generation.',
        metric: '3× faster briefs',
        how: 'PolicyMem preserves institutional memory across officer transfers. Circulars, precedents, file-noting history, and departmental SOPs become a governed knowledge base that incoming officers query in natural language, with answers always cited to source.',
        capabilities: [
          'Circular, precedent, and file-noting ingestion with versioning',
          'Cited natural-language answers for incoming officers',
          'Brief and noting drafts generated from precedent',
          'Full audit log of every query and response',
        ],
        integrations: 'Air-gapped; operates entirely within government infrastructure.',
      },
      {
        title: 'Public Service Analytics',
        problem: 'Disconnected citizen databases block data-driven policy design and cross-department anomaly detection.',
        agent: 'CivicIQ Agent',
        agentNote: 'Sovereign · data-localisation compliant',
        outcome: '3× faster policy reporting. Cross-department anomaly detection live.',
        metric: '3× faster reports',
        how: 'CivicIQ unifies citizen-facing datasets into a governed analytical layer, surfaces cross-department anomalies, and turns natural-language questions into compliant reports, with data localisation enforced end to end.',
        capabilities: [
          'Cross-department dataset unification with governance controls',
          'Anomaly and leak detection across schemes',
          'Natural-language reporting for non-technical officers',
          'Data-localisation compliant by design',
        ],
        integrations: 'Sovereign deployment; citizen databases stay within premises.',
      },
    ],
  },
  {
    id: 'fmcg',
    label: 'FMCG',
    regHook: 'Supply chain · demand planning · retail analytics',
    Icon: ShoppingBasket,
    accent: '52, 211, 153',
    useCases: [
      {
        title: 'Demand Forecasting & Replenishment',
        problem: 'SKU-level forecasting is manual and fragmented, causing stockouts on fast-movers and dead stock on slow-movers simultaneously.',
        agent: 'DemandSense FMCG Agent',
        agentNote: 'On-prem · ERP/WMS integration · retailer feed support',
        outcome: '35% reduction in stockouts. 28% lower inventory carrying cost over 6 months.',
        metric: '−35% stockouts',
        how: 'DemandSense FMCG forecasts demand at SKU-location level from your sales history, distributor feeds, and promotions calendar, then converts forecasts into replenishment plans that respect warehouse capacity and MOQs. Planners approve; systems execute.',
        capabilities: [
          'SKU-location forecasts with promotion and seasonality effects',
          'Replenishment plans respecting MOQs and warehouse capacity',
          'Fast-mover stockout and slow-mover dead-stock alerts',
          'Planner overrides with full forecast version history',
        ],
        integrations: 'On-prem; connects to ERP/WMS and distributor feeds.',
      },
      {
        title: 'Route-to-Market Intelligence',
        problem: 'Field sales teams operate without real-time visibility into distributor stock levels or secondary sales performance.',
        agent: 'RouteIQ Agent',
        agentNote: 'Edge-deployed · offline-capable · distributor portal sync',
        outcome: '18% increase in secondary sales. Beat target in 3 of 4 regions within 90 days.',
        metric: '+18% secondary sales',
        how: 'RouteIQ syncs distributor portals and field data, even offline, into a live view of stock, coverage, and secondary sales, then tells field teams exactly where to act next: which beat, which distributor, which SKU.',
        capabilities: [
          'Distributor stock and secondary-sales visibility, updated continuously',
          'Offline-capable edge sync for field operations',
          'Beat and coverage planning with gap alerts',
          'Target tracking by region, distributor, and SKU',
        ],
        integrations: 'Edge-deployed; syncs distributor portals without cloud dependency.',
      },
      {
        title: 'Shelf & Out-of-Stock Detection',
        problem: 'Identifying out-of-stock and planogram violations across thousands of retail outlets requires costly and slow field audits.',
        agent: 'ShelfAI Agent',
        agentNote: 'On-prem · image-model · retail data stays local',
        outcome: '40% faster OOS detection. Planogram compliance improved by 22% in pilot outlets.',
        metric: '−40% OOS detection time',
        how: 'ShelfAI runs image models on field photographs to detect out-of-stocks, planogram violations, and share-of-shelf movement, converting what used to be a monthly audit into a daily, outlet-level signal.',
        capabilities: [
          'OOS and planogram-violation detection from field images',
          'Share-of-shelf tracking by SKU and category',
          'Outlet-level compliance scoring and audit prioritisation',
          'Image inference on-prem; retail imagery never uploaded externally',
        ],
        integrations: 'On-prem inference; integrates with field-force apps and retail data.',
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

const tickerItems = sectors.flatMap((s) =>
  s.useCases.map((uc) => ({ sector: s.label, agent: uc.agent, metric: uc.metric }))
);

// ── Metric parsing ─────────────────────────────────────────────────
const parseMetric = (metric = '') => {
  const m = metric.match(/^([~+−\-]?[\d.]+\s?[%×+]?)\s+(.+)$/);
  return m ? { value: m[1], label: m[2] } : { value: metric, label: '' };
};

const CountUp = ({ value }) => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const prefix = /^[+~−-]/.test(value) ? value[0] : '';
  const numeric = value.replace(/^[+~−-]/, '').replace(/[^0-9.]/g, '');
  const target = parseFloat(numeric);
  const hasNum = !isNaN(target);
  const decimals = target % 1 === 0 ? 0 : 1;
  const suffix = value.includes('%') ? '%' : value.includes('×') ? '×' : '';
  const [display, setDisplay] = useState(reduce || !inView ? target : 0);

  useEffect(() => {
    if (reduce || !inView || !hasNum) return undefined;
    let raf;
    const start = performance.now();
    const duration = 1100;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, hasNum, target, reduce]);

  const text = hasNum
    ? `${prefix}${decimals ? display.toFixed(1) : Math.round(display)}${suffix}`
    : value;

  return (
    <p ref={ref} className="text-4xl sm:text-5xl font-display font-bold text-gradient leading-none tracking-tight tabular-nums">
      {text}
    </p>
  );
};

// ── Sector glyph tile ──────────────────────────────────────────────
const SectorGlyph = ({ Icon, accent }) => (
  <GlyphIcon Icon={Icon} size="md" color={`rgb(${accent})`} />
);

// ── Case card ──────────────────────────────────────────────────────
const CaseCard = ({ uc, accent, i }) => {
  const [open, setOpen] = useState(false);
  const hasDetails = Boolean(uc.how || uc.capabilities?.length || uc.integrations);

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: 0.08 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="group glass-card rounded-2xl p-6 flex flex-col gap-3.5 transition-all duration-300 hover:border-brand-primary/30 hover:shadow-lg hover:shadow-brand-primary/10 hover:-translate-y-1"
    >
      <h4 className="text-base font-display font-bold text-white leading-snug">{uc.title}</h4>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-red-400/60 mb-1">Problem</p>
        <p className="text-xs text-brand-muted leading-relaxed">{uc.problem}</p>
      </div>
      <div
        className="rounded-xl px-4 py-2.5 border self-start"
        style={{
          backgroundColor: `rgba(${accent}, 0.08)`,
          borderColor: `rgba(${accent}, 0.22)`,
        }}
      >
        <p className="text-xs font-bold" style={{ color: `rgb(${accent})` }}>
          {uc.agent}
        </p>
        <p className="text-[11px] text-brand-muted/75 mt-0.5 leading-snug">{uc.agentNote}</p>
      </div>

      {hasDetails && (
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="self-start inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-primary hover:opacity-80 transition-opacity rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          How it works
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
      )}

      <AnimatePresence initial={false}>
        {open && hasDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-3.5 border-t border-brand-border/25 flex flex-col gap-3">
              {uc.how && (
                <p className="text-xs text-brand-muted leading-relaxed">{uc.how}</p>
              )}
              {uc.capabilities?.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1.5">Capabilities</p>
                  <ul className="flex flex-col gap-1.5">
                    {uc.capabilities.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-xs text-brand-muted leading-relaxed">
                        <span className="mt-1.5 h-1 w-1 rounded-full shrink-0" style={{ backgroundColor: `rgb(${accent})` }} />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {uc.integrations && (
                <p className="text-[11px] text-brand-muted/70 leading-snug">{uc.integrations}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/60 mb-1">Outcome</p>
        <p className="flex items-start gap-2 text-xs text-white font-medium leading-relaxed">
          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <span>{uc.outcome}</span>
        </p>
      </div>
    </motion.div>
  );
};

// ── Sector showcase panel ──────────────────────────────────────────
const SectorPanel = ({ sector }) => {
  const { Icon, accent } = sector;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative py-14 md:py-20 overflow-hidden bg-brand-surface/30"
    >
      {/* accent glow */}
      <div
        className="orb w-[560px] h-[560px] -top-40 -right-40 pointer-events-none"
        style={{ backgroundColor: `rgba(${accent}, 0.07)` }}
      />
      {/* ghost display text */}
      <span
        aria-hidden="true"
        className="text-ghost pointer-events-none select-none absolute top-4 right-4 md:right-10 text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-display font-bold leading-none whitespace-nowrap"
      >
        {sector.label}
      </span>

      <div className="container-wide relative">
        {/* panel header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-10 md:mb-12"
        >
          <SectorGlyph Icon={Icon} accent={accent} />
          <div>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight">
              {sector.label}
            </h3>
            <p className="text-[11px] uppercase tracking-widest text-brand-muted/70 mt-0.5">
              {sector.regHook}
            </p>
          </div>
          <span className="sm:ml-auto text-[10px] font-bold uppercase tracking-widest text-brand-primary border border-brand-primary/30 rounded-full px-3 py-1.5">
            Sovereign deployment
          </span>
        </motion.div>

        {/* stat band */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid sm:grid-cols-3 sm:divide-x divide-brand-border/25 rounded-2xl border border-brand-border/30 bg-brand-bg/40 backdrop-blur-sm mb-8 md:mb-10"
        >
          {sector.useCases.map((uc) => {
            const { value, label } = parseMetric(uc.metric);
            return (
              <div key={uc.title} className="px-6 py-6 md:py-8 border-t border-brand-border/20 sm:border-t-0 min-w-0">
                <CountUp value={value} />
                <p className="text-[11px] uppercase tracking-widest text-brand-muted/70 mt-3 leading-snug">{label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* case cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {sector.useCases.map((uc, i) => (
            <CaseCard key={uc.title} uc={uc} accent={accent} i={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ── Main ───────────────────────────────────────────────────────────
const Solutions = () => {
  const [activeSector, setActiveSector] = useState(sectors[0].id);
  const current = sectors.find((s) => s.id === activeSector);

  return (
    <>
      <SEO
        title="Case Studies | Sovereign AI for Regulated Industries"
        description="Sovereign AI case studies for BFSI, Healthcare, Manufacturing, Defence, Government, and FMCG. Deployed on-premises on CommandCORE with KOGO OS, air-gapped and audit-ready from day one."
        canonical="https://www.arinox.ai/solutions"
      />

      {/* Hero */}
      <section className="relative pt-40 pb-16 grid-bg overflow-hidden">
        <FloatingOrbs preset="warm" />
        <div className="orb w-[500px] h-[500px] bg-brand-primary/8 top-0 left-1/4 -translate-y-1/3" />
        <div className="container-wide relative">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs tracking-widest uppercase text-brand-primary mb-4"
          >
            Case Studies
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-display font-bold text-white mb-5 max-w-3xl leading-tight"
          >
            Case studies by sector.<br />
            <span className="text-gradient">Sovereign by design.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-brand-muted text-sm md:text-base max-w-xl leading-relaxed"
          >
            Every solution runs on your hardware, under your governance, with your data never leaving your premises. Select a sector from the board to see what we've built and deployed.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 mb-14"
          >
            <DemoLink className="inline-flex px-7 py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-sm hover:opacity-90 transition-opacity">
              Request Demo →
            </DemoLink>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <DeploymentMarquee
            items={tickerItems.map((t) => ({ title: t.sector, meta: t.agent, highlight: t.metric }))}
          />
        </motion.div>
      </section>

      {/* Sector board */}
      <div className="relative">
        {/* console nav */}
        <nav
          aria-label="Sector navigation"
          className="sticky top-16 z-30 backdrop-blur-xl bg-brand-bg/75 border-b border-brand-border/30"
        >
          <div className="container-wide flex items-center gap-1.5 overflow-x-auto scrollbar-none py-2.5">
            {sectors.map(({ id, label, Icon, accent }, i) => (
              <button
                key={id}
                onClick={() => setActiveSector(id)}
                aria-current={activeSector === id}
                className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary
                  ${activeSector === id
                    ? 'bg-brand-primary/15 text-brand-primary'
                    : 'text-brand-muted hover:text-white hover:bg-brand-surface'
                  }`}
              >
                <span className={activeSector === id ? 'text-brand-primary/70' : 'text-brand-muted/40'}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {label}
                <Icon
                  className={`w-3.5 h-3.5 shrink-0 transition-colors ${activeSector === id ? '' : 'text-brand-muted/50'}`}
                  style={activeSector === id ? { color: `rgb(${accent})` } : undefined}
                />
              </button>
            ))}
          </div>
        </nav>

        <AnimatePresence mode="wait">
          <SectorPanel key={activeSector} sector={current} />
        </AnimatePresence>
      </div>

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
              CommandCORE and KOGO OS run beneath every solution on this page, whether you're triaging intelligence in a classified facility or forecasting demand on a factory floor.
            </p>
          </div>

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

          <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">KOGO OS</span>
              <h3 className="text-white font-bold text-base mt-1 mb-1.5">Full-stack agentic operating system</h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                LLMOps · Swarm Orchestration · Agent Registry · Memory Layer, all running on your hardware, never on ours.
              </p>
            </div>
            <Link
              to="/commandcore"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-xl border border-brand-primary/35 text-brand-primary text-sm font-medium hover:bg-brand-primary/10 transition-colors"
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

          <MouseTilt className="glass-card rounded-2xl p-8 md:p-10 text-center mb-6 border border-brand-primary/15" intensity={4}>
            <p className="text-5xl md:text-6xl font-display font-bold text-gradient mb-2">−82%</p>
            <p className="text-white font-medium mb-2">alert-triage time</p>
            <p className="text-sm text-brand-muted">Indian Army (DGIS) · air-gapped sovereign deployment</p>
          </MouseTilt>

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
              Request Demo →
            </DemoLink>
          </div>
          <p className="mt-3 text-xs text-brand-muted">
            A focused call where we map your sector's regulatory constraints to a concrete deployment, zero jargon, zero commitment.
          </p>
        </div>
      </section>
    </>
  );
};

export default Solutions;
