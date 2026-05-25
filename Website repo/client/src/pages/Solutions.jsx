import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/ui/SEO';
import DemoLink from '../components/ui/DemoLink';
import MouseTilt from '../components/ui/MouseTilt';
import FloatingOrbs from '../components/ui/FloatingOrbs';
import kogoImg from '../assets/KOGO-WP.avif';
import commandcoreWpImg from '../assets/severeign-CommandCore-WP.avif';
import arinoxVoxImg from '../assets/ArinoxVOX-WP.avif';
import avoxImg from '../assets/AVOX.avif';

const stats = [
  { value: '80+', label: 'Pre-built Enterprise Agents' },
  { value: '48%', label: 'Lower TCO than Cloud AI' },
  { value: '82%', label: 'Cost Savings vs Human FTEs' },
  { value: '100k+', label: 'Tasks Automated Monthly' },
  { value: '70%', label: 'Cloud Storage Cost Savings' },
];

const products = [
  {
    id: 'kogo',
    tag: 'KOGO™',
    title: 'Agentic Platform',
    subtitle: 'Intelligence layer orchestrating, integrating, and governing enterprise AI agents.',
    image: kogoImg,
    capabilities: [
      { name: 'AgentSmith™ Builder', desc: 'No/low-code builder with 1,000+ integrations' },
      { name: 'AMP™ Protocol', desc: 'Mesh orchestration with memory, coordination, fallback' },
      { name: 'Enterprise Agent Store', desc: 'Pre-built systems for Finance, HR, SCM, IT, Support, Legal' },
      { name: 'Advanced Security', desc: 'RBAC, red teaming, prompt injection protection' },
    ],
    impact: [
      { value: '6×', label: 'Productivity Boost' },
      { value: '8×', label: 'Efficiency Gain' },
      { value: '95%', label: 'Error Reduction' },
      { value: '70%', label: 'Faster Time-to-Market' },
    ],
  },
  {
    id: 'commandcore',
    tag: 'CommandCORE™',
    title: 'Sovereign AI-in-a-Box',
    subtitle: 'Secure, sovereign AI-in-a-Box powering large-scale agentic systems.',
    image: commandcoreWpImg,
    capabilities: [
      { name: 'Custom AI Hardware', desc: 'Purpose-built systems with NVIDIA/Qualcomm configs for peak performance' },
      { name: 'KOGO AVOS™ OS', desc: 'Full-stack agentic OS with LLM Ops and Swarm Builder' },
      { name: 'Enterprise Agent Suite', desc: '100+ ready-to-deploy agents across core functions' },
      { name: 'Sovereign AI', desc: 'On-prem, private deployments with full data control' },
    ],
    impact: [
      { value: '100', label: 'AI FTE Capacity' },
      { value: '100k+', label: 'Tasks/Month' },
      { value: '48%', label: 'Lower TCO' },
      { value: '82.77%', label: 'Cost Savings' },
    ],
  },
  {
    id: 'vox',
    tag: 'ArinoxVox™',
    title: 'Intelligent Voice Agent',
    subtitle: 'Real-time, multilingual voice interface for natural AI interactions.',
    image: arinoxVoxImg,
    capabilities: [
      { name: 'Natural Conversations', desc: 'Context-aware NLP with interruption handling' },
      { name: 'Multi-Language Support', desc: 'Diverse languages, accents, and personalities' },
      { name: 'Enterprise Integration', desc: 'Connects with CRM, ticketing, databases' },
      { name: 'Flexible Deployment', desc: 'SaaS, PaaS, or on-premises' },
    ],
    impact: [
      { value: '24/7', label: 'Intelligent Availability' },
      { value: '1000s', label: 'Concurrent Calls' },
      { value: '85%+', label: 'Customer Satisfaction' },
      { value: 'Global', label: 'Localized Voice Models' },
    ],
  },
];

