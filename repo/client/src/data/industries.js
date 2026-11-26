/* ─── The product line (hub) ────────────────────────────────
   The industry suites, productized: separate packaged AI products,
   each built for a sector, deployed mostly in the cloud. One entry
   per product: what it is, the benefit, the three info rows the hub
   card carries, and its illustration.

   `status` renders as a pill on the hub card when set. The slot sits
   empty for all four products — the user had "In development" on Secure
   OS for a day (2026-10-29) and removed it on review; pills stay unused
   until they ask for them.
   ──────────────────────────────────────────────────────────── */

import { sectors, caseIndex } from './caseStudies';

export const industriesMeta = {
  overline: 'All solutions',
  titleLead: 'AI for the work',
  titleAccent: 'your business actually does.',
  lead: 'We build the AI your business needs, run it inside your walls, and you approve every decision.',
  primary: 'Get your AI roadmap',
  secondary: 'See the case studies',
  spine: 'Signals in, decisions out, you approve — the same loop under every product.',
  seoTitle: 'All solutions | AI built on your data | Arinox AI',
  seoDescription:
    'Arinox builds AI for the work your business already does: voice agents, document automation, forecasting, vision, maintenance and more, proven in production across BFSI, healthcare, manufacturing, defence, government, FMCG and retail.',
};

/* Page sections. `capabilities` is the single source for the "What we build"
   ledger: each case in caseStudies.js carries a `capability` key matching one
   of these, and the page groups the case studies under it. */
export const industriesSections = {
  build: {
    label: 'What we build',
    title: 'Eight kinds of work, already in production.',
    note: 'Open any of them to see where it runs in production: the problem, what we deployed, the result.',
  },
  starts: {
    label: 'Ready-made',
    title: 'Start faster when your problem matches one of these.',
  },
  engage: {
    label: 'How we engage',
    title: 'Two ways to start.',
    ready: {
      title: 'Deploy a ready-made OS',
      line: 'Start from a packaged product built for your kind of operation, set up on your data and run inside your walls.',
      cta: 'See the ready-made products',
    },
    custom: {
      title: 'Commission a custom build',
      line: 'We map the workflow, build the agents, and run them on your infrastructure, with your people approving every decision.',
      cta: 'Tell us the workflow',
    },
  },
  cta: {
    title: "Bring us the workflow. We'll map it.",
  },
};

export const capabilities = [
  {
    key: 'voice',
    name: 'Voice & conversational agents',
    line: 'Agents that answer, triage and score conversations over voice and chat, with a human taking over when it matters.',
  },
  {
    key: 'documents',
    name: 'Document & back-office automation',
    line: 'Agents that read documents and forms, check them against your rules, and push clean records into your systems, so people review only the exceptions.',
  },
  {
    key: 'knowledge',
    name: 'Knowledge assistants',
    line: 'Protocols, circulars and know-how turned into a governed knowledge base your staff query in plain language, every answer cited to its source.',
  },
  {
    key: 'forecasting',
    name: 'Forecasting & planning',
    line: 'Forecasts, schedules and replenishment plans built from your ERP and live signals. Planners approve, systems execute.',
  },
  {
    key: 'vision',
    name: 'Vision AI',
    line: 'Vision models on the cameras, field photographs, satellite imagery and drone feeds you already have, running on your own hardware.',
  },
  {
    key: 'maintenance',
    name: 'Maintenance & asset intelligence',
    line: 'Machine and asset signals read continuously, so drift is flagged before failure and every change of custody is on the record.',
  },
  {
    key: 'data',
    name: 'Data unification & analytics',
    line: 'Scattered systems consolidated into one governed layer, so every team works from the same record.',
  },
  {
    key: 'security',
    name: 'Security & situational awareness',
    line: 'Multi-source intelligence fused into one operational picture, alerts triaged with an explainable rationale, fully air-gapped.',
  },
];

