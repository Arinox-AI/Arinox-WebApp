/* Side effects of consent: load/withdraw Microsoft Clarity and Google Tag
 * Manager (GA4), and clear the functional store. Started once by
 * CookieBanner. Nothing here runs without a browser; Clarity is only imported
 * and GTM only injected after analytics consent. */
import { getConsent, subscribe } from './consent';
import {
  CLARITY_PROJECT_ID, CLARITY_COOKIES, FUNCTIONAL_STORAGE_KEYS,
  GTM_CONTAINER_ID, GA_COOKIE, GA_COOKIE_PREFIX,
} from '../data/cookies';

let clarity = null; // the loaded module, once initialised
let loading = null;

function deleteCookie(name) {
  const host = location.hostname;
  const parts = host.split('.');
  const domains = [undefined, host];
  for (let i = 1; i < parts.length - 1; i++) domains.push(`.${parts.slice(i).join('.')}`);
  domains.push(`.${host}`);
  for (const d of domains) {
    document.cookie = `${name}=; Max-Age=0; Path=/${d ? `; Domain=${d}` : ''}`;
  }
}

async function startClarity() {
  if (clarity) {
    clarity.consentV2({ ad_Storage: 'denied', analytics_Storage: 'granted' });
    return;
  }
  if (!loading) {
    loading = import('@microsoft/clarity').then((m) => {
      const c = m.default || m;
      c.init(CLARITY_PROJECT_ID);
      c.consentV2({ ad_Storage: 'denied', analytics_Storage: 'granted' });
      clarity = c;
    });
  }
  try {
    await loading;
  } catch {
    loading = null; // blocked or offline: try again on the next consent change
  }
}

function stopClarity() {
  if (clarity) clarity.consentV2({ ad_Storage: 'denied', analytics_Storage: 'denied' });
  CLARITY_COOKIES.forEach(deleteCookie);
}

/* Google Tag Manager. Consent Mode v2 defaults are queued BEFORE gtm.js
 * loads (analytics granted - we only get here with analytics consent; ads
 * always denied, there is no marketing category). The script is injected once
 * per page load; it can't be unloaded, so withdrawal is a consent update plus
 * cookie removal, and re-consent is a consent update (no second script).
 * Page views: GA4 enhanced measurement ("page changes based on browser
 * history events") tracks react-router navigation, so no page_view pushes
 * here (they would double-count). */
export const GTM_SRC = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;

function gtag() {
  // gtag pushes the Arguments object itself (not an array); GTM's consent API expects that shape.
  window.dataLayer.push(arguments);
}

function gtmInjected() {
  return Array.from(document.scripts).some((el) => el.src === GTM_SRC);
}

function startGtm() {
  window.dataLayer = window.dataLayer || [];
  if (gtmInjected()) {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    return;
  }
  gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  gtag('js', new Date());
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const el = document.createElement('script');
  el.async = true;
  el.src = GTM_SRC;
  document.head.appendChild(el);
}

function stopGtm() {
  if (Array.isArray(window.dataLayer) && gtmInjected()) gtag('consent', 'update', { analytics_storage: 'denied' });
  const names = document.cookie.split('; ').map((c) => c.split('=')[0]);
  for (const name of new Set([GA_COOKIE, ...names.filter((n) => n.startsWith(GA_COOKIE_PREFIX))])) deleteCookie(name);
}

function clearFunctional() {
  for (const key of FUNCTIONAL_STORAGE_KEYS) {
    try { localStorage.removeItem(key); } catch { /* storage unavailable */ }
  }
}

let started = false;
let last = { analytics: false, functional: false };

function apply(state) {
  if (state.analytics && !last.analytics) { startClarity(); startGtm(); }
  else if (!state.analytics && last.analytics) { stopClarity(); stopGtm(); }
  if (!state.functional && last.functional) clearFunctional();
  last = { analytics: state.analytics, functional: state.functional };
}

export function startConsentEffects() {
  if (typeof window === 'undefined' || started) return () => {};
  started = true;
  const off = subscribe(apply);
  apply(getConsent()); // returning visitor with a stored choice
  return () => { off(); started = false; last = { analytics: false, functional: false }; };
}
