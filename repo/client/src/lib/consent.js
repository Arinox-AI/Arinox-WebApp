/* Consent store. One first-party cookie `arinox_consent` = {v:1, functional,
 * analytics, ts}. `necessary` is always on and not stored.
 *
 * GPC decision: if the browser sends Global Privacy Control and there is no
 * stored choice, analytics is reported off (and functional stays off, the
 * default). The banner is still shown (functional is a separate choice) and
 * notes the signal. An explicit click on "Accept all" or an Analytics toggle
 * is the user's own choice and is honoured over the signal. */
import { CONSENT_COOKIE, CONSENT_DAYS } from '../data/cookies';

/* Optional categories and their defaults. Add `marketing: false` here later. */
export const CATEGORIES = { functional: false, analytics: false };

const SETTINGS_EVENT = 'arinox:cookie-settings';
const listeners = new Set();

const hasDoc = () => typeof document !== 'undefined';

function readStored() {
  if (!hasDoc()) return null;
  const m = document.cookie.split('; ').find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  if (!m) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(m.slice(CONSENT_COOKIE.length + 1)));
    return parsed && parsed.v === 1 ? parsed : null;
  } catch {
    return null;
  }
}

export function gpcOn() {
  return typeof navigator !== 'undefined' && navigator.globalPrivacyControl === true;
}

export function hasDecided() {
  return readStored() !== null;
}

export function getConsent() {
  const stored = readStored();
  const out = { necessary: true };
  for (const key of Object.keys(CATEGORIES)) out[key] = stored ? stored[key] === true : CATEGORIES[key];
  if (!stored && gpcOn()) out.analytics = false;
  return out;
}

export function setConsent(partial = {}) {
  if (!hasDoc()) return getConsent();
  const next = { ...getConsent(), ...partial };
  const value = { v: 1, ts: Date.now() };
  for (const key of Object.keys(CATEGORIES)) value[key] = next[key] === true;
  const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${CONSENT_DAYS * 86400}; Path=/; SameSite=Lax${secure}`;
  const state = getConsent();
  listeners.forEach((fn) => fn(state));
  return state;
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/* Reopens the panel in Choose mode (CookieBanner listens). */
export function openSettings() {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent(SETTINGS_EVENT));
}
export const SETTINGS_EVENT_NAME = SETTINGS_EVENT;
