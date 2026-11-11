import { track as vercelTrack } from '@vercel/analytics';

/* Fire-and-forget event tracking via the site's existing Vercel Analytics.
 * Wrapped: analytics must never take the page down (jsdom tests, blocked
 * scripts, offline). Events used on pricing surfaces:
 *   pricing_view · deployment_toggle · currency_toggle · cta_click
 *   wizard_start · wizard_step_complete · wizard_submit · wizard_abandon
 *   booking_click */
export function track(event, properties = {}) {
  try {
    vercelTrack(event, properties);
  } catch {
    /* noop */
  }
}
