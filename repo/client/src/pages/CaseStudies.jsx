import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import { Label } from '../components/site/Layout';
import { Section } from '../components/site/Section';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { Button } from '../components/site/Button';
import { CtaBand } from '../components/site/Shell';
import { Pill } from '../components/site/Pill';
import { IndexStrip } from '../components/site/IndexStrip';
import { sectors as sectorData, anchorDeployment, caseSlug, metricBasis } from '../data/caseStudies';

/* Word-values ("SKU-level", "On request") would overflow the numeric scale. */
const valueSize = (value) =>
  String(value).length > 6 ? 'text-[20px] md:text-[24px]' : 'text-[30px] md:text-[36px]';

/* One use case, laid out to leave no dead bands: metrics read as a full-width
   stat strip, challenge and outcome sit side by side, and the architecture
   folds into two columns. Every figure carries its provenance tag. */
const UseCase = ({ index, useCase: c }) => {
  const { metrics = [], architecture = [] } = c;
  return (
    <article className={index > 0 ? 'mt-12' : ''}>
      {/* Case opener — numbered plate + title: a clear break between cases */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-ink/80 pb-4 md:pb-5">
        <span className="num flex h-9 w-9 shrink-0 items-center justify-center rounded-card border border-ink/60 font-mono text-[12px]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="font-display text-[26px] leading-tight tracking-[-0.01em] md:text-[32px]">
          <Link
            to={`/case-studies/${caseSlug(c.title)}`}
            className="transition-colors duration-200 hover:text-ember-deep focus-visible:outline-none"
          >
            {c.title}
          </Link>
        </h3>
        {c.agent && (
          <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ember-deep md:ml-auto">{c.agent}</span>
        )}
      </div>

      {c.agentNote && (
        <div className="mt-3 flex flex-wrap gap-2">
          {c.agentNote.split(' · ').map((d) => (
            <Pill key={d} tone="paper">{d}</Pill>
          ))}
        </div>
      )}

      {/* Metrics, full-width strip */}
      {metrics.length > 0 && (
        <div className="mt-6">
          <p className="eyebrow text-ink-faint">Metrics</p>
          <div className="mt-3 flex flex-wrap gap-x-12 gap-y-5">
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

      {/* Challenge + outcome, side by side */}
      <div className="mt-6 grid gap-7 gap-x-10 sm:grid-cols-2">
        <div>
          <p className="eyebrow text-ink-faint">The challenge</p>
          <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">{c.problem}</p>
        </div>
        <div>
          <p className="eyebrow text-ember-deep">Outcome</p>
          <p className="mt-2.5 text-[15px] leading-relaxed text-ink">{c.outcome}</p>
        </div>
      </div>

      {/* Capability architecture, two columns */}
      {architecture.length > 0 && (
        <div className="mt-7 border-t border-line pt-5">
          <p className="eyebrow text-ink-faint">Capability architecture</p>
          <div className="mt-4 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {architecture.map((a, i) => (
              <div key={a.title} className="grid grid-cols-[auto_1fr] gap-x-3.5">
                <span className="num pt-1 font-mono text-[10.5px] text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h4 className="font-display text-[16px] tracking-[-0.01em]">{a.title}</h4>
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

      {c.proofNote && (
        <p className="mt-5 border-t border-line pt-3 font-mono text-[11.5px] leading-relaxed tracking-[0.02em] text-ink-faint">
          {c.proofNote}
        </p>
      )}
    </article>
  );
};

const CaseStudies = () => {
  const [active, setActive] = useState(0);
  const sector = sectorData[active];
  const hasCases = sector.useCases.length > 0;

  return (
    <>
      <SEO
        title="Case Studies | Private AI in Production | Arinox AI"
        description="Deployed inside the perimeter. Private AI case studies across BFSI, Healthcare, Manufacturing, Defence, Government, FMCG, and Retail, verified where published."
        canonical="https://www.arinox.ai/case-studies"
      />

      <section className="relative overflow-hidden border-b border-line px-7 pb-8 pt-16 md:pt-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
          <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <Label>Case studies</Label>
          <h1 className="mt-5 max-w-3xl font-display text-[40px] leading-[1.06] tracking-[-0.025em] md:text-[62px]">
            Deployed inside the <span className="italic text-ember">perimeter.</span>
          </h1>
          <p className="mt-6 max-w-[600px] text-lg leading-relaxed text-ink-soft">
            Every solution runs on your hardware, under your governance, with your data never
            leaving your premises. Pick a sector to see what we&apos;ve built, shipped, and operated.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button to="/contact" variant="ember">Book a discovery session</Button>
            <span className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-ink-faint">
              Zero egress · audit-ready from day one
            </span>
          </div>
        </div>
      </section>

      <IndexStrip
        cols="sm:grid-cols-2"
        items={[
          { n: '01', label: 'Sectors', href: '#sectors' },
          { n: '02', label: 'Deployment', href: '#anchor' },
        ]}
      />

      <Section border={false} id="sectors" className="pt-5 pb-7 md:pb-10">
        <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-4" role="tablist" aria-label="Sectors">
          {sectorData.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.label}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className={`group flex items-center justify-between gap-2 rounded-card border px-3.5 py-2.5 text-left transition-all duration-200 ${
                  on
                    ? 'border-ember bg-ember text-white shadow-[0_10px_30px_-12px_rgba(255,99,1,0.65)]'
                    : 'border-line bg-white text-ink hover:border-ink/25 hover:bg-paper-2'
                }`}
              >
                <span className={`num shrink-0 font-mono text-[11px] ${on ? 'text-white/70' : 'text-ink-faint'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 text-right font-display text-[16px] leading-tight tracking-[-0.01em]">{s.label}</span>
              </button>
            );
          })}
        </div>

        <div key={sector.label} className="tile-in mt-7">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
            <div>
              <h2 className="font-display text-[28px] leading-tight tracking-[-0.015em] md:text-[34px]">{sector.label}</h2>
              <p className="mt-1.5 font-mono text-[12.5px] uppercase tracking-[0.08em] text-ember-deep">{sector.regHook}</p>
            </div>
            <p className="num font-mono text-[11.5px] uppercase tracking-[0.08em] text-ink-faint">
              {hasCases ? `${sector.useCases.length} deployments` : 'Use cases coming soon'}
            </p>
          </div>

          {hasCases ? (
            <div className="mt-6">
              {sector.useCases.map((c, i) => (
                <UseCase key={c.title} index={i} useCase={c} />
              ))}
            </div>
          ) : (
            <div className="mt-7 border-t border-line pt-5">
              <p className="max-w-xl text-[16px] leading-relaxed text-ink-soft">
                Use cases for this sector are being finalised. In the meantime, tell us your
                constraint and we&apos;ll map it to a concrete on-premises deployment.
              </p>
              <div className="mt-4">
                <Button to="/contact" variant="dark" size="sm">Talk to us</Button>
              </div>
            </div>
          )}
        </div>
      </Section>

      <Section dark id="anchor" border={false}>
        <Label dark>{anchorDeployment.label}</Label>
        <h2 className="mt-5 max-w-2xl font-display text-[30px] leading-tight tracking-[-0.01em] text-phos md:text-[42px]">
          {anchorDeployment.headline}
        </h2>
        <p className="mt-4 font-mono text-[12.5px] uppercase tracking-[0.08em] text-ember">{anchorDeployment.client}</p>
        <div className="mt-7 grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <div className="space-y-3">
            {anchorDeployment.body.map((p) => (
              <p key={p.slice(0, 24)} className="max-w-2xl text-[16px] leading-relaxed text-ghost">{p}</p>
            ))}
          </div>
          <div className="border-t border-white/15">
            <div className="border-b border-white/10 py-4">
              <p className="eyebrow text-ember">{anchorDeployment.metricSlot.label}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-ghost">{anchorDeployment.metricSlot.note}</p>
            </div>
            <ul className="mt-4 space-y-2">
              {anchorDeployment.capabilities.map((c) => (
                <li key={c} className="flex gap-3 text-[14px] leading-relaxed text-ghost">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ember" />
                  {c}
                </li>
              ))}
            </ul>
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

export default CaseStudies;