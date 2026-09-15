import { useState } from 'react';
import SEO from '../components/ui/SEO';
import { Label } from '../components/site/Layout';
import { Section } from '../components/site/Section';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { Button } from '../components/site/Button';
import { CtaBand } from '../components/site/Shell';
import { sectors as sectorData, anchorDeployment } from '../data/caseStudies';

const CaseStudies = () => {
  const [active, setActive] = useState(0);
  const sector = sectorData[active];
  const [lead, ...others] = sector.useCases;

  return (
    <>
      <SEO
        title="Case Studies | Private AI in Production | Arinox AI"
        description="Deployed inside the perimeter. Private AI case studies across BFSI, Healthcare, Manufacturing, Defence, Government, and FMCG, verified where published."
        canonical="https://www.arinox.ai/case-studies"
      />

      <section className="relative overflow-hidden border-b border-line px-7 pb-12 pt-20 md:pt-28">
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

      <Section border={false} className="pt-6">
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6" role="tablist" aria-label="Sectors">
          {sectorData.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.label}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className={`group flex items-center justify-between gap-2 rounded-card border px-4 py-3.5 text-left transition-all duration-200 ${
                  on
                    ? 'border-ember bg-ember text-ink shadow-[0_10px_30px_-12px_rgba(255,99,1,0.65)]'
                    : 'border-line bg-white text-ink hover:border-ink/25 hover:bg-paper-2'
                }`}
              >
                <span className={`num font-mono text-[11px] ${on ? 'text-ink/70' : 'text-ink-faint'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-[17px] tracking-[-0.01em]">{s.label}</span>
              </button>
            );
          })}
        </div>

        <div key={sector.label} className="tile-in mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
            <div>
              <h2 className="font-display text-[30px] leading-tight tracking-[-0.015em] md:text-[38px]">{sector.label}</h2>
              <p className="mt-1.5 font-mono text-[12.5px] uppercase tracking-[0.08em] text-ember-deep">{sector.regHook}</p>
            </div>
            <p className="num font-mono text-[11.5px] uppercase tracking-[0.08em] text-ink-faint">
              {sector.useCases.length} deployments
            </p>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Lead case */}
            <div>
              <h3 className="font-display text-[26px] tracking-[-0.01em]">{lead.title}</h3>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">{lead.agent}</p>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-soft">{lead.problem}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[lead.agentNote].filter(Boolean).map((d) => (
                  <span key={d} className="rounded-full border border-line bg-paper-2 px-3 py-1 font-mono text-[10.5px] text-ink-soft">{d}</span>
                ))}
              </div>
              <div className="mt-8 border-t border-ink/80 pt-5">
                <p className="eyebrow text-ember-deep">Outcome</p>
                <p className="mt-2 max-w-md text-[15.5px] leading-relaxed text-ink">{lead.outcome}</p>
              </div>
            </div>

            {/* Supporting cases */}
            <div className="border-t border-line">
              {others.map((c) => (
                <div key={c.agent} className="border-b border-line py-6">
                  <h3 className="font-display text-[20px] tracking-[-0.01em]">{c.title}</h3>
                  <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">{c.agent}</p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">{c.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section dark border={false}>
        <Label dark>{anchorDeployment.label}</Label>
        <h2 className="mt-5 max-w-2xl font-display text-[30px] leading-tight tracking-[-0.01em] text-phos md:text-[42px]">
          {anchorDeployment.headline}
        </h2>
        <p className="mt-4 font-mono text-[12.5px] uppercase tracking-[0.08em] text-ember">{anchorDeployment.client}</p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="space-y-5">
            {anchorDeployment.body.map((p) => (
              <p key={p.slice(0, 24)} className="max-w-2xl text-[16px] leading-relaxed text-ghost">{p}</p>
            ))}
          </div>
          <div className="border-t border-white/15">
            <div className="border-b border-white/10 py-5">
              <p className="eyebrow text-ember">{anchorDeployment.metricSlot.label}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-ghost">{anchorDeployment.metricSlot.note}</p>
            </div>
            <ul className="mt-5 space-y-2.5">
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
