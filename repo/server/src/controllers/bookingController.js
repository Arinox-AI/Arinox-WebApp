const crypto = require('crypto');
const validator = require('validator');
const cfg = require('../booking/config');
const { generateSlots } = require('../booking/availability');
const google = require('../booking/googleCalendar');
const { buildInvite } = require('../booking/ics');
const store = require('../booking/store');
const { sendMail, bookingConfirmation, bookingNotification } = require('../utils/mailer');

const str = (v, max = 500) => (v == null ? null : String(v).trim().slice(0, max)) || null;
// Visitor text that lands in a Google event / invite: no angle brackets (so it can never render as markup or a link
// in the host's calendar) and no control characters.
const plain = (v) => [...String(v ?? '').replace(/[<>]/g, '')]
  .filter((ch) => { const c = ch.charCodeAt(0); return c >= 32 || c === 9 || c === 10 || c === 13; }).join('');

/* Slots the visitor may pick right now: working hours minus everything busy
   (host Google Calendar when configured + bookings already confirmed). If the
   calendar can't be read we fail closed rather than risk a double-booking. */
let cache = null;           // { at, slots } — absorbs bursts of picker loads; never used at confirm time
const CACHE_MS = 30e3;
async function offeredSlots({ fresh = false } = {}) {
  if (!fresh && cache && Date.now() - cache.at < CACHE_MS) return cache.slots;
  const from = new Date();
  const to = new Date(from.getTime() + (cfg.horizonDays + 2) * 864e5);
  const busy = await store.listBusy(from.toISOString(), to.toISOString());
  if (google.isConfigured()) busy.push(...(await google.getBusy(from.toISOString(), to.toISOString())));
  const slots = generateSlots({ now: from, busy });
  cache = { at: Date.now(), slots };
  return slots;
}

const getAvailability = async (req, res) => {
  try {
    const slots = await offeredSlots();
    res.json({
      success: true,
      data: {
        slots, durationMin: cfg.durationMin, timezone: cfg.timezone,
        ...(process.env.NODE_ENV === 'production' ? {} : { mode: google.isConfigured() ? 'google' : 'local' }),
      },
    });
  } catch (err) {
    console.error('[booking] availability failed:', err.message);
    res.status(503).json({ success: false, message: 'Booking is temporarily unavailable. Please email us instead.' });
  }
};

const fmt = (iso, tz, withTz) =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: tz, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: false, ...(withTz ? { timeZoneName: 'short' } : {}),
  }).format(new Date(iso));

const validTz = (tz) => {
  try { new Intl.DateTimeFormat('en-GB', { timeZone: tz }); return true; } catch { return false; }
};

