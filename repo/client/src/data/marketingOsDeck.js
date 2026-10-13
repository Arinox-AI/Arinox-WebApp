/* ─── Marketing OS deck archive ─────────────────────────────
   Full narrative from the Marketing OS deck, moved off the public page
   (the page now carries only what is needed to decide to ask for the deck).
   Keep this in sync with the deck; it is the source for future pages,
   one-pagers or a full product page if that is ever wanted.

   Naming note: sub-product names (Commerce OS, Artist, Adapt Engine,
   Campaign Manager) are the deck's own; keep them verbatim.
   ──────────────────────────────────────────────────────────── */

export const theJob = {
  label: 'The job',
  title: 'Marketing has always been the same job.',
  steps: [
    { n: '01', t: 'Deploy', d: 'Launch the campaign.' },
    { n: '02', t: 'Read the signals', d: 'Check early how it is doing.' },
    { n: '03', t: 'Iterate', d: 'Improve what ran.' },
    { n: '04', t: 'Steer the purchase', d: 'Guide the buyer towards buying.' },
  ],
  kicker: 'Same job. The difference now is the volume.',
};

export const whatChanged = {
  label: 'What changed',
  title: 'AI made output infinite. So the things to watch multiplied too.',
  makes: {
    label: 'What AI can now make',
    items: ['Creative', 'Campaigns', 'Platforms'],
    note: 'Generate anything, endlessly.',
  },
  watches: {
    label: 'What you now have to watch',
    before: 'Before: one ad',
    now: 'Now: endless versions',
    note: 'Every ad, post or email AI makes also throws off signals: views, clicks, sales. The more you generate, the more there is to watch.',
  },
};

export const theGap = {
  label: 'The gap',
  title: 'Infinite output. No cockpit.',
  lead: 'Teams need one place to go from signals to decisions: a cockpit to monitor, analyse and decide on all of it. We call it a control plane.',
  signals: ['Clicks', 'Spend', 'Reviews', 'Footfall', 'Sales', 'Email opens', 'WhatsApp replies', 'Saves', 'Reach'],
  decisions: ['Pause an ad', 'Move budget'],
  decisionsNote: 'A few decisions, made late.',
  slips: [
    { t: 'Tired ads keep running', d: 'People have seen them too many times and stop clicking.' },
    { t: 'Budget leaks', d: 'Money keeps flowing to what is not working.' },
    { t: 'Buyers slip away', d: 'Customers about to leave go unnoticed.' },
    { t: 'Winners scale too late', d: 'Ads that work do not get more budget in time.' },
  ],
};

export const controlPlane = {
  label: 'The control plane',
  title: 'Every signal in. Every decision out.',
  signalsIn: [
    { t: 'Ads', d: 'every platform' },
    { t: 'Website', d: 'funnel and analytics' },
    { t: 'Stores', d: 'footfall and reviews' },
    { t: 'Buyers', d: 'CRM and support' },
  ],
  agents: [
    { t: 'Monitor', d: 'always on, across every signal' },
    { t: 'Analyse', d: 'in the moment, as signals land' },
    { t: 'Decide', d: 'within the rules you set' },
  ],
  approve: 'You approve',
  decisionsOut: [
    { t: 'Pause', d: 'what is dying' },
    { t: 'Scale', d: 'what is winning' },
    { t: 'Create', d: 'the next creative' },
    { t: 'Send', d: 'to the right person' },
  ],
};

export const capture = {
  label: 'Capture',
  title: 'Every signal. Every platform. One field.',
  lead: 'Everything your marketing touches lands in one place, so the agents can read it together.',
  families: [
    { t: 'Ads', items: ['Meta', 'Google', 'Amazon', 'Shopify', 'Retail media', 'Marketplaces'] },
    { t: 'Sites', items: ['Your website', 'Web analytics', 'Search Console', 'Landing pages'] },
    { t: 'Messaging', items: ['WhatsApp', 'SMS', 'Email'] },
    { t: 'Customers', items: ['CRM', 'Contact centre', 'Support', 'Reviews', 'Google Business'] },
    { t: 'Physical', items: ['Store cameras', 'POS', 'Footfall'] },
  ],
  capturedBy: ['Commerce OS', 'Matomo', 'Hyperlocal', 'CRM & support'],
};

