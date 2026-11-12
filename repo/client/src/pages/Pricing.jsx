import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { Label } from '../components/site/Layout';
import { Section } from '../components/site/Section';
import { IndexStrip } from '../components/site/IndexStrip';
import { Button } from '../components/site/Button';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { Reveal } from '../components/pricing/Reveal';
import { Segmented } from '../components/pricing/Segmented';
import { PlugPlayLadder } from '../components/pricing/PlugPlayLadder';
import { PricingFaq } from '../components/pricing/PricingFaq';
import { LockedPrice } from '../components/pricing/LockedPrice';
import { discoveryHref } from '../components/pricing/links';
import { track } from '../components/pricing/track';
import {
  pricingHero,
  factors,
  currencies,
  deployments,
  models,
  inEvery,
  pricingFaq,
  closingBand,
} from '../data/pricing';

/* Pricing — the site's ledger language: hairline rules, square corners,
 * numbered rows, mono labels, flat illustrations. No floating cards.
 * Deployment / currency state is URL-synced (?deployment=paas&currency=INR)
 * so links are shareable, and the currency preselects from locale
 * (India → INR) but stays user-overridable and session-remembered. */
const VALID_DEPLOYMENTS = deployments.map((d) => d.id);
const VALID_CURRENCIES = currencies.map((c) => c.id);
const CURRENCY_KEY = 'arinox-pricing-currency';

function detectCurrency() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (/Kolkata|Calcutta/.test(tz)) return 'INR';
    if ((navigator.language || '').includes('-IN')) return 'INR';
  } catch {
    /* fall through to USD */
  }
  return 'USD';
}

