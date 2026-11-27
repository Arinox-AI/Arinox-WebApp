// @vitest-environment jsdom
// Cookie consent: store, banner, Clarity + GTM gating/withdrawal, functional storage.
// Hermetic - @microsoft/clarity is mocked; jsdom never fetches the injected
// gtm.js script, so nothing leaves the browser.
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const clarityMock = vi.hoisted(() => ({ init: vi.fn(), consentV2: vi.fn() }));
vi.mock('@microsoft/clarity', () => ({ default: clarityMock }));

import { getConsent, setConsent, hasDecided, subscribe, openSettings, applyGpc } from '../src/lib/consent.js';
import { startConsentEffects } from '../src/lib/consentEffects.js';
import { CookieBanner } from '../src/components/site/CookieBanner.jsx';
import { Footer } from '../src/components/site/Shell.jsx';
import { CLARITY_PROJECT_ID, FUNCTIONAL_STORAGE_KEYS, CONSENT_VERSION, GTM_CONTAINER_ID } from '../src/data/cookies.js';
import { ANSWERS_KEY, blankAnswers, saveAnswers, loadAnswers, clearAnswers } from '../src/components/pricing/wizardLogic.js';

const clearCookies = () => {
  document.cookie.split('; ').forEach((c) => {
    const name = c.split('=')[0];
    if (name) document.cookie = `${name}=; Max-Age=0; Path=/`;
  });
};

let stopEffects = () => {};
beforeEach(() => {
  clearCookies();
  localStorage.clear();
  sessionStorage.clear();
  clarityMock.init.mockClear();
  clarityMock.consentV2.mockClear();
  delete navigator.globalPrivacyControl;
  document.querySelectorAll('script[src*="googletagmanager.com"]').forEach((el) => el.remove());
  delete window.dataLayer;
});
afterEach(() => {
  stopEffects();
  stopEffects = () => {};
  cleanup();
});

const renderBanner = () =>
  render(
    <MemoryRouter>
      <CookieBanner />
      <Footer />
    </MemoryRouter>
  );

