const router = require('express').Router();
const {
  register, login, googleAuth,
  checkEmail, getMe, logout, setCookieFromToken,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.post('/logout', logout);
router.post('/check-email', checkEmail);
router.post('/set-cookie', setCookieFromToken);
router.get('/me', protect, getMe);

module.exports = router;
