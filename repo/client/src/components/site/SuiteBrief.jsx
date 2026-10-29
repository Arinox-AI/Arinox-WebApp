import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Label } from './Layout';
import { Section } from './Section';
import { HalftoneBackground } from './HalftoneBackground';
import { Button } from './Button';
import { CtaBand } from './Shell';

/* SuiteBrief — the crisp product page in the site's editorial language:
   hairlines, numbered rows, mono labels, serif display. One intro, the
   operating loop, a dark "you approve" statement, then the conversation. */
export function SuiteBrief({ suite, visual, visualAlt, title }) {
  const { cockpit } = suite;
  const loop = [
    { n: '01', label: 'Signals in', items: cockpit.signalsIn },
    { n: '02', label: 'The agents', items: cockpit.agents },
    { n: '03', label: 'Decisions out', items: cockpit.decisionsOut },
  ];

  return (
    <>
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
              <Label>{suite.overline}</Label>
              <h1 className="mt-5 max-w-3xl font-display text-[40px] leading-[1.06] tracking-[-0.025em] md:text-[62px]">
                {title}
              </h1>
              <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.16em] text-ink-soft">{suite.tagline}</p>
              <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-ink-soft">{suite.lead}</p>
              <div className="mt-8">
                <Button to="/contact" variant="ember">
                  Book a discovery session
                  <ArrowRight size={15} strokeWidth={2.2} />
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src={visual}
                alt={visualAlt}
                loading="eager"
                className="mx-auto w-full max-w-[480px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works — three numbered claims under one hairline */}
      <Section border={false}>
        <Label>How it works</Label>
        <h2 className="mt-5 max-w-2xl font-display text-[30px] leading-[1.08] tracking-[-0.02em] md:text-[40px]">
          Signals in. Decisions out. <span className="italic text-ember">You approve.</span>
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {loop.map((col) => (
            <div key={col.label} className="border-t border-ink/80 pt-6">
              <p className="num font-display text-[38px] leading-none tracking-[-0.03em]">{col.n}</p>
              <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.12em] text-ember-deep">{col.label}</p>
              <ul className="mt-4">
                {col.items.map((item) => (
                  <li
                    key={item.t}
                    className="border-b border-line py-2.5 text-[14.5px] leading-relaxed text-ink-soft last:border-b-0 last:pb-0"
                  >
                    <span className="font-medium text-ink">{item.t}</span> — {item.d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* What slips without it — the argument, kept short */}
      <Section border dense>
        <Label>What slips through</Label>
        <h2 className="mt-5 max-w-2xl font-display text-[30px] leading-[1.08] tracking-[-0.02em] md:text-[40px]">
          Where the margin goes.
        </h2>
        <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-soft">{suite.gap.note}</p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {suite.gap.slips.map((s) => (
            <div key={s.t} className="border-t border-ink/80 pt-5">
              <h3 className="font-display text-[20px] tracking-[-0.01em]">{s.t}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* The dark statement — you approve */}
      <Section dark border={false}>
        <div className="max-w-4xl">
          <Label dark>You approve</Label>
          <h2 className="mt-6 font-display text-[30px] leading-[1.1] tracking-[-0.02em] text-phos md:text-[44px]">
            Nothing moves without your say.
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ghost">{cockpit.command}</p>
        </div>
      </Section>

      <CtaBand
        title="Talk to us about your workflow."
        offer={
          <>
            One working session to map the first workflow worth transforming — and{' '}
            <b className="font-medium text-white">you keep the roadmap either way.</b>
          </>
        }
      />
    </>
  );
}
