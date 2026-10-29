/* ─── Industry suite · Manufacturing OS (brief page) ────────
   The control-plane story, written for manufacturing across industries —
   from steel and heavy engineering to garments, footwear, automotive,
   electronics, food & pharma process lines and furniture.

   Structure (per the positioning notes):
   • Sub-headings = manufacturing FUNCTIONS (planning, shop floor,
     materials, quality, maintenance, procurement, analytics) — the
     seven connected capabilities below.
   • No industry line-sheet cards: the industries are named in the FAQ
     and chat knowledge, not rendered as a tile grid on the page.
   • Positioned as an AI intelligence & orchestration layer across the
     systems manufacturers already run (ERP, MES, SCM, CRM, QMS, CMMS,
     IoT, spreadsheets, documents) — never as an ERP/MES replacement.
   • Deployment is cloud-first; no CommandCore claims on this page.

   Voice note: same messaging system as the other suite pages — signals,
   decisions, the loop, "you approve" — in the manufacturing suite's own
   words (the line, the machines, the orders).
   ──────────────────────────────────────────────────────────── */

export const industrialSuite = {
  id: 'industrial',
  name: 'Manufacturing OS',
  overline: 'Industry suite · Manufacturing',
  tagline: 'The AI way to run manufacturing operations.',
  lead: 'One AI-native control plane for manufacturing operations across industries — planning, production, machines, materials, quality and maintenance read together, run by you and your agents. Signals in. Decisions out. In a loop.',
  hero: {
    h1Lead: 'Manufacturing',
    h1Accent: 'OS.',
  },
  systems: {
    label: 'Seven connected capabilities',
    note: 'one AI brain across all seven',
    footer: 'From planning to dispatch. From machine to management.',
    items: [
      { n: '01', t: 'Production Planning & Intelligence', stage: 'Plan' },
      { n: '02', t: 'Shop-Floor & Production Operations', stage: 'Make' },
      { n: '03', t: 'Materials, Inventory & Resources', stage: 'Plan' },
      { n: '04', t: 'Quality, Traceability & Compliance', stage: 'Make' },
      { n: '05', t: 'Asset, Maintenance & Downtime', stage: 'Sustain' },
      { n: '06', t: 'Procurement, Supply Chain & Orders', stage: 'Sell' },
      { n: '07', t: 'Manufacturing Analytics & Decisions', stage: 'Support' },
    ],
  },
  gap: {
    label: 'What changed',
    titleLead: 'More machines. More orders.',
    titleAccent: 'More to watch.',
    titleRest: '',
    note: 'Every order, batch, cell and machine throws off signals: output, downtime, defects, dates. The more you run, the wider the watch list grows.',
    watch: {
      label: 'The watch list',
      rows: [
        { t: 'Orders', d: 'customer orders closing on their dates' },
        { t: 'Production', d: 'cells and lines against the shift plan' },
        { t: 'Machines', d: 'the bottleneck machine losing hours' },
        { t: 'Materials', d: 'stock and lead times moving against the plan' },
        { t: 'Quality', d: 'the same defect repeating across batches' },
        { t: 'Delivery', d: 'dispatches against customer slots' },
      ],
    },
    multipliedNote: 'Every line, batch and order adds its own materials, machines and dates to check.',
    slips: [
      { t: 'Downtime arrives as surprises', d: 'A stop on the bottleneck only surfaces when the delivery date is already at risk.' },
      { t: 'Defects repeat', d: 'The same fault keeps returning, and no one can see why.' },
      { t: 'Stock sits in the wrong place', d: 'One material runs short while another piles up — and the plan notices too late.' },
      { t: 'People chase updates', d: 'Every progress question means walking the shop floor or rebuilding a report.' },
    ],
  },
  cockpit: {
    label: 'The control plane',
    title: 'One AI brain above every system: signals in, decisions out.',
    signalsIn: [
      { t: 'Orders', d: 'customer slots and dispatch dates' },
      { t: 'Production', d: 'lines, cells, machines and shifts' },
      { t: 'Machines', d: 'uptime on the bottleneck' },
      { t: 'Materials', d: 'stock and lead times' },
      { t: 'Quality', d: 'checks and defect history' },
    ],
    agents: [
      { t: 'Monitor', d: 'always on, across production, supply and maintenance' },
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
    note: 'The seven capabilities, the industry use cases, the connectors and how a deployment runs. Tell us where to send it — a person from the team emails your copy shortly.',
    formLabel: 'Request the deck',
    success: 'Request received — we\u2019ll email your copy of the deck shortly. It comes from a person, not a mailing robot.',
    role: 'Industries deck request · Manufacturing OS',
    message: 'Requested the Manufacturing OS deck from the industry suite page.',
    ctaButton: 'Request the deck',
    autoReply: {
      // Server-owned email template id (server/src/utils/autoReplies.js);
      // the copy below is for the page only - keep the two in sync.
      id: 'industrial-os-deck',
      subject: 'Your Manufacturing OS deck',
      body: 'Thank you for requesting the Manufacturing OS deck. We\u2019ll email your copy shortly.',
      steps: [
        'The team will follow up soon',
        'If it helps, we map your first 2\u20133 systems to connect on a call',
      ],
      asset: { name: 'Manufacturing OS deck (PDF)' },
    },
  },
  tour: {
    label: 'The floor, stage by stage',
    titleLead: 'Follow an order',
    titleAccent: 'across the floor.',
    note: 'From order to dispatch, every stage runs on named systems; the OS reads their signals and drafts the next move.',
    stages: [
      {
        id: 'plan',
        name: 'Plan',
        blurb: 'Customer slots meet capacity and materials. The OS drafts the plan and rebalances it as reality moves.',
        systems: ['Planning', 'ERP', 'Orders'],
        console: {
          title: 'Manufacturing OS — planning desk',
          rows: [
            { k: 'Order 4312', v: 'Customer slot confirmed for week 43', tag: 'ok', tone: 'ok' },
            { k: 'Capacity', v: 'Cells rebalanced against the order book', tag: 'ok', tone: 'ok' },
            { k: 'Materials', v: 'Indent drafted against the plan', tag: 'new', tone: 'new' },
          ],
          approve: {
            label: 'Needs your approval',
            items: ['Revised cell loading — week 43'],
          },
          chips: ['Order book', 'Cell loading'],
        },
      },
      {
        id: 'procure',
        name: 'Procure',
        blurb: 'Suppliers and receipts, read together. A slipping date surfaces with the alternatives beside it.',
        systems: ['Procurement', 'Suppliers', 'GRN'],
        console: {
          title: 'Manufacturing OS — procurement desk',
          rows: [
            { k: 'PO 88', v: 'Supplier date slipping against the plan', tag: 'flag', tone: 'flag' },
            { k: 'Alternatives', v: 'Two suppliers compared on date and cost', tag: 'new', tone: 'new' },
            { k: 'Receipts', v: 'Three GRNs synced this shift', tag: 'ok', tone: 'ok' },
          ],
          approve: {
            label: 'Needs your approval',
            items: ['Split PO 88 across two suppliers'],
          },
          chips: ['POs', 'GRNs'],
        },
      },
      {
        id: 'make',
        name: 'Make',
        blurb: 'Cells, takt and changeovers in real time — flags carry the cause, not just the number.',
        systems: ['MES', 'Shop floor', 'TNA'],
        console: {
          title: 'Manufacturing OS — floor console',
          rows: [
            { k: 'Cell B', v: 'Takt below plan for the second hour', tag: 'flag', tone: 'flag' },
            { k: 'Changeover', v: 'Fourteen minutes under standard', tag: 'ok', tone: 'ok' },
            { k: 'WIP', v: 'Stage handoff logged at the buffer', tag: 'ok', tone: 'ok' },
          ],
          approve: {
            label: 'Needs your approval',
            items: ['Move one operator — cell B to C'],
          },
          chips: ['Cells', 'Takt', 'WIP'],
        },
      },
      {
        id: 'quality',
        name: 'Quality',
        blurb: 'Defects that repeat get found, named and fixed — the corrective action drafted, you approve.',
        systems: ['Quality', 'Inspection', 'CAPA'],
        console: {
          title: 'Manufacturing OS — quality desk',
          rows: [
            { k: 'Batch 12', v: 'The same defect repeating — third batch', tag: 'flag', tone: 'flag' },
            { k: 'Inspection', v: 'Checklist completed at the gate', tag: 'ok', tone: 'ok' },
            { k: 'CAPA', v: 'Corrective action drafted for the fixture', tag: 'new', tone: 'new' },
          ],
          approve: {
            label: 'Needs your approval',
            items: ['CAPA — fixture realignment'],
          },
          chips: ['Gates', 'CAPA'],
        },
      },
      {
        id: 'maintain',
        name: 'Maintain',
        blurb: 'Downtime stops being a surprise. The OS watches the machines that matter and proposes off-shift windows.',
        systems: ['Maintenance', 'Spares'],
        console: {
          title: 'Manufacturing OS — maintenance desk',
          rows: [
            { k: 'Machine 4', v: 'Running hot against its baseline', tag: 'flag', tone: 'flag' },
            { k: 'Service', v: 'Window proposed inside the off-shift', tag: 'new', tone: 'new' },
            { k: 'Spares', v: 'Kit reserved from stock', tag: 'ok', tone: 'ok' },
          ],
          approve: {
            label: 'Needs your approval',
            items: ['Approve service window — machine 4'],
          },
          chips: ['Baselines', 'Spares'],
        },
      },
      {
        id: 'deliver',
        name: 'Deliver',
        blurb: 'Dispatch, documents and customer slots close the loop — the order leaves with its history.',
        systems: ['Dispatch', 'Documents', 'CRM'],
        console: {
          title: 'Manufacturing OS — dispatch desk',
          rows: [
            { k: 'Dispatch 77', v: 'Packing list and documents ready', tag: 'ok', tone: 'ok' },
            { k: 'Freight', v: 'Route selected against cost and date', tag: 'new', tone: 'new' },
            { k: 'Customer', v: 'Slot update sent to the buyer', tag: 'ok', tone: 'ok' },
          ],
          chips: ['Dispatch', 'Documents'],
        },
      },
    ],
  },
  ask: {
    label: 'Ask the OS',
    titleLead: 'Ask it',
    titleAccent: 'anything on the floor.',
    questions: [
      { t: 'Orders', q: 'Which customer orders are at risk this week?' },
      { t: 'Machines', q: 'Which machines are drifting from their baseline?' },
      { t: 'Quality', q: 'Which defect is repeating across batches?' },
      { t: 'Materials', q: 'What is short against the plan right now?' },
    ],
  },
};