const industries = [
  {
    id: 'defense',
    icon: '🎯',
    title: 'Defense & Security',
    problem: 'Disconnected legacy systems prevent real-time decision-making and situational awareness.',
    solution: 'Edge-deployed AI agents querying legacy databases in natural language. Autonomous reasoning optimized for open-source LLMs. AI plugins compatible with military infrastructure.',
    impact: ['Enhanced situational awareness', 'Real-time strategic response', 'Human out-of-loop intelligence tasks', '−82% alert-triage time (Indian Army)'],
    client: 'Indian Army (DGIS)',
  },
  {
    id: 'banking',
    icon: '🏦',
    title: 'Banking',
    problem: 'Inefficient customer service, KYC processing, and backend operations.',
    solution: 'Auto-KYC, customer onboarding, AML & fraud detection, portfolio tracking, document analysis.',
    impact: ['Reduced processing time', 'Enhanced customer satisfaction', 'Regulatory compliance with ease'],
    client: 'Global Banks & NBFCs',
  },
  {
    id: 'insurance',
    icon: '📋',
    title: 'Insurance',
    problem: 'High manual effort in insurance claims lifecycle.',
    solution: 'Agents handle entire claims lifecycle from submission to payout, working across multiple legacy systems.',
    impact: ['70% faster claim settlement', 'Zero human intervention needed', 'Improved fraud detection'],
    client: 'Sunlife Insurance',
  },
  {
    id: 'healthcare',
    icon: '🏥',
    title: 'Healthcare',
    problem: 'Lack of unified, automated patient management systems.',
    solution: 'AI agents for patient triage, appointment setting, follow-ups. Real-time analytics from EMRs & clinical data. HIPAA-compliant on-prem deployment.',
    impact: ['Doctor-patient interaction offloaded', 'AI as first-line care coordinator', '2× claims processed per FTE'],
    client: 'Healthcare Enterprise',
  },
  {
    id: 'manufacturing',
    icon: '🏭',
    title: 'Manufacturing',
    problem: 'Downtime and inefficiencies due to reactive maintenance models.',
    solution: 'AI agents monitor machine health, detect anomalies, optimize production schedules, integrate across SCADA/ERP/MES.',
    impact: ['40% reduction in downtime', 'Leaner production workflows', 'Real-time plant floor insights'],
    client: 'Fortune 500 Manufacturers',
  },
  {
    id: 'technology',
    icon: '💻',
    title: 'Technology & SaaS',
    problem: 'Manual and fragmented DevOps practices.',
    solution: 'No-code orchestration agent marketplace. Automate server deployment, resource scaling, and monitoring.',
    impact: ['Reduced DevOps costs', '5,000+ SMEs already benefiting', 'Accelerated time-to-market'],
    client: 'Tech SaaS Companies',
  },
];

