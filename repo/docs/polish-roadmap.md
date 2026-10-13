## Status — round 1 implemented (local, uncommitted-to-main)
- ✅ `docs/polish-roadmap.md` (this file)
- ✅ Marketing "What changed": watch-list mosaic replaces the leak curve
  ("Before: one ad" → 12 tiles → "Now: endless versions") — self-explanatory,
  no fake data; Recharts removed (was ~113 KB gzip)
- ✅ Motion atoms (framer-motion only, no new deps) in
  `client/src/components/site/motion/`: SplitText, CountUp, Tilt, Magnet
- ✅ Applied: Home hero headline (SplitText), Home ghost CTA (Magnet),
  Home CommandCore image (Tilt), Case Studies metrics (CountUp)
- ✅ All assets honours `prefers-reduced-motion`

## How to undo (easy rollback)

Every feature is its own commit on `feat/marketing-deck-preview`:

| Commit message | `git revert <sha>` undoes |
|---|---|
| `feat(ui): add motion atoms...` | all SplitText/CountUp/Tilt/Magnet applications + the atoms folder |
| `feat(marketing): watch-list mosaic replaces leak curve` | restores the Recharts curve + keeps Recharts installed |
| `docs: add design polish roadmap` | removes this file |

One-command full rollback to before round 1:
```
git checkout feat/marketing-deck-preview && git reset --hard <sha-before-round-1>
```
(`<sha-before-round-1>` = the commit before `docs: add design polish roadmap`.)

Undo without git: delete `client/src/components/site/motion/`, one-line edits in
Home.jsx / CaseStudies.jsx / MarketingSuite.jsx are the only spreads (each
wrapped in a clearly-named component block).

---

# Design Polish Roadmap — Library Swaps

Goal: replace hand-rolled/custom pieces with battle-tested component libraries
for a more polished feel, **light-mode first** (the Arinox paper/ink/ember system
stays as the visual identity — libraries are strictly vessels, never the look).

Sources reviewed: [ReactBits Pro](https://pro.reactbits.dev) (230 components),
[reactbits.dev](https://reactbits.dev) (free set), [Aceternity UI](https://ui.aceternity.com),
[Magiс UI](https://magicui.design), [Motion](https://motion.dev) (framer-motion successor),
GSAP ScrollTrigger, Lenis smooth-scroll.

Guardrails (do not violate):
- Single ember accent, warm paper, hairlines, Newsreader/Switzer/Plex Mono.
- No dark-only components on light pages (Aurora, Vortex, Shader * need tinting or are out).
- No cursor replacement / gimmicky effects on a corporate site.
- Bundle size matters → prefer the free lightweight libs; avoid 3D/WebGL unless a real win.

---

## P0 — High impact, free licenses, low risk

| Where | Current | Swap in | Light-mode note | Gain |
|---|---|---|---|---|
| Home hero headline | static h1 | reactbits **SplitText** (per-char reveal) or pro **Rising Ink** | ease 0.5–0.8s, opacity+rise only; no blur | Hero instantly feels designed; kills "static wall of text" |
| Home metrics / Case studies stats | static big numbers | reactbits **CountUp** (or Magic UI **NumberTicker**) | tabular-nums, ember numerals stay | Numbers feel alive; provenance tags untouched |
| Home logo marquee | custom `.marquee-track` CSS | reactbits **Marquee** (same technique + pause-on-hover + edge fades) | neutral | Standard, maintained behavior; removes custom keyframes |
| Home CommandCore image | static `<img>` in stage | Aceternity **Tilt** or reactbits **Tilted Card** (spring tilt) | light shadows tinted warm | Product moment gets interactive depth |
| Marketing leak curve | Recharts (~113 KB gzip in page chunk) | reactbits pro **Simple Graph** (minimal animated graph) | ember stroke, transparent fill — matches now | **−100 KB** and consistent graph animation vocabulary |
| Nav / CTAs | custom buttons | reactbits **Magnet** on primary CTAs only | subtle (4–8px) translate, no color change | CTA row feels engineered, not static |
| Section headings on Home/Marketing/CaseStudies | plain h2 | reactbits **Blur Highlight** or **Speeding Text** (one-per-section, subtle) | slow, subtle; keep Newsreader serif | Editorial scrolled reveal everywhere = "premium" |

## P1 — Nice-to-have, still light-safe

| Where | Current | Swap in | Note |
|---|---|---|---|
| Industries hub cards | flat img + name | Aceternity **Tilt** group / reactbits **Tilted Tiles** | hover depth, same card anatomy |
| Careers job list | plain rows | reactbits **Animated List** | stagger on scroll |
| Case studies "before/after" idea | — (new) | **Comparison Slider** (reactbits) | "One ad → endless versions" could become an interactive slider visual |
| Page imagery | static photos | **Scroll Mask / Zoom Parallax** (reactbits) | images reveal with mask on scroll — light-safe |
| Hero backdrop | custom grid + halftone | Magic UI **GridPattern** or reactbits **Perspective Grid** | keep opacity low so paper stays warm |
| On-page progress | — | reactbits **ScrollProgress** (top hairline, ember) | tiny, useful, no cost |
| CTA band / final CTA | static band | **Depth Card** or **Frame Border** (reactbits) around the panel | subtle animated border draw |
| Marketing "What changed" slips | custom li | keep custom but add **Blur Highlight** per slip on scroll | consistent with P0 heading reveals |

## P2 — Consider later / explicitly skipped

- Ghost Type / Stipple Type — halftone text looks on-brand but risks "decoration" (we killed that once).
- Preloader (reactbits) — corporate govt/enterprise visitors: skip.
- 3D & Shaders (Globe, Vortex, Shader Cards) — WebGL weight, dark-first; skip for light theme.
- Cursor effects — all 21: skip, gimmick on a B2B corporate site.
- Aurora / Particle backgrounds — dark-first; only as 8–12% ember tint behind hero if ever.

## Library stack recommendation

| Library | License | Use for |
|---|---|---|
| reactbits.dev (free set) | MIT | Marquee, Tilted Card, CountUp, SplitText, Magnet, ScrollProgress, Spotlight Card, Orbiting Circles if ever |
| Aceternity UI | MIT | Tilt, Spotlight, Bento Grid, Background Beams (light-tint) |
| Magic UI | MIT / paid pro | NumberTicker, GridPattern, BentoGrid |
| ReactBits Pro | Paid one-time | optional: Simple Graph, Blur Highlight, Animated List, Scroll Mask |
| Motion (motion/react) | MIT | migrate framer-motion → motion for continued support |
| Lenis (+ optional GSAP ScrollTrigger) | MIT | smooth scroll choreography if we want the "cinematic" tier later |

Rules of engagement:
1. Install per feature, prove it on ONE page in light mode, then roll out.
2. Never style a library except through the site's tokens (colors/fonts/radius).
3. Re-check bundle: prefer page-lazy chunks; keep total per-page FCP/LCP stable.

## Immediate next step (proposed)
Implement P0 row 1–4 on `/` first (SplitText hero, CountUp metrics, Marquee,
Tilt on CommandCore) → review in light mode on the preview → then migrate the
pattern to CaseStudies/Marketing. One commit per swap keeps things reviewable.