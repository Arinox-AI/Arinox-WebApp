const supabase = require('../config/supabase');

const getPartners = async (req, res, next) => {
  try {
    const { category } = req.query;

    let query = supabase
      .from('Partners')
      .select('*')
      .eq('active', true)
      .order('order', { ascending: true })
      .order('name', { ascending: true });

    if (category) query = query.eq('category', category);

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

module.exports = { getPartners };
