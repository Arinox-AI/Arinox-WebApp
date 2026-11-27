import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { Label } from '../components/site/Layout';
import { Section } from '../components/site/Section';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { Pill } from '../components/site/Pill';
import { CtaBand } from '../components/site/Shell';
import { industriesMeta, products } from '../data/industries';
import { nav } from '../data/site';
import Illustration from '../components/site/Illustration';

/* ─── All solutions (hub) ────────────────────────────────────
   Rows in the same order as the header's Solutions menu (single source:
   nav[0].group in data/site.js, matched to products by route `to`).
   One tight row per product: serif name, one line, CTA,
   illustration. No data columns, no spine section — the suite pages
   carry the depth. Status pills are design-ready in the data map; they
   render only when a product has a `status` string (the user supplies
   launch statuses later). Placeholder products (no page yet) point at
   Contact. ──────────────────────────────────────────────────── */

const LedgerRow = ({ p }) => (
  <Link
    to={p.to}
    aria-label={p.cta}
    className="group grid items-center gap-x-10 gap-y-5 border-t border-line py-6 first:border-t-0 lg:grid-cols-[1fr_minmax(240px,320px)]"
  >
    <div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <h2 className="font-display text-[28px] leading-tight tracking-[-0.02em] md:text-[34px]">{p.name}</h2>
        {p.status ? <Pill tone="ember" dot>{p.status}</Pill> : null}
      </div>
      <p className="mt-2 max-w-[56ch] text-[15px] leading-relaxed text-ink-soft">{p.line}</p>
      <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ember-deep transition-all group-hover:gap-3">
        {p.cta}
        <ArrowRight size={13} strokeWidth={2.2} aria-hidden />
      </span>
    </div>

    {/* the illustration, height-normalised so the rows optically match */}
    {p.visual ? (
      <Illustration
        variant="row"
        src={p.visual}
        alt={p.visualAlt}
        imgClassName="transition-transform duration-500 group-hover:-translate-y-1"
      />
    ) : (
      <div aria-hidden className="hidden lg:block" />
    )}
  </Link>
);

/* Menu order -> hub rows (one flat list, no groups). Products absent from
   the menu are kept at the end so nothing disappears. */
const buildRows = () => {
  const byRoute = new Map(products.map((p) => [p.to, p]));
  const menu = (nav[0].group || []).map((it) => byRoute.get(it.to)).filter(Boolean);
  const used = new Set(menu.map((p) => p.to));
  return [...menu, ...products.filter((p) => !used.has(p.to))];
};

const rows = buildRows();

const Industries = () => (
  <>
    <SEO
      title="All products | Industry operating systems | Arinox AI"
      description="CommandCore, the sovereign AI appliance, plus Marketing OS, Fashion & Lifestyle OS, Manufacturing OS, Secure OS and Digital Twin++, packaged AI operating systems built sector by sector: your data inside, every decision yours."
      canonical="https://www.arinox.ai/industries"
    />

    {/* Hero */}
    <section className="relative overflow-hidden border-b border-line px-7 pb-10 pt-16 md:pb-14 md:pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
        <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
      </div>
      <div className="relative mx-auto max-w-[68.5rem]">
        <Label>{industriesMeta.overline}</Label>
        <h1 className="mt-5 max-w-3xl font-display text-[40px] leading-[1.06] tracking-[-0.025em] md:text-[62px]">
          {industriesMeta.titleLead}{' '}
          <span className="italic text-ember">{industriesMeta.titleAccent}</span>
        </h1>
        <p className="mt-6 max-w-[600px] text-lg leading-relaxed text-ink-soft">{industriesMeta.lead}</p>
      </div>
    </section>

    {/* The ledger — one tight row per product, closed by the spine line */}
    <Section border={false}>
      <div className="border-b border-line">
        <div className="border-t border-ink/80">
          {rows.map((p) => (
            <LedgerRow key={p.id} p={p} />
          ))}
        </div>

        {/* No numeral column any more: dot and line start at the rows' left edge. */}
        <div className="mt-10 flex items-center gap-3 border-t border-line py-4 md:mt-12">
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
            <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-ember/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
            {industriesMeta.spine}
          </p>
        </div>
      </div>
    </Section>

    <CtaBand
      title="Start with your industry."
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
