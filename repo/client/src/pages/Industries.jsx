import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import { Label } from '../components/site/Layout';
import { Section } from '../components/site/Section';
import { Pill } from '../components/site/Pill';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { CtaBand } from '../components/site/Shell';
import { industries, industriesMeta } from '../data/industries';

/* ─── Industry suites hub ───────────────────────────────────
   Careers-page treatment: open vector illustration under a hairline rule,
   serif name + status, one line of what it is and what it does for you.
   Clicking the live suite opens its brief page. */
const Industries = () => (
  <>
    <SEO
      title="Industry suites | AI built for your sector | Arinox AI"
      description="Custom-stitched agent ecosystems, built sector by sector on the same sovereign stack. Suite decks on request."
      canonical="https://www.arinox.ai/industries"
    />

    <section className="relative overflow-hidden border-b border-line px-7 pb-12 pt-20 md:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
        <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <Label>{industriesMeta.overline}</Label>
        <h1 className="mt-5 max-w-3xl font-display text-[40px] leading-[1.06] tracking-[-0.025em] md:text-[62px]">
          AI that knows your <span className="italic text-ember">industry.</span>
        </h1>
        <p className="mt-6 max-w-[600px] text-lg leading-relaxed text-ink-soft">{industriesMeta.lead}</p>
      </div>
    </section>

    <Section border={false}>
      <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2">
        {industries.map((ind) => {
          const inner = (
            <>
              <div className="flex h-[210px] items-center justify-center">
                <img
                  src={ind.image}
                  alt={ind.imageAlt}
                  loading="lazy"
                  className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <h3 className="font-display text-[22px] tracking-[-0.01em]">{ind.name}</h3>
                <Pill dot>{ind.status}</Pill>
              </div>
              <p className="mt-2 max-w-[46ch] text-[14.5px] leading-relaxed text-ink-soft">{ind.line}</p>
            </>
          );

          return ind.to ? (
            <Link key={ind.id} to={ind.to} className="group block" aria-label={`Open ${ind.name}`}>
              {inner}
            </Link>
          ) : (
            <div key={ind.id} className="group">{inner}</div>
          );
        })}
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
