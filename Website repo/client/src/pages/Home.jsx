import { useEffect, useRef } from 'react';
import { Landmark, ShieldCheck, Building2, Scale, Activity, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import DemoLink from '../components/ui/DemoLink';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import ThreeScene from '../components/ui/ThreeScene';
import SEO from '../components/ui/SEO';
import MouseTilt from '../components/ui/MouseTilt';
import FloatingOrbs from '../components/ui/FloatingOrbs';
import ajayPhoto from '../assets/Ajay-Kharbanda-CEO-of-Arinox-AI.png';
import chytraPhoto from '../assets/DrChytraAnand.jpg';
import udayPhoto from '../assets/Uday bhaskar.png';
import angadPhoto from '../assets/Angad-Ahluwalia-Chief-Spokesperson-Arinox-AI.jpeg';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* ─── Animation variants ────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36, rotateX: 16 },
  visible: (i = 0) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { type: 'spring', stiffness: 80, damping: 16, delay: i * 0.1 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88, y: 16, rotateX: 12 },
  visible: { opacity: 1, scale: 1, y: 0, rotateX: 0, transition: { type: 'spring', stiffness: 100, damping: 16 } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -50, rotateY: 14 },
  visible: { opacity: 1, x: 0, rotateY: 0, transition: { type: 'spring', stiffness: 80, damping: 16 } },
};

const slideRight = {
  hidden: { opacity: 0, x: 50, rotateY: -14 },
  visible: { opacity: 1, x: 0, rotateY: 0, transition: { type: 'spring', stiffness: 80, damping: 16 } },
};

const popIn = {
  hidden: { opacity: 0, scale: 0.75, y: 6 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 14, delay: i * 0.07 },
  }),
};

/* Spring-stagger container for card grids */
const springGrid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const springCard = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 90, damping: 16 } },
};

/* ─── Why card icons ─────────────────────────────────────── */
const ShieldCheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);
const RefreshCwIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
    <path d="M8 16H3v5"/>
  </svg>
);
const CpuChipIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="7" width="10" height="10" rx="1"/>
    <path d="M7 9H4M7 12H4M7 15H4M17 9h3M17 12h3M17 15h3M9 7V4M12 7V4M15 7V4M9 17v3M12 17v3M15 17v3"/>
  </svg>
);
const NetworkIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
    <path d="M12 7v4M12 11l-5.5 6M12 11l5.5 6"/>
  </svg>
);

const industryCards = [
  { Icon: Landmark,    name: 'Banking & Finance', desc: 'Capital markets & compliance AI',   color: '#3b82f6', img: '/industries/legal.jpeg'      },
  { Icon: ShieldCheck, name: 'Defence & Army',     desc: 'Sovereign military AI systems',    color: '#ef4444', img: '/industries/defence.jpeg'    },
  { Icon: Building2,   name: 'Government',          desc: 'Public sector intelligence',      color: '#10b981', img: '/industries/government.jpeg' },
  { Icon: Scale,       name: 'Legal',               desc: 'AI-assisted legal intelligence',  color: '#8b5cf6', img: '/industries/banking.jpeg'    },
  { Icon: Activity,    name: 'Healthcare',           desc: 'Clinical AI & health compliance', color: '#06b6d4', img: '/industries/healthcare.jpeg' },
  { Icon: Cpu,         name: 'Technology',           desc: 'Enterprise tech platforms',       color: '#FE6300', img: '/industries/technology.jpeg' },
];

/* ─── Data ──────────────────────────────────────────────── */
const whyCards = [
  { Icon: ShieldCheckIcon, title: 'Sovereign AI', desc: 'Your data stays yours. Deploy on private cloud or on-prem. Compliance built in, not bolted on.' },
  { Icon: RefreshCwIcon, title: 'AI That Adapts', desc: 'Enterprise-grade solutions that bend for you. Zero compromise on security.' },
  { Icon: CpuChipIcon, title: 'Agents That Fit', desc: 'Seamless integration into your workflows. Real reasoning. Results from day one.' },
  { Icon: NetworkIcon, title: 'Ecosystem Strength', desc: 'Global partner network. Best-in-class tech, infrastructure, and outcomes.' },
];

const stats = [
  { value: 240, suffix: '+', label: 'AI Models' },
  { value: 80, suffix: '+', label: 'Pre-built Agents' },
  { value: 30, suffix: '%', label: 'Cloud Cost Cut' },
  { value: 90, suffix: '', label: 'Days to Results' },
];

