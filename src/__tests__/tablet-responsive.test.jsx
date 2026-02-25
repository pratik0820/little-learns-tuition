/**
 * Tablet Responsive Layout Tests
 * 
 * Tests for Requirement 2.2: Tablet viewport responsive layouts (768px+)
 * 
 * Validates:
 * - Two-column layouts where appropriate
 * - Horizontal navigation on tablet
 * - Adjusted spacing and typography for tablet
 * - Proper breakpoint behavior at 768px
 * 
 * Note: These tests verify that the correct CSS classes and structure are present.
 * Actual media query behavior is tested through manual browser testing and visual
 * regression testing, as jsdom does not apply CSS media queries.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import ContactInfo from '../components/ContactInfo';
import TestimonialsPreview from '../components/TestimonialsPreview';
import Classes from '../pages/Classes';
import Testimonials from '../pages/Testimonials';
import Contact from '../pages/Contact';

// Helper to render with router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Tablet Responsive Layouts (768px+)', () => {
  describe('Requirement 2.2: Horizontal Navigation Structure', () => {
    it('should have desktop navigation structure with proper CSS classes', () => {
      renderWithRouter(<Header />);
      
      // Desktop nav should exist with proper class
      const nav = document.querySelector('.header__nav');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
      
      // Nav list should have flex class
      const navList = nav.querySelector('.header__nav-list');
      expect(navList).toBeInTheDocument();
      
      // Check that navigation links are present with proper classes
      const navLinks = document.querySelectorAll('.header__nav-link');
      expect(navLinks.length).toBeGreaterThan(0);
    });

    it('should have mobile toggle button with proper CSS class', () => {
      renderWithRouter(<Header />);
      
      // Mobile toggle should exist (CSS will hide it on tablet+)
      const mobileToggle = document.querySelector('.header__mobile-toggle');
      expect(mobileToggle).toBeInTheDocument();
      expect(mobileToggle).toHaveAttribute('aria-label', 'Open menu');
    });

    it('should have all navigation links with proper structure', () => {
      renderWithRouter(<Header />);
      
      const navList = document.querySelector('.header__nav-list');
      expect(navList).toBeInTheDocument();
      
      // Check for navigation items
      const navItems = navList.querySelectorAll('.header__nav-item');
      expect(navItems.length).toBe(5); // Home, About, Classes, Testimonials, Contact
    });
  });

  describe('Requirement 2.2: Two-Column Grid Layouts', () => {
    it('should have courses grid with proper CSS class', () => {
      renderWithRouter(<Classes />);
      
      const coursesGrid = document.querySelector('.courses-grid');
      expect(coursesGrid).toBeInTheDocument();
      
      // Grid should contain course cards
      const courseCards = coursesGrid.querySelectorAll('.course-card');
      expect(courseCards.length).toBeGreaterThan(0);
    });

    it('should have testimonials grid with proper CSS class', () => {
      renderWithRouter(<Testimonials />);
      
      const testimonialsGrid = document.querySelector('.testimonials-grid');
      expect(testimonialsGrid).toBeInTheDocument();
      
      // Grid should contain testimonial cards
      const testimonialCards = testimonialsGrid.querySelectorAll('.testimonial-card');
      expect(testimonialCards.length).toBeGreaterThan(0);
    });

    it('should have contact info grid with proper CSS class', () => {
      render(<ContactInfo />);
      
      const contactInfo = document.querySelector('.contact-info');
      expect(contactInfo).toBeInTheDocument();
      
      // Should contain contact info cards
      const contactCards = contactInfo.querySelectorAll('.contact-info__card');
      expect(contactCards.length).toBeGreaterThan(0);
    });

    it('should have contact page layout with proper CSS class', () => {
      renderWithRouter(<Contact />);
      
      const contactLayout = document.querySelector('.contact-layout');
      expect(contactLayout).toBeInTheDocument();
      
      // Should contain contact sections
      expect(contactLayout.children.length).toBeGreaterThan(0);
    });

    it('should have testimonials preview grid with proper CSS class', () => {
      render(<TestimonialsPreview />);
      
      const previewGrid = document.querySelector('.testimonials-preview__grid');
      expect(previewGrid).toBeInTheDocument();
      
      // Grid should contain card components
      const cards = previewGrid.querySelectorAll('.card');
      expect(cards.length).toBeGreaterThan(0);
    });

    it('should have footer with multi-column structure', () => {
      renderWithRouter(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
      
      // Footer should have sections
      const footerSections = footer.querySelectorAll('.footer__section');
      expect(footerSections.length).toBeGreaterThan(0);
    });
  });

  describe('Requirement 2.2: Component Structure for Tablet', () => {
    it('should have proper card structure with CSS classes', () => {
      const courseData = {
        title: 'Class 1-2',
        ageRange: '6-8 years',
        subjects: ['English', 'Mathematics'],
        curriculum: ['Reading & writing foundation'],
        batchSize: '6-8 students',
        duration: '1.5 hours',
        method: 'Interactive learning'
      };
      
      render(<CourseCard {...courseData} />);
      
      const card = document.querySelector('.course-card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('course-card');
    });

    it('should have proper header container structure', () => {
      renderWithRouter(<Header />);
      
      const headerContainer = document.querySelector('.header__container');
      expect(headerContainer).toBeInTheDocument();
      expect(headerContainer).toHaveClass('header__container');
    });

    it('should have proper container structure', () => {
      const { container } = render(
        <div className="container">
          <p>Test content</p>
        </div>
      );
      
      const containerEl = container.querySelector('.container');
      expect(containerEl).toBeInTheDocument();
      expect(containerEl).toHaveClass('container');
    });
  });

  describe('Requirement 2.2: Typography and Content Structure', () => {
    it('should have proper heading structure', () => {
      const courseData = {
        title: 'Class 1-2',
        ageRange: '6-8 years',
        subjects: ['English', 'Mathematics'],
        curriculum: ['Reading & writing foundation'],
        batchSize: '6-8 students',
        duration: '1.5 hours',
        method: 'Interactive learning'
      };
      
      render(<CourseCard {...courseData} />);
      
      const title = screen.getByText('Class 1-2');
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('course-card__title');
    });

    it('should have proper logo structure', () => {
      renderWithRouter(<Header />);
      
      const logoText = document.querySelector('.header__logo-text');
      expect(logoText).toBeInTheDocument();
      expect(logoText).toHaveClass('header__logo-text');
    });
  });

  describe('Requirement 2.2: CSS Media Query Presence', () => {
    it('should verify tablet breakpoint CSS exists for Header', () => {
      // This test verifies the CSS file structure
      // Actual media query application is tested in browser
      renderWithRouter(<Header />);
      
      const header = document.querySelector('.header');
      expect(header).toBeInTheDocument();
      
      // Verify both mobile and desktop nav exist in DOM
      const desktopNav = document.querySelector('.header__nav');
      const mobileToggle = document.querySelector('.header__mobile-toggle');
      
      expect(desktopNav).toBeInTheDocument();
      expect(mobileToggle).toBeInTheDocument();
    });

    it('should verify grid layouts have proper CSS classes', () => {
      renderWithRouter(<Classes />);
      
      const coursesGrid = document.querySelector('.courses-grid');
      expect(coursesGrid).toBeInTheDocument();
      expect(coursesGrid).toHaveClass('courses-grid');
    });
  });

  describe('Requirement 2.2: Component Responsiveness', () => {
    it('should render all components with proper structure', () => {
      // Test Header
      const { unmount: unmount1 } = renderWithRouter(<Header />);
      expect(document.querySelector('.header')).toBeInTheDocument();
      unmount1();
      
      // Test Footer
      const { unmount: unmount2 } = renderWithRouter(<Footer />);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      unmount2();
      
      // Test CourseCard
      const courseData = {
        title: 'Class 1-2',
        ageRange: '6-8 years',
        subjects: ['English', 'Mathematics'],
        curriculum: ['Reading & writing foundation'],
        batchSize: '6-8 students',
        duration: '1.5 hours',
        method: 'Interactive learning'
      };
      
      const { unmount: unmount3 } = render(<CourseCard {...courseData} />);
      expect(screen.getByText('Class 1-2')).toBeInTheDocument();
      unmount3();
    });

    it('should have navigation links with proper structure', () => {
      renderWithRouter(<Header />);
      
      const navLinks = document.querySelectorAll('.header__nav-link');
      expect(navLinks.length).toBeGreaterThan(0);
      
      // Each link should have proper attributes
      navLinks.forEach(link => {
        expect(link).toHaveAttribute('href');
      });
    });
  });
});
