import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'arinox_cookie_consent';

const defaultPrefs = {
  necessary: true,   // always on
  analytics: false,
  marketing: false,
};

const categories = [
  {
    key: 'necessary',
    label: 'Necessary',
    description: 'Required for the site to function — authentication, security, session management. Cannot be disabled.',
    locked: true,
  },
  {
    key: 'analytics',
    label: 'Analytics',
    description: 'Help us understand how visitors use the site so we can improve performance and content.',
    locked: false,
  },
  {
    key: 'marketing',
    label: 'Marketing',
    description: 'Used to personalise ads and measure the effectiveness of our campaigns.',
    locked: false,
  },
];

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [prefs, setPrefs] = useState(defaultPrefs);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) setTimeout(() => setVisible(true), 800);
  }, []);

  const save = (newPrefs) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...newPrefs, savedAt: Date.now() }));
    setVisible(false);
    setShowManage(false);
  };

  const acceptAll  = () => save({ necessary: true, analytics: true, marketing: true });
  const rejectAll  = () => save({ necessary: true, analytics: false, marketing: false });
  const saveCustom = () => save(prefs);

  const toggle = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Manage Preferences panel */}
          <AnimatePresence>
            {showManage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-4"
                onClick={(e) => e.target === e.currentTarget && setShowManage(false)}
              >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.96 }}
                  transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                  className="relative w-full max-w-md bg-brand-card border border-brand-border rounded-2xl p-6 shadow-2xl shadow-black/60 z-10"
                >
                  <button
                    onClick={() => setShowManage(false)}
                    className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center text-brand-muted hover:text-white transition-colors text-xs"
                  >
                    ✕
                  </button>

                  <div className="flex items-center gap-2.5 mb-1">
                    <CookieIcon />
                    <h2 className="text-white font-display font-bold text-base">Cookie Preferences</h2>
                  </div>
                  <p className="text-brand-muted text-xs mb-5 leading-relaxed">
                    Choose which cookies you allow. Necessary cookies are always active and keep the site running securely.
                  </p>

                  <div className="space-y-3 mb-6">
                    {categories.map(({ key, label, description, locked }) => (
                      <div key={key} className="flex items-start gap-3 p-3.5 rounded-xl bg-brand-surface border border-brand-border">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white mb-0.5">{label}</p>
                          <p className="text-[11px] text-brand-muted leading-relaxed">{description}</p>
                        </div>
                        <button
                          onClick={() => !locked && toggle(key)}
                          disabled={locked}
                          className={`flex-shrink-0 mt-0.5 w-9 h-5 rounded-full transition-all duration-200 relative ${
                            prefs[key] ? 'bg-brand-primary' : 'bg-brand-border'
                          } ${locked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                          aria-label={`Toggle ${label}`}
                        >
                          <span
                            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
                              prefs[key] ? 'left-4' : 'left-0.5'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2.5">
                    <button
                      onClick={rejectAll}
                      className="flex-1 py-2.5 rounded-xl border border-brand-border text-brand-muted text-xs font-semibold hover:border-brand-primary hover:text-white transition-all"
                    >
                      Reject All
                    </button>
                    <button
                      onClick={saveCustom}
                      className="flex-1 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                    >
                      Save Preferences
                    </button>
                    <button
                      onClick={acceptAll}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-xs font-bold hover:opacity-90 transition-opacity"
                    >
                      Accept All
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom banner */}
          {!showManage && (
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 80 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280, delay: 0.1 }}
              className="fixed bottom-4 left-4 right-4 z-[250] max-w-2xl mx-auto"
            >
              <div className="bg-brand-card border border-brand-border rounded-2xl p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <CookieIcon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold mb-0.5">We use cookies</p>
                    <p className="text-brand-muted text-xs leading-relaxed">
                      We use cookies to improve your experience, analyse site traffic, and personalise content. You can manage your preferences at any time.{' '}
                      <a href="/privacy" className="text-brand-primary hover:underline">Privacy Policy</a>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3.5">
                  <button
                    onClick={() => setShowManage(true)}
                    className="px-3.5 py-2 rounded-lg border border-brand-border text-brand-muted text-xs font-medium hover:border-brand-primary hover:text-white transition-all"
                  >
                    Manage Preferences
                  </button>
                  <button
                    onClick={rejectAll}
                    className="px-3.5 py-2 rounded-lg border border-brand-border text-brand-muted text-xs font-medium hover:border-brand-primary hover:text-white transition-all"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-3.5 py-2 rounded-lg bg-brand-primary text-white text-xs font-bold hover:opacity-90 transition-opacity"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

const CookieIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-brand-primary flex-shrink-0">
    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
    <path d="M8.5 8.5v.01M16 15.5v.01M12 12v.01" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export default CookieBanner;
