import { FileDown } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { Section } from '../components/site/Section';
import { Button } from '../components/site/Button';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { ComplianceStrip } from '../components/site/ComplianceStrip';
import { Label } from '../components/site/Layout';
import { CtaBand } from '../components/site/Shell';
import { tiers, headlineClaims, governance, kogo } from '../data/commandcore';
import { complianceGroups } from '../data/compliance';

const SPECS_PDF = '/downloads/arinox-commandcore-specs.pdf';

const tierImages = {
  s: '/images/commandcore/commandcore-s1.webp',
  m: '/images/commandcore/commandcore-m1.webp',
  xl: '/images/commandcore/commandcore-xl2.webp',
};

const uses = [
  { k: 'Defence', t: 'Tactical deployments', d: 'Sovereign systems under national security constraints, audited end to end, swarm coordination for autonomous platforms.' },
  { k: 'Field ops', t: 'Remote sites', d: 'Mines, plants, vessels, outposts, intelligence where backhaul doesn’t exist. Rugged, self-contained operation.' },
  { k: 'Regulated', t: 'Compliance-first estates', d: 'BFSI and healthcare floors where the regulator knows the data never moved. Audit coverage by architecture.' },
];

const runsOn = [
  'Large model inference', 'Document intelligence', 'Computer vision', 'Voice agents',
  'Multi-agent orchestration', 'Cloud-free simulation', 'Real-time intelligence', 'Autonomous systems & IoT AI',
  'Batch processing', 'Edge video analytics', 'Enterprise telephony', 'Cited, governed knowledge',
];

