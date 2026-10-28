/* ─── Site-wide narrative data ────────────────────────────── */

/* Primary navigation.
   Flat items render as links; items with `group` render as a minimal
   dropdown on desktop (hover + focus). Mobile always renders every child
   link, so nothing is ever hidden behind a hover. */
export const nav = [
  { label: 'Home', to: '/' },
  { label: 'CommandCore', to: '/commandcore' },
  {
    label: 'Solutions',
    to: '/industries',
    group: [
      { to: '/industries', label: 'Industry Suites', note: 'AI that knows your industry' },
      { to: '/case-studies', label: 'Case Studies', note: 'Deployed inside the perimeter' },
    ],
  },
  { label: 'Partners', to: '/partners' },
  {
    label: 'Resources',
    to: '/blog',
    group: [
      { to: '/blog', label: 'Blog', note: 'Field notes and events' },
      { to: '/careers', label: 'Careers', note: 'Open roles' },
    ],
  },
];

export const company = {
  name: 'Arinox AI',
  entity: 'Adisen Tech Private Limited',
  entityNote: 'Registered in Bengaluru, Karnataka, India',
  recognition: 'Recognised by Startup India (DPIIT)',
  email: 'assist@arinox.ai',
  phone: '+91 79759 39909',
  linkedin: 'https://in.linkedin.com/company/arinox-ai',
  offices: [
    { city: 'Bengaluru',  note: 'Headquarters · India' },
    { city: 'New Delhi',  note: 'India' },
    { city: 'Hyderabad',  note: 'India' },
    { city: 'Sharjah',    note: 'UAE' },
    { city: 'New Jersey', note: 'USA' },
    { city: 'New York',   note: 'USA' },
    { city: 'Bangkok',    note: 'Thailand' },
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

export const team = [
  {
    name: 'Ajay Kharbanda',
    role: 'CEO & Founder',
    bio: '25+ years driving digital transformation at Fortune 500s. Connects enterprise strategy directly to AI execution at scale.',
    photo: '/images/team/ajay.jpg',
  },
  {
    name: 'Dr Chytra V Anand',
    role: 'Director & Co-Founder',
    bio: 'Champions client partnerships and enterprise AI adoption across global markets, turning complex deployments into measurable outcomes.',
    photo: '/images/team/chytra.webp',
  },
  {
    name: 'Michael Robinson',
    role: 'MD & CMO - North America',
    bio: 'Growth and go-to-market leader expanding Arinox\u2019s sovereign AI platforms across North American enterprises and strategic partners.',
    photo: '/images/team/michael.jpg',
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
