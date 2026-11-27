/* Consent store. One first-party cookie `arinox_consent` = the consent
 * record {v:1, ver, src, at, ts, functional, analytics}: policy version,
 * where the choice was made (banner | settings | gpc), ISO time. `necessary`
 * is always on and not stored. A record made under an older policy version
 * counts as no choice, so the banner asks again when the policy changes.
 * Every choice is also sent (best effort) to POST /api/v1/consent as the
 * audit trail.
 *
 * GPC decision: a browser that sends Global Privacy Control and has no stored
 * choice is treated as "Reject all" (recorded with source "gpc", no banner).
 * The visitor can still opt in through Cookie settings; that explicit choice
 * is honoured over the signal. */
import { CONSENT_COOKIE, CONSENT_DAYS, CONSENT_VERSION } from '../data/cookies';

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
    return parsed && parsed.v === 1 && parsed.ver === CONSENT_VERSION ? parsed : null;
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

const SOURCES = ['banner', 'settings', 'gpc'];

/* Best-effort audit trail; never blocks or fails the choice. */
function logConsent(value) {
  try {
    if (typeof fetch !== 'function' || typeof location === 'undefined' || !/^https?:$/.test(location.protocol)) return;
    const preferences = {};
    for (const key of Object.keys(CATEGORIES)) preferences[key] = value[key];
    fetch('/api/v1/consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ version: value.ver, timestamp: value.at, source: value.src, preferences }),
      keepalive: true,
    }).catch(() => {});
  } catch { /* audit is best effort */ }
}

export function setConsent(partial = {}, source = 'banner') {
  if (!hasDoc()) return getConsent();
  const next = { ...getConsent(), ...partial };
  const now = new Date();
  const value = { v: 1, ver: CONSENT_VERSION, src: SOURCES.includes(source) ? source : 'banner', at: now.toISOString(), ts: now.getTime() };
  for (const key of Object.keys(CATEGORIES)) value[key] = next[key] === true;
  const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${CONSENT_DAYS * 86400}; Path=/; SameSite=Lax${secure}`;
  logConsent(value);
  const state = getConsent();
  listeners.forEach((fn) => fn(state));
  return state;
}

/* GPC with no stored choice → record a rejection (source "gpc"). Returns
 * true when it did, so the banner stays closed. */
export function applyGpc() {
  if (!hasDoc() || hasDecided() || !gpcOn()) return false;
  const off = {};
  for (const key of Object.keys(CATEGORIES)) off[key] = false;
  setConsent(off, 'gpc');
  return true;
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
