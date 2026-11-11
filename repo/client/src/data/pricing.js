/* Pricing page + Price Discovery wizard — single-source copy.
 *
 * Copy is final per the design brief (do not paraphrase on-page). Anything in
 * [BRACKETS] is a placeholder the team must fill before launch:
 *   - [YOUR PRICE]  → Plug & Play Level 1 monthly price (USD + INR)
 *   - [X]+          → verified enterprise deployment count
 *   - Enterprise card heading/intro → confirm against the mockup canvas
 *
 * Prices stay hidden by design: `ladder.levels[].visible` is the ONLY place a
 * visible price line exists. Never add a real price anywhere on this page.
 */

/* How many questions the Price Discovery survey asks. Copy below quotes it;
   a test asserts wizard.questions.length === QUESTION_COUNT. */
export const QUESTION_COUNT = 10;

export const pricingHero = {
  eyebrow: 'Pricing',
  titleA: 'We don\u2019t sell seats.',
  titleB: 'We price',
  titleAccent: 'outcomes.',
  lead:
    'Every Arinox deployment is sized to your business, your teams, your data and the result you want. Below is exactly how we work. Your number comes from a few questions and a conversation with an architect.',
  ctaPrimary: `Answer ${QUESTION_COUNT} questions`,
  ctaSecondary: 'Or talk to us first',
  microcopy: 'About 4 minutes \u00B7 No obligation \u00B7 Your price is shared in a conversation',
};

export const factors = {
  eyebrow: 'What shapes your price',
  title: 'Six things decide your number. We ask about all six.',
  items: [
    { title: 'Your business', body: 'Industry, scale and the rules you operate under.' },
    { title: 'Your teams', body: 'Who will use it, how many of them, and where.' },
    { title: 'Your requirements', body: 'The workflows to automate and the agents to build.' },
    { title: 'Present applications', body: 'The ERP, CRM and tools we plug into on day one.' },
    { title: 'Your data', body: 'Where it lives, how much there is, and how sensitive it is.' },
    { title: 'Your outcome', body: 'The result you\u2019ll measure us on. This is what we price.' },
  ],
};

export const currencies = [
  { id: 'USD', symbol: '$' },
  { id: 'INR', symbol: '\u20B9' },
];

export const deployments = [
  {
    id: 'saas',
    label: 'SaaS',
    callout:
      'SaaS: fully managed by Arinox. Live fastest, with nothing to install. Updates, security and scaling are handled for you.',
  },
  {
    id: 'paas',
    label: 'PaaS',
    callout:
      'PaaS: your cloud, our platform. KOGO runs in your own cloud tenancy. Your team extends it and we support it.',
  },
  {
    id: 'onprem',
    label: 'On-Prem (Sovereign)',
    callout:
      'On-Prem: Sovereign AI Infrastructure. CommandCORE\u2122, our Agentic AI-in-a-Box, runs air-gapped on your premises. Your data never leaves.',
  },
];

export const models = {
  eyebrow: 'Engagement models',
  title: 'Choose how you want to work with us.',
  lead: 'Three ways in, and each runs wherever you need it. Choose a deployment to see what changes.',
  ladder: {
    label: 'Plug & Play',
    title: 'Start fast. Climb one step at a time.',
    body:
      'Go live on KOGO, Arinox\u2019s flagship Agentic OS, then add modules, people, applications and custom builds as results come in. Nothing you\u2019ve built gets rebuilt.',
    levels: [
      {
        level: 'Level 1',
        name: 'Basic',
        body: 'The KOGO platform, ready-made agents and standard integrations.',
        // The ONLY visible price line on the page. [YOUR PRICE] = placeholder.
        visible: true,
        priceLine: 'Start here',
      },
      { level: 'Level 2', name: '+ Modules', body: 'Functional modules for Sales, Operations, Finance, HR and more.' },
      { level: 'Level 3', name: '+ People', body: 'A dedicated success team, onboarding and training for your staff.' },
      { level: 'Level 4', name: '+ Applications', body: 'Your ERP, CRM, data and in-house apps connected and working together.' },
      {
        level: 'Level 5',
        name: '+ Custom build',
        body: 'Custom agents built for you, with ongoing support and Forward Deployed Engineers.',
        dark: true,
      },
    ],
    footer: 'Prices are shared in a conversation, after a short discovery.',
    cta: 'Talk pricing with an architect',
  },
  enterprise: {
    // Drafted copy (was a bracket placeholder) \u2014 team to confirm wording.
    label: 'Enterprise',
    heading: 'One annual number, sized to your estate.',
    intro: 'For organisations rolling Arinox out across teams. Priced per year around the five things below, and fixed once the scope is agreed.',
    depends: [
      'Number of users',
      'Modules and agents enabled',
      'Applications connected',
      'Deployment: SaaS, PaaS or On-Prem',
      'Support and FDE coverage',
    ],
    per: 'year',
    cta: 'Talk pricing with an architect',
  },
  custom: {
    label: 'Full Custom Build',
    title: 'Built from zero, around your process.',
    lead: 'For organisations whose work doesn\u2019t fit a template. Includes:',
    includes: [
      'Discovery, architecture and an AI roadmap',
      'Custom agents and applications',
      'Forward Deployed Engineers embedded with your team',
      'A 90-day transformation sprint to production',
      'Optional sovereign deployment on CommandCORE\u2122',
    ],
    footer: 'Custom pricing',
    cta: 'Start the conversation',
  },
};

