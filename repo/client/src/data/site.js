/* ─── Site-wide narrative data ────────────────────────────── */
import { capabilities, sectorRows } from './industries';

/* The Solutions mega-menu: three columns, Products | Capabilities | Industries.
   Products are listed here (also kept as `group` for the mobile/flat list);
   Capabilities and Industries are DERIVED from industries.js / caseStudies.js,
   so there is no second list to keep in sync. */
const solutionProducts = [
  { to: '/commandcore', label: 'CommandCore', note: 'Sovereign AI appliance' },
  { to: '/industries/marketing', label: 'Marketing OS', note: 'Signals in, decisions out' },
  { to: '/industries/fashion-lifestyle', label: 'Fashion & Lifestyle OS', note: 'From concept to delivery' },
  { to: '/industries/industrial', label: 'Manufacturing OS', note: 'Machines, lines and orders' },
  { to: '/industries/secure', label: 'Secure OS', note: 'The perimeter, in one loop' },
  { to: '/industries/digital-twin', label: 'Digital Twin++', note: 'See, predict, act' },
];

export const solutionColumns = [
  { label: 'Products', items: solutionProducts },
  {
    label: 'Capabilities',
    items: capabilities.map((c) => ({ to: `/capabilities/${c.key}`, label: c.name })),
  },
  {
    label: 'Industries',
    items: sectorRows.map((s) => ({ to: `/case-studies?sector=${s.id}`, label: s.label })),
  },
];

/* Primary navigation.
   Flat items render as links; items with `group` render as a minimal
   dropdown on desktop (hover + focus). Mobile always renders every child
   link, so nothing is ever hidden behind a hover. */
export const nav = [
  {
    label: 'Solutions',
    to: '/industries',
    allLabel: 'All solutions',
    secondaryAll: { to: '/case-studies', label: 'All case studies' },
    group: solutionProducts,
    columns: solutionColumns,
  },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Case studies', to: '/case-studies' },
  {
    label: 'Company',
    to: '/people',
    group: [
  { to: '/people', label: 'People', note: 'Leadership and advisors' },
  { to: '/partners', label: 'Partners', note: 'Who we build with' },
  { to: '/careers', label: 'Careers', note: 'Open roles' },
    ],
  },
  { label: 'Blog', to: '/blog' },
];

export const company = {
  name: 'Arinox AI',
  entity: 'Adisen Tech Private Limited',
  entityNote: 'Registered in Bengaluru, Karnataka, India',
  recognition: 'Recognised by Startup India (DPIIT)',
  email: 'assist@arinox.ai',
  phone: '+91 79759 39909',
  linkedin: 'https://in.linkedin.com/company/arinox-ai',
  /* Offices are grouped: India first, then international. Edit here only —
     the contact page renders whatever is in this list. */
  offices: [
    {
      group: 'India',
      cities: [
        { city: 'Bengaluru', country: 'India', lat: 12.97, lon: 77.59, note: 'Headquarters' },
        { city: 'Hyderabad', country: 'India', lat: 17.385, lon: 78.487 },
        { city: 'New Delhi', country: 'India', lat: 28.614, lon: 77.209 },
      ],
    },
    {
      group: 'International',
      cities: [
        { city: 'New York', country: 'USA', lat: 40.713, lon: -74.006, note: 'USA' },
        { city: 'Bangkok', country: 'Thailand', lat: 13.756, lon: 100.502, note: 'Thailand' },
        { city: 'Dubai', country: 'UAE', lat: 25.205, lon: 55.271, note: 'UAE' },
      ],
    },
  ],
  tagline: 'Private AI, implemented end-to-end.',
};

export const story = {
  overline: 'Who we are',
  title: 'An AI transformation company, not a tool vendor.',
  paragraphs: [
    'Most AI initiatives stall between the demo and the deployment. Models that impressed in a slide deck never survive contact with real operations, real compliance regimes, and real data. Arinox exists to close that gap.',
    'We are an AI transformation company. We help enterprises implement private AI, AI that runs on your own infrastructure, on your data, under your governance. Our product is CommandCore: sovereign AI infrastructure built in India. On top of it we deploy the KOGO agentic layer, which turns that infrastructure into working agents that do real work.',
    'What we bring is the journey itself: the assessment of where AI genuinely pays, the architecture that fits your constraints, the deployment inside your perimeter, and the operating partnership that keeps it delivering, from the first agent to an enterprise-wide AI practice.',
  ],
  facts: [
    { label: 'Headquarters', value: 'Bengaluru' },
    { label: 'Presence',     value: 'India · UAE · USA · Thailand' },
    { label: 'Recognition',  value: 'Startup India (DPIIT)' },
    { label: 'Entity',       value: 'Adisen Tech Pvt Ltd' },
  ],
};

