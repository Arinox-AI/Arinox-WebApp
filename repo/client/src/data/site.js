/* ─── Site-wide narrative data ────────────────────────────── */

export const nav = [
  { label: 'Platform',    to: '/commandcore' },
  { label: 'Solutions',   to: '/solutions' },
  { label: 'Company',     to: '/about' },
  { label: 'Partners',    to: '/partners' },
  { label: 'Careers',     to: '/careers' },
  { label: 'Blog',        to: '/blog' },
  { label: 'Contact',     to: '/contact' },
];

export const company = {
  name: 'Arinox AI',
  entity: 'Adisen Tech Private Limited',
  entityNote: 'Registered in Bengaluru, Karnataka, India',
  recognition: 'Recognised by Startup India (DPIIT)',
  email: 'assist@arinox.ai',
  phone: '+91 86976 78792',
  linkedin: 'https://www.linkedin.com/company/arinox-ai',
  offices: [
    { city: 'Bengaluru', note: 'Headquarters · Karnataka' },
    { city: 'New Delhi', note: 'Presence · NCR' },
  ],
  tagline: 'Private AI, implemented end-to-end.',
};

export const story = {
  overline: 'Who we are',
  title: 'An AI transformation company \u2014 not a tool vendor.',
  paragraphs: [
    'Most AI initiatives stall between the demo and the deployment. Models that impressed in a slide deck never survive contact with real operations, real compliance regimes, and real data. Arinox exists to close that gap.',
    'We are an AI transformation company. We help enterprises implement private AI \u2014 AI that runs on your own infrastructure, on your data, under your governance. Our product is CommandCore: sovereign AI infrastructure built in India. On top of it we deploy the KOGO agentic layer, which turns that infrastructure into working agents that do real work.',
    'What we bring is the journey itself: the assessment of where AI genuinely pays, the architecture that fits your constraints, the deployment inside your perimeter, and the operating partnership that keeps it delivering \u2014 from the first agent to an enterprise-wide AI practice.',
  ],
  facts: [
    { label: 'Headquarters', value: 'Bengaluru' },
    { label: 'Presence',     value: 'New Delhi' },
    { label: 'Recognition',  value: 'Startup India (DPIIT)' },
    { label: 'Entity',       value: 'Adisen Tech Pvt Ltd' },
  ],
};

export const values = [
  { letter: 'A', title: 'Adaptability',       desc: 'Our solutions evolve with your needs. No rigid systems. No obsolescence.' },
  { letter: 'G', title: 'Growth',             desc: 'We measure success by your outcomes. Real metrics. Real impact.' },
  { letter: 'E', title: 'Excellence',         desc: 'Every agent meets the highest standards. Maximum value, not minimum viable.' },
  { letter: 'N', title: 'Next-gen thinking',  desc: 'Future-ready systems built for tomorrow\u2019s challenges.' },
  { letter: 'T', title: 'Trust',              desc: 'Transparency in how our agents work. Integrity in how we operate.' },
];

export const team = [
  {
    name: 'Ajay Kharbanda',
    role: 'CEO & Co-Founder',
    bio: '25+ years driving digital transformation at Fortune 500s. Connects enterprise strategy directly to AI execution at scale.',
    photo: 'ajay',
  },
  {
    name: 'Dr Chytra V Anand',
    role: 'Co-Founder',
    bio: 'Champions client partnerships and enterprise AI adoption across global markets, turning complex deployments into measurable outcomes.',
    photo: 'chytra',
  },
  {
    name: 'D Uday Bhaskar Rao',
    role: 'CTO',
    bio: '26+ years in enterprise software engineering, cloud-native platforms, and AI-enabled systems across Retail, FinTech, Healthcare, Media & GIS/Digital Twin.',
    photo: 'uday',
  },
];

export const advisors = [
  { name: 'Venu Ganganna',        role: 'Creative, Data & Tech Specialist', bio: 'Strategic advisor driving creative innovation, data intelligence, and technology transformation.', photo: 'venu' },
  { name: 'Lt General BK Repswal', role: 'Defence & Strategic Advisor',      bio: 'Trusted counsel and deep defence domain expertise for sovereign deployments.', photo: 'repswal' },
  { name: 'Aniruddha Deswandikar', role: 'Chief Data Strategist',            bio: 'Guides how enterprise data fuels intelligent, scalable AI outcomes.', photo: 'aniruddha' },
];

/* On-the-ground gallery — real events, real rooms, real people */
export const gallery = [
  { photo: 'sovereign-launch',    caption: 'Launching our sovereign AI platform with Langoor, on AIM\u2019s Front Page' },
  { photo: 'hitachi-shori',       caption: 'Hitachi Shori 2026 \u2014 industrial intelligence for manufacturing leaders' },
  { photo: 'hitachi-systems',     caption: 'Formalising the Hitachi Systems India delivery partnership' },
  { photo: 'ai-summit',           caption: 'With India\u2019s defence & enterprise ecosystem at the AI Summit' },
  { photo: 'bharat-digital',      caption: 'Bharat Digital Summit \u2014 on India\u2019s digital infrastructure roadmap' },
  { photo: 'aks-workshop',        caption: 'AKS Workshop Global \u2014 sovereign AI for Kubernetes-native estates' },
  { photo: 'ansr-workshop',       caption: 'ANSR Tech Workshop \u2014 agentic AI in GCC operations' },
  { photo: 'hitachi-2026',        caption: 'With partners at the Hitachi leadership forum' },
];
