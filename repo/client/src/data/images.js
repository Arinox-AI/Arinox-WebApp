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
  ajay:      '/images/team/ajay.webp',
  chytra:    '/images/team/chytra.webp',
  venu:      '/images/team/venu.webp',
  repswal:   '/images/team/repswal.webp',
  aniruddha: '/images/team/aniruddha.webp',

  /* events/, field photos & event recaps */
  'sovereign-launch': '/images/events/sovereign-launch.webp',
  'hitachi-shori':    '/images/events/hitachi-shori-2026.webp',
  'hitachi-2026':     '/images/events/hitachi-2026.webp',
  'hitachi-systems':  '/images/events/hitachi-systems-event.webp',
  'ai-summit':        '/images/events/ai-summit.webp',
  'bharat-digital':   '/images/events/bharat-digital-summit.webp',
  'aks-workshop':     '/images/events/aks-workshop-global.webp',
  'ansr-workshop':    '/images/events/ansr-tech-workshop.webp',
  'nvidia-workshop':  '/images/events/nvidia-workshop.webp',
  'indian-gov':       '/images/events/indian-government.webp',

  /* industries/, sector photography (blog imagery) */
  banking:    '/images/industries/banking.webp',
  technology: '/images/industries/technology.webp',
};

export const img = (key) => IMAGES[key] || IMAGES['commandcore-hero'];
