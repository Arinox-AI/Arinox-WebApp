import { useEffect, useRef } from 'react';
import { Landmark, ShieldCheck, Building2, Scale, Activity, Cpu, RefreshCw, Network, Zap, ChevronRight, Target, Factory, ClipboardList, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import DemoLink from '../components/ui/DemoLink';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import ThreeScene from '../components/ui/ThreeScene';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import SEO from '../components/ui/SEO';
import MouseTilt from '../components/ui/MouseTilt';
import FloatingOrbs from '../components/ui/FloatingOrbs';
import ajayPhoto from '../assets/Ajay-Kharbanda-CEO-of-Arinox-AI.png';
import chytraPhoto from '../assets/chytraD.jpeg';
import udayPhoto from '../assets/Uday bhaskar.png';
import angadPhoto from '../assets/Angad-Ahluwalia-Chief-Spokesperson-Arinox-AI.jpeg';
import venuPhoto from '../assets/venu.png';
import repswalPhoto from '../assets/repswal.jpg';
import { globalClients as clients } from '../data/clients';
import LogoGrid from '../components/ui/LogoGrid';

gsap.registerPlugin(TextPlugin);

/* ─── Animation variants ────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 16, delay: i * 0.1 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 16 } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 80, damping: 16 } },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 80, damping: 16 } },
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

const industryCards = [
  { Icon: Landmark,    name: 'Banking & Finance', desc: 'Capital markets & compliance AI',   img: '/industries/banking.jpeg'    },
  { Icon: ShieldCheck, name: 'Defence & Army',     desc: 'Sovereign military AI systems',    img: '/industries/defence.jpeg'    },
  { Icon: Building2,   name: 'Government',          desc: 'Public sector intelligence',      img: '/industries/government.jpeg' },
  { Icon: Scale,       name: 'Legal',               desc: 'AI-assisted legal intelligence',  img: '/industries/legal.jpeg'      },
  { Icon: Activity,    name: 'Healthcare',           desc: 'Clinical AI & health compliance', img: '/industries/healthcare.jpeg' },
  { Icon: Cpu,         name: 'Technology',           desc: 'Enterprise tech platforms',       img: '/industries/technology.jpeg' },
];

/* ─── Data ──────────────────────────────────────────────── */
const whyCards = [
  { Icon: ShieldCheck, title: 'Sovereign AI', desc: 'Your data stays yours. Deploy on private cloud or on-prem. Compliance built in, not bolted on.' },
  { Icon: RefreshCw, title: 'AI That Adapts', desc: 'Enterprise-grade solutions that bend for you. Zero compromise on security.' },
  { Icon: Cpu, title: 'Agents That Fit', desc: 'Seamless integration into your workflows. Real reasoning. Results from day one.' },
  { Icon: Network, title: 'Ecosystem Strength', desc: 'Global partner network. Best-in-class tech, infrastructure, and outcomes.' },
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
    role: 'CTO',
    superpower: 'Enterprise systems architect',
    track: '26+ years in enterprise software engineering, cloud-native platforms, and AI-enabled systems across Retail, FinTech, Healthcare, Media & GIS/Digital Twin.',
    photo: udayPhoto,
    tags: [],
  },
];

/* ─── Advisors data (TODO: fill real advisory board) ─── */
const advisors = [
  { name: 'Venu Ganganna', role: 'Creative, Data & Tech Specialist', photo: venuPhoto, focus: 'Strategic advisor driving creative innovation, data intelligence, and technology transformation.' },
  { name: 'Lt General BK Repswal', role: 'Defence & Strategic Advisor', photo: repswalPhoto, focus: 'A trusted sounding board for Arinox, providing strategic counsel and deep defence domain expertise.' },
  // { name: 'Advisor Name',  role: 'Technology Advisor', focus: 'Placeholder bio   replace with advisor background and area of expertise.' },
  // { name: 'Advisor Name',  role: 'Industry Advisor',   focus: 'Placeholder bio   replace with advisor background and area of expertise.' },
];

