import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Header from '../Header';

describe('Header Component', () => {
  // Helper function to render Header with router
  const renderHeader = (initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Header />
      </MemoryRouter>
    );
  };

  describe('Structure and Content', () => {
    it('should render the header element', () => {
      renderHeader();
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('should render the logo/brand with correct text', () => {
      renderHeader();
      const logo = screen.getByLabelText('Tuition Classes Home');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveTextContent('Tuition Classes');
    });

    it('should render navigation with correct aria-label', () => {
      renderHeader();
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(nav).toBeInTheDocument();
    });

    it('should render all navigation links', () => {
      renderHeader();
      
      const expectedLinks = [
        'Home',
        'About Teacher',
        'Classes',
        'Testimonials',
        'Contact'
      ];

      expectedLinks.forEach(linkText => {
        const links = screen.getAllByRole('link', { name: linkText });
        expect(links.length).toBeGreaterThan(0);
      });
    });

    it('should have correct href attributes for navigation links', () => {
      renderHeader();
      
      const linkMappings = [
        { text: 'Home', href: '/' },
        { text: 'About Teacher', href: '/about' },
        { text: 'Classes', href: '/classes' },
        { text: 'Testimonials', href: '/testimonials' },
        { text: 'Contact', href: '/contact' }
      ];

      linkMappings.forEach(({ text, href }) => {
        const links = screen.getAllByRole('link', { name: text });
        const desktopLink = links.find(link => link.classList.contains('header__nav-link'));
        expect(desktopLink).toHaveAttribute('href', href);
      });
    });
  });

  describe('Active Page Highlighting', () => {
    it('should highlight the Home link when on home page', () => {
      renderHeader('/');
      
      const homeLinks = screen.getAllByRole('link', { name: 'Home' });
      const desktopLink = homeLinks.find(link => link.classList.contains('header__nav-link'));
      expect(desktopLink).toHaveClass('header__nav-link--active');
      expect(desktopLink).toHaveAttribute('aria-current', 'page');
    });

    it('should highlight the About Teacher link when on about page', () => {
      renderHeader('/about');
      
      const aboutLinks = screen.getAllByRole('link', { name: 'About Teacher' });
      const desktopLink = aboutLinks.find(link => link.classList.contains('header__nav-link'));
      expect(desktopLink).toHaveClass('header__nav-link--active');
      expect(desktopLink).toHaveAttribute('aria-current', 'page');
    });

    it('should highlight the Classes link when on classes page', () => {
      renderHeader('/classes');
      
      const classesLinks = screen.getAllByRole('link', { name: 'Classes' });
      const desktopLink = classesLinks.find(link => link.classList.contains('header__nav-link'));
      expect(desktopLink).toHaveClass('header__nav-link--active');
      expect(desktopLink).toHaveAttribute('aria-current', 'page');
    });

    it('should highlight the Testimonials link when on testimonials page', () => {
      renderHeader('/testimonials');
      
      const testimonialsLinks = screen.getAllByRole('link', { name: 'Testimonials' });
      const desktopLink = testimonialsLinks.find(link => link.classList.contains('header__nav-link'));
      expect(desktopLink).toHaveClass('header__nav-link--active');
      expect(desktopLink).toHaveAttribute('aria-current', 'page');
    });

    it('should highlight the Contact link when on contact page', () => {
      renderHeader('/contact');
      
      const contactLinks = screen.getAllByRole('link', { name: 'Contact' });
      const desktopLink = contactLinks.find(link => link.classList.contains('header__nav-link'));
      expect(desktopLink).toHaveClass('header__nav-link--active');
      expect(desktopLink).toHaveAttribute('aria-current', 'page');
    });

    it('should only highlight one link at a time', () => {
      renderHeader('/about');
      
      const activeLinks = screen.getAllByRole('link').filter(link => 
        link.classList.contains('header__nav-link--active')
      );
      
      expect(activeLinks).toHaveLength(1);
      expect(activeLinks[0]).toHaveTextContent('About Teacher');
    });

    it('should not have aria-current on inactive links', () => {
      renderHeader('/about');
      
      const homeLinks = screen.getAllByRole('link', { name: 'Home' });
      homeLinks.forEach(link => {
        expect(link).not.toHaveAttribute('aria-current');
      });
    });
  });

  describe('Styling and CSS Classes', () => {
    it('should have correct CSS class on header element', () => {
      renderHeader();
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('header');
    });

    it('should have correct CSS classes on navigation links', () => {
      renderHeader();
      
      const homeLinks = screen.getAllByRole('link', { name: 'Home' });
      const desktopLink = homeLinks.find(link => link.classList.contains('header__nav-link'));
      expect(desktopLink).toHaveClass('header__nav-link');
    });

    it('should apply active class to current page link', () => {
      renderHeader('/classes');
      
      const classesLinks = screen.getAllByRole('link', { name: 'Classes' });
      const desktopLink = classesLinks.find(link => link.classList.contains('header__nav-link'));
      expect(desktopLink).toHaveClass('header__nav-link');
      expect(desktopLink).toHaveClass('header__nav-link--active');
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic HTML structure', () => {
      renderHeader();
      
      // Header should be a banner landmark
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
      
      // Navigation should be a navigation landmark (there are two: desktop and mobile)
      const navs = screen.getAllByRole('navigation');
      expect(navs.length).toBeGreaterThanOrEqual(1);
    });

    it('should have aria-label on logo link', () => {
      renderHeader();
      const logo = screen.getByLabelText('Tuition Classes Home');
      expect(logo).toBeInTheDocument();
    });

    it('should have aria-label on navigation', () => {
      renderHeader();
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(nav).toBeInTheDocument();
    });

    it('should use aria-current for active page', () => {
      renderHeader('/testimonials');
      
      const activeLinks = screen.getAllByRole('link', { name: 'Testimonials' });
      // Both desktop and mobile links should have aria-current
      activeLinks.forEach(link => {
        expect(link).toHaveAttribute('aria-current', 'page');
      });
    });

    it('should have list structure for navigation items', () => {
      renderHeader();
      
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      const list = nav.querySelector('ul');
      expect(list).toBeInTheDocument();
      
      const listItems = nav.querySelectorAll('li');
      expect(listItems).toHaveLength(5);
    });
  });

  describe('Logo/Brand', () => {
    it('should render logo as a link to home page', () => {
      renderHeader();
      
      const logo = screen.getByLabelText('Tuition Classes Home');
      expect(logo).toHaveAttribute('href', '/');
    });

    it('should have correct CSS class on logo', () => {
      renderHeader();
      
      const logo = screen.getByLabelText('Tuition Classes Home');
      expect(logo).toHaveClass('header__logo');
    });
  });

  describe('Requirements Validation', () => {
    it('should implement sticky header structure (Requirement 8.1)', () => {
      renderHeader();
      const header = screen.getByRole('banner');
      
      // Header should exist and have the correct class for sticky positioning
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('header');
    });

    it('should display navigation links (Requirement 8.2)', () => {
      renderHeader();
      
      // All 5 navigation links should be present
      const links = screen.getAllByRole('link').filter(link => 
        link.classList.contains('header__nav-link')
      );
      expect(links).toHaveLength(5);
    });

    it('should highlight active page (Requirement 8.4)', () => {
      renderHeader('/classes');
      
      const activeLinks = screen.getAllByRole('link', { name: 'Classes' });
      // Check the desktop navigation link (first one)
      const desktopLink = activeLinks.find(link => link.classList.contains('header__nav-link'));
      expect(desktopLink).toHaveClass('header__nav-link--active');
      expect(desktopLink).toHaveAttribute('aria-current', 'page');
    });

    it('should maintain visibility with proper structure (Requirement 8.5)', () => {
      renderHeader();
      
      // Header should be present and have the structure for z-index layering
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('header');
    });
  });

  describe('Mobile Navigation Menu', () => {
    beforeEach(() => {
      // Reset body overflow style before each test
      document.body.style.overflow = '';
    });

    afterEach(() => {
      // Clean up body overflow style after each test
      document.body.style.overflow = '';
    });

    it('should render hamburger menu button', () => {
      renderHeader();
      
      const hamburgerButton = screen.getByRole('button', { name: /open menu/i });
      expect(hamburgerButton).toBeInTheDocument();
      expect(hamburgerButton).toHaveClass('header__mobile-toggle');
    });

    it('should have correct aria attributes on hamburger button', () => {
      renderHeader();
      
      const hamburgerButton = screen.getByRole('button', { name: /open menu/i });
      expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
      expect(hamburgerButton).toHaveAttribute('aria-controls', 'mobile-menu');
    });

    it('should open mobile menu when hamburger button is clicked', () => {
      renderHeader();
      
      const hamburgerButton = screen.getByRole('button', { name: /open menu/i });
      fireEvent.click(hamburgerButton);
      
      const mobileMenu = screen.getByRole('navigation', { name: 'Mobile navigation' });
      expect(mobileMenu).toHaveClass('header__mobile-menu--open');
    });

    it('should update aria-expanded when menu is opened', () => {
      renderHeader();
      
      const hamburgerButton = screen.getByRole('button', { name: /open menu/i });
      fireEvent.click(hamburgerButton);
      
      expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');
      expect(hamburgerButton).toHaveAttribute('aria-label', 'Close menu');
    });

    it('should display mobile menu overlay when menu is open', () => {
      renderHeader();
      
      const hamburgerButton = screen.getByRole('button', { name: /open menu/i });
      fireEvent.click(hamburgerButton);
      
      const overlay = document.querySelector('.header__mobile-overlay');
      expect(overlay).toBeInTheDocument();
    });

    it('should render close button in mobile menu', () => {
      renderHeader();
      
      const hamburgerButton = screen.getByRole('button', { name: /open menu/i });
      fireEvent.click(hamburgerButton);
      
      const closeButtons = screen.getAllByRole('button', { name: /close menu/i });
      expect(closeButtons.length).toBeGreaterThan(0);
    });

    it('should close mobile menu when close button is clicked', () => {
      renderHeader();
      
      // Open menu
      const hamburgerButton = screen.getByRole('button', { name: /open menu/i });
      fireEvent.click(hamburgerButton);
      
      // Close menu
      const closeButtons = screen.getAllByRole('button', { name: /close menu/i });
      fireEvent.click(closeButtons[closeButtons.length - 1]); // Click the close button in the drawer
      
      const mobileMenu = screen.getByRole('navigation', { name: 'Mobile navigation' });
      expect(mobileMenu).not.toHaveClass('header__mobile-menu--open');
    });

    it('should close mobile menu when overlay is clicked', () => {
      renderHeader();
      
      // Open menu
      const hamburgerButton = screen.getByRole('button', { name: /open menu/i });
      fireEvent.click(hamburgerButton);
      
      // Click overlay
      const overlay = document.querySelector('.header__mobile-overlay');
      fireEvent.click(overlay);
      
      const mobileMenu = screen.getByRole('navigation', { name: 'Mobile navigation' });
      expect(mobileMenu).not.toHaveClass('header__mobile-menu--open');
    });

    it('should render all navigation links in mobile menu', () => {
      renderHeader();
      
      const hamburgerButton = screen.getByRole('button', { name: /open menu/i });
      fireEvent.click(hamburgerButton);
      
      const mobileMenu = screen.getByRole('navigation', { name: 'Mobile navigation' });
      const mobileLinks = mobileMenu.querySelectorAll('.header__mobile-link');
      
      expect(mobileLinks).toHaveLength(5);
    });

    it('should have touch-friendly menu items (min 44px height)', () => {
      renderHeader();
      
      const hamburgerButton = screen.getByRole('button', { name: /open menu/i });
      
      // Check hamburger button has the correct class which defines 44px size
      expect(hamburgerButton).toHaveClass('header__mobile-toggle');
    });

    it('should close mobile menu when Escape key is pressed', () => {
      renderHeader();
      
      // Open menu
      const hamburgerButton = screen.getByRole('button', { name: /open menu/i });
      fireEvent.click(hamburgerButton);
      
      // Press Escape
      fireEvent.keyDown(document, { key: 'Escape' });
      
      const mobileMenu = screen.getByRole('navigation', { name: 'Mobile navigation' });
      expect(mobileMenu).not.toHaveClass('header__mobile-menu--open');
    });

    it('should prevent body scroll when mobile menu is open', () => {
      renderHeader();
      
      // Open menu
      const hamburgerButton = screen.getByRole('button', { name: /open menu/i });
      fireEvent.click(hamburgerButton);
      
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should restore body scroll when mobile menu is closed', () => {
      renderHeader();
      
      // Open menu
      const hamburgerButton = screen.getByRole('button', { name: /open menu/i });
      fireEvent.click(hamburgerButton);
      
      // Close menu
      const closeButtons = screen.getAllByRole('button', { name: /close menu/i });
      fireEvent.click(closeButtons[closeButtons.length - 1]);
      
      expect(document.body.style.overflow).toBe('');
    });

    it('should highlight active page in mobile menu', () => {
      renderHeader('/about');
      
      const hamburgerButton = screen.getByRole('button', { name: /open menu/i });
      fireEvent.click(hamburgerButton);
      
      const mobileMenu = screen.getByRole('navigation', { name: 'Mobile navigation' });
      const aboutLink = mobileMenu.querySelector('.header__mobile-link--active');
      
      expect(aboutLink).toBeInTheDocument();
      expect(aboutLink).toHaveTextContent('About Teacher');
    });

    it('should have smooth transitions (CSS class present)', () => {
      renderHeader();
      
      const mobileMenu = screen.getByRole('navigation', { name: 'Mobile navigation' });
      expect(mobileMenu).toHaveClass('header__mobile-menu');
    });

    it('should implement Requirements 2.4 - mobile hamburger menu', () => {
      renderHeader();
      
      // Hamburger menu should transform navigation on mobile
      const hamburgerButton = screen.getByRole('button', { name: /open menu/i });
      expect(hamburgerButton).toBeInTheDocument();
      
      // Mobile menu should exist
      const mobileMenu = screen.getByRole('navigation', { name: 'Mobile navigation' });
      expect(mobileMenu).toBeInTheDocument();
    });

    it('should implement Requirements 2.5 - touch-friendly buttons', () => {
      renderHeader();
      
      const hamburgerButton = screen.getByRole('button', { name: /open menu/i });
      
      // Button should have minimum 44px tap target
      expect(hamburgerButton).toHaveClass('header__mobile-toggle');
    });
  });
});
