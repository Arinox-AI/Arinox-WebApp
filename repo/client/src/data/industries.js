/* ─── Industry suites (hub) ─────────────────────────────────
   One line per suite: what it is, and the benefit. The deck carries the
   rest. Vector illustrations (careers-style) in public/images/industries.
   ──────────────────────────────────────────────────────────── */

export const industriesMeta = {
  overline: 'Industry suites',
  title: 'AI that knows your industry.',
  lead: 'Custom-stitched agent ecosystems, built sector by sector on the same sovereign stack. The full detail lives in each suite deck, sent by the team on request.',
};

export const industries = [
  {
    id: 'marketing-os',
    name: 'Marketing OS',
    status: 'Available',
    image: '/images/industries/marketing-os.svg',
    imageAlt: 'A megaphone amplifying the brand voice across channels',
    line: 'An AI-native control plane for marketing: every signal read as it lands, every fix drafted with its reason, every decision yours.',
    to: '/industries/marketing',
  },
  {
    id: 'apparel',
    name: 'Apparel OS',
    status: 'In development',
    image: '/images/industries/apparel-os.svg',
    imageAlt: 'A stitched garment with its production thread',
    line: 'The factory floor, the lines, ERP and CRM in one operating picture — so problems surface before they cost the shift.',
    to: null,
  },
];
