const validator = require('validator');
const supabase = require('../config/supabase');
const { sendMail, contactNotification, contactAutoReply } = require('../utils/mailer');

/* Same hygiene as leadController: trim + length-cap every free-text field so
   the Contacts table and the email bodies can't be inundated by oversized
   junk (the 10kb body limit only bounds the request, not each column). */
const str = (v, max = 500) => (v == null ? null : String(v).trim().slice(0, max)) || null;

const submitContact = async (req, res, next) => {
  try {
    const b = req.body || {};
    const clean = {
      name: str(b.name, 120),
      email: str(b.email, 255),
      company: str(b.company, 160),
      phone: str(b.phone, 40),
      subject: str(b.subject, 200),
      message: str(b.message, 4000),
    };

    if (!clean.name || !clean.email || !clean.message)
      return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
    if (!validator.isEmail(clean.email))
      return res.status(400).json({ success: false, message: 'Invalid email address.' });

    const now = new Date().toISOString();
    const { data: contact, error } = await supabase
      .from('Contacts')
      .insert({ ...clean, createdAt: now, updatedAt: now })
      .select()
      .single();
    if (error) throw new Error(error.message);

    // Notify team + auto-reply to user. Await in serverless so Vercel does not
    // freeze the function before SMTP has a chance to complete.
    const emailResults = await Promise.allSettled([
      sendMail({
        to: process.env.EMAIL_TO || 'assist@arinox.ai',
        subject: `[Arinox] ${clean.subject || 'New Contact'} from ${clean.name}`,
        html: contactNotification(clean),
        replyTo: clean.email,
      }),
      sendMail({
        to: clean.email,
        subject: `We received your message - Arinox AI`,
        html: contactAutoReply({ name: clean.name, subject: clean.subject }),
      }),
    ]);
    emailResults.forEach((r, i) => {
      if (r.status === 'rejected') {
        const label = i === 0 ? 'team-notify' : 'auto-reply';
        console.error(`Email error (contact/${label}):`, r.reason?.responseCode ?? '', r.reason?.message ?? r.reason);
      }
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