const CommandCore = () => (
  <>
    <SEO
      title="CommandCore™ | Sovereign AI Platform | Arinox AI"
      description="CommandCore is Arinox's sovereign AI micro-datacenter: compute, models, the KOGO agentic layer, and governance inside your perimeter. 100% AI, 0% internet, fully air-gapped."
      canonical="https://www.arinox.ai/commandcore"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'CommandCore',
        category: 'Sovereign on-premises AI infrastructure',
        description:
          'Self-contained AI micro-datacenter, compute, models, the KOGO agentic layer, and governance inside your perimeter. Fully air-gapped, built in India.',
        brand: { '@type': 'Brand', name: 'Arinox AI' },
        manufacturer: { '@type': 'Organization', name: 'Arinox AI', url: 'https://www.arinox.ai' },
      }}
    />

    <section className="relative overflow-hidden px-7 pb-8 pt-20 md:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
        <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
      </div>
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div className="text-center lg:text-left">
          <div className="mb-5 flex justify-center lg:justify-start"><Label>Sovereign · on-premises · air-gapped</Label></div>
          <h1 className="font-display text-[40px] leading-[1.06] tracking-[-0.025em] md:text-[62px]">
            Command<span className="italic text-ember">Core™</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[540px] text-lg leading-relaxed text-ink-soft lg:mx-0">
            The machine itself, air-gapped, in your building, answering to nobody&apos;s cloud.
            Same agents, same governance, zero egress.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 font-mono text-[11.5px] text-ink-faint lg:justify-start">
            <span className="rounded-full border border-line bg-white px-3 py-1">100% AI · 0% internet</span>
            <span className="rounded-full border border-line bg-white px-3 py-1">runs on your hardware</span>
            <span className="rounded-full border border-line bg-white px-3 py-1">zero egress</span>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
            <Button to="/contact" variant="ember">Book a discovery session</Button>
            <Button href={SPECS_PDF} download variant="dark">
              <FileDown size={17} strokeWidth={2.2} />
              Download specs
            </Button>
          </div>
        </div>

        <div className="product-stage relative mx-auto w-full max-w-[520px] overflow-hidden rounded-2xl border border-line p-8">
          <img src={tierImages.xl} alt="CommandCore XL" className="mx-auto w-full drop-shadow-[0_34px_54px_rgba(11,11,13,0.25)]" />
        </div>
      </div>
    </section>

    {/* Headline claims */}
    <Section border={false}>
      <div className="grid gap-10 md:grid-cols-3">
        {headlineClaims.map((c) => (
          <div key={c.big} className="border-t border-ink/80 pt-6">
            <p className="num font-display text-[38px] leading-none tracking-[-0.03em]">{c.big}</p>
            <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.12em] text-ember-deep">{c.small}</p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">{c.note}</p>
          </div>
        ))}
      </div>
    </Section>

    {/* Lineup, spec sheet */}
    <Section border>
      <Label>The lineup</Label>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-2xl font-display text-[32px] leading-[1.08] tracking-[-0.02em] md:text-[44px]">
          Three machines. One operating system.
        </h2>
        <p className="max-w-sm text-[15px] leading-relaxed text-ink-soft">
          Pick the footprint that fits the room. Every form factor runs the same agents, the same
          governance, and the same zero-egress promise.
        </p>
      </div>

      <div className="mt-12 border-t border-ink/80">
        {tiers.map((m) => (
          <div key={m.id} className="grid items-center gap-8 border-b border-line py-8 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
            <div className="product-stage relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-line p-8">
              <img
                src={tierImages[m.id]}
                alt={m.name}
                loading="lazy"
                className="max-h-full w-auto object-contain drop-shadow-[0_18px_30px_rgba(11,11,13,0.18)]"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-[24px] tracking-[-0.01em]">{m.name}</h3>
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ember-deep">{m.tagline}</span>
              </div>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft">{m.desc}</p>
              <div className="mt-5">
                {m.specs.slice(0, 3).map((s) => (
                  <div key={s.label} className="grid grid-cols-[110px_1fr] gap-4 border-t border-line py-2.5 text-[13.5px]">
                    <span className="eyebrow text-ink-faint">{s.label}</span>
                    <span className="font-medium">{s.value[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>

    {/* Compliance, hardware marks only */}
    <Section border>
      <Label>Compliance</Label>
      <div className="mt-6 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <h2 className="max-w-md font-display text-[28px] leading-tight tracking-[-0.01em] md:text-[38px]">
            Certified to ship into regulated environments.
          </h2>
          <p className="mt-4 max-w-sm text-[15.5px] leading-relaxed text-ink-soft">
            The appliance carries the product-safety and quality marks enterprise and government
            buyers require.
          </p>
        </div>
        <ComplianceStrip
          groups={complianceGroups.filter((g) => g.key === 'hardware')}
          className="self-center"
        />
      </div>
    </Section>

    {/* Why a box */}
    <Section border>
      <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Label>Why a box, not a cloud</Label>
          <h2 className="mt-5 font-display text-[30px] leading-tight tracking-[-0.01em] md:text-[40px]">
            Compliance is where the compute sits.
          </h2>
          <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-ink-soft">
            A model that never leaves the building cannot leak. CommandCore puts the compute, the
            data, and the audit trail inside your walls, and leaves them there.
          </p>
        </div>
        <div className="border-t border-ink/80">
          {governance.map((g) => (
            <div key={g.title} className="border-b border-line py-5">
              <p className="font-display text-[18px] tracking-[-0.01em]">{g.title}</p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>

    {/* What runs on it */}
    <Section dark border={false}>
      <Label dark>What runs on it</Label>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-2xl font-display text-[30px] leading-tight tracking-[-0.01em] text-phos md:text-[42px]">
          No prototypes. 80+ enterprise-ready agents deployable today.
        </h2>
        <p className="max-w-sm text-[15px] leading-relaxed text-ghost">
          All local, all logged. Powered by KOGO OS.
        </p>
      </div>
      <div className="mt-12 grid gap-x-16 sm:grid-cols-2">
        {runsOn.map((w) => (
          <div key={w} className="border-b border-white/10 py-3.5 text-[14.5px] text-ghost">{w}</div>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap gap-2.5">
        {kogo.badges.map((b, i) => (
          <span key={b} className={`rounded-full border px-4 py-1.5 text-sm font-medium ${i === 0 ? 'border-ember bg-ember text-white' : 'border-white/25 text-ghost'}`}>{b}</span>
        ))}
      </div>
    </Section>

    {/* Where it goes */}
    <Section border>
      <Label>Where it goes</Label>
      <h2 className="mt-5 max-w-2xl font-display text-[30px] leading-tight tracking-[-0.01em] md:text-[42px]">
        Built for the edges of the map.
      </h2>
      <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-3">
        {uses.map((u) => (
          <div key={u.t} className="border-t border-ink/80 pt-6">
            <p className="eyebrow text-ink-faint">{u.k}</p>
            <h3 className="mt-4 font-display text-[21px] tracking-[-0.01em]">{u.t}</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">{u.d}</p>
          </div>
        ))}
      </div>
      <p className="mt-12 text-[13.5px] text-ink-faint">We run your workload on the appliance before you commit. Seeing beats believing.</p>
    </Section>

    <CtaBand
      title="Ask for the benchmarks."
      offer={
        <>
          We&apos;ll run your workload on the appliance before you commit.{' '}
          <b className="font-medium text-white">Seeing beats believing.</b>
        </>
      }
    />
  </>
);

export default CommandCore;
