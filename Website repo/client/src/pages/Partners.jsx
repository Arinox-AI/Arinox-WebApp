import { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';

const SI = 'https://cdn.simpleicons.org';
const WX = 'https://static.wixstatic.com/media';
const CL = 'https://logo.clearbit.com';

// lc = CSS class from index.css for cross-theme logo visibility
const WL = 'logo-white';    // white/light logos (WX CDN)
const CS = 'logo-colored';  // colored simpleicons — inverted to white in dark, original in light
const FC = 'logo-fullcolor'; // full-color Clearbit logos — no filter needed

const techPartners = [
  { name: 'NVIDIA',   desc: 'AI accelerator for inference and training workloads — powering the most demanding enterprise AI deployments.', tag: 'Hardware',      logo: `${SI}/nvidia/76b900`,                                           lc: CS },
  { name: 'Kogo.ai',  desc: 'AI agent platform enabling enterprises to build, deploy, and manage custom autonomous agents at scale.',       tag: 'Agentic Mesh', logo: `${WX}/dd0ee7_dc6ef29b792a48718737ce48d7903a93~mv2.png`,       lc: WL },
  { name: 'Qualcomm', desc: 'Edge AI silicon powering on-device inference across mobile, IoT, and industrial deployments.',                 tag: 'Edge AI',      logo: `${SI}/qualcomm/3253DC`,                                         lc: CS },
];

const siPartners = [
  { name: 'IBM',             logo: `${SI}/ibm/1f70c1`,                                                   lc: CS },
  { name: 'HPE',             logo: `${WX}/ef7a11_64f239e2528b43c2ac75fcc1524bf499~mv2.png`,              lc: WL },
  { name: 'Coforge',         logo: `${WX}/ef7a11_a28551da4b854e8e90260bcd82deb727~mv2.png`,              lc: WL },
  { name: 'NetWeb',          logo: `${CL}/netweb.in`,                                                    lc: FC },
  { name: 'EY',              logo: `${CL}/ey.com`,                                                       lc: FC },
  { name: 'Google Cloud',    logo: `${SI}/googlecloud/4285f4`,                                           lc: CS },
  { name: 'Microsoft Azure', logo: `${SI}/microsoftazure/0078d4`,                                        lc: CS },
  { name: 'AWS',             logo: `${SI}/amazonaws/ff9900`,                                             lc: CS },
];

const enterpriseClients = [
  { name: 'Indian Army',      industry: 'Defense',   impact: '−82% alert-triage time',        logo: `${WX}/ef7a11_58cfd59433de4b5eafbf2f4c5834f321~mv2.png`, lc: WL },
  { name: 'Hitachi',          industry: 'Technology',impact: 'Enterprise AI transformation',  logo: `${CL}/hitachi.com`,                                     lc: FC },
  { name: 'Sun Mobility',     industry: 'Mobility',  impact: 'Intelligent logistics & fleet', logo: `${CL}/sunmobility.co.in`,                               lc: FC },
  { name: 'Sunlife Insurance',industry: 'Insurance', impact: 'Policy & claims AI agents',     logo: `${CL}/sunlife.com`,                                     lc: FC },
];

/* Falls back to a letter avatar if the CDN logo fails to load */
const PartnerLogo = ({ src, alt, lc, imgClass, children }) => {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return children;
  return (
    <img
      src={src}
      alt={alt}
      className={`${imgClass} ${lc || ''}`}
      onError={() => setFailed(true)}
    />
  );
};

const Partners = () => (
  <>
    <SEO
      title="Partners & Ecosystem — Arinox AI"
      description="Arinox sits at the intersection of AI innovators, system integrators, and enterprise clients. Explore our ecosystem of technology partners, SI partners, and enterprise clients."
      canonical="https://www.arinox.ai/partners"
    />

    {/* Hero */}
    <section className="relative pt-40 pb-20 overflow-hidden grid-bg">
      <div className="orb w-[500px] h-[500px] bg-brand-primary/10 top-0 right-0" />
      <div className="container-wide relative">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs tracking-widest uppercase text-brand-primary mb-4">Our Ecosystem</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          Your AI <span className="text-gradient">Force Multiplier.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-sm md:text-base text-brand-muted max-w-xl">
          Arinox sits at the intersection of everyone who matters in AI adoption — amplifying results for enterprises, integrators, and innovators alike.
        </motion.p>
      </div>
    </section>

    {/* Who we serve */}
    <section className="py-16 bg-brand-surface">
      <div className="container-wide">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '🏢', label: 'For Enterprises', title: 'Transformation that fits.', desc: 'Integrate AI into your existing systems — fast. No reengineering. No delays. Smarter operations, better decisions, measurable results.', sectors: ['BFSI', 'Energy', 'Mobility', 'Manufacturing', 'Defense'] },
            { icon: '🔗', label: 'For System Integrators', title: 'Impact that scales.', desc: 'Co-sell and deploy pre-built AI agents across industries. Skip the build-from-scratch phase. Deliver outcomes that land.', sectors: ['Faster GTM', 'Bigger Wins', 'Pre-built Use Cases'] },
            { icon: '💡', label: 'For Technology Vendors', title: 'Adoption that sticks.', desc: 'Partner with us to bring your AI tech to real-world enterprise use. We structure GTM, open SI channels, and accelerate deployment.', sectors: ['GTM Strategy', 'SI Channels', 'Enterprise Reach'] },
          ].map(({ icon, label, title, desc, sectors }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="glass-card rounded-2xl p-8">
              <div className="text-4xl mb-4">{icon}</div>
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

    {/* Technology Partners */}
    <section className="section-padding">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase text-brand-primary mb-3">AI Innovators</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Curating the Best in <span className="text-gradient">Enterprise AI</span></h2>
          <p className="text-brand-muted mt-4 text-sm">Production-ready. Scalable. Agentic.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {techPartners.map(({ name, desc, tag, logo, lc }, i) => (
            <motion.div key={name} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-brand-card border border-brand-border flex items-center justify-center overflow-hidden p-2">
                  <PartnerLogo src={logo} alt={name} lc={lc} imgClass="w-full h-full object-contain">
                    <span className="text-lg font-bold text-brand-text">{name[0]}</span>
                  </PartnerLogo>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-brand-primary/10 text-brand-primary">{tag}</span>
              </div>
              <h3 className="text-white font-bold mb-2">{name}</h3>
              <p className="text-sm text-brand-muted leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* SI Partners */}
    <section className="section-padding bg-brand-surface">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase text-brand-primary mb-3">System Integrators</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Delivering Through <span className="text-gradient">Global Leaders</span></h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {siPartners.map(({ name, logo, lc }, i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="glass-card rounded-xl p-5 flex flex-col items-center gap-3 group hover:border-brand-primary/30 transition-colors">
              <div className="w-24 h-10 flex items-center justify-center">
                <PartnerLogo src={logo} alt={name} lc={lc} imgClass="max-w-full max-h-full object-contain">
                  <div className="w-10 h-10 rounded-xl bg-brand-card border border-brand-border flex items-center justify-center font-bold text-brand-text text-sm">
                    {name[0]}
                  </div>
                </PartnerLogo>
              </div>
              <p className="text-brand-text text-xs font-semibold text-center leading-tight">{name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Enterprise Clients */}
    <section className="section-padding">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase text-brand-primary mb-3">Enterprise Clients</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Transforming the World's <span className="text-gradient">Leading Enterprises</span></h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {enterpriseClients.map(({ name, industry, impact, logo, lc }, i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="glass-card rounded-xl p-6 flex flex-col items-center gap-3 group cursor-default hover:border-brand-primary/30 transition-colors">
              <div className="w-20 h-14 flex items-center justify-center">
                <PartnerLogo src={logo} alt={name} lc={lc} imgClass="max-w-full max-h-full object-contain">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 border border-brand-border flex items-center justify-center font-bold text-brand-text text-sm">
                    {name[0]}
                  </div>
                </PartnerLogo>
              </div>
              <div className="text-center">
                <p className="text-brand-text text-xs font-semibold leading-tight">{name}</p>
                <p className="text-brand-primary text-[10px] mt-0.5">{industry}</p>
                <p className="text-brand-muted text-[10px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{impact}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Become a Partner CTA */}
    <section className="relative py-24 overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-brand-primary/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="container-wide text-center relative">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-6">
          Changing the AI world through <span className="text-gradient">innovative technology?</span>
        </h2>
        <div className="flex justify-center">
          <a href="/contact" className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold text-sm hover:opacity-90 transition-opacity">
            Become a Partner
          </a>
        </div>
      </div>
    </section>
  </>
);

export default Partners;
