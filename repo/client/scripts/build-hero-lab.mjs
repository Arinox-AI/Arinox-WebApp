/**
 * Generates client/public/hero-lab.html — v3: full-bleed illustrated hero
 * backdrops (twenty.com style), with the console floating in front.
 *
 * Run: node scripts/build-hero-lab.mjs
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const COPY = `
      <p class="eyebrow">AI transformation &middot; CommandCore &middot; KOGO</p>
      <h1>Enterprise AI, built to run <span class="ember">inside your walls.</span></h1>
      <p class="sub">Arinox is an AI transformation company. We build, deploy, and run private AI &mdash; on our CommandCore appliance or directly in your own infrastructure &mdash; orchestrated by KOGO, with zero data egress.</p>
      <div class="ctas">
        <a class="btn-ember" href="#">Book a discovery session</a>
        <a class="btn-ghost" href="#">Explore case studies</a>
      </div>`

const CONSOLE = `
      <div class="app" data-tilt>
        <div class="app-bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="app-title">kogo &middot; control plane</span><span class="app-live"><i></i> live</span></div>
        <div class="app-body">
          <aside class="app-side">
            <div class="side-item on"><span class="sd"></span>claims.triage</div>
            <div class="side-item"><span class="sd"></span>voice.qa</div>
            <div class="side-item"><span class="sd"></span>plant.guard</div>
            <div class="side-item"><span class="sd"></span>policy.mem</div>
          </aside>
          <main class="app-main">
            <div class="app-kpis">
              <div class="kpi"><span class="kpi-n">1,204</span><span class="kpi-l">documents read</span></div>
              <div class="kpi"><span class="kpi-n hot">100%</span><span class="kpi-l">cited to source</span></div>
              <div class="kpi"><span class="kpi-n">0</span><span class="kpi-l">data egress</span></div>
            </div>
            <div class="chart"><svg viewBox="0 0 320 96" preserveAspectRatio="none"><defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(255,99,1,.45)"/><stop offset="1" stop-color="rgba(255,99,1,0)"/></linearGradient></defs><path d="M0,74 L36,64 L72,68 L108,48 L144,54 L180,34 L216,40 L252,22 L288,26 L320,12 L320,96 L0,96 Z" fill="url(#cg)"/><path d="M0,74 L36,64 L72,68 L108,48 L144,54 L180,34 L216,40 L252,22 L288,26 L320,12" fill="none" stroke="#ff8a4a" stroke-width="2.2"/></svg></div>
            <div class="step done"><i></i>Ingest &middot; policy corpus</div>
            <div class="step done"><i></i>Extract + cite to source</div>
            <div class="step run"><i></i>Validate against rulebook</div>
            <div class="step gate"><i></i>Human sign-off &middot; payout gate</div>
          </main>
        </div>
        <div class="app-foot"><i></i> air-gapped &middot; open-weight models &middot; every decision logged</div>
      </div>`

/* ── Scene: mountain dawn ─────────────────────────────── */
const SCENE_MOUNTAIN = `
<svg class="scene-svg" viewBox="0 0 1440 720" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs>
    <linearGradient id="skyM" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f4f2ee"/><stop offset="0.55" stop-color="#ece7de"/><stop offset="1" stop-color="#e6ded2"/>
    </linearGradient>
    <radialGradient id="sunM" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#ff8a4a" stop-opacity="0.85"/><stop offset="0.45" stop-color="#ff6301" stop-opacity="0.28"/><stop offset="1" stop-color="#ff6301" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fogM" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f2f2f0" stop-opacity="0"/><stop offset="1" stop-color="#f2f2f0" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="fadeBot" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f2f2f0" stop-opacity="0"/><stop offset="1" stop-color="#f2f2f0" stop-opacity="1"/>
    </linearGradient>
  </defs>
  <rect width="1440" height="720" fill="url(#skyM)"/>
  <ellipse cx="760" cy="430" rx="560" ry="240" fill="url(#sunM)"/>
  <circle cx="790" cy="452" r="70" fill="#ffb27a" opacity="0.55"/>
  <circle cx="790" cy="452" r="42" fill="#ffd0ad" opacity="0.8"/>
  <path d="M0,500 L130,452 L240,486 L360,430 L500,478 L620,440 L760,486 L880,446 L1010,486 L1140,448 L1280,486 L1440,452 L1440,720 L0,720 Z" fill="#dcd6cc"/>
  <rect y="470" width="1440" height="140" fill="url(#fogM)"/>
  <path d="M0,566 L150,524 L290,560 L430,516 L580,558 L720,518 L870,560 L1010,520 L1160,560 L1300,524 L1440,558 L1440,720 L0,720 Z" fill="#c7c0b5"/>
  <rect y="540" width="1440" height="150" fill="url(#fogM)" opacity="0.85"/>
  <path d="M0,640 L170,600 L330,636 L500,596 L670,638 L840,598 L1010,640 L1180,602 L1340,640 L1440,614 L1440,720 L0,720 Z" fill="#8f897f"/>
  <path d="M0,690 L210,662 L390,690 L580,658 L770,692 L960,660 L1150,692 L1330,664 L1440,688 L1440,720 L0,720 Z" fill="#2a2724"/>
  <rect y="640" width="1440" height="80" fill="url(#fadeBot)"/>
</svg>`