export const products = [
  /* The appliance comes first: "Solutions" in the nav lands here, so the
     flagship must be on this page, not only in the dropdown. */
  {
    id: 'commandcore',
    name: 'CommandCore™',
    status: '',
    available: true,
    tagline: 'Agentic AI in a box.',
    line: 'Our sovereign AI appliance: a self-contained micro-datacenter that brings compute, models, agentic intelligence and governance inside your perimeter.',
    info: [
      { t: 'Runs', d: 'in your building, air-gapped' },
      { t: 'Inside', d: 'compute, models, KOGO OS' },
      { t: 'Out', d: 'zero data egress' },
    ],
    visual: '/images/commandcore/commandcore-xl2.webp',
    visualAlt: 'The CommandCore XL appliance',
    to: '/commandcore',
    cta: 'Open CommandCore',
  },
  {
    id: 'marketing-os',
    name: 'Marketing OS',
    status: '',
    available: true,
    tagline: 'Every signal read as it lands. Every fix drafted with its reason.',
    line: 'An AI-native control plane for marketing: ads, funnel, footfall and CRM in one operating picture — you approve every move.',
    info: [
      { t: 'Signals in', d: 'ads, funnel, store and CRM' },
      { t: 'Agents', d: 'monitor, analyse, decide' },
      { t: 'Decisions out', d: 'pause, scale, create, send' },
    ],
    visual: '/images/industries/marketing-signals.svg',
    visualAlt: 'Two people at a large analytics chart on a screen — one presenting, one reviewing the growth curve',
    to: '/industries/marketing',
    cta: 'Open Marketing OS',
  },
  {
    id: 'fashion-lifestyle',
    name: 'Fashion & Lifestyle OS',
    status: '',
    available: true,
    tagline: 'From product concept to delivery, in one picture.',
    line: 'One control plane across product development, sourcing, production, inventory and sales — for apparel, footwear, accessories, home goods, lifestyle products and workwear.',
    info: [
      { t: 'Signals in', d: 'orders, production, materials, quality' },
      { t: 'Agents', d: 'monitor, analyse, decide' },
      { t: 'Decisions out', d: 're-plan, re-route, expedite, correct' },
    ],
    visual: '/images/industries/fashion-lifestyle-control.svg',
    visualAlt: 'A person trying on clothes in front of a mirror — an unDraw illustration recoloured to the site palette',
    to: '/industries/fashion-lifestyle',
    cta: 'Open Fashion & Lifestyle OS',
    sectors: 'Apparel · Footwear · Accessories · Home goods · Lifestyle products · Workwear',
  },
  {
    id: 'industrial-os',
    name: 'Manufacturing OS',
    status: '',
    available: true,
    tagline: 'From order to production to delivery, in one picture.',
    line: 'One control plane for factories, manufacturers, exporters and production-led businesses — production planning, materials, capacity, shop-floor visibility, quality and delivery commitments read together, so problems surface before they cost the shift.',
    info: [
      { t: 'Signals in', d: 'orders, materials, machines, quality' },
      { t: 'Agents', d: 'monitor, analyse, decide' },
      { t: 'Decisions out', d: 're-plan, re-route, expedite, correct' },
    ],
    visual: '/images/industries/industrial-line.svg',
    visualAlt: 'A factory building with smokestacks and a delivery truck outside',
    to: '/industries/industrial',
    cta: 'Open Manufacturing OS',
    sectors: 'Metals & Steel · Textiles & Apparel · Automotive · Electronics · Food & Pharma · Furniture & Furnishings',
  },
  {
    id: 'secure-os',
    name: 'Secure OS',
    status: '',
    available: true,
    tagline: 'The perimeter watches back.',
    line: 'One control plane for security operations: agents that attack and defend on your side of the wall, a perimeter that learns every attempt, files that refuse to move quietly.',
    info: [
      { t: 'Signals in', d: 'the whole estate, live' },
      { t: 'Agents', d: 'attack, defend, remember' },
      { t: 'Decisions out', d: 'contain, flag, report' },
    ],
    visual: '/images/industries/secure-os.svg',
    visualAlt: 'A person standing guard beside a large shield in front of a server rack',
    to: '/industries/secure',
    cta: 'Open Secure OS',
  },
  {
    id: 'digital-twin',
    name: 'Digital Twin++',
    status: '',
    available: true,
    tagline: 'A twin that sees, predicts and acts.',
    line: 'The sovereign, AI-native digital twin for government and defence sites: operations, security, assets, simulation, cyber and crisis response in one live picture — air-gapped, with a human approving every action.',
    info: [
      { t: 'Signals in', d: 'cameras, sensors, systems, drawings' },
      { t: 'Agents', d: 'see, understand, predict' },
      { t: 'Decisions out', d: 'work orders, alerts, re-plans' },
    ],
    visual: '/images/industries/digital-twin.svg',
    visualAlt: 'A site with a runway and buildings, and above it a floating twin layer of the same buildings in outline, linked by dotted lines',
    to: '/industries/digital-twin',
    cta: 'Open Digital Twin++',
    sectors: 'Airports · Defence bases · Ports · Rail · Power · Secure campuses',
  },
];

/* The shared spine under every product — carried as one line on the hub;
   each suite page explains its own loop in full. */

/* ─── Derived views (computed from caseStudies.js; nothing hand-typed) ───
   headlineMetric: the first figure, across the given cases in order, whose
   basis is 'published' and whose value starts like a number ("-82%",
   "~$1M", "24/7"; not "Days early" or "Ranked"). Returns null if none, and
   callers then omit the figure. */
const NUMERIC = /^[~+\-−–$]*\s*\d/;

export const headlineMetric = (cases) => {
  for (const c of cases) {
    for (const m of c.useCase.metrics || []) {
      if (m.basis === 'published' && NUMERIC.test(String(m.value))) {
        return { value: m.value, label: m.label, basis: m.basis, title: c.useCase.title, slug: c.slug };
      }
    }
  }
  return null;
};

export const capabilityRows = capabilities.map((cap) => {
  const cases = caseIndex.filter((c) => c.useCase.capability === cap.key);
  return {
    ...cap,
    image: `/images/capabilities/${cap.key}.svg`,
    cases,
    sectors: [...new Set(cases.map((c) => c.sectorLabel))],
    metric: headlineMetric(cases),
  };
});

export const sectorRows = sectors
  .filter((s) => s.useCases.length > 0)
  .map((s) => {
    const cases = caseIndex.filter((c) => c.sectorId === s.id);
    return { id: s.id, label: s.label, count: cases.length, first: cases[0], metric: headlineMetric(cases) };
  });

export const capabilityByKey = (key) => capabilityRows.find((c) => c.key === key) || null;

/* Copy for the /capabilities/:key pages. */
export const capabilityPage = {
  back: 'All solutions',
  eyebrow: 'Capability',
  primary: 'Get your AI roadmap',
  secondary: 'See all case studies',
  production: { label: 'In production', title: 'Where it is already running.' },
  problem: 'The problem',
  deployed: 'What we deployed',
  result: 'The result',
  noFigures: 'Figures on request',
  readCase: 'Read the full case',
  does: { label: 'What it does', title: 'What the agents handle.' },
  runs: { label: 'Infrastructure', title: 'Runs on your infrastructure.' },
  cta: { title: "Bring us the workflow. We'll map it." },
};