/* People page copy */
export const people = {
  eyebrow: 'People',
  title: 'The people behind Arinox.',
  intro: 'Operators, not evangelists: a leadership team and advisory bench that have run enterprise transformation, defence deployments and global delivery.',
  leadershipLabel: 'Leadership',
  advisorsLabel: 'Advisors',
  galleryEyebrow: 'On the ground',
  galleryTitle: 'Real rooms. Real partners.',
  ctaTitle: 'Want to work with this team?',
  ctaOffer: 'We hire builders who ship AI into real operations. See the open roles.',
};

export const team = [
  {
    name: 'Ajay Kharbanda',
    role: 'CEO & Founder',
    bio: '25+ years driving digital transformation at Fortune 500s. Connects enterprise strategy directly to AI execution at scale.',
    photo: '/images/team/ajay.webp',
  },
  {
    name: 'Dr Chytra V Anand',
    role: 'Director & Co-Founder',
    bio: 'Champions client partnerships and enterprise AI adoption across global markets, turning complex deployments into measurable outcomes.',
    photo: '/images/team/chytra.webp',
  },
  {
    name: 'Anuvesh Nigam',
    role: 'Chief Operating Officer',
    bio: 'Operations leader keeping delivery, teams and company rhythm in step, turning strategy into structured, repeatable execution.',
    photo: '/images/team/anuvesh.jpeg',
  },
  {
    name: 'Michael Robinson',
    role: 'MD & CMO - North America',
    bio: 'Growth and go-to-market leader expanding Arinox\u2019s sovereign AI platforms across North American enterprises and strategic partners.',
    photo: '/images/team/michael.webp',
  },
];

export const advisors = [
  { name: 'Venu Ganganna',        role: 'Creative, Data & Tech Specialist', bio: 'Strategic advisor driving creative innovation, data intelligence, and technology transformation.', photo: '/images/team/venu.webp' },
  { name: 'Lt General BK Repswal', role: 'Defence & Strategic Advisor',      bio: 'Trusted counsel and deep defence domain expertise for sovereign deployments.', photo: '/images/team/repswal.webp' },
  { name: 'Aniruddha Deswandikar', role: 'Chief Data Strategist',            bio: 'Guides how enterprise data fuels intelligent, scalable AI outcomes.', photo: '/images/team/aniruddha.webp' },
];

/* On-the-ground gallery, real events, real rooms, real people */
export const gallery = [
  { photo: 'sovereign-launch',    event: 'Sovereign AI launch · AIM',   caption: 'Launching our sovereign AI platform with Langoor, on AIM’s Front Page' },
  { photo: 'hitachi-shori',       event: 'Hitachi Shori 2026',                 caption: 'Industrial intelligence for manufacturing leaders' },
  { photo: 'hitachi-systems',     event: 'Hitachi Systems India',              caption: 'Formalising the delivery partnership' },
  { photo: 'ai-summit',           event: 'AI Summit',                          caption: 'With India’s defence & enterprise ecosystem' },
  { photo: 'bharat-digital',      event: 'Bharat Digital Summit',              caption: 'On India’s digital infrastructure roadmap' },
  { photo: 'aks-workshop',        event: 'AKS Workshop Global',                caption: 'Sovereign AI for Kubernetes-native estates' },
  { photo: 'ansr-workshop',       event: 'ANSR Tech Workshop',                 caption: 'Agentic AI in GCC operations' },
  { photo: 'hitachi-2026',        event: 'Hitachi leadership forum',           caption: 'With partners at the forum' },
];

