import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

/**
 * Home Page Tests
 * 
 * Tests for the Home page component that assembles all home page sections.
 * 
 * Requirements: 1.1, 1.2, 1.3, 1.4, 9.1, 10.1
 */
describe('Home Page', () => {
  const renderHome = () => {
    return render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  };

  describe('Page Structure', () => {
    it('should render the main element', () => {
      renderHome();
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(main).toHaveClass('home');
    });

    it('should render all required sections in correct order', () => {
      const { container } = renderHome();
      
      // Get all sections
      const sections = container.querySelectorAll('section');
      
      // Should have at least 3 sections: Hero, Testimonials (in Section), FAQ (in Section)
      // Note: Banner is a div, not a section element
      expect(sections.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Hero Section', () => {
    it('should render the Hero section', () => {
      renderHome();
      
      // Check for hero headline
      const headline = screen.getByRole('heading', { 
        name: /personalized tuition classes/i, 
        level: 1 
      });
      expect(headline).toBeInTheDocument();
    });

    it('should display CTA buttons (Requirement 1.2)', () => {
      renderHome();
      
      // Check for Enroll Now button
      const enrollButton = screen.getByRole('link', { name: /enroll now/i });
      expect(enrollButton).toBeInTheDocument();
      
      // Check for WhatsApp button (using aria-label)
      const whatsappButton = screen.getByRole('link', { name: /contact us on whatsapp/i });
      expect(whatsappButton).toBeInTheDocument();
    });

    it('should display key highlights (Requirement 1.3)', () => {
      const { container } = renderHome();
      
      // Check for highlights
      expect(container.textContent).toMatch(/small batch size/i);
      expect(container.textContent).toMatch(/individual attention/i);
      expect(container.textContent).toMatch(/homework support/i);
      expect(container.textContent).toMatch(/concept-based learning/i);
    });

    it('should display quick info strip (Requirement 1.4)', () => {
      const { container } = renderHome();
      
      // Check for quick info
      expect(container.textContent).toMatch(/standards/i);
      expect(container.textContent).toMatch(/subjects/i);
      expect(container.textContent).toMatch(/location/i);
    });
  });

  describe('Admissions Urgency Banner', () => {
    it('should render the admissions banner (Requirement 9.1)', () => {
      const { container } = renderHome();
      
      // Check for banner message
      expect(container.textContent).toMatch(/limited seats/i);
      expect(container.textContent).toMatch(/admissions open/i);
    });

    it('should display the banner prominently', () => {
      const { container } = renderHome();
      
      // Check for banner element
      const banner = container.querySelector('.admissions-banner');
      expect(banner).toBeInTheDocument();
    });
  });

  describe('Testimonials Preview Section', () => {
    it('should render the testimonials section', () => {
      renderHome();
      
      // Check for section title
      const title = screen.getByRole('heading', { name: /what parents say/i });
      expect(title).toBeInTheDocument();
    });

    it('should display testimonial cards', () => {
      const { container } = renderHome();
      
      // Check for testimonial cards
      const cards = container.querySelectorAll('.card--testimonial');
      expect(cards.length).toBeGreaterThan(0);
    });

    it('should display "View All Testimonials" CTA', () => {
      renderHome();
      
      // Check for View All button
      const viewAllButton = screen.getByRole('link', { name: /view all testimonials/i });
      expect(viewAllButton).toBeInTheDocument();
    });
  });

  describe('FAQ Section', () => {
    it('should render the FAQ section (Requirement 10.1)', () => {
      renderHome();
      
      // Check for section title
      const title = screen.getByRole('heading', { name: /frequently asked questions/i });
      expect(title).toBeInTheDocument();
    });

    it('should display FAQ items', () => {
      const { container } = renderHome();
      
      // Check for FAQ items
      const faqItems = container.querySelectorAll('.faq-item');
      expect(faqItems.length).toBeGreaterThan(0);
    });

    it('should display common questions', () => {
      const { container } = renderHome();
      
      // Check for common questions
      expect(container.textContent).toMatch(/batch size/i);
      expect(container.textContent).toMatch(/fees/i);
      expect(container.textContent).toMatch(/homework support/i);
      expect(container.textContent).toMatch(/demo class/i);
    });
  });

  describe('Section Ordering and Flow', () => {
    it('should display sections in the correct order', () => {
      const { container } = renderHome();
      
      // Get all text content
      const textContent = container.textContent;
      
      // Check order by finding indices
      const heroIndex = textContent.indexOf('Personalized Tuition Classes');
      const bannerIndex = textContent.indexOf('Limited Seats');
      const testimonialsIndex = textContent.indexOf('What Parents Say');
      const faqIndex = textContent.indexOf('Frequently Asked Questions');
      
      // Verify order
      expect(heroIndex).toBeLessThan(bannerIndex);
      expect(bannerIndex).toBeLessThan(testimonialsIndex);
      expect(testimonialsIndex).toBeLessThan(faqIndex);
    });

    it('should use Section component with proper variants', () => {
      const { container } = renderHome();
      
      // Check for section variants
      const alternateSections = container.querySelectorAll('.section--alternate');
      const defaultSections = container.querySelectorAll('.section--default');
      
      // Should have at least one of each
      expect(alternateSections.length).toBeGreaterThan(0);
      expect(defaultSections.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      renderHome();
      
      // Check for main landmark
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });

    it('should have proper heading hierarchy', () => {
      renderHome();
      
      // Check for h1 (should be in Hero)
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
      
      // Check for h2 headings (section titles)
      const h2s = screen.getAllByRole('heading', { level: 2 });
      expect(h2s.length).toBeGreaterThan(0);
    });
  });
});
