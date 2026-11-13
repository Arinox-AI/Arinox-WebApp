/* Pricing page + intake wizard — single-source copy.
 *
 * Copy is final per the design brief. Prices stay hidden by design: the page
 * never shows a price figure; the number is shared in a conversation.
 * (The "where it runs" copy lives in data/site.js `deployOptions`, shared
 * with Home.)
 */

/* How many questions the intake asks. Copy below quotes it;
   a test asserts wizard.questions.length === QUESTION_COUNT. */
export const QUESTION_COUNT = 10;

export const pricingHero = {
  eyebrow: 'Pricing',
  titleA: 'We don\u2019t sell seats.',
  titleB: 'We price',
  titleAccent: 'outcomes.',
  lead:
    'Every Arinox deployment is sized to your business, your teams, your data and the result you want. Below is exactly how we work. Your number comes from a few questions and a conversation with an architect.',
  ctaPrimary: 'Get your AI roadmap',
  ctaSecondary: 'Or book a call',
  microcopy: 'About 4 minutes \u00B7 No obligation \u00B7 Your price is shared in a conversation',
};

export const plans = {
  eyebrow: 'Plans',
  title: 'Three ways to work with us.',
  note: 'Every plan runs wherever you need it, see below. No price on this page: yours is shared in a conversation.',
  stagesLabel: 'What you get, stage by stage',
  items: [
    {
      name: 'Platform',
      forWhom: 'Go live on KOGO, our flagship Agentic OS, then climb one step at a time as results come in.',
      stages: [
        { t: 'KOGO platform', d: 'Ready-made agents, live from day one' },
        { t: 'Modules', d: 'Add the capabilities your teams need' },
        { t: 'People', d: 'Bring more of your teams onto it' },
        { t: 'Applications', d: 'Connect the tools you already run' },
        { t: 'Custom build', d: 'Agents and apps made for your work' },
      ],
      priced: 'Grows a level at a time \u00B7 nothing rebuilt',
      cta: 'Get your AI roadmap',
      to: '/get-started',
    },
    {
      name: 'Enterprise',
      forWhom: 'For organisations rolling Arinox out across teams.',
      stages: [
        { t: 'Scope and agree', d: 'Users, modules, applications and where it runs' },
        { t: 'Roll out', d: 'Modules and agents enabled, applications connected' },
        { t: 'Run with support', d: 'Support and Forward Deployed Engineer coverage' },
      ],
      priced: 'One annual number \u00B7 fixed once scope is agreed',
      cta: 'Get your AI roadmap',
      to: '/get-started',
    },
    {
      name: 'Custom build',
      forWhom: 'For organisations whose work doesn\u2019t fit a template.',
      stages: [
        { t: 'Discover', d: 'Discovery, architecture and an AI roadmap' },
        { t: 'Build', d: 'Custom agents and applications' },
        { t: 'Embed', d: 'Forward Deployed Engineers inside your team' },
        { t: 'Ship', d: 'A 90-day transformation sprint to production' },
        { t: 'Sovereign (optional)', d: 'Deployment on CommandCore\u2122' },
      ],
      priced: 'Custom pricing \u00B7 90-day sprint to production',
      cta: 'Book a call',
      to: '/contact',
    },
  ],
};

export const deployIntro = {
  eyebrow: 'Where it runs',
  title: 'Where it runs is your call.',
  note: 'Whichever you choose, the platform and agents are the same.',
};

export const factors = {
  label: 'What we ask about',
  items: [
    { title: 'Your business', body: 'Industry, scale and the rules you operate under.' },
    { title: 'Your teams', body: 'Who will use it, how many of them, and where.' },
    { title: 'Your requirements', body: 'The workflows to automate and the agents to build.' },
    { title: 'Present applications', body: 'The ERP, CRM and tools we plug into on day one.' },
    { title: 'Your data', body: 'Where it lives, how much there is, and how sensitive it is.' },
    { title: 'Your outcome', body: 'The result you\u2019ll measure us on. This is what we price.' },
  ],
};

export const inEvery = {
  eyebrow: 'In every engagement',
  title: 'Whichever plan you choose, you get this.',
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
      body: 'Run it in our private cloud, in your own cloud, or fully air-gapped on your premises.',
    },
  ],
};

export const discoverySteps = {
  eyebrow: 'How pricing works',
  title: `From ${QUESTION_COUNT} questions to a price conversation.`,
  steps: [
    {
      title: 'Tell us about your business',
      body: `${QUESTION_COUNT} quick questions about your teams, systems, data and goals, on /get-started. Takes about 4 minutes.`,
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
      a: 'Yes. The Platform plan starts on KOGO with ready-made agents. You add modules, people and applications as results come in, and nothing is rebuilt along the way.',
    },
    {
      q: 'Can it run fully on our own premises?',
      a: 'Yes. CommandCore\u2122, our Agentic AI-in-a-Box, runs the full stack air-gapped on your own hardware. Your data never leaves the building.',
    },
    {
      q: 'What happens after I submit?',
      a: 'An Arinox architect reviews your answers and gets in touch soon to set up a 30-minute conversation. Your price is shared in that conversation, built around what you told us.',
    },
    {
      q: 'Which plan is right for us?',
      a: 'Tell us about your business. The architect on your first call recommends the plan that fits, based on your answers.',
    },
    {
      q: 'What does the first call cover?',
      a: 'Thirty minutes with an architect who has already read your answers. It\u2019s not a sales pitch, and your price is shared there.',
    },
    {
      q: 'Do we have to commit before we see value?',
      a: 'No. The first working session is free, and you keep the map of where AI fits either way.',
    },
  ],
};

export const closingBand = {
  titleA: 'Your price depends on your business.',
  titleAccent: 'So let\u2019s start there.',
  offer: 'A few questions and a conversation, and the number you get is built around you.',
  cta: 'Get your AI roadmap',
  talk: 'Or book a call',
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
      /* A typed answer next to the tiles: names (SAP, Tally, Zoho…) matter here. */
      other: { label: 'Anything else, or the names of your systems?', placeholder: 'e.g. SAP, Tally, Salesforce, Zoho', maxLength: 200 },
    },
    {
      key: 'data',
      type: 'single',
      question: 'Where is your company\u2019s data kept today?',
      sub: 'Pick the closest one. Not sure? That\u2019s fine, we\u2019ll work it out together.',
      options: [
        'Online, in tools like Google Workspace, Microsoft 365 or Salesforce',
        'With a cloud provider we pay for, like AWS, Azure or Google Cloud',
        'On computers and servers in our own office',
        'A bit of both',
        'It must never leave our building',
        'I\u2019m not sure',
      ],
    },
    {
      key: 'outcome',
      type: 'multi',
      question: 'What outcome matters most?',
      sub: 'Choose all that apply. This is what we scope against.',
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
      question: 'What have you set aside for AI over the next 12 months?',
      sub: 'Helps us scope; never shared. Pick a currency and type an amount in your own words, or skip it.',
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
    sub: 'An architect reviews your answers first, so the conversation is about your business. They will get in touch soon to set up 30 minutes.',
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
      company: 'Your company \u2014 it shapes the scope.',
      role: 'Your role \u2014 it tells us who we\u2019re building with.',
    },
  },
  completion: {
    heading: 'Thank you. An architect will be in touch.',
    sub: 'We will reach out soon to set up your 30-minute conversation, where your price is shared.',
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
