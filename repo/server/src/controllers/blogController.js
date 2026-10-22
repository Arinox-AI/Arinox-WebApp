const supabase = require('../config/supabase');

const LIST_COLS = 'id, title, slug, excerpt, authorName, authorRole, authorAvatar, category, tags, domain, coverImage, published, publishedAt, readTime, createdAt, updatedAt';

const getPosts = async (req, res, next) => {
  try {
    // Query params are untrusted: repeated keys arrive as arrays, numbers as
    // any string. Clamp pagination so ?limit=100000 / ?page=-5 can't 500.
    const one = (v) => (Array.isArray(v) ? v[0] : v);
    const category = one(req.query.category);
    const domain = one(req.query.domain);
    const tag = one(req.query.tag);
    const page = Math.max(1, Math.trunc(Number(one(req.query.page))) || 1);
    const limit = Math.min(50, Math.max(1, Math.trunc(Number(one(req.query.limit))) || 9));
    const offset = (page - 1) * limit;

    let query = supabase
      .from('BlogPosts')
      .select(LIST_COLS, { count: 'exact' })
      .eq('published', true)
      .order('publishedAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (category) query = query.eq('category', category);
    if (domain)   query = query.eq('domain', domain);
    // `tags` is a JSON column: pass a JSON literal, not a Postgres array.
    if (tag)      query = query.contains('tags', JSON.stringify([String(tag)]));

    const { data, count, error } = await query;
    if (error) throw new Error(error.message);

    res.json({ success: true, data, total: count, page, pages: Math.ceil((count || 0) / limit) });
  } catch (err) { next(err); }
};

const getPostBySlug = async (req, res, next) => {
  try {
    const { data: post, error } = await supabase
      .from('BlogPosts')
      .select('*')
      .eq('slug', req.params.slug)
      .eq('published', true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (err) { next(err); }
};

module.exports = { getPosts, getPostBySlug };
