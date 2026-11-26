import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import { Label } from '../components/site/Layout';
import { Section } from '../components/site/Section';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { Button, ArrowLink } from '../components/site/Button';
import { CtaBand } from '../components/site/Shell';
import { DrawRule } from '../components/site/CountUp';
import { industriesMeta, industriesSections, capabilityRows, products } from '../data/industries';
import { nav } from '../data/site';
import Illustration from '../components/site/Illustration';

/* ─── All solutions (hub) ────────────────────────────────────
   Hero -> What we build (eight large capability rows, each a whole-row link
   to /capabilities/<key>, with a published figure when one exists) ->
   Ready-made products (compact list) -> How we engage -> spine line ->
   closing band. Figures are read from data/caseStudies.js (published only)
   via the derived views in data/industries.js; nothing is typed here. ──── */

const H2 = 'max-w-2xl font-display text-[34px] leading-[1.08] tracking-[-0.02em] md:text-[46px]';
const MONO = 'font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint';

/* One capability: illustration | name + line + link | one published figure. */
const CapabilityRow = ({ cap }) => (
  <Link
    to={`/capabilities/${cap.key}`}
    id={cap.key}
    className="group relative grid scroll-mt-24 items-center gap-x-8 gap-y-6 py-10 lg:grid-cols-[200px_minmax(0,1fr)_170px] lg:py-12"
    data-capability-row
  >
    <DrawRule />
    <Illustration variant="row" src={cap.image} alt="" imgClassName="transition-transform duration-500 group-hover:-translate-y-1" />
    <div>
      <h3 className="font-display text-[34px] leading-[1.08] tracking-[-0.02em] transition-colors group-hover:text-ember-deep md:text-[40px]">
        {cap.name}
      </h3>
      <p className="mt-4 max-w-[48ch] text-[18px] leading-relaxed text-ink-soft">{cap.line}</p>
      <span className="mt-5 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] text-ember-deep transition-all group-hover:gap-3">
        Explore {cap.name} <span aria-hidden>{'→'}</span>
      </span>
    </div>
    {cap.metric && (
      <div className="lg:text-right">
        <p className="num font-display text-[44px] leading-none tracking-[-0.03em] text-ink md:text-[52px]" data-metric>{cap.metric.value}</p>
        <p className={`mt-3 leading-snug ${MONO}`}>{cap.metric.label}</p>
      </div>
    )}
  </Link>
);

/* One product: small figure, name, one line, link. */
const ProductItem = ({ p }) => (
  <Link to={p.to} aria-label={p.cta} className="group relative flex items-start gap-6 pb-7 pt-7" data-product>
    <DrawRule className="!bg-ink/30" />
    <Illustration variant="compact" src={p.visual} alt="" imgClassName="transition-transform duration-500 group-hover:-translate-y-0.5" />
    <div>
      <h3 className="font-display text-[28px] leading-tight tracking-[-0.015em] transition-colors group-hover:text-ember-deep">{p.name}</h3>
      <p className="mt-1.5 text-[17px] leading-snug text-ink-soft">{p.tagline}</p>
      <span className="mt-3 inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ember-deep transition-all group-hover:gap-3">
        {p.cta} <span aria-hidden>{'→'}</span>
      </span>
    </div>
  </Link>
);

/* Menu order -> product list. Products absent from the menu go at the end
   so nothing disappears. */
const buildRows = () => {
  const byRoute = new Map(products.map((p) => [p.to, p]));
  const menu = (nav[0].group || []).map((it) => byRoute.get(it.to)).filter(Boolean);
  const used = new Set(menu.map((p) => p.to));
  return [...menu, ...products.filter((p) => !used.has(p.to))];
};

const rows = buildRows();
const { engage } = industriesSections;

const Industries = () => (
  <>
    <SEO
      title={industriesMeta.seoTitle}
      description={industriesMeta.seoDescription}
      canonical="https://www.arinox.ai/industries"
    />

    {/* Hero */}
    <section className="relative overflow-hidden px-7 pb-12 pt-16 md:pb-16 md:pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
        <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
      </div>
      <div className="relative mx-auto max-w-[68.5rem]">
        <Label>{industriesMeta.overline}</Label>
        <h1 className="mt-5 max-w-3xl font-display text-[40px] leading-[1.06] tracking-[-0.025em] md:text-[62px]">
          {industriesMeta.titleLead}{' '}
          <span className="italic text-ember">{industriesMeta.titleAccent}</span>
        </h1>
        <p className="mt-6 max-w-[620px] text-[19px] leading-relaxed text-ink-soft">{industriesMeta.lead}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
          <Button to="/get-started" variant="ember">{industriesMeta.primary}</Button>
          <ArrowLink to="/case-studies">{industriesMeta.secondary}</ArrowLink>
        </div>

      </div>
    </section>

    {/* What we build: one row per capability, one real figure each */}
    <Section border margin eyebrow={industriesSections.build.label}>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
        <h2 className={H2}>{industriesSections.build.title}</h2>
        <p className="max-w-sm text-[17px] leading-relaxed text-ink-soft">{industriesSections.build.note}</p>
      </div>
      <div className="mt-10 border-b border-line md:mt-14" data-capability-rows>
        {capabilityRows.map((cap) => (
          <CapabilityRow key={cap.key} cap={cap} />
        ))}
      </div>
    </Section>

    {/* Ready-made products: compact two-column list, in header-menu order */}
    <Section id="products" border margin eyebrow={industriesSections.starts.label} className="scroll-mt-[68px]">
      <h2 className={`mt-5 ${H2}`}>{industriesSections.starts.title}</h2>
      <div className="mt-10 grid gap-x-12 border-b border-line md:mt-12 md:grid-cols-2" data-product-list>
        {rows.map((p) => (
          <ProductItem key={p.id} p={p} />
        ))}
      </div>
    </Section>

    {/* How we engage */}
    <Section border margin eyebrow={engage.label}>
      <h2 className={`mt-5 ${H2}`}>{engage.title}</h2>
      <div className="mt-10 grid gap-x-12 gap-y-10 md:mt-12 md:grid-cols-2" data-engage>
        {[
          { ...engage.ready, to: '/industries#products' },
          { ...engage.custom, to: '/get-started' },
        ].map((e) => (
          <div key={e.title} className="relative flex flex-col pt-6">
            <DrawRule />
            <h3 className="font-display text-[30px] leading-tight tracking-[-0.015em] md:text-[34px]">{e.title}</h3>
            <p className="mt-3 max-w-[44ch] text-[17px] leading-relaxed text-ink-soft">{e.line}</p>
            <ArrowLink to={e.to} className="mt-auto pt-3">{e.cta}</ArrowLink>
          </div>
        ))}
      </div>

      <div className="mt-14 flex items-center gap-3 border-t border-line py-4 md:mt-16">
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
          <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-ember/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
        </span>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">{industriesMeta.spine}</p>
      </div>
    </Section>

    <CtaBand
      title={industriesSections.cta.title}
      offer={
        <>
          One working session to map the first workflow worth transforming in your sector, and{' '}
          <b className="font-medium text-white">you keep the roadmap either way.</b>
        </>
      }
    />
  </>
);

export default Industries;
