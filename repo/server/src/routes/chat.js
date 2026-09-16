const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const { chatHandler, chatStreamHandler } = require('../controllers/chatController');

/* Chat is the most abusable endpoint on the site, so it gets its own limiter on
 * top of the global /api limiter. Generous enough for a real conversation,
 * tight enough to blunt scripted abuse. */
const chatLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: process.env.NODE_ENV === 'development' ? 300 : 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "You've reached the chat limit for now. Please try again shortly, or email assist@arinox.ai." },
});

router.post('/', chatLimiter, chatHandler);
router.post('/stream', chatLimiter, chatStreamHandler);

module.exports = router;
