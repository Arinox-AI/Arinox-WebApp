/**
 * humans — spam screen for the public write endpoints (contact, leads,
 * careers). Two layers, both silent to a legit visitor:
 *
 *   1. Honeypot: a hidden `website` field in every form. Humans never see
 *      or fill it; bots that spray every field get a fake 201 so they learn
 *      nothing and walk away — the request never reaches the DB or SMTP.
 *   2. Cloudflare Turnstile (only when TURNSTILE_SECRET_KEY is configured):
 *      token POSTed from the widget is verified server-side. A token that
 *      Cloudflare rejects ⇒ 403. A verification that cannot even run
 *      (network down) fails OPEN with a console error so a Cloudflare
 *      outage never eats a lead — forms stay reachable, probes get 403.
 */

const HONEYPOT_FIELD = 'website';

const verifyTurnstile = async (token, remoteIp) => {
  const timeoutP = new Promise((resolve) => setTimeout(() => resolve(null), 3000));
  const fetchP = fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
      ...(remoteIp ? { remoteip: remoteIp } : {}),
    }).toString(),
  })
    .then((r) => r.json())
    .catch(() => null);
  return Promise.race([fetchP, timeoutP]);
};

const requireHuman = () => async (req, res, next) => {
  try {
    const body = req.body || {};

    /* 1. Honeypot — swallow silently. */
    if (String(body[HONEYPOT_FIELD] ?? '').trim()) {
      return res.status(201).json({ success: true, message: "Thank you! We'll be in touch soon." });
    }

    /* 2. Turnstile — only when the server-side secret is configured. */
    if (process.env.TURNSTILE_SECRET_KEY) {
      const token = String(body.turnstileToken || req.get('x-turnstile-token') || '').trim();
      let result = null;
      try {
        result = await verifyTurnstile(token, req.ip);
      } catch {
        result = null;
      }
      if (result === null) {
        console.error('[humans] turnstile verify unavailable — failing open for this request');
        return next();
      }
      if (!result.success) {
        return res.status(403).json({ success: false, message: 'Please complete the human check and try again.' });
      }
    }

    next();
  } catch (err) { next(err); }
};

module.exports = { requireHuman, HONEYPOT_FIELD };
