const CaseStudy = require('../models/CaseStudy');

const getCaseStudies = async (req, res, next) => {
  try {
    const { industry, featured } = req.query;
    const where = { published: true };
    if (industry) where.clientIndustry = industry;
    if (featured === 'true') where.featured = true;

    const studies = await CaseStudy.findAll({
      where,
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['content'] },
    });
    res.json({ success: true, data: studies });
  } catch (err) { next(err); }
};

const getCaseStudyBySlug = async (req, res, next) => {
  try {
    const study = await CaseStudy.findOne({ where: { slug: req.params.slug, published: true } });
    if (!study) return res.status(404).json({ success: false, message: 'Case study not found' });
    res.json({ success: true, data: study });
  } catch (err) { next(err); }
};

module.exports = { getCaseStudies, getCaseStudyBySlug };
