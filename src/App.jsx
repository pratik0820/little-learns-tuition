import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import TopBanner from './components/TopBanner';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { initSmoothScroll, cleanupSmoothScroll } from './utils/smoothScroll';

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Classes = lazy(() => import('./pages/Classes'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Contact = lazy(() => import('./pages/Contact'));

// Loading fallback component
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    fontSize: '1.125rem',
    color: 'var(--color-text-light)'
  }}>
    Loading...
  </div>
);

/**
 * App Content Component
 * 
 * Inner component that has access to router context for smooth scrolling
 */
function AppContent() {
  const location = useLocation();

  // Initialize smooth scrolling on mount and route changes
  useEffect(() => {
    // Initialize smooth scroll for anchor links
    initSmoothScroll();

    // Cleanup on unmount
    return () => {
      cleanupSmoothScroll();
    };
  }, [location.pathname]);

  return (
    <div className="app">
      {/* Skip to main content link for keyboard navigation */}
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      {/* Top Blue Banner */}
      <TopBanner />

      {/* Global Header - Sticky navigation */}
      <Header />

      {/* Main Content Area - Routes with lazy loading */}
      <main id="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* WhatsApp Floating Button - Visible on all pages */}
      <WhatsAppButton />
    </div>
  );
}

/**
 * App Component
 * 
 * Main application component that provides the global layout structure:
 * - Header (sticky navigation)
 * - Main content area (routes)
 * - Footer
 * - WhatsApp floating button (visible on all pages)
 * - Smooth scrolling for anchor links
 * 
 * Uses React Router for navigation between pages.
 */
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
