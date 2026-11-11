/* Booking rules in one place. Times are wall-clock in the host's timezone
   (Asia/Kolkata, UTC+5:30, no DST — so a fixed offset is exact). */
const list = (v) => String(v || '').split(',').map((s) => s.trim()).filter(Boolean);

module.exports = {
  // Single host. (Not EMAIL_TO — that is a comma list of team inboxes.)
  hostEmail: () => process.env.BOOKING_HOST_EMAIL || 'assist@arinox.ai',
  hostName: 'Arinox AI',
  // Internal copy of the "new session booked" notice. BOOKING_CC overrides (comma list; empty = nobody).
  ccEmails: () => (process.env.BOOKING_CC === undefined ? ['vandana@arinox.ai'] : list(process.env.BOOKING_CC)),
  maxUpcomingPerEmail: 2,   // stops one address filling the calendar
  timezone: 'Asia/Kolkata',
  tzOffsetMin: 330,
  durationMin: 30,
  bufferMin: 15,          // breathing room kept free around every busy block
  minNoticeHrs: 4,        // nothing bookable sooner than this
  horizonDays: 30,
  workDays: [1, 2, 3, 4, 5],        // Mon–Fri
  startMin: 10 * 60,                // first slot 10:00
  endMin: 18 * 60,                  // last slot ends 18:00
  // BOOKING_BLOCK_DATES=2026-12-25,2027-01-26 → whole days off (host timezone)
  blockedDates: () => list(process.env.BOOKING_BLOCK_DATES),
};
