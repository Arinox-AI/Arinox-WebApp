import { useState } from 'react';
import { motion } from 'framer-motion';
import { SiNvidia, SiQualcomm } from '@icons-pack/react-simple-icons';
import { Link2, Zap, Package } from 'lucide-react';
import SEO from '../components/ui/SEO';
import NetworkSphere from '../components/ui/NetworkSphere';
import { WM, GF, LOGO_FC as FC } from '../utils/logos';

const siPartners = [
  { name: 'Coforge',      logo: GF('coforge.com'),                                     lc: FC },
  { name: 'Hitachi',      logo: GF('hitachi.com'),                                     lc: FC },
  { name: 'IBM',          logo: WM('5/51/IBM_logo.svg'),                               lc: FC },
  { name: 'HPE',          logo: WM('4/46/Hewlett_Packard_Enterprise_logo.svg'),         lc: FC },
  { name: 'Langoor',      logo: GF('langoor.com'),                                     lc: FC },
  { name: 'TechData',     logo: GF('techdata.com'),                                    lc: FC },
  { name: 'HCL Tech',     logo: WM('e/e5/HCLTech-new-logo.svg'),                      lc: FC },
  { name: 'Acer',         logo: GF('acer.com'),                                        lc: FC },
];

const techPartners = [
  { name: 'Altos by Acer',     logo: GF('altos.acer.com'), lc: FC, tag: 'Infrastructure', desc: 'Enterprise-grade server hardware by Acer — purpose-built for on-premises sovereign AI deployments at scale.' },
  { name: 'NVIDIA & Qualcomm', icons: [SiNvidia, SiQualcomm], tag: 'AI Hardware',   desc: 'NVIDIA AI accelerators for data-centre inference and Qualcomm edge silicon for last-mile deployments — together covering the full compute stack for sovereign AI.' },
  { name: 'Kogo.ai',           logo: 'https://kogo.ai/favicon.png', tag: 'Private AI OS',  desc: 'AI agentic platform enabling enterprises to build, deploy, and manage custom autonomous agents — the orchestration layer in Arinox\'s agentic stack.' },
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
      title="Partners & Ecosystem — Arinox AI"
      description="Arinox works with system integrators, technology partners, and resellers to bring sovereign AI to the organizations that need it most."
      canonical="https://www.arinox.ai/partners"
    />

    {/* Hero */}
    <section className="relative pt-40 pb-20 overflow-hidden grid-bg">
      <div className="orb w-[500px] h-[500px] bg-brand-primary/10 top-0 right-0" />
      <div className="container-wide relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs tracking-widest uppercase text-brand-primary mb-4">Our Ecosystem</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Your AI <span className="text-gradient">Force Multiplier.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-sm md:text-base text-brand-muted max-w-xl">
              We don't scale alone. Arinox works with a curated network of world-class system integrators, hardware innovators, and market-ready resellers — each chosen for their ability to take sovereign AI from proof-of-concept to enterprise production.
            </motion.p>
          </div>

          {/* Right: Three.js Network Sphere */}
          <div className="hidden md:block h-[340px]">
            <NetworkSphere />
          </div>
        </div>
      </div>
    </section>

    {/* Who we work with */}
    <section className="py-16 bg-brand-surface">
      <div className="container-wide">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              Icon: Link2,
              label: 'For System Integrators',
              title: 'Deploy with confidence.',
              desc: 'Access pre-validated AI agents ready for enterprise deployment. Co-deliver with Arinox to expand your AI practice — faster go-to-market, larger wins, without building from the ground up.',
              sectors: ['Co-Delivery', 'Pre-built Agents', 'Faster GTM'],
            },
            {
              Icon: Zap,
              label: 'For Technology Partners',
              title: 'Build where it lands.',
              desc: 'Bring your AI models, hardware, or platform into real enterprise deployments. We co-create products on sovereign infrastructure, open SI channels, and place your technology at the centre of what enterprises are already buying.',
              sectors: ['Co-creation', 'Hardware & Infra', 'GTM Access'],
            },
            {
              Icon: Package,
              label: 'For Resellers & GTM',
              title: 'Revenue that compounds.',
              desc: 'Extend sovereign AI to markets where trusted local relationships matter. Resell Arinox under your brand with deal registration, margin protection, and full sales and technical enablement behind every conversation.',
              sectors: ['Deal Registration', 'Margin Protection', 'Sales Enablement'],
            },
          ].map(({ Icon, label, title, desc, sectors }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="glass-card rounded-2xl p-8">
              <div className="w-11 h-11 rounded-xl bg-brand-primary/10 text-brand-muted flex items-center justify-center mb-4">
                <Icon size={22} strokeWidth={1.6} />
              </div>
              <p className="text-xs text-brand-primary font-semibold tracking-widest uppercase mb-2">{label}</p>
              <h3 className="text-white font-bold text-base mb-2">{title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed mb-4">{desc}</p>
              <div className="flex flex-wrap gap-2">
                {sectors.map(s => <span key={s} className="px-2 py-1 text-xs rounded-lg bg-brand-primary/10 text-brand-primary">{s}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* System Integrators */}
    <section className="section-padding">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase text-brand-primary mb-3">System Integrators</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Delivered Through <span className="text-gradient">World-Class Partners</span></h2>
          <p className="text-brand-muted mt-4 text-sm max-w-2xl mx-auto">
            Our SI partners bring the enterprise relationships, delivery capability, and domain expertise that take sovereign AI from proof-of-concept to production. We co-deliver, co-sell, and jointly build with integrators who can move fast and land outcomes.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {siPartners.map(({ name, Icon, color, logo, lc, textLabel, textColor }, i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="glass-card rounded-xl p-5 sm:p-6 flex flex-col items-center gap-4 group hover:border-brand-primary/30 transition-colors">
              <LogoBox
                Icon={Icon} logo={logo} lc={lc} alt={name}
                textLabel={textLabel}
                boxClass="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/90 border border-white/20 flex items-center justify-center overflow-hidden p-2"
                imgClass="w-full h-full object-contain"
                fallback={
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border border-brand-border flex items-center justify-center font-bold text-brand-text text-lg">
                    {name[0]}
                  </div>
                }
              />
              <p className="text-brand-text text-xs font-semibold text-center leading-tight">{name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Technology Partners */}
    <section className="section-padding bg-brand-surface">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase text-brand-primary mb-3">Technology Partners</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white">The Stack Behind <span className="text-gradient">Sovereign AI</span></h2>
          <p className="text-brand-muted mt-4 text-sm max-w-2xl mx-auto">
            Arinox co-creates with AI product builders, hardware innovators, and infrastructure providers. These are the companies whose technology we select, validate, and integrate — and with whom we build the next generation of enterprise AI products.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {techPartners.map(({ name, desc, tag, Icon, icons, chips, color, logo, lc }, i) => (
            <motion.div key={name} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                {icons ? (
                  <div className="w-14 h-14 rounded-xl bg-white/90 border border-white/20 flex items-center justify-center gap-1.5 p-2 text-gray-700 shrink-0">
                    {icons.map((Ic, idx) => <Ic key={idx} style={{ width: '42%', height: '42%' }} />)}
                  </div>
                ) : (
                  <LogoBox
                    Icon={Icon} logo={logo} lc={lc} alt={name}
                    boxClass="w-14 h-14 rounded-xl bg-white/90 border border-white/20 flex items-center justify-center overflow-hidden p-2"
                    imgClass="w-full h-full object-contain"
                    fallback={
                      <div className="w-14 h-14 rounded-xl bg-white/10 border border-brand-border flex items-center justify-center font-bold text-brand-text">
                        {name[0]}
                      </div>
                    }
                  />
                )}
                <span className="text-xs px-2 py-1 rounded-full bg-brand-primary/10 text-brand-primary">{tag}</span>
              </div>
              <h3 className="text-white font-bold mb-2">{name}</h3>
              <p className="text-sm text-brand-muted leading-relaxed">{desc}</p>
              {chips && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-brand-border">
                  {chips.map((Ic, idx) => (
                    <div key={idx} className="w-6 h-6 text-brand-muted opacity-60">
                      <Ic style={{ width: '100%', height: '100%' }} />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Partner CTA */}
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-brand-primary/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="container-wide text-center relative px-4">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
          Ready to join the <span className="text-gradient">Arinox ecosystem?</span>
        </h2>
        <p className="text-brand-muted text-sm mb-8 max-w-md mx-auto">
          Whether you integrate, build, or sell — there's a partnership structure that accelerates your business and expands what's possible for your customers.
        </p>
        <div className="flex justify-center">
          <a href="/contact" className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold text-sm hover:opacity-90 transition-opacity">
            Become a Partner
          </a>
        </div>
      </div>
    </section>
  </>
  );
};

export default Partners;
