const cfg = require('./config');

/* Pure slot generation — no I/O, so it is trivially testable.
   busy: [{ start, end }] ISO strings (Google freeBusy and/or confirmed
   bookings). Returns ISO start times (UTC) the visitor may pick. */
function generateSlots({ now = new Date(), busy = [], blockedDates = cfg.blockedDates() } = {}) {
  const out = [];
  const minStart = now.getTime() + cfg.minNoticeHrs * 3600e3;
  const ist = new Date(now.getTime() + cfg.tzOffsetMin * 60e3);
  const y = ist.getUTCFullYear();
  const m = ist.getUTCMonth();
  const d0 = ist.getUTCDate();
  const buf = cfg.bufferMin * 60e3;
  const dur = cfg.durationMin * 60e3;
  const blocks = busy
    .map((b) => [Date.parse(b.start), Date.parse(b.end)])
    .filter(([s, e]) => !Number.isNaN(s) && !Number.isNaN(e));

  for (let i = 0; i <= cfg.horizonDays; i++) {
    const day = new Date(Date.UTC(y, m, d0 + i)); // 00:00 UTC of the host-timezone calendar date
    if (!cfg.workDays.includes(day.getUTCDay())) continue;
    if (blockedDates.includes(day.toISOString().slice(0, 10))) continue;
    for (let min = cfg.startMin; min + cfg.durationMin <= cfg.endMin; min += cfg.durationMin) {
      const start = day.getTime() + (min - cfg.tzOffsetMin) * 60e3;
      if (start < minStart) continue;
      const clash = blocks.some(([s, e]) => s < start + dur + buf && e > start - buf);
      if (!clash) out.push(new Date(start).toISOString());
    }
  }
  return out;
}

module.exports = { generateSlots };
