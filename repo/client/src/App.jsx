import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Nav } from './components/site/Nav';
import { Footer } from './components/site/Shell';
import { BookCtaProvider } from './components/site/BookCtaContext';
import ConsentBanner from './components/ui/ConsentBanner';
import ArinoxChatBot from './components/ui/ArinoxChatBot';

const Home = lazy(() => import('./pages/Home'));
const CommandCore = lazy(() => import('./pages/CommandCore'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Partners = lazy(() => import('./pages/Partners'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Careers = lazy(() => import('./pages/Careers'));
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
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-9 h-9 border-2 border-ember border-t-transparent rounded-full animate-spin" />
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
      <Nav />
      <main>
        <Suspense fallback={<Loader />}>
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/commandcore" element={<PageTransition><CommandCore /></PageTransition>} />
              <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
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
              <Route path="/case-studies/:slug" element={<Navigate to="/case-studies" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <ConsentBanner />
      <ArinoxChatBot />
    </BookCtaProvider>
  );
};

export default AppInner;
