import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth.jsx';
import GoogleButton from './GoogleButton';
import arinoxLogo from '../../assets/img.png';

const QRLoginModal = ({ isOpen, onClose, onSwitchToEmail }) => {
  const [qrImage, setQrImage] = useState(null);
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState('loading');
  const { login } = useAuth();
  const navigate = useNavigate();

  const fetchQR = useCallback(async () => {
    setStatus('loading');
    setQrImage(null);
    try {
      const { data } = await axios.get('/api/v1/auth/qr/generate');
      setQrImage(data.qrImage);
      setToken(data.token);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    fetchQR();
    return () => { setQrImage(null); setToken(null); setStatus('loading'); };
  }, [isOpen, fetchQR]);

  useEffect(() => {
    if (!token || !isOpen) return;
    const sock = io(window.location.origin, { transports: ['websocket', 'polling'] });
    sock.emit('join-qr-room', token);
    sock.on('qr-authenticated', ({ token: jwt, user }) => {
      setStatus('authenticated');
      login(jwt, user);
      // Persist token as httpOnly cookie for future page loads
      axios.post('/api/v1/auth/set-cookie', { token: jwt }).catch(() => {});
      toast.success(`Welcome back, ${user.name}!`);
      setTimeout(() => { onClose(); navigate('/'); }, 1200);
    });
    return () => sock.disconnect();
  }, [token, isOpen, login, onClose, navigate]);

  useEffect(() => {
    if (!token || status !== 'ready') return;
    const interval = setInterval(async () => {
      try {
        const { data } = await axios.get(`/api/v1/auth/qr/status/${token}`);
        if (data.status === 'scanned') setStatus('scanned');
        if (data.status === 'authenticated' && data.jwt) clearInterval(interval);
      } catch {}
    }, 2000);
    return () => clearInterval(interval);
  }, [token, status]);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(fetchQR, 4.5 * 60 * 1000);
    return () => clearTimeout(t);
  }, [isOpen, token, fetchQR]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-label="QR code sign in"
        >
          <div className="absolute inset-0 bg-brand-bg/85 backdrop-blur-2xl" />

          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            className="relative w-full max-w-xs bg-brand-card rounded-2xl p-5 text-center border border-brand-border shadow-2xl shadow-black/50 my-auto overflow-y-auto max-h-[90dvh]"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-10 h-10 rounded-lg flex items-center justify-center text-brand-muted hover:text-brand-text transition-colors text-xs"
            >
              ✕
            </button>

            {/* Logo + title */}
            <img
              src={arinoxLogo}
              alt="Arinox AI"
              className="h-7 w-auto object-contain mx-auto mb-3 drop-shadow-[0_0_8px_rgba(254,99,0,0.4)]"
            />
            <h2 className="text-base font-display font-bold text-brand-text mb-0.5">Sign In to Arinox</h2>
            <p className="text-[11px] text-brand-muted mb-3">Use your phone to scan the QR code and log in</p>

            {/* Sign-in badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-primary/15 border border-brand-primary/30 text-brand-primary text-[9px] font-bold uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
              QR Code Sign In
            </div>

            {/* Steps */}
            <div className="grid grid-cols-2 gap-1.5 mb-4 text-left">
              {[
                { n: '1', text: 'Open phone camera' },
                { n: '2', text: 'Scan the code below' },
                { n: '3', text: 'Approve on your phone' },
                { n: '4', text: 'This window logs in' },
              ].map(({ n, text }) => (
                <div key={n} className="flex items-center gap-1.5 bg-brand-surface rounded-lg p-2">
                  <span className="w-4 h-4 rounded-full bg-brand-primary/20 text-brand-primary text-[9px] font-bold flex items-center justify-center flex-shrink-0">{n}</span>
                  <span className="text-[10px] text-brand-muted leading-tight">{text}</span>
                </div>
              ))}
            </div>

            {/* QR Box */}
            <div className="relative mx-auto w-44 h-44 mb-3 rounded-xl overflow-hidden bg-black flex items-center justify-center">
              {status === 'loading' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-[10px] text-brand-muted">Generating QR...</span>
                </motion.div>
              )}

              {status === 'ready' && qrImage && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  src={qrImage}
                  alt="QR Login Code"
                  className="w-full h-full object-contain p-1.5"
                />
              )}

              {status === 'scanned' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="flex flex-col items-center gap-2 text-brand-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-9 h-9">
                    <rect x="5" y="2" width="14" height="20" rx="3" />
                    <circle cx="12" cy="18" r="1" fill="currentColor" />
                  </svg>
                  <span className="text-xs font-semibold">Scanned! Approve on phone</span>
                </motion.div>
              )}

              {status === 'authenticated' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="flex flex-col items-center gap-2 text-brand-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-9 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs font-semibold">Authenticated!</span>
                </motion.div>
              )}

              {status === 'error' && (
                <div className="flex flex-col items-center gap-2 text-red-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-9 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                  <span className="text-[10px]">Failed to generate QR</span>
                  <button onClick={fetchQR} className="text-[10px] text-brand-primary hover:underline font-semibold">Try again</button>
                </div>
              )}

              {/* Corner brackets */}
              {(status === 'ready' || status === 'loading') && (
                <>
                  {[
                    'top-0 left-0 border-t-2 border-l-2 rounded-tl-lg',
                    'top-0 right-0 border-t-2 border-r-2 rounded-tr-lg',
                    'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg',
                    'bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg',
                  ].map((cls, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.25 }}
                      className={`absolute w-5 h-5 border-brand-primary ${cls}`}
                    />
                  ))}
                </>
              )}
            </div>

            {status === 'ready' && (
              <button onClick={fetchQR} className="text-[10px] text-brand-primary hover:text-orange-400 transition-colors font-medium">
                ↻ Refresh QR
              </button>
            )}

            {/* Email / Google fallback */}
            {onSwitchToEmail && (
              <div className="mt-4 pt-4 border-t border-brand-border space-y-2">
                {import.meta.env.VITE_GOOGLE_CLIENT_ID && (
                  <GoogleButton
                    onSuccess={onClose}
                    label="Continue with Google"
                    onNotFound={(googleUser) => { onClose(); onSwitchToEmail?.(googleUser); }}
                  />
                )}
                <button
                  onClick={() => { onClose(); onSwitchToEmail(); }}
                  className="w-full py-2 rounded-xl border border-brand-border text-brand-muted text-xs font-medium hover:border-brand-primary hover:text-brand-text transition-all"
                >
                  Sign in with email instead
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QRLoginModal;
