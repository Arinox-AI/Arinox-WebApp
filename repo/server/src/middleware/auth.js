const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

const protect = async (req, res, next) => {
  try {
    let token = req.cookies?.arinox_token;
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token)
      return res.status(401).json({ success: false, message: 'Not authenticated.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { data: user } = await supabase.from('Users').select('id, name, email, company, phone, role, createdAt, updatedAt, lastLogin, loginMethod').eq('id', decoded.id).maybeSingle();
    if (!user) return res.status(401).json({ success: false, message: 'User no longer exists.' });

    req.user = user;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role))
    return res.status(403).json({ success: false, message: 'Access denied.' });
  next();
};

module.exports = { protect, restrictTo };
