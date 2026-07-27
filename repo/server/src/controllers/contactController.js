const validator = require('validator');
const supabase = require('../config/supabase');
const { sendMail, contactNotification, contactAutoReply } = require('../utils/mailer');

const submitContact = async (req, res, next) => {
  try {
    const { name, email, company, phone, subject, message } = req.body;

    if (!name || !email || !message)
      return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
    if (!validator.isEmail(email))
      return res.status(400).json({ success: false, message: 'Invalid email address.' });

    const now = new Date().toISOString();
    const { data: contact, error } = await supabase
      .from('Contacts')
      .insert({ name, email, company, phone, subject, message, createdAt: now, updatedAt: now })
      .select()
      .single();
    if (error) throw new Error(error.message);

    // Notify team + auto-reply to user (fire and forget — don't fail the request if email fails)
    Promise.allSettled([
      sendMail({
        to: process.env.EMAIL_TO || 'assist@arinox.ai',
        subject: `[Arinox] ${subject || 'New Contact'} from ${name}`,
        html: contactNotification({ name, email, company, phone, subject, message }),
      }),
      sendMail({
        to: email,
        subject: `We received your message — Arinox AI`,
        html: contactAutoReply({ name, subject }),
      }),
    ]).then(results => {
      results.forEach((r, i) => {
        if (r.status === 'rejected') {
          const label = i === 0 ? 'team-notify' : 'auto-reply';
          console.error(`Email error (contact/${label}):`, r.reason?.responseCode ?? '', r.reason?.message ?? r.reason);
        }
      });
    });

    res.status(201).json({ success: true, message: "Thank you! We'll be in touch shortly.", id: contact.id });
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
