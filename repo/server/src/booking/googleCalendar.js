/* Google Calendar boundary — the ONLY file that talks to Google. Optional:
   without credentials the booking system runs in "local" mode (slots come
   from working hours + existing bookings; invites go out as .ics emails).

   Auth: a service account key. No SDK — a signed JWT + fetch (Node ≥ 18).
     GOOGLE_SERVICE_ACCOUNT_JSON  the key JSON (single line)   — or —
     GOOGLE_SERVICE_ACCOUNT_FILE  path to the key JSON file
     GOOGLE_CALENDAR_ID           optional, defaults to the host email
   Two flavours:
     shared (default)  the host SHARES their calendar with the service account
                       ("Make changes to events"). No admin console needed. The
                       robot reads busy time and writes the event; Google cannot
                       email invites or make Meet links this way, so our own
                       emails carry the invite.
     delegated         GOOGLE_DELEGATION=true + a Workspace admin granting
                       domain-wide delegation: the robot acts AS the host, and
                       Google sends the invites and adds a Meet link. */
const crypto = require('crypto');
const fs = require('fs');
const cfg = require('./config');

const SCOPE = 'https://www.googleapis.com/auth/calendar';
const b64 = (o) => Buffer.from(typeof o === 'string' ? o : JSON.stringify(o)).toString('base64url');

let key = null;
let token = null; // { value, exp }

/* true only when Google itself can invite attendees / add Meet (delegation). */
const delegated = () => process.env.GOOGLE_DELEGATION === 'true';

const isConfigured = () => !!(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_SERVICE_ACCOUNT_FILE);

const loadKey = () => {
  if (key) return key;
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON || fs.readFileSync(process.env.GOOGLE_SERVICE_ACCOUNT_FILE, 'utf8');
  key = JSON.parse(raw);
  key.private_key = String(key.private_key || '').replace(/\\n/g, '\n');
  return key;
};

const calendarId = () => process.env.GOOGLE_CALENDAR_ID || cfg.hostEmail();

async function accessToken() {
  const now = Math.floor(Date.now() / 1000);
  if (token && token.exp - 60 > now) return token.value;
  const k = loadKey();
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: k.client_email, ...(delegated() ? { sub: cfg.hostEmail() } : {}), scope: SCOPE,
    aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600,
  })}`;
  const sig = crypto.createSign('RSA-SHA256').update(unsigned).sign(k.private_key).toString('base64url');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${sig}` }),
  });
  const json = await res.json();
  if (!res.ok || !json.access_token) throw new Error(`Google auth failed: ${json.error_description || json.error || res.status}`);
  token = { value: json.access_token, exp: now + (json.expires_in || 3600) };
  return token.value;
}

async function gfetch(url, init = {}) {
  const res = await fetch(url, {
    ...init,
    headers: { Authorization: `Bearer ${await accessToken()}`, 'Content-Type': 'application/json' },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Google Calendar ${res.status}: ${json.error?.message || 'request failed'}`);
  return json;
}

/* Busy intervals on the host calendar (events marked "free" are ignored by Google). */
async function getBusy(timeMin, timeMax) {
  const id = calendarId();
  const json = await gfetch('https://www.googleapis.com/calendar/v3/freeBusy', {
    method: 'POST',
    body: JSON.stringify({ timeMin, timeMax, items: [{ id }] }),
  });
  const cal = json.calendars?.[id];
  if (!cal || cal.errors?.length) throw new Error(`Google freeBusy error: ${JSON.stringify(cal?.errors || 'no calendar')}`);
  return cal.busy || [];
}

/* Creates the event on the host calendar (it then blocks the time for everyone).
   Delegated: attendees invited by Google + a Meet link. Shared: the plain event
   only — service accounts may not invite attendees without delegation. */
async function createEvent({ start, end, summary, description, attendees, location }) {
  const full = delegated();
  const ev = await gfetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId())}/events${full ? '?sendUpdates=all&conferenceDataVersion=1' : ''}`,
    {
      method: 'POST',
      body: JSON.stringify({
        summary, description, ...(location ? { location } : {}),
        start: { dateTime: start, timeZone: 'UTC' },
        end: { dateTime: end, timeZone: 'UTC' },
        ...(full ? {
          attendees: attendees.map((email) => ({ email })),
          conferenceData: { createRequest: { requestId: crypto.randomUUID(), conferenceSolutionKey: { type: 'hangoutsMeet' } } },
        } : {}),
      }),
    },
  );
  return { id: ev.id, meetLink: ev.hangoutLink || null };
}

module.exports = { isConfigured, delegated, getBusy, createEvent };
