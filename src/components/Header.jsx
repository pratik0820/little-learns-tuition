import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './Header.css';

/**
 * Header Component
 * 
 * A sticky navigation header that remains fixed at the top of the viewport.
 * Features:
 * - Logo/brand area
 * - Desktop navigation menu with links
 * - Mobile hamburger menu with overlay/drawer
 * - Active page highlighting
 * - Proper z-index layering
 * - Responsive design
 * 
 * Props:
 * - None (uses React Router for navigation)
 * 
 * Requirements: 2.4, 2.5, 8.1, 8.2, 8.4, 8.5
 */
function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const navLinks = [
    { label: 'Home', path: '/', id: 'home' },
    { label: 'About Teacher', path: '/about', id: 'about' },
    { label: 'Classes', path: '/classes', id: 'classes' },
    { label: 'Testimonials', path: '/testimonials', id: 'testimonials' },
    { label: 'Contact', path: '/contact', id: 'contact' }
  ];

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        closeMobileMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo/Brand Area */}
        <div className="header__brand">
          <Link to="/" className="header__logo" aria-label="Little Learner's Home">
            <img 
              src="/images/little-leanrs-logo.jpeg" 
              alt="Little Learner's Logo" 
              className="header__logo-image"
            />
            <span className="header__logo-text">Little Learner's</span>
          </Link>
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="header__nav" aria-label="Main navigation">
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li key={link.id} className="header__nav-item">
                <Link
                  to={link.path}
                  className={`header__nav-link ${isActive(link.path) ? 'header__nav-link--active' : ''}`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Hamburger Menu Button */}
        <button
          className="header__mobile-toggle"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`header__hamburger ${isMobileMenuOpen ? 'header__hamburger--open' : ''}`}>
            <span className="header__hamburger-line"></span>
            <span className="header__hamburger-line"></span>
            <span className="header__hamburger-line"></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="header__mobile-overlay"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <nav
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`header__mobile-menu ${isMobileMenuOpen ? 'header__mobile-menu--open' : ''}`}
        aria-label="Mobile navigation"
      >
        <div className="header__mobile-header">
          <span className="header__mobile-title">Menu</span>
          <button
            className="header__mobile-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <ul className="header__mobile-list">
          {navLinks.map((link) => (
            <li key={link.id} className="header__mobile-item">
              <Link
                to={link.path}
                className={`header__mobile-link ${isActive(link.path) ? 'header__mobile-link--active' : ''}`}
                aria-current={isActive(link.path) ? 'page' : undefined}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
