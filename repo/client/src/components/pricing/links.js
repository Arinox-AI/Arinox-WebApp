/* Every "Unlock your price" / "Book a Price Discovery" CTA lands on the client
 * intake page (/get-started). The args are kept so existing callers
 * (and their analytics ids) don't change; the destination is one place. */
// eslint-disable-next-line no-unused-vars
export function discoveryHref(cta, ctx) {
  return '/get-started';
}

/* Header CTA variant. */
export const headerDiscoveryHref = discoveryHref('header');
