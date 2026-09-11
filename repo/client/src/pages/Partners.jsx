import { Link } from 'react-router-dom';
import { Link2, Zap, Package, ArrowRight } from 'lucide-react';
import SEO from '../components/ui/SEO';
import Reveal from '../components/ui/Reveal';
import SectionHead from '../components/ui/SectionHead';
import LogoWall from '../components/ui/LogoWall';
import { deliveryPartners } from '../data/clients';

const tracks = [
  {
    num: '01',
    Icon: Link2,
    label: 'For System Integrators',
    title: 'Deploy with confidence.',
    desc: 'Access pre-validated AI agents ready for enterprise deployment. Co-deliver with Arinox to expand your AI practice — faster go-to-market, larger wins, without building from the ground up.',
    tags: ['Co-delivery', 'Pre-built agents', 'Faster GTM'],
  },
  {
    num: '02',
    Icon: Zap,
    label: 'For Technology Partners',
    title: 'Build where it lands.',
    desc: 'Bring your AI models, hardware, or platform into real enterprise deployments. We co-create products on sovereign infrastructure, open SI channels, and place your technology at the centre of what enterprises are already buying.',
    tags: ['Co-creation', 'Hardware & infra', 'GTM access'],
  },
  {
    num: '03',
    Icon: Package,
    label: 'For Resellers & GTM',
    title: 'Revenue that compounds.',
    desc: 'Extend sovereign AI to markets where trusted local relationships matter. Resell Arinox under your brand with deal registration, margin protection, and full sales and technical enablement behind every conversation.',
    tags: ['Deal registration', 'Margin protection', 'Sales enablement'],
  },
];

const techStack = [
  {
    name: 'KOGO',
    tag: 'Agentic platform',
    desc: 'The agentic layer we deploy for every engagement — agent building, orchestration, memory, and governance. An affiliated technology of the Arinox family, purpose-built for private enterprise AI.',
  },
  {
    name: 'Altos by Acer',
    tag: 'Infrastructure',
    desc: 'Enterprise-grade server hardware purpose-built for on-premises sovereign AI deployments at scale.',
  },
];

const Partners = () => (
    <>
      <SEO
        title="Partners & Ecosystem | Arinox AI"
        description="Arinox works with system integrators, technology partners, and resellers to deliver private AI to the organisations that need it most."
        canonical="https://www.arinox.ai/partners"
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="pt-32 md:pt-40 pb-14 md:pb-16 border-b border-brand-border">
        <div className="container-wide grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="overline">Ecosystem</p>
              <h1 className="text-4xl md:text-5xl font-display font-extrabold leading-[1.08] mb-6 max-w-2xl">
                Sovereign AI,<br /><span className="text-gradient">delivered together.</span>
              </h1>
              <p className="lead max-w-xl">
                We don&rsquo;t scale alone. Arinox works with a curated network of system integrators, hardware
                innovators, and market-ready resellers — each chosen for their ability to take private AI from
                proof-of-concept to enterprise production.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <div className="card p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-subtle mb-3" style={{ fontFamily: 'Manrope' }}>
                  The model in one line
                </p>
                <p className="text-[14px] text-brand-muted leading-relaxed">
                  <strong className="text-brand-text">Arinox</strong> owns the transformation journey.{' '}
                  <strong className="text-brand-text">CommandCore</strong> is the platform.{' '}
                  <strong className="text-brand-text">KOGO</strong> is the agentic layer.{' '}
                  <strong className="text-brand-text">Partners</strong> take it to every enterprise that needs it.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Delivery partners ─────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHead
            overline="Delivery partners"
            title="World-class delivery, on the ground."
            lead="System integrators and infrastructure specialists who bring enterprise relationships and deployment capability to every engagement."
            className="mb-10"
          />
          <LogoWall items={deliveryPartners} cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" />
        </div>
      </section>

      {/* ── Technology we build on ────────────────────────────── */}
      <section className="section-padding bg-brand-surface border-y border-brand-border">
        <div className="container-wide grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionHead
              overline="Technology we build on"
              title="The stack behind private AI."
              lead="The technologies we select, validate, and integrate into every CommandCore deployment."
            />
          </div>
          <div className="lg:col-span-8 space-y-4">
            {techStack.map(({ name, tag, desc }, i) => (
              <Reveal key={name} delay={i * 0.07}>
                <div className="card card-hover p-6 md:p-7">
                  <div className="flex items-center gap-2.5 mb-2">
                    <h3 className="font-display font-bold text-[16px]">{name}</h3>
                    <span className="chip">{tag}</span>
                  </div>
                  <p className="text-[13.5px] text-brand-muted leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.15}>
              <div className="card p-6 md:p-7">
                <div className="flex items-center gap-2.5 mb-2">
                  <h3 className="font-display font-bold text-[16px]">Compute accelerators</h3>
                  <span className="chip">Hardware</span>
                </div>
                <p className="text-[13.5px] text-brand-muted leading-relaxed">
                  CommandCore systems are engineered around leading GPU accelerators — selected per deployment for
                  the right balance of performance, power, and environment. Exact silicon choices are part of every
                  solution architecture.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Partnership models ────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHead
            overline="Partnership models"
            title="Three ways to work with Arinox."
            lead="Each track is designed for a specific type of partner, with concrete benefits and a clear path to market."
            className="mb-10"
          />
          <div className="border-t border-brand-border">
            {tracks.map(({ num, Icon, label, title, desc, tags }, i) => (
              <Reveal key={label} delay={i * 0.07}>
                <div className="grid md:grid-cols-12 gap-6 py-8 border-b border-brand-border">
                  <div className="md:col-span-1">
                    <span className="step-num text-2xl">{num}</span>
                  </div>
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="w-8 h-8 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                        <Icon size={15} strokeWidth={1.8} className="text-brand-primary" />
                      </div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-primary" style={{ fontFamily: 'Manrope' }}>{label}</p>
                    </div>
                    <h3 className="font-display font-bold text-lg">{title}</h3>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-[13.5px] text-brand-muted leading-relaxed">{desc}</p>
                  </div>
                  <div className="md:col-span-3 flex flex-wrap gap-2 items-start">
                    {tags.map((t) => <span key={t} className="chip">{t}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="band-ink">
        <div className="container-wide py-20 text-center max-w-3xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold leading-[1.15] mb-5">
              Ready to join the Arinox ecosystem?
            </h2>
            <p className="lead mb-8" style={{ color: 'rgba(242,239,233,0.72)' }}>
              Whether you integrate, build, or sell — there&rsquo;s a partnership structure that accelerates your business and expands what&rsquo;s possible for your customers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/contact" className="btn btn-on-dark">
                Become a partner <ArrowRight size={16} />
              </Link>
              <a href="mailto:assist@arinox.ai" className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">
                Or email us at assist@arinox.ai
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );

export default Partners;
