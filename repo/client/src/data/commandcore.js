/* ─── CommandCore product data ──────────────────────────────
   Single source of truth for the Platform page.
   Technical specifications are intentionally left as
   SPEC_TBC placeholders — real numbers will be filled in
   when the final hardware datasheet is approved.
   ──────────────────────────────────────────────────────────── */

export const SPEC_TBC = 'Full technical specifications available on request';

export const commandCoreIntro = {
  overline: 'The Platform',
  title: 'CommandCore — private AI infrastructure, yours entirely.',
  lead: 'CommandCore is Arinox\u2019s own product: a sovereign AI platform that runs inside your walls \u2014 your hardware, your network, your governance. It pairs enterprise-grade compute with the KOGO agentic layer, so AI doesn\u2019t just answer questions \u2014 it does the work.',
  badges: ['100% on-premises', '0 data egress', 'Air-gap capable', 'Built in India'],
};

export const whatItIs = [
  {
    title: 'Infrastructure you own',
    desc: 'AI compute that lives in your server room, branch office, or plant floor \u2014 not in someone else\u2019s cloud. Nothing to lease back from a hyperscaler.',
  },
  {
    title: 'Intelligence that stays home',
    desc: 'Models, prompts, and data never leave your perimeter. Fully functional in air-gapped environments with zero external connectivity.',
  },
  {
    title: 'Work, not chat',
    desc: 'Through the KOGO agentic layer, CommandCore runs purpose-built agents that execute real workflows \u2014 reviewing, reconciling, scheduling, deciding \u2014 with every action logged.',
  },
  {
    title: 'Governed by design',
    desc: 'Role-based access, complete audit trails on every AI decision, and deployment profiles tuned to your compliance regime.',
  },
];

/* Architecture stack — top to bottom */
export const stack = [
  { layer: 'Your AI agents',      desc: 'Purpose-built agents for your workflows \u2014 configured with your rules, your data, your approvals.' },
  { layer: 'KOGO agentic layer',  desc: 'The agentic platform that builds, orchestrates, and governs agents \u2014 LLM ops, memory, tools, and multi-agent coordination.' },
  { layer: 'Models & knowledge',  desc: 'Open-weight LLMs and your governed knowledge base (RAG) \u2014 running locally, cited and auditable.' },
  { layer: 'CommandCore hardware', desc: 'Sovereign compute engineered for on-premises deployment \u2014 from edge units to datacenter-grade systems.' },
  { layer: 'Your premises',       desc: 'Your network, your security perimeter, your compliance boundary. Nothing crosses it.' },
];

export const tiers = [
  {
    id: 's',
    name: 'CommandCore S',
    tagline: 'Agentic edge',
    img: 'm-series',
    desc: 'Compact edge unit for real-time AI where space, power, or connectivity is constrained \u2014 branches, plants, vehicles, remote sites.',
    bestFor: ['Video analytics & computer vision', 'Autonomous systems & IoT AI', 'Remote or tactical deployments', 'Air-gapped edge operation'],
    specs: null, // SPEC_TBC � filled from the final hardware datasheet
  },
  {
    id: 'm',
    name: 'CommandCore M',
    tagline: 'Department-grade',
    img: 'm-series-pro',
    desc: 'Desktop-class sovereign AI for teams and departments \u2014 local inference of large models without any cloud dependency.',
    bestFor: ['Secure AI labs & R&D', 'Local LLM inference at scale', 'Department-level analytics', 'Cloud-free simulation'],
    specs: null, // SPEC_TBC � filled from the final hardware datasheet
  },
  {
    id: 'xl',
    name: 'CommandCore XL',
    tagline: 'Datacenter-grade',
    highlight: true,
    img: 'xl-series',
    desc: 'Mission-critical infrastructure for enterprise-wide AI operations \u2014 large model inference, multi-agent orchestration, and real-time intelligence at scale.',
    bestFor: ['Enterprise AI operations', 'Large model inference', 'Multi-agent orchestration', 'Real-time decision intelligence'],
    specs: null, // SPEC_TBC � filled from the final hardware datasheet
  },
];

export const governance = [
  { title: 'Your data never leaves',    desc: 'Complete isolation from public cloud. Air-gapped operation supported end to end.' },
  { title: '100% audit coverage',       desc: 'Every agent decision logged and reviewable \u2014 governance on by default, not bolted on.' },
  { title: 'Least-privilege access',    desc: 'Role-based controls so agents and people only see what they must.' },
  { title: 'Deployment in weeks',       desc: 'Platform live in days; custom agents in weeks. We handle the journey end to end.' },
];

export const deploymentSteps = [
  { step: '01', title: 'Assess',    desc: 'We map where AI creates real advantage in your operations \u2014 constraints, data readiness, compliance needs.' },
  { step: '02', title: 'Architect', desc: 'We design the private AI stack for your environment \u2014 hardware footprint, agents, integrations, governance.' },
  { step: '03', title: 'Deploy',    desc: 'CommandCore is installed inside your perimeter; KOGO agents are configured, tested, and handed over.' },
  { step: '04', title: 'Run & scale', desc: 'We operate, measure, and expand \u2014 new agents, new workflows, new sites \u2014 as your AI practice matures.' },
];

/* KOGO — the agentic layer (affiliated tech, deployed by Arinox) */
export const kogo = {
  name: 'KOGO',
  role: 'The agentic layer',
  desc: 'CommandCore\u2019s intelligence comes from KOGO \u2014 the agentic platform we deploy for every engagement. KOGO turns infrastructure into working AI: building agents, orchestrating them as a team, managing memory and tools, and keeping every action accountable.',
  points: [
    'Agent registry & lifecycle management',
    'Multi-agent orchestration & hand-offs',
    'Governed RAG \u2014 answers cited to source',
    'LLMOps: models, prompts, memory, evals',
    'Voice agents over enterprise telephony',
    'Human-in-the-loop approvals where they matter',
  ],
};
