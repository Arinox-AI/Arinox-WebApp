import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FileDown } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { Label } from '../components/site/Layout';
import { Section } from '../components/site/Section';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { RequestForm } from '../components/site/RequestForm';
import { Button } from '../components/site/Button';
import { IndexStrip } from '../components/site/IndexStrip';
import { ProductTour } from '../components/site/ProductTour';
import { SystemsPanel, WatchListCard, LoopBoard } from '../components/site/SuiteSections';
import { industrialSuite } from '../data/industrialSuite';

/* Manufacturing OS — brief page. Composition: hero → on-page index → the
   capabilities ledger → the lifecycle tour → what changed (dark) → the
   control plane → the deck. All sections share the ledger style:
   hairline rules, square corners, no card grids. */

const IndustrialSuite = () => (
  <>
    <SEO
      title="Manufacturing OS | The AI way to run manufacturing operations | Arinox AI"
      description="Manufacturing OS is one AI-native control plane for manufacturing across industries — steel, garments, automotive, electronics, food and furniture. Planning, production, machines, materials, quality and maintenance read together. Request the deck by email."
      canonical="https://www.arinox.ai/industries/industrial"
    />

    {/* Hero */}
    <section className="relative overflow-hidden border-b border-line px-7 pb-10 pt-16 md:pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
        <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <Link
          to="/industries"
          className="inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.08em] text-ink-faint transition-colors hover:text-ink"
        >
          <ArrowLeft size={13} strokeWidth={2.2} />
          All products
        </Link>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          <div>
            <Label>{industrialSuite.overline}</Label>
            <h1 className="mt-5 max-w-3xl font-display text-[40px] leading-[1.06] tracking-[-0.025em] md:text-[62px]">
              {industrialSuite.hero.h1Lead}{' '}
              <span className="italic text-ember">{industrialSuite.hero.h1Accent}</span>
            </h1>
            <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.16em] text-ink-soft">{industrialSuite.tagline}</p>
            <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-ink-soft">{industrialSuite.lead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="#deck" variant="ember">
                <FileDown size={16} strokeWidth={2.2} />
                {industrialSuite.request.ctaButton}
              </Button>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border-b border-line pb-1 font-mono text-[12px] uppercase tracking-[0.08em] text-ink transition-colors hover:border-ink"
              >
                Book a discovery session
                <ArrowRight size={14} strokeWidth={2.2} />
              </Link>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/industries/industrial-line.svg"
              alt="A factory building with smokestacks and a delivery truck outside"
              loading="eager"
              className="mx-auto w-full max-w-[480px]"
            />
          </div>
        </div>
      </div>
    </section>

    {/* On-page index, the reading path in three moves */}
    <IndexStrip
      items={[
        { n: '01', label: industrialSuite.gap.label, href: '#changed' },
        { n: '02', label: industrialSuite.cockpit.label, href: '#cockpit' },
        { n: '03', label: industrialSuite.request.label, href: '#deck' },
      ]}
    />

    {/* The capabilities ledger */}
    <Section id="systems" border={false} dense>
      <SystemsPanel suite={industrialSuite} />
    </Section>

    {/* The lifecycle tour — stage by stage, with the OS's own console */}
    <Section id="tour" border dense>
      <ProductTour tour={industrialSuite.tour} />
    </Section>

    {/* What changed — the statement, and the watch list it produces */}
    <Section id="changed" dark border={false} dense className="relative overflow-hidden">
      {/* backdrop: ember glow + faint grid, the depth layer under the text */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_15%_0%,rgba(255,99,1,0.14),transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_85%_65%_at_50%_0%,black_25%,transparent_80%)]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
      </div>

      <div className="relative">
        <div className="max-w-4xl">
          <Label dark>{industrialSuite.gap.label}</Label>
          <h2 className="mt-6 font-display text-[34px] leading-[1.05] tracking-[-0.02em] text-phos md:text-[52px]">
            {industrialSuite.gap.titleLead}{' '}
            <span className="italic text-ember">{industrialSuite.gap.titleAccent}</span>{' '}
            {industrialSuite.gap.titleRest}
          </h2>
          <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-ghost md:text-[19px]">
            {industrialSuite.gap.note}
          </p>
        </div>

        {/* the argument: the watch list itself, then what slips without a control plane */}
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <WatchListCard suite={industrialSuite} />

          <ol className="border-t border-white/15">
            {industrialSuite.gap.slips.map((s, i) => (
              <li
                key={s.t}
                className="group relative flex items-start gap-4 border-b border-white/10 py-4 transition-colors hover:bg-white/[0.03] md:py-5"
              >
                <span className="num mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ember/40 font-mono text-[10px] text-ember">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-[19px] leading-snug tracking-[-0.01em] text-phos md:text-[21px]">{s.t}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ghost">{s.d}</p>
                </div>
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-ember transition-transform duration-300 group-hover:scale-y-100"
                />
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-10 inline-flex items-center gap-3 font-mono text-[11.5px] uppercase tracking-[0.12em] text-ghost/70">
          Without a control plane, this is where the margin goes.
          <span className="inline-block h-3 w-[6px] animate-pulse bg-ember" aria-hidden />
        </p>
      </div>
    </Section>

    {/* The control plane — one board, read left to right, then looped back */}
    <Section id="cockpit" border dense>
      <Label>{industrialSuite.cockpit.label}</Label>
      <h2 className="mt-5 max-w-3xl font-display text-[30px] leading-[1.08] tracking-[-0.02em] md:text-[40px]">
        {industrialSuite.cockpit.title}
      </h2>

      <LoopBoard suite={industrialSuite} />

      <div className="mt-8 flex items-start gap-3 border-t border-line pt-5">
        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ember" aria-hidden />
        <p className="max-w-3xl text-[15.5px] leading-relaxed text-ink">{industrialSuite.cockpit.command}</p>
      </div>
    </Section>

    {/* The deck */}
    <Section border dense>
      <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Label>{industrialSuite.request.label}</Label>
          <h2 className="mt-5 max-w-md font-display text-[30px] leading-tight tracking-[-0.01em] md:text-[40px]">
            {industrialSuite.request.title}
          </h2>
          <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-ink-soft">{industrialSuite.request.note}</p>

          <div className="relative mt-10 max-w-md">
            <span aria-hidden className="absolute left-5 right-5 top-0 h-full translate-y-3 rounded-xl border border-line bg-white/50" />
            <span aria-hidden className="absolute left-2.5 right-2.5 top-0 h-full translate-y-1.5 rounded-xl border border-line bg-white/75" />
            <div className="relative flex items-center gap-5 rounded-xl border border-line bg-white p-5 shadow-[0_20px_50px_-38px_rgba(11,11,13,0.6)]">
              <div aria-hidden className="flex h-16 w-[5.75rem] shrink-0 flex-col justify-between rounded-md bg-ink p-2.5">
                <span className="font-mono text-[6.5px] uppercase tracking-[0.16em] text-ember">Manufacturing OS</span>
                <span className="block h-px w-6 bg-ember/80" />
                <span className="font-mono text-[6px] uppercase tracking-[0.16em] text-white/40">The deck</span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ember-deep">Manufacturing OS</p>
                <p className="mt-1 font-display text-[19px] tracking-[-0.01em]">The deck</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
                  Straight to your inbox · .pdf
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="eyebrow text-ink-faint">What happens next</p>
            <div className="mt-4 border-t border-ink/80">
              {industrialSuite.request.autoReply.steps.map((s, i) => (
                <div key={s} className="group grid grid-cols-[auto_1fr] gap-x-4 border-b border-line py-3.5">
                  <span className="num pt-0.5 font-mono text-[12px] text-ember-deep">{i + 1}</span>
                  <span className="text-[14.5px] leading-relaxed text-ink-soft">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <RequestForm
          id="deck"
          label={industrialSuite.request.formLabel}
          note=""
          success={industrialSuite.request.success}
          role={industrialSuite.request.role}
          message={industrialSuite.request.message}
          cta={industrialSuite.request.ctaButton}
          autoReply={industrialSuite.request.autoReply}
        />
      </div>
    </Section>
  </>
);

export default IndustrialSuite;
