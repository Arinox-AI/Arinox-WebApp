const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const { recordConsent } = require('../controllers/consentController');

const consentLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 30, standardHeaders: true, legacyHeaders: false, message: { success: false, message: 'Too many requests.' } });

router.post('/', consentLimiter, recordConsent);

module.exports = router;
