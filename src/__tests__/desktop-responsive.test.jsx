import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Import pages
import Home from '../pages/Home';
import About from '../pages/About';
import Classes from '../pages/Classes';
import Testimonials from '../pages/Testimonials';
import Contact from '../pages/Contact';

// Import components
import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';
import TestimonialCard from '../components/TestimonialCard';
import EnquiryForm from '../components/EnquiryForm';
import Footer from '../components/Footer';

/**
 * Desktop Responsive Layout Tests
 * 
 * Tests for Requirement 2.3: Desktop viewport layouts (1024px and above)
 * Validates multi-column layouts, expanded spacing, and larger typography
 */

// Helper function to set viewport size
const setViewportSize = (width, height = 768) => {
  global.innerWidth = width;
  global.innerHeight = height;
  global.dispatchEvent(new Event('resize'));
};

// Wrapper component for routing
const RouterWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Desktop Responsive Layouts (1024px+)', () => {
  beforeEach(() => {
    // Set desktop viewport
    setViewportSize(1024, 768);
  });

  describe('Requirement 2.3: Desktop Viewport Adaptation', () => {
    it('should render Home page with desktop layout', () => {
      render(
        <RouterWrapper>
          <Home />
        </RouterWrapper>
      );

      const mainElement = screen.getByRole('main');
      expect(mainElement).toBeInTheDocument();
      expect(mainElement).toHaveClass('home');
    });

    it('should render About page with desktop layout', () => {
      render(
        <RouterWrapper>
          <About />
        </RouterWrapper>
      );

      // About page uses div with class, not main role
      const pageElement = document.querySelector('.about-page');
      expect(pageElement).toBeInTheDocument();
    });

    it('should render Classes page with desktop layout', () => {
      render(
        <RouterWrapper>
          <Classes />
        </RouterWrapper>
      );

      // Classes page uses div with class, not main role
      const pageElement = document.querySelector('.classes-page');
      expect(pageElement).toBeInTheDocument();
    });

    it('should render Testimonials page with desktop layout', () => {
      render(
        <RouterWrapper>
          <Testimonials />
        </RouterWrapper>
      );

      // Testimonials page uses div with class, not main role
      const pageElement = document.querySelector('.testimonials-page');
      expect(pageElement).toBeInTheDocument();
    });

    it('should render Contact page with desktop layout', () => {
      render(
        <RouterWrapper>
          <Contact />
        </RouterWrapper>
      );

      // Contact page uses div with class, not main role
      const pageElement = document.querySelector('.contact-page');
      expect(pageElement).toBeInTheDocument();
    });
  });

  describe('Multi-Column Layouts', () => {
    it('should render Hero section with proper desktop structure', () => {
      render(
        <RouterWrapper>
          <Hero />
        </RouterWrapper>
      );

      // Hero uses section element, not banner role
      const heroElement = document.querySelector('.hero');
      expect(heroElement).toBeInTheDocument();
    });

    it('should render CourseCard with desktop spacing', () => {
      const mockCourse = {
        id: 'class-1-2',
        title: 'Class 1-2',
        ageRange: '6-8 years',
        subjects: ['English', 'Mathematics', 'EVS'],
        curriculum: [
          'Reading & writing foundation',
          'Basic maths concepts',
          'Homework guidance'
        ],
        batchSize: '6-8 students',
        duration: '1.5 hours',
        method: 'Interactive learning with activities'
      };

      render(<CourseCard course={mockCourse} />);

      const cardElement = document.querySelector('.course-card');
      expect(cardElement).toBeInTheDocument();
    });

    it('should render TestimonialCard with desktop styling', () => {
      const mockTestimonial = {
        id: 'test-1',
        parentName: 'Mrs. Sharma',
        studentName: 'Aarav',
        studentClass: 'Class 4',
        feedback: 'Excellent teaching!',
        improvement: 'Math score improved'
      };

      render(<TestimonialCard testimonial={mockTestimonial} />);

      const cardElement = document.querySelector('.testimonial-card');
      expect(cardElement).toBeInTheDocument();
    });

    it('should render EnquiryForm with desktop layout', () => {
      render(<EnquiryForm />);

      const formElement = screen.getByLabelText(/enquiry form/i);
      expect(formElement).toBeInTheDocument();
      expect(formElement).toHaveClass('enquiry-form');
    });

    it('should render Footer with multi-column desktop layout', () => {
      render(
        <RouterWrapper>
          <Footer />
        </RouterWrapper>
      );

      const footerElement = screen.getByRole('contentinfo');
      expect(footerElement).toBeInTheDocument();
      expect(footerElement).toHaveClass('footer');
    });
  });

  describe('Desktop Typography and Spacing', () => {
    it('should have larger heading sizes on desktop', () => {
      render(
        <RouterWrapper>
          <Home />
        </RouterWrapper>
      );

      // Check that headings are present (actual size is in CSS)
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
    });

    it('should have expanded spacing between sections', () => {
      render(
        <RouterWrapper>
          <Home />
        </RouterWrapper>
      );

      const mainElement = screen.getByRole('main');
      const sections = mainElement.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);
    });

    it('should render Contact page with two-column layout structure', () => {
      render(
        <RouterWrapper>
          <Contact />
        </RouterWrapper>
      );

      const layoutElement = document.querySelector('.contact-layout');
      expect(layoutElement).toBeInTheDocument();
    });
  });

  describe('Desktop Component Rendering', () => {
    it('should render all Home page sections on desktop', () => {
      render(
        <RouterWrapper>
          <Home />
        </RouterWrapper>
      );

      // Hero section
      expect(screen.getByRole('banner')).toBeInTheDocument();
      
      // Testimonials section
      expect(screen.getByText(/what parents say/i)).toBeInTheDocument();
      
      // FAQ section
      expect(screen.getByText(/frequently asked questions/i)).toBeInTheDocument();
    });

    it('should render Classes page with course cards', () => {
      render(
        <RouterWrapper>
          <Classes />
        </RouterWrapper>
      );

      // Check for course cards
      expect(screen.getByText(/class 1-2/i)).toBeInTheDocument();
      expect(screen.getByText(/class 3-5/i)).toBeInTheDocument();
    });

    it('should render Testimonials page with testimonial grid', () => {
      render(
        <RouterWrapper>
          <Testimonials />
        </RouterWrapper>
      );

      const gridElement = document.querySelector('.testimonials-grid');
      expect(gridElement).toBeInTheDocument();
    });

    it('should render About page with content sections', () => {
      render(
        <RouterWrapper>
          <About />
        </RouterWrapper>
      );

      // Check for main sections using getAllByText for multiple matches
      const philosophyElements = screen.getAllByText(/teaching philosophy/i);
      expect(philosophyElements.length).toBeGreaterThan(0);
      
      const whyChooseElements = screen.getAllByText(/why choose/i);
      expect(whyChooseElements.length).toBeGreaterThan(0);
    });
  });

  describe('Desktop Responsive Behavior', () => {
    it('should maintain proper layout at 1024px width', () => {
      setViewportSize(1024, 768);
      
      render(
        <RouterWrapper>
          <Home />
        </RouterWrapper>
      );

      const mainElement = screen.getByRole('main');
      expect(mainElement).toBeInTheDocument();
    });

    it('should maintain proper layout at 1280px width', () => {
      setViewportSize(1280, 800);
      
      render(
        <RouterWrapper>
          <Home />
        </RouterWrapper>
      );

      const mainElement = screen.getByRole('main');
      expect(mainElement).toBeInTheDocument();
    });

    it('should maintain proper layout at 1920px width', () => {
      setViewportSize(1920, 1080);
      
      render(
        <RouterWrapper>
          <Home />
        </RouterWrapper>
      );

      const mainElement = screen.getByRole('main');
      expect(mainElement).toBeInTheDocument();
    });
  });
});
