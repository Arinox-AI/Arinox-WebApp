/**
 * metaShell — server-side HTML meta injection for SPA routes that social
 * crawlers and search bots fetch without executing JavaScript.
 *
 * The site is a client-rendered SPA: per-page heroes' tags only exist after
 * React boots (react-helmet). Bots that don't execute JS (LinkedIn/WhatsApp/
 * Slack link previews, a lot of crawlers) therefore saw generic home metas
 * for every deep link. This module reloads the compiled index.html and
 * rewrites the <head> per request, keeping ONE file for both consumers.
 *
 * Providers, in order:
 *   1. local dev / self-hosted prod: read client/dist/index.html directly.
 *   2. Vercel serverless (the static build is not part of the fn bundle):
 *      fetch <origin>/index.html once and cache it for 60 s.
 *   3. neither available: a minimal HTML stub with correct metas + a
 *      redirect to the canonical URL (never silently serve home metas).
 */
const fs = require('fs');
const path = require('path');
const { seoOrigin } = require('../utils/seoOrigin');

const PROD_ORIGIN_FALLBACK = 'https://www.arinox.ai';
const SHELL_TTL_MS = 60_000;
const SHELL_FETCH_TIMEOUT_MS = 3000;

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

let originShellCache = null; // { html, fetchedAt }

const localShell = () => {
  // server/src/services -> ../../.. = repo/ -> repo/client/dist/index.html
  try {
    return fs.readFileSync(path.join(__dirname, '..', '..', '..', 'client', 'dist', 'index.html'), 'utf8');
  } catch {
    return null;
  }
};

const originShell = async () => {
  if (originShellCache && Date.now() - originShellCache.fetchedAt < SHELL_TTL_MS) {
    return originShellCache.html;
  }
  const origin = process.env.SITE_URL || PROD_ORIGIN_FALLBACK;
  if (/localhost|127\.0\.0\.1/.test(origin)) return null; // never loop in dev
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), SHELL_FETCH_TIMEOUT_MS);
    const res = await fetch(`${origin.replace(/\/+$/, '')}/index.html`, { signal: ctrl.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    originShellCache = { html, fetchedAt: Date.now() };
    return html;
  } catch (err) {
    console.warn('[metaShell] origin index.html unavailable:', err.message);
    return null;
  }
};

/* In tests never go to the network — the local dist read covers this repo. */
const getShell = async () => {
  const local = localShell();
  if (local) return local;
  if (process.env.VITEST) return null;
  return originShell();
};

/* Rewrite the head of the real index.html for one request. */
const injectMeta = (html, meta) => {
  let out = html;

  const put = (which, key, value) => {
    const rx = new RegExp(`<meta[^>]+(?:property|name)=["']${key}["'][^>]*>`, 'i');
    if (rx.test(out)) out = out.replace(rx, `<meta ${which}="${key}" content="${esc(value)}" />`);
  };

  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(meta.title)}</title>`);
  put('property', 'og:title', meta.title);
  put('property', 'og:description', meta.description);
  put('property', 'og:url', meta.canonical);
  put('property', 'og:image', meta.image);
  put('property', 'og:type', meta.type);
  put('name', 'twitter:title', meta.title);
  put('name', 'twitter:description', meta.description);
  put('name', 'twitter:image', meta.image);
  put('name', 'description', meta.description);

  const canonical = `<link rel="canonical" href="${esc(meta.canonical)}" />`;
  if (/<link[^>]+rel=["']canonical["'][^>]*>/i.test(out)) {
    out = out.replace(/<link[^>]+rel=["']canonical["'][^>]*>/i, canonical);
  } else {
    out = out.replace(/<\/head>/i, `  ${canonical}\n  </head>`);
  }

  if (meta.jsonLd) {
    // `</script>` inside JSON strings would break out of the tag - canonical
    // practice is to escape every '<'.
    const json = JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c');
    out = out.replace(/<\/head>/i, `  <script type="application/ld+json">${json}</script>\n  </head>`);
  }
  return out;
};

/* Last-resort stub when the real shell cannot be loaded anywhere. */
const minimalShell = (meta) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="robots" content="noindex" />
  <title>${esc(meta.title)}</title>
  <meta name="description" content="${esc(meta.description)}" />
  <meta property="og:title" content="${esc(meta.title)}" />
  <meta property="og:description" content="${esc(meta.description)}" />
  <meta property="og:url" content="${esc(meta.canonical)}" />
  <meta property="og:image" content="${esc(meta.image)}" />
  <meta property="og:type" content="${esc(meta.type)}" />
  <meta http-equiv="refresh" content="0;url=${esc(meta.canonical)}" />
</head>
<body><p>Redirecting to <a href="${esc(meta.canonical)}">Arinox AI</a>&hellip;</p></body>
</html>`;

module.exports = { getShell, injectMeta, minimalShell, esc, seoOrigin };