/* Home page copy: the company essentials. Anything with its own tab lives there. */
export const home = {
  problem: {
    label: 'The problem',
    title: 'Most AI never leaves the demo stage.',
    lead: 'Three questions decide whether AI ships: where the data goes, who owns the model, and what happens at the security review. We answer all three before we build.',
    heard: 'What we hear in every first meeting',
    rows: [
      { who: 'The security review', objection: 'This data can’t leave the building.', answer: 'We run the models where the data already lives.' },
      { who: 'The board', objection: 'Six months of pilot. Nothing in production.', answer: 'We deploy in days and expand workflow by workflow.' },
      { who: 'The auditor', objection: 'Show me why the model decided that.', answer: 'Every agent decision is logged, every time.' },
    ],
  },
  /* Customers: slugs of published case studies; the figure is read from the case data (first metric labelled `metric`) */
  proof: {
    label: 'Case studies',
    title: 'Deployed, not demoed.',
    note: 'Three results from live deployments, in three sectors.',
    linkLabel: 'Read the case',
    button: 'See all case studies',
    cases: [
      { slug: 'one-cockpit-for-the-entire-bpo-floor', metric: 'Agents live', image: '/images/proof/live-support.svg', line: 'Voice, chat, video and email in one AI-orchestrated layer, live at a PSU bank.' },
      { slug: 'enterprise-scale-data-intelligence', metric: 'Cost reduction', image: '/images/proof/data-processing.svg', line: 'A multi-agent pipeline that scales across 100K+ part lines without adding headcount.' },
      { slug: 'golden-record-and-enterprise-data-unification', metric: 'Data systems unified', image: '/images/proof/data-unified.svg', line: 'One governed data layer across 7+ business units, one source of truth.' },
    ],
  },
  method: {
    label: 'The method',
    title: 'Three moves. That’s the whole method.',
    note: 'You focus on your business. We carry the technical weight, from your first working session to workflows running in production.',
    steps: [
      { n: '01', t: 'Map', d: 'One free working session. We find the workflows worth transforming first, by cost, risk, and payback speed. You keep the map either way.', tag: 'One session', image: '/images/method/map.svg' },
      { n: '02', t: 'Build', d: 'We assemble agents on a proven agentic operating system, documents, voice, vision, decisions, wired into the tools your teams already use.', tag: 'Built on KOGO OS', image: '/images/method/build.svg' },
      { n: '03', t: 'Run', d: 'You choose where it lives: your cloud, your infrastructure, or a CommandCore appliance in your building. Governed end to end.', tag: 'Inside your perimeter', image: '/images/method/run.svg' },
    ],
  },
};

/* Where it runs: shared by Home (Deployment) and Pricing (#deploy) so both say the same thing. */
export const deployOptions = [
  {
    t: 'Your public cloud',
    d: 'Dedicated, isolated compute that slots into the estate you already run.',
    li: ['Deploys into your cloud', 'Isolated tenancy', 'Scales as adoption spreads'],
    image: '/images/deploy/public-cloud.svg',
  },
  {
    t: 'Your virtual private cloud',
    d: 'We host it for you in a private cloud that stays yours alone.',
    li: ['Hosted by us in a private VPC', 'Dedicated, not shared', 'No hardware to own or manage'],
    image: '/images/deploy/private-cloud.svg',
  },
  {
    t: 'CommandCore\u2122',
    d: 'The machine itself, air-gapped, in your building, answering to nobody\u2019s cloud.',
    li: ['Zero data egress', 'Full audit trails', 'Remote and tactical sites'],
    sovereign: true,
    image: '/images/deploy/commandcore.svg',
  },
];

/* Trusted-by strip. Same sizing rule as the Partners page: explicit w/h
   per logo (equal ~4,200px² footprint, max 150×44) so wide wordmarks don't
   dwarf square marks and vice versa. The flex row center-aligns everything,
   so all logos share one vertical axis. */
export const trustedLogos = [
  { src: '/images/logos/ibm.svg', alt: 'IBM', w: 106, h: 40 },
  { src: '/images/logos/hpe.svg', alt: 'HPE', w: 100, h: 42 },
  { src: '/images/logos/hcltech.svg', alt: 'HCL Tech', w: 150, h: 27 },
  { src: '/images/logos/hitachi.svg', alt: 'Hitachi Systems', w: 150, h: 23 },
  { src: '/images/logos/Coforge.webp', alt: 'Coforge', w: 138, h: 30 },
  { src: '/images/logos/minera.svg', alt: 'Minera Steel and Power', w: 119, h: 35 },
  { src: '/images/logos/blackberrys.png', alt: 'Blackberrys', w: 150, h: 19 },
  { src: '/images/logos/lsdigital.png', alt: 'LS Digital', w: 52, h: 44 },
  { src: '/images/logos/hul.svg', alt: 'Hindustan Unilever', w: 112, h: 37 },
  { src: '/images/logos/centuryply.svg', alt: 'Century Ply', w: 97, h: 43 },
  { src: '/images/logos/innocean.png', alt: 'Innocean', w: 150, h: 22 },
  { src: '/images/logos/celkon.webp', alt: 'Celkon Mobile', w: 148, h: 29 },
  { src: '/images/logos/nikom.png', alt: 'Nikom', w: 124, h: 34 },
  { src: '/images/logos/langoor.png', alt: 'Langoor', w: 150, h: 15 },
  { src: '/images/logos/indian-army.png', alt: 'Indian Army', w: 58, h: 44 },
  { src: '/images/logos/sunmobility.png', alt: 'Sun Mobility', w: 113, h: 37 },
  { src: '/images/logos/kosmoderma.png', alt: 'Kosmoderma Clinics', w: 150, h: 27 },
  { src: '/images/logos/informage.png', alt: 'Informage', w: 133, h: 31 },
]