/* ── Scene: earth horizon ─────────────────────────────── */
const SCENE_EARTH = `
<svg class="scene-svg" viewBox="0 0 1440 720" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs>
    <linearGradient id="skyE" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#efedea"/><stop offset="0.6" stop-color="#e9e3da"/><stop offset="1" stop-color="#dfd7cb"/>
    </linearGradient>
    <radialGradient id="atmosE" cx="50%" cy="50%" r="50%">
      <stop offset="0.86" stop-color="#ff6301" stop-opacity="0"/><stop offset="0.97" stop-color="#ff8a4a" stop-opacity="0.55"/><stop offset="1" stop-color="#ff6301" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="earthE" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#b7b1a6"/><stop offset="0.35" stop-color="#938d83"/><stop offset="1" stop-color="#5f5a53"/>
    </linearGradient>
    <linearGradient id="fadeBotE" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f2f2f0" stop-opacity="0"/><stop offset="1" stop-color="#f2f2f0" stop-opacity="1"/>
    </linearGradient>
  </defs>
  <rect width="1440" height="720" fill="url(#skyE)"/>
  <g fill="#2a2724" opacity="0.35">
    <circle cx="140" cy="90" r="1.6"/><circle cx="330" cy="150" r="1.2"/><circle cx="520" cy="70" r="1.5"/><circle cx="700" cy="130" r="1.1"/>
    <circle cx="880" cy="80" r="1.4"/><circle cx="1050" cy="160" r="1.3"/><circle cx="1220" cy="100" r="1.6"/><circle cx="1360" cy="180" r="1.2"/>
    <circle cx="240" cy="230" r="1.2"/><circle cx="620" cy="220" r="1.3"/><circle cx="980" cy="240" r="1.1"/><circle cx="1300" cy="280" r="1.3"/>
  </g>
  <circle cx="720" cy="1560" r="1200" fill="url(#earthE)"/>
  <circle cx="720" cy="1560" r="1200" fill="url(#atmosE)"/>
  <ellipse cx="520" cy="470" rx="360" ry="46" fill="#f4f2ee" opacity="0.5"/>
  <ellipse cx="980" cy="520" rx="420" ry="54" fill="#f4f2ee" opacity="0.42"/>
  <ellipse cx="760" cy="410" rx="240" ry="30" fill="#f7f5f2" opacity="0.4"/>
  <circle cx="720" cy="1560" r="1200" fill="none" stroke="#ff8a4a" stroke-width="10" opacity="0.5"/>
  <rect y="520" width="1440" height="200" fill="url(#fadeBotE)"/>
</svg>`

