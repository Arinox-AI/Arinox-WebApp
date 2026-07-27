import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth.jsx';
import arinoxLogo from '../assets/img.png';

// stage: 'resolving' | 'email' | 'login' | 'register' | 'done'
const QRScanPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [stage, setStage] = useState('resolving');
  const [email, setEmail] = useState('');
  const [form, setForm] = useState({ name: '', password: '' });
  const [loading, setLoading] = useState(false);
  const autoAttempted = useRef(false);

  useEffect(() => {
    if (authLoading) return;
    if (user && !autoAttempted.current) {
      autoAttempted.current = true;
      axios.post(`/api/v1/auth/qr/confirm-with-jwt/${token}`)
        .then(() => setStage('done'))
        .catch(() => {
          toast.error('QR session expired. Please refresh the QR code on your computer.');
          setStage('email');
        });
    } else if (!user) {
      setStage('email');
    }
  }, [user, authLoading, token]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const { data } = await axios.post('/api/v1/auth/check-email', { email });
      setStage(data.exists ? 'login' : 'register');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`/api/v1/auth/qr/confirm/${token}`, { email, password: form.password });
      setStage('done');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error('Name is required.');
    setLoading(true);
    try {
      await axios.post('/api/v1/auth/register', { name: form.name, email, password: form.password });
      await axios.post(`/api/v1/auth/qr/confirm/${token}`, { email, password: form.password });
      setStage('done');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl bg-brand-surface border border-brand-border text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors';
  const btnClass =
    'w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50';

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center p-5" style={{ cursor: 'auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-xs bg-brand-card border border-brand-border rounded-2xl p-6 text-center shadow-2xl shadow-black/40"
      >
        <button
          onClick={() => navigate('/')}
          className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-brand-muted hover:text-white transition-colors text-xs"
          title="Back to home"
        >
          ✕
        </button>

        <img
          src={arinoxLogo}
          alt="Arinox AI"
          className="h-7 w-auto object-contain mx-auto mb-4 drop-shadow-[0_0_8px_rgba(254,99,0,0.4)]"
        />

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-primary/15 border border-brand-primary/30 text-brand-primary text-[11px] font-bold uppercase tracking-widest mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
          QR Code Sign In
        </div>

        <AnimatePresence mode="wait">
          {stage === 'resolving' && (
            <motion.div
              key="resolving"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-4"
            >
              <div className="w-10 h-10 border-2 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-brand-muted text-xs">Verifying your session…</p>
            </motion.div>
          )}

          {stage === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <div className="w-14 h-14 rounded-full bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-brand-primary" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-white font-bold text-lg mb-1">Authenticated!</h1>
              <p className="text-brand-muted text-xs leading-relaxed">
                Your browser session is now logged in.<br />You can close this tab.
              </p>
            </motion.div>
          )}

          {stage === 'email' && (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-brand-muted text-xs mb-4 leading-relaxed">
                Enter your email to continue.
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-3 text-left">
                <input
                  type="email"
                  placeholder="Work Email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Work Email"
                  autoComplete="email"
                  className={inputClass}
                />
                <button type="submit" disabled={loading} className={btnClass}>
                  {loading ? 'Checking…' : 'Continue →'}
                </button>
              </form>
            </motion.div>
          )}

          {stage === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-brand-muted text-xs mb-4 leading-relaxed">
                Welcome back! Enter your password.
              </p>
              <form onSubmit={handleLoginSubmit} className="space-y-3 text-left">
                <div className="px-3 py-2 rounded-xl bg-brand-surface/50 border border-brand-border text-brand-muted text-xs flex items-center justify-between">
                  <span className="truncate">{email}</span>
                  <button
                    type="button"
                    onClick={() => setStage('email')}
                    className="text-brand-primary hover:underline text-xs ml-2 flex-shrink-0 py-1 px-2"
                  >
                    Change
                  </button>
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  minLength={6}
                  autoFocus
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  aria-label="Password"
                  autoComplete="current-password"
                  className={inputClass}
                />
                <button type="submit" disabled={loading} className={btnClass}>
                  {loading ? 'Signing in…' : 'Sign In →'}
                </button>
              </form>
            </motion.div>
          )}

          {stage === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-brand-muted text-xs mb-4 leading-relaxed">
                No account found. Create one to continue.
              </p>
              <form onSubmit={handleRegisterSubmit} className="space-y-3 text-left">
                <div className="px-3 py-2 rounded-xl bg-brand-surface/50 border border-brand-border text-brand-muted text-xs flex items-center justify-between">
                  <span className="truncate">{email}</span>
                  <button
                    type="button"
                    onClick={() => setStage('email')}
                    className="text-brand-primary hover:underline text-xs ml-2 flex-shrink-0 py-1 px-2"
                  >
                    Change
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  autoFocus
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  aria-label="Full Name"
                  autoComplete="name"
                  className={inputClass}
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  aria-label="Password (minimum 6 characters)"
                  autoComplete="new-password"
                  className={inputClass}
                />
                <button type="submit" disabled={loading} className={btnClass}>
                  {loading ? 'Creating account…' : 'Create Account & Sign In →'}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {stage !== 'resolving' && stage !== 'done' && (
          <button
            onClick={() => navigate('/')}
            className="mt-5 text-xs text-brand-muted hover:text-white transition-colors py-2 px-3"
          >
            ← Cancel and go back
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default QRScanPage;
