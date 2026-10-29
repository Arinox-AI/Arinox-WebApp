/* ─── Security suite · Secure OS (suite page) ───────────────
   SECURITY-suite copy rules (user direction, 2026-10-29):

   • TEASER, NOT SPEC. The page says what the OS does to the
     adversary and to the reader's fears — not how it is built.
     Mechanisms (Kali tooling, model names, timings, wiring)
     live in the deck and in the ARIN chat knowledge below the
     page, not in this file. The copy should make a reader
     contact us; it should not teach a reader anything.
   • Voice: same messaging system as the other suite pages —
     signals, decisions, the loop, "you approve" — but shorter,
     colder lines. Security copy reads like a security log, not
     a feature list.
   • Structure cannot change (shared suite components): hero,
     index strip, seven-capability ledger, six-stage tour with
     console rows, dark watch list, LoopBoard, deck form — all
     required keys below mirror industrialSuite.js.

   Facts kept (from the team's notes, phrased subtly): attack +
   defense agents (standard toolkit named once, on the hub, in
   chat — not as a spec), honeypots in throwaway environments,
   IP bans, attack replays, top-attacker tracking, ISP reports,
   local-model DLP on folders, compliance re-checked in seconds,
   the secure index of every file the AI engine touches.

   STILL off the page (sales-deck material): BPRD /
   police-modernization, the bug-bounty market note, team names.
   ──────────────────────────────────────────────────────────── */

