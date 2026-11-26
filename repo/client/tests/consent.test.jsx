// @vitest-environment jsdom
// Cookie consent: store, banner, Clarity gating/withdrawal, functional storage.
// Hermetic - @microsoft/clarity is mocked; nothing leaves the browser.
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const clarityMock = vi.hoisted(() => ({ init: vi.fn(), consentV2: vi.fn() }));
vi.mock('@microsoft/clarity', () => ({ default: clarityMock }));

import { getConsent, setConsent, hasDecided, subscribe, openSettings } from '../src/lib/consent.js';
import { startConsentEffects } from '../src/lib/consentEffects.js';
import { CookieBanner } from '../src/components/site/CookieBanner.jsx';
import { Footer } from '../src/components/site/Shell.jsx';
import { CLARITY_PROJECT_ID, FUNCTIONAL_STORAGE_KEYS } from '../src/data/cookies.js';
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

  it('Global Privacy Control keeps analytics off until the user chooses', () => {
    navigator.globalPrivacyControl = true;
    expect(getConsent().analytics).toBe(false);
    setConsent({ analytics: true });
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