const solutions = [
  { title: 'Defense & Security', icon: '🎯', color: 'from-red-500/20 to-orange-500/10', desc: 'Edge-deployed AI for real-time situational awareness.' },
  { title: 'Banking & Finance', icon: '🏦', color: 'from-brand-accent/20 to-brand-primary/10', desc: 'Auto-KYC, AML detection, fraud prevention at scale.' },
  { title: 'Healthcare', icon: '🏥', color: 'from-green-500/20 to-emerald-500/10', desc: 'HIPAA-compliant intelligent triage and clinical AI.' },
  { title: 'Manufacturing', icon: '🏭', color: 'from-yellow-500/20 to-orange-500/10', desc: 'Predictive maintenance, SCADA/ERP integration.' },
  { title: 'Insurance', icon: '📋', color: 'from-purple-500/20 to-brand-accent/10', desc: '70% faster claim settlement. Full audit coverage.' },
  { title: 'Technology & SaaS', icon: '💻', color: 'from-brand-primary/20 to-orange-400/10', desc: 'No-code orchestration and workflow automation.' },
];

const SI = 'https://cdn.simpleicons.org';
const WX = 'https://static.wixstatic.com/media';
const CL = 'https://logo.clearbit.com';

const clients = [
  { name: 'IBM', logo: `${SI}/ibm/ffffff`, mono: true },
  { name: 'HPE', logo: `${WX}/ef7a11_64f239e2528b43c2ac75fcc1524bf499~mv2.png`, mono: false },
  { name: 'Indian Army', logo: `${WX}/ef7a11_58cfd59433de4b5eafbf2f4c5834f321~mv2.png`, mono: false },
  { name: 'Sun Mobility', logo: `${CL}/sunmobility.co.in`, mono: false },
  { name: 'NVIDIA', logo: `${SI}/nvidia/76b900`, mono: true },
  { name: 'Coforge', logo: `${WX}/ef7a11_a28551da4b854e8e90260bcd82deb727~mv2.png`, mono: false },
  { name: 'Sun Mobility', logo: `${CL}/sunmobility.co.in`, mono: false },
  { name: 'EY', logo: `${CL}/ey.com`, mono: false },
];

const results = [
  { client: 'Indian Army', outcome: '−82% alert-triage time', saved: 'Operational edge', agent: 'KOGO Sentinel + on-prem LLaMA-4' },
  { client: 'Fortune 500 Client', outcome: '−60% cloud cost', saved: 'Millions saved', agent: 'KOGO FinOps + AutoML Agent' },
  { client: 'Insurance Enterprise', outcome: '2× claims per FTE', saved: 'Cost halved', agent: 'KOGO Claim-QA Agent' },
  { client: 'Global BPO', outcome: '+18% ticket capacity', saved: '−28% Azure cost', agent: 'KOGO Helpdesk Mesh' },
];

/* ─── About data ────────────────────────────────────────── */
const values = [
  { letter: 'A', title: 'Adaptability', desc: 'Our solutions evolve with your needs. No rigid systems. No obsolescence.' },
  { letter: 'G', title: 'Growth', desc: 'We measure success by your outcomes. Real metrics. Real impact.' },
  { letter: 'E', title: 'Excellence', desc: "Every agent meets the highest standards. Maximum value, not minimum viable." },
  { letter: 'N', title: 'Next-gen Thinking', desc: "Future-ready solutions built for tomorrow's challenges." },
  { letter: 'T', title: 'Trust', desc: 'Transparency in how our agents work. Integrity in how we operate.' },
];

const team = [
  {
    name: 'Ajay Kharbanda',
    role: 'CEO & Co-Founder',
    superpower: 'Vision-ops bridge-builder',
    track: '25+ years driving digital transformation at Fortune 500s. Connects enterprise strategy directly to AI execution at scale.',
    photo: ajayPhoto,
    tags: [],
  },
  {
    name: 'Dr Chytra V Anand',
    role: 'Co-Founder',
    superpower: 'Enterprise transformation catalyst',
    track: 'Champions client partnerships and enterprise AI adoption across global markets, turning complex deployments into measurable outcomes.',
    photo: chytraPhoto,
    tags: [],
  },
  {
    name: 'D Uday Bhaskar Rao',
    role: 'Strategic Advisor',
    superpower: 'Enterprise systems architect',
    track: '26+ years in enterprise software engineering, cloud-native platforms, and AI-enabled systems across Retail, FinTech, Healthcare, Media & GIS/Digital Twin.',
    photo: udayPhoto,
    tags: [],
  },
  {
    name: 'Angad Singh',
    role: 'COO / CTO',
    superpower: 'AI stack maestro',
    track: "Ex-NVIDIA & Qualcomm. Architected 40+ on-prem ML grids. Leads the design and deployment of Arinox's sovereign AI infrastructure.",
    photo: angadPhoto,
    tags: [],
  },
];

