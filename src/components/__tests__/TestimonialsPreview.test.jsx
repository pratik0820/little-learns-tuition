import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TestimonialsPreview from '../TestimonialsPreview';

describe('TestimonialsPreview Component', () => {
  describe('Default Behavior', () => {
    it('renders without crashing', () => {
      render(<TestimonialsPreview />);
      expect(screen.getByText(/View All Testimonials/i)).toBeInTheDocument();
    });

    it('displays default testimonials when no testimonials prop provided', () => {
      render(<TestimonialsPreview />);
      
      // Check for default testimonial content
      expect(screen.getByText(/Mrs. Sharma/i)).toBeInTheDocument();
      expect(screen.getByText(/Mr. Patel/i)).toBeInTheDocument();
      expect(screen.getByText(/Mrs. Reddy/i)).toBeInTheDocument();
    });

    it('displays exactly 3 testimonials by default', () => {
      const { container } = render(<TestimonialsPreview />);
      const cards = container.querySelectorAll('.card--testimonial');
      expect(cards).toHaveLength(3);
    });

    it('displays "View All Testimonials" CTA button', () => {
      render(<TestimonialsPreview />);
      const ctaButton = screen.getByText(/View All Testimonials/i);
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton.closest('a')).toHaveAttribute('href', '/testimonials');
    });
  });

  describe('Custom Testimonials', () => {
    const customTestimonials = [
      {
        id: 'test-1',
        feedback: 'Great teaching methods!',
        parentName: 'Mrs. Test',
        studentInfo: 'Parent of Class 2 student'
      },
      {
        id: 'test-2',
        feedback: 'Excellent results!',
        parentName: 'Mr. Test',
        studentInfo: 'Parent of Class 4 student'
      }
    ];

    it('displays custom testimonials when provided', () => {
      render(<TestimonialsPreview testimonials={customTestimonials} />);
      
      expect(screen.getByText(/Great teaching methods!/i)).toBeInTheDocument();
      expect(screen.getByText(/Excellent results!/i)).toBeInTheDocument();
      expect(screen.getByText(/Mrs. Test/i)).toBeInTheDocument();
      expect(screen.getByText(/Mr. Test/i)).toBeInTheDocument();
    });

    it('respects maxDisplay prop', () => {
      const manyTestimonials = [
        ...customTestimonials,
        {
          id: 'test-3',
          feedback: 'Amazing experience!',
          parentName: 'Mrs. Another',
          studentInfo: 'Parent of Class 5 student'
        },
        {
          id: 'test-4',
          feedback: 'Highly recommended!',
          parentName: 'Mr. Another',
          studentInfo: 'Parent of Class 3 student'
        }
      ];

      const { container } = render(
        <TestimonialsPreview testimonials={manyTestimonials} maxDisplay={2} />
      );
      
      const cards = container.querySelectorAll('.card--testimonial');
      expect(cards).toHaveLength(2);
    });
  });

  describe('Testimonial Card Structure', () => {
    it('displays testimonial feedback in quotes', () => {
      render(<TestimonialsPreview />);
      
      // Check that feedback is wrapped in quotes
      const feedbackElements = screen.getAllByText(/"/);
      expect(feedbackElements.length).toBeGreaterThan(0);
    });

    it('displays parent name and student info for each testimonial', () => {
      const testimonials = [
        {
          id: 1,
          feedback: 'Test feedback',
          parentName: 'Test Parent',
          studentInfo: 'Test Info'
        }
      ];

      render(<TestimonialsPreview testimonials={testimonials} />);
      
      expect(screen.getByText('Test Parent')).toBeInTheDocument();
      expect(screen.getByText('Test Info')).toBeInTheDocument();
    });

    it('uses testimonial card type from Card component', () => {
      const { container } = render(<TestimonialsPreview />);
      const cards = container.querySelectorAll('.card--testimonial');
      expect(cards.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Grid Layout', () => {
    it('applies testimonials-preview__grid class for grid layout', () => {
      const { container } = render(<TestimonialsPreview />);
      const grid = container.querySelector('.testimonials-preview__grid');
      expect(grid).toBeInTheDocument();
    });

    it('wraps CTA button in centered container', () => {
      const { container } = render(<TestimonialsPreview />);
      const ctaContainer = container.querySelector('.testimonials-preview__cta');
      expect(ctaContainer).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('CTA button has proper link semantics', () => {
      render(<TestimonialsPreview />);
      const ctaLink = screen.getByText(/View All Testimonials/i).closest('a');
      expect(ctaLink).toHaveAttribute('href', '/testimonials');
    });

    it('testimonial content is properly structured', () => {
      const { container } = render(<TestimonialsPreview />);
      
      // Check for proper semantic structure
      const feedbacks = container.querySelectorAll('.testimonials-preview__feedback');
      const authors = container.querySelectorAll('.testimonials-preview__author');
      
      expect(feedbacks.length).toBeGreaterThan(0);
      expect(authors.length).toBeGreaterThan(0);
      expect(feedbacks.length).toBe(authors.length);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty testimonials array', () => {
      const { container } = render(<TestimonialsPreview testimonials={[]} />);
      
      // Should fall back to default testimonials
      const cards = container.querySelectorAll('.card--testimonial');
      expect(cards).toHaveLength(3);
    });

    it('handles single testimonial', () => {
      const singleTestimonial = [
        {
          id: 1,
          feedback: 'Single testimonial',
          parentName: 'Single Parent',
          studentInfo: 'Single Info'
        }
      ];

      const { container } = render(<TestimonialsPreview testimonials={singleTestimonial} />);
      const cards = container.querySelectorAll('.card--testimonial');
      expect(cards).toHaveLength(1);
    });

    it('handles maxDisplay of 2', () => {
      const { container } = render(<TestimonialsPreview maxDisplay={2} />);
      const cards = container.querySelectorAll('.card--testimonial');
      expect(cards).toHaveLength(2);
    });
  });
});
