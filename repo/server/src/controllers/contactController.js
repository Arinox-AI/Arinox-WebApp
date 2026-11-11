const supabase = require('../config/supabase');
const { submitInquiry } = require('./inquiryController');

/* Legacy path. /api/v1/contact is now an alias of the unified intake
   (POST /api/v1/inquiries) so old links keep working. The old subject
   dropdown is translated into an intent; everything else happens in
   inquiryController. */
const LEGACY_SUBJECT_INTENTS = {
  'partnership': 'partnership',
  'request a deck': 'deck',
};

const submitContact = async (req, res, next) => {
  try {
    const body = req.body || {};
    const subject = typeof body.subject === 'string' ? body.subject.trim().toLowerCase() : '';
    const intent = body.intent || LEGACY_SUBJECT_INTENTS[subject] || 'question';
    req.body = { ...body, intent, subject: body.subject || null };
    return submitInquiry(req, res, next);
  } catch (err) { next(err); }
};

const getContacts = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('Contacts')
      .select('*')
      .order('createdAt', { ascending: false });
    if (error) throw new Error(error.message);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

module.exports = { submitContact, getContacts };
