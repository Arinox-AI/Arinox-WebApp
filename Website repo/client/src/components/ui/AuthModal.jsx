import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth.jsx';
import GoogleButton from './GoogleButton';
import arinoxLogo from '../../assets/img.png';

const INPUT = 'w-full px-4 py-2.5 rounded-xl bg-brand-surface border border-brand-border text-brand-text placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors';
const BTN_PRIMARY = 'w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50';

const AuthModal = ({ isOpen, onClose, onSwitchToQR, defaultMode = 'login', pendingGoogleUser = null }) => {
  const [mode, setMode] = useState(defaultMode);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  // When set, user came via Google but wasn't found — show signup form
  const [googlePending, setGooglePending] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Reset every time the modal opens; if pendingGoogleUser is passed, pre-fill signup form
  useEffect(() => {
    if (isOpen) {
      if (pendingGoogleUser) {
        setGooglePending(pendingGoogleUser);
        setForm({ name: pendingGoogleUser.name, email: pendingGoogleUser.email, password: '' });
      } else {
        setMode(defaultMode);
        setForm({ name: '', email: '', password: '' });
        setGooglePending(null);
      }
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleClose = () => {
    setForm({ name: '', email: '', password: '' });
    setMode(defaultMode);
    setGooglePending(null);
    onClose();
  };

  // Called by GoogleButton when server returns USER_NOT_FOUND
  const handleGoogleNotFound = (googleUser) => {
    setGooglePending(googleUser); // { name, email, picture }
    setForm({ name: googleUser.name, email: googleUser.email, password: '' });
    // googlePending being set is what drives showing the signup form — mode is secondary
    setMode('register');
  };

  // googlePending being truthy means: show signup form regardless of mode state
  const isSignup = mode === 'register' || !!googlePending;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignup) {
        await axios.post('/api/v1/auth/register', {
          name: form.name,
          email: form.email,
          password: form.password,
        });
        const { data } = await axios.post('/api/v1/auth/login', {
          email: form.email,
          password: form.password,
        });
        login(data.token, data.user);
        toast.success(`Welcome to Arinox, ${data.user.name.split(' ')[0]}!`);
        handleClose();
        navigate('/');
        return;
      }

      // Login flow: check if email exists first
      const { data: emailCheck } = await axios.post('/api/v1/auth/check-email', { email: form.email });
      if (!emailCheck.exists) {
        setMode('register');
        setForm(f => ({ name: '', email: f.email, password: '' }));
        toast('No account found — create one below!', { icon: '👋' });
        return;
      }

      const { data } = await axios.post('/api/v1/auth/login', {
        email: form.email,
        password: form.password,
      });
      login(data.token, data.user);
      toast.success(`Welcome back, ${data.user.name.split(' ')[0]}!`);
      handleClose();
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const hasGoogle = !!import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <div className="absolute inset-0 bg-brand-bg/85 backdrop-blur-2xl" />

          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            className="relative w-full max-w-xs bg-brand-card rounded-2xl p-4 sm:p-5 text-center border border-brand-border shadow-2xl shadow-black/30 overflow-y-auto max-h-[90dvh]"
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-brand-muted hover:text-brand-text transition-colors text-xs"
            >✕</button>

            <img
              src={arinoxLogo}
              alt="Arinox AI"
              className="h-7 w-auto object-contain mx-auto mb-3 drop-shadow-[0_0_8px_rgba(254,99,0,0.4)]"
            />

            <h2 className="text-base font-display font-bold text-brand-text mb-1">
              {isSignup ? 'Create your account' : 'Sign in to Arinox'}
            </h2>

            {/* Google not-found notice */}
            {googlePending ? (
              <p className="text-[11px] text-brand-muted mb-4">
                No Arinox account for <span className="text-brand-text font-medium">{googlePending.email}</span>.
                Set a password to complete signup.
              </p>
            ) : (
              <p className="text-[11px] text-brand-muted mb-4">
                {isSignup ? (
                  <span>
                    Already have an account?{' '}
                    <button
                      onClick={() => { setMode('login'); setForm(f => ({ ...f, name: '', password: '' })); }}
                      className="text-brand-primary hover:underline font-medium"
                    >Sign in</button>
                  </span>
                ) : (
                  <span>
                    Don't have an account?{' '}
                    <button
                      onClick={() => { setMode('register'); setForm(f => ({ ...f, name: '', password: '' })); }}
                      className="text-brand-primary hover:underline font-medium"
                    >Sign up</button>
                  </span>
                )}
              </p>
            )}

            {/* Google button — hide it once we're in the google-pending signup step */}
            {hasGoogle && !googlePending && (
              <>
                <GoogleButton
                  onSuccess={handleClose}
                  onNotFound={handleGoogleNotFound}
                  label={isSignup ? 'Sign up with Google' : 'Continue with Google'}
                />
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-brand-border" />
                  <span className="text-[10px] text-brand-muted uppercase tracking-widest">or</span>
                  <div className="flex-1 h-px bg-brand-border" />
                </div>
              </>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              <AnimatePresence initial={false}>
                {isSignup && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={form.name}
                      onChange={set('name')}
                      readOnly={!!googlePending}
                      className={googlePending
                        ? 'w-full px-4 py-2.5 rounded-xl bg-brand-surface/50 border border-brand-border text-brand-muted text-sm cursor-not-allowed'
                        : INPUT}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <input
                type="email"
                placeholder="Email address"
                required
                value={form.email}
                onChange={set('email')}
                readOnly={!!googlePending}
                className={googlePending
                  ? 'w-full px-4 py-2.5 rounded-xl bg-brand-surface/50 border border-brand-border text-brand-muted text-sm cursor-not-allowed'
                  : INPUT}
              />

              <AnimatePresence initial={false}>
                {(isSignup || form.email) && (
                  <motion.div
                    key="password"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="password"
                      placeholder={googlePending ? 'Create a password for your account' : 'Password'}
                      required
                      minLength={6}
                      value={form.password}
                      onChange={set('password')}
                      className={INPUT}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <button type="submit" disabled={loading} className={BTN_PRIMARY}>
                {loading
                  ? (isSignup ? 'Creating account…' : 'Signing in…')
                  : (isSignup ? 'Create Account →' : 'Continue →')}
              </button>
            </form>

            {onSwitchToQR && (
              <div className="mt-4 pt-3 border-t border-brand-border">
                <button
                  onClick={() => { handleClose(); onSwitchToQR(); }}
                  className="flex items-center justify-center gap-1.5 w-full text-[11px] text-brand-muted hover:text-brand-primary transition-colors"
                >
                  <QRIcon /> Sign in with QR code instead
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const QRIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="3" height="3" />
    <rect x="19" y="14" width="2" height="2" />
    <rect x="14" y="19" width="2" height="2" />
    <rect x="19" y="19" width="2" height="2" />
  </svg>
);

export default AuthModal;
