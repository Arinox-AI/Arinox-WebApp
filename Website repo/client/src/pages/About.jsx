import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../components/ui/SEO';
import MouseTilt from '../components/ui/MouseTilt';
import FloatingOrbs from '../components/ui/FloatingOrbs';

gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden: { opacity: 0, y: 40, rotateX: 18 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', stiffness: 80, damping: 16 } },
};

const springGrid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const springCard = {
  hidden: { opacity: 0, y: 36, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 90, damping: 16 } },
};

const team = [
  {
    name: 'Ajay Kharbanda',
    role: 'CEO & Co-Founder',
    superpower: 'Vision-ops bridge-builder',
    track: '25+ years driving digital transformation at Fortune 500s. Connects enterprise strategy directly to AI execution at scale.',
    tags: [],
  },
  {
    name: 'Chytra',
    role: 'Co-Founder',
    superpower: 'Enterprise transformation catalyst',
    track: 'Champions client partnerships and enterprise AI adoption across global markets, turning complex deployments into measurable outcomes.',
    tags: [],
  },
  {
    name: 'D Uday Bhaskar Rao',
    role: 'Strategic Advisor',
    superpower: 'Enterprise systems architect',
    track: '26+ years in enterprise software engineering, cloud-native platforms, and AI-enabled systems across Retail, FinTech, Healthcare, Media & GIS/Digital Twin.',
    tags: ['Adobe Certified Developer', 'CSM', 'PMP'],
  },
  {
    name: 'Angad Singh',
    role: 'COO / CTO',
    superpower: 'AI stack maestro',
    track: "Ex-NVIDIA & Qualcomm. Architected 40+ on-prem ML grids. Leads the design and deployment of Arinox's sovereign AI infrastructure.",
    tags: [],
  },
];

const values = [
  { letter: 'A', title: 'Adaptability', desc: 'Our solutions evolve with your needs. No rigid systems. No obsolescence.' },
  { letter: 'G', title: 'Growth', desc: 'We measure success by your outcomes. Real metrics. Real progress. Real impact.' },
  { letter: 'E', title: 'Excellence', desc: "Every agent meets the highest standards. We don't ship minimum viable. We deliver maximum value." },
  { letter: 'N', title: 'Next-gen Thinking', desc: "We solve for tomorrow's challenges. Future-ready solutions — not quick fixes." },
  { letter: 'T', title: 'Trust', desc: 'Transparency in how our agents work. Integrity in how we operate.' },
];

const offices = [
  { region: 'North America', locations: ['Princeton, New Jersey'] },
  { region: 'Middle East (HQ)', locations: ['Dubai, UAE', 'Abu Dhabi, UAE', 'Riyadh, Saudi Arabia'] },
  { region: 'South Asia', locations: ['New Delhi, India', 'Bangalore, India'] },
];

const history = [
  { year: '2022', title: 'Foundation', desc: 'Founded with a singular mission: democratize enterprise AI access. Established UAE HQ.' },
  { year: '2023', title: 'First Partnerships', desc: 'Strategic alliance with Lucidity. First Fortune 500 implementation — 60% cloud cost reduction.' },
  { year: '2024', title: 'Rapid Expansion', desc: 'Kogo.ai partnership. Indian Army, American Airlines, Saudi Expo 2030. Offices in 6 cities.' },
];