describe('consent store', () => {
  it('defaults: necessary on, optional categories off, undecided', () => {
    expect(getConsent()).toEqual({ necessary: true, functional: false, analytics: false });
    expect(hasDecided()).toBe(false);
  });

  it('writes a first-party arinox_consent cookie and reads it back', () => {
    setConsent({ functional: true, analytics: false });
    expect(hasDecided()).toBe(true);
    expect(getConsent()).toEqual({ necessary: true, functional: true, analytics: false });
    const raw = document.cookie.split('; ').find((c) => c.startsWith('arinox_consent='));
    const value = JSON.parse(decodeURIComponent(raw.split('=')[1]));
    expect(value.v).toBe(1);
    expect(value.functional).toBe(true);
    expect(value.analytics).toBe(false);
    expect(typeof value.ts).toBe('number');
    expect(value.ver).toBe(CONSENT_VERSION);
    expect(value.src).toBe('banner');
    expect(new Date(value.at).toISOString()).toBe(value.at);
  });

  it('a record from an older policy version counts as no choice (banner asks again)', () => {
    const old = encodeURIComponent(JSON.stringify({ v: 1, ver: '2000-01-01', functional: true, analytics: true, ts: 1 }));
    document.cookie = `arinox_consent=${old}; Path=/`;
    expect(hasDecided()).toBe(false);
    expect(getConsent().analytics).toBe(false);
    const legacy = encodeURIComponent(JSON.stringify({ v: 1, functional: true, analytics: true, ts: 1 }));
    document.cookie = `arinox_consent=${legacy}; Path=/`;
    expect(hasDecided()).toBe(false);
  });

  it('notifies subscribers and ignores a corrupt cookie', () => {
    const fn = vi.fn();
    const off = subscribe(fn);
    setConsent({ analytics: true });
    expect(fn).toHaveBeenCalledWith({ necessary: true, functional: false, analytics: true });
    off();
    document.cookie = 'arinox_consent=%7Bnot-json; Path=/';
    expect(hasDecided()).toBe(false);
  });

  it('Global Privacy Control is recorded as Reject all (source gpc); an explicit opt-in still wins', () => {
    navigator.globalPrivacyControl = true;
    expect(getConsent().analytics).toBe(false);
    expect(applyGpc()).toBe(true);
    expect(hasDecided()).toBe(true);
    const raw = document.cookie.split('; ').find((c) => c.startsWith('arinox_consent='));
    expect(JSON.parse(decodeURIComponent(raw.split('=')[1])).src).toBe('gpc');
    expect(applyGpc()).toBe(false); // already decided
    setConsent({ analytics: true }, 'settings');
    expect(getConsent().analytics).toBe(true);
  });

  it('openSettings dispatches the reopen event', () => {
    const fn = vi.fn();
    window.addEventListener('arinox:cookie-settings', fn);
    openSettings();
    window.removeEventListener('arinox:cookie-settings', fn);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('cookie banner', () => {
  it('shows on a first visit with three equal-weight buttons and a policy link', () => {
    renderBanner();
    const region = screen.getByRole('region', { name: /cookie preferences/i });
    const buttons = ['Accept all', 'Reject all', 'Choose'].map((n) => screen.getByRole('button', { name: n }));
    expect(new Set(buttons.map((b) => b.className)).size).toBe(1);
    expect(region.getAttribute('aria-live')).toBe('polite');
    expect(screen.getByRole('link', { name: /cookie policy/i }).getAttribute('href')).toBe('/cookies');
  });

  it('Accept all stores both categories and hides the banner', () => {
    renderBanner();
    fireEvent.click(screen.getByRole('button', { name: 'Accept all' }));
    expect(getConsent()).toMatchObject({ functional: true, analytics: true });
    expect(screen.queryByRole('region', { name: /cookie preferences/i })).toBeNull();
  });

  it('Reject all stores both off and hides the banner', () => {
    renderBanner();
    fireEvent.click(screen.getByRole('button', { name: 'Reject all' }));
    expect(hasDecided()).toBe(true);
    expect(getConsent()).toMatchObject({ functional: false, analytics: false });
    expect(screen.queryByRole('region', { name: /cookie preferences/i })).toBeNull();
  });

  it('Choose shows the toggles (Necessary locked) and Save choices stores them', () => {
    renderBanner();
    fireEvent.click(screen.getByRole('button', { name: 'Choose' }));
    expect(screen.getByLabelText('Necessary').disabled).toBe(true);
    expect(screen.getByLabelText('Necessary').checked).toBe(true);
    fireEvent.click(screen.getByLabelText('Analytics'));
    fireEvent.click(screen.getByRole('button', { name: 'Save choices' }));
    expect(getConsent()).toMatchObject({ functional: false, analytics: true });
    expect(screen.queryByRole('region', { name: /cookie preferences/i })).toBeNull();
  });

  it('stays closed under GPC on a first visit', () => {
    navigator.globalPrivacyControl = true;
    renderBanner();
    expect(screen.queryByRole('region', { name: /cookie preferences/i })).toBeNull();
    expect(getConsent()).toMatchObject({ functional: false, analytics: false });
  });

  it('links both the cookie policy and the privacy policy', () => {
    renderBanner();
    expect(screen.getByRole('link', { name: /privacy policy/i }).getAttribute('href')).toBe('/privacy');
  });

  it('a change made from Cookie settings is recorded with source settings', () => {
    setConsent({ functional: false, analytics: false });
    renderBanner();
    fireEvent.click(screen.getByRole('button', { name: 'Cookie settings' }));
    fireEvent.click(screen.getByRole('button', { name: 'Accept all' }));
    const raw = document.cookie.split('; ').find((c) => c.startsWith('arinox_consent='));
    expect(JSON.parse(decodeURIComponent(raw.split('=')[1])).src).toBe('settings');
  });

  it('stays hidden for a returning visitor; the footer link reopens it in Choose mode', () => {
    setConsent({ functional: false, analytics: false });
    renderBanner();
    expect(screen.queryByRole('region', { name: /cookie preferences/i })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Cookie settings' }));
    expect(screen.getByRole('region', { name: /cookie preferences/i })).toBeTruthy();
    expect(screen.getByLabelText('Functional')).toBeTruthy();
  });
});

describe('Clarity gating', () => {
  /* consentEffects keeps module state (loaded Clarity), so each test gets a fresh copy. */
  const fresh = async () => {
    vi.resetModules();
    const [c, e, b] = await Promise.all([
      import('../src/lib/consent.js'),
      import('../src/lib/consentEffects.js'),
      import('../src/components/site/CookieBanner.jsx'),
    ]);
    return { setConsent: c.setConsent, start: e.startConsentEffects, Banner: b.CookieBanner };
  };

  it('the banner does not initialise Clarity before consent, nor after Reject all', async () => {
    const { Banner } = await fresh();
    render(
      <MemoryRouter>
        <Banner />
      </MemoryRouter>
    );
    await act(async () => { await Promise.resolve(); });
    expect(clarityMock.init).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Reject all' }));
    await act(async () => { await Promise.resolve(); });
    expect(clarityMock.init).not.toHaveBeenCalled();
  });

  it('Accept all in the banner initialises Clarity', async () => {
    const { Banner } = await fresh();
    render(
      <MemoryRouter>
        <Banner />
      </MemoryRouter>
    );
    expect(clarityMock.init).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Accept all' }));
    await waitFor(() => expect(clarityMock.init).toHaveBeenCalledWith(CLARITY_PROJECT_ID));
  });

  it('initialises with the project id after analytics consent, then withdraws', async () => {
    const f = await fresh();
    stopEffects = f.start();
    f.setConsent({ analytics: true });
    await waitFor(() => expect(clarityMock.init).toHaveBeenCalledWith(CLARITY_PROJECT_ID));
    expect(clarityMock.consentV2).toHaveBeenCalledWith({ ad_Storage: 'denied', analytics_Storage: 'granted' });

    document.cookie = '_clck=abc; Path=/';
    document.cookie = '_clsk=def; Path=/';
    f.setConsent({ analytics: false });
    expect(clarityMock.consentV2).toHaveBeenLastCalledWith({ ad_Storage: 'denied', analytics_Storage: 'denied' });
    expect(document.cookie).not.toContain('_clck');
    expect(document.cookie).not.toContain('_clsk');
  });

  it('starts Clarity for a returning visitor who already accepted', async () => {
    const f = await fresh();
    f.setConsent({ analytics: true });
    stopEffects = f.start();
    await waitFor(() => expect(clarityMock.init).toHaveBeenCalledTimes(1));
  });
});

describe('Google Tag Manager gating', () => {
  const fresh = async () => {
    vi.resetModules();
    const [c, e, b] = await Promise.all([
      import('../src/lib/consent.js'),
      import('../src/lib/consentEffects.js'),
      import('../src/components/site/CookieBanner.jsx'),
    ]);
    return { setConsent: c.setConsent, start: e.startConsentEffects, Banner: b.CookieBanner };
  };
  const gtmScripts = () => Array.from(document.querySelectorAll('script')).filter((el) => el.src.includes('googletagmanager.com'));
  const layer = () => (window.dataLayer || []).map((x) => (x && typeof x.length === 'number' && typeof x !== 'string' ? Array.from(x) : x));
  const gtmStartIndex = () => layer().findIndex((x) => x && x.event === 'gtm.js');
  const consentCalls = (kind) => layer().filter((x) => Array.isArray(x) && x[0] === 'consent' && x[1] === kind).map((x) => x[2]);
  const renderFresh = (Banner) => render(<MemoryRouter><Banner /></MemoryRouter>);

  it('the container id is the one we were given', () => {
    expect(GTM_CONTAINER_ID).toBe('GTM-P5N7KXHT');
  });

  it('nothing is injected or queued before consent, nor after Reject all', async () => {
    const { Banner } = await fresh();
    renderFresh(Banner);
    expect(gtmScripts()).toHaveLength(0);
    expect(gtmStartIndex()).toBe(-1);
    fireEvent.click(screen.getByRole('button', { name: 'Reject all' }));
    expect(gtmScripts()).toHaveLength(0);
    expect(gtmStartIndex()).toBe(-1);
  });

  it('Accept all injects gtm.js once, with Consent Mode defaults queued first (analytics granted, ads denied)', async () => {
    const { Banner } = await fresh();
    renderFresh(Banner);
    fireEvent.click(screen.getByRole('button', { name: 'Accept all' }));
    const scripts = gtmScripts();
    expect(scripts).toHaveLength(1);
    expect(scripts[0].src).toBe('https://www.googletagmanager.com/gtm.js?id=GTM-P5N7KXHT');
    expect(scripts[0].async).toBe(true);
    expect(consentCalls('default')).toEqual([
      { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' },
    ]);
    const defaultIdx = layer().findIndex((x) => Array.isArray(x) && x[0] === 'consent' && x[1] === 'default');
    expect(defaultIdx).toBeGreaterThanOrEqual(0);
    expect(gtmStartIndex()).toBeGreaterThan(defaultIdx);
    expect(typeof layer()[gtmStartIndex()]['gtm.start']).toBe('number');
    // no custom page_view pushes: GA4 enhanced measurement handles SPA history changes
    expect(layer().some((x) => Array.isArray(x) && x[0] === 'event' && x[1] === 'page_view')).toBe(false);
  });

  it('withdrawal sends consent update denied and deletes _ga / _ga_*; re-consent updates without a second script', async () => {
    const f = await fresh();
    stopEffects = f.start();
    f.setConsent({ analytics: true });
    expect(gtmScripts()).toHaveLength(1);
    document.cookie = '_ga=GA1.1.123.456; Path=/';
    document.cookie = '_ga_ABC123XYZ=GS1.1.789; Path=/';
    document.cookie = 'keep_me=1; Path=/';
    f.setConsent({ analytics: false });
    expect(consentCalls('update').at(-1)).toEqual({ analytics_storage: 'denied' });
    expect(document.cookie).not.toMatch(/(^|; )_ga=/);
    expect(document.cookie).not.toContain('_ga_ABC123XYZ');
    expect(document.cookie).toContain('keep_me=1');
    f.setConsent({ analytics: true });
    expect(gtmScripts()).toHaveLength(1);
    expect(consentCalls('update').at(-1)).toEqual({ analytics_storage: 'granted' });
    expect(consentCalls('default')).toHaveLength(1);
  });

  it('Global Privacy Control: nothing is injected', async () => {
    navigator.globalPrivacyControl = true;
    const f = await fresh();
    renderFresh(f.Banner);
    expect(screen.queryByRole('region', { name: /cookie preferences/i })).toBeNull();
    expect(gtmScripts()).toHaveLength(0);
    expect(window.dataLayer).toBeUndefined();
  });

  it('a consent record from before Google Analytics was added re-asks and loads nothing', async () => {
    const old = encodeURIComponent(JSON.stringify({ v: 1, ver: '2026-11-27', src: 'banner', functional: true, analytics: true, ts: 1 }));
    document.cookie = `arinox_consent=${old}; Path=/`;
    expect(CONSENT_VERSION).not.toBe('2026-11-27');
    const f = await fresh();
    renderFresh(f.Banner);
    expect(screen.getByRole('region', { name: /cookie preferences/i })).toBeTruthy();
    expect(gtmScripts()).toHaveLength(0);
    expect(clarityMock.init).not.toHaveBeenCalled();
  });

  it('starts GTM for a returning visitor who already accepted', async () => {
    const f = await fresh();
    f.setConsent({ analytics: true });
    stopEffects = f.start();
    expect(gtmScripts()).toHaveLength(1);
  });
});

describe('functional storage', () => {
  const draft = () => ({ ...blankAnswers(), industry: 'Energy' });

  it('stays in sessionStorage by default (no consent)', () => {
    saveAnswers(draft());
    expect(sessionStorage.getItem(ANSWERS_KEY)).toBeTruthy();
    expect(localStorage.getItem(ANSWERS_KEY)).toBeNull();
    expect(loadAnswers().industry).toBe('Energy');
  });

  it('moves to localStorage with a timestamp when functional is on', () => {
    setConsent({ functional: true });
    saveAnswers(draft());
    expect(sessionStorage.getItem(ANSWERS_KEY)).toBeNull();
    expect(JSON.parse(localStorage.getItem(ANSWERS_KEY)).savedAt).toBeGreaterThan(0);
    expect(loadAnswers().industry).toBe('Energy');
  });

  it('drops a stored copy older than 30 days', () => {
    setConsent({ functional: true });
    const old = Date.now() - 31 * 24 * 60 * 60 * 1000;
    localStorage.setItem(ANSWERS_KEY, JSON.stringify({ savedAt: old, answers: draft() }));
    expect(loadAnswers()).toBeNull();
    expect(localStorage.getItem(ANSWERS_KEY)).toBeNull();
  });

  it('turning functional off clears the stored copy', () => {
    stopEffects = startConsentEffects();
    setConsent({ functional: true });
    saveAnswers(draft());
    expect(localStorage.getItem(ANSWERS_KEY)).toBeTruthy();
    setConsent({ functional: false });
    expect(localStorage.getItem(ANSWERS_KEY)).toBeNull();
    clearAnswers();
  });

  it('the consent module and wizard agree on the storage key', () => {
    expect(FUNCTIONAL_STORAGE_KEYS).toContain(ANSWERS_KEY);
  });
});
