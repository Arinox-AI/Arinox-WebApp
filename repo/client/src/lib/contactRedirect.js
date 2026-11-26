/* /contact no longer exists as a page: it redirects to /get-started and keeps
   the query string (intent, asset, utm_*, ...).
     ?tab=book    -> ?start=book      ?tab=message -> ?start=message
   A bare /contact used to open the booking calendar, and the booking emails
   still link to it, so it lands on ?start=book rather than the ten questions. */
export function contactRedirectTarget(search = '') {
  const p = new URLSearchParams(search)
  const tab = p.get('tab')
  p.delete('tab')
  if (!p.get('start') && (tab === 'book' || tab === 'message')) p.set('start', tab)
  if (!p.get('start') && !p.get('intent')) p.set('start', 'book')
  const qs = p.toString()
  return `/get-started${qs ? `?${qs}` : ''}`
}
