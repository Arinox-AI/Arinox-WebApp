const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const supabase = require('../config/supabase');

const findUserBy = async (field, value) => {
  const { data } = await supabase.from('Users').select('*').eq(field, value).maybeSingle();
  return data;
};

const updateUser = async (id, fields) => {
  const { data } = await supabase
    .from('Users')
    .update({ ...fields, updatedAt: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  return data;
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

    const existing = await findUserBy('email', email);
    if (existing)
      return res.status(409).json({ success: false, message: 'Email already registered.' });

    const hashed = await bcrypt.hash(password, 12);
    const now = new Date().toISOString();
    const { data: user, error } = await supabase
      .from('Users')
      .insert({ name, email, password: hashed, company, phone, createdAt: now, updatedAt: now })
      .select()
      .single();
    if (error) throw new Error(error.message);

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

    const user = await findUserBy('email', email);
    if (!user || !user.password || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });

    await updateUser(user.id, { lastLogin: new Date().toISOString(), loginMethod: 'password' });

    const token = signToken(user.id);
    setAuthCookie(res, token);
    res.json({
      success: true, token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) { next(err); }
};

const checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email required.' });
    const user = await findUserBy('email', email);
    res.json({ success: true, exists: !!user });
  } catch (err) { next(err); }
};

const getMe = async (req, res, next) => {
  try {
    const { data: user } = await supabase.from('Users').select('id, name, email, company, phone, role, createdAt, updatedAt, lastLogin, loginMethod').eq('id', req.user.id).maybeSingle();
    res.json({ success: true, user });
  } catch (err) { next(err); }
};

const logout = (req, res) => {
  res.clearCookie('arinox_token', COOKIE_OPTS);
  res.json({ success: true, message: 'Logged out.' });
};

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

module.exports = { register, login, checkEmail, getMe, logout, setCookieFromToken };
