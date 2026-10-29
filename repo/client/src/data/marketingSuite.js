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
    multipliedNote: 'Every version has its own views, clicks and sales to check.',
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
    note: 'The loop, the agents behind it, the numbers and how a deployment runs. Tell us where to send it — a person from the team emails your copy shortly.',
    formLabel: 'Request the deck',
    success: 'Request received — we\u2019ll email your copy of the deck shortly. It comes from a person, not a mailing robot.',
    role: 'Industries deck request · Marketing OS',
    message: 'Requested the Marketing OS deck from the industry suite page.',
    ctaButton: 'Request the deck',
    autoReply: {
      // Server-owned email template id (server/src/utils/autoReplies.js);
      // the copy below is for the page only - keep the two in sync.
      id: 'marketing-os-deck',
      subject: 'Your Marketing OS deck',
      body: 'Thank you for requesting the Marketing OS deck. We\u2019ll email your copy shortly.',
      steps: [
        'The team will follow up soon',
        'If it helps, we walk you through it on a call',
      ],
      asset: { name: 'Marketing OS deck (PPT)' },
    },
  },
  tour: {
    label: 'A day in the cockpit',
    titleLead: 'Watch it',
    titleAccent: 'work a full day.',
    note: 'Signals land, drafts appear, you approve, actions run — and every action becomes the next signal.',
    stages: [
      {
        id: 'signals',
        name: 'Signals',
        blurb: 'Every platform, store and CRM account reports in as it happens. Nothing waits for tomorrow’s report.',
        systems: ['Ads', 'Website', 'Stores', 'CRM'],
        console: {
          title: 'Marketing OS — signals',
          rows: [
            { k: 'Meta', v: 'Clicks falling while repeat views rise', tag: 'flag', tone: 'flag' },
            { k: 'Google', v: 'Creative scaling, three days strong', tag: 'ok', tone: 'ok' },
            { k: 'Stores', v: 'Footfall up, evening peak', tag: 'ok', tone: 'ok' },
            { k: 'CRM', v: 'Two accounts showing churn signals', tag: 'flag', tone: 'flag' },
          ],
          chips: ['Meta', 'Google', 'Stores', 'CRM'],
        },
      },
      {
        id: 'drafts',
        name: 'Drafts',
        blurb: 'The agents draft the next move for every flag — with the reason and the trade-off attached.',
        systems: ['Monitor', 'Analyse', 'Decide'],
        console: {
          title: 'Marketing OS — drafts',
          rows: [
            { k: 'Draft 1', v: 'Pause the tired ad — frequency past the cliff', tag: 'new', tone: 'new' },
            { k: 'Draft 2', v: 'Replacement cut from the winning hook', tag: 'new', tone: 'new' },
            { k: 'Draft 3', v: 'Budget shifts to the scaling set', tag: 'new', tone: 'new' },
          ],
          approve: {
            label: 'Needs your approval',
            items: ['Pause — Meta ad set 12', 'Scale — Google creative B'],
          },
          chips: ['Reasons attached', 'Rules from you'],
        },
      },
      {
        id: 'approvals',
        name: 'Approvals',
        blurb: 'You approve with one look: the reason, the numbers, the risk. Edit or decline — the loop learns.',
        systems: ['Your rules', 'Audit trail'],
        console: {
          title: 'Marketing OS — approvals',
          rows: [
            { k: 'Decision', v: 'Pause approved — reason logged', tag: 'ok', tone: 'ok' },
            { k: 'Edit', v: 'Budget cap changed before the scale', tag: 'new', tone: 'new' },
            { k: 'Declined', v: 'Draft kept for review next week', tag: 'flag', tone: 'flag' },
          ],
          chips: ['Audit trail', 'Every action logged'],
        },
      },
      {
        id: 'actions',
        name: 'Actions',
        blurb: 'Approved actions execute — campaigns, budgets, sends. Nothing moves without the say-so.',
        systems: ['Campaigns', 'Budgets', 'Messaging'],
        console: {
          title: 'Marketing OS — actions',
          rows: [
            { k: 'Campaigns', v: 'Tired set paused across platforms', tag: 'ok', tone: 'ok' },
            { k: 'Budget', v: 'Moved to the performing set', tag: 'ok', tone: 'ok' },
            { k: 'Messaging', v: 'Win-back email sent to two accounts', tag: 'new', tone: 'new' },
          ],
          chips: ['Executed', 'Logged'],
        },
      },
      {
        id: 'loop',
        name: 'The loop',
        blurb: 'Every action lands as the next signal. The cockpit never starts from zero.',
        systems: ['Monitor', 'Analyse', 'Decide'],
        console: {
          title: 'Marketing OS — the loop',
          rows: [
            { k: 'Signal', v: 'Replacement creative outperforming the original', tag: 'ok', tone: 'ok' },
            { k: 'Signal', v: 'Churn account re-engaged, reply received', tag: 'ok', tone: 'ok' },
            { k: 'Signal', v: 'Footfall peak drifting one hour later', tag: 'flag', tone: 'flag' },
          ],
          chips: ['Back to signals'],
        },
      },
    ],
  },
  ask: {
    label: 'Ask the OS',
    titleLead: 'Ask it',
    titleAccent: 'about today.',
    questions: [
      { t: 'Performance', q: 'Which campaigns are wasting budget right now?' },
      { t: 'Audience', q: 'Which accounts look ready to churn this month?' },
      { t: 'Stores', q: 'How did footfall move against last weekend?' },
      { t: 'Creative', q: 'Which hook is winning across platforms?' },
    ],
  },
  faq: [
    {
      q: 'What is Marketing OS?',
      a: 'An AI-native control plane for marketing: ads, website, stores and CRM read together as one picture. Agents monitor every signal, draft the next move, and you approve what runs.',
    },
    {
      q: 'Which platforms does it read?',
      a: 'The ones you already run — ad platforms, your website funnel, store systems and CRM. The OS reads their signals as they land; nothing is invented.',
    },
    {
      q: 'Can it send things on its own?',
      a: 'No. Agents draft; you approve. Emails, budget moves and campaign changes go out only with your say — and every action is logged.',
    },
    {
      q: 'Where does it run?',
      a: 'In the cloud, alongside the platforms and systems you already use. Deployment details for your environment are confirmed in the working session.',
    },
  ],
};
