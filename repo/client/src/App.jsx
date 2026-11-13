import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { Nav } from './components/site/Nav';
import { HalftoneBackground } from './components/site/HalftoneBackground';
import { ScrollProgress } from './components/site/ScrollProgress';
import { Footer } from './components/site/Shell';

const Home = lazy(() => import('./pages/Home'));
const CommandCore = lazy(() => import('./pages/CommandCore'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const Partners = lazy(() => import('./pages/Partners'));
const People = lazy(() => import('./pages/People'));
const GetStarted = lazy(() => import('./pages/GetStarted'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Careers = lazy(() => import('./pages/Careers'));
const Industries = lazy(() => import('./pages/Industries'));
const Pricing = lazy(() => import('./pages/Pricing'));
const MarketingSuite = lazy(() => import('./pages/MarketingSuite'));
const FashionLifestyleSuite = lazy(() => import('./pages/FashionLifestyleSuite'));
const IndustrialSuite = lazy(() => import('./pages/IndustrialSuite'));
const SecureOsSuite = lazy(() => import('./pages/SecureOsSuite'));
const DigitalTwinSuite = lazy(() => import('./pages/DigitalTwinSuite'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.32, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

const Loader = () => (
  <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
    {/* Brand beat, not a generic spinner: ember halftone on paper. */}
    <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden>
      <HalftoneBackground dotSize={3} spacing={18} dotColor="#ff6301" opacity={0.3} gradient={{ type: 'linear', angle: 90 }} />
    </div>
    <span className="relative animate-pulse font-mono text-[11px] uppercase tracking-[0.35em] text-ink-faint">Arinox</span>
  </div>
);

// Scroll to top on route change
if (typeof window !== 'undefined') window.history.scrollRestoration = 'manual';
const ScrollReset = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return undefined;
    }
    /* Anchor links (e.g. /#intake): the lazy page may not be mounted yet, so
       retry briefly until the target exists, then scroll to it. */
    let tries = 0;
    let timer = 0;
    const seek = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
        return;
      }
      if (tries++ < 30) timer = setTimeout(seek, 100);
    };
    seek();
    return () => clearTimeout(timer);
  }, [pathname, hash]);
  return null;
};

const AppInner = () => {
  const location = useLocation();
  return (
    <>
      <ScrollReset />
      <ScrollProgress />
      <Nav />
      <main>
        <Suspense fallback={<Loader />}>
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/commandcore" element={<PageTransition><CommandCore /></PageTransition>} />
              <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
              <Route path="/case-studies/:slug" element={<PageTransition><CaseStudyDetail /></PageTransition>} />
              <Route path="/industries" element={<PageTransition><Industries /></PageTransition>} />
              <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
              {/* The Price Discovery wizard became the client intake page (/get-started) */}
              <Route path="/pricing/discovery" element={<Navigate to="/get-started" replace />} />
              <Route path="/industries/marketing" element={<PageTransition><MarketingSuite /></PageTransition>} />
              <Route path="/industries/fashion-lifestyle" element={<PageTransition><FashionLifestyleSuite /></PageTransition>} />
              <Route path="/industries/industrial" element={<PageTransition><IndustrialSuite /></PageTransition>} />
              <Route path="/industries/secure" element={<PageTransition><SecureOsSuite /></PageTransition>} />
              <Route path="/industries/digital-twin" element={<PageTransition><DigitalTwinSuite /></PageTransition>} />
              <Route path="/industries/apparel" element={<Navigate to="/industries/fashion-lifestyle" replace />} />
              <Route path="/partners" element={<PageTransition><Partners /></PageTransition>} />
              <Route path="/get-started" element={<PageTransition><GetStarted /></PageTransition>} />
              {/* Sales say "fill the survey" - a typed /survey lands on the intake */}
              <Route path="/survey" element={<Navigate to="/get-started" replace />} />
              <Route path="/people" element={<PageTransition><People /></PageTransition>} />
              <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
              <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
              <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
              <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
              {/* Legacy URL redirects */}
              <Route path="/solutions" element={<Navigate to="/commandcore" replace />} />
              <Route path="/about" element={<Navigate to="/" replace />} />
              <Route path="/company" element={<Navigate to="/" replace />} />
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <Analytics route={location.pathname} path={location.pathname} />
    </>
  );
};

export default AppInner;
