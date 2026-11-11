/* Every "Unlock your price" / "Book a Price Discovery" CTA lands on the
 * Price Discovery wizard, carrying the CTA id (analytics) plus the pricing
 * page's current deployment + currency so the wizard context is complete. */
export function discoveryHref(cta, { deployment, currency } = {}) {
  const params = new URLSearchParams();
  if (cta) params.set('cta', cta);
  if (deployment) params.set('deployment', deployment);
  if (currency) params.set('currency', currency);
  const qs = params.toString();
  return `/pricing/discovery${qs ? `?${qs}` : ''}`;
}

/* Header CTA variant (no pricing-page state to carry). */
export const headerDiscoveryHref = discoveryHref('header');