const history = [
  { year: '2022', title: 'Foundation', desc: 'Founded with a singular mission: democratize enterprise AI. Established headquarters in India.' },
  { year: '2023', title: 'First Partnerships', desc: 'First Fortune 500 implementation — 60% cloud cost reduction. Expanded enterprise AI deployments globally.' },
  { year: '2024', title: 'Rapid Expansion', desc: 'Kogo.ai partnership. Indian Army and global enterprise deployments across Defence, Healthcare, Manufacturing & Finance. Offices across India.' },
];

const offices = [
  { region: 'India', locations: ['New Delhi', 'Bangalore'] },
];

/* ─── Animated Counter ──────────────────────────────────── */
const Counter = ({ value, suffix, label }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const displayRef = useRef(null);

  useEffect(() => {
    if (!inView || !displayRef.current) return;
    gsap.fromTo(displayRef.current,
      { textContent: 0 },
      { textContent: value, duration: 2, ease: 'power2.out', snap: { textContent: 1 },
        onUpdate() { if (displayRef.current) displayRef.current.textContent = Math.round(this.targets()[0].textContent) + suffix; }
      }
    );
  }, [inView, value, suffix]);

  return (
    <div ref={ref} className="text-center group">
      <div className="text-4xl md:text-5xl font-display font-bold text-gradient mb-1 counter" ref={displayRef}>
        0{suffix}
      </div>
      <div className="text-sm text-brand-muted group-hover:text-brand-text transition-colors">{label}</div>
    </div>
  );
};

