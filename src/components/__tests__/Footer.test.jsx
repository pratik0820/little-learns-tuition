import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../Footer';

/**
 * Footer Component Unit Tests
 * 
 * Tests the Footer component functionality including:
 * - Footer presence and structure
 * - Quick links navigation
 * - Contact information display
 * - Social media links
 * - Multi-column layout structure
 * 
 * Requirements: 11.1, 11.2, 11.3, 11.4, 11.5
 */

// Helper function to render Footer with Router
const renderFooter = () => {
  return render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
};

describe('Footer Component', () => {
  describe('Footer Presence', () => {
    it('should render footer element', () => {
      renderFooter();
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    it('should have footer class', () => {
      renderFooter();
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('footer');
    });
  });

  describe('Quick Links Navigation', () => {
    it('should display "Quick Links" heading', () => {
      renderFooter();
      const heading = screen.getByRole('heading', { name: /quick links/i });
      expect(heading).toBeInTheDocument();
    });

    it('should display all navigation links', () => {
      renderFooter();
      const expectedLinks = ['Home', 'About Teacher', 'Classes', 'Testimonials', 'Contact'];
      
      expectedLinks.forEach(linkText => {
        const links = screen.getAllByRole('link', { name: linkText });
        expect(links.length).toBeGreaterThan(0);
      });
    });

    it('should have correct href attributes for navigation links', () => {
      renderFooter();
      
      const footerNav = screen.getByRole('navigation', { name: /footer navigation/i });
      const homeLink = footerNav.querySelector('a[href="/"]');
      const aboutLink = footerNav.querySelector('a[href="/about"]');
      const classesLink = footerNav.querySelector('a[href="/classes"]');
      const testimonialsLink = footerNav.querySelector('a[href="/testimonials"]');
      const contactLink = footerNav.querySelector('a[href="/contact"]');
      
      expect(homeLink).toBeInTheDocument();
      expect(aboutLink).toBeInTheDocument();
      expect(classesLink).toBeInTheDocument();
      expect(testimonialsLink).toBeInTheDocument();
      expect(contactLink).toBeInTheDocument();
    });

    it('should have footer navigation with proper aria-label', () => {
      renderFooter();
      const nav = screen.getByRole('navigation', { name: /footer navigation/i });
      expect(nav).toBeInTheDocument();
    });
  });

  describe('Contact Information Display', () => {
    it('should display "Contact Us" heading', () => {
      renderFooter();
      const heading = screen.getByRole('heading', { name: /contact us/i });
      expect(heading).toBeInTheDocument();
    });

    it('should display phone number', () => {
      renderFooter();
      const phoneLink = screen.getByRole('link', { name: /\+91 XXXXXXXXXX/i });
      expect(phoneLink).toBeInTheDocument();
    });

    it('should have clickable phone link with tel: protocol', () => {
      renderFooter();
      const phoneLink = screen.getByRole('link', { name: /\+91 XXXXXXXXXX/i });
      expect(phoneLink).toHaveAttribute('href', 'tel:+91XXXXXXXXXX');
    });

    it('should display address information', () => {
      renderFooter();
      const address = screen.getByText(/123 Main Street/i);
      expect(address).toBeInTheDocument();
      expect(screen.getByText(/City Name, State/i)).toBeInTheDocument();
      expect(screen.getByText(/123456/i)).toBeInTheDocument();
    });

    it('should use semantic address element', () => {
      const { container } = renderFooter();
      const address = container.querySelector('address');
      expect(address).toBeInTheDocument();
    });
  });

  describe('Social Media Links', () => {
    it('should display "Follow Us" heading', () => {
      renderFooter();
      const heading = screen.getByRole('heading', { name: /follow us/i });
      expect(heading).toBeInTheDocument();
    });

    it('should display social media links', () => {
      renderFooter();
      const facebookLink = screen.getByRole('link', { name: /follow us on facebook/i });
      const instagramLink = screen.getByRole('link', { name: /follow us on instagram/i });
      
      expect(facebookLink).toBeInTheDocument();
      expect(instagramLink).toBeInTheDocument();
    });

    it('should have correct attributes for external social links', () => {
      renderFooter();
      const facebookLink = screen.getByRole('link', { name: /follow us on facebook/i });
      const instagramLink = screen.getByRole('link', { name: /follow us on instagram/i });
      
      expect(facebookLink).toHaveAttribute('target', '_blank');
      expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(instagramLink).toHaveAttribute('target', '_blank');
      expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should have proper href for social links', () => {
      renderFooter();
      const facebookLink = screen.getByRole('link', { name: /follow us on facebook/i });
      const instagramLink = screen.getByRole('link', { name: /follow us on instagram/i });
      
      expect(facebookLink).toHaveAttribute('href', 'https://facebook.com');
      expect(instagramLink).toHaveAttribute('href', 'https://instagram.com');
    });
  });

  describe('Footer Structure', () => {
    it('should have three main sections', () => {
      const { container } = renderFooter();
      const sections = container.querySelectorAll('.footer__section');
      expect(sections).toHaveLength(3);
    });

    it('should have links section', () => {
      const { container } = renderFooter();
      const linksSection = container.querySelector('.footer__section--links');
      expect(linksSection).toBeInTheDocument();
    });

    it('should have contact section', () => {
      const { container } = renderFooter();
      const contactSection = container.querySelector('.footer__section--contact');
      expect(contactSection).toBeInTheDocument();
    });

    it('should have social section', () => {
      const { container } = renderFooter();
      const socialSection = container.querySelector('.footer__section--social');
      expect(socialSection).toBeInTheDocument();
    });
  });

  describe('Copyright Section', () => {
    it('should display copyright text', () => {
      renderFooter();
      const currentYear = new Date().getFullYear();
      const copyright = screen.getByText(new RegExp(`© ${currentYear} Tuition Classes. All rights reserved.`, 'i'));
      expect(copyright).toBeInTheDocument();
    });

    it('should display current year dynamically', () => {
      renderFooter();
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic footer element', () => {
      renderFooter();
      const footer = screen.getByRole('contentinfo');
      expect(footer.tagName).toBe('FOOTER');
    });

    it('should have proper heading hierarchy', () => {
      renderFooter();
      const headings = screen.getAllByRole('heading', { level: 3 });
      expect(headings).toHaveLength(3);
      expect(headings[0]).toHaveTextContent(/quick links/i);
      expect(headings[1]).toHaveTextContent(/contact us/i);
      expect(headings[2]).toHaveTextContent(/follow us/i);
    });

    it('should have aria-labels for social links', () => {
      renderFooter();
      const facebookLink = screen.getByRole('link', { name: /follow us on facebook/i });
      const instagramLink = screen.getByRole('link', { name: /follow us on instagram/i });
      
      expect(facebookLink).toHaveAttribute('aria-label');
      expect(instagramLink).toHaveAttribute('aria-label');
    });

    it('should have navigation with aria-label', () => {
      renderFooter();
      const nav = screen.getByRole('navigation', { name: /footer navigation/i });
      expect(nav).toHaveAttribute('aria-label', 'Footer navigation');
    });
  });

  describe('Visual Consistency', () => {
    it('should have footer container class', () => {
      const { container } = renderFooter();
      const footerContainer = container.querySelector('.footer__container');
      expect(footerContainer).toBeInTheDocument();
    });

    it('should have footer bottom section', () => {
      const { container } = renderFooter();
      const footerBottom = container.querySelector('.footer__bottom');
      expect(footerBottom).toBeInTheDocument();
    });

    it('should have proper CSS classes for styling', () => {
      const { container } = renderFooter();
      
      expect(container.querySelector('.footer__heading')).toBeInTheDocument();
      expect(container.querySelector('.footer__links-list')).toBeInTheDocument();
      expect(container.querySelector('.footer__contact-info')).toBeInTheDocument();
      expect(container.querySelector('.footer__social-links')).toBeInTheDocument();
      expect(container.querySelector('.footer__copyright')).toBeInTheDocument();
    });
  });
});
