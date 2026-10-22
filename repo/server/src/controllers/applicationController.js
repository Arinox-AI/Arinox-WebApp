const path = require('path');
const validator = require('validator');
const multer = require('multer');
const supabase = require('../config/supabase');
const { sendMail, applicationNotification, applicationAutoReply } = require('../utils/mailer');
const { resumeToPdf } = require('../utils/resumeToPdf');

const RESUME_BUCKET = 'resumes';

// In-memory storage: the file buffer is uploaded to Supabase Storage AND
// attached to the notification email - no reliance on ephemeral local disk.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1, fields: 20 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx'];
    if (allowed.includes(path.extname(file.originalname).toLowerCase())) return cb(null, true);
    // 400, not 500: the error handler only shows 4xx messages to the visitor.
    cb(Object.assign(new Error('Only PDF, DOC, or DOCX files are accepted.'), { statusCode: 400 }));
  },
});

// Same trim + length-cap hygiene as the contact/lead flows.
const str = (v, max = 500) => (v == null ? null : String(v).trim().slice(0, max)) || null;

const submitApplication = async (req, res, next) => {
  try {
    const b = req.body || {};
    const fullName   = str(b.fullName, 120);
    const email      = str(b.email, 255);
    const phone      = str(b.phone, 40);
    const role       = str(b.role, 160);
    const department = str(b.department, 120);
    const coverNote  = str(b.coverNote, 4000);
    let linkedIn     = str(b.linkedIn, 300);

    if (!fullName || !email || !role)
      return res.status(400).json({ success: false, message: 'Name, email and role are required.' });
    // isEmail rejects 'a@x.com, b@y.com', so the auto-reply can only reach one address.
    if (!validator.isEmail(email))
      return res.status(400).json({ success: false, message: 'Invalid email address.' });
    if (linkedIn) {
      if (!validator.isURL(linkedIn, { protocols: ['http', 'https'] }))
        return res.status(400).json({ success: false, message: 'Please enter a valid LinkedIn or portfolio URL.' });
      // People type "linkedin.com/in/x" - store a clickable https URL.
      if (!/^https?:\/\//i.test(linkedIn)) linkedIn = `https://${linkedIn}`;
    }

    const now = new Date().toISOString();

    // Convert the resume to a downloadable PDF once (a .docx is converted; a
    // PDF passes through). The same PDF is stored in the DB and emailed.
    let resumeAttachment = null;
    if (req.file) {
      try {
        const pdf = await resumeToPdf(req.file.buffer, req.file.originalname, req.file.mimetype);
        resumeAttachment = { filename: pdf.filename, content: pdf.content };
      } catch (convErr) {
        console.error('[careers] resume->pdf failed, falling back to original:', convErr.message);
        resumeAttachment = { filename: req.file.originalname, content: req.file.buffer };
      }
    }

    // Persist the resume (PDF) to Supabase Storage so it lives in the DB
    // project, not just the email. Failure here must not block the application.
    let resumeKey = null;
    if (resumeAttachment) {
      const ext = path.extname(resumeAttachment.filename) || '.pdf';
      const isPdf = ext.toLowerCase() === '.pdf';
      resumeKey = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      const { error: upErr } = await supabase.storage
        .from(RESUME_BUCKET)
        .upload(resumeKey, resumeAttachment.content, {
          contentType: isPdf
            ? 'application/pdf'
            : (req.file.mimetype || 'application/octet-stream'),
          upsert: false,
        });
      if (upErr) {
        console.error('[careers] resume storage upload failed:', upErr.message);
        resumeKey = null; // keep the application; email attachment still carries the file
      }
    }

    // Persist the application. A DB hiccup must not drop the applicant — the
    // team notification below carries full details + the resume attachment,
    // so the application survives even when this insert fails ("never lost",
    // mirrored from the leads flow).
    try {
      const { error } = await supabase.from('JobApplications').insert({
        fullName, email, phone, role,
        department: department || null,
        resumeName: resumeAttachment ? resumeAttachment.filename : null,
        resumePath: resumeKey,
        linkedIn:   linkedIn || null,
        coverNote:  coverNote || null,
        createdAt: now, updatedAt: now,
      });
      if (error) console.error('[careers] DB insert failed (application still emailed):', error.message);
    } catch (dbErr) {
      console.error('[careers] DB insert threw (application still emailed):', dbErr.message);
    }

    // Notify team + auto-reply to applicant. Await in serverless so Vercel does
    // not freeze the function before SMTP has a chance to complete.
    const emailResults = await Promise.allSettled([
      sendMail({
        to: process.env.EMAIL_TO || 'assist@arinox.ai',
        subject: `[Arinox Careers] New Application - ${role} from ${fullName}`,
        html: applicationNotification({
          fullName, email, phone, role, department,
          linkedIn, coverNote,
          resumeName: req.file ? req.file.originalname : null,
        }),
        attachments: resumeAttachment ? [resumeAttachment] : [],
        replyTo: email, // match the contact/lead flows: reply reaches the sender
      }),
      sendMail({
        to: email,
        subject: `Application received - ${role} at Arinox AI`,
        html: applicationAutoReply({ fullName, role }),
      }),
    ]);
    emailResults.forEach((r, i) => {
      if (r.status === 'rejected') {
        const label = i === 0 ? 'team-notify' : 'auto-reply';
        console.error(`Email error (application/${label}):`, r.reason?.responseCode ?? '', r.reason?.message ?? r.reason);
      }
    });

    res.status(201).json({ success: true, message: "Application submitted! We'll be in touch." });
  } catch (err) { next(err); }
};

module.exports = { upload, submitApplication };
