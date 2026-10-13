import { Link } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowRight, ChevronDown, ChevronRight, FileDown, RefreshCw } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { Label } from '../components/site/Layout';
import { Section } from '../components/site/Section';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { RequestForm } from '../components/site/RequestForm';
import { CompareSlider } from '../components/site/CompareSlider';
import { marketingSuite } from '../data/marketingSuite';

/* Marketing OS — brief page. Copy is the deck's own lines, kept minimal.
   Composition: hero → on-page index → the leak ledger (dark) → the loop
   board (signals in, the agents, decisions out, back to signal) → the deck. */

/** Flow connector: dashed drift on desktop, vertical rail on mobile. */
const FlowArrow = () => (
  <div aria-hidden className="flex items-center justify-center">
    <div className="hidden w-full items-center lg:flex">
      <svg className="flow-dash h-2 min-w-0 flex-1" viewBox="0 0 40 8" preserveAspectRatio="none">
        <line x1="0" y1="4" x2="40" y2="4" stroke="var(--color-line)" strokeWidth="1.4" strokeDasharray="4 10" />
      </svg>
      <ChevronRight size={14} strokeWidth={2.4} className="shrink-0 text-ember" />
    </div>
    <div className="flex flex-col items-center py-3 lg:hidden">
      <svg className="flow-dash h-7 w-2" viewBox="0 0 8 40" preserveAspectRatio="none">
        <line x1="4" y1="0" x2="4" y2="40" stroke="var(--color-line)" strokeWidth="2" strokeDasharray="4 10" />
      </svg>
      <ChevronDown size={14} strokeWidth={2.4} className="shrink-0 text-ember" />
    </div>
  </div>
);

/** The calm side: one ad, one thing to watch. */
const BeforePanel = () => (
  <div className="flex h-full w-full items-center justify-center bg-[#0e0e11] p-6">
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/25 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:h-24 sm:w-24">
        <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-ghost">1 ad</span>
      </div>
      <span className="h-px w-10 bg-white/15" aria-hidden />
      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">signals: a handful</span>
    </div>
  </div>
);

/** The multiplied side: the watch list, version after version. */
const AfterPanel = () => (
  <div className="aspect-[16/10] w-full">
    <div className="grid h-full w-full grid-cols-4 place-content-center gap-2 bg-[#0e0e11] p-4 sm:gap-2.5 sm:p-6">
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          className={`aspect-video rounded-md border transition-colors duration-300 ${
            i === 15
              ? 'border-ember/60 bg-ember/25'
              : i % 3 === 0
                ? 'border-ember/25 bg-ember/[0.08]'
                : 'border-white/10 bg-white/[0.03]'
          }`}
        />
      ))}
    </div>
  </div>
);

/** The cockpit as a live loop, not three lists: signals → agents → decisions,
    and a return rail so the last line of the loop gets drawn too. */
