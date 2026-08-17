const path = require('path');
const multer = require('multer');
const supabase = require('../config/supabase');
const { sendMail, applicationNotification, applicationAutoReply } = require('../utils/mailer');
const { resumeToPdf } = require('../utils/resumeToPdf');

const RESUME_BUCKET = 'resumes';

// In-memory storage: the file buffer is uploaded to Supabase Storage AND
// attached to the notification email — no reliance on ephemeral local disk.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx'];
    if (allowed.includes(path.extname(file.originalname).toLowerCase())) cb(null, true);
    else cb(new Error('Only PDF, DOC, or DOCX files are accepted.'));
  },
});

const submitApplication = async (req, res, next) => {
  try {
    const { fullName, email, phone, role, department, linkedIn, coverNote } = req.body;
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

    const { error } = await supabase.from('JobApplications').insert({
      fullName, email, phone, role,
      department: department || null,
      resumeName: resumeAttachment ? resumeAttachment.filename : null,
      resumePath: resumeKey,
      linkedIn:   linkedIn || null,
      coverNote:  coverNote || null,
      createdAt: now, updatedAt: now,
    });
    if (error) throw new Error(error.message);

    // Notify team + auto-reply to applicant. Await in serverless so Vercel does
    // not freeze the function before SMTP has a chance to complete.
    const emailResults = await Promise.allSettled([
      sendMail({
        to: process.env.EMAIL_TO || 'assist@arinox.ai',
        subject: `[Arinox Careers] New Application — ${role} from ${fullName}`,
        html: applicationNotification({
          fullName, email, phone, role, department,
          linkedIn, coverNote,
          resumeName: req.file ? req.file.originalname : null,
        }),
        attachments: resumeAttachment ? [resumeAttachment] : [],
      }),
      sendMail({
        to: email,
        subject: `Application received — ${role} at Arinox AI`,
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
