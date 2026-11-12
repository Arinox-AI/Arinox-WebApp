/* ─── Site-wide narrative data ────────────────────────────── */

/* Primary navigation.
   Flat items render as links; items with `group` render as a minimal
   dropdown on desktop (hover + focus). Mobile always renders every child
   link, so nothing is ever hidden behind a hover. */
export const nav = [
  { label: 'Home', to: '/' },
  {
    label: 'Products',
    to: '/industries',
    allLabel: 'All products',
    group: [
      { to: '/commandcore', label: 'CommandCore', note: 'Sovereign AI appliance' },
      { to: '/industries/marketing', label: 'Marketing OS', note: 'Signals in, decisions out' },
      { to: '/industries/fashion-lifestyle', label: 'Fashion & Lifestyle OS', note: 'From concept to delivery' },
      { to: '/industries/industrial', label: 'Manufacturing OS', note: 'Machines, lines and orders' },
      { to: '/industries/secure', label: 'Secure OS', note: 'The perimeter, in one loop' },
      { to: '/industries/digital-twin', label: 'Digital Twin++', note: 'See, predict, act' },
    ],
  },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Partners', to: '/partners' },
  { label: 'People', to: '/people' },
  {
    label: 'Resources',
    to: '/blog',
    group: [
      { to: '/blog', label: 'Blog', note: 'Field notes and events' },
      { to: '/careers', label: 'Careers', note: 'Open roles' },
      { to: '/case-studies', label: 'Case Studies', note: 'Deployed inside the perimeter' },
    ],
  },
  /* Contact is a plain nav link: on desktop it used to live only in the
     footer, which made "talk to us" hard to find. */
  { label: 'Contact', to: '/contact' },
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
  ctaOffer: 'Join us, or book a working session and meet the architects who would run your deployment.',
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
  { photo: 'sovereign-launch',    caption: 'Launching our sovereign AI platform with Langoor, on AIM\u2019s Front Page' },
  { photo: 'hitachi-shori',       caption: 'Hitachi Shori 2026, industrial intelligence for manufacturing leaders' },
  { photo: 'hitachi-systems',     caption: 'Formalising the Hitachi Systems India delivery partnership' },
  { photo: 'ai-summit',           caption: 'With India\u2019s defence & enterprise ecosystem at the AI Summit' },
  { photo: 'bharat-digital',      caption: 'Bharat Digital Summit, on India\u2019s digital infrastructure roadmap' },
  { photo: 'aks-workshop',        caption: 'AKS Workshop Global, sovereign AI for Kubernetes-native estates' },
  { photo: 'ansr-workshop',       caption: 'ANSR Tech Workshop, agentic AI in GCC operations' },
  { photo: 'hitachi-2026',        caption: 'With partners at the Hitachi leadership forum' },
];

/* Home page copy: the company essentials. Anything with its own tab lives there. */
export const home = {
  problem: {
    label: 'The problem',
    title: 'Most AI never leaves the demo stage.',
    lead: 'Three questions decide whether AI ships: where the data goes, who owns the model, and what happens at the security review. We answer all three before we build.',
    rows: [
      ['The data can\u2019t move', 'Regulated data can\u2019t be shipped to a vendor\u2019s cloud, so the pilot never survives compliance. We run the models where the data already lives.'],
      ['The pilot never ends', 'Six months of \u201Cevaluation\u201D and nothing in production. We deploy in days and expand workflow by workflow, with results at each step.'],
      ['Nobody can audit it', 'A model that can\u2019t explain its decisions will never pass review. Every agent decision is logged, every time.'],
    ],
  },
  how: {
    label: 'How we work',
    title: 'One partner for the whole AI journey.',
    lead: 'Accountable for the outcome, from the first working session to the workflows running in production.',
    steps: [
      { n: '01', t: 'Assess', d: 'One free working session. We find the workflows worth transforming first, by cost, risk and payback speed. You keep the map either way.' },
      { n: '02', t: 'Architect', d: 'The design that fits your constraints: your data, your systems, your compliance regime.' },
      { n: '03', t: 'Deploy', d: 'Agents on a proven agentic operating system, inside your cloud, your infrastructure or a CommandCore appliance in your building.' },
      { n: '04', t: 'Operate', d: 'We keep it delivering, governed end to end, from the first agent to an enterprise-wide AI practice.' },
    ],
  },
  build: {
    label: 'What we build',
    title: 'One platform. Five operating systems.',
    lead: 'CommandCore is the sovereign foundation. The OS suites run on top of it, each built for a sector.',
    cta: 'Compare all products',
  },
  closing: {
    label: 'Arinox AI',
    title: 'Start with one workflow.',
    offer: 'A free working session. We map the first workflow worth transforming, and you keep the roadmap either way.',
    links: [
      { label: 'Meet the people', to: '/people' },
      { label: 'Case studies', to: '/case-studies' },
      { label: 'Contact', to: '/contact' },
    ],
  },
};
