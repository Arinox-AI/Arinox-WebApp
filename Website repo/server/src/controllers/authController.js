const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');
const https = require('https');
const User = require('../models/User');
const QRSession = require('../models/QRSession');

const QR_TTL = 5 * 60 * 1000; // 5 minutes

// In-memory store as fast cache / fallback
const qrMemStore = new Map();

const getQRSession = async (token) => {
  if (qrMemStore.has(token)) {
    const s = qrMemStore.get(token);
    if (Date.now() > s.expiresAt) { qrMemStore.delete(token); return null; }
    return s;
  }
  try {
    const s = await QRSession.findOne({ where: { token } });
    if (!s || new Date(s.expiresAt) < new Date()) return null;
    return s;
  } catch { return null; }
};

const setQRSession = async (token, data) => {
  const expiresAt = new Date(Date.now() + QR_TTL);
  const session = { token, ...data, expiresAt: expiresAt.getTime() };
  qrMemStore.set(token, session);
  try {
    await QRSession.upsert({ token, ...data, expiresAt });
  } catch { /* DB offline — mem store is fallback */ }
};

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const setAuthCookie = (res, token) => res.cookie('arinox_token', token, COOKIE_OPTS);

const register = async (req, res, next) => {
  try {
    const { name, email, password, company, phone } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: 'Name, email and password are required.' });

    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(409).json({ success: false, message: 'Email already registered.' });

    const user = await User.create({ name, email, password, company, phone });
    const token = signToken(user.id);
    setAuthCookie(res, token);
    res.status(201).json({
      success: true, token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) { next(err); }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password are required.' });

    const user = await User.findOne({ where: { email } });
    if (!user || !user.password || !(await user.comparePassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });

    user.lastLogin = new Date();
    user.loginMethod = 'password';
    await user.save();

    const token = signToken(user.id);
    setAuthCookie(res, token);
    res.json({
      success: true, token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) { next(err); }
};

const generateQR = async (req, res, next) => {
  try {
    const token = uuidv4();
    await setQRSession(token, { status: 'pending', userId: null, jwt: null });

    const baseUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const qrUrl = `${baseUrl}/auth/qr-scan/${token}`;

    const qrImage = await QRCode.toDataURL(qrUrl, {
      width: 280,
      margin: 2,
      color: { dark: '#FE6300', light: '#00000000' },
      errorCorrectionLevel: 'M',
    });

    res.json({ success: true, token, qrImage });
  } catch (err) { next(err); }
};

const checkQRStatus = async (req, res, next) => {
  try {
    const session = await getQRSession(req.params.token);
    if (!session)
      return res.status(404).json({ success: false, message: 'QR session expired. Please refresh.' });

    res.json({ success: true, status: session.status, jwt: session.jwt || null });
  } catch (err) { next(err); }
};

const confirmQRScan = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { email, password } = req.body;

    const session = await getQRSession(token);
    if (!session)
      return res.status(400).json({ success: false, message: 'QR session expired. Please refresh the QR code.' });

    const user = await User.findOne({ where: { email } });
    if (!user || !user.password || !(await user.comparePassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });

    const jwtToken = signToken(user.id);
    await setQRSession(token, { status: 'authenticated', userId: user.id, jwt: jwtToken });

    user.lastLogin = new Date();
    user.loginMethod = 'qr';
    await user.save().catch(() => {});

    const io = req.app.get('io');
    if (io) {
      io.to(token).emit('qr-authenticated', {
        token: jwtToken,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      });
    }

    res.json({ success: true, message: 'Login successful. Return to your browser.' });
  } catch (err) { next(err); }
};

const checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email required.' });
    const user = await User.findOne({ where: { email } });
    res.json({ success: true, exists: !!user });
  } catch (err) { next(err); }
};

const confirmQRWithJWT = async (req, res, next) => {
  try {
    const { token } = req.params;
    const session = await getQRSession(token);
    if (!session)
      return res.status(400).json({ success: false, message: 'QR session expired. Please refresh the QR code.' });

    const user = req.user;
    const jwtToken = signToken(user.id);
    await setQRSession(token, { status: 'authenticated', userId: user.id, jwt: jwtToken });

    user.lastLogin = new Date();
    user.loginMethod = 'qr';
    await user.save().catch(() => {});

    const io = req.app.get('io');
    if (io) {
      io.to(token).emit('qr-authenticated', {
        token: jwtToken,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      });
    }
    res.json({ success: true, message: 'Authenticated. Return to your browser.' });
  } catch (err) { next(err); }
};

const getMe = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json({ success: true, user });
  } catch (err) { next(err); }
};

// Verify Google access token by calling Google's userinfo endpoint
const getGoogleUser = (access_token) => new Promise((resolve, reject) => {
  https.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
    (res) => {
      let raw = '';
      res.on('data', (chunk) => { raw += chunk; });
      res.on('end', () => {
        try {
          const data = JSON.parse(raw);
          if (data.error) reject(new Error(data.error_description || 'Invalid token'));
          else resolve(data);
        } catch { reject(new Error('Failed to parse Google response')); }
      });
    }
  ).on('error', reject);
});

const googleAuth = async (req, res, next) => {
  try {
    const { access_token } = req.body;
    if (!access_token)
      return res.status(400).json({ success: false, message: 'Google access token missing.' });

    const { sub: googleId, email, name, picture } = await getGoogleUser(access_token);

    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({ name, email, googleId, avatar: picture, isVerified: true });
    } else if (!user.googleId) {
      user.googleId = googleId;
      if (!user.avatar) user.avatar = picture;
    }
    user.lastLogin = new Date();
    user.loginMethod = 'google';
    await user.save();

    const token = signToken(user.id);
    setAuthCookie(res, token);
    res.json({
      success: true, token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
    });
  } catch (err) { next(err); }
};

const logout = (req, res) => {
  res.clearCookie('arinox_token', COOKIE_OPTS);
  res.json({ success: true, message: 'Logged out.' });
};

// Called by the browser after QR socket event to get the cookie set
const setCookieFromToken = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ success: false, message: 'Token required.' });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    setAuthCookie(res, token);
    res.json({ success: true });
  } catch {
    res.status(401).json({ success: false, message: 'Invalid token.' });
  }
};

module.exports = { register, login, googleAuth, generateQR, checkQRStatus, confirmQRScan, confirmQRWithJWT, checkEmail, getMe, logout, setCookieFromToken };