/* ── Scene: dawn horizon + grid ───────────────────────── */
const SCENE_GRID = `
<svg class="scene-svg" viewBox="0 0 1440 720" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs>
    <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f4f2ee"/><stop offset="0.7" stop-color="#ece6dc"/><stop offset="1" stop-color="#e7e0d4"/>
    </linearGradient>
    <radialGradient id="sunG" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#ffb27a" stop-opacity="0.9"/><stop offset="0.5" stop-color="#ff6301" stop-opacity="0.22"/><stop offset="1" stop-color="#ff6301" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fadeBotG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f2f2f0" stop-opacity="0"/><stop offset="1" stop-color="#f2f2f0" stop-opacity="1"/>
    </linearGradient>
    <radialGradient id="maskG" cx="50%" cy="58%" r="55%">
      <stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <mask id="gridMask"><rect width="1440" height="720" fill="url(#maskG)"/></mask>
  </defs>
  <rect width="1440" height="720" fill="url(#skyG)"/>
  <ellipse cx="720" cy="430" rx="620" ry="320" fill="url(#sunG)"/>
  <circle cx="720" cy="430" r="120" fill="#ffc79b" opacity="0.5"/>
  <circle cx="720" cy="430" r="78" fill="#ffe0c4" opacity="0.75"/>
  <g stroke="#2a2724" stroke-width="1" opacity="0.14" mask="url(#gridMask)">
    <line x1="0" y1="430" x2="1440" y2="430"/>
    <line x1="120" y1="720" x2="520" y2="430"/><line x1="360" y1="720" x2="610" y2="430"/><line x1="720" y1="720" x2="720" y2="430"/><line x1="1080" y1="720" x2="830" y2="430"/><line x1="1320" y1="720" x2="920" y2="430"/>
    <line x1="0" y1="520" x2="1440" y2="520"/><line x1="0" y1="610" x2="1440" y2="610"/>
  </g>
  <g fill="none" stroke="#ff8a4a" opacity="0.5">
    <ellipse cx="720" cy="430" rx="300" ry="70"/><ellipse cx="720" cy="430" rx="430" ry="104"/><ellipse cx="720" cy="430" rx="580" ry="140"/>
  </g>
  <rect y="600" width="1440" height="120" fill="url(#fadeBotG)"/>
</svg>`

