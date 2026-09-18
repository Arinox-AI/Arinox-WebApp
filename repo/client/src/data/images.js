/* ═══════════════════════════════════════════════════════════
   Image registry, everything lives under /public/images/<group>/
   so a swap is just replacing the file, no code change.

   Folders:
     brand/         logos & the Arinox "A" mark        (Nav, Footer)
     team/          leadership + advisors portraits     (Home, Company)
     commandcore/   product renders                     (CommandCore, Home)
     events/        launches, summits, workshops        (Home insights, Blog, BlogPost, Company gallery)
     industries/    sector photography                  (Home sectors, Solutions)
     logos/         partner & client marks              (Home trust strip, Ecosystem, Partners)
     logos/apps/    integration marks                   (Home layer stack)

   The key strings below are the stable IDs used by pages.
   ═══════════════════════════════════════════════════════════ */

export const IMAGES = {
  /* commandcore/, CommandCore product renders */
  'commandcore-hero': '/images/commandcore/commandcore-xl2.webp',
  'commandcore-s':    '/images/commandcore/commandcore-s1.webp',
  'commandcore-m':    '/images/commandcore/commandcore-m1.webp',
  'commandcore-xl':   '/images/commandcore/commandcore-xl2.webp',

  /* team/, leadership + advisors */
  ajay:      '/images/team/ajay.jpg',
  chytra:    '/images/team/chytra.webp',
  uday:      '/images/team/uday.webp',
  venu:      '/images/team/venu.webp',
  repswal:   '/images/team/repswal.webp',
  aniruddha: '/images/team/aniruddha.webp',

  /* events/, field photos & event recaps */
  'sovereign-launch': '/images/events/sovereign-launch.jpeg',
  'hitachi-shori':    '/images/events/hitachi-shori-2026.JPG',
  'hitachi-2026':     '/images/events/hitachi-2026.jpeg',
  'hitachi-systems':  '/images/events/hitachi-systems-event.jpeg',
  'ai-summit':        '/images/events/ai-summit.jpg',
  'bharat-digital':   '/images/events/bharat-digital-summit.jpeg',
  'aks-workshop':     '/images/events/aks-workshop-global.jpeg',
  'ansr-workshop':    '/images/events/ansr-tech-workshop.jpg',
  'nvidia-workshop':  '/images/events/nvidia-workshop.jpg',
  'indian-gov':       '/images/events/indian-government.jpeg',

  /* industries/, sector photography (blog imagery) */
  banking:    '/images/industries/banking.jpeg',
  technology: '/images/industries/technology.jpeg',
};

export const img = (key) => IMAGES[key] || IMAGES['commandcore-hero'];
