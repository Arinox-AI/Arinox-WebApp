import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FileDown } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { Label } from '../components/site/Layout';
import { Section } from '../components/site/Section';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { inquiries } from '../data/inquiries';
import { Button } from '../components/site/Button';
import { IndexStrip } from '../components/site/IndexStrip';
import { VideoEmbed } from '../components/site/VideoEmbed';
import { ProductTour } from '../components/site/ProductTour';
import { SystemsPanel, WatchListCard, LoopBoard } from '../components/site/SuiteSections';
import { digitalTwinSuite } from '../data/digitalTwinSuite';

/* Digital Twin++ — suite page. Composition: hero → on-page index → the
   modules ledger → the tour → the four levels → where it lands + sovereignty →
   what changed (dark) → the control plane → the film (theatre playback) → the brief. Ledger style:
   hairline rules, square corners, no card grids. */

const DigitalTwinSuite = () => (
  <>
    <SEO
      title="Digital Twin++ | The sovereign AI digital twin for government and defence | Arinox AI"
      description="Arinox Digital Twin++ is a sovereign, AI-native digital twin for critical sites: one live picture that predicts what happens next and acts on it with a human approving every step, air-gapped on hardware you own. Built for airports, defence bases, ports, rail, power and secure campuses. Request the brief by email."
      canonical="https://www.arinox.ai/industries/digital-twin"
    />

    {/* Hero */}
    <section className="relative overflow-hidden border-b border-line px-7 pb-10 pt-16 md:pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
        <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
      </div>
      <div className="relative mx-auto max-w-[68.5rem]">
        <Link
          to="/industries"
          className="-my-3 inline-flex items-center gap-2 py-3 font-mono text-[11.5px] uppercase tracking-[0.08em] text-ink-faint transition-colors hover:text-ink"
        >
          <ArrowLeft size={13} strokeWidth={2.2} />
          All products
        </Link>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          <div>
            <Label>{digitalTwinSuite.overline}</Label>
            <h1 className="mt-5 max-w-3xl font-display text-[40px] leading-[1.06] tracking-[-0.025em] md:text-[62px]">
              {digitalTwinSuite.hero.h1Lead}
              <span className="italic text-ember">{digitalTwinSuite.hero.h1Accent}</span>
            </h1>
            <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.16em] text-ink-soft">{digitalTwinSuite.tagline}</p>
            <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-ink-soft">{digitalTwinSuite.lead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button to={inquiries.deckHref(digitalTwinSuite.request.asset)} variant="ember">
                <FileDown size={16} strokeWidth={2.2} />
                {digitalTwinSuite.request.ctaButton}
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
              src="/images/industries/digital-twin.svg"
              alt="A site with a runway and buildings, and above it a floating twin layer of the same buildings in outline, linked by dotted lines"
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
        { n: '01', label: digitalTwinSuite.levels.label, href: '#levels' },
        { n: '02', label: digitalTwinSuite.sectors.label, href: '#sectors' },
        { n: '03', label: digitalTwinSuite.request.label, href: '#deck' },
      ]}
    />

    {/* The capabilities ledger */}
    <Section id="systems" border={false} dense>
      <SystemsPanel suite={digitalTwinSuite} />
    </Section>

    {/* The perimeter tour — stage by stage, with the OS's own console */}
    <Section id="tour" border dense>
      <ProductTour tour={digitalTwinSuite.tour} />
    </Section>

    {/* The four levels — what 'a twin that thinks' means, in order */}
    <Section id="levels" border dense>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <Label>{digitalTwinSuite.levels.label}</Label>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">{digitalTwinSuite.levels.note}</span>
      </div>
      <ol className="mt-8 grid border-l border-t border-ink/80 sm:grid-cols-2 lg:grid-cols-4">
        {digitalTwinSuite.levels.items.map((l) => (
          <li
            key={l.t}
            className={`border-b border-r border-line p-6 md:p-7 ${l.hot ? 'bg-ember/10' : 'bg-white'}`}
          >
            <span className="num font-display text-[44px] leading-none text-ember">{l.n}</span>
            <h3 className="mt-4 font-display text-[22px] tracking-[-0.01em]">{l.t}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{l.d}</p>
          </li>
        ))}
      </ol>
    </Section>

    {/* Where it lands + the sovereignty promise */}
    <Section id="sectors" border dense>
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Label>{digitalTwinSuite.sectors.label}</Label>
          <h2 className="mt-5 max-w-md font-display text-[30px] leading-[1.08] tracking-[-0.02em] md:text-[40px]">
            {digitalTwinSuite.sectors.title}
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">{digitalTwinSuite.sectors.note}</p>
          <ul className="mt-8 border-t border-ink/80">
            {digitalTwinSuite.sectors.items.map((s, i) => (
              <li key={s.t} className="grid grid-cols-[2.25rem_1fr] items-baseline gap-x-3 border-b border-line py-3.5">
                <span className="font-mono text-[11px] text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="font-display text-[18px] tracking-[-0.01em]">{s.t}</span>
                  <span className="mt-0.5 block text-[13.5px] text-ink-soft">{s.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Label>{digitalTwinSuite.sovereign.label}</Label>
          <h2 className="mt-5 max-w-md font-display text-[30px] leading-[1.08] tracking-[-0.02em] md:text-[40px]">
            {digitalTwinSuite.sovereign.title}
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">{digitalTwinSuite.sovereign.note}</p>
          <ul className="mt-8 border-t border-ink/80">
            {digitalTwinSuite.sovereign.items.map((s) => (
              <li key={s.t} className="flex items-start gap-3 border-b border-line py-3.5">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ember" aria-hidden />
                <span>
                  <span className="font-display text-[18px] tracking-[-0.01em]">{s.t}</span>
                  <span className="mt-0.5 block text-[13.5px] leading-relaxed text-ink-soft">{s.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
          <Label dark>{digitalTwinSuite.gap.label}</Label>
          <h2 className="mt-6 font-display text-[34px] leading-[1.05] tracking-[-0.02em] text-phos md:text-[52px]">
            {digitalTwinSuite.gap.titleLead}{' '}
            <span className="italic text-ember">{digitalTwinSuite.gap.titleAccent}</span>{' '}
            {digitalTwinSuite.gap.titleRest}
          </h2>
          <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-ghost md:text-[19px]">
            {digitalTwinSuite.gap.note}
          </p>
        </div>

        {/* the argument: the watch list itself, then what slips without a control plane */}
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <WatchListCard suite={digitalTwinSuite} />

          <ol className="border-t border-white/15">
            {digitalTwinSuite.gap.slips.map((s, i) => (
              <li
                key={s.t}
                className="group relative flex items-start gap-4 border-b border-white/10 py-4 transition-colors hover:bg-white/[0.03] md:py-5"
              >
                <span className="num mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ember/40 font-mono text-[11px] text-ember">
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
          Without one picture, this is where the time goes.
          <span className="inline-block h-3 w-[6px] animate-pulse bg-ember" aria-hidden />
        </p>
      </div>
    </Section>

    {/* The control plane — one board, read left to right, then looped back */}
    <Section id="cockpit" border dense>
      <Label>{digitalTwinSuite.cockpit.label}</Label>
      <h2 className="mt-5 max-w-3xl font-display text-[30px] leading-[1.08] tracking-[-0.02em] md:text-[40px]">
        {digitalTwinSuite.cockpit.title}
      </h2>

      <LoopBoard suite={digitalTwinSuite} />

      <div className="mt-8 flex items-start gap-3 border-t border-line pt-5">
        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ember" aria-hidden />
        <p className="max-w-3xl text-[15.5px] leading-relaxed text-ink">{digitalTwinSuite.cockpit.command}</p>
      </div>
    </Section>

    {/* The film: just before the brief; plays in a theatre view */}
    <Section id="film" border className="scroll-mt-[72px]">
      <Label>{digitalTwinSuite.film.label} &middot; {digitalTwinSuite.film.duration}</Label>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <h2 className="max-w-2xl font-display text-[34px] leading-[1.08] tracking-[-0.02em] md:text-[46px]">
          {digitalTwinSuite.film.titleLead}{' '}
          <span className="italic text-ember">{digitalTwinSuite.film.titleAccent}</span>
        </h2>
        <p className="max-w-sm text-[15.5px] leading-relaxed text-ink-soft">{digitalTwinSuite.film.note}</p>
      </div>
      <div className="mt-10 max-w-4xl">
        <VideoEmbed
          id={digitalTwinSuite.film.youtubeId}
          title={digitalTwinSuite.film.videoTitle}
          duration={digitalTwinSuite.film.duration}
        />
      </div>
    </Section>

    {/* The deck */}
    <Section border dense>
      <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Label>{digitalTwinSuite.request.label}</Label>
          <h2 className="mt-5 max-w-md font-display text-[30px] leading-tight tracking-[-0.01em] md:text-[40px]">
            {digitalTwinSuite.request.title}
          </h2>
          <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-ink-soft">{digitalTwinSuite.request.note}</p>

          <div className="relative mt-10 max-w-md">
            <span aria-hidden className="absolute left-5 right-5 top-0 h-full translate-y-3 rounded-xl border border-line bg-white/50" />
            <span aria-hidden className="absolute left-2.5 right-2.5 top-0 h-full translate-y-1.5 rounded-xl border border-line bg-white/75" />
            <div className="relative flex items-center gap-5 rounded-xl border border-line bg-white p-5 shadow-[0_20px_50px_-38px_rgba(11,11,13,0.6)]">
              <div aria-hidden className="flex h-16 w-[5.75rem] shrink-0 flex-col justify-between rounded-md bg-ink p-2.5">
                <span className="font-mono text-[6.5px] uppercase tracking-[0.16em] text-ember">Digital Twin++</span>
                <span className="block h-px w-6 bg-ember/80" />
                <span className="font-mono text-[6px] uppercase tracking-[0.16em] text-white/40">The brief</span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ember-deep">Digital Twin++</p>
                <p className="mt-1 font-display text-[19px] tracking-[-0.01em]">The brief</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                  Straight to your inbox · .pdf
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="eyebrow text-ink-faint">What happens next</p>
            <div className="mt-4 border-t border-ink/80">
              {digitalTwinSuite.request.autoReply.steps.map((s, i) => (
                <div key={s} className="group grid grid-cols-[auto_1fr] gap-x-4 border-b border-line py-3.5">
                  <span className="num pt-0.5 font-mono text-[12px] text-ember-deep">{i + 1}</span>
                  <span className="text-[14.5px] leading-relaxed text-ink-soft">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card-light p-8 md:p-10">
          <p className="eyebrow text-ink-faint">{inquiries.hubCard.eyebrow}</p>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">{inquiries.hubCard.body}</p>
          <Button to={inquiries.deckHref(digitalTwinSuite.request.asset)} variant="ember" className="mt-7 w-full sm:w-auto">
            <FileDown size={16} strokeWidth={2.2} />
            {digitalTwinSuite.request.ctaButton}
          </Button>
          <p className="mt-4 text-[12.5px] leading-relaxed text-ink-faint">{inquiries.hubCard.foot}</p>
        </div>
      </div>
    </Section>
  </>
);

export default DigitalTwinSuite;
