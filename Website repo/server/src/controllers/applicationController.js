const path = require('path');
const fs = require('fs');
const multer = require('multer');
const supabase = require('../config/supabase');
const { sendMail, applicationNotification, applicationAutoReply } = require('../utils/mailer');

const uploadsDir = path.join(__dirname, '../../uploads/resumes');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
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

    const { error } = await supabase.from('JobApplications').insert({
      fullName, email, phone, role,
      department: department || null,
      resumeName: req.file ? req.file.originalname : null,
      resumePath: req.file ? req.file.filename : null,
      linkedIn:   linkedIn || null,
      coverNote:  coverNote || null,
      createdAt: now, updatedAt: now,
    });
    if (error) throw new Error(error.message);

    // Notify team + auto-reply to applicant
    Promise.allSettled([
      sendMail({
        to: process.env.EMAIL_TO || 'assist@arinox.ai',
        subject: `[Arinox Careers] New Application — ${role} from ${fullName}`,
        html: applicationNotification({
          fullName, email, phone, role, department,
          linkedIn, coverNote,
          resumeName: req.file ? req.file.originalname : null,
        }),
        attachments: req.file
          ? [{ filename: req.file.originalname, path: req.file.path }]
          : [],
      }),
      sendMail({
        to: email,
        subject: `Application received — ${role} at Arinox AI`,
        html: applicationAutoReply({ fullName, role }),
      }),
    ]).then(results => {
      results.forEach((r, i) => {
        if (r.status === 'rejected') {
          const label = i === 0 ? 'team-notify' : 'auto-reply';
          console.error(`Email error (application/${label}):`, r.reason?.responseCode ?? '', r.reason?.message ?? r.reason);
        }
      });
    });

    res.status(201).json({ success: true, message: "Application submitted! We'll be in touch." });
  } catch (err) { next(err); }
};

module.exports = { upload, submitApplication };
