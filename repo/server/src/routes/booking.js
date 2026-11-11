const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const { getAvailability, createBooking } = require('../controllers/bookingController');
const { requireHuman } = require('../utils/humans');

// Tighter than the global /api limiter: a real visitor books once or twice.
const bookLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 10 : 500,
  message: { success: false, message: 'Too many booking attempts. Please try again later.' },
});

router.get('/availability', getAvailability);
router.post('/', bookLimiter, requireHuman(), createBooking);

module.exports = router;
