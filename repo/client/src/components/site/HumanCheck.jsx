import { useEffect, useRef } from 'react';

/* Cloudflare Turnstile — rendered only when VITE_TURNSTILE_SITE_KEY is set.
   The script loads once (explicit render); the token reaches the three
   public forms via the `onToken` callback and is verified server-side.
   Without the key the widget is absent and the server never expects a
   token, so the site degrades gracefully (honeypot still screens bots).
   Privacy: Turnstile runs no ads/tracking (see our Privacy page claims). */

let scriptPromise = null;
const loadTurnstile = () => {
  if (typeof window !== 'undefined' && window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.defer = true;
      s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('turnstile missing')));
      s.onerror = () => reject(new Error('turnstile failed to load'));
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
};

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';

const HumanCheck = ({ onToken }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!SITE_KEY || !ref.current) return undefined;
    let cancelled = false;
    let widgetId = null;
    loadTurnstile()
      .then((t) => {
        if (cancelled || !ref.current) return;
        widgetId = t.render(ref.current, {
          sitekey: SITE_KEY,
          theme: 'light',
          callback: (token) => onToken?.(token),
          'expired-callback': () => onToken?.(null),
          'error-callback': () => onToken?.(null),
        });
      })
      .catch(() => {
        /* Widget unavailable — the server fails open on its own verify path
           (never fail a visitor because Cloudflare hiccuped). */
      });
    return () => {
      cancelled = true;
      if (typeof window !== 'undefined' && window.turnstile && widgetId != null) {
        try { window.turnstile.remove(widgetId); } catch { /* already gone */ }
      }
    };
  }, [onToken]);

  if (!SITE_KEY) return null;
  return <div ref={ref} className="my-2" />;
};

export default HumanCheck;
