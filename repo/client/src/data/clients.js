/* Logos, served locally from /public/logos so nothing hotlinks third-party CDNs.
   Split honestly: delivery partners (SIs & infra) vs organisations we work with.
   NVIDIA is a technology we build on, NOT a customer or partner logo. */

export const deliveryPartners = [
  { name: 'Hitachi Systems',  logo: '/images/logos/hitachi.svg' },
  { name: 'IBM',              logo: '/images/logos/ibm.svg' },
  { name: 'HPE',              logo: '/images/logos/hpe.svg' },
  { name: 'HCL Tech',         logo: '/images/logos/hcltech.svg' },
  { name: 'Coforge',          logo: '/images/logos/Coforge.png' },
  { name: 'Langoor',          logo: '/images/logos/langoor.png' },
  { name: 'Nikom',            logo: '/images/logos/nikom.png' },
  { name: 'TechData',         logo: '/images/logos/techdata.svg' },
  { name: 'Altos by Acer',    logo: '/images/logos/altos.svg' },
  { name: 'Dataquark',        logo: '/images/logos/dataquark.png' },
];

export const organisations = [
  { name: 'Hitachi Systems',    logo: '/images/logos/hitachi.svg' },
  { name: 'HPE',                logo: '/images/logos/hpe.svg' },
  { name: 'HCL Tech',           logo: '/images/logos/hcltech.svg' },
  { name: 'Coforge',            logo: '/images/logos/Coforge.png' },
  { name: 'IBM',                logo: '/images/logos/ibm.svg' },
  { name: 'Langoor',            logo: '/images/logos/langoor.png' },
  { name: 'Sun Life',           logo: '/images/logos/sunlife.png' },
  { name: 'Sun Mobility',       logo: '/images/logos/sunmobility.png' },
  { name: 'Kosmoderma Clinics', logo: '/images/logos/kosmoderma.png' },
  { name: 'Dataquark',          logo: '/images/logos/dataquark.png' },
];

/* Core partner set, each shown properly, grouped by what they bring. */
export const partnerGroups = [
  {
    key: 'infrastructure',
    label: 'Infrastructure',
    note: 'Compute estate and deployment substrate.',
    items: [{ name: 'E2E Networks', logo: '/images/logos/e2e-networks.png' }],
  },
  {
    key: 'hardware',
    label: 'Hardware',
    note: 'The machines it runs on.',
    items: [
      { name: 'Altos', logo: '/images/logos/altos.svg' },
      { name: 'HP',    logo: '/images/logos/hp.svg' },
    ],
  },
  {
    key: 'silicon',
    label: 'Silicon',
    note: 'Acceleration from datacenter to edge.',
    items: [
      { name: 'NVIDIA',   logo: '/images/logos/NVIDIA_logo.svg' },
      { name: 'Qualcomm', logo: '/images/logos/qualcomm.svg' },
    ],
  },
];
