/* ─── Industry suite · Apparel OS (brief page) ──────────────
   Copy follows the deck's own lines (Apparel OS deck v5), kept minimal the
   same way the Marketing OS page is: the promise, what changed, what slips
   through without a control plane, and the control plane itself. The ten
   systems, the AI brain detail, the connectors and the deployment
   story stay in the deck, sent by the team after a request.

   Voice note: same messaging system as the Marketing OS page — signals,
   decisions, the loop, "you approve" — in the apparel deck's own words
   (the AI brain, the floor, the orders).
   ──────────────────────────────────────────────────────────── */

export const apparelSuite = {
  id: 'apparel',
  name: 'Apparel OS',
  overline: 'Industry suite · Apparel',
  tagline: 'The AI way to run apparel.',
  lead: 'One AI-native control plane for your apparel business, from design to delivery — run by you and your agents. Signals in. Decisions out. In a loop.',
  systems: {
    label: 'Ten connected solutions',
    note: 'one AI brain across all ten',
    items: [
      { n: '01', t: 'Product Development (PLM)', stage: 'Design' },
      { n: '02', t: 'Supply & Demand Planning', stage: 'Plan' },
      { n: '03', t: 'Apparel ERP', stage: 'Plan' },
      { n: '04', t: 'Order & Production Tracking', stage: 'Make' },
      { n: '05', t: 'Factory Floor (MES)', stage: 'Make' },
      { n: '06', t: 'Quality Assurance', stage: 'Make' },
      { n: '07', t: 'Omnichannel & Wholesale', stage: 'Sell' },
      { n: '08', t: 'B2B Wholesale Platform', stage: 'Sell' },
      { n: '09', t: 'Sustainability', stage: 'Sustain' },
      { n: '10', t: 'CRM, HRMS & Marketing Software', stage: 'Support' },
    ],
  },
  gap: {
    label: 'What changed',
    titleLead: 'Seasons got',
    titleAccent: 'faster.',
    titleRest: 'So the watch list got longer.',
    note: 'Every style, order, line and shipment throws off signals: output, delays, defects, dates. The more you run, the more there is to watch.',
    watch: {
      label: 'The watch list',
      rows: [
        { t: 'Line 3', d: 'Output sliding for the second shift' },
        { t: 'Fabric', d: 'One lot short against the plan' },
        { t: 'Quality', d: 'The same defect, third batch running' },
        { t: 'Delivery', d: 'An order nearing its ship window' },
        { t: 'Stock', d: 'One style short, one style heavy' },
      ],
    },
    multipliedNote: 'Every order has its own materials, lines and dates to check.',
    slips: [
      { t: 'Delays arrive as surprises', d: 'A slip on the floor only surfaces when the delivery date is already at risk.' },
      { t: 'Defects repeat', d: 'The same fault keeps returning, and no one can see why.' },
      { t: 'Stock sits in the wrong place', d: 'One style runs short while another piles up — and the plan notices too late.' },
      { t: 'People chase updates', d: 'Every progress question means walking the floor or rebuilding a report.' },
    ],
  },
  cockpit: {
    label: 'The control plane',
    title: 'One AI brain above every system: signals in, decisions out.',
    signalsIn: [
      { t: 'Orders', d: 'retail, online and wholesale' },
      { t: 'Floor', d: 'lines, machines and shifts' },
      { t: 'Materials', d: 'stock and lead times' },
      { t: 'Quality', d: 'checks and defect history' },
    ],
    agents: [
      { t: 'Monitor', d: 'always on, across floor, supply and orders' },
      { t: 'Analyse', d: 'in the moment, as work moves' },
      { t: 'Decide', d: 'within the rules you set' },
    ],
    approve: 'You approve',
    decisionsOut: [
      { t: 'Re-plan', d: 'what to make next' },
      { t: 'Re-route', d: 'where orders ship from' },
      { t: 'Expedite', d: 'what is running late' },
      { t: 'Correct', d: 'the process at fault' },
    ],
    command:
      'You stay in command. Every suggestion comes with its reason, nothing moves without your say, and every action becomes the next signal.',
  },
  request: {
    label: 'The deck',
    title: 'Everything else is in the deck.',
    note: 'The ten systems, the AI brain behind them, the connectors and how a deployment runs. Tell us where to send it — a person from the team emails your copy shortly.',
    formLabel: 'Request the deck',
    success: 'Request received — we\u2019ll email your copy of the deck shortly. It comes from a person, not a mailing robot.',
    role: 'Industries deck request · Apparel OS',
    message: 'Requested the Apparel OS deck from the industry suite page.',
    ctaButton: 'Request the deck',
    autoReply: {
      subject: 'Your Apparel OS deck',
      body: 'Thank you for requesting the Apparel OS deck. We\u2019ll email your copy shortly.',
      steps: [
        'The team will follow up soon',
        'If it helps, we map your first 2\u20133 systems to connect on a call',
      ],
      asset: { name: 'Apparel OS deck (PDF)' },
    },
  },
};
