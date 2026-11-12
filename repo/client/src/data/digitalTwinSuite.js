/* ─── Government & defence suite · Digital Twin++ (suite page) ──
   Source: "Arinox DT++ Vision White Paper v1.0" (Nov 2026, marked
   CONFIDENTIAL — shared with the team/partners for capability
   building only). The public page is therefore a TEASER, same rule
   as Secure OS:

   • Say what the twin does for the operator, not how it is built.
     Architecture layers, standards lists, the 90-day build plan,
     team roles, partner candidates and the commercial model live in
     the brief (request-only) and in the ARIN chat knowledge — not here.
   • HONEST STATUS: the paper describes a vision + a 90-day plan to a
     showcase demo. No customer, deployment, KPI result or
     certification is claimed on the page. Outcomes are design goals.
   • No buyer names (AAI, CISF, Army, …) and no partner names.
   • No prices or tier prices — pricing is given in conversation.
   • Structure mirrors secureOsSuite.js (shared suite components).
   ──────────────────────────────────────────────────────────── */

export const digitalTwinSuite = {
  id: 'digital-twin',
  name: 'Digital Twin++',
  overline: 'Government & defence suite · Digital twin',
  tagline: 'See. Predict. Act.',
  lead: 'One live picture of a critical site that forecasts what happens next and acts on it — with a human approving every step. Sovereign by design, all on hardware you own. Signals in. Decisions out. In a loop.',
  hero: {
    h1Lead: 'Digital Twin',
    h1Accent: '++',
  },
  /* The film (YouTube, Arinox AI channel). Sits just before The brief; opens in a theatre view. */
  film: {
    label: 'Watch',
    titleLead: 'The airport,',
    titleAccent: 'and its twin.',
    note: 'One live picture of the whole site, with a human approving every step.',
    youtubeId: 'f8V6DOHVBAE',
    videoTitle: 'Arinox Digital Twin++',
    duration: '3:05',
  },
  systems: {
    label: 'Eight connected modules',
    note: 'start with one, add the rest without rework',
    footer: 'One site. One picture. Every system answering to it.',
    items: [
      { n: '01', t: 'Ops Twin', stage: 'Run' },
      { n: '02', t: 'Security & Perimeter', stage: 'Protect' },
      { n: '03', t: 'Infrastructure & Assets', stage: 'Maintain' },
      { n: '04', t: 'Simulation Lab', stage: 'Rehearse' },
      { n: '05', t: 'Cyber-Physical', stage: 'Defend' },
      { n: '06', t: 'Energy & Sustainability', stage: 'Optimise' },
      { n: '07', t: 'Command Copilot', stage: 'Ask' },
      { n: '08', t: 'Crisis & Emergency', stage: 'Respond' },
    ],
  },
  /* The reading ladder from the paper: every module works at level two
     or above. Rendered as a strip on the page. */
  levels: {
    label: 'Four levels of a twin',
    note: 'every module works at level two or above',
    items: [
      { n: '1', t: 'See', d: 'One live picture of the site, from the systems you already run.' },
      { n: '2', t: 'Understand', d: 'Events correlated across systems — and why something happened.' },
      { n: '3', t: 'Predict', d: 'Failures, crowding, delays and threats forecast, with what-ifs.' },
      { n: '4', t: 'Act', d: 'Work orders, alerts and playbooks drafted — a human approves each step.', hot: true },
    ],
  },
  /* Where it lands. Categories only, never buyers. */
  sectors: {
    label: 'Where it lands',
    title: 'Built for sites that can’t stop.',
    note: 'From airports to defence bases to power plants, the twin is shaped around the site it serves.',
    items: [
      { t: 'Civil airports', d: 'one picture for operations and security' },
      { t: 'Defence airbases & cantonments', d: 'perimeter, assets and drone defence' },
      { t: 'Ports & borders', d: 'cargo flow, perimeter and vessel picture' },
      { t: 'Railways & metros', d: 'station crowds and asset health' },
      { t: 'Power, oil & gas', d: 'cyber-physical security of plants' },
      { t: 'Government campuses', d: 'integrated command and control' },
    ],
  },
  /* The sovereignty promise, one row each — outcomes, not mechanics. */
  sovereign: {
    label: 'Sovereign by default',
    title: 'The twin of a sensitive site is itself sensitive.',
    note: 'A complete map of a critical site is a target. So the twin is protected like the site it mirrors.',
    items: [
      { t: 'Inside your wall', d: 'Built to run air-gapped, on hardware you own. No data leaves the site.' },
      { t: 'Your data, reused', d: 'Starts from the cameras, sensors, drawings and ERP you already have.' },
      { t: 'Human in command', d: 'Every agent action can be audited, explained and reversed.' },
      { t: 'Clearance-aware', d: 'Access follows role and clearance, down to the layer and the zone.' },
    ],
  },
  gap: {
    label: 'What changed',
    titleLead: 'A site runs on many systems.',
    titleAccent: 'Few of them share a picture.',
    titleRest: '',
    note: 'Operations, security, assets, cyber and energy each watch their own screen. The cost shows up in the gaps between them.',
    watch: {
      label: 'The watch list',
      rows: [
        { t: 'Flow', d: 'people, vehicles, resources — live' },
        { t: 'Perimeter', d: 'every sensor, one map' },
        { t: 'Asset health', d: 'wear caught before it fails' },
        { t: 'IT / OT links', d: 'what depends on what' },
        { t: 'Energy & carbon', d: 'by zone, by asset' },
        { t: 'Incidents', d: 'one picture across agencies' },
      ],
    },
    multipliedNote: 'Every new system, zone and agency adds another screen to watch.',
    slips: [
      { t: 'Problems are found by the next shift', d: 'A delay or breach is pieced together from three screens, after the window to act has closed.' },
      { t: 'Maintenance is reactive', d: 'The asset that was already telling you it was failing gets fixed once it stops.' },
      { t: 'Decisions are rehearsed on paper', d: 'Closures, surges and incidents are planned in a meeting — never run through first.' },
      { t: 'Agencies see different pictures', d: 'In a crisis, every desk works from its own version of the same site.' },
    ],
  },
  cockpit: {
    label: 'The control plane',
    title: 'One AI brain above the site: signals in, decisions out.',
    signalsIn: [
      { t: 'Cameras & sensors', d: 'the live edge' },
      { t: 'Operational systems', d: 'flights, access, building' },
      { t: 'Drawings & models', d: 'the site, as built' },
      { t: 'Assets & ERP', d: 'history and work' },
      { t: 'People & vehicles', d: 'moving, counted' },
    ],
    agents: [
      { t: 'Monitor', d: 'always on, site-wide' },
      { t: 'Analyse', d: 'correlates across systems' },
      { t: 'Decide', d: 'inside your rules' },
    ],
    approve: 'You approve',
    decisionsOut: [
      { t: 'Work order', d: 'before it breaks' },
      { t: 'Alert', d: 'to the right desk' },
      { t: 'Re-plan', d: 'gates, staff, lanes' },
      { t: 'Lock down', d: 'on your word' },
    ],
    command:
      'You stay in command. Every suggestion comes with its reason, nothing moves without your say, and every action becomes the next signal.',
  },
  request: {
    label: 'The brief',
    title: 'The rest is in the brief.',
    note: 'The eight modules are the public names. Everything behind them — the architecture, the data it needs, how a first deployment runs — is in the brief. Tell us where to send it, and a person from the team emails your copy shortly.',
    formLabel: 'Request the brief',
    success: 'Request received — we’ll send your copy of the brief shortly. It comes from a person, not a mailing robot.',
    asset: 'digital-twin', // asset key the server maps to the brief template
    ctaButton: 'Request the brief',
    autoReply: {
      // Server-owned email template id (server/src/utils/autoReplies.js);
      // the below is the request metadata only - the email text is server-owned.
      id: 'digital-twin-brief',
      subject: 'Your Digital Twin++ brief',
      body: 'Thank you for requesting the Digital Twin++ brief. We’ll send your copy shortly.',
      steps: [
        'The team will follow up soon',
        'If it helps, we map your first module and its data sources on a call',
      ],
      asset: { name: 'Digital Twin++ brief (PDF)' },
    },
  },
  tour: {
    label: 'A day on the site, stage by stage',
    titleLead: 'Follow one event',
    titleAccent: 'from sensor to decision.',
    note: 'See, understand, predict, act — four moves, as they read on the control-room screen. What sits behind each line is the conversation we have in the room.',
    stages: [
      {
        id: 'see',
        name: 'See',
        blurb: 'Every system lands on one live picture. The site, as it is right now.',
        systems: ['The scene', 'The feeds'],
        console: {
          title: 'Digital Twin++ — control room',
          rows: [
            { k: 'Terminal B', v: 'Queue building at security', tag: 'flag', tone: 'flag' },
            { k: 'Feeds', v: 'Every source answering', tag: 'ok', tone: 'ok' },
            { k: 'Stand 14', v: 'Turnaround running late', tag: 'new', tone: 'new' },
          ],
          approve: {
            label: 'Needs your approval',
            items: ['Open the second lane at Terminal B'],
          },
          chips: ['Scene', 'Feeds'],
        },
      },
      {
        id: 'understand',
        name: 'Understand',
        blurb: 'Events stop being separate alarms. The twin ties them together and says why.',
        systems: ['Correlation', 'The reason'],
        console: {
          title: 'Digital Twin++ — analysis desk',
          rows: [
            { k: 'Stand 14', v: 'Late because the fuel truck was held', tag: 'new', tone: 'new' },
            { k: 'Queue', v: 'Linked to the late arrival wave', tag: 'flag', tone: 'flag' },
            { k: 'Evidence', v: 'Attached to every finding', tag: 'ok', tone: 'ok' },
          ],
          chips: ['Why', 'Evidence'],
        },
      },
      {
        id: 'predict',
        name: 'Predict',
        blurb: 'The next few hours, forecast — and any change rehearsed on the twin before it touches the site.',
        systems: ['Forecasts', 'What-ifs'],
        console: {
          title: 'Digital Twin++ — planning desk',
          rows: [
            { k: 'Peak hour', v: 'Queue forecast ahead of time', tag: 'flag', tone: 'flag' },
            { k: 'Runway closure', v: 'Run first, on the twin', tag: 'new', tone: 'new' },
            { k: 'Asset 7', v: 'Wear trend rising', tag: 'flag', tone: 'flag' },
          ],
          approve: {
            label: 'Needs your approval',
            items: ['Run the closure scenario for tonight'],
          },
          chips: ['Forecast', 'What-if'],
        },
      },
      {
        id: 'act',
        name: 'Act',
        blurb: 'The decision leaves as a draft with its reason. You approve it; the site moves.',
        systems: ['Playbooks', 'The audit'],
        console: {
          title: 'Digital Twin++ — action desk',
          rows: [
            { k: 'Work order', v: 'Drafted for Asset 7, reason attached', tag: 'new', tone: 'new' },
            { k: 'Lanes & staff', v: 'Re-plan ready for your word', tag: 'ok', tone: 'ok' },
            { k: 'Audit', v: 'Every action on the record', tag: 'ok', tone: 'ok' },
          ],
          approve: {
            label: 'Needs your approval',
            items: ['Release the re-plan', 'Send the work order'],
          },
          chips: ['Playbooks', 'Audit'],
        },
      },
    ],
  },
};