const createBooking = async (req, res, next) => {
  try {
    const b = req.body || {};
    const clean = {
      name: str(b.name, 120),
      email: str(b.email, 255),
      company: str(b.company, 160),
      phone: str(b.phone, 40),
      topic: str(b.topic, 80),
      notes: str(b.notes, 2000),
    };
    if (clean.email) clean.email = clean.email.toLowerCase();
    if (!clean.name || !clean.email) return res.status(400).json({ success: false, message: 'Name and email are required.' });
    if (!validator.isEmail(clean.email)) return res.status(400).json({ success: false, message: 'Invalid email address.' });

    const guests = [...new Set((Array.isArray(b.guests) ? b.guests : [])
      .map((g) => String(g).trim().toLowerCase()).filter(Boolean))].slice(0, 3);
    if (guests.some((g) => g.length > 255 || !validator.isEmail(g)))
      return res.status(400).json({ success: false, message: 'One of the guest emails is invalid.' });

    const startMs = Date.parse(b.startAt);
    if (Number.isNaN(startMs)) return res.status(400).json({ success: false, message: 'Pick a time first.' });
    const startAt = new Date(startMs).toISOString();
    const endAt = new Date(startMs + cfg.durationMin * 60e3).toISOString();

    // Re-check against the live calendar at confirm time — the picker may be stale.
    let slots;
    try { slots = await offeredSlots({ fresh: true }); } catch (e) {
      console.error('[booking] availability re-check failed:', e.message);
      return res.status(503).json({ success: false, message: 'Booking is temporarily unavailable. Please email us instead.' });
    }
    if (!slots.includes(startAt)) return res.status(409).json({ success: false, message: 'That time is no longer available — please pick another.' });

    // One address can't hoard the calendar.
    if ((await store.countUpcoming(clean.email)) >= cfg.maxUpcomingPerEmail)
      return res.status(429).json({ success: false, message: 'This email already has upcoming sessions booked. Reply to your confirmation email if you need to change one.' });

    const manageRef = crypto.randomUUID();
    let rec;
    try {
      rec = await store.insert({ ...clean, guests, startAt, endAt, visitorTz: validTz(b.timezone) ? b.timezone : null, uid: manageRef });
    } catch (e) {
      if (e.code === 'TAKEN') return res.status(409).json({ success: false, message: 'That time was just taken — please pick another.' });
      throw e;
    }
    cache = null; // the picker must stop offering this time straight away

    const host = cfg.hostEmail();
    const attendees = [...new Set([host, clean.email.toLowerCase(), ...guests].map((a) => a.toLowerCase()))];
    const summary = plain(`Arinox discovery session — ${clean.name}${clean.company ? ` (${clean.company})` : ''}`);
    const description = plain(`30-minute discovery session with Arinox AI.\nVisitor: ${clean.name} (${clean.email})${clean.phone ? `, ${clean.phone}` : ''}${clean.company ? `, ${clean.company}` : ''}\nTopic: ${clean.topic || 'General'}${clean.notes ? `\nTo look at first: ${clean.notes}` : ''}${guests.length ? `\nGuests: ${guests.join(', ')}` : ''}`);
    const staticLink = process.env.BOOKING_MEET_LINK || null; // permanent video link, used when Google can't create one

    // Who sends the invite? Delegated Google → Google does (plus a Meet link).
    // Shared calendar or local mode → our email carries a calendar invite.
    const googleInvites = google.isConfigured() && google.delegated();
    let meetLink = staticLink;
    let invite = null;
    if (google.isConfigured()) {
      try {
        const ev = await google.createEvent({ start: startAt, end: endAt, summary, description, attendees, location: staticLink });
        meetLink = ev.meetLink || staticLink;
        await store.update(rec.id, { googleEventId: ev.id, meetLink });
      } catch (e) {
        console.error('[booking] calendar event failed:', e.message);
        await store.update(rec.id, { status: 'cancelled' }); // free the slot — no half-booked state
        return res.status(502).json({ success: false, message: 'We could not reach our calendar. Please try again, or email us.' });
      }
    }
    if (!googleInvites) {
      invite = buildInvite({
        uid: `${manageRef}@arinox.ai`, start: startAt, end: endAt, summary, description, location: meetLink,
        organizer: { name: cfg.hostName, email: host },
        attendees: [{ name: 'Arinox AI', email: host }, { name: clean.name, email: clean.email }, ...guests.map((g) => ({ email: g }))],
      });
    }

    const when = fmt(startAt, cfg.timezone, true);
    const visitorWhen = validTz(b.timezone) && b.timezone !== cfg.timezone ? fmt(startAt, b.timezone, true) : null;
    const ical = invite ? { icalEvent: { method: 'REQUEST', content: invite } } : {};
    // With Google connected the host already has the event on their calendar —
    // an invite email on top would create a duplicate.
    const hostIcal = google.isConfigured() ? {} : ical;

    // Awaited so serverless doesn't freeze before SMTP finishes; failures never fail the booking.
    const results = await Promise.allSettled([
      sendMail({
        to: clean.email, cc: guests.length ? guests : undefined,
        subject: `Your discovery session — ${fmt(startAt, cfg.timezone, true)}`,
        html: bookingConfirmation({ name: clean.name, when, visitorWhen, topic: clean.topic, meetLink }),
        ...ical,
      }),
      sendMail({
        to: host, cc: cfg.ccEmails().filter((c) => c.toLowerCase() !== host.toLowerCase()), replyTo: clean.email,
        subject: `[Arinox] Discovery session booked — ${clean.name} · ${fmt(startAt, cfg.timezone, true)}`.replace(/[\r\n]/g, ' '),
        html: bookingNotification({ ...clean, guests, when, meetLink }),
        ...hostIcal,
      }),
    ]);
    results.forEach((r, i) => {
      if (r.status === 'rejected') console.error(`Email error (booking/${i === 0 ? 'visitor' : 'host'}):`, r.reason?.responseCode ?? '', r.reason?.message ?? r.reason);
    });

    res.status(201).json({ success: true, message: "You're booked.", data: { id: rec.id, startAt, endAt, meetLink, timezone: cfg.timezone } });
  } catch (err) { next(err); }
};

module.exports = { getAvailability, createBooking };