const About = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-item', {
        opacity: 0, x: -60, rotateY: -15,
        stagger: 0.3, duration: 0.8, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: timelineRef.current, start: 'top 75%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO
        title="About Arinox AI — Our Story, Mission & Leadership"
        description="Founded to democratize enterprise AI. Meet the team behind Arinox AI — pioneers in intelligent business transformation headquartered in Dubai with global presence."
        canonical="https://www.arinox.ai/about"
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-20 pt-40 overflow-hidden grid-bg">
        <FloatingOrbs preset="warm" />
        <div className="orb w-[500px] h-[500px] bg-brand-primary/10 top-0 left-1/3 -translate-x-1/2 -translate-y-1/3" />
        <div className="container-wide relative">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs tracking-widest uppercase text-brand-primary mb-4">Our Story</motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40, rotateX: 25 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
            className="text-6xl md:text-8xl font-display font-bold text-white"
          >
            Built to<br /><span className="text-gradient">Transform.</span>
          </motion.h1>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-brand-surface relative overflow-hidden">
        <FloatingOrbs preset="default" />
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase text-brand-primary mb-3">Leadership</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Architects of <span className="text-gradient">Change</span></h2>
          </div>
          <motion.div variants={springGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, superpower, track, tags }, i) => (
              <motion.div key={name} variants={springCard}>
                <MouseTilt className="glass-card rounded-2xl p-6 group flex flex-col h-full" intensity={10}>
                  <motion.div style={{ translateZ: 30 }} className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent mb-4 flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {name.split(' ').map(n => n[0]).join('')}
                  </motion.div>
                  <motion.h3 style={{ translateZ: 22 }} className="text-white font-bold mb-0.5">{name}</motion.h3>
                  <motion.p style={{ translateZ: 16 }} className="text-xs text-brand-primary mb-3">{role}</motion.p>
                  <p className="text-xs font-semibold text-brand-accent mb-2">"{superpower}"</p>
                  <p className="text-xs text-brand-muted leading-relaxed flex-1">{track}</p>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full border border-brand-primary/40 text-brand-primary bg-brand-primary/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </MouseTilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding relative overflow-hidden">
        <FloatingOrbs preset="cool" />
        <div className="container-wide grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              We founded Arinox.ai with one goal:<br />
              <span className="text-gradient">make enterprise-grade AI accessible to all.</span>
            </h2>
            <p className="text-brand-muted leading-relaxed mb-4">
              We are pioneers in intelligent business transformation, specializing in decoding how enterprises run today and redesigning how they should operate tomorrow. We don't improve efficiency — we multiply it.
            </p>
            <p className="text-brand-muted leading-relaxed">
              Headquartered in UAE and USA, we operate across Princeton, Dubai, Abu Dhabi, Riyadh, New Delhi, and Bangalore — connecting innovation to implementation without borders.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotateY: -20 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotateY: 8, rotateX: -3, scale: 1.03, z: 20 }}
            style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
            className="glass-card rounded-3xl p-8"
          >
            <div className="text-6xl mb-4">⚡</div>
            <h3 className="text-2xl font-display font-bold text-white mb-4">The Arinox Difference</h3>
            <p className="text-brand-muted leading-relaxed mb-6">
              We don't build everything. We curate the best. Through exclusive partnerships with AI Pioneers, System Integrators, and Tech Majors, we deliver proven solutions that work in your context — without the complexity.
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {['Infra & Compute: HP, IBM, NetWeb', 'Chipset: NVIDIA, Qualcomm', 'AI Engines: Kogo, Lucidity', '240+ AI Models Ready'].map(item => (
                <div key={item} className="flex items-start gap-2 text-brand-muted">
                  <span className="text-brand-primary mt-0.5">▸</span> {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* AGENT Values */}
      <section className="section-padding bg-brand-surface relative overflow-hidden">
        <FloatingOrbs preset="warm" />
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase text-brand-primary mb-3">Core Values</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">The <span className="text-gradient">A.G.E.N.T.</span> Pillars</h2>
          </div>
          <motion.div variants={springGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4">
            {values.map(({ letter, title, desc }, i) => (
              <motion.div key={letter} variants={springCard} className="flex-1 min-w-[200px]">
                <MouseTilt className="glass-card rounded-2xl p-6 h-full text-center" intensity={13} scaleOnHover={1.07}>
                  <motion.div style={{ translateZ: 50 }} className="text-5xl font-display font-bold text-gradient mb-3">{letter}</motion.div>
                  <motion.h3 style={{ translateZ: 30 }} className="text-white font-semibold mb-2">{title}</motion.h3>
                  <motion.p style={{ translateZ: 15 }} className="text-xs text-brand-muted leading-relaxed">{desc}</motion.p>
                </MouseTilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-brand-surface relative overflow-hidden" ref={timelineRef}>
        <FloatingOrbs preset="cool" />
        <div className="container-wide max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase text-brand-primary mb-3">Our Journey</p>
            <h2 className="text-4xl font-display font-bold text-white">Company <span className="text-gradient">History</span></h2>
          </div>
          <div className="relative pl-8 border-l border-brand-border space-y-12">
            {history.map(({ year, title, desc }) => (
              <div key={year} className="timeline-item relative">
                <div className="absolute -left-[2.35rem] top-1 w-4 h-4 rounded-full bg-brand-primary border-2 border-brand-bg" />
                <span className="text-xs font-bold text-brand-primary mb-1 block">{year}</span>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="section-padding relative overflow-hidden">
        <FloatingOrbs preset="default" />
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase text-brand-primary mb-3">Global Presence</p>
            <h2 className="text-4xl font-display font-bold text-white">Where you operate. <span className="text-gradient">Where we deliver.</span></h2>
          </div>
          <motion.div variants={springGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
            {offices.map(({ region, locations }, i) => (
              <motion.div key={region} variants={springCard}>
                <MouseTilt className="glass-card rounded-2xl p-6 h-full" intensity={9}>
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <span className="text-brand-primary">📍</span> {region}
                  </h3>
                  <ul className="space-y-2">
                    {locations.map(l => <li key={l} className="text-sm text-brand-muted">{l}</li>)}
                  </ul>
                </MouseTilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ethical AI */}
      <section className="section-padding bg-brand-surface relative overflow-hidden">
        <FloatingOrbs preset="warm" />
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase text-brand-primary mb-3">Trust & Ethics</p>
            <h2 className="text-4xl font-display font-bold text-white">Our Commitment to <span className="text-gradient">Ethical AI</span></h2>
            <p className="text-brand-muted mt-4">Trust starts with control. Not with promises.</p>
          </div>
          <motion.div variants={springGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🔒', title: 'Data Sovereignty', desc: 'Your data stays yours. Always. Our on-premises deployment ensures your information never leaves your environment.' },
              { icon: '🔍', title: 'Responsible AI', desc: 'No black boxes. Just clear decisions. Our solutions reveal how AI works, building the trust essential for enterprise-wide adoption.' },
              { icon: '🤝', title: 'Human-AI Partnership', desc: 'AI that serves people. Not the other way around. We design AI to amplify human strengths, not replace them.' },
            ].map(({ icon, title, desc }, i) => (
              <motion.div key={title} variants={springCard}>
                <MouseTilt className="glass-card rounded-2xl p-8 text-center h-full" intensity={10}>
                  <motion.div style={{ translateZ: 40 }} className="text-5xl mb-4">{icon}</motion.div>
                  <motion.h3 style={{ translateZ: 25 }} className="text-white font-bold text-xl mb-3">{title}</motion.h3>
                  <motion.p style={{ translateZ: 12 }} className="text-brand-muted text-sm leading-relaxed">{desc}</motion.p>
                </MouseTilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
