const validator = require('validator');
const supabase = require('../config/supabase');
const { sendMail, leadNotification, contactAutoReply } = require('../utils/mailer');

const str = (v, max = 500) => (v == null ? null : String(v).trim().slice(0, max)) || null;
const join = (v) => (Array.isArray(v) ? v.join(', ') : str(v));

/* Submit a lead from the Google Ads landing page (/get-started). Saves a
   structured row to the Leads table (each ICP answer in its own column) and
   notifies the Arinox team + auto-replies to the lead. The email is sent even
   if the DB write fails, so a lead is never lost. */
const submitLead = async (req, res, next) => {
  try {
    const b = req.body || {};
    const lead = {
      name:        str(b.name, 120),
      email:       str(b.email, 255),
      phone:       str(b.phone, 40),
      company:     str(b.company, 160),
      role:        str(b.role, 80),
      companySize: str(b.companySize, 40),
      companyType: str(b.companyType, 60),
      domain:      str(b.domain, 80),
      usesAi:      str(b.usesAi, 60),
      aiTools:     join(b.aiTools),
      useCases:    join(b.useCases),
      timeline:    str(b.timeline, 60),
      message:     str(b.message, 4000),
      utmSource:   str(b.utm_source, 120),
      utmMedium:   str(b.utm_medium, 120),
      utmCampaign: str(b.utm_campaign, 160),
      utmTerm:     str(b.utm_term, 160),
      utmContent:  str(b.utm_content, 160),
      gclid:       str(b.gclid, 255),
      gadSource:   str(b.gad_source, 120),
      referrer:    str(b.referrer, 1000),
      landingPage: str(b.landing_page, 1000),
    };

    if (!lead.name || !lead.email || !lead.phone)
      return res.status(400).json({ success: false, message: 'Name, email and phone are required.' });
    if (!validator.isEmail(lead.email))
      return res.status(400).json({ success: false, message: 'Invalid email address.' });

    // Save structured lead — log but don't fail the request if the DB hiccups
    let saved = null;
    try {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('Leads')
        .insert({ ...lead, status: 'new', createdAt: now, updatedAt: now })
        .select()
        .single();
      if (error) throw new Error(error.message);
      saved = data;
    } catch (dbErr) {
      console.error('Lead DB insert failed (email will still send):', dbErr.message);
    }

    // Notify team + auto-reply to lead. Await in serverless so Vercel does not
    // freeze the function before SMTP has a chance to complete.
    const emailResults = await Promise.allSettled([
      sendMail({
        to: process.env.EMAIL_TO || 'assist@arinox.ai',
        subject: `[Arinox Lead] ${lead.name}${lead.company ? ' — ' + lead.company : ''}${lead.domain ? ' (' + lead.domain + ')' : ''}`,
        html: leadNotification(lead),
        replyTo: lead.email,
      }),
      sendMail({
        to: lead.email,
        subject: 'We received your request — Arinox AI',
        html: contactAutoReply({ name: lead.name, subject: 'your AI strategy call' }),
      }),
    ]);
    emailResults.forEach((r, i) => {
      if (r.status === 'rejected') {
        const label = i === 0 ? 'team-notify' : 'auto-reply';
        console.error(`Email error (lead/${label}):`, r.reason?.responseCode ?? '', r.reason?.message ?? r.reason);
      }
    });

    res.status(201).json({ success: true, message: "Thank you! We'll be in touch within 24 hours.", id: saved?.id });
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
