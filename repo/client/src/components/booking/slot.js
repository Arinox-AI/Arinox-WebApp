/* How a booked slot reads on the confirmation: "Monday 3 December · 10:00–10:30 (Asia/Kolkata)",
   in the visitor's own timezone (the same view the picker showed). */
const timeLabel = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
const dayLabel = (d) => d.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })

export function whenLabel(iso, minutes = 30) {
  const start = new Date(iso)
  if (Number.isNaN(start.getTime())) return ''
  const end = new Date(start.getTime() + minutes * 60e3)
  let zone = ''
  try { zone = Intl.DateTimeFormat().resolvedOptions().timeZone || '' } catch { /* no Intl zone */ }
  return `${dayLabel(start)} · ${timeLabel(start)}–${timeLabel(end)}${zone ? ` (${zone})` : ''}`
}
