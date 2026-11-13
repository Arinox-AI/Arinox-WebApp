import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { Label } from '../components/site/Layout';
import { Section } from '../components/site/Section';
import { IndexStrip } from '../components/site/IndexStrip';
import { Button } from '../components/site/Button';
import { CtaBand } from '../components/site/Shell';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { Reveal } from '../components/pricing/Reveal';
import { PricingFaq } from '../components/pricing/PricingFaq';
import { discoveryHref } from '../components/pricing/links';
import { track } from '../components/pricing/track';
import { deployOptions } from '../data/site';
import {
  pricingHero,
  plans,
  deployIntro,
  discoverySteps,
  factors,
  inEvery,
  pricingFaq,
  closingBand,
} from '../data/pricing';

/* Pricing — the site's ledger language: hairline rules, square corners,
 * numbered columns, mono labels, flat illustrations. No boxes, no toggles,
 * no price figure: the number is shared in a conversation. */
export default function Pricing() {
  useEffect(() => {
    track('pricing_view');
  }, []);

  const faqJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: pricingFaq.items.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    }),
    []
  );

  return (
    <>
      <SEO
        title="Arinox Pricing: we price outcomes, not seats"
        description="Every Arinox deployment is sized to your business. See how we price: outcome-based, three plans (Platform, Enterprise, Custom build), and a short intake that starts your price conversation."
        canonical="https://www.arinox.ai/pricing"
        jsonLd={faqJsonLd}
      />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line px-7 pb-12 pt-16 md:pt-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
          <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
        </div>
        <div className="relative mx-auto grid max-w-[68.5rem] items-center gap-10 lg:grid-cols-[1.35fr_0.65fr]">
          <Reveal>
            <Label>{pricingHero.eyebrow}</Label>
            <h1 className="mt-5 max-w-3xl font-display text-[40px] leading-[1.06] tracking-[-0.025em] md:text-[62px]">
              {pricingHero.titleA}
              <br />
              {pricingHero.titleB} <span className="italic text-ember">{pricingHero.titleAccent}</span>
            </h1>
            <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-ink-soft">{pricingHero.lead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button
                to={discoveryHref('hero')}
                variant="ember"
                onClick={() => track('cta_click', { cta: 'hero' })}
              >
                {pricingHero.ctaPrimary} <ArrowRight size={14} strokeWidth={2.2} aria-hidden />
              </Button>
              <Link
                to="/contact"
                onClick={() => track('cta_click', { cta: 'hero-talk' })}
                className="inline-flex items-center gap-2 border-b border-line pb-1 font-mono text-[12px] uppercase tracking-[0.08em] text-ink transition-colors hover:border-ink"
              >
                {pricingHero.ctaSecondary}
              </Link>
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
              {pricingHero.microcopy}
            </p>
          </Reveal>
          <Reveal delay={0.08} className="hidden self-center md:block">
            <img
              src="/images/industries/pricing-budget.svg"
              alt="A person adjusting three price sliders"
              loading="eager"
              className="mx-auto w-full max-w-[300px] lg:max-w-[340px]"
            />
          </Reveal>
        </div>
      </section>

      <IndexStrip
        items={[
          { n: '01', label: 'Plans', href: '#plans' },
          { n: '02', label: 'Where it runs', href: '#deploy' },
          { n: '03', label: 'How pricing works', href: '#how' },
        ]}
      />

      {/* ── Plans ────────────────────────────────────────────────── */}
      <Section id="plans" className="scroll-mt-[72px]" border={false} eyebrow={plans.eyebrow} title={plans.title} sub={plans.note}>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.items.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-card border border-line border-t-2 border-t-ink bg-paper p-7">
                <span className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint">
                  Plan {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-[26px] tracking-[-0.01em]">{p.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{p.forWhom}</p>
                <p className="mt-7 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint">{plans.stagesLabel}</p>
                <ol className="mt-3 flex-1">
                  {p.stages.map((st, n) => (
                    <li key={st.t} className="flex gap-4 border-t border-line py-3">
                      <span className="num pt-0.5 font-mono text-[11.5px] text-ink-faint">{String(n + 1).padStart(2, '0')}</span>
                      <span>
                        <span className="block text-[15px] text-ink">{st.t}</span>
                        <span className="block text-[14px] leading-snug text-ink-soft">{st.d}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="mt-5 border-t border-line pt-4 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint">{p.priced}</p>
                <Link
                  to={p.to}
                  onClick={() => track('cta_click', { cta: `plan-${p.name.toLowerCase().replace(/\s+/g, '-')}` })}
                  className="group mt-5 inline-flex items-center gap-2 self-start border-b border-ink/40 pb-1 font-mono text-[12px] uppercase tracking-[0.08em] text-ink transition-colors hover:border-ink"
                >
                  {p.cta}
                  <ArrowRight size={13} strokeWidth={2.2} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Where it runs ────────────────────────────────────────── */}
      <Section id="deploy" className="scroll-mt-[72px]" eyebrow={deployIntro.eyebrow} title={deployIntro.title} sub={deployIntro.note}>
        <div className="grid gap-x-12 gap-y-12 md:grid-cols-3">
          {deployOptions.map((d) => (
            <div key={d.t} className="border-t border-ink/80 pt-7">
              <div className="flex h-[136px] items-center">
                <img src={d.image} alt="" loading="lazy" className="max-h-full w-full object-contain object-left" />
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <h3 className="font-display text-[22px] tracking-[-0.01em]">{d.t}</h3>
                {d.sovereign && (
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ember-deep">Max sovereignty</span>
                )}
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{d.d}</p>
              <ul className="mt-6">
                {d.li.map((l) => (
                  <li key={l} className="border-b border-line py-2.5 text-sm text-ink-soft last:border-b-0">{l}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ── How pricing works ────────────────────────────────────── */}
      <Section id="how" className="scroll-mt-[72px]" eyebrow={discoverySteps.eyebrow} title={discoverySteps.title}>
        <ol className="grid gap-x-12 gap-y-10 md:grid-cols-3">
          {discoverySteps.steps.map((s, i) => (
            <li key={s.title} className="border-t border-ink/80 pt-7">
              <span className="num font-display text-[44px] leading-none tracking-[-0.03em] text-ink-faint">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 font-display text-[22px] tracking-[-0.01em]">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-16 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint">{factors.label}</p>
        <ul className="mt-4 grid border-t border-ink/80 md:grid-cols-2 md:gap-x-14">
          {factors.items.map((f) => (
            <li key={f.title} className="border-b border-line py-4">
              <h3 className="font-display text-[19px] tracking-[-0.01em]">{f.title}</h3>
              <p className="mt-1 text-[14.5px] leading-relaxed text-ink-soft">{f.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── In every engagement ──────────────────────────────────── */}
      <Section eyebrow={inEvery.eyebrow} title={inEvery.title}>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {inEvery.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="border-t-2 border-ink pt-5">
                <span className="num font-mono text-[11px] text-ember-deep">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-display text-[20px] tracking-[-0.01em]">{item.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── FAQ (narrow 860px column) ────────────────────────────── */}
      <section id="faq" className="scroll-mt-[72px] border-t border-line bg-paper py-14 md:py-[76px]">
        <div className="mx-auto max-w-[860px] px-7">
          <Reveal>
            <Label>FAQ</Label>
            <h2 className="mt-4 font-display text-3xl tracking-[-0.01em] md:text-[40px]">{pricingFaq.title}</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-8">
              <PricingFaq items={pricingFaq.items} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Closing band ─────────────────────────────────────────── */}
      <CtaBand
        title={
          <>
            {closingBand.titleA} <span className="italic text-ember">{closingBand.titleAccent}</span>
          </>
        }
        offer={closingBand.offer}
        primary={{ label: closingBand.cta, to: discoveryHref('closing') }}
        secondary={{ label: closingBand.talk, to: '/contact' }}
        facts={[closingBand.microcopy]}
      />
    </>
  );
}
