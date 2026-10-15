import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { Section } from '../components/site/Section';
import { Button } from '../components/site/Button';
import { Pill } from '../components/site/Pill';
import { CtaBand } from '../components/site/Shell';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import ShareRow from '../components/site/ShareRow';
import { caseIndex, metricBasis } from '../data/caseStudies';

/* Word-values ("SKU-level", "On request") would overflow the numeric scale. */
const valueSize = (value) =>
  String(value).length > 6 ? 'text-[20px] md:text-[24px]' : 'text-[30px] md:text-[36px]';

const CASE_STUDIES_DESC =
  'Deployed inside the perimeter. Private AI case studies across BFSI, Healthcare, Manufacturing, Defence, Government, FMCG, and Retail, verified where published.';

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const entry = caseIndex.find((e) => e.slug === slug);

  if (!entry) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-7 text-center">
        <h1 className="font-display text-[30px] leading-tight tracking-[-0.01em] text-ink md:text-[36px]">
          Case study not found.
        </h1>
        <p className="max-w-md text-[14.5px] leading-relaxed text-ink-soft">
          The use case you&apos;re looking for isn&apos;t published at this URL.
        </p>
        <Link to="/case-studies" className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-ember-deep hover:text-ink">
          <ArrowLeft size={14} strokeWidth={2.2} />
          Back to Case Studies
        </Link>
      </div>
    );
  }

  const { sectorLabel, regHook, useCase: c } = entry;
  const { metrics = [], architecture = [], capabilities } = c;

  return (
    <>
      <SEO
        title={`${c.title} Case Study | Arinox AI`}
        description={(c.outcome || c.problem || CASE_STUDIES_DESC).slice(0, 158)}
        canonical={`https://www.arinox.ai/case-studies/${entry.slug}`}
      />

      <section className="relative overflow-hidden border-b border-line px-7 pb-8 pt-16 md:pt-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
          <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.08em] text-ink-faint">
            <Link to="/case-studies" className="transition-colors hover:text-ember-deep">Case studies</Link>
            <span aria-hidden>/</span>
            <span className="text-ink">{sectorLabel}</span>
          </nav>
          <h1 className="mt-5 font-display text-[36px] leading-[1.08] tracking-[-0.025em] md:text-[54px]">
            {c.title}
          </h1>
          <p className="mt-5 font-mono text-[12.5px] uppercase tracking-[0.08em] text-ember-deep">{regHook}</p>
          {c.agentNote && (
            <div className="mt-4 flex flex-wrap gap-2">
              {c.agentNote.split(' · ').map((d) => (
                <Pill key={d} tone="paper">{d}</Pill>
              ))}
            </div>
          )}
        </div>
      </section>

      <Section border={false} className="pt-10 pb-16">
        <div className="mx-auto max-w-3xl">
          {/* Metrics */}
          {metrics.length > 0 && (
            <div className="mb-10 border-y border-line py-6">
              <p className="eyebrow text-ink-faint">Metrics</p>
              <div className="mt-4 flex flex-wrap gap-x-12 gap-y-5">
                {metrics.map((m) => {
                  const basis = metricBasis[m.basis];
                  return (
                    <div key={m.label}>
                      <p className={`num break-words font-display leading-[1.05] tracking-[-0.02em] text-ink ${valueSize(m.value)}`}>
                        {m.value}
                      </p>
                      <p className="mt-1.5 font-mono text-[10.5px] uppercase leading-snug tracking-[0.1em] text-ink-faint">{m.label}</p>
                      {basis && (
                        <p className="mt-1 font-mono text-[9px] uppercase leading-none tracking-[0.14em] text-ink-faint/70" title={basis.title}>
                          {basis.tag}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Challenge + outcome */}
          <div className="grid gap-7 sm:grid-cols-2">
            <div>
              <p className="eyebrow text-ink-faint">The challenge</p>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">{c.problem}</p>
            </div>
            <div>
              <p className="eyebrow text-ember-deep">Outcome</p>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink">{c.outcome}</p>
            </div>
          </div>

          {/* How it works */}
          {c.how && (
            <div className="mt-8 border-t border-line pt-5">
              <p className="eyebrow text-ink-faint">How it works</p>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink">{c.how}</p>
            </div>
          )}

          {/* Capability architecture OR capabilities */}
          {architecture.length > 0 && (
            <div className="mt-8 border-t border-line pt-5">
              <p className="eyebrow text-ink-faint">Capability architecture</p>
              <div className="mt-4 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {architecture.map((a, i) => (
                  <div key={a.title} className="grid grid-cols-[auto_1fr] gap-x-3.5">
                    <span className="num pt-1 font-mono text-[10.5px] text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h2 className="font-display text-[16px] tracking-[-0.01em]">{a.title}</h2>
                      <ul className="mt-2 space-y-1">
                        {a.points.map((p) => (
                          <li key={p} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                            <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-ember" aria-hidden />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {capabilities && capabilities.length > 0 && (
            <div className="mt-8 border-t border-line pt-5">
              <p className="eyebrow text-ink-faint">Capabilities</p>
              <ul className="mt-4 grid gap-x-10 gap-y-2 sm:grid-cols-2">
                {capabilities.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                    <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-ember" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Integrations + proof note */}
          {(c.integrations || c.proofNote) && (
            <div className="mt-8 border-t border-line pt-5">
              {c.integrations && (
                <div className="mb-4">
                  <p className="eyebrow text-ink-faint">Deployment</p>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-ink-soft">{c.integrations}</p>
                </div>
              )}
              {c.proofNote && (
                <p className="font-mono text-[11.5px] leading-relaxed tracking-[0.02em] text-ink-faint">{c.proofNote}</p>
              )}
            </div>
          )}

          {/* Share */}
          <div className="mt-10">
            <ShareRow label="Share this case" title={c.title} url={`https://www.arinox.ai/case-studies/${entry.slug}`} />
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-ink/80 pt-6">
            <Button to="/contact" variant="ember">Book a discovery session</Button>
            <Link to="/case-studies" className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-soft hover:text-ember-deep">
              <ArrowLeft size={14} strokeWidth={2.2} />
              All case studies
            </Link>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Start with a problem."
        offer={
          <>
            A focused call where we map your sector&apos;s regulatory constraints to a concrete
            deployment. <b className="font-medium text-white">Zero jargon, zero commitment.</b>
          </>
        }
      />
    </>
  );
};

export default CaseStudyDetail;
