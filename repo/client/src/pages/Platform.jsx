import SEO from '../components/ui/SEO';
import { Section } from '../components/site/Section';
import { Button } from '../components/site/Button';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { LayerStack } from '../components/site/LayerStack';
import { Terminal } from '../components/site/Terminal';
import { Label, SpecTable } from '../components/site/Layout';
import { CtaBand } from '../components/site/Shell';

const osChips = ['LLMOps', 'Swarm orchestration', 'Agent registry', 'Memory layer'];

const caps = [
  { k: 'Language', v: 'Document intelligence', note: 'Contracts, filings, claims, and reports read, extracted, and acted on with citations back to source.' },
  { k: 'Voice', v: 'Voice agents', note: 'Enterprise telephony that answers, resolves, and escalates, with full transcripts by default.' },
  { k: 'Vision', v: 'Edge video analytics', note: 'Cameras become sensors, safety, quality, and security events flagged in real time, at the edge.' },
  { k: 'Orchestration', v: 'Agent swarms', note: 'Specialised agents collaborating across departments: one workspace, shared memory, your approval gates.' },
  { k: 'Simulation', v: 'Cloud-free twins', note: 'Digital twins and scenario testing that run locally. Nothing sent to model providers.' },
  { k: 'Control', v: 'Governance built in', note: 'RBAC, red teaming, and audit trails on every decision. Least-privilege by default.' },
];

const agentCats = [
  { cat: 'Finance', items: ['Treasury forecasting', 'Fraudulent document detection', 'Claims severity prediction', 'Regulatory filing preparation'] },
  { cat: 'Operations', items: ['Supplier onboarding', 'Invoice and contract processing', 'Quality inspection reporting', 'Supply chain document intelligence'] },
  { cat: 'People & compliance', items: ['Citizen service requests', 'Audit trail generation', 'Policy and SOP assistants', 'Red-team review reporting'] },
];

const proofLines = [
  { k: 'kogo.run', v: 'claims-triage · on-prem · 12 branches', st: 'act' },
  { k: 'policy.rbac', v: 'role: compliance_officer · least privilege', st: 'ok' },
  { k: 'audit.log', v: 'decision #4821 → cited to source document', st: 'ok' },
  { k: 'gate.approval', v: 'human sign-off required before payout', st: 'gate' },
];

const Platform = () => (
  <>
    <SEO
      title="Platform | Sovereign Agentic AI | Arinox AI"
      description="One agentic operating system applied across BFSI, Healthcare, Manufacturing, Defence, Government, and FMCG, deployed inside your perimeter on CommandCore."
      canonical="https://www.arinox.ai/platform"
    />

    <section className="relative overflow-hidden px-7 pb-12 pt-20 text-center md:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
        <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
      </div>
      <div className="relative mx-auto max-w-3xl">
        <div className="mb-5 flex justify-center"><Label>The platform</Label></div>
        <h1 className="font-display text-[40px] leading-[1.06] tracking-[-0.025em] md:text-[62px]">
          The layer that makes AI
          <span className="italic text-ember"> act,</span>
          <span className="text-ink-faint"> not just answer.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[540px] text-lg leading-relaxed text-ink-soft">
          Every Arinox solution runs on the same foundation: an agentic operating system that turns
          models into agents, and agents into work, inside your walls.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 font-mono text-[11.5px] text-ink-faint">
          <span className="rounded-full border border-line bg-white px-3 py-1">80+ agents</span>
          <span className="rounded-full border border-line bg-white px-3 py-1">runs on your hardware</span>
          <span className="rounded-full border border-line bg-white px-3 py-1">zero egress</span>
        </div>
      </div>
    </section>

    {/* The stack */}
    <Section border>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Label>The stack</Label>
          <h2 className="mt-5 max-w-2xl font-display text-[32px] leading-[1.08] tracking-[-0.02em] md:text-[44px]">
            One operating system, four layers.
          </h2>
        </div>
        <p className="max-w-sm text-[15px] leading-relaxed text-ink-soft">
          Start at the top with familiar work. End at the bottom with hardware you own.
        </p>
      </div>
      <div className="mt-12">
        <LayerStack />
      </div>
    </Section>

    {/* The engine, Terminal proof */}
    <Section dark border={false}>
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <Label dark>The engine</Label>
          <h2 className="mt-5 font-display text-[32px] leading-[1.08] tracking-[-0.02em] text-phos md:text-[44px]">
            A full-stack agentic operating system,{' '}
            <span className="text-ember">running on your hardware, never on ours.</span>
          </h2>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-ghost">
            KOGO OS runs beneath every Arinox solution, triage in a classified facility or forecasting
            on a factory floor, same controls.
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {osChips.map((c, i) => (
              <span key={c} className={`rounded-full border px-4 py-1.5 text-sm font-medium ${i === 0 ? 'border-ember bg-ember text-white' : 'border-white/25 text-ghost'}`}>{c}</span>
            ))}
          </div>
        </div>
        <Terminal title="kogo-os · governed agents, on-prem" lines={proofLines} />
      </div>
    </Section>

    {/* Capabilities, hairline spec rows */}
    <Section border>
      <Label>Capabilities</Label>
      <h2 className="mt-5 max-w-2xl font-display text-[32px] leading-[1.08] tracking-[-0.02em] md:text-[44px]">
        What the agents actually do.
      </h2>
      <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-ink-soft">
        Six verbs that cover most enterprise work. Each one cites sources and logs decisions.
      </p>
      <div className="mt-10">
        <SpecTable rows={caps} />
      </div>
    </Section>

    {/* The library */}
    <Section border>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Label>The library</Label>
          <h2 className="mt-5 max-w-2xl font-display text-[32px] leading-[1.08] tracking-[-0.02em] md:text-[44px]">
            Off the shelf, or built for you.
          </h2>
        </div>
        <p className="max-w-sm text-[15px] leading-relaxed text-ink-soft">
          80+ pre-built agents deploy today. Custom ships in days because it’s built on the same OS.
        </p>
      </div>
      <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-3">
        {agentCats.map((g) => (
          <div key={g.cat} className="border-t border-ink/80 pt-6">
            <p className="eyebrow text-ink-faint">{g.cat}</p>
            <ul className="mt-4">
              {g.items.map((it) => (
                <li key={it} className="border-b border-line py-3.5 text-[15.5px] font-medium">{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-wrap items-center gap-4">
        <Button to="/contact" variant="ember">Book a discovery session</Button>
        <span className="text-sm text-ink-faint">Free session, you keep the map either way.</span>
      </div>
    </Section>

    <CtaBand
      title="See the engine on your data."
      offer={
        <>
          Bring one real workflow to the session.{' '}
          <b className="font-medium text-white">We&apos;ll show you exactly how it would run.</b>
        </>
      }
    />
  </>
);

export default Platform;
