const { Op } = require('sequelize');
const BlogPost = require('../models/BlogPost');

const getPosts = async (req, res, next) => {
  try {
    const { category, domain, tag, page = 1, limit = 9 } = req.query;
    const where = { published: true };
    if (category) where.category = category;
    if (domain) where.domain = domain;
    if (tag) where.tags = { [Op.like]: `%${tag}%` };

    const offset = (page - 1) * limit;
    const { count, rows } = await BlogPost.findAndCountAll({
      where,
      order: [['publishedAt', 'DESC']],
      offset,
      limit: Number(limit),
      attributes: { exclude: ['content'] },
    });

    res.json({ success: true, data: rows, total: count, page: Number(page), pages: Math.ceil(count / limit) });
  } catch (err) { next(err); }
};

const getPostBySlug = async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ where: { slug: req.params.slug, published: true } });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (err) { next(err); }
};

module.exports = { getPosts, getPostBySlug };
