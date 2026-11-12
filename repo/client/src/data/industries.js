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
  titleLead: 'One AI appliance.',
  titleAccent: 'Five operating systems.',
  lead: 'CommandCore, our sovereign AI appliance, and packaged AI operating systems built sector by sector — your data inside, every decision yours.',
  spine: 'Signals in, decisions out, you approve — the same loop under every product.',
};

export const products = [
  /* The appliance comes first: "Products" in the nav lands here, so the
     flagship must be on this page, not only in the dropdown. */
  {
    id: 'commandcore',
    name: 'CommandCore™',
    status: '',
    available: true,
    tagline: 'Agentic AI in a box.',
    line: 'Our sovereign AI appliance: a self-contained micro-datacenter that brings compute, models, agentic intelligence and governance inside your perimeter.',
    info: [
      { t: 'Runs', d: 'in your building, air-gapped' },
      { t: 'Inside', d: 'compute, models, KOGO OS' },
      { t: 'Out', d: 'zero data egress' },
    ],
    visual: '/images/commandcore/commandcore-xl2.webp',
    visualAlt: 'The CommandCore XL appliance',
    to: '/commandcore',
    cta: 'Open CommandCore',
  },
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
  {
    id: 'digital-twin',
    name: 'Digital Twin++',
    status: '',
    available: true,
    tagline: 'A twin that sees, predicts and acts.',
    line: 'The sovereign, AI-native digital twin for government and defence sites: operations, security, assets, simulation, cyber and crisis response in one live picture — air-gapped, with a human approving every action.',
    info: [
      { t: 'Signals in', d: 'cameras, sensors, systems, drawings' },
      { t: 'Agents', d: 'see, understand, predict' },
      { t: 'Decisions out', d: 'work orders, alerts, re-plans' },
    ],
    visual: '/images/industries/digital-twin.svg',
    visualAlt: 'A site with a runway and buildings, and above it a floating twin layer of the same buildings in outline, linked by dotted lines',
    to: '/industries/digital-twin',
    cta: 'Open Digital Twin++',
    sectors: 'Airports · Defence bases · Ports · Rail · Power · Secure campuses',
  },
];

/* The shared spine under every product — carried as one line on the hub;
   each suite page explains its own loop in full. */
