const supabase = require('../config/supabase');
const { submitInquiry } = require('./inquiryController');

/* Legacy path. /api/v1/leads is now an alias of the unified intake
   (POST /api/v1/inquiries). The body passes through untouched:
   resolveInquiry() inside inquiryController maps a legacy autoReplyId
   (the deck templates, price-discovery) onto the new intent/asset pair. */
const submitLead = async (req, res, next) => {
  try {
    return await submitInquiry(req, res, next);
  } catch (err) { next(err); }
};

const getLeads = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('Leads')
      .select('*')
      .order('createdAt', { ascending: false });
    if (error) throw new Error(error.message);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

module.exports = { submitLead, getLeads };
