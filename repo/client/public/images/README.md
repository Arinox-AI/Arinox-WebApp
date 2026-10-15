# Image library

All content imagery lives here so swapping a picture is just **replacing the file** — no code change.
Reference images by URL: `/images/<folder>/<file>`.

```
public/images/
├── brand/         Arinox logos & the "A" mark
├── team/          Leadership + advisor portraits
├── commandcore/   Product renders (S, M, XL)
├── events/        Launches, summits, workshops, field photos
├── industries/    Sector photography
└── logos/         Partner & client marks
    └── apps/      Integration / app marks
```

## Which page uses what

| Folder | Files | Used on |
|--------|-------|---------|
| `brand/` | `logo-black.png`, `logo-orange.png`, `logo-white.png`, `logo-mark.png`, `arinox-logo-black.png`, `arinox-a-black.png`, `arinox-a-orange.png` | Nav, Footer, AuthModal, email header |
| `team/` | `ajay.jpg`, `chytra.webp`, `uday.webp` (leadership) · `venu.webp`, `repswal.webp`, `aniruddha.webp` (advisors) | Home (People), Company |
| `commandcore/` | `commandcore-s1.webp`, `commandcore-m1.webp`, `commandcore-xl2.webp` | CommandCore, Home |
| `events/` | `sovereign-launch.jpeg`, `hitachi-shori-2026.JPG`, `hitachi-2026.jpeg`, `hitachi-systems-event.jpeg`, `ai-summit.jpg`, `bharat-digital-summit.jpeg`, `aks-workshop-global.jpeg`, `ansr-tech-workshop.jpg`, `nvidia-workshop.jpg`, `indian-government.jpeg` | Home (insights), Blog, BlogPost, Company (gallery) |
| `industries/` | `banking.jpeg`, `technology.jpeg` (site photos) | Home (sectors), Platform |

> Suite visuals (Marketing OS, Apparel OS) are **not files** — they are built
> components in `client/src/components/site/SuiteMocks.jsx` (app-window
> mockups on the `product-stage` backdrop), so they always share the site's
> design tokens.
| `sectors/` | `government.svg`, `bfsi.svg`, `industry.svg`, `security.svg` (flat illustration library, recoloured to site tokens) | Home (sectors), CommandCore (what powers it) |
| `logos/` | partner & client SVGs/PNGs (IBM, HPE, HCLTech, Hitachi, NVIDIA, Qualcomm, Coforge, Minera, HUL, Century Ply, Innocean, Celkon, Nikom, Altos, Kogo, …) | Home (trust strip), Company (ecosystem), Footer |
| `logos/apps/` | SAP, Salesforce, Gmail, HubSpot, Zendesk, Google, Shopify, WooCommerce | Home (layer stack) |

## Swapping an image

1. Drop the new file into the matching folder.
2. Keep the **same filename** (or update the one line in `src/data/images.js` / `src/data/site.js`).

Portraits are referenced from `src/data/site.js` (`team`, `advisors`) and event/industry images
from `src/data/images.js` — both are single-source maps.