export const learnCreate = {
  label: 'Learn · Create',
  title: 'The signal becomes the brief.',
  lead: 'Performance, behaviour and customer signals become one read, in the moment, not in a Monday report.',
  learn: {
    label: 'Learn',
    note: 'Agents read signals, not next week.',
    items: [
      { t: 'What is fatiguing', d: 'Ads people have seen too many times' },
      { t: 'What is scaling', d: 'Ads that are winning' },
      { t: 'Where the budget leaks', d: 'Spend going to what is not working' },
      { t: 'Who is about to churn', d: 'Buyers likely to leave' },
    ],
  },
  create: {
    label: 'Create',
    note: 'Three products take it from there.',
    items: [
      { t: 'Commerce OS', d: 'Flags the winning ad: this creative is scaling, make more like it.' },
      { t: 'Artist', d: 'Makes the next creative, generated from the signal, on brand.' },
      { t: 'Adapt Engine', d: 'Sizes it for every platform: one master visual, every size and format.' },
    ],
  },
};

export const deploySection = {
  label: 'Deploy',
  title: 'The decision goes back out.',
  lead: 'What the agents found becomes action.',
  actions: [
    { t: 'Pause', d: 'What is dying' },
    { t: 'Scale', d: 'What is winning' },
    { t: 'Reallocate', d: 'Move the budget' },
    { t: 'Send', d: 'The email, to the right person' },
  ],
  close: {
    label: 'And the loop closes',
    text: 'Every action becomes a new signal, captured all over again.',
    back: 'Back to Capture',
  },
  approval: 'You approve each decision, or pre-approve small moves within the rules you set.',
};

export const controlMemory = {
  label: 'Control and memory',
  title: 'You stay in command. And every decision makes it sharper.',
  control: {
    label: 'You stay in control',
    steps: [
      { n: '1', t: 'Agents watch and draft', d: 'Every suggestion comes with its reason.' },
      { n: '2', t: 'You approve, edit or decline', d: 'Nothing goes out without your say.' },
      { n: '3', t: 'The action runs', d: 'Pause, scale, move budget, send.' },
    ],
  },
  rules: {
    label: 'Within your rules',
    text: 'Set small moves agents may make on their own, like shifting budget under a cap you choose.',
  },
  memory: {
    label: 'And it remembers',
    steps: [
      { t: 'Every decision is logged', d: 'With the reason behind it.' },
      { t: 'The system learns what worked', d: 'Which ads tire fast, which angles win.' },
      { t: 'The next suggestion is sharper', d: 'The loop compounds.' },
    ],
  },
};

export const twoTeams = {
  label: 'One loop, two teams',
  title: 'One loop. Two teams. Yours.',
  lead: 'The same loop, tuned to how your business sells. One customer can run both.',
  loops: [
    {
      t: 'B2B loop',
      who: 'Teams selling to businesses',
      watches: 'Accounts, intent and pipeline',
      decides: 'Who to pursue, and when',
      powered: 'CRM · Marketing skills · Campaign Manager',
    },
    {
      t: 'B2C loop',
      who: 'Brands selling to consumers',
      watches: 'Creative, audiences and storefronts',
      decides: 'What to run next, and where',
      powered: 'Commerce OS · Artist · Adapt Engine',
    },
  ],
  base: ['Configured in days', 'Private: your cloud, your rules', 'Agents draft, you decide'],
};

export const nextSteps = {
  label: 'Next step',
  title: 'Infinite output. Finite decisions, decided early.',
  steps: [
    { n: '1', t: 'Marketing signal audit', d: 'Map your ad platforms, site, stores, leads and support channels.' },
    { n: '2', t: 'Pick your loop', d: 'Choose B2B or B2C, and the first products to switch on.' },
    { n: '3', t: 'Go live in days', d: 'Your first loop running, with your first decision waiting for approval.' },
  ],
};