export const secureOsSuite = {
  id: 'secure',
  name: 'Secure OS',
  overline: 'Security suite · Operations',
  tagline: 'The AI way to run security operations.',
  lead: 'Attack and defense, one brain: agents that probe the way the adversary does and remember every answer, honeypots that take the hit on purpose, files that refuse to move quietly. Signals in. Decisions out. In a loop.',
  hero: {
    h1Lead: 'Secure',
    h1Accent: 'OS.',
  },
  systems: {
    label: 'Seven connected capabilities',
    note: 'the short names of long systems',
    footer: 'Every door watched. Every file accounted for. Every move remembered.',
    items: [
      { n: '01', t: 'Autonomous Attack & Defense Agents', stage: 'Hunt' },
      { n: '02', t: 'Security Orchestration', stage: 'Support' },
      { n: '03', t: 'Honeypot Intelligence', stage: 'Capture' },
      { n: '04', t: 'Attack Tracking & Response', stage: 'Respond' },
      { n: '05', t: 'Data-Loss Prevention', stage: 'Watch' },
      { n: '06', t: 'Compliance Monitoring', stage: 'Prove' },
      { n: '07', t: 'The Secure Index', stage: 'Account' },
    ],
  },
  gap: {
    label: 'What changed',
    titleLead: 'More endpoints. More attackers.',
    titleAccent: 'More to defend.',
    titleRest: '',
    note: 'Every endpoint, folder, identity and connection is a door someone is already probing. The bigger the estate, the wider the watch list grows.',
    watch: {
      label: 'The watch list',
      rows: [
        { t: 'Probes', d: 'counted, ranked, remembered' },
        { t: 'Attacker moves', d: 'kept for the replay' },
        { t: 'Banned IPs', d: 'each with its reason' },
        { t: 'File events', d: 'classified as they move' },
        { t: 'Compliance', d: 'checked while the work happens' },
        { t: 'AI access', d: 'every file, on the record' },
      ],
    },
    multipliedNote: 'Every endpoint, developer and department adds its own doors, files and rules.',
    slips: [
      { t: 'Attacks are learned one breach late', d: 'The investigation happens after the damage — the attacker has already moved to the next door.' },
      { t: 'Defense has no memory', d: 'The trick that worked once keeps working; nobody replays it to sharpen the wall.' },
      { t: 'Data leaves quietly', d: 'Files move without anyone asking, and no one asks until an audit wants the trail.' },
      { t: 'Compliance is paperwork', d: 'Checks run by hand, months apart, instead of continuously as the work happens.' },
    ],
  },
  cockpit: {
    label: 'The control plane',
    title: 'One AI brain above the estate: signals in, decisions out.',
    signalsIn: [
      { t: 'The network edge', d: 'first to see' },
      { t: 'Honeypots', d: 'hits by design' },
      { t: 'Folders', d: 'files as they move' },
      { t: 'The AI engine', d: 'its own access, tracked' },
      { t: 'Frameworks', d: 'rules always in force' },
    ],
    agents: [
      { t: 'Monitor', d: 'always on, everywhere' },
      { t: 'Analyse', d: 'replays the past against tomorrow' },
      { t: 'Decide', d: 'inside your rules' },
    ],
    approve: 'You approve',
    decisionsOut: [
      { t: 'Ban', d: 'out at the edge' },
      { t: 'Isolate', d: 'held for your word' },
      { t: 'Flag', d: 'before it lands' },
      { t: 'Report', d: 'to the right desk' },
    ],
    command:
      'You stay in command. Every suggestion comes with its reason, nothing moves without your say, and every action becomes the next signal.',
  },
  request: {
    label: 'The playbook',
    title: 'Everything else is in the playbook.',
    note: 'The seven capabilities are the public names. Everything behind them — the wiring, the guardrails, how a deployment runs — is in the playbook. Tell us where to send it, and a person from the team emails your copy shortly.',
    formLabel: 'Request the playbook',
    success: 'Request received — we’ll send your copy of the playbook shortly. It comes from a person, not a mailing robot.',
    role: 'Industries deck request · Secure OS',
    message: 'Requested the Secure OS deck from the security suite page.',
    ctaButton: 'Request the playbook',
    autoReply: {
      // Server-owned email template id (server/src/utils/autoReplies.js);
      // the below is the request metadata only - the email text is server-owned.
      id: 'secure-os-deck',
      subject: 'Your Secure OS playbook',
      body: 'Thank you for requesting the Secure OS playbook. We’ll send your copy shortly.',
      steps: [
        'The team will follow up soon',
        'If it helps, we map your first threat surface on a call',
      ],
      asset: { name: 'Secure OS playbook (PDF)' },
    },
  },
  tour: {
    label: 'The perimeter, stage by stage',
    titleLead: 'Follow a watch',
    titleAccent: 'across the perimeter.',
    note: 'From first knock to report sent — six moves, exactly as they read on the desk. What sits behind each line is the conversation we have in the room.',
    stages: [
      {
        id: 'sense',
        name: 'Sense',
        blurb: 'Probes land as events. The doors were already being watched.',
        systems: ['The edge', 'Every door'],
        console: {
          title: 'Secure OS — edge console',
          rows: [
            { k: 'Sweep 4471', v: 'Traced and ranked', tag: 'flag', tone: 'flag' },
            { k: 'Coverage', v: 'Every door answered tonight', tag: 'ok', tone: 'ok' },
            { k: 'Top attackers', v: 'Three names so far', tag: 'new', tone: 'new' },
          ],
          approve: {
            label: 'Needs your approval',
            items: ['Ban the source behind sweep 4471'],
          },
          chips: ['Edge', 'Sources'],
        },
      },
      {
        id: 'capture',
        name: 'Capture',
        blurb: 'The honeypot takes the hit on purpose — in an environment that owed you nothing.',
        systems: ['The trap', 'The keeps'],
        console: {
          title: 'Secure OS — honeypot desk',
          rows: [
            { k: 'Session 09', v: 'Held, then studied', tag: 'new', tone: 'new' },
            { k: 'Tooling', v: 'Named and kept', tag: 'new', tone: 'new' },
            { k: 'Conversation', v: 'On record for the replay', tag: 'ok', tone: 'ok' },
          ],
          approve: {
            label: 'Needs your approval',
            items: ['Fold tonight’s keeps into the watchers'],
          },
          chips: ['Trap', 'Keeps'],
        },
      },
      {
        id: 'contain',
        name: 'Contain',
        blurb: 'A source crosses the line, and the door it used shuts behind it — every action shipping with its reason.',
        systems: ['Bans', 'Holds'],
        console: {
          title: 'Secure OS — containment desk',
          rows: [
            { k: '203.0.113.9', v: 'Drafted out, reason attached', tag: 'flag', tone: 'flag' },
            { k: 'Bans', v: 'Eight doors shut this week', tag: 'ok', tone: 'ok' },
            { k: 'Isolation', v: 'One asset, held for your word', tag: 'new', tone: 'new' },
          ],
          approve: {
            label: 'Needs your approval',
            items: ['Endorse tonight’s bans'],
          },
          chips: ['Bans', 'Holds'],
        },
      },
      {
        id: 'learn',
        name: 'Learn',
        blurb: 'Tonight’s conversation replays tomorrow as muscle memory. The trick that worked once is retired.',
        systems: ['Replays', 'Profiles'],
        console: {
          title: 'Secure OS — analysis desk',
          rows: [
            { k: 'Replay 12', v: 'The move, slowed down', tag: 'new', tone: 'new' },
            { k: 'Bypass', v: 'Named, countered', tag: 'flag', tone: 'flag' },
            { k: 'Patterns', v: 'Filed to the profile', tag: 'ok', tone: 'ok' },
          ],
          approve: {
            label: 'Needs your approval',
            items: ['Fold the new pattern into the watchers'],
          },
          chips: ['Replays', 'Profiles'],
        },
      },
      {
        id: 'watch',
        name: 'Watch',
        blurb: 'Folders watch back. A file that moves when it shouldn’t, stopped at the line.',
        systems: ['Filers', 'The flag'],
        console: {
          title: 'Secure OS — file console',
          rows: [
            { k: '/releases', v: 'Twelve moves, all accounted for', tag: 'ok', tone: 'ok' },
            { k: 'poc.xlsx', v: 'Moving wrong — flagged', tag: 'flag', tone: 'flag' },
            { k: 'The brain', v: 'Runs inside your wall', tag: 'ok', tone: 'ok' },
          ],
          approve: {
            label: 'Needs your approval',
            items: ['Block the flagged transfer'],
          },
          chips: ['Folders', 'Flags'],
        },
      },
      {
        id: 'prove',
        name: 'Prove',
        blurb: 'Nothing unaccounted for. Every rule re-checked while the work happens, and the report already leaving — including to where the attacker came from.',
        systems: ['The index', 'The desk'],
        console: {
          title: 'Secure OS — compliance desk',
          rows: [
            { k: 'The index', v: 'Nothing unaccounted for', tag: 'ok', tone: 'ok' },
            { k: 'Compliance', v: 'Re-checked in seconds', tag: 'ok', tone: 'ok' },
            { k: 'Report', v: 'Finding its desk', tag: 'new', tone: 'new' },
          ],
          chips: ['Index', 'Desk'],
        },
      },
    ],
  },
};