const scene = (cls, svg, withConsole) => `
  <section class="hero ${cls}">
    <div class="scene">${svg}</div>
    <div class="scene-fade"></div>
    ${withConsole
      ? `<div class="wrap split"><div class="copy">${COPY}</div>${CONSOLE}</div>`
      : `<div class="wrap"><div class="copy">${COPY}</div></div>`}
  </section>`

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Arinox &mdash; Hero backdrops</title>
<link rel="preconnect" href="https://api.fontshare.com" />
<link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=swap" rel="stylesheet" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
<style>
  :root{
    --paper:#f2f2f0; --ink:#17171a; --ink-soft:#5b5b60; --ink-faint:#67676f; --line:#e2e1dd; --void:#0b0b0d; --carbon:#212125;
    --phos:#f4ede8; --ember:#ff6301; --ember-2:#ff8a4a; --ember-deep:#b84300; --ghost:#a39d99;
    --display:'Newsreader',Georgia,serif; --body:'Switzer',system-ui,-apple-system,sans-serif; --mono:'IBM Plex Mono',ui-monospace,monospace;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:var(--paper);color:var(--ink);font-family:var(--body);line-height:1.55;-webkit-font-smoothing:antialiased;overflow-x:hidden}
  .topbar{position:sticky;top:0;z-index:60;display:flex;align-items:center;justify-content:space-between;gap:16px;height:64px;padding:0 32px;background:rgba(242,242,240,.86);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
  .brand{font-family:var(--display);font-weight:500;font-size:20px}.brand i{color:var(--ember-deep);font-style:normal}
  .navlinks{display:none;gap:22px;font-size:14px;color:var(--ink-soft)}
  @media(min-width:960px){.navlinks{display:flex}}.navlinks b{color:var(--ink)}
  .navcta{font-family:var(--mono);font-size:11.5px;text-transform:uppercase;letter-spacing:.08em;background:var(--ember);color:var(--ink);padding:10px 16px;border-radius:10px;text-decoration:none}
  .intro{max-width:860px;margin:0 auto;padding:56px 32px 8px;text-align:center}
  .intro h2{font-family:var(--display);font-weight:400;font-size:32px}
  .intro p{margin-top:12px;color:var(--ink-soft);font-size:16px}
  .label{max-width:1280px;margin:0 auto;padding:72px 40px 16px;display:flex;align-items:baseline;gap:14px}
  .label .n{font-family:var(--mono);font-size:12px;color:var(--ember-deep);letter-spacing:.1em}
  .label .t{font-family:var(--display);font-size:24px}.label .d{margin-left:auto;font-family:var(--mono);font-size:12px;color:var(--ink-faint)}
  @media(max-width:680px){.label{flex-wrap:wrap}.label .d{margin-left:0}}

  .hero{position:relative;overflow:hidden;min-height:720px;display:flex;align-items:center;border-top:1px solid var(--line)}
  .scene{position:absolute;inset:0;z-index:0}
  .scene-svg{width:100%;height:100%;display:block}
  .scene-fade{position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(242,242,240,.94) 0%,rgba(242,242,240,.7) 38%,rgba(242,242,240,.15) 66%,transparent 100%)}
  .wrap{position:relative;z-index:3;width:100%;max-width:1280px;margin:0 auto;padding:80px 40px}
  .wrap.split{display:grid;grid-template-columns:1fr 1.02fr;gap:52px;align-items:center}
  @media(max-width:980px){.wrap.split{grid-template-columns:1fr;gap:40px}.scene-fade{background:linear-gradient(180deg,rgba(242,242,240,.9) 0%,rgba(242,242,240,.6) 60%,rgba(242,242,240,.95) 100%)}}
  .copy{max-width:560px}
  .eyebrow{font-family:var(--mono);font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-faint)}
  h1{font-family:var(--display);font-weight:400;font-size:clamp(36px,4.8vw,62px);line-height:1.05;letter-spacing:-.02em;margin-top:16px;text-wrap:balance}
  .ember{font-style:italic;color:var(--ember-deep)}
  .sub{max-width:510px;margin-top:20px;color:var(--ink-soft);font-size:17px;line-height:1.65}
  .ctas{margin-top:28px;display:flex;gap:14px;flex-wrap:wrap}
  .btn-ember,.btn-ghost{font-family:var(--mono);font-size:12.5px;text-transform:uppercase;letter-spacing:.08em;text-decoration:none;padding:15px 26px;border-radius:12px;white-space:nowrap}
  .btn-ember{background:var(--ember);color:var(--ink);box-shadow:0 14px 32px -12px rgba(255,99,1,.7)}
  .btn-ghost{border:2px solid var(--ink);color:var(--ink)}

  .app{position:relative;border-radius:16px;border:1px solid rgba(255,255,255,.09);background:linear-gradient(180deg,#1b1b1f,#131316);overflow:hidden;transition:transform .25s cubic-bezier(.22,1,.36,1);box-shadow:0 40px 90px -28px rgba(11,11,13,.62),0 0 110px -22px rgba(255,99,1,.5)}
  .app-bar{display:flex;align-items:center;gap:8px;padding:13px 16px;border-bottom:1px solid rgba(255,255,255,.08);background:var(--carbon)}
  .dot{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.16)}
  .app-title{margin-left:10px;font-family:var(--mono);font-size:12px;color:var(--ghost)}
  .app-live{margin-left:auto;display:inline-flex;align-items:center;gap:6px;font-family:var(--mono);font-size:10.5px;color:var(--ember-2);border:1px solid rgba(255,99,1,.4);background:rgba(255,99,1,.1);border-radius:999px;padding:3px 10px}
  .app-live i{width:6px;height:6px;border-radius:50%;background:var(--ember);animation:pulse 1.6s infinite}
  @keyframes pulse{50%{opacity:.25}}
  .app-body{display:grid;grid-template-columns:190px 1fr;min-height:320px}
  @media(max-width:560px){.app-body{grid-template-columns:1fr}.app-side{display:none}}
  .app-side{border-right:1px solid rgba(255,255,255,.08);padding:16px 12px;font-family:var(--mono);font-size:11.5px;color:var(--ghost)}
  .side-item{display:flex;align-items:center;gap:9px;padding:8px;border-radius:8px}
  .side-item.on{background:rgba(255,99,1,.12);color:var(--phos)}
  .sd{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.28)}
  .side-item.on .sd{background:var(--ember);box-shadow:0 0 8px rgba(255,99,1,.9)}
  .app-main{padding:20px}
  .app-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:18px}
  .kpi{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:12px}
  .kpi-n{display:block;font-family:var(--display);font-size:26px;color:var(--phos)}.kpi-n.hot{color:var(--ember-2)}
  .kpi-l{display:block;font-family:var(--mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--ghost);margin-top:4px}
  .chart{height:92px;margin-bottom:16px}.chart svg{width:100%;height:100%;display:block}
  .step{display:flex;align-items:center;gap:10px;font-family:var(--mono);font-size:11.5px;color:var(--ghost);padding:7px 0;border-bottom:1px solid rgba(255,255,255,.06)}
  .step:last-child{border-bottom:0}
  .step i{width:8px;height:8px;border-radius:50%;border:1px solid rgba(255,255,255,.25);flex:none}
  .step.done i{background:var(--ember);border-color:var(--ember)}
  .step.run i{background:rgba(255,99,1,.35);border-color:var(--ember);animation:pulse 1.4s infinite}
  .step.gate{color:var(--phos)}.step.gate i{border-color:rgba(255,255,255,.5)}
  .app-foot{display:flex;align-items:center;gap:9px;padding:12px 16px;border-top:1px solid rgba(255,255,255,.08);font-family:var(--mono);font-size:10.5px;color:var(--ghost)}
  .app-foot i{width:6px;height:6px;border-radius:50%;background:var(--ember)}

  /* grain overlay on scenes for texture */
  .scene::after{content:'';position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(rgba(23,23,26,.22) 1px,transparent 1.4px);background-size:4px 4px;opacity:.05;mix-blend-mode:multiply}
  .foot{padding:56px 40px 90px;text-align:center;color:var(--ink-faint);font-family:var(--mono);font-size:12px}