/* ─── Home ──────────────────────────────────────────────── */
const Home = () => {
  const heroRef = useRef(null);
  const taglineRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  /* GSAP: typing tagline — pauses when hero is out of view */
  useEffect(() => {
    if (!taglineRef.current || !heroRef.current) return;
    const phrases = ['Shape Nations', 'Move Markets', 'Save Lives', 'Define the Future'];
    const tl = gsap.timeline({ repeat: -1, paused: true });
    phrases.forEach((phrase) => {
      tl.to(taglineRef.current, { duration: 0.05, text: '', ease: 'none' })
        .to(taglineRef.current, { duration: phrase.length * 0.055, text: phrase, ease: 'none' })
        .to({}, { duration: 2.2 });
    });
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) tl.play();
      else tl.pause();
    }, { threshold: 0 });
    observer.observe(heroRef.current);
    tl.play();
    return () => { tl.kill(); observer.disconnect(); };
  }, []);

  return (
    <>
      <SEO
        title="Arinox AI | Sovereign AI Infrastructure for Enterprise India"
        description="Arinox AI delivers CommandCore™   sovereign, on-premises AI infrastructure and intelligent agents for BFSI, Healthcare, Manufacturing, Defence, and Government. Built in India."
        canonical="https://www.arinox.ai/"
        keywords="sovereign AI India, enterprise AI platform, CommandCore, on-premises AI, AI agents India, private AI infrastructure, BFSI AI, defence AI, government AI, Arinox AI"
      />

      {/* ═══ HERO ═══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[100dvh] min-h-screen flex items-center justify-center overflow-hidden grid-bg">
        <ErrorBoundary><ThreeScene /></ErrorBoundary>
        <div className="orb w-[400px] h-[400px] bg-brand-primary/10 top-1/4 -left-24" />
        <div className="orb w-[320px] h-[320px] bg-brand-primary/8 bottom-1/4 -right-24" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center container-wide pt-28 pb-20"
        >
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-4xl font-display font-bold text-white leading-[1.1] mb-2"
          >
            Enterprise AI.
          </motion.h1>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="text-3xl md:text-4xl lg:text-4xl font-display font-bold leading-[1.1] mb-6"
          >
            <span className="text-gradient">Sovereign. Scalable. Yours.</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32 }}
            className="text-base md:text-lg text-brand-muted max-w-xl mx-auto mb-10 leading-relaxed"
          >
            From agentic automation and voice AI to sovereign on-premises compute and real-time decision intelligence   Arinox delivers enterprise AI across every industry and domain, entirely within your environment.
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
                Request Demo →
              </DemoLink>
            </div>
            <span className="text-[11px] text-brand-muted text-center max-w-sm">Free session   we map where intelligent AI fits your organisation's operations, strategy, and compliance needs.</span>
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
              Arinox deploys across every industry where data integrity, regulatory compliance, and operational continuity are non-negotiable   from national defence and capital markets to public governance, legal institutions, clinical systems, manufacturing, logistics, and beyond. Each engagement is engineered for the specific constraints of that domain, not a generic AI layer stretched to fit.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {industryCards.map(({ Icon, name, desc, img }, i) => (
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
                      loading="lazy"
                      decoding="async"
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
                        style={{ translateZ: 30 }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-sm self-start text-brand-primary bg-brand-primary/20 border border-brand-primary/40"
                      >
                        <Icon size={16} strokeWidth={1.8} />
                      </motion.div>
                      {/* Text bottom */}
                      <div>
                        <motion.p style={{ translateZ: 20 }} className="text-white text-[12px] font-bold leading-tight mb-0.5 drop-shadow">{name}</motion.p>
                        <motion.p style={{ translateZ: 12 }} className="text-white/60 text-[10px] leading-snug">{desc}</motion.p>
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
              {['Manufacturing', 'BFSI', 'Healthcare', 'Retail', 'Logistics', 'Education', 'Performance Marketing', 'E-commerce'].map((s, i, arr) => (
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
      <section className="section-padding relative overflow-hidden" style={{ contentVisibility: 'auto' }}>
        <div className="container-wide grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-xs tracking-[0.2em] uppercase text-brand-primary mb-3 font-semibold">Our Story</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-5 leading-tight">
              Founded to make enterprise-grade AI <span className="text-gradient">accessible to all.</span>
            </h2>
            <p className="text-sm text-brand-muted leading-relaxed mb-4">
              We are pioneers in intelligent business transformation, specializing in decoding how enterprises run today and redesigning how they should operate tomorrow. We not only improve efficiency   we multiply it.
            </p>
            <p className="text-sm text-brand-muted leading-relaxed">
              Headquartered in India with presence across New Delhi and Bangalore   connecting innovation to implementation and delivering enterprise AI transformation globally.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="glass-card rounded-2xl p-7"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-4">
              <Zap size={20} strokeWidth={1.6} />
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-3">The Arinox Difference</h3>
            <p className="text-sm text-brand-muted leading-relaxed mb-5">
              We don't build everything   we curate the best. Through exclusive partnerships with AI Pioneers, System Integrators, and Tech Majors, we deliver proven solutions that work in your context.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {['Infra & Compute: HP, IBM, NetWeb', 'Chipset: NVIDIA, Qualcomm', 'AI Engines: Kogo.ai', 'Sovereign On-Prem Compute'].map(item => (
                <div key={item} className="flex items-start gap-2 text-brand-muted">
                  <ChevronRight size={14} strokeWidth={2} className="text-brand-primary shrink-0 mt-0.5" /> {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ ARCHITECTS OF CHANGE ══════════════════════════ */}
      <section className="section-padding bg-brand-surface relative overflow-hidden" id="about" style={{ contentVisibility: 'auto' }}>
        <FloatingOrbs preset="default" />
        <div className="container-wide">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-brand-primary mb-3 font-semibold">Leadership</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Architects of <span className="text-gradient">Change</span></h2>
          </motion.div>
          <motion.div variants={springGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {team.map(({ name, role, superpower, track, tags, photo }, i) => (
              <motion.div key={name} variants={springCard}>
                <MouseTilt className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full" intensity={9}>
                  <div className="w-full h-72 shrink-0 overflow-hidden">
                    {photo ? (
                      <img src={photo} alt={name} loading="lazy" decoding="async" className="w-full h-full object-cover object-[center_top] transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold text-4xl">
                        {name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col">
                    <motion.h3 style={{ translateZ: 24 }} className="text-white font-bold mb-0.5">{name}</motion.h3>
                    <motion.p style={{ translateZ: 18 }} className="text-xs text-brand-primary mb-3">{role}</motion.p>
                    <motion.p style={{ translateZ: 12 }} className="text-xs font-semibold text-brand-primary mb-2">"{superpower}"</motion.p>
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

      {/* ═══ OUR ADVISORS ═══════════════════════════════════ */}
      <section className="section-padding relative overflow-hidden" style={{ contentVisibility: 'auto' }}>
        <div className="container-wide">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-brand-primary mb-3 font-semibold">Advisory Board</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Our <span className="text-gradient">Advisors</span></h2>
          </motion.div>
          <motion.div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
            {advisors.map(({ name, role, focus, photo }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6 flex flex-col items-center text-center border border-brand-border/25"
              >
                {photo ? (
                  <div className="w-36 h-36 rounded-full overflow-hidden shrink-0 border-2 border-brand-primary/30 mb-4">
                    <img src={photo} alt={name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-36 h-36 rounded-full shrink-0 bg-brand-primary/10 border-2 border-brand-primary/20 flex items-center justify-center mb-4">
                    <span className="text-brand-primary font-bold text-3xl">{name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                )}
                <p className="text-white font-bold text-base">{name}</p>
                <p className="text-sm text-brand-primary font-semibold mt-1">{role}</p>
                {focus && <p className="text-sm text-brand-muted leading-relaxed mt-2">{focus}</p>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ WHAT / WHO / HOW ═══════════════════════════════ */}
      <section className="section-padding relative overflow-hidden" style={{ contentVisibility: 'auto' }}>
        <div className="container-wide">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center max-w-xl mx-auto mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-brand-primary mb-3 font-semibold">Our Model</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
              One AI platform. <span className="text-gradient">Powerful outcomes.</span>
            </h2>
          </motion.div>
          <motion.div variants={springGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-5">
            {[
              { tag: 'WHAT', title: 'We Solve with Purpose', desc: 'We build AI solutions that drive business transformation. From roadmap to rollout   strategy, systems, and scale.', grad: 'from-brand-primary to-brand-secondary' },
              { tag: 'WHO', title: 'Trusted by Leaders', desc: 'Enterprises. Governments. Global System Integrators. IBM, HPE, Defence, NVIDIA, HCL Tech, Hitachi Systems, and more across every industry worldwide.', grad: 'from-brand-primary to-brand-secondary' },
              { tag: 'HOW', title: 'The Arinox Ecosystem', desc: 'We unite tech vendors and system integrators to deliver high-impact AI   fast. Pre-built use cases. Real adoption.', grad: 'from-brand-primary to-brand-secondary' },
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

      {/* ═══ LOGO CLOUD ═══════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-brand-surface border-y border-brand-border" style={{ contentVisibility: 'auto' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center text-sm tracking-[0.2em] uppercase font-semibold text-brand-muted"
          >
            Trusted by global leaders
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-10">
            <LogoGrid items={clients} />
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ════════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden line-grid" style={{ contentVisibility: 'auto' }}>
        <div className="orb w-[500px] h-[500px] bg-brand-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="container-wide text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-brand-primary mb-5 font-semibold">Ready?</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-5 leading-tight">
              Transform how your enterprise <span className="text-gradient">wins.</span>
            </h2>
            <p className="text-brand-muted text-base max-w-lg mx-auto mb-8">
              Deploy your first AI solution today and see results in hours, not months.
            </p>
            <DemoLink className="inline-flex px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-sm hover:opacity-90 hover:shadow-xl hover:shadow-brand-primary/25 transition-all">
              Request Demo
            </DemoLink>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
