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
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-brand-bg/95 backdrop-blur-md border-b border-brand-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-wide flex items-center justify-between h-16">
        <Link to="/" aria-label="Arinox AI home" className="flex items-center shrink-0">
          <img src={arinoxLogo} alt="Arinox AI" className="h-5 w-auto object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {nav.map(({ label, to }) => {
            const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                className={`text-[13.5px] transition-colors duration-200 ${
                  active ? 'text-brand-primary' : 'text-brand-muted hover:text-brand-text'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link to="/contact" className="arrow-link">
            Talk to us <span aria-hidden="true">→</span>
          </Link>
        </div>

        <button
          className="lg:hidden p-2 -mr-2 text-brand-text"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <div className="w-5 flex flex-col gap-1.5">
            <motion.span animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="block h-[1.5px] bg-current rounded-full" />
            <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block h-[1.5px] bg-current rounded-full" />
            <motion.span animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="block h-[1.5px] bg-current rounded-full" />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-brand-border bg-brand-bg"
          >
            <div className="container-wide py-4 flex flex-col">
              {nav.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`py-3.5 text-[15px] border-b border-brand-border ${
                    location.pathname === to ? 'text-brand-primary' : 'text-brand-text'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link to="/contact" className="btn btn-primary mt-5 w-full">
                Talk to us
              </Link>
              <p className="mono text-brand-subtle mt-4 text-center">{company.email}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