export const inEvery = {
  eyebrow: 'In every engagement',
  title: 'Whichever model you choose, you get this.',
  items: [
    {
      title: 'KOGO at the core',
      body: 'Arinox\u2019s flagship Agentic OS. One platform for the whole organisation, with 1000+ integrations.',
    },
    {
      title: 'Forward Deployed Engineers',
      body: 'Engineers who sit with your teams until it works in production, not just in a demo.',
    },
    {
      title: '90-day sprints',
      body: 'Clear milestones and measurable outcomes every quarter.',
    },
    {
      title: 'Your data, your rules',
      body: 'Run it as SaaS, PaaS or fully air-gapped on your own premises.',
    },
  ],
};

export const discoverySteps = {
  eyebrow: 'How Price Discovery works',
  title: `From ${QUESTION_COUNT} questions to a price conversation.`,
  steps: [
    {
      title: `Answer ${QUESTION_COUNT} questions`,
      body: 'About your business, teams, apps, data, budget and goals. Takes about 4 minutes.',
    },
    {
      title: 'Talk to an architect',
      body: 'A 30-minute conversation with an Arinox AI architect who has already read your answers. It\u2019s not a sales pitch.',
    },
    {
      title: 'Get your price',
      body: 'Your price is shared in that conversation, built around your answers. The map of where AI fits is yours to keep, whatever you decide.',
    },
  ],
};

export const pricingFaq = {
  title: 'Questions buyers ask us.',
  items: [
    {
      q: 'Why don\u2019t you publish a price list?',
      a: 'No two organisations need the same thing. With a fixed list, you either pay for what you don\u2019t use or miss what you need. A few questions and a conversation, and the number you get is built around you.',
    },
    {
      q: 'Can we start small and grow?',
      a: 'Yes. Plug & Play starts at Level 1. You move up the ladder as results come in, and nothing is rebuilt along the way.',
    },
    {
      q: 'Can it run fully on our own premises?',
      a: 'Yes. CommandCORE\u2122, our Agentic AI-in-a-Box, runs the full stack air-gapped on your own hardware. Your data never leaves the building.',
    },
    {
      q: 'What happens after I submit?',
      a: 'An Arinox architect reviews your answers and gets in touch within one business day to set up a 30-minute conversation. Your price is shared in that conversation, built around what you told us.',
    },
  ],
};

export const closingBand = {
  titleA: 'Your price depends on your business.',
  titleAccent: 'So let\u2019s start there.',
  cta: `Answer ${QUESTION_COUNT} questions`,
  talk: 'Or talk to us first',
  microcopy: '4 minutes \u00B7 No obligation \u00B7 Price shared in a conversation',
};

/* ── Price Discovery wizard ─────────────────────────────────────────── */

