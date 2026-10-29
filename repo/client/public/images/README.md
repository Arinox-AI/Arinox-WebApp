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
| `brand/` | `logo-orange.webp` (Nav), `logo-black.webp` (Footer), `logo-white.png` (email header), PNG originals resized to 96px high, `logo-mark.png`, `arinox-logo-black.png`, `arinox-a-black.png`, `arinox-a-orange.png` | Nav, Footer, AuthModal, email header |
| `team/` | `ajay.webp`, `michael.webp`, `chytra.webp`, `anuvesh.jpeg` (leadership) · `venu.webp`, `repswal.webp`, `aniruddha.webp` (advisors) | Home (People), Company |
| `commandcore/` | `commandcore-s1.webp`, `commandcore-m1.webp`, `commandcore-xl2.webp` | CommandCore, Home |
| `events/` | `sovereign-launch.webp`, `hitachi-shori-2026.webp`, `hitachi-2026.webp`, `hitachi-systems-event.webp`, `ai-summit.webp`, `bharat-digital-summit.webp`, `aks-workshop-global.webp`, `ansr-tech-workshop.webp`, `nvidia-workshop.webp`, `indian-government.webp` | Home (insights), Blog, BlogPost, Company (gallery) |
| `industries/` | `banking.webp`, `technology.webp` (site photos) · `marketing-signals.svg`, `fashion-lifestyle-control.svg`, `industrial-line.svg`, `secure-os.svg` (product illustrations) | Home (sectors), Platform, Industries hub (product line), Marketing OS, Fashion & Lifestyle OS, Industrial OS, Secure OS (hub card) |

> Product visuals: `marketing-signals.svg` (unDraw "Growth Analytics"),
> `industrial-line.svg` (unDraw "Factory"), `fashion-lifestyle-control.svg`
> (unDraw "Trying on Clothes") and `secure-os.svg` (unDraw "Security On") —
> recoloured to site tokens (ember accent, ink darks, paper neutrals) — used
> on the Industries hub ledger rows and as the suite-page heroes (Secure OS
> is hub-only until its page exists). The operator figures across the site
> are also unDraw (undraw.co, open licence, no attribution required).
> `client/src/components/site/SuiteMocks.jsx` (app-window mockups) remains
> in the codebase, currently unused.
| `sectors/` | `government.svg`, `bfsi.svg`, `industry.svg`, `security.svg` (flat illustration library, recoloured to site tokens) | Home (sectors), CommandCore (what powers it) |
| `logos/` | partner & client SVGs/PNGs (IBM, HPE, HCLTech, Hitachi, NVIDIA, Qualcomm, Coforge, Minera, HUL, Century Ply, Innocean, Celkon, Nikom, Altos, Kogo, …) | Home (trust strip), Company (ecosystem), Footer |
| `logos/apps/` | SAP, Salesforce, Gmail, HubSpot, Zendesk, Google, Shopify, WooCommerce | Home (layer stack) |

## Swapping an image

1. Drop the new file into the matching folder.
2. Keep the **same filename** (or update the one line in `src/data/images.js` / `src/data/site.js`).

Portraits are referenced from `src/data/site.js` (`team`, `advisors`) and event/industry images
from `src/data/images.js` — both are single-source maps.
