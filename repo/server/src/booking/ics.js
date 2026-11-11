/* Minimal RFC 5545 invite (METHOD:REQUEST) for local mode, where we email the
   invite ourselves instead of Google doing it. */
const stamp = (iso) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
// Parameter values (CN=) can't carry quotes, colons, semicolons, commas or newlines.
const cn = (s) => String(s ?? '').replace(/[\r\n";:,\\]/g, ' ').replace(/\s+/g, ' ').trim();
const esc = (s) => String(s ?? '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
// Lines over 75 octets must be folded (CRLF + space).
const fold = (line) => (line.match(/.{1,70}/gu) || ['']).join('\r\n ');

function buildInvite({ uid, start, end, summary, description, organizer, attendees, location }) {
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Arinox AI//Booking//EN', 'CALSCALE:GREGORIAN', 'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`, `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`,
    `SUMMARY:${esc(summary)}`, `DESCRIPTION:${esc(description)}`,
    ...(location ? [`LOCATION:${esc(location)}`] : []),
    `ORGANIZER;CN="${cn(organizer.name)}":mailto:${organizer.email}`,
    ...attendees.map((a) => `ATTENDEE;CN="${cn(a.name || a.email)}";ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${a.email}`),
    'SEQUENCE:0', 'STATUS:CONFIRMED', 'TRANSP:OPAQUE',
    'END:VEVENT', 'END:VCALENDAR',
  ];
  return lines.map(fold).join('\r\n') + '\r\n';
}

module.exports = { buildInvite };
