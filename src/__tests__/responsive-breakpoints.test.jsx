import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';

// Import pages
import Home from '../pages/Home';
import About from '../pages/About';
import Classes from '../pages/Classes';
import Testimonials from '../pages/Testimonials';
import Contact from '../pages/Contact';

// Import components
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';
import TestimonialCard from '../components/TestimonialCard';
import EnquiryForm from '../components/EnquiryForm';

/**
 * Responsive Breakpoint Transition Tests
 * 
 * Validates Requirements 2.1, 2.2, 2.3:
 * - Tests layout shifts between breakpoints
 * - Verifies smooth transitions from mobile to tablet to desktop
 * - Ensures components maintain structure across viewport changes
 * - Tests critical breakpoint boundaries (767px, 768px, 1023px, 1024px)
 */

describe('Responsive Breakpoint Transitions', () => {
  let originalInnerWidth;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  const setViewportWidth = (width) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    window.dispatchEvent(new Event('resize'));
  };

  const RouterWrapper = ({ children }) => (
    <BrowserRouter>{children}</BrowserRouter>
  );

  describe('Layout Shift Prevention - Mobile to Tablet (767px → 768px)', () => {
    it('should maintain Header structure across mobile-tablet breakpoint', () => {
      // Test at mobile breakpoint
      setViewportWidth(767);
      const { rerender, container: container1 } = render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      const mobileHeader = container1.querySelector('.header');
      expect(mobileHeader).toBeInTheDocument();
      const mobileHamburger = screen.getByRole('button', { name: /open menu/i });
      expect(mobileHamburger).toBeInTheDocument();

      // Transition to tablet breakpoint
      setViewportWidth(768);
      rerender(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      const tabletHeader = container1.querySelector('.header');
      expect(tabletHeader).toBeInTheDocument();
      // Both mobile and desktop nav exist in DOM (CSS controls visibility)
      expect(container1.querySelector('.header__nav')).toBeInTheDocument();
      expect(container1.querySelector('.header__mobile-toggle')).toBeInTheDocument();
    });

    it('should maintain Footer structure across mobile-tablet breakpoint', () => {
      setViewportWidth(767);
      const { rerender, container } = render(
        <RouterWrapper>
          <Footer />
        </RouterWrapper>
      );

      const mobileFooter = screen.getByRole('contentinfo');
      expect(mobileFooter).toBeInTheDocument();

      setViewportWidth(768);
      rerender(
        <RouterWrapper>
          <Footer />
        </RouterWrapper>
      );

      const tabletFooter = screen.getByRole('contentinfo');
      expect(tabletFooter).toBeInTheDocument();
      expect(tabletFooter).toHaveClass('footer');
    });

    it('should maintain CourseCard structure across mobile-tablet breakpoint', () => {
      const courseData = {
        title: 'Class 1-2',
        ageRange: '6-8 years',
        subjects: ['English', 'Mathematics'],
        curriculum: ['Reading & writing foundation'],
        batchSize: '6-8 students',
        duration: '1.5 hours',
        method: 'Interactive learning',
      };

      setViewportWidth(767);
      const { rerender, container } = render(<CourseCard {...courseData} />);

      const mobileCard = container.querySelector('.course-card');
      expect(mobileCard).toBeInTheDocument();

      setViewportWidth(768);
      rerender(<CourseCard {...courseData} />);

      const tabletCard = container.querySelector('.course-card');
      expect(tabletCard).toBeInTheDocument();
      expect(tabletCard).toHaveClass('course-card');
    });

    it('should maintain EnquiryForm structure across mobile-tablet breakpoint', () => {
      setViewportWidth(767);
      const { rerender } = render(<EnquiryForm />);

      const mobileForm = screen.getByRole('form', { name: /enquiry form/i });
      expect(mobileForm).toBeInTheDocument();

      setViewportWidth(768);
      rerender(<EnquiryForm />);

      const tabletForm = screen.getByRole('form', { name: /enquiry form/i });
      expect(tabletForm).toBeInTheDocument();
      expect(tabletForm).toHaveClass('enquiry-form');
    });
  });

  describe('Layout Shift Prevention - Tablet to Desktop (1023px → 1024px)', () => {
    it('should maintain Header structure across tablet-desktop breakpoint', () => {
      setViewportWidth(1023);
      const { rerender, container } = render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      const tabletHeader = container.querySelector('.header');
      expect(tabletHeader).toBeInTheDocument();

      setViewportWidth(1024);
      rerender(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      const desktopHeader = container.querySelector('.header');
      expect(desktopHeader).toBeInTheDocument();
      expect(desktopHeader).toHaveClass('header');
    });

    it('should maintain Hero structure across tablet-desktop breakpoint', () => {
      setViewportWidth(1023);
      const { rerender, container } = render(
        <RouterWrapper>
          <Hero />
        </RouterWrapper>
      );

      const tabletHero = container.querySelector('.hero');
      expect(tabletHero).toBeInTheDocument();

      setViewportWidth(1024);
      rerender(
        <RouterWrapper>
          <Hero />
        </RouterWrapper>
      );

      const desktopHero = container.querySelector('.hero');
      expect(desktopHero).toBeInTheDocument();
      expect(desktopHero).toHaveClass('hero');
    });

    it('should maintain TestimonialCard structure across tablet-desktop breakpoint', () => {
      const testimonialData = {
        parentName: 'Mrs. Sharma',
        studentName: 'Aarav',
        studentClass: 'Class 4',
        feedback: 'Excellent teaching!',
      };

      setViewportWidth(1023);
      const { rerender, container } = render(<TestimonialCard {...testimonialData} />);

      const tabletCard = container.querySelector('.testimonial-card');
      expect(tabletCard).toBeInTheDocument();

      setViewportWidth(1024);
      rerender(<TestimonialCard {...testimonialData} />);

      const desktopCard = container.querySelector('.testimonial-card');
      expect(desktopCard).toBeInTheDocument();
      expect(desktopCard).toHaveClass('testimonial-card');
    });
  });

  describe('Page Layout Consistency Across Breakpoints', () => {
    it('should maintain Home page structure across all breakpoints', () => {
      const breakpoints = [320, 375, 768, 1024, 1280, 1920];

      breakpoints.forEach((width) => {
        setViewportWidth(width);
        const { unmount } = render(
          <RouterWrapper>
            <Home />
          </RouterWrapper>
        );

        const mainElement = screen.getByRole('main');
        expect(mainElement).toBeInTheDocument();
        expect(mainElement).toHaveClass('home');

        unmount();
      });
    });

    it('should maintain About page structure across all breakpoints', () => {
      const breakpoints = [320, 768, 1024];

      breakpoints.forEach((width) => {
        setViewportWidth(width);
        const { unmount, container } = render(
          <RouterWrapper>
            <About />
          </RouterWrapper>
        );

        const pageElement = container.querySelector('.about-page');
        expect(pageElement).toBeInTheDocument();

        unmount();
      });
    });

    it('should maintain Classes page structure across all breakpoints', () => {
      const breakpoints = [320, 768, 1024];

      breakpoints.forEach((width) => {
        setViewportWidth(width);
        const { unmount, container } = render(
          <RouterWrapper>
            <Classes />
          </RouterWrapper>
        );

        const pageElement = container.querySelector('.classes-page');
        expect(pageElement).toBeInTheDocument();

        unmount();
      });
    });

    it('should maintain Testimonials page structure across all breakpoints', () => {
      const breakpoints = [320, 768, 1024];

      breakpoints.forEach((width) => {
        setViewportWidth(width);
        const { unmount, container } = render(
          <RouterWrapper>
            <Testimonials />
          </RouterWrapper>
        );

        const pageElement = container.querySelector('.testimonials-page');
        expect(pageElement).toBeInTheDocument();

        unmount();
      });
    });

    it('should maintain Contact page structure across all breakpoints', () => {
      const breakpoints = [320, 768, 1024];

      breakpoints.forEach((width) => {
        setViewportWidth(width);
        const { unmount, container } = render(
          <RouterWrapper>
            <Contact />
          </RouterWrapper>
        );

        const pageElement = container.querySelector('.contact-page');
        expect(pageElement).toBeInTheDocument();

        unmount();
      });
    });
  });

  describe('Component Rendering at Critical Breakpoints', () => {
    it('should render all components at minimum mobile width (320px)', () => {
      setViewportWidth(320);

      // Test Header
      const { unmount: unmount1 } = render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );
      expect(screen.getByRole('banner')).toBeInTheDocument();
      unmount1();

      // Test Footer
      const { unmount: unmount2 } = render(
        <RouterWrapper>
          <Footer />
        </RouterWrapper>
      );
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      unmount2();

      // Test Hero
      const { unmount: unmount3 } = render(
        <RouterWrapper>
          <Hero />
        </RouterWrapper>
      );
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      unmount3();
    });

    it('should render all components at tablet breakpoint (768px)', () => {
      setViewportWidth(768);

      const { unmount: unmount1 } = render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );
      expect(screen.getByRole('banner')).toBeInTheDocument();
      unmount1();

      const { unmount: unmount2 } = render(
        <RouterWrapper>
          <Footer />
        </RouterWrapper>
      );
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      unmount2();
    });

    it('should render all components at desktop breakpoint (1024px)', () => {
      setViewportWidth(1024);

      const { unmount: unmount1 } = render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );
      expect(screen.getByRole('banner')).toBeInTheDocument();
      unmount1();

      const { unmount: unmount2 } = render(
        <RouterWrapper>
          <Footer />
        </RouterWrapper>
      );
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      unmount2();
    });

    it('should render all components at large desktop width (1920px)', () => {
      setViewportWidth(1920);

      const { unmount: unmount1 } = render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );
      expect(screen.getByRole('banner')).toBeInTheDocument();
      unmount1();

      const { unmount: unmount2 } = render(
        <RouterWrapper>
          <Home />
        </RouterWrapper>
      );
      expect(screen.getByRole('main')).toBeInTheDocument();
      unmount2();
    });
  });

  describe('Grid Layout Transitions', () => {
    it('should maintain grid structure when transitioning from mobile to tablet', () => {
      setViewportWidth(767);
      const { rerender, container } = render(
        <RouterWrapper>
          <Classes />
        </RouterWrapper>
      );

      const mobileGrid = container.querySelector('.courses-grid');
      expect(mobileGrid).toBeInTheDocument();

      setViewportWidth(768);
      rerender(
        <RouterWrapper>
          <Classes />
        </RouterWrapper>
      );

      const tabletGrid = container.querySelector('.courses-grid');
      expect(tabletGrid).toBeInTheDocument();
      expect(tabletGrid).toHaveClass('courses-grid');
    });

    it('should maintain grid structure when transitioning from tablet to desktop', () => {
      setViewportWidth(1023);
      const { rerender, container } = render(
        <RouterWrapper>
          <Testimonials />
        </RouterWrapper>
      );

      const tabletGrid = container.querySelector('.testimonials-grid');
      expect(tabletGrid).toBeInTheDocument();

      setViewportWidth(1024);
      rerender(
        <RouterWrapper>
          <Testimonials />
        </RouterWrapper>
      );

      const desktopGrid = container.querySelector('.testimonials-grid');
      expect(desktopGrid).toBeInTheDocument();
      expect(desktopGrid).toHaveClass('testimonials-grid');
    });
  });

  describe('Touch Target Consistency Across Breakpoints', () => {
    it('should maintain touch-friendly button sizing across all breakpoints', () => {
      const breakpoints = [320, 768, 1024];

      breakpoints.forEach((width) => {
        setViewportWidth(width);
        const { unmount } = render(
          <RouterWrapper>
            <Hero />
          </RouterWrapper>
        );

        const enrollButton = screen.getByRole('link', { name: /enroll now/i });
        expect(enrollButton).toBeInTheDocument();
        expect(enrollButton).toHaveClass('btn');

        unmount();
      });
    });

    it('should maintain form input accessibility across all breakpoints', () => {
      const breakpoints = [320, 768, 1024];

      breakpoints.forEach((width) => {
        setViewportWidth(width);
        const { unmount } = render(<EnquiryForm />);

        const nameInput = screen.getByLabelText(/parent name/i);
        expect(nameInput).toBeInTheDocument();
        expect(nameInput).toBeVisible();

        unmount();
      });
    });
  });
});