/* ─── Home ──────────────────────────────────────────────── */
const Home = () => {
  const heroRef = useRef(null);
  const taglineRef = useRef(null);
  const timelineRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  /* GSAP: typing tagline */
  useEffect(() => {
    if (!taglineRef.current) return;
    const phrases = ['Shape Nations', 'Move Markets', 'Save Lives', 'Define the Future'];
    const tl = gsap.timeline({ repeat: -1 });
    phrases.forEach((phrase) => {
      tl.to(taglineRef.current, { duration: 0.05, text: '', ease: 'none' })
        .to(taglineRef.current, { duration: phrase.length * 0.055, text: phrase, ease: 'none' })
        .to({}, { duration: 2.2 });
    });
    return () => tl.kill();
  }, []);

  /* GSAP: scroll-triggered reveals */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-card', {
        opacity: 0, y: 50, rotateX: 12,
        stagger: 0.12, duration: 0.75, ease: 'back.out(1.3)',
        scrollTrigger: { trigger: '.why-section', start: 'top 78%' },
      });
      gsap.from('.result-row', {
        opacity: 0, x: -30,
        stagger: 0.1, duration: 0.6,
        scrollTrigger: { trigger: '.results-table', start: 'top 82%' },
      });
      gsap.from('.timeline-item', {
        opacity: 0, x: -50,
        stagger: 0.25,
        scrollTrigger: { trigger: '.timeline-section', start: 'top 78%' },
      });
      gsap.from('.hr-gradient', {
        scaleX: 0, transformOrigin: 'left',
        duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: '.hr-gradient', start: 'top 92%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO
        title="Arinox AI — Powering the Decisions That Shape Nations, Markets and Lives"
        description="From strategy to execution — Arinox transforms enterprises through AI systems that solve real problems across BFSI, Healthcare, Manufacturing, Defense, and Government."
      />

      {/* ═══ HERO ═══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
        <ThreeScene />
        <div className="orb w-[400px] h-[400px] bg-brand-primary/10 top-1/4 -left-24" />
        <div className="orb w-[320px] h-[320px] bg-brand-accent/8 bottom-1/4 -right-24" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center container-wide pt-28 pb-20"
        >
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.6rem] font-display font-bold text-white leading-[1.1] mb-2"
          >
            Powering the Decisions That
          </motion.h1>

          {/* Dynamic tagline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="text-3xl md:text-4xl lg:text-[2.6rem] font-display font-bold leading-[1.1] mb-6"
          >
            <span ref={taglineRef} className="text-gradient">Strategic AI Systems</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32 }}
            className="text-base md:text-lg text-brand-muted max-w-xl mx-auto mb-10 leading-relaxed"
          >
            From agentic automation and voice AI to sovereign on-premises compute and real-time decision intelligence — Arinox delivers enterprise AI across every industry and domain, entirely within your environment.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="flex flex-col items-center justify-center gap-3"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
              <Link to="/solutions" className="btn-primary w-full sm:w-auto px-7 py-3 rounded-xl text-white font-semibold text-sm text-center">
                Explore Solutions →
              </Link>
              <DemoLink className="w-full sm:w-auto px-7 py-3 rounded-xl bg-brand-primary text-white font-semibold hover:bg-brand-primary/90 hover:-translate-y-0.5 transition-all duration-300 text-sm text-center shadow-lg shadow-brand-primary/30">
                Book a Free 15-min Call →
              </DemoLink>
            </div>
            <span className="text-[11px] text-brand-muted text-center max-w-sm">Free session — we map where intelligent AI fits your organisation's operations, strategy, and compliance needs.</span>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-px h-10 bg-gradient-to-b from-brand-primary to-transparent"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ WHO WE ARE ═════════════════════════════════════ */}
      <section className="section-padding bg-brand-surface relative overflow-hidden">
        <FloatingOrbs preset="warm" />
        <div className="container-wide grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-xs tracking-[0.2em] uppercase text-brand-primary mb-3 font-semibold">Where We Operate</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-5 leading-tight">
              Wherever AI needs to perform<br />
              <span className="text-gradient">without compromise.</span>
            </h2>
            <p className="text-brand-muted leading-relaxed mb-6 text-sm md:text-base">
              Arinox deploys across every industry where data integrity, regulatory compliance, and operational continuity are non-negotiable — from national defence and capital markets to public governance, legal institutions, clinical systems, manufacturing, logistics, and beyond. Each engagement is engineered for the specific constraints of that domain, not a generic AI layer stretched to fit.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {industryCards.map(({ Icon, name, desc, color, img }, i) => (
                <motion.div key={name} custom={i} variants={popIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <MouseTilt
                    className="relative overflow-hidden rounded-2xl group cursor-default"
                    style={{ aspectRatio: '1 / 1' }}
                    intensity={12}
                  >
                    {/* Real image */}
                    <img
                      src={img}
                      alt={name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 transition-all duration-300"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 30%, rgba(0,0,0,0.25) 100%)' }}
                    />
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-3">
                      {/* Icon top-left */}
                      <motion.div
                        style={{ color, background: `${color}28`, border: `1px solid ${color}55`, translateZ: 30 }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-sm self-start"
                      >
                        <Icon size={16} strokeWidth={1.8} />
                      </motion.div>
                      {/* Text bottom */}
                      <div>
                        <motion.p style={{ translateZ: 20 }} className="text-white text-[11px] font-bold leading-tight mb-0.5 drop-shadow">{name}</motion.p>
                        <motion.p style={{ translateZ: 12 }} className="text-white/60 text-[9px] leading-snug">{desc}</motion.p>
                      </div>
                    </div>
                  </MouseTilt>
                </motion.div>
              ))}
            </div>
            <motion.p
              variants={popIn} custom={7} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-[11px] text-brand-muted"
            >
              Also across{' '}
              {['Manufacturing', 'Oil & Gas', 'Retail', 'Logistics', 'Education', 'Insurance'].map((s, i, arr) => (
                <span key={s}>
                  <span className="text-brand-primary/80 font-medium">{s}</span>
                  {i < arr.length - 1 ? ', ' : ''}
                </span>
              ))}
              {' '}and any domain where intelligent systems create real operational advantage.
            </motion.p>
          </motion.div>

          <motion.div variants={springGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} className="why-section grid grid-cols-2 gap-3">
            {whyCards.map(({ Icon, title, desc }, i) => (
              <motion.div key={title} variants={springCard} className={`why-card ${i === 0 ? 'col-span-2 sm:col-span-1' : ''}`}>
                <MouseTilt className="glass-card rounded-2xl p-5 h-full" intensity={10}>
                  <motion.div style={{ translateZ: 30 }} className="w-9 h-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-3">
                    <Icon />
                  </motion.div>
                  <motion.h3 style={{ translateZ: 20 }} className="text-brand-text font-bold mb-1 text-sm">{title}</motion.h3>
                  <motion.p style={{ translateZ: 10 }} className="text-xs text-brand-muted leading-relaxed">{desc}</motion.p>
                </MouseTilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ OUR STORY ══════════════════════════════════════ */}
      <section className="section-padding relative overflow-hidden">
        <FloatingOrbs preset="cool" />
        <div className="container-wide grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-xs tracking-[0.2em] uppercase text-brand-primary mb-3 font-semibold">Our Story</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-5 leading-tight">
              Founded to make enterprise-grade AI <span className="text-gradient">accessible to all.</span>
            </h2>
            <p className="text-sm text-brand-muted leading-relaxed mb-4">
              We are pioneers in intelligent business transformation, specializing in decoding how enterprises run today and redesigning how they should operate tomorrow. We don't improve efficiency — we multiply it.
            </p>
            <p className="text-sm text-brand-muted leading-relaxed">
              Headquartered in India with presence across New Delhi and Bangalore — connecting innovation to implementation and delivering enterprise AI transformation globally.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, rotateY: -18 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ rotateY: 8, rotateX: -3, scale: 1.02, z: 20 }}
            style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
            className="glass-card rounded-2xl p-7"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-3">The Arinox Difference</h3>
            <p className="text-sm text-brand-muted leading-relaxed mb-5">
              We don't build everything — we curate the best. Through exclusive partnerships with AI Pioneers, System Integrators, and Tech Majors, we deliver proven solutions that work in your context.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {['Infra & Compute: HP, IBM, NetWeb', 'Chipset: NVIDIA, Qualcomm', 'AI Engines: Kogo.ai, AVOX', '240+ AI Models Ready'].map(item => (
                <div key={item} className="flex items-start gap-2 text-brand-muted">
                  <span className="text-brand-primary mt-0.5">▸</span> {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ ARCHITECTS OF CHANGE ══════════════════════════ */}
      <section className="section-padding bg-brand-surface relative overflow-hidden" id="about">
        <FloatingOrbs preset="default" />
        <div className="container-wide">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-brand-primary mb-3 font-semibold">Leadership</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Architects of <span className="text-gradient">Change</span></h2>
          </motion.div>
          <motion.div variants={springGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, superpower, track, tags, photo }, i) => (
              <motion.div key={name} variants={springCard}>
                <MouseTilt className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full" intensity={9}>
                  <div className="w-full h-72 shrink-0 overflow-hidden">
                    {photo ? (
                      <img src={photo} alt={name} className="w-full h-full object-cover object-[center_top] transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white font-bold text-4xl">
                        {name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col">
                    <motion.h3 style={{ translateZ: 24 }} className="text-white font-bold mb-0.5">{name}</motion.h3>
                    <motion.p style={{ translateZ: 18 }} className="text-xs text-brand-primary mb-3">{role}</motion.p>
                    <motion.p style={{ translateZ: 12 }} className="text-xs font-semibold text-brand-accent mb-2">"{superpower}"</motion.p>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {tags.map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full border border-brand-primary/40 text-brand-primary bg-brand-primary/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </MouseTilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS COUNTER ══════════════════════════════════ */}
      <section className="py-16 border-y border-brand-border line-grid relative overflow-hidden">
        <div className="orb w-80 h-80 bg-brand-primary/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="container-wide grid grid-cols-2 md:grid-cols-4 gap-8 relative">
          {stats.map(({ value, suffix, label }) => (
            <Counter key={label} value={value} suffix={suffix} label={label} />
          ))}
        </motion.div>
      </section>

      {/* ═══ WHAT / WHO / HOW ═══════════════════════════════ */}
      <section className="section-padding relative overflow-hidden">
        <FloatingOrbs preset="warm" />
        <div className="container-wide">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center max-w-xl mx-auto mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-brand-primary mb-3 font-semibold">Our Model</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
              One AI platform. <span className="text-gradient">Powerful outcomes.</span>
            </h2>
          </motion.div>
          <motion.div variants={springGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-5">
            {[
              { tag: 'WHAT', title: 'We Solve with Purpose', desc: 'We build AI solutions that drive business transformation. From roadmap to rollout — strategy, systems, and scale.', grad: 'from-brand-primary to-brand-secondary' },
              { tag: 'WHO', title: 'Trusted by Leaders', desc: 'Enterprises. Governments. Global Integrators. IBM, HPE, Indian Army, NVIDIA, Sun Mobility, and more across every industry worldwide.', grad: 'from-brand-accent to-brand-primary' },
              { tag: 'HOW', title: 'The Arinox Ecosystem', desc: 'We unite tech vendors and system integrators to deliver high-impact AI — fast. Pre-built use cases. Real adoption.', grad: 'from-brand-gold to-brand-secondary' },
            ].map(({ tag, title, desc, grad }, i) => (
              <motion.div key={tag} variants={springCard}>
                <MouseTilt className="glass-card rounded-2xl p-7 cursor-default h-full" intensity={11}>
                  <motion.div style={{ translateZ: 35 }} className={`text-xs font-black tracking-[0.2em] bg-gradient-to-r ${grad} bg-clip-text text-transparent mb-3 uppercase`}>{tag}</motion.div>
                  <motion.h3 style={{ translateZ: 22 }} className="text-lg font-display font-bold text-brand-text mb-2">{title}</motion.h3>
                  <motion.p style={{ translateZ: 10 }} className="text-sm text-brand-muted leading-relaxed">{desc}</motion.p>
                </MouseTilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CLIENT MARQUEE ════════════════════════════════= */}
      <section className="py-14 bg-brand-surface border-y border-brand-border overflow-hidden">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs tracking-[0.2em] uppercase text-brand-muted text-center mb-8 font-semibold">Trusted by global leaders</motion.p>
        <div className="marquee-wrap">
          <div className="marquee-inner">
            {[...clients, ...clients].map(({ name, logo, mono }, i) => (
              <span key={i} className="inline-flex items-center gap-3 px-5 py-2.5 glass rounded-xl text-brand-muted font-medium text-sm flex-shrink-0 hover:text-white hover:border-brand-primary/30 transition-all border border-transparent cursor-default">
                {logo ? (
                  <img
                    src={logo}
                    alt={name}
                    className={`h-5 w-auto object-contain flex-shrink-0 ${mono ? 'logo-mono' : 'logo-color'}`}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/60 flex-shrink-0" />
                )}
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT — AGENT VALUES ═══════════════════════════ */}
      <section className="section-padding bg-brand-surface relative overflow-hidden">
        <FloatingOrbs preset="cool" />
        <div className="container-wide">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <p className="text-xs tracking-[0.2em] uppercase text-brand-primary mb-3 font-semibold">Core Values</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">The <span className="text-gradient">A.G.E.N.T.</span> Pillars</h2>
          </motion.div>
          <motion.div variants={springGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col md:flex-row gap-4">
            {values.map(({ letter, title, desc }, i) => (
              <motion.div key={letter} variants={springCard} className="flex-1">
                <MouseTilt className="glass-card rounded-2xl p-5 h-full text-center" intensity={13} scaleOnHover={1.07}>
                  <motion.div style={{ translateZ: 45 }} className="text-4xl font-display font-bold text-gradient mb-2">{letter}</motion.div>
                  <motion.h3 style={{ translateZ: 28 }} className="text-white font-semibold mb-1.5 text-sm">{title}</motion.h3>
                  <motion.p style={{ translateZ: 14 }} className="text-xs text-brand-muted leading-relaxed">{desc}</motion.p>
                </MouseTilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ ABOUT — TIMELINE ═══════════════════════════════ */}
      <section className="section-padding timeline-section relative overflow-hidden">
        <FloatingOrbs preset="default" />
        <div className="container-wide max-w-2xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <p className="text-xs tracking-[0.2em] uppercase text-brand-primary mb-3 font-semibold">Our Journey</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Company <span className="text-gradient">History</span></h2>
          </motion.div>
          <div className="relative pl-7 border-l border-brand-border space-y-10">
            {history.map(({ year, title, desc }) => (
              <div key={year} className="timeline-item relative">
                <div className="absolute -left-[1.85rem] top-1 w-3.5 h-3.5 rounded-full bg-brand-primary border-2 border-brand-bg" />
                <span className="text-xs font-bold text-brand-primary mb-1 block">{year}</span>
                <h3 className="text-white font-bold mb-1.5">{title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ════════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden line-grid">
        <div className="orb w-[500px] h-[500px] bg-brand-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="container-wide text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 32, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-brand-primary mb-5 font-semibold">Ready?</p>
            <h2 className="text-2xl md:text-3xl lg:text-[2.4rem] font-display font-bold text-white mb-5 leading-tight">
              Transform how your enterprise <span className="text-gradient">wins.</span>
            </h2>
            <p className="text-brand-muted text-base max-w-lg mx-auto">
              Deploy your first AI solution today and see results in hours, not months.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
