import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { Nav } from './components/site/Nav';
import { HalftoneBackground } from './components/site/HalftoneBackground';
import { ScrollProgress } from './components/site/ScrollProgress';
import { Footer } from './components/site/Shell';
import { BookCtaProvider } from './components/site/BookCtaContext';
import ArinoxChatBot from './components/ui/ArinoxChatBot';

const Home = lazy(() => import('./pages/Home'));
const CommandCore = lazy(() => import('./pages/CommandCore'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const Partners = lazy(() => import('./pages/Partners'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Careers = lazy(() => import('./pages/Careers'));
const Industries = lazy(() => import('./pages/Industries'));
const MarketingSuite = lazy(() => import('./pages/MarketingSuite'));
const ApparelSuite = lazy(() => import('./pages/ApparelSuite'));
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
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, [pathname]);
  return null;
};

const AppInner = () => {
  const location = useLocation();

  return (
    <BookCtaProvider>
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
              <Route path="/industries/marketing" element={<PageTransition><MarketingSuite /></PageTransition>} />
              <Route path="/industries/apparel" element={<PageTransition><ApparelSuite /></PageTransition>} />
              <Route path="/partners" element={<PageTransition><Partners /></PageTransition>} />
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
      <ArinoxChatBot />
      <Analytics route={location.pathname} path={location.pathname} />
    </BookCtaProvider>
  );
};

export default AppInner;
