const supabase = require('../config/supabase');

const LIST_COLS = 'id, title, slug, excerpt, authorName, authorRole, authorAvatar, category, tags, domain, coverImage, published, publishedAt, readTime, createdAt, updatedAt';

const getPosts = async (req, res, next) => {
  try {
    const { category, domain, tag, page = 1, limit = 9 } = req.query;
    const offset = (page - 1) * Number(limit);

    let query = supabase
      .from('BlogPosts')
      .select(LIST_COLS, { count: 'exact' })
      .eq('published', true)
      .order('publishedAt', { ascending: false })
      .range(offset, offset + Number(limit) - 1);

    if (category) query = query.eq('category', category);
    if (domain)   query = query.eq('domain', domain);
    if (tag)      query = query.contains('tags', [tag]);

    const { data, count, error } = await query;
    if (error) throw new Error(error.message);

    res.json({ success: true, data, total: count, page: Number(page), pages: Math.ceil(count / limit) });
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