</style>
</head>
<body>
  <header class="topbar">
    <span class="brand">Arinox<i>AI</i></span>
    <nav class="navlinks"><span>Home</span><b>CommandCore</b><span>Case Studies</span><span>Partners</span><span>Company</span><span>Blog</span><span>Careers</span></nav>
    <a class="navcta" href="#">Book a session</a>
  </header>

  <section class="intro">
    <h2>Hero backdrops</h2>
    <p>Full-bleed illustrated scenes behind the hero, with the product window floating in front &mdash; the twenty.com composition. Pick a number (or say &ldquo;no product window&rdquo; for the plain scene).</p>
  </section>

  <div class="label"><span class="n">01</span><span class="t">Mountain dawn</span><span class="d">layered ridgelines + ember sunrise</span></div>
  ${scene('s-mountain', SCENE_MOUNTAIN, true)}

  <div class="label"><span class="n">02</span><span class="t">Earth horizon</span><span class="d">planet limb + atmosphere, illustrated</span></div>
  ${scene('s-earth', SCENE_EARTH, true)}

  <div class="label"><span class="n">03</span><span class="t">Dawn grid</span><span class="d">horizon + orbit arcs, minimal</span></div>
  ${scene('s-grid', SCENE_GRID, true)}

  <div class="label"><span class="n">04</span><span class="t">Mountain dawn &mdash; no window</span><span class="d">scene only, copy over</span></div>
  ${scene('s-mountain', SCENE_MOUNTAIN, false)}

  <p class="foot">Arinox &mdash; hero backdrops &middot; internal preview &middot; noindex</p>

<script>
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  (function(){
    var el = document.querySelector('[data-tilt]');
    if (!el || reduced) return;
    var tx=0,ty=0,cx=0,cy=0;
    function loop(){ cx+=(tx-cx)*.12; cy+=(ty-cy)*.12; el.style.transform='perspective(1100px) rotateX('+cy.toFixed(2)+'deg) rotateY('+cx.toFixed(2)+'deg)'; requestAnimationFrame(loop); }
    loop();
    el.addEventListener('mousemove', function(e){ var r=el.getBoundingClientRect(); tx=((e.clientX-r.left)/r.width-.5)*9; ty=-(((e.clientY-r.top)/r.height-.5)*9); });
    el.addEventListener('mouseleave', function(){ tx=0; ty=0; });
  })();
</script>
</body>
</html>
`

const out = resolve(__dirname, '../public/hero-lab.html')
writeFileSync(out, html, 'utf8')
console.log('Wrote', out, '(' + html.length + ' bytes)')
