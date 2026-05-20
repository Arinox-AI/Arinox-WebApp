import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth.jsx';
import GoogleButton from './GoogleButton';

const AuthModal = ({ isOpen, onClose, onSwitchToQR }) => {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleClose = () => {
    setForm({ name: '', email: '', password: '' });
    setMode('login');
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'register') {
        await axios.post('/api/v1/auth/register', {
          name: form.name,
          email: form.email,
          password: form.password,
        });
        toast.success('Account created! Please sign in.');
        setMode('login');
        setForm((f) => ({ ...f, name: '', password: '' }));
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <div className="absolute inset-0 bg-brand-bg/85 backdrop-blur-2xl" />

          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            className="relative w-full max-w-xs bg-brand-card rounded-2xl p-5 text-center border border-brand-border shadow-2xl shadow-black/50"
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-brand-muted hover:text-white transition-colors text-xs"
            >
              ✕
            </button>

            {/* Logo */}
            <img
              src="/logo.png"
              alt="Arinox AI"
              className="h-8 w-auto object-contain mx-auto mb-3 drop-shadow-[0_0_8px_rgba(254,99,0,0.4)]"
            />
            <h2 className="text-base font-display font-bold text-white mb-4">
              {mode === 'login' ? 'Sign In to Arinox' : 'Create Your Account'}
            </h2>

            {/* Tabs */}
            <div className="flex rounded-xl overflow-hidden border border-brand-border mb-5">
              {[['login', 'Sign In'], ['register', 'Register']].map(([m, label]) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2 text-xs font-semibold transition-all ${
                    mode === m ? 'bg-brand-primary text-white' : 'text-brand-muted hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              <AnimatePresence initial={false}>
                {mode === 'register' && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={form.name}
                      onChange={set('name')}
                      className="w-full px-4 py-2.5 rounded-xl bg-brand-surface border border-brand-border text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <input
                type="email"
                placeholder="Email Address"
                required
                value={form.email}
                onChange={set('email')}
                className="w-full px-4 py-2.5 rounded-xl bg-brand-surface border border-brand-border text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors"
              />
              <input
                type="password"
                placeholder="Password"
                required
                minLength={6}
                value={form.password}
                onChange={set('password')}
                className="w-full px-4 py-2.5 rounded-xl bg-brand-surface border border-brand-border text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading
                  ? (mode === 'register' ? 'Creating account…' : 'Signing in…')
                  : (mode === 'register' ? 'Create Account →' : 'Sign In →')}
              </button>
            </form>

            {import.meta.env.VITE_GOOGLE_CLIENT_ID && (
              <>
                <div className="flex items-center gap-3 my-1">
                  <div className="flex-1 h-px bg-brand-border" />
                  <span className="text-[10px] text-brand-muted uppercase tracking-widest">or</span>
                  <div className="flex-1 h-px bg-brand-border" />
                </div>
                <GoogleButton onSuccess={handleClose} />
              </>
            )}

            {/* QR option */}
            <div className="mt-3 pt-3 border-t border-brand-border">
              <button
                onClick={() => { handleClose(); onSwitchToQR(); }}
                className="flex items-center justify-center gap-1.5 w-full text-[11px] text-brand-muted hover:text-brand-primary transition-colors"
              >
                <QRIcon /> Sign in with QR code instead
              </button>
            </div>
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
