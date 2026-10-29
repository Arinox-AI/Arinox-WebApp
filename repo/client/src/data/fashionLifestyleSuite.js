/* ─── Industry suite · Fashion & Lifestyle OS (brief page) ──
   The Apparel OS positioning, broadened: the same control-plane story,
   written for product businesses across apparel, footwear, accessories,
   home goods, lifestyle products and uniforms & workwear. Kept minimal
   the same way the Marketing OS page is: the promise, the sector line
   sheet, what changed, what slips through without a control plane, and
   the control plane itself. The ten systems, the AI brain detail, the
   connectors and the deployment story stay in the deck, sent by the
   team after a request.

   Voice note: same messaging system as the Marketing OS page — signals,
   decisions, the loop, "you approve" — in the suite's own words (the AI
   brain, the line, the orders).
   ──────────────────────────────────────────────────────────── */

export const fashionLifestyleSuite = {
  id: 'fashion-lifestyle',
  name: 'Fashion & Lifestyle OS',
  overline: 'Industry suite · Fashion & Lifestyle',
  tagline: 'The AI way to run product businesses.',
  lead: 'One AI-native control plane for your fashion and lifestyle business, from product concept to delivery — run by you and your agents. Signals in. Decisions out. In a loop.',
  hero: {
    h1Lead: 'Fashion & Lifestyle',
    h1Accent: 'OS.',
  },
  explorer: {
    label: 'Built for your business',
    titleLead: 'One suite.',
    titleAccent: 'Shaped to your business.',
    watchLabel: 'What the control plane watches',
    sectors: [
      {
        id: 'all',
        name: 'All sectors',
        intro: 'One control plane across product development, sourcing, production, inventory and sales — so any fashion or lifestyle business reads as a single picture.',
        watch: [
          { t: 'Orders', d: 'retail, wholesale and online moving at once' },
          { t: 'Production', d: 'lines, cells and shifts against the plan' },
          { t: 'Materials', d: 'stock and lead times as they move' },
          { t: 'Delivery', d: 'every order against its ship window' },
        ],
      },
      {
        id: 'apparel',
        name: 'Apparel',
        intro: 'Run styles, orders, lines and materials as one picture — so delays surface before they cost the shift.',
        watch: [
          { t: 'Line 3', d: 'output sliding for the second shift' },
          { t: 'Fabric', d: 'one lot short against the plan' },
          { t: 'Quality', d: 'the same defect, third batch running' },
          { t: 'Delivery', d: 'an order nearing its ship window' },
        ],
      },
      {
        id: 'footwear',
        name: 'Footwear',
        intro: 'Track components, size-and-colour variants and production together — so a missing part never becomes a late order.',
        watch: [
          { t: 'Components', d: 'an outsole delivery slipping against the plan' },
          { t: 'Sizes', d: 'one size short while another sits heavy' },
          { t: 'Line', d: 'a stitching cell falling behind its target' },
          { t: 'Order', d: 'a colourway closing on its ship window' },
        ],
      },
      {
        id: 'accessories',
        name: 'Accessories',
        intro: 'Coordinate materials, small batches and wholesale orders in one picture — so small runs stay profitable.',
        watch: [
          { t: 'Materials', d: 'hardware short against the batch plan' },
          { t: 'Batch', d: 'a small run running over its window' },
          { t: 'Wholesale', d: 'a retailer order waiting on stock' },
          { t: 'Quality', d: 'the same finish fault repeating' },
        ],
      },
      {
        id: 'home-goods',
        name: 'Home goods',
        intro: 'Connect collections, suppliers, production and stock — so the range keeps selling without the warehouse filling up.',
        watch: [
          { t: 'Collection', d: 'a new line loading later than planned' },
          { t: 'Materials', d: 'a supplier lot short against production' },
          { t: 'Stock', d: 'fast sellers thin, slow sellers heavy' },
          { t: 'Fulfilment', d: 'orders queuing at the warehouse' },
        ],
      },
      {
        id: 'lifestyle',
        name: 'Lifestyle products',
        intro: 'Bring product development, inventory and channels together — so every new SKU lands where it can sell.',
        watch: [
          { t: 'Launch', d: 'a new SKU missing its channel window' },
          { t: 'Inventory', d: 'stock split wrong across channels' },
          { t: 'Suppliers', d: 'a lead time quietly stretching' },
          { t: 'Orders', d: 'a bestseller running toward stockout' },
        ],
      },
      {
        id: 'workwear',
        name: 'Uniforms & workwear',
        intro: 'Manage specifications, size curves and repeat B2B orders — so contract deliveries stay on schedule.',
        watch: [
          { t: 'Specs', d: 'a custom specification drifting from the contract' },
          { t: 'Sizes', d: 'a size curve unbalanced against the order' },
          { t: 'Contract', d: 'a repeat order nearing its delivery date' },
          { t: 'Production', d: 'a batch held at quality check' },
        ],
      },
    ],
  },
  systems: {
    label: 'Ten connected solutions',
    note: 'one AI brain across all ten',
    footer: 'From product concept to delivery. From operations to customer.',
    items: [
      { n: '01', t: 'Product Development (PLM)', stage: 'Design' },
      { n: '02', t: 'Supply & Demand Planning', stage: 'Plan' },
      { n: '03', t: 'Operations ERP', stage: 'Plan' },
      { n: '04', t: 'Order & Production Tracking', stage: 'Make' },
      { n: '05', t: 'Production Floor (MES)', stage: 'Make' },
      { n: '06', t: 'Quality Assurance', stage: 'Make' },
      { n: '07', t: 'Omnichannel & Wholesale', stage: 'Sell' },
      { n: '08', t: 'B2B Wholesale Platform', stage: 'Sell' },
      { n: '09', t: 'CRM, HRMS & Marketing Software', stage: 'Support' },
      // Accounts & Finance is not a product stage (design/plan/make/sell) —
      // it reads the money across the whole flow, so it carries 'Control'
      // alongside the OS's control-plane story.
      { n: '10', t: 'Accounts & Finance', stage: 'Control' },
    ],
  },
  gap: {
    label: 'What changed',
    titleLead: 'More products. More channels.',
    titleAccent: 'More to watch.',
    titleRest: '',
    note: 'Every style, SKU, order and shipment throws off signals: output, delays, defects, dates. The more you run, the wider the watch list grows.',
    watch: {
      label: 'The watch list',
      rows: [
        { t: 'Orders', d: 'retail, wholesale and online moving at once' },
        { t: 'Production', d: 'lines and cells against the shift plan' },
        { t: 'Materials', d: 'components and stock against lead times' },
        { t: 'Quality', d: 'the same defect repeating across batches' },
        { t: 'Delivery', d: 'orders closing on their ship windows' },
      ],
    },
    multipliedNote: 'Every product, channel and season adds its own materials, lines and dates to check.',
    slips: [
      { t: 'Delays arrive as surprises', d: 'A slip on the line only surfaces when the delivery date is already at risk.' },
      { t: 'Defects repeat', d: 'The same fault keeps returning, and no one can see why.' },
      { t: 'Stock sits in the wrong place', d: 'One SKU runs short while another piles up — and the plan notices too late.' },
      { t: 'People chase updates', d: 'Every progress question means walking the floor or rebuilding a report.' },
    ],
  },
  cockpit: {
    label: 'The control plane',
    title: 'One AI brain above every system: signals in, decisions out.',
    signalsIn: [
      { t: 'Orders', d: 'retail, online and wholesale' },
      { t: 'Production', d: 'lines, cells, machines and shifts' },
      { t: 'Materials', d: 'stock and lead times' },
      { t: 'Quality', d: 'checks and defect history' },
    ],
    agents: [
      { t: 'Monitor', d: 'always on, across production, supply and orders' },
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
    role: 'Industries deck request · Fashion & Lifestyle OS',
    message: 'Requested the Fashion & Lifestyle OS deck from the industry suite page.',
    ctaButton: 'Request the deck',
    autoReply: {
      // Server-owned email template id (server/src/utils/autoReplies.js);
      // the copy below is for the page only - keep the two in sync.
      id: 'fashion-lifestyle-os-deck',
      subject: 'Your Fashion & Lifestyle OS deck',
      body: 'Thank you for requesting the Fashion & Lifestyle OS deck. We\u2019ll email your copy shortly.',
      steps: [
        'The team will follow up soon',
        'If it helps, we map your first 2\u20133 systems to connect on a call',
      ],
      asset: { name: 'Fashion & Lifestyle OS deck (PDF)' },
    },
  },
  tour: {
    label: 'The line, stage by stage',
    titleLead: 'Follow a product',
    titleAccent: 'across the line.',
    note: 'One thread from concept to customer. Each stage runs on named systems; the OS reads their signals and drafts the next move.',
    stages: [
      {
        id: 'design',
        name: 'Design',
        blurb: 'Styles, samples and costs take shape. The OS reads the design record and flags cost or material risk before development moves.',
        systems: ['PLM', 'Materials', 'Costing'],
        console: {
          title: 'Fashion & Lifestyle OS — design desk',
          rows: [
            { k: 'Style 4471', v: 'Cost drifting above target', tag: 'flag', tone: 'flag' },
            { k: 'Sample 2', v: 'Approved by the buyer', tag: 'ok', tone: 'ok' },
            { k: 'Materials', v: 'Two suppliers compared on price and lead time', tag: 'new', tone: 'new' },
          ],
          approve: {
            label: 'Needs your approval',
            items: ['Cost model for style 4471', 'Supplier shortlist for the trim'],
          },
          chips: ['PLM', 'Tech pack', 'Cost sheet'],
        },
      },
      {
        id: 'plan',
        name: 'Plan',
        blurb: 'Demand, capacity and materials meet. The OS rebalances the plan as the signals move.',
        systems: ['Planning', 'ERP', 'Procurement'],
        console: {
          title: 'Fashion & Lifestyle OS — planning desk',
          rows: [
            { k: 'Demand', v: 'Festive SKUs trending above plan', tag: 'flag', tone: 'flag' },
            { k: 'Capacity', v: 'Line loading rebalanced across weeks', tag: 'ok', tone: 'ok' },
            { k: 'Buy plan', v: 'Fabric indent drafted against the plan', tag: 'new', tone: 'new' },
          ],
          approve: {
            label: 'Needs your approval',
            items: ['Revised buy plan — week 42'],
          },
          chips: ['Demand plan', 'Line loading', 'Indents'],
        },
      },
      {
        id: 'make',
        name: 'Make',
        blurb: 'The floor, in real time. Output, quality and attendance read together — flags arrive with reasons.',
        systems: ['MES', 'Shop floor', 'Quality'],
        console: {
          title: 'Fashion & Lifestyle OS — floor console',
          rows: [
            { k: 'Line 3', v: 'Output sliding for the second shift', tag: 'flag', tone: 'flag' },
            { k: 'Quality', v: 'The same defect, third batch running', tag: 'flag', tone: 'flag' },
            { k: 'Attendance', v: 'Shift A checked in and synced', tag: 'ok', tone: 'ok' },
          ],
          approve: {
            label: 'Needs your approval',
            items: ['Rebalance operators — line 3'],
          },
          chips: ['Shop floor', 'Quality', 'TNA'],
        },
      },
      {
        id: 'sell',
        name: 'Sell',
        blurb: 'Orders from every channel in one queue. Allocation and wholesale decisions keep the promise dates honest.',
        systems: ['Omnichannel', 'Wholesale', 'Inventory'],
        console: {
          title: 'Fashion & Lifestyle OS — order desk',
          rows: [
            { k: 'Wholesale', v: 'Retailer order awaiting allocation', tag: 'flag', tone: 'flag' },
            { k: 'Omni', v: 'Stock split rebalanced across channels', tag: 'ok', tone: 'ok' },
            { k: 'Returns', v: 'Batch approved for resale', tag: 'new', tone: 'new' },
          ],
          approve: {
            label: 'Needs your approval',
            items: ['Allocation for order 2044'],
          },
          chips: ['Orders', 'Allocation', 'Returns'],
        },
      },
      {
        id: 'support',
        name: 'Support',
        blurb: 'The people systems hum along. CRM, HRMS and launch marketing read from the same record.',
        systems: ['CRM', 'HRMS', 'Marketing'],
        console: {
          title: 'Fashion & Lifestyle OS — support desk',
          rows: [
            { k: 'CRM', v: 'Buyer enquiry assigned to sales', tag: 'new', tone: 'new' },
            { k: 'HRMS', v: 'Shift plan synced with the floor', tag: 'ok', tone: 'ok' },
            { k: 'Launch', v: 'Brief drafted from the approved plan', tag: 'new', tone: 'new' },
          ],
          chips: ['CRM', 'HRMS', 'Briefs'],
        },
      },
    ],
  },
  ask: {
    label: 'Ask the OS',
    titleLead: 'Ask it',
    titleAccent: 'anything on the floor.',
    questions: [
      { t: 'Planning', q: 'Which orders are at risk of missing their ship window this week?' },
      { t: 'Production', q: 'Which lines ran below plan on the second shift?' },
      { t: 'Materials', q: 'What fabric is short against the buy plan?' },
      { t: 'Quality', q: 'Which defect is repeating across batches right now?' },
    ],
  },
  faq: [
    {
      q: 'What is Fashion & Lifestyle OS?',
      a: 'One AI-native control plane that connects product development, sourcing, production, inventory and sales for apparel, footwear, accessories, home goods, lifestyle products and workwear. It reads the signals your systems already produce and turns them into decisions your team approves.',
    },
    {
      q: 'Do we have to replace our ERP?',
      a: 'No. The OS reads the systems you already run — PLM, ERP, MES, warehouse, CRM — and sits above them as the control plane. Start with two or three systems and expand; replacing a system is your call, not a requirement.',
    },
    {
      q: 'How does the AI stay under our control?',
      a: 'Every suggestion arrives with its reason. Agents monitor and analyse, but nothing moves without your approval — and every action is logged, becoming the next signal in the loop.',
    },
    {
      q: 'Where does our data live?',
      a: 'In the cloud, governed by your rules. Deployment details for your environment are confirmed in the working session.',
    },
  ],
};
