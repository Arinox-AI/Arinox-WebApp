import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import arinoxLogo from '../../assets/img.png';
import { nav, company } from '../../data/site';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-brand-bg/92 backdrop-blur-xl border-b border-brand-border shadow-[0_1px_0_rgba(221,216,207,0.6)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide flex items-center justify-between h-16 md:h-[72px]">
        <Link to="/" aria-label="Arinox AI home" className="flex items-center shrink-0">
          <img src={arinoxLogo} alt="Arinox AI" className="h-6 md:h-7 w-auto object-contain" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {nav.map(({ label, to }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  active ? 'text-brand-primary' : 'text-brand-muted hover:text-brand-text hover:bg-black/[0.04]'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/contact" className="btn btn-primary !py-2.5 !px-5 !text-[13px]">
            Start the conversation
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden p-2 -mr-2 text-brand-text"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <div className="w-5 flex flex-col gap-1.5">
            <motion.span animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="block h-[2px] bg-current rounded-full" />
            <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block h-[2px] bg-current rounded-full" />
            <motion.span animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="block h-[2px] bg-current rounded-full" />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-brand-border bg-brand-bg"
          >
            <div className="container-wide py-4 flex flex-col">
              {nav.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`py-3 px-2 text-[15px] font-medium border-b border-brand-border/60 ${
                    location.pathname === to ? 'text-brand-primary' : 'text-brand-text'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link to="/contact" className="btn btn-primary w-full mt-4">
                Start the conversation
              </Link>
              <p className="text-xs text-brand-subtle mt-4 text-center">{company.email}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
