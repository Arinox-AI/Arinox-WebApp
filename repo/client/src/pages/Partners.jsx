import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { Section } from '../components/site/Section';
import { Label } from '../components/site/Layout';
import { Button } from '../components/site/Button';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { CtaBand } from '../components/site/Shell';
import { company } from '../data/site';

/* Quiet inline row, the parts, not a trophy wall. */
/* Grouped, but quietly: clusters are separated by a hairline and a very
   light mono label, so the roles read without being announced. */
const partnerGroups = [
  {
    label: 'Compute',
    items: [
      { name: 'E2E Cloud', logo: '/images/logos/e2e-networks.png', h: 'h-14' },
      { name: 'Altos', logo: '/images/logos/altos.svg', h: 'h-7' },
      { name: 'HP', logo: '/images/logos/hp.svg', h: 'h-8' },
      { name: 'IBM', logo: '/images/logos/ibm.svg', h: 'h-8' },
    ],
  },
  {
    label: 'Silicon',
    items: [
      { name: 'NVIDIA', logo: '/images/logos/NVIDIA_logo.svg', h: 'h-7' },
      { name: 'Qualcomm', logo: '/images/logos/qualcomm.svg', h: 'h-7' },
    ],
  },
  {
    label: 'Distribution',
    items: [
      { name: 'TechData', logo: '/images/logos/techdata.svg', h: 'h-7' },
      { name: 'Redington', logo: '/images/logos/redington.svg', h: 'h-7' },
    ],
  },
  {
    label: 'Data',
    items: [
      { name: 'Dataquark', logo: '/images/logos/dataquark.png', h: 'h-11' },
      { name: 'LS Digital', logo: '/images/logos/lsdigital.png', h: 'h-12' },
    ],
  },
];

const tracks = [
  {
    num: '01',
    label: 'For System Integrators',
    title: 'Deploy with confidence.',
    desc: 'Access pre-validated AI agents ready for enterprise deployment. Co-deliver with Arinox to expand your AI practice, faster go-to-market, larger wins, without building from the ground up.',
    tags: ['Co-delivery', 'Pre-built agents', 'Faster GTM'],
  },
  {
    num: '02',
    label: 'For Technology Partners',
    title: 'Build where it lands.',
    desc: 'Bring your AI models, hardware, or platform into real enterprise deployments. We co-create on sovereign infrastructure and open SI channels.',
    tags: ['Co-creation', 'Hardware & infra', 'GTM access'],
  },
  {
    num: '03',
    label: 'For Resellers & GTM',
    title: 'Revenue that compounds.',
    desc: 'Extend sovereign AI to markets where trusted local relationships matter. Resell under your brand with deal registration, margin protection, and enablement.',
    tags: ['Deal registration', 'Margin protection', 'Sales enablement'],
  },
];

const Partners = () => (
  <>
    <SEO
      title="Partners | Sovereign AI, Delivered Together | Arinox AI"
      description="Arinox assembles a focused stack, infrastructure, hardware, silicon and data, into one governed system that runs inside your perimeter."
      canonical="https://www.arinox.ai/partners"
    />

    <section className="relative overflow-hidden border-b border-line px-7 pb-12 pt-20 md:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
        <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <Label>Partners</Label>
        <h1 className="mt-5 max-w-3xl font-display text-[40px] leading-[1.06] tracking-[-0.025em] md:text-[62px]">
          One stack, assembled around <span className="italic text-ember">your constraint.</span>
        </h1>
        <p className="mt-6 max-w-[600px] text-lg leading-relaxed text-ink-soft">
          We don&apos;t collect vendors. Every deployment is built from a small, deliberate set of
          parts, and orchestrated by us, so what you run is one governed system.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Button to="/contact" variant="dark">
            Partner with us <ArrowUpRight size={14} strokeWidth={2.2} />
          </Button>
          <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint transition-colors hover:text-ink">
            LinkedIn <ArrowUpRight size={14} strokeWidth={2.2} />
          </a>
        </div>
      </div>
    </section>

    <Section border={false}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3">
        <p className="eyebrow text-ink-faint">Built with</p>
        <p className="max-w-sm text-[14px] leading-relaxed text-ink-faint">
          A small, deliberate stack, assembled and governed by us.
        </p>
      </div>

      <div className="mt-10 border-t border-ink/80">
        {partnerGroups.map((g) => (
          <div
            key={g.label}
            className="grid gap-y-5 border-b border-line py-7 md:grid-cols-[150px_1fr] md:items-center md:gap-x-12 md:py-8"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">{g.label}</p>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
              {g.items.map((s) => (
                <img
                  key={s.name}
                  src={s.logo}
                  alt={s.name}
                  loading="lazy"
                  className={`w-auto shrink-0 object-contain opacity-70 transition-opacity duration-200 hover:opacity-100 ${s.h}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>

    <Section border>
      <Label>Working with us</Label>
      <h2 className="mt-5 max-w-2xl font-display text-[32px] leading-[1.08] tracking-[-0.02em] md:text-[44px]">
        Three ways to partner.
      </h2>
      <div className="mt-12 border-t border-ink/80">
        {tracks.map(({ num, label, title, desc, tags }) => (
          <div key={label} className="grid gap-6 border-b border-line py-8 md:grid-cols-12">
            <div className="md:col-span-1">
              <span className="num font-mono text-2xl text-ink-faint">{num}</span>
            </div>
            <div className="md:col-span-3">
              <p className="eyebrow text-ember-deep">{label}</p>
              <h3 className="mt-2 font-display text-lg tracking-[-0.01em]">{title}</h3>
            </div>
            <div className="md:col-span-5">
              <p className="text-[14.5px] leading-relaxed text-ink-soft">{desc}</p>
            </div>
            <div className="flex flex-wrap items-start gap-2 md:col-span-3">
              {tags.map((t) => (
                <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>

    <CtaBand
      title="Partner with Arinox."
      offer={
        <>
          Bring your practice, platform, or channel.{' '}
          <b className="font-medium text-white">It starts with a conversation.</b>
        </>
      }
    />
  </>
);

export default Partners;
