/* ─── Industry suites (hub) ─────────────────────────────────
   One line per suite: what it is, and the benefit. The deck carries the
   rest. The card visual is the suite's flat illustration (same file as
   the brief page hero). ──────────────────────────────────────────── */

export const industriesMeta = {
  overline: 'Industry suites',
  title: 'AI that knows your industry.',
  lead: 'Custom-stitched agent ecosystems, built sector by sector on the same sovereign stack. The full detail lives in each suite deck, sent by the team on request.',
};

export const industries = [
  {
    id: 'marketing-os',
    name: 'Marketing OS',
    visual: '/images/industries/marketing-signals.svg',
    visualAlt: 'A phone showing a performance chart, an envelope and signal bubbles, a dotted thread to a performance console, and an operator pointing at it',
    line: 'An AI-native control plane for marketing: every signal read as it lands, every fix drafted with its reason, every decision yours.',
    to: '/industries/marketing',
  },
  {
    id: 'apparel',
    name: 'Apparel OS',
    visual: '/images/industries/apparel-line.svg',
    visualAlt: 'A garment rack, a sewing machine stitching fabric, and a console reading the line, with an operator pointing at the watch list',
    line: 'The factory floor, the lines, ERP and CRM in one operating picture — so problems surface before they cost the shift.',
    to: '/industries/apparel',
  },
];