export default function Pricing() {
  const [deployment, setDeployment] = useState('saas');
  const [currency, setCurrency] = useState(() => {
    try {
      const remembered = sessionStorage.getItem(CURRENCY_KEY);
      if (remembered && VALID_CURRENCIES.includes(remembered)) return remembered;
    } catch {
      /* noop */
    }
    return detectCurrency();
  });

  // First paint: read URL params if present, then report the view.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const d = params.get('deployment');
    const c = params.get('currency');
    if (d && VALID_DEPLOYMENTS.includes(d)) setDeployment(d);
    if (c && VALID_CURRENCIES.includes(c)) setCurrency(c);
    track('pricing_view', { deployment: d || 'saas', currency: c || detectCurrency() });
  }, []);

  // Keep the URL in sync on toggle (shareable links, back-button friendly).
  const syncParams = ({ deployment: d, currency: c }) => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (d && d !== 'saas') params.set('deployment', d);
      else params.delete('deployment');
      if (c && c !== detectCurrency()) params.set('currency', c);
      else params.delete('currency');
      window.history.replaceState({}, '', `${window.location.pathname}${params.toString() ? `?${params}` : ''}`);
    } catch {
      /* noop */
    }
  };

  const onDeployment = (id) => {
    setDeployment(id);
    syncParams({ deployment: id, currency });
    track('deployment_toggle', { to: id });
  };

  const deploymentInfo = deployments.find((d) => d.id === deployment);
  const deployLabel = deploymentInfo?.label || 'SaaS';

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
        description="Every Arinox deployment is sized to your business. See how we price — outcome-based, three engagement models, a Plug & Play ladder — and start your price conversation with a short Price Discovery."
        canonical="https://www.arinox.ai/pricing"
        jsonLd={faqJsonLd}
      />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line px-7 pb-12 pt-16 md:pt-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
          <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
        </div>
        <div className="relative mx-auto grid max-w-[68.5rem] items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
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
                to={discoveryHref('hero', { deployment, currency })}
                variant="ember"
                onClick={() => track('cta_click', { cta: 'hero' })}
              >
                {pricingHero.ctaPrimary} <ArrowRight size={14} strokeWidth={2.2} aria-hidden />
              </Button>
              <Link
                to="/contact?intent=pricing"
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
          <Reveal delay={0.08}>
            <img
              src="/images/industries/pricing-budget.svg"
              alt="A person adjusting three price sliders"
              loading="eager"
              className="mx-auto w-full max-w-[480px]"
            />
          </Reveal>
        </div>
      </section>

      <IndexStrip
        items={[
          { n: '01', label: 'What shapes your price', href: '#factors' },
          { n: '02', label: 'Engagement models', href: '#models' },
          { n: '03', label: 'FAQ', href: '#faq' },
        ]}
      />

      {/* ── What shapes your price — numbered ledger ─────────────── */}
      <Section id="factors" border={false} eyebrow={factors.eyebrow} title={factors.title}>
        <ol className="grid border-t border-ink/80 md:grid-cols-2 md:gap-x-14">
          {factors.items.map((f, i) => (
            <li
              key={f.title}
              className="group grid grid-cols-[2.75rem_1fr] items-baseline gap-x-3 border-b border-line py-5 md:[&:nth-last-child(-n+2)]:border-b-0 md:py-6"
            >
              <span className="num font-mono text-[11px] tracking-[0.08em] text-ember-deep">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-[21px] tracking-[-0.01em] transition-colors group-hover:text-ember-deep md:text-[23px]">
                  {f.title}
                </h3>
                <p className="mt-1.5 max-w-sm text-[14.5px] leading-relaxed text-ink-soft">{f.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Engagement models (#models anchor) ───────────────────── */}
      <Section id="models" className="scroll-mt-[72px]" eyebrow={models.eyebrow} title={models.title} sub={models.lead}>
        {/* Controls — real buttons with aria-pressed, URL-synced state */}
        <div className="flex flex-wrap items-center gap-3">
          <Segmented label="Deployment" options={deployments} value={deployment} onChange={onDeployment} />
        </div>

        {/* Deployment callout — cross-fades on change */}
        <div className="mt-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={deployment}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-3 border border-line bg-white px-5 py-4 text-[14.5px] leading-relaxed text-ink [border-left:3px_solid_var(--color-ember)]"
            >
              {deploymentInfo?.callout}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* A — Plug & Play ladder */}
        <Reveal>
          <div className="mt-10 border border-line bg-white">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line px-5 py-3.5 md:px-7">
              <span className="eyebrow text-ember-deep">{models.ladder.label}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                Five levels · one visible price
              </span>
            </div>
            <div className="px-5 pt-7 md:px-7 md:pt-9">
              <h3 className="font-display text-[26px] tracking-[-0.01em] md:text-[32px]">{models.ladder.title}</h3>
              <p className="mt-3 max-w-[620px] text-[15.5px] leading-relaxed text-ink-soft">{models.ladder.body}</p>
            </div>
            <div className="mt-7 px-5 md:px-7">
              <PlugPlayLadder levels={models.ladder.levels} deploymentLabel={deployLabel} />
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-4 border-t border-line bg-paper-2/60 px-5 py-4 md:px-7">
              <Link
                to={discoveryHref('ladder', { deployment, currency })}
                onClick={() => track('cta_click', { cta: 'ladder' })}
                className="group flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ember-deep"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember" aria-hidden />
                {models.ladder.footer}
                <ArrowRight size={13} strokeWidth={2.2} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* B — Enterprise: ruled, light */}
        <Reveal>
          <div className="mt-6 grid border border-line bg-white lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 md:p-9">
              <span className="eyebrow text-ember-deep">{models.enterprise.label}</span>
              <h3 className="mt-3 font-display text-[26px] tracking-[-0.01em] md:text-[32px]">
                {models.enterprise.heading}
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">{models.enterprise.intro}</p>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                <LockedPrice per={models.enterprise.per} />
              </div>
            </div>
            <div className="border-t border-line bg-paper-2/45 p-6 md:p-9 lg:border-l lg:border-t-0">
              <p className="eyebrow text-ink-faint">Priced on</p>
              <ul className="mt-4 border-t border-ink/80">
                {models.enterprise.depends.map((item, i) => (
                  <li
                    key={item}
                    className="grid grid-cols-[2rem_1fr] items-baseline border-b border-line py-3 text-[14.5px] text-ink-soft"
                  >
                    <span className="num font-mono text-[11px] text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-[17px] tracking-[-0.01em] text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── C — Full Custom Build (dark, illustrated) ────────────── */}
      <Section dark border={false} className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_85%_0%,rgba(255,99,1,0.14),transparent_70%)]" />
        </div>
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <Label dark>{models.custom.label}</Label>
            <h3 className="mt-6 font-display text-[34px] leading-[1.05] tracking-[-0.02em] text-phos md:text-[48px]">
              {models.custom.title}
            </h3>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ghost">{models.custom.lead}</p>
            <ol className="mt-7 border-t border-white/15">
              {models.custom.includes.map((item, i) => (
                <li key={item} className="grid grid-cols-[2.25rem_1fr] items-baseline border-b border-white/10 py-3.5">
                  <span className="num font-mono text-[11px] text-ember">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[15px] leading-snug text-phos/90">{item}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Button
                to="/contact"
                variant="ember"
                onClick={() => track('cta_click', { cta: 'custom' })}
              >
                {models.custom.cta}
              </Button>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ghost">{models.custom.footer}</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="border border-white/10 bg-paper p-4 md:p-6">
              <img
                src="/images/industries/pricing-private.svg"
                alt="A person carrying a document beside a padlocked folder"
                loading="lazy"
                className="mx-auto w-full"
              />
            </div>
          </Reveal>
        </div>
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

      {/* ── Closing CTA band (Ink/void) ──────────────────────────── */}
      <section className="relative overflow-hidden bg-void py-24 text-white md:py-32">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <HalftoneBackground
            dotSize={5}
            spacing={26}
            dotColor="#ff6301"
            baseColor="transparent"
            opacity={0.35}
            gradient={{ type: 'radial', from: 'center' }}
          />
        </div>
        <div className="relative mx-auto max-w-3xl px-7 text-center">
          <h2 className="font-display text-[34px] leading-[1.08] tracking-[-0.01em] text-phos md:text-[52px]">
            {closingBand.titleA}{' '}
            {/* On void, .text-ember renders the AA-safe bright tint (see index.css) */}
            <span className="italic text-ember">{closingBand.titleAccent}</span>
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <Button
              to={discoveryHref('closing', { deployment, currency })}
              variant="ember"
              onClick={() => track('cta_click', { cta: 'closing' })}
            >
              {closingBand.cta} <ArrowRight size={14} strokeWidth={2.2} aria-hidden />
            </Button>
            <Link
              to="/contact?intent=pricing"
              onClick={() => track('cta_click', { cta: 'closing-talk' })}
              className="border-b border-white/30 pb-1 font-mono text-[12px] uppercase tracking-[0.08em] text-phos transition-colors hover:border-white"
            >
              {closingBand.talk}
            </Link>
          </div>
                    <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-ghost">
            {closingBand.microcopy}
          </p>
        </div>
      </section>
    </>
  );
}
