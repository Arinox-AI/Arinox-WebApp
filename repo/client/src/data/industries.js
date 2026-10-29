/* ─── The product line (hub) ────────────────────────────────
   The industry suites, productized: separate packaged AI products,
   each built for a sector, deployed mostly in the cloud. One entry
   per product: what it is, the benefit, the three info rows the hub
   card carries, and its illustration.

   `status` renders as a pill on the hub card when set. The slot sits
   empty for all four products — the user had "In development" on Secure
   OS for a day (2026-10-29) and removed it on review; pills stay unused
   until they ask for them.
   ──────────────────────────────────────────────────────────── */

export const industriesMeta = {
  overline: 'All products',
  titleLead: 'AI operating systems.',
  titleAccent: 'Built for your sector.',
  lead: 'Packaged AI products, built sector by sector — your data inside, every decision yours.',
  spine: 'Signals in, decisions out, you approve — the same loop under every product.',
};

export const products = [
  {
    id: 'marketing-os',
    name: 'Marketing OS',
    status: '',
    available: true,
    tagline: 'Every signal read as it lands. Every fix drafted with its reason.',
    line: 'An AI-native control plane for marketing: ads, funnel, footfall and CRM in one operating picture — you approve every move.',
    info: [
      { t: 'Signals in', d: 'ads, funnel, store and CRM' },
      { t: 'Agents', d: 'monitor, analyse, decide' },
      { t: 'Decisions out', d: 'pause, scale, create, send' },
    ],
    visual: '/images/industries/marketing-signals.svg',
    visualAlt: 'Two people at a large analytics chart on a screen — one presenting, one reviewing the growth curve',
    to: '/industries/marketing',
    cta: 'Open Marketing OS',
  },
  {
    id: 'fashion-lifestyle',
    name: 'Fashion & Lifestyle OS',
    status: '',
    available: true,
    tagline: 'From product concept to delivery, in one picture.',
    line: 'One control plane across product development, sourcing, production, inventory and sales — for apparel, footwear, accessories, home goods, lifestyle products and workwear.',
    info: [
      { t: 'Signals in', d: 'orders, production, materials, quality' },
      { t: 'Agents', d: 'monitor, analyse, decide' },
      { t: 'Decisions out', d: 're-plan, re-route, expedite, correct' },
    ],
    visual: '/images/industries/fashion-lifestyle-control.svg',
    visualAlt: 'A person trying on clothes in front of a mirror — an unDraw illustration recoloured to the site palette',
    to: '/industries/fashion-lifestyle',
    cta: 'Open Fashion & Lifestyle OS',
    sectors: 'Apparel · Footwear · Accessories · Home goods · Lifestyle products · Workwear',
  },
  {
    id: 'industrial-os',
    name: 'Manufacturing OS',
    status: '',
    available: true,
    tagline: 'From order to production to delivery, in one picture.',
    line: 'One control plane for factories, manufacturers, exporters and production-led businesses — production planning, materials, capacity, shop-floor visibility, quality and delivery commitments read together, so problems surface before they cost the shift.',
    info: [
      { t: 'Signals in', d: 'orders, materials, machines, quality' },
      { t: 'Agents', d: 'monitor, analyse, decide' },
      { t: 'Decisions out', d: 're-plan, re-route, expedite, correct' },
    ],
    visual: '/images/industries/industrial-line.svg',
    visualAlt: 'A factory building with smokestacks and a delivery truck outside',
    to: '/industries/industrial',
    cta: 'Open Manufacturing OS',
    sectors: 'Metals & Steel · Textiles & Apparel · Automotive · Electronics · Food & Pharma · Furniture & Furnishings',
  },
  {
    id: 'secure-os',
    name: 'Secure OS',
    status: '',
    available: true,
    tagline: 'The perimeter watches back.',
    line: 'One control plane for security operations: agents that attack and defend on your side of the wall, a perimeter that learns every attempt, files that refuse to move quietly.',
    info: [
      { t: 'Signals in', d: 'the whole estate, live' },
      { t: 'Agents', d: 'attack, defend, remember' },
      { t: 'Decisions out', d: 'contain, flag, report' },
    ],
    visual: '/images/industries/secure-os.svg',
    visualAlt: 'A person standing beside a large shield — an unDraw illustration recoloured to the site palette',
    to: '/industries/secure',
    cta: 'Open Secure OS',
  },
];

/* The shared spine under every product — carried as one line on the hub;
   each suite page explains its own loop in full. */