export const wizard = {
  eyebrow: 'Price Discovery',
  title: `4 minutes. ${QUESTION_COUNT} questions. A price conversation built around you.`,
  promises: [
    'An architect who has read your answers before you speak',
    'A recommended model and deployment for your business',
    'Your price, shared in a 30-minute conversation',
  ],
  footnote: 'Your answers stay with Arinox and are used only to prepare for your conversation.',
  backLink: 'Back to pricing',
  stepLabel: (n, total) => `Step ${n} of ${total}`,
  next: 'Next',
  back: 'Back',
  capNote: (max) => `Choose up to ${max}. Unselect one first.`,
  questions: [
    {
      key: 'industry',
      type: 'single',
      question: 'Which industry are you in?',
      sub: 'Choose one.',
      options: ['BFSI', 'Energy', 'Mobility', 'Manufacturing', 'Fashion & Lifestyle', 'Retail & FMCG', 'Defence & Government', 'Pharma & Healthcare', 'Distribution & Supply Chain', 'BPO & Services', 'IT & SecOps', 'Other'],
    },
    {
      key: 'size',
      type: 'single',
      question: 'How many people work in your organisation?',
      sub: 'Choose one.',
      options: ['Under 50', '50\u2013250', '250\u20131,000', '1,000\u20135,000', '5,000+'],
    },
    {
      key: 'teams',
      type: 'multi',
      question: 'Which teams should benefit first?',
      sub: 'Choose all that apply.',
      options: ['Sales & Marketing', 'Operations', 'Finance', 'HR', 'Customer Service', 'Supply Chain', 'IT & Security', 'Leadership'],
    },
    {
      key: 'apps',
      type: 'multi',
      question: 'What do your teams run on today?',
      sub: 'Choose all that apply. These are what the agents plug into.',
      options: ['ERP', 'CRM', 'Microsoft 365', 'Google Workspace', 'In-house or custom software', 'Legacy or on-premise systems', 'Mostly spreadsheets & email'],
    },
    {
      key: 'data',
      type: 'single',
      question: 'Where does your data live?',
      sub: 'Choose one. This decides SaaS, PaaS or On-Prem (CommandCORE\u2122).',
      options: ['In the cloud, and that is fine', 'In our own cloud account', 'On our own servers', 'A mix of both', 'It can never leave our premises'],
    },
    {
      key: 'outcome',
      type: 'multi',
      question: 'What outcome matters most?',
      sub: 'Choose all that apply. This is what we price against.',
      options: ['Cut operating costs', 'Faster, better decisions', 'Automate manual workflows', 'Better customer experience', 'Compliance & security', 'New revenue streams', 'Get our data AI-ready'],
    },
    {
      key: 'stage',
      type: 'single',
      question: 'Where are you with AI today?',
      sub: 'Choose one. It tells us where to start.',
      options: ['Haven\u2019t started', 'Exploring or running pilots', 'Live in one team', 'Live across several teams'],
    },
    {
      key: 'blockers',
      type: 'multi',
      question: 'What is holding AI back today?',
      sub: 'Choose all that apply. These are the things we plan around.',
      options: [
        'Data privacy & security',
        'Our data isn\u2019t ready',
        'No in-house AI skills',
        'Unclear return on investment',
        'Legacy systems that don\u2019t connect',
        'Regulatory or compliance limits',
        'Leadership buy-in',
      ],
    },
    {
      key: 'budget',
      type: 'text',
      optional: true,
      question: 'What budget have you set aside for AI over the next 12 months?',
      sub: 'Pick a currency and type the amount, in your own words. It shapes the scope we recommend. It is not a quote. Skip it if you are not sure yet.',
      currencies: [
        { symbol: '$', label: 'Dollars' },
        { symbol: '\u20B9', label: 'Rupees' },
      ],
      placeholder: 'e.g. 100K, or 60 lakh, or still to be decided',
      maxLength: 120,
    },
    {
      key: 'timeline',
      type: 'single',
      question: 'When do you want to be live?',
      sub: 'Choose one.',
      options: ['ASAP', 'Within 3 months', '3\u20136 months', '6\u201312 months', 'Just exploring'],
    },
  ],
  contact: {
    heading: 'Who should we talk to?',
    sub: 'An architect reviews your answers first, so the conversation is about your business. They will get in touch within one business day to set up 30 minutes.',
    fields: [
      { name: 'name', label: 'Full name', type: 'text', autoComplete: 'name', required: true },
      { name: 'email', label: 'Work email', type: 'email', autoComplete: 'email', required: true },
      { name: 'company', label: 'Company', type: 'text', autoComplete: 'organization', required: true },
      { name: 'role', label: 'Your role', type: 'text', autoComplete: 'organization-title', required: true },
    ],
    notesLabel: 'Anything else we should know? (optional)',
    notesPlaceholder: 'Timelines, constraints, anything useful.',
    cta: 'Request my conversation',
    errors: {
      name: 'Your name \u2014 we reply person to person.',
      email: 'That email doesn\u2019t look complete.',
      company: 'Your company \u2014 it sizes your price.',
      role: 'Your role \u2014 it tells us who we\u2019re building with.',
    },
  },
  completion: {
    heading: 'Thank you. An architect will be in touch.',
    sub: 'We will reach out within one business day to set up your 30-minute conversation, where your price is shared.',
    bookingCta: 'Book your 30-minute session',
    backCta: 'Back to pricing',
    summaryLabel: 'Your answers',
  },
};

/* Answer labels for the completion-screen summary card. */
export const answerLabels = {
  industry: 'Industry',
  size: 'Organisation size',
  teams: 'Teams',
  apps: 'Applications',
  data: 'Data',
  outcome: 'Outcomes',
  stage: 'AI today',
  blockers: 'Blockers',
  budget: 'Budget',
  timeline: 'Timeline',
};
