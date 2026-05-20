const path = require('path');
const fs = require('fs');
const multer = require('multer');
const JobApplication = require('../models/JobApplication');

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
    await JobApplication.create({
      fullName, email, phone, role, department: department || null,
      resumeName: req.file ? req.file.originalname : null,
      resumePath: req.file ? req.file.filename : null,
      linkedIn:   linkedIn || null,
      coverNote:  coverNote || null,
    });
    res.status(201).json({ success: true, message: 'Application submitted! We\'ll be in touch.' });
  } catch (err) { next(err); }
};

module.exports = { upload, submitApplication };
