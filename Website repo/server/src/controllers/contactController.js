const nodemailer = require('nodemailer');
const validator = require('validator');
const Contact = require('../models/Contact');

const submitContact = async (req, res, next) => {
  try {
    const { name, email, company, phone, subject, message } = req.body;

    if (!name || !email || !message)
      return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
    if (!validator.isEmail(email))
      return res.status(400).json({ success: false, message: 'Invalid email address.' });

    const contact = await Contact.create({ name, email, company, phone, subject, message });

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: `[Arinox] ${subject || 'New Contact'} from ${name}`,
        html: `<h3>New Contact Submission</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Company:</b> ${company || 'N/A'}</p>
          <p><b>Phone:</b> ${phone || 'N/A'}</p>
          <p><b>Subject:</b> ${subject}</p>
          <p><b>Message:</b><br>${message}</p>`,
      });
    }

    res.status(201).json({ success: true, message: 'Thank you! We will be in touch shortly.', id: contact.id });
  } catch (err) { next(err); }
};

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: contacts });
  } catch (err) { next(err); }
};

module.exports = { submitContact, getContacts };
