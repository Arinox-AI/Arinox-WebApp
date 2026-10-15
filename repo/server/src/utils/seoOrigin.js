/**
 * seoOrigin — canonical origin used by every SEO surface (sitemap, RSS,
 * meta shells, robots.txt). Guards against a misconfigured SITE_URL (e.g. a
 * staging/preview host leaking into production output, which would devalue
 * the live domain in search).
 */
const PROD_ORIGIN = 'https://www.arinox.ai';

const seoOrigin = () => {
  const configured = (process.env.SITE_URL || '').replace(/\/+$/, '');
  const looksNonProd = /staging|preview|localhost|127\.0\.0\.1|\.vercel\.app/i.test(configured);
  return configured && !looksNonProd ? configured : PROD_ORIGIN;
};

module.exports = { seoOrigin, PROD_ORIGIN };
