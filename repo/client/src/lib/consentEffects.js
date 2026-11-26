/* Side effects of consent: load/withdraw Microsoft Clarity and clear the
 * functional store. Started once by CookieBanner. Nothing here runs without
 * a browser, and Clarity is only imported after analytics consent. */
import { getConsent, subscribe } from './consent';
import { CLARITY_PROJECT_ID, CLARITY_COOKIES, FUNCTIONAL_STORAGE_KEYS } from '../data/cookies';

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

function clearFunctional() {
  for (const key of FUNCTIONAL_STORAGE_KEYS) {
    try { localStorage.removeItem(key); } catch { /* storage unavailable */ }
  }
}

let started = false;
let last = { analytics: false, functional: false };

function apply(state) {
  if (state.analytics && !last.analytics) startClarity();
  else if (!state.analytics && last.analytics) stopClarity();
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
