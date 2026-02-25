import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestimonialCard from '../TestimonialCard';

describe('TestimonialCard', () => {
  const defaultProps = {
    feedback: "My daughter's confidence has improved tremendously.",
    parentName: "Mrs. Sharma",
    studentName: "Aarti",
    studentClass: "Class 4"
  };

  describe('Required Content Display', () => {
    it('should display parent feedback text', () => {
      render(<TestimonialCard {...defaultProps} />);
      expect(screen.getByText(/"My daughter's confidence has improved tremendously."/)).toBeInTheDocument();
    });

    it('should display parent name', () => {
      render(<TestimonialCard {...defaultProps} />);
      expect(screen.getByText('Mrs. Sharma')).toBeInTheDocument();
    });

    it('should display student name and class', () => {
      render(<TestimonialCard {...defaultProps} />);
      expect(screen.getByText(/Parent of Aarti, Class 4/)).toBeInTheDocument();
    });

    it('should format feedback with quotation marks', () => {
      render(<TestimonialCard {...defaultProps} />);
      const feedback = screen.getByText(/"My daughter's confidence has improved tremendously."/);
      expect(feedback.textContent).toMatch(/^".*"$/);
    });
  });

  describe('Optional Improvement Story', () => {
    it('should display improvement story when provided', () => {
      render(
        <TestimonialCard
          {...defaultProps}
          improvement="Math score increased from 65% to 85%"
        />
      );
      expect(screen.getByText(/Math score increased from 65% to 85%/)).toBeInTheDocument();
    });

    it('should not display improvement section when not provided', () => {
      const { container } = render(<TestimonialCard {...defaultProps} />);
      const improvementSection = container.querySelector('.testimonial-card__improvement');
      expect(improvementSection).not.toBeInTheDocument();
    });

    it('should have improvement text with proper styling class', () => {
      const { container } = render(
        <TestimonialCard
          {...defaultProps}
          improvement="Improved significantly"
        />
      );
      const improvementText = container.querySelector('.testimonial-card__improvement-text');
      expect(improvementText).toBeInTheDocument();
      expect(improvementText.textContent).toBe('Improved significantly');
    });
  });

  describe('Component Structure', () => {
    it('should render with testimonial-card class', () => {
      const { container } = render(<TestimonialCard {...defaultProps} />);
      expect(container.querySelector('.testimonial-card')).toBeInTheDocument();
    });

    it('should apply custom className when provided', () => {
      const { container } = render(
        <TestimonialCard {...defaultProps} className="custom-class" />
      );
      const card = container.querySelector('.testimonial-card');
      expect(card).toHaveClass('custom-class');
    });

    it('should have body section with feedback', () => {
      const { container } = render(<TestimonialCard {...defaultProps} />);
      const body = container.querySelector('.testimonial-card__body');
      expect(body).toBeInTheDocument();
      expect(body.querySelector('.testimonial-card__feedback')).toBeInTheDocument();
    });

    it('should have footer section with author info', () => {
      const { container } = render(<TestimonialCard {...defaultProps} />);
      const footer = container.querySelector('.testimonial-card__footer');
      expect(footer).toBeInTheDocument();
      expect(footer.querySelector('.testimonial-card__author')).toBeInTheDocument();
    });
  });

  describe('Styling Classes', () => {
    it('should apply correct CSS classes to feedback', () => {
      const { container } = render(<TestimonialCard {...defaultProps} />);
      const feedback = container.querySelector('.testimonial-card__feedback');
      expect(feedback).toBeInTheDocument();
    });

    it('should apply correct CSS classes to parent name', () => {
      const { container } = render(<TestimonialCard {...defaultProps} />);
      const parentName = container.querySelector('.testimonial-card__parent-name');
      expect(parentName).toBeInTheDocument();
    });

    it('should apply correct CSS classes to student info', () => {
      const { container } = render(<TestimonialCard {...defaultProps} />);
      const studentInfo = container.querySelector('.testimonial-card__student-info');
      expect(studentInfo).toBeInTheDocument();
    });
  });

  describe('Content Variations', () => {
    it('should handle long feedback text', () => {
      const longFeedback = "This is a very long feedback text that spans multiple lines and contains detailed information about the student's progress and the teacher's excellent methods. ".repeat(3);
      render(
        <TestimonialCard
          {...defaultProps}
          feedback={longFeedback}
        />
      );
      expect(screen.getByText(new RegExp(longFeedback))).toBeInTheDocument();
    });

    it('should handle different class levels', () => {
      render(
        <TestimonialCard
          {...defaultProps}
          studentClass="Class 1"
        />
      );
      expect(screen.getByText(/Class 1/)).toBeInTheDocument();
    });

    it('should handle names with special characters', () => {
      render(
        <TestimonialCard
          {...defaultProps}
          parentName="Mrs. O'Brien"
          studentName="Seán"
        />
      );
      expect(screen.getByText("Mrs. O'Brien")).toBeInTheDocument();
      expect(screen.getByText(/Seán/)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should render semantic HTML structure', () => {
      const { container } = render(<TestimonialCard {...defaultProps} />);
      const paragraphs = container.querySelectorAll('p');
      expect(paragraphs.length).toBeGreaterThan(0);
    });

    it('should have proper text hierarchy', () => {
      const { container } = render(<TestimonialCard {...defaultProps} />);
      const parentName = container.querySelector('.testimonial-card__parent-name');
      const studentInfo = container.querySelector('.testimonial-card__student-info');
      expect(parentName).toBeInTheDocument();
      expect(studentInfo).toBeInTheDocument();
    });
  });
});
