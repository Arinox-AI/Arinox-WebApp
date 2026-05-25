const supabase = require('../config/supabase');

const getCareers = async (req, res, next) => {
  try {
    const { department, location, type } = req.query;

    let query = supabase
      .from('Careers')
      .select('*')
      .eq('active', true)
      .order('createdAt', { ascending: false });

    if (department) query = query.eq('department', department);
    if (location)   query = query.ilike('location', `%${location}%`);
    if (type)       query = query.eq('type', type);

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const getCareerById = async (req, res, next) => {
  try {
    const { data: career, error } = await supabase
      .from('Careers')
      .select('*')
      .eq('id', req.params.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!career || !career.active) return res.status(404).json({ success: false, message: 'Job not found' });
    res.json({ success: true, data: career });
  } catch (err) { next(err); }
};

module.exports = { getCareers, getCareerById };