const Solutions = () => {
  const [active, setActive] = useState('defense');
  const current = industries.find(i => i.id === active);

  return (
    <>
      <SEO
        title="AI Solutions — Enterprise Agents, Voice AI & Cloud Optimization"
        description="Purpose-built AI solutions: KOGO™ agentic platform, CommandCORE™ sovereign AI, and ArinoxVox™ voice agent. Deploy AI across any industry — on-premises, cloud, or as a sovereign AI-in-a-box."
        canonical="https://www.arinox.ai/solutions"
      />

      {/* Hero */}
      <section className="relative pt-40 pb-20 grid-bg overflow-hidden">
        <FloatingOrbs preset="warm" />
        <div className="orb w-[500px] h-[500px] bg-brand-accent/8 top-0 left-1/4 -translate-y-1/3" />
        <div className="container-wide relative">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs tracking-widest uppercase text-brand-primary mb-4">Solutions</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-display font-bold text-white mb-4 max-w-3xl">
            Transform Your Enterprise with <span className="text-gradient">Purpose-Built AI Solutions</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-brand-muted text-sm md:text-base max-w-2xl leading-relaxed">
            From agentic platforms to voice automation to cloud storage optimization — discover the AI solutions that drive real transformation.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex gap-4 mt-8">
            <DemoLink className="inline-flex px-7 py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-sm hover:opacity-90 transition-opacity">
              Book a Demo →
            </DemoLink>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-brand-border/40 bg-brand-surface/60 backdrop-blur-sm">
        <div className="container-wide py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20, rotateX: 25 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                style={{ perspective: 800 }}
              >
                <p className="text-2xl md:text-3xl font-display font-bold text-gradient">{value}</p>
                <p className="text-xs text-brand-muted mt-1 leading-snug">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Overview */}
      <section className="section-padding relative overflow-hidden">
        <FloatingOrbs preset="cool" />
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase text-brand-primary mb-3">Product Suite</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">One exceptional <span className="text-gradient">AI Transformation Stack</span></h2>
            <p className="max-w-2xl mx-auto text-sm text-brand-muted leading-relaxed">
              From orchestration to execution, from voice interaction to infrastructure optimization — our products work seamlessly together to deliver true end-to-end AI transformation.
            </p>
          </div>

          <div className="space-y-8">
            {products.map(({ id, tag, title, subtitle, image, capabilities, impact }, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 80, damping: 16, delay: i * 0.1 }}
              >
              <MouseTilt className="glass-card rounded-2xl p-8" intensity={5} scaleOnHover={1.015}>
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Header + image */}
                  <div className="lg:col-span-1">
                    <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full mb-3">{tag}</span>
                    <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed mb-4">{subtitle}</p>
                    <img
                      src={image}
                      alt={tag}
                      className="w-full rounded-xl object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    {/* Impact grid */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {impact.map(({ value, label }) => (
                        <div key={label} className="bg-brand-surface/60 rounded-xl p-3 text-center">
                          <p className="text-lg font-bold text-gradient leading-none">{value}</p>
                          <p className="text-xs text-brand-muted mt-1">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div className="lg:col-span-2 flex flex-col justify-center">
                    <p className="text-xs tracking-widest uppercase text-brand-muted mb-4">Key Capabilities</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {capabilities.map(({ name, desc }) => (
                        <div key={name} className="flex gap-3">
                          <span className="text-brand-primary mt-0.5 shrink-0">▸</span>
                          <div>
                            <p className="text-white text-sm font-semibold">{name}</p>
                            <p className="text-brand-muted text-xs leading-relaxed mt-0.5">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </MouseTilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="section-padding relative overflow-hidden">
        <FloatingOrbs preset="default" />
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="text-xs tracking-widest uppercase text-brand-primary mb-3">Industry Solutions</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Your world. <span className="text-gradient">Our focus.</span></h2>
          </div>

          {/* Tab nav — layoutId sliding pill */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {industries.map(({ id, icon, title }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 overflow-hidden transition-colors duration-200 ${
                  active === id ? 'text-white' : 'glass border border-brand-border text-brand-muted hover:text-white'
                }`}
              >
                {active === id && (
                  <motion.div
                    layoutId="industryTabBg"
                    className="absolute inset-0 bg-brand-primary rounded-xl shadow-lg shadow-brand-primary/30"
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">{icon} {title}</span>
              </button>
            ))}
          </div>

          {/* Active panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24, rotateX: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, rotateX: -8, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 200, damping: 24 }}
              style={{ perspective: 1200 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              <MouseTilt className="glass-card rounded-2xl p-6 h-full" intensity={9}>
                <motion.p style={{ translateZ: 20 }} className="text-xs text-red-400 font-semibold mb-2">Problem</motion.p>
                <p className="text-brand-muted text-sm leading-relaxed">{current.problem}</p>
              </MouseTilt>
              <MouseTilt className="glass-card rounded-2xl p-6 h-full" intensity={9}>
                <motion.p style={{ translateZ: 20 }} className="text-xs text-brand-primary font-semibold mb-2">Solution</motion.p>
                <p className="text-brand-muted text-sm leading-relaxed">{current.solution}</p>
              </MouseTilt>
              <MouseTilt className="glass-card rounded-2xl p-6 h-full" intensity={9}>
                <motion.p style={{ translateZ: 20 }} className="text-xs text-brand-accent font-semibold mb-2">Impact</motion.p>
                <ul className="space-y-2">
                  {current.impact.map(i => <li key={i} className="text-sm text-brand-muted flex items-start gap-2"><span className="text-brand-accent mt-0.5">✓</span>{i}</li>)}
                </ul>
                <p className="text-xs text-brand-primary mt-4 font-medium">Client: {current.client}</p>
              </MouseTilt>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-brand-surface">
        <div className="orb w-96 h-96 bg-brand-primary/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="container-wide text-center relative">
          <p className="text-xs tracking-widest uppercase text-brand-primary mb-4">Get Started</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-6">
            Let's Transform Your Enterprise.<br /><span className="text-gradient">Start with a problem. We'll build the solution.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <DemoLink className="inline-flex px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-sm hover:opacity-90 transition-opacity">
              Talk to an Expert →
            </DemoLink>
          </div>
          <p className="mt-3 text-xs text-brand-muted">A quick call where we map out exactly where AI can cut costs or grow your business — zero jargon, zero commitment</p>
        </div>
      </section>
    </>
  );
};

export default Solutions;
