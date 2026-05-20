const Partner = require('../models/Partner');

const getPartners = async (req, res, next) => {
  try {
    const { category } = req.query;
    const where = { active: true };
    if (category) where.category = category;

    const partners = await Partner.findAll({ where, order: [['order', 'ASC'], ['name', 'ASC']] });
    res.json({ success: true, data: partners });
  } catch (err) { next(err); }
};

module.exports = { getPartners };
