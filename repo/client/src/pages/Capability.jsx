import { useParams } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import { Label } from '../components/site/Layout';
import { Section } from '../components/site/Section';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { Button, ArrowLink } from '../components/site/Button';
import { CtaBand } from '../components/site/Shell';
import { DrawRule } from '../components/site/CountUp';
import Illustration from '../components/site/Illustration';
import { capabilityRows, capabilityByKey, capabilityPage as copy, industriesMeta } from '../data/industries';
import NotFound from './NotFound';

/* ─── Capability page (/capabilities/:key) ───────────────────
   Problem -> what we deployed -> result, one ledger block per case under
   this capability, then what it does and the infrastructure line. Every
   word and figure is read from data/caseStudies.js (published figures only)
   via data/industries.js. ──────────────────────────────────────────── */

const MONO = 'font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint';

/* Keep exact wording; if long, cut at a sentence boundary (two sentences). */
const trim = (text, max = 260) => {
  const s = String(text || '').trim();
  if (s.length <= max) return s;
  const parts = s.match(/[^.!?]+[.!?]+(\s|$)/g);
  if (!parts) return s;
  return parts.slice(0, 2).join('').trim();
};

const firstSentence = (text) => {
  const m = String(text || '').match(/^[^.!?]+[.!?]/);
  return (m ? m[0] : String(text || '')).trim();
};

/* Up to six distinct points: architecture titles first, then capability lines. */
const pointsFor = (cases) => {
  const seen = new Set();
  const out = [];
  const add = (t) => {
    const k = String(t).toLowerCase();
    if (t && !seen.has(k) && out.length < 6) {
      seen.add(k);
      out.push(t);
    }
  };
  cases.forEach((c) => (c.useCase.architecture || []).forEach((a) => add(a.title)));
  cases.forEach((c) => (c.useCase.capabilities || []).forEach(add));
  return out;
};

const CaseBlock = ({ c }) => {
  const u = c.useCase;
  const results = (u.metrics || []).filter((m) => m.basis === 'published').slice(0, 2);
  const deployed = u.how || firstSentence(u.outcome);
  return (
    <article className="relative py-12 md:py-14" data-capability-case>
      <DrawRule />
      <p className={MONO}>{c.sectorLabel}</p>
      <h3 className="mt-3 max-w-3xl font-display text-[28px] leading-[1.1] tracking-[-0.02em] md:text-[34px]">{u.title}</h3>
      {u.agentNote && <p className={`mt-3 ${MONO} normal-case tracking-[0.04em]`}>{u.agentNote}</p>}

      <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-3">
        <div className="border-t border-line pt-5">
          <p className={MONO}>{copy.problem}</p>
          <p className="mt-3 text-[17px] leading-relaxed text-ink-soft">{trim(u.problem)}</p>
        </div>
        <div className="border-t border-line pt-5">
          <p className={MONO}>{copy.deployed}</p>
          <p className="mt-3 text-[17px] leading-relaxed text-ink-soft">
            {u.agent && <span className="font-medium text-ink">{u.agent}. </span>}
            {deployed}
          </p>
        </div>
        <div className="border-t border-line pt-5">
          <p className={MONO}>{copy.result}</p>
          {results.length ? (
            <div className="mt-3 space-y-5">
              {results.map((m) => (
                <div key={m.label}>
                  <p className="num font-display text-[44px] leading-none tracking-[-0.03em] text-ink" data-metric>{m.value}</p>
                  <p className={`mt-2 leading-snug ${MONO}`}>{m.label}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 font-display text-[24px] leading-tight text-ink-soft">{copy.noFigures}</p>
          )}
        </div>
      </div>
      <ArrowLink to={`/case-studies/${c.slug}`} className="mt-8">{copy.readCase}</ArrowLink>
    </article>
  );
};

const Capability = () => {
  const { key } = useParams();
  const cap = capabilityByKey(key);
  if (!cap) return <NotFound />;

  const i = capabilityRows.findIndex((c) => c.key === cap.key);
  const prev = capabilityRows[(i - 1 + capabilityRows.length) % capabilityRows.length];
  const next = capabilityRows[(i + 1) % capabilityRows.length];
  const points = pointsFor(cap.cases);

  return (
    <>
      <SEO
        title={`${cap.name} | Arinox AI`}
        description={cap.line}
        canonical={`https://www.arinox.ai/capabilities/${cap.key}`}
      />

      <section className="relative overflow-hidden px-7 pb-14 pt-12 md:pb-20 md:pt-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
          <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
        </div>
        <div className="relative mx-auto max-w-[68.5rem]">
          <ArrowLink to="/industries" arrow="before">{copy.back}</ArrowLink>
          <div className="mt-10 grid items-center gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <div>
              <Label>{copy.eyebrow}</Label>
              <h1 className="mt-5 font-display text-[40px] leading-[1.04] tracking-[-0.025em] md:text-[60px]">{cap.name}</h1>
              <p className="mt-6 max-w-[560px] text-[19px] leading-relaxed text-ink-soft">{cap.line}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
                <Button to="/get-started" variant="ember">{copy.primary}</Button>
                <ArrowLink to="/case-studies">{copy.secondary}</ArrowLink>
              </div>
            </div>
            <Illustration variant="hero" src={cap.image} alt="" eager />
          </div>
        </div>
      </section>

      <Section border margin eyebrow={copy.production.label} title={copy.production.title}>
        <div className="border-b border-line" data-capability-cases>
          {cap.cases.map((c) => (
            <CaseBlock key={c.slug} c={c} />
          ))}
        </div>
      </Section>

      {points.length > 0 && (
        <Section border margin eyebrow={copy.does.label} title={copy.does.title}>
          <ul className="grid gap-x-12 border-t border-line md:grid-cols-2" data-capability-points>
            {points.map((p) => (
              <li key={p} className="border-b border-line py-4 text-[17px] leading-snug text-ink">{p}</li>
            ))}
          </ul>
        </Section>
      )}

      <Section border margin eyebrow={copy.runs.label} title={copy.runs.title}>
        <div className="flex items-center gap-3 border-y border-line py-4">
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
            <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-ember/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">{industriesMeta.spine}</p>
        </div>
        <nav className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-ink/80 pt-6" aria-label="Capabilities">
          <ArrowLink to={`/capabilities/${prev.key}`} arrow="before">{prev.name}</ArrowLink>
          <ArrowLink to={`/capabilities/${next.key}`}>{next.name}</ArrowLink>
        </nav>
      </Section>

      <CtaBand
        title={copy.cta.title}
        offer={
          <>
            One working session to map the first workflow worth transforming, and{' '}
            <b className="font-medium text-white">you keep the roadmap either way.</b>
          </>
        }
      />
    </>
  );
};

export default Capability;
