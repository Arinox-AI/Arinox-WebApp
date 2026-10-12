/* ─── Industry suite · Marketing OS (brief page) ────────────
   Copy is the deck's own lines (slides 1, 3, 4, 5, 11), kept minimal:
   the promise, what changed, what slips through without a cockpit, and the
   cockpit itself. The loop detail, the agents (Commerce OS, Artist, Adapt
   Engine) and the numbers stay in the deck, sent by email after a request.
   ──────────────────────────────────────────────────────────── */

export const marketingSuite = {
  id: 'marketing-os',
  name: 'Marketing OS',
  overline: 'Industry suite · Marketing',
  tagline: 'The AI way to market.',
  lead: 'One AI-native control plane for your marketing, run by you and your agents. Signals in. Decisions out. In a loop.',
  gap: {
    label: 'What changed',
    titleLead: 'AI made output',
    titleAccent: 'infinite.',
    titleRest: 'So the things to watch multiplied too.',
    note: 'Every ad, post or email AI makes also throws off signals: views, clicks, sales. The more you generate, the more there is to watch.',
    slips: [
      { t: 'Tired ads keep running', d: 'People have seen them too many times and stop clicking.' },
      { t: 'Budget leaks', d: 'Money keeps flowing to what is not working.' },
      { t: 'Buyers slip away', d: 'Customers about to leave go unnoticed.' },
      { t: 'Winners scale too late', d: 'Ads that work do not get more budget in time.' },
    ],
  },
  cockpit: {
    label: 'The control plane',
    title: 'So we built the cockpit: every signal in, every decision out.',
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
    command: 'You stay in command. Every suggestion comes with its reason, nothing goes out without your say, and every action becomes the next signal.',
  },
  request: {
    label: 'The deck',
    title: 'Everything else is in the deck.',
    note: 'The loop, the agents behind it, the numbers and how a deployment runs. Tell us where to send it — your copy is emailed to you right away.',
    formLabel: 'Request the deck',
    success: 'Request received. Your copy of the deck is on its way to your inbox.',
    role: 'Industries deck request · Marketing OS',
    message: 'Requested the Marketing OS deck from the industry suite page.',
    ctaButton: 'Request the deck',
    autoReply: {
      subject: 'Your Marketing OS deck',
      body: 'Thank you for requesting the Marketing OS deck. Your copy is attached to this email — we will get in touch with you soon.',
      steps: [
        'The team follows up within a day',
        'If it helps, we walk you through it on a call',
      ],
      asset: { name: 'Marketing OS deck (PPT)' },
    },
  },
};
