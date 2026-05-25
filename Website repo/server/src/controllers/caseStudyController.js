const supabase = require('../config/supabase');

const LIST_COLS = 'id, title, slug, clientName, clientLogo, clientIndustry, challenge, solution, results, technologies, coverImage, published, featured, createdAt, updatedAt';

const getCaseStudies = async (req, res, next) => {
  try {
    const { industry, featured } = req.query;

    let query = supabase
      .from('CaseStudies')
      .select(LIST_COLS)
      .eq('published', true)
      .order('createdAt', { ascending: false });

    if (industry)           query = query.eq('clientIndustry', industry);
    if (featured === 'true') query = query.eq('featured', true);

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const getCaseStudyBySlug = async (req, res, next) => {
  try {
    const { data: study, error } = await supabase
      .from('CaseStudies')
      .select('*')
      .eq('slug', req.params.slug)
      .eq('published', true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!study) return res.status(404).json({ success: false, message: 'Case study not found' });
    res.json({ success: true, data: study });
  } catch (err) { next(err); }
};

module.exports = { getCaseStudies, getCaseStudyBySlug };
