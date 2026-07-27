const router = require('express').Router();
const {
  register, login, googleAuth,
  generateQR, checkQRStatus, confirmQRScan, confirmQRWithJWT,
  checkEmail, getMe, logout, setCookieFromToken,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.post('/logout', logout);
router.post('/check-email', checkEmail);
router.post('/set-cookie', setCookieFromToken);
router.get('/qr/generate', generateQR);
router.get('/qr/status/:token', checkQRStatus);
router.post('/qr/confirm/:token', confirmQRScan);
router.post('/qr/confirm-with-jwt/:token', protect, confirmQRWithJWT);
router.get('/me', protect, getMe);

module.exports = router;
