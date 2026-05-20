import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth.jsx';
import { useTheme } from '../../context/ThemeContext';
import AuthModal from '../ui/AuthModal';
import QRLoginModal from '../ui/QRLoginModal';

const navLinks = [
  { label: 'About', to: '/' },
  { label: 'CommandCore', to: '/commandcore' },
  { label: 'Partners', to: '/partners' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Blog', to: '/blog' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const userMenuRef = useRef(null);
  const userMenuPortalRef = useRef(null);
  const { user, logout } = useAuth();
  const { theme, toggle: toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setShowUserMenu(false); }, [location]);

  useEffect(() => {
    const handler = (e) => {
      const inTrigger = userMenuRef.current?.contains(e.target);
      const inPortal = userMenuPortalRef.current?.contains(e.target);
      if (!inTrigger && !inPortal) setShowUserMenu(false);
    };
    if (showUserMenu) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showUserMenu]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-brand-bg/90 backdrop-blur-2xl border-b border-brand-border shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="container-wide flex items-center justify-between h-16">
          {/* Logo only */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Arinox AI"
              className="h-6 w-auto object-contain drop-shadow-[0_0_8px_rgba(254,99,0,0.4)]"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ label, to }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`px-3 py-1.5 text-[15px] font-medium transition-colors duration-200 ${
                    active ? 'text-brand-primary' : 'text-brand-muted hover:text-brand-primary'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Auth + Theme toggle */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-brand-muted hover:text-brand-primary border border-transparent hover:border-brand-border transition-all duration-200"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            {user ? (
              <div ref={userMenuRef}>
                <button
                  onClick={() => {
                    if (!showUserMenu && userMenuRef.current) {
                      const r = userMenuRef.current.getBoundingClientRect();
                      setMenuPos({ top: r.bottom + 8, right: window.innerWidth - r.right });
                    }
                    setShowUserMenu((v) => !v);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-brand-border hover:border-brand-primary text-sm transition-all duration-200"
                >
                  <span className="w-6 h-6 rounded-full bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center text-brand-primary text-[11px] font-bold flex-shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-white font-medium">{user.name.split(' ')[0]}</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-brand-muted">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && createPortal(
                  <div
                    ref={userMenuPortalRef}
                    style={{ position: 'fixed', top: menuPos.top, right: menuPos.right, zIndex: 99999 }}
                    className="w-44 bg-brand-card border border-brand-border rounded-xl shadow-2xl shadow-black/60 overflow-hidden"
                  >
                    <div className="px-3 py-2.5 border-b border-brand-border">
                      <p className="text-[11px] text-brand-muted truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { logout(); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-brand-muted hover:text-white hover:bg-brand-surface transition-colors text-left"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Logout
                    </button>
                  </div>,
                  document.body
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowQR(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary/10 border border-brand-primary/50 text-brand-primary font-semibold hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all duration-200"
              >
                <span className="text-[13px]">Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden p-2 text-brand-muted hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <motion.span animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="block h-0.5 bg-current rounded-full" />
              <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block h-0.5 bg-current rounded-full" />
              <motion.span animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="block h-0.5 bg-current rounded-full" />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden bg-brand-bg/95 backdrop-blur-2xl border-t border-brand-border"
            >
              <div className="container-wide py-5 flex flex-col gap-1">
                {navLinks.map(({ label, to }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      to={to}
                      className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                        location.pathname === to ? 'text-brand-primary' : 'text-brand-muted hover:text-brand-primary'
                      }`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-3 mt-2 border-t border-brand-border flex items-center justify-between">
                  <button
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-brand-muted hover:text-brand-primary text-xs font-medium transition-colors"
                  >
                    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                    <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
                  </button>
                </div>
                <div className="pt-2">
                  {user ? (
                    <div className="space-y-2">
                      <p className="text-sm text-brand-muted px-1">
                        Hi, <span className="text-white font-medium">{user.name.split(' ')[0]}</span>
                      </p>
                      <button
                        onClick={() => { logout(); setMobileOpen(false); }}
                        className="w-full py-2.5 rounded-xl border border-brand-border text-brand-muted text-sm font-semibold hover:border-brand-primary hover:text-white transition-all"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setShowQR(true); setMobileOpen(false); }}
                      className="w-full py-2.5 rounded-xl border border-brand-primary/40 text-brand-primary text-sm font-semibold hover:bg-brand-primary/8 transition-all"
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <QRLoginModal
        isOpen={showQR}
        onClose={() => setShowQR(false)}
        onSwitchToEmail={() => setShowAuth(true)}
      />
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSwitchToQR={() => { setShowAuth(false); setShowQR(true); }}
      />
    </>
  );
};

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const QRIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="3" height="3" />
    <rect x="19" y="14" width="2" height="2" />
    <rect x="14" y="19" width="2" height="2" />
    <rect x="19" y="19" width="2" height="2" />
  </svg>
);

export default Navbar;
