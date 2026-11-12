const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const { chatHandler, chatStreamHandler } = require('../controllers/chatController');
const { countHit } = require('../chat/store');

/* Chat is the most abusable endpoint on the site, so it gets its own limiters on
 * top of the global /api limiter. Generous enough for a real conversation,
 * tight enough to blunt scripted abuse.
 *
 * Two layers, because Vercel serverless instances share no memory:
 *   1. an in-process limiter - cheap, always on, but per-instance;
 *   2. a shared Supabase counter - one count across every instance. It fails
 *      open: if Supabase is unreachable (or the migration has not run) the
 *      in-process limiter alone applies. */
const WINDOW_SECONDS = 10 * 60;
const MAX_PER_WINDOW = Number(process.env.CHAT_RATE_MAX) || (process.env.NODE_ENV === 'development' ? 300 : 30);
const LIMIT_MESSAGE = "You've reached the chat limit for now. Please try again shortly, or email assist@arinox.ai.";

const chatLimiter = rateLimit({
  windowMs: WINDOW_SECONDS * 1000,
  max: MAX_PER_WINDOW,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: LIMIT_MESSAGE },
});

const sharedLimiter = async (req, res, next) => {
  const hits = await countHit(`chat:${req.ip}`, WINDOW_SECONDS);
  if (hits !== null && hits > MAX_PER_WINDOW) {
    res.set('Retry-After', String(WINDOW_SECONDS));
    return res.status(429).json({ message: LIMIT_MESSAGE });
  }
  return next();
};

router.post('/', chatLimiter, sharedLimiter, chatHandler);
router.post('/stream', chatLimiter, sharedLimiter, chatStreamHandler);

module.exports = router;
