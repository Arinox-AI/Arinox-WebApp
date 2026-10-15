/**
 * seoController — server-rendered meta shells + RSS for the blog surfaces,
 * plus the slug list used by /sitemap.xml. Everything degrades gracefully:
 * no Supabase → generic blog metas; DB hiccup/timeout → same; a post that
 * is unknown → canonical points at /blog (never a 404 for crawlers).
 */
const supabase = require('../config/supabase');
const { getShell, injectMeta, minimalShell, esc, seoOrigin } = require('../services/metaShell');

const BLOG_DESC = 'Field notes from the AI transformation frontier. Strategy, case studies, technology insights, and research from the Arinox AI team.';

const withTimeout = async (q, ms = 2500) => {
  const sleep = new Promise((resolve) => setTimeout(() => resolve('__timeout__'), ms));
  const result = await Promise.race([q, sleep]).catch(() => null);
  return result === '__timeout__' ? null : result;
};

const absImage = (u, base) =>
  (u && /^https?:\/\//i.test(u) ? u : `${base}${u || '/og-image.jpg'}`);

const fullTitle = (title) => (title && title.includes('Arinox') ? title : `${title} | Arinox AI`);

const articleJsonLd = (post, base) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  ...(post.excerpt ? { description: post.excerpt } : {}),
  ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
  author: {
    '@type': post.authorName === 'Arinox AI Team' ? 'Organization' : 'Person',
    name: post.authorName || 'Arinox AI Team',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Arinox AI',
    logo: { '@type': 'ImageObject', url: `${base}/logo.png` },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${base}/blog/${post.slug}` },
});

const sendShell = async (meta, res, next) => {
  try {
    const shell = await getShell();
    // The shell path is per-request; never let a CDN cache a rewritten page.
    res.setHeader('Cache-Control', 'no-store');
    res.type('html').send(shell ? injectMeta(shell, meta) : minimalShell(meta));
  } catch (err) { next(err); }
};

const blogIndexMeta = async (base) => ({
  title: 'Blog & Research | Arinox AI',
  description: BLOG_DESC,
  canonical: `${base}/blog`,
  image: `${base}/og-image.jpg`,
  type: 'website',
});

/* GET /blog */
const blogIndex = async (req, res, next) => {
  const base = seoOrigin();
  sendShell(await blogIndexMeta(base), res, next);
};

/* GET /blog/:slug */
const blogSlug = async (req, res, next) => {
  try {
    const base = seoOrigin();
    const slug = String(req.params.slug || '').slice(0, 200);
    // select('*') mirrors blogController.getPostBySlug - explicit column
    // lists drift out of sync with the table schema and 400 the whole query.
    const result = supabase
      ? await withTimeout(supabase.from('BlogPosts').select('*').eq('slug', slug).eq('published', true).maybeSingle())
      : null;
    const post = result && !result.error && result.data ? result.data : null;
    // A row without a title/slug cannot build sane metas.
    if (post && post.title && post.slug) {
      return sendShell({
        title: fullTitle(post.title),
        description: post.excerpt || BLOG_DESC,
        canonical: `${base}/blog/${encodeURIComponent(post.slug)}`,
        image: absImage(post.coverImage, base),
        type: 'article',
        jsonLd: articleJsonLd(post, base),
      }, res, next);
    }
    // Unknown slug / DB unavailable: blog-index metas keep crawlers healthy.
    sendShell(await blogIndexMeta(base), res, next);
  } catch (err) { next(err); }
};

/* GET /rss.xml — feed of Supabase-published posts; valid (empty) channel
   when the DB is unavailable. */
const blogRss = async (req, res, next) => {
  try {
    const base = seoOrigin();
    let items = [];
    if (supabase) {
      const q = supabase
        .from('BlogPosts')
        .select('title,slug,excerpt,authorName,authorRole,publishedAt,coverImage')
        .eq('published', true)
        .order('publishedAt', { ascending: false })
        .limit(50);
      const result = await withTimeout(q);
      if (result && !result.error) items = result.data || [];
    }
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Arinox AI Blog</title>
    <link>${base}/blog</link>
    <description>${esc(BLOG_DESC)}</description>
    <generator>Arinox website</generator>
${items.map((p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${base}/blog/${esc(p.slug)}</link>
      <guid isPermaLink="true">${base}/blog/${esc(p.slug)}</guid>
      <description>${esc(p.excerpt || '')}</description>
      ${p.publishedAt ? `<pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>` : ''}
    </item>`).join('\n')}
  </channel>
</rss>`;
    res.setHeader('Cache-Control', 'public, max-age=600');
    res.type('application/rss+xml; charset=utf-8').send(xml);
  } catch (err) { next(err); }
};

/* Published blog slugs for the sitemap; [] on any failure. */
const publishedSlugs = async () => {
  if (!supabase) return [];
  const q = supabase
    .from('BlogPosts')
    .select('slug')
    .eq('published', true)
    .order('publishedAt', { ascending: false })
    .limit(200);
  const result = await withTimeout(q);
  if (!result || result.error) return [];
  return (result.data || []).map((p) => p.slug).filter(Boolean);
};

/* GET /case-studies/:slug — case-study metas with the deep canonical. The
   24 use-case titles live in the client ESM data map (caseStudies.js);
   mirroring them server-side would create a second copy of content, so the
   shell carries the canonical deep URL + section identity and bots that
   execute JS read the full per-case title from the HTML. */
const caseStudySlug = async (req, res, next) => {
  try {
    const base = seoOrigin();
    const slug = String(req.params.slug || '').slice(0, 200);
    sendShell({
      title: 'Case Study | Private AI in Production | Arinox AI',
      description: 'Deployed inside the perimeter. Private AI case studies across BFSI, Healthcare, Manufacturing, Defence, Government, FMCG, and Retail, verified where published.',
      canonical: `${base}/case-studies/${encodeURIComponent(slug)}`,
      image: `${base}/og-image.jpg`,
      type: 'article',
    }, res, next);
  } catch (err) { next(err); }
};

module.exports = { blogIndex, blogSlug, blogRss, caseStudySlug, publishedSlugs };