const LoopBoard = () => {
  const { cockpit } = marketingSuite;

  return (
    <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_32px_80px_-64px_rgba(11,11,13,0.6)]">
      <div className="grid lg:grid-cols-[1fr_56px_minmax(280px,330px)_56px_1fr]">
        {/* Signals in */}
        <div className="p-6 md:p-7">
          <p className="eyebrow text-ink-faint">Signals in</p>
          <ul className="mt-4 border-t border-ink/80">
            {cockpit.signalsIn.map((s) => (
              <li key={s.t} className="group grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-line py-3.5">
                <span className="font-display text-[18px] tracking-[-0.01em] transition-colors group-hover:text-ember-deep">{s.t}</span>
                <span className="text-right font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-faint">{s.d}</span>
              </li>
            ))}
          </ul>
        </div>

        <FlowArrow />

        {/* The agents, the engine panel of the loop */}
        <div className="relative border-y border-line bg-paper-2/45 p-6 md:p-7 lg:border-x lg:border-y-0">
          <p className="eyebrow text-ember-deep">The agents</p>
          <ol className="mt-4 border-t border-ember/30">
            {cockpit.agents.map((a, i) => (
              <li key={a.t} className="grid grid-cols-[auto_1fr] items-start gap-x-3.5 border-b border-ember/20 py-4 last:border-b-0">
                <span className="num mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-ember/40 bg-white font-mono text-[10px] text-ember-deep">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-display text-[18px] tracking-[-0.01em]">{a.t}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{a.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-ember/30 bg-white/80 px-4 py-3">
            <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden>
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-ember/60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ember" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ember-deep">{cockpit.approve}</span>
          </div>
        </div>

        <FlowArrow />

        {/* Decisions out */}
        <div className="p-6 md:p-7">
          <p className="eyebrow text-ink-faint">Decisions out</p>
          <ul className="mt-4 border-t border-ink/80">
            {cockpit.decisionsOut.map((d) => (
              <li key={d.t} className="group grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-line py-3.5">
                <span className="font-display text-[18px] tracking-[-0.01em] transition-colors group-hover:text-ember-deep">{d.t}</span>
                <span className="text-right font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-faint">{d.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Return rail: the decision feeds the next signal */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line bg-paper-2/60 px-5 py-3.5 md:px-6">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ember-deep">
          <RefreshCw size={12} strokeWidth={2.4} className="animate-spin [animation-duration:8s]" aria-hidden />
          the loop
        </span>
        <span
          aria-hidden
          className="hidden h-px min-w-[48px] flex-1 bg-[repeating-linear-gradient(90deg,var(--color-line)_0_5px,transparent_5px_10px)] sm:block"
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
          every action becomes the next signal
        </span>
      </div>
    </div>
  );
};

const MarketingSuite = () => (
  <>
    <SEO
      title="Marketing OS | The AI way to market | Arinox AI"
      description="Marketing OS is one AI-native control plane for your marketing: every signal in, every decision out, in a loop. Request the deck by email."
      canonical="https://www.arinox.ai/industries/marketing"
    />

    {/* Hero */}
    <section className="relative overflow-hidden border-b border-line px-7 pb-14 pt-20 md:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
        <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <Link
          to="/industries"
          className="inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.08em] text-ink-faint transition-colors hover:text-ink"
        >
          <ArrowLeft size={13} strokeWidth={2.2} />
          Industry suites
        </Link>

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div>
            <Label>{marketingSuite.overline}</Label>
            <h1 className="mt-5 max-w-3xl font-display text-[40px] leading-[1.06] tracking-[-0.025em] md:text-[62px]">
              Marketing <span className="italic text-ember">OS.</span>
            </h1>
            <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.16em] text-ink-soft">{marketingSuite.tagline}</p>
            <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-ink-soft">{marketingSuite.lead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#deck"
                className="chip btn-ember-glow inline-flex items-center gap-2 rounded-btn bg-ember px-6 py-3.5 text-[12.5px] font-medium leading-none text-white transition-colors duration-200 hover:bg-ember-deep"
              >
                <FileDown size={16} strokeWidth={2.2} />
                {marketingSuite.request.ctaButton}
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border-b border-line pb-1 font-mono text-[12px] uppercase tracking-[0.08em] text-ink transition-colors hover:border-ink"
              >
                Book a discovery session
                <ArrowRight size={14} strokeWidth={2.2} />
              </Link>
            </div>
          </div>

          <div className="product-stage relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
            <img
              src="/images/industries/marketing-hero.jpg"
              alt="Hands reviewing printed marketing performance charts"
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover [filter:grayscale(1)_contrast(1.05)]"
            />
            <div aria-hidden className="absolute inset-0 bg-ember mix-blend-multiply opacity-[0.12]" />
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(rgba(255,99,1,0.45)_1px,transparent_1.5px)] [background-size:16px_16px] opacity-30 [mask-image:radial-gradient(closest-side_circle_at_50%_45%,black_0%,transparent_78%)]"
            />
            <span className="absolute bottom-4 left-4 max-w-[85%] rounded-full border border-line/60 bg-white/90 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ember-deep backdrop-blur-sm">
              Signals in. Decisions out. In a loop.
            </span>
          </div>
        </div>
      </div>
    </section>

    {/* On-page index, the reading path in three moves */}
    <nav aria-label="On this page" className="border-b border-line bg-paper-2/50">
      <div className="mx-auto max-w-6xl px-7">
        <ol className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            ['01', marketingSuite.gap.label, '#changed'],
            ['02', marketingSuite.cockpit.label, '#cockpit'],
            ['03', marketingSuite.request.label, '#deck'],
          ].map(([n, t, href]) => (
            <li key={href}>
              <a href={href} className="group flex items-center gap-4 py-4 sm:px-6">
                <span className="num font-mono text-[10.5px] text-ember-deep">{n}</span>
                <span className="font-display text-[17px] tracking-[-0.01em] transition-colors group-hover:text-ember-deep">{t}</span>
                <ArrowDown
                  size={14}
                  strokeWidth={2.2}
                  className="ml-auto text-ink-faint transition-all duration-200 group-hover:translate-y-0.5 group-hover:text-ember"
                  aria-hidden
                />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>

    {/* What changed — the statement, and the curve that proves it */}
    <Section id="changed" dark border={false} className="relative overflow-hidden">
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
          <Label dark>{marketingSuite.gap.label}</Label>
          <h2 className="mt-6 font-display text-[34px] leading-[1.05] tracking-[-0.02em] text-phos md:text-[52px]">
            {marketingSuite.gap.titleLead}{' '}
            <span className="italic text-ember">{marketingSuite.gap.titleAccent}</span>{' '}
            {marketingSuite.gap.titleRest}
          </h2>
          <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-ghost md:text-[19px]">
            {marketingSuite.gap.note}
          </p>
        </div>

        {/* the argument: drag between one ad and the multiplied watch list */}
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ghost/80">
              {marketingSuite.gap.watchLabel}
            </p>
            <CompareSlider
              className="mt-5"
              before={<BeforePanel />}
              after={<AfterPanel />}
              beforeLabel={marketingSuite.gap.before}
              afterLabel={marketingSuite.gap.now}
              defaultPosition={38}
            />
          </div>

          <ol className="border-t border-white/15">
            {marketingSuite.gap.slips.map((s, i) => (
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
          Without a cockpit, this is where the money goes.
          <span className="inline-block h-3 w-[6px] animate-pulse bg-ember" aria-hidden />
        </p>
      </div>
    </Section>

    {/* The control plane — one board, read left to right, then looped back */}
    <Section id="cockpit" border>
      <Label>{marketingSuite.cockpit.label}</Label>
      <h2 className="mt-5 max-w-3xl font-display text-[30px] leading-[1.08] tracking-[-0.02em] md:text-[40px]">
        {marketingSuite.cockpit.title}
      </h2>

      <LoopBoard />

      <div className="mt-8 flex items-start gap-3 border-t border-line pt-5">
        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ember" aria-hidden />
        <p className="max-w-3xl text-[15.5px] leading-relaxed text-ink">{marketingSuite.cockpit.command}</p>
      </div>
    </Section>

    {/* The deck */}
    <Section border>
      <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Label>{marketingSuite.request.label}</Label>
          <h2 className="mt-5 max-w-md font-display text-[30px] leading-tight tracking-[-0.01em] md:text-[40px]">
            {marketingSuite.request.title}
          </h2>
          <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-ink-soft">{marketingSuite.request.note}</p>

          <div className="relative mt-10 max-w-md">
            <span aria-hidden className="absolute left-5 right-5 top-0 h-full translate-y-3 rounded-xl border border-line bg-white/50" />
            <span aria-hidden className="absolute left-2.5 right-2.5 top-0 h-full translate-y-1.5 rounded-xl border border-line bg-white/75" />
            <div className="relative flex items-center gap-5 rounded-xl border border-line bg-white p-5 shadow-[0_20px_50px_-38px_rgba(11,11,13,0.6)]">
              <img src="/images/industries/marketing-os.svg" alt="" loading="lazy" className="h-16 w-auto shrink-0" />
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ember-deep">Marketing OS</p>
                <p className="mt-1 font-display text-[19px] tracking-[-0.01em]">The deck</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
                  Straight to your inbox · .pptx
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="eyebrow text-ink-faint">What happens next</p>
            <div className="mt-4 border-t border-ink/80">
              {marketingSuite.request.autoReply.steps.map((s, i) => (
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
          label={marketingSuite.request.formLabel}
          note=""
          success={marketingSuite.request.success}
          role={marketingSuite.request.role}
          message={marketingSuite.request.message}
          cta={marketingSuite.request.ctaButton}
          autoReply={marketingSuite.request.autoReply}
        />
      </div>
    </Section>
  </>
);

export default MarketingSuite;
