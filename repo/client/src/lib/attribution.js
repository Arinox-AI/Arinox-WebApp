/* Campaign attribution for the website forms.
 *
 * The server has always stored UTM/gclid/referrer/landing_page on the Leads
 * row - but no client ever sent them, so the funnel was blind: we could not
 * tell which page or campaign produced an enquiry.
 *
 * Rules:
 *   - FIRST touch wins for the campaign fields (utm_*, gclid, referrer): a
 *     visitor who lands on a blog post and later asks for a deck is credited
 *     to where they came from, not to the page they happened to be on.
 *   - landing_page is always the page the form lives on right now.
 *   - Everything is kept in sessionStorage, so it lasts the visit and dies
 *     with the tab. No cookies, nothing persistent, nothing personal.
 */

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gad_source'];
const STORAGE_KEY = 'arinox.attribution';

const isBrowser = () => typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';

const read = () => {
  if (!isBrowser()) return {};
  try {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}') || {};
  } catch {
    return {};
  }
};

const write = (value) => {
  if (!isBrowser()) return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* private mode / storage disabled - attribution is best-effort */
  }
};

/* Capture the first touch. Called once per page load. */
export function captureAttribution() {
  if (!isBrowser()) return;
  const stored = read();
  if (stored.captured) return;

  const params = new URLSearchParams(window.location.search);
  const current = {};
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) current[key] = value.slice(0, 200);
  });

  write({
    ...current,
    referrer: (document.referrer || '').slice(0, 500),
    landing_page: window.location.href.slice(0, 500),
    captured: true,
  });
}

/* The attribution to post with a form. */
export function readAttribution() {
  const stored = read();
  return {
    utm_source: stored.utm_source || null,
    utm_medium: stored.utm_medium || null,
    utm_campaign: stored.utm_campaign || null,
    utm_term: stored.utm_term || null,
    utm_content: stored.utm_content || null,
    gclid: stored.gclid || null,
    gad_source: stored.gad_source || null,
    referrer: stored.referrer || null,
    landing_page: isBrowser() ? window.location.href.slice(0, 500) : null,
  };
}
