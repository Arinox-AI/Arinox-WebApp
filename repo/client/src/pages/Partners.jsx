import { useState } from 'react';
import { motion } from 'framer-motion';
import { SiNvidia, SiQualcomm } from '@icons-pack/react-simple-icons';
import { Link2, Zap, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import NetworkSphere from '../components/ui/NetworkSphere';
import FloatingOrbs from '../components/ui/FloatingOrbs';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import { LOGO_FC as FC } from '../utils/logos';

const siPartners = [
  { name: 'Coforge',      logo: '/logos/Coforge.png',  lc: FC },
  { name: 'Hitachi Systems', logo: '/logos/hitachi.svg', lc: FC },
  { name: 'IBM',          logo: '/logos/ibm.svg',      lc: FC },
  { name: 'HPE',          logo: '/logos/hpe.svg',      lc: FC },
  { name: 'Langoor',      logo: '/logos/langoor.png',  lc: FC },
  { name: 'TechData',     logo: '/logos/techdata.svg', lc: FC },
  { name: 'HCL Tech',     logo: '/logos/hcltech.svg',  lc: FC },
  { name: 'Acer',         logo: '/logos/acer.svg',     lc: FC },
];

const techPartners = [
  { name: 'Altos by Acer',     logo: '/logos/altos.svg', lc: FC, tag: 'Infrastructure', desc: 'Enterprise-grade server hardware by Acer   purpose-built for on-premises sovereign AI deployments at scale.' },
  { name: 'NVIDIA & Qualcomm', icons: [SiNvidia, SiQualcomm], tag: 'AI Hardware',   desc: 'NVIDIA AI accelerators for data-centre inference and Qualcomm edge silicon for last-mile deployments   together covering the full compute stack for sovereign AI.' },
  { name: 'Kogo.ai',           logo: '/logos/kogo.png', tag: 'Private AI OS',  desc: 'AI agentic platform enabling enterprises to build, deploy, and manage custom autonomous agents   the orchestration layer in Arinox\'s agentic stack.' },
];

const LogoBox = ({ Icon, logo, lc, alt, textLabel, boxClass, imgClass, fallback }) => {
  const [failed, setFailed] = useState(false);
  if (Icon) return (
    <div className={`${boxClass} text-brand-muted`}>
      <Icon style={{ width: '100%', height: '100%' }} />
    </div>
  );
  if (textLabel) return (
    <div className={boxClass}>
      <span className="font-bold text-sm tracking-wide text-brand-muted">{textLabel}</span>
    </div>
  );
  if (logo && !failed) return (
    <div className={boxClass}>
      <img src={logo} alt={alt} className={`${imgClass} ${lc || ''}`} onError={() => setFailed(true)} />
    </div>
  );
  return fallback;
};

const Partners = () => {
  return (
    <>
      <SEO
        title="Partners & Ecosystem | Arinox AI"
        description="Arinox works with system integrators, technology partners, and resellers to bring sovereign AI to the organizations that need it most."
        canonical="https://www.arinox.ai/partners"
      />

      {/* Hero */}
      <section className="relative overflow-hidden grid-bg pt-40 pb-24">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs tracking-widest uppercase text-brand-primary mb-4 font-semibold">
                Our Ecosystem
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-3xl md:text-4xl font-display font-bold text-white mb-4 leading-tight">
                Your AI<br /><span className="text-gradient">Force Multiplier.</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-base text-brand-muted leading-relaxed max-w-md">
                We don't scale alone. Arinox works with a curated network of world-class system integrators, hardware innovators, and market-ready resellers   each chosen for their ability to take sovereign AI from proof-of-concept to enterprise production.
              </motion.p>

            </div>
            <div className="hidden md:block h-[340px]">
              <ErrorBoundary><NetworkSphere /></ErrorBoundary>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership tracks */}
      <section className="relative overflow-hidden py-20 border-t border-brand-border">
        <FloatingOrbs preset="cool" />
        <div className="container-wide">
          <div className="max-w-3xl mb-16">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
              Partnership models
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-sm text-brand-muted leading-relaxed">
              Three ways to work with Arinox. Each track is designed for a specific type of partner, with concrete benefits and a clear path to market.
            </motion.p>
          </div>

          <div className="space-y-0 border-t border-brand-border/30">
            {[
              {
                num: '01',
                Icon: Link2,
                label: 'For System Integrators',
                title: 'Deploy with confidence.',
                desc: 'Access pre-validated AI agents ready for enterprise deployment. Co-deliver with Arinox to expand your AI practice   faster go-to-market, larger wins, without building from the ground up.',
                sectors: ['Co-Delivery', 'Pre-built Agents', 'Faster GTM'],
              },
              {
                num: '02',
                Icon: Zap,
                label: 'For Technology Partners',
                title: 'Build where it lands.',
                desc: 'Bring your AI models, hardware, or platform into real enterprise deployments. We co-create products on sovereign infrastructure, open SI channels, and place your technology at the centre of what enterprises are already buying.',
                sectors: ['Co-creation', 'Hardware & Infra', 'GTM Access'],
              },
              {
                num: '03',
                Icon: Package,
                label: 'For Resellers & GTM',
                title: 'Revenue that compounds.',
                desc: 'Extend sovereign AI to markets where trusted local relationships matter. Resell Arinox under your brand with deal registration, margin protection, and full sales and technical enablement behind every conversation.',
                sectors: ['Deal Registration', 'Margin Protection', 'Sales Enablement'],
              },
            ].map(({ num, Icon, label, title, desc, sectors }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="grid md:grid-cols-12 gap-6 py-10 border-b border-brand-border/25"
              >
                <div className="md:col-span-1">
                  <span className="text-3xl font-display font-bold text-brand-primary/20">{num}</span>
                </div>
                <div className="md:col-span-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center flex-shrink-0">
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                    <p className="text-xs text-brand-primary font-semibold tracking-widest uppercase">{label}</p>
                  </div>
                  <h3 className="text-white font-bold text-lg">{title}</h3>
                </div>
                <div className="md:col-span-5">
                  <p className="text-sm text-brand-muted leading-relaxed">{desc}</p>
                </div>
                <div className="md:col-span-3 flex flex-wrap gap-2 items-start">
                  {sectors.map(s => (
                    <span key={s} className="px-2.5 py-1 text-xs rounded-full bg-brand-primary/10 text-brand-primary font-medium">{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Integrators */}
      <section className="py-20 bg-brand-surface border-t border-brand-border">
        <div className="container-wide">
          <div className="flex items-end justify-between mb-10">
            <div>
              <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                System Integrators
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-sm text-brand-muted">
                Delivered through world-class partners who bring enterprise relationships and deployment capability.
              </motion.p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-brand-border/25 rounded-xl overflow-hidden">
            {siPartners.map(({ name, logo, lc }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-brand-bg flex flex-col items-center justify-center p-6 gap-2.5"
              >
                <div className="h-12 w-full flex items-center justify-center">
                  <img src={logo} alt={name} className="max-h-8 max-w-[130px] w-auto object-contain opacity-70" style={{ filter: 'brightness(0) invert(1)' }} />
                </div>
                <p className="text-xs text-brand-muted text-center">{name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Partners */}
      <section className="relative overflow-hidden py-20 border-t border-brand-border">
        <FloatingOrbs preset="warm" />
        <div className="container-wide grid lg:grid-cols-5 gap-14">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <p className="text-xs tracking-widest uppercase text-brand-primary mb-3 font-semibold">Technology Partners</p>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">The Stack Behind<br /><span className="text-gradient">Sovereign AI</span></h2>
              <p className="text-sm text-brand-muted leading-relaxed">
                Arinox co-creates with AI product builders, hardware innovators, and infrastructure providers. These are the companies whose technology we select, validate, and integrate   and with whom we build the next generation of enterprise AI products.
              </p>
            </motion.div>
          </div>
          <div className="lg:col-span-3 space-y-0">
            {techPartners.map(({ name, desc, tag, Icon, icons, logo, lc }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-5 py-6 border-b border-brand-border/25 last:border-0"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/[0.92] border border-white/20 flex items-center justify-center overflow-hidden p-2">
                  {icons ? (
                    <div className="flex items-center justify-center gap-1 w-full h-full text-gray-700">
                      {icons.map((Ic, idx) => <Ic key={idx} style={{ width: '40%', height: '40%' }} />)}
                    </div>
                  ) : (
                    <LogoBox
                      Icon={Icon} logo={logo} lc={lc} alt={name}
                      boxClass="w-full h-full flex items-center justify-center overflow-hidden"
                      imgClass="max-w-full max-h-full object-contain"
                      fallback={
                        <span className="font-bold text-brand-text">{name[0]}</span>
                      }
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold text-sm">{name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary font-semibold uppercase tracking-wider">{tag}</span>
                  </div>
                  <p className="text-sm text-brand-muted leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden line-grid py-24 border-t border-brand-border">
        <div className="orb w-[500px] h-[500px] bg-brand-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="container-wide text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
              Ready to join the <span className="text-gradient">Arinox ecosystem?</span>
            </h2>
            <p className="text-sm text-brand-muted mb-8 max-w-md mx-auto">
              Whether you integrate, build, or sell   there's a partnership structure that accelerates your business and expands what's possible for your customers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/contact" className="px-7 py-3 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:bg-brand-secondary transition-colors">
                Become a Partner
              </Link>
              <a href="mailto:assist@arinox.ai" className="px-5 py-3 text-sm text-brand-muted hover:text-brand-text transition-colors">
                Or email us at assist@arinox.ai
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Partners;
