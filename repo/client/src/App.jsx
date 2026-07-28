import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './hooks/useAuth';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ConsentBanner from './components/ui/ConsentBanner';
import ArinoxChatBot from './components/ui/ArinoxChatBot';

const Home = lazy(() => import('./pages/Home'));
const Partners = lazy(() => import('./pages/Partners'));
const Solutions = lazy(() => import('./pages/Solutions'));
const CommandCore = lazy(() => import('./pages/CommandCore'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.4, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-10 h-10 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Scroll to top on route change — disable browser scroll restoration so it can't override us
if (typeof window !== 'undefined') window.history.scrollRestoration = 'manual';
const ScrollReset = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, [pathname]);
  return null;
};

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const AppInner = () => {
  const location = useLocation();

  return (
    <AuthProvider>
      <ScrollReset />
      <Navbar />
      <main>
        <Suspense fallback={<Loader />}>
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/about" element={<Navigate to="/#about" replace />} />
              <Route path="/partners" element={<PageTransition><Partners /></PageTransition>} />
              <Route path="/solutions" element={<PageTransition><Solutions /></PageTransition>} />
              <Route path="/commandcore" element={<PageTransition><CommandCore /></PageTransition>} />
              <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
              <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
              <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
              <Route path="/case-studies/:slug" element={<PageTransition><CaseStudies /></PageTransition>} />
              <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
              <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <ConsentBanner />
      <ArinoxChatBot />
    </AuthProvider>
  );
};

const App = () => GOOGLE_CLIENT_ID
  ? <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}><AppInner /></GoogleOAuthProvider>
  : <AppInner />;

export default App;

