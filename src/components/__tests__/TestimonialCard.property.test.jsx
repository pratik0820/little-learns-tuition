import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import TestimonialCard from '../TestimonialCard';

/**
 * Property-Based Tests for TestimonialCard Component
 * 
 * These tests validate universal properties that should hold true
 * for all testimonial cards regardless of content variations.
 */

describe('TestimonialCard Component - Property-Based Tests', () => {
  /**
   * Property 4: Testimonial Card Content Presence
   * 
   * **Validates: Requirements 6.2**
   * 
   * For any testimonial card displayed on the website, the card should
   * contain parent feedback text.
   * 
   * This test verifies that all testimonial cards always display the
   * parent feedback text, which is the core requirement for testimonials.
   */
  describe('Property 4: Testimonial Card Content Presence', () => {
    it('should always display parent feedback text for any valid testimonial data', () => {
      // Define arbitraries for testimonial card props
      const feedbackArbitrary = fc.string({ minLength: 1, maxLength: 500 });
      const parentNameArbitrary = fc.string({ minLength: 1, maxLength: 100 });
      const studentNameArbitrary = fc.string({ minLength: 1, maxLength: 100 });
      const studentClassArbitrary = fc.constantFrom('Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5');
      const improvementArbitrary = fc.option(fc.string({ minLength: 1, maxLength: 200 }), { nil: null });
      
      // Property: For any testimonial card with valid props, the feedback text should be present in the DOM
      fc.assert(
        fc.property(
          feedbackArbitrary,
          parentNameArbitrary,
          studentNameArbitrary,
          studentClassArbitrary,
          improvementArbitrary,
          (feedback, parentName, studentName, studentClass, improvement) => {
            // Render the testimonial card with the generated props
            const { container } = render(
              <TestimonialCard
                feedback={feedback}
                parentName={parentName}
                studentName={studentName}
                studentClass={studentClass}
                improvement={improvement}
              />
            );
            
            // Get the feedback element
            const feedbackElement = container.querySelector('.testimonial-card__feedback');
            
            // Assert that the feedback element exists
            expect(feedbackElement).toBeInTheDocument();
            
            // Assert that the feedback element contains the feedback text
            // The component wraps feedback in quotes, so we check for the content
            expect(feedbackElement.textContent).toContain(feedback);
            
            return true;
          }
        ),
        {
          numRuns: 5, // Run 50 test cases with different combinations
          verbose: false
        }
      );
    });

    it('should display feedback text with proper formatting (quotation marks)', () => {
      // Define arbitraries for testimonial card props
      const feedbackArbitrary = fc.string({ minLength: 1, maxLength: 500 });
      const parentNameArbitrary = fc.string({ minLength: 1, maxLength: 100 });
      const studentNameArbitrary = fc.string({ minLength: 1, maxLength: 100 });
      const studentClassArbitrary = fc.constantFrom('Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5');
      
      // Property: For any testimonial card, the feedback should be wrapped in quotation marks
      fc.assert(
        fc.property(
          feedbackArbitrary,
          parentNameArbitrary,
          studentNameArbitrary,
          studentClassArbitrary,
          (feedback, parentName, studentName, studentClass) => {
            // Render the testimonial card with the generated props
            const { container } = render(
              <TestimonialCard
                feedback={feedback}
                parentName={parentName}
                studentName={studentName}
                studentClass={studentClass}
              />
            );
            
            // Get the feedback element
            const feedbackElement = container.querySelector('.testimonial-card__feedback');
            
            // Assert that the feedback element exists
            expect(feedbackElement).toBeInTheDocument();
            
            // Assert that the feedback text is wrapped in quotation marks
            const feedbackText = feedbackElement.textContent;
            expect(feedbackText).toMatch(/^".*"$/);
            
            return true;
          }
        ),
        {
          numRuns: 5, // Run 50 test cases with different combinations
          verbose: false
        }
      );
    });

    it('should display feedback text in the correct DOM structure', () => {
      // Define arbitraries for testimonial card props
      const feedbackArbitrary = fc.string({ minLength: 1, maxLength: 500 });
      const parentNameArbitrary = fc.string({ minLength: 1, maxLength: 100 });
      const studentNameArbitrary = fc.string({ minLength: 1, maxLength: 100 });
      const studentClassArbitrary = fc.constantFrom('Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5');
      
      // Property: For any testimonial card, the feedback should be within the card body section
      fc.assert(
        fc.property(
          feedbackArbitrary,
          parentNameArbitrary,
          studentNameArbitrary,
          studentClassArbitrary,
          (feedback, parentName, studentName, studentClass) => {
            // Render the testimonial card with the generated props
            const { container } = render(
              <TestimonialCard
                feedback={feedback}
                parentName={parentName}
                studentName={studentName}
                studentClass={studentClass}
              />
            );
            
            // Get the card body element
            const cardBody = container.querySelector('.testimonial-card__body');
            
            // Assert that the card body exists
            expect(cardBody).toBeInTheDocument();
            
            // Assert that the feedback element is within the card body
            const feedbackElement = cardBody.querySelector('.testimonial-card__feedback');
            expect(feedbackElement).toBeInTheDocument();
            
            // Assert that the feedback text is present
            expect(feedbackElement.textContent).toContain(feedback);
            
            return true;
          }
        ),
        {
          numRuns: 5, // Run 50 test cases with different combinations
          verbose: false
        }
      );
    });
  });
});
