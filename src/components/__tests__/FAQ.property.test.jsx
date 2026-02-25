import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as fc from 'fast-check';
import FAQ from '../FAQ';

/**
 * FAQ Component Property-Based Tests
 * 
 * Tests universal properties that should hold true for the FAQ component
 * across different scenarios and states.
 * 
 * **Validates: Requirements 10.3, 10.4**
 */

// Arbitrary generator for FAQ items
const faqItemArbitrary = () => {
  return fc.record({
    id: fc.oneof(
      fc.integer({ min: 1, max: 1000 }),
      fc.string({ minLength: 1, maxLength: 10 })
    ),
    question: fc.string({ minLength: 5, maxLength: 200 }).filter(s => s.trim().length >= 5),
    answer: fc.string({ minLength: 10, maxLength: 500 }).filter(s => s.trim().length >= 10)
  });
};

// Arbitrary generator for FAQ arrays
const faqArrayArbitrary = () => {
  return fc.array(faqItemArbitrary(), { minLength: 1, maxLength: 10 });
};

describe('FAQ Component - Property-Based Tests', () => {
  describe('Property 8: FAQ Item Structure', () => {
    it('should always contain both question and answer elements for any FAQ item', () => {
      /**
       * **Validates: Requirements 10.3**
       * 
       * Property: For any FAQ item in the FAQ section, the item should contain
       * both a question element and a corresponding answer element.
       * 
       * This test verifies that every FAQ item, regardless of content,
       * always has both a question and an answer element present in the DOM.
       */
      fc.assert(
        fc.property(
          faqArrayArbitrary(),
          (faqs) => {
            const { container, unmount } = render(<FAQ faqs={faqs} />);
            
            // For each FAQ item provided
            faqs.forEach((faq) => {
              // Find the FAQ item container
              const faqItems = container.querySelectorAll('.faq-item');
              expect(faqItems.length).toBe(faqs.length);
              
              // Find the specific item by question text
              const questionButton = Array.from(
                container.querySelectorAll('.faq-item__question')
              ).find(btn => btn.textContent.includes(faq.question));
              
              expect(questionButton).not.toBeNull();
              
              // Question element should exist and contain the question text
              const questionText = questionButton.querySelector('.faq-item__question-text');
              expect(questionText).not.toBeNull();
              expect(questionText.textContent).toBe(faq.question);
              
              // Answer element should exist in the same FAQ item
              const faqItem = questionButton.closest('.faq-item');
              const answerWrapper = faqItem.querySelector('.faq-item__answer-wrapper');
              expect(answerWrapper).not.toBeNull();
              
              const answerElement = answerWrapper.querySelector('.faq-item__answer');
              expect(answerElement).not.toBeNull();
              expect(answerElement.textContent).toBe(faq.answer);
            });
            
            unmount();
            return true;
          }
        ),
        { numRuns: 5 }
      );
    });

    it('should always have proper semantic structure for each FAQ item', () => {
      /**
       * **Validates: Requirements 10.3**
       * 
       * Property: Each FAQ item should have proper semantic structure with
       * button for question and div for answer.
       */
      fc.assert(
        fc.property(
          faqArrayArbitrary(),
          (faqs) => {
            const { container, unmount } = render(<FAQ faqs={faqs} />);
            
            const faqItems = container.querySelectorAll('.faq-item');
            
            faqItems.forEach((item) => {
              // Question should be a button element
              const questionButton = item.querySelector('.faq-item__question');
              expect(questionButton).not.toBeNull();
              expect(questionButton.tagName).toBe('BUTTON');
              expect(questionButton.getAttribute('type')).toBe('button');
              
              // Question should have aria-expanded attribute
              const ariaExpanded = questionButton.getAttribute('aria-expanded');
              expect(ariaExpanded).toMatch(/^(true|false)$/);
              
              // Answer wrapper should exist
              const answerWrapper = item.querySelector('.faq-item__answer-wrapper');
              expect(answerWrapper).not.toBeNull();
              
              // Answer wrapper should have aria-hidden attribute
              const ariaHidden = answerWrapper.getAttribute('aria-hidden');
              expect(ariaHidden).toMatch(/^(true|false)$/);
              
              // Answer content should exist
              const answer = item.querySelector('.faq-item__answer');
              expect(answer).not.toBeNull();
            });
            
            unmount();
            return true;
          }
        ),
        { numRuns: 5 }
      );
    });

    it('should always display icon indicator for each FAQ item', () => {
      /**
       * **Validates: Requirements 10.3**
       * 
       * Property: Each FAQ item should have an icon indicator (+ or −)
       * to show expand/collapse state.
       */
      fc.assert(
        fc.property(
          faqArrayArbitrary(),
          (faqs) => {
            const { container, unmount } = render(<FAQ faqs={faqs} />);
            
            const faqItems = container.querySelectorAll('.faq-item');
            
            faqItems.forEach((item) => {
              const icon = item.querySelector('.faq-item__icon');
              expect(icon).not.toBeNull();
              expect(icon.getAttribute('aria-hidden')).toBe('true');
              
              // Icon should contain + or − character
              const iconText = icon.textContent;
              expect(iconText).toMatch(/^[+−]$/);
            });
            
            unmount();
            return true;
          }
        ),
        { numRuns: 5 }
      );
    });
  });

  describe('Property 9: FAQ Interactive Expansion', () => {
    it('should toggle answer visibility when question is clicked', async () => {
      /**
       * **Validates: Requirements 10.4**
       * 
       * Property: For any FAQ item, clicking the question should toggle
       * the visibility of the answer (expand if collapsed, collapse if expanded).
       * 
       * This test verifies that the interactive expansion/collapse functionality
       * works correctly for any FAQ item.
       */
      await fc.assert(
        fc.asyncProperty(
          faqArrayArbitrary(),
          fc.integer({ min: 0, max: 9 }), // Index of FAQ to test
          async (faqs, indexToTest) => {
            // Ensure index is within bounds
            const testIndex = indexToTest % faqs.length;
            const testFaq = faqs[testIndex];
            
            const user = userEvent.setup();
            const { container, unmount } = render(<FAQ faqs={faqs} />);
            
            // Find the question button for the test FAQ
            const questionButtons = container.querySelectorAll('.faq-item__question');
            const targetButton = questionButtons[testIndex];
            
            // Initially, the item should be collapsed
            const faqItem = targetButton.closest('.faq-item');
            expect(faqItem.classList.contains('faq-item--expanded')).toBe(false);
            expect(targetButton.getAttribute('aria-expanded')).toBe('false');
            
            const answerWrapper = faqItem.querySelector('.faq-item__answer-wrapper');
            expect(answerWrapper.getAttribute('aria-hidden')).toBe('true');
            
            // Click to expand
            await user.click(targetButton);
            
            // After first click, item should be expanded
            expect(faqItem.classList.contains('faq-item--expanded')).toBe(true);
            expect(targetButton.getAttribute('aria-expanded')).toBe('true');
            expect(answerWrapper.getAttribute('aria-hidden')).toBe('false');
            
            // Icon should change from + to −
            const icon = targetButton.querySelector('.faq-item__icon');
            expect(icon.textContent).toBe('−');
            
            // Click again to collapse
            await user.click(targetButton);
            
            // After second click, item should be collapsed again
            expect(faqItem.classList.contains('faq-item--expanded')).toBe(false);
            expect(targetButton.getAttribute('aria-expanded')).toBe('false');
            expect(answerWrapper.getAttribute('aria-hidden')).toBe('true');
            
            // Icon should change back to +
            expect(icon.textContent).toBe('+');
            
            unmount();
            return true;
          }
        ),
        { numRuns: 5 }
      );
    }, 15000);

    it('should allow multiple FAQ items to be expanded simultaneously', async () => {
      /**
       * **Validates: Requirements 10.4**
       * 
       * Property: Multiple FAQ items can be expanded at the same time,
       * and expanding one item should not collapse others.
       */
      await fc.assert(
        fc.asyncProperty(
          faqArrayArbitrary().filter(arr => arr.length >= 2),
          async (faqs) => {
            const user = userEvent.setup();
            const { container, unmount } = render(<FAQ faqs={faqs} />);
            
            const questionButtons = container.querySelectorAll('.faq-item__question');
            
            // Expand first two items
            await user.click(questionButtons[0]);
            await user.click(questionButtons[1]);
            
            // Both should be expanded
            const firstItem = questionButtons[0].closest('.faq-item');
            const secondItem = questionButtons[1].closest('.faq-item');
            
            expect(firstItem.classList.contains('faq-item--expanded')).toBe(true);
            expect(secondItem.classList.contains('faq-item--expanded')).toBe(true);
            
            expect(questionButtons[0].getAttribute('aria-expanded')).toBe('true');
            expect(questionButtons[1].getAttribute('aria-expanded')).toBe('true');
            
            unmount();
            return true;
          }
        ),
        { numRuns: 5 }
      );
    }, 15000);

    it('should maintain correct state after multiple toggle operations', async () => {
      /**
       * **Validates: Requirements 10.4**
       * 
       * Property: The FAQ item state should remain consistent after
       * multiple expand/collapse operations.
       */
      await fc.assert(
        fc.asyncProperty(
          faqArrayArbitrary(),
          fc.integer({ min: 0, max: 9 }),
          fc.integer({ min: 2, max: 6 }), // Number of clicks
          async (faqs, indexToTest, clickCount) => {
            const testIndex = indexToTest % faqs.length;
            
            const user = userEvent.setup();
            const { container, unmount } = render(<FAQ faqs={faqs} />);
            
            const questionButtons = container.querySelectorAll('.faq-item__question');
            const targetButton = questionButtons[testIndex];
            const faqItem = targetButton.closest('.faq-item');
            
            // Click multiple times
            for (let i = 0; i < clickCount; i++) {
              await user.click(targetButton);
            }
            
            // State should match the parity of click count
            const shouldBeExpanded = clickCount % 2 === 1;
            
            expect(faqItem.classList.contains('faq-item--expanded')).toBe(shouldBeExpanded);
            expect(targetButton.getAttribute('aria-expanded')).toBe(String(shouldBeExpanded));
            
            const answerWrapper = faqItem.querySelector('.faq-item__answer-wrapper');
            expect(answerWrapper.getAttribute('aria-hidden')).toBe(String(!shouldBeExpanded));
            
            const icon = targetButton.querySelector('.faq-item__icon');
            expect(icon.textContent).toBe(shouldBeExpanded ? '−' : '+');
            
            unmount();
            return true;
          }
        ),
        { numRuns: 5 }
      );
    }, 15000);
  });

  describe('FAQ Component Default Behavior', () => {
    it('should render default FAQs when no faqs prop is provided', () => {
      /**
       * **Validates: Requirements 10.2**
       * 
       * Property: The FAQ component should always render at least the default
       * FAQ items when no custom FAQs are provided.
       */
      fc.assert(
        fc.property(
          fc.constant(null),
          () => {
            const { container, unmount } = render(<FAQ />);
            
            // Should have at least 4 default FAQ items
            const faqItems = container.querySelectorAll('.faq-item');
            expect(faqItems.length).toBeGreaterThanOrEqual(4);
            
            // Each item should have question and answer
            faqItems.forEach((item) => {
              const question = item.querySelector('.faq-item__question');
              const answer = item.querySelector('.faq-item__answer');
              
              expect(question).not.toBeNull();
              expect(answer).not.toBeNull();
              expect(question.textContent.trim().length).toBeGreaterThan(0);
              expect(answer.textContent.trim().length).toBeGreaterThan(0);
            });
            
            unmount();
            return true;
          }
        ),
        { numRuns: 5 }
      );
    });

    it('should use custom FAQs when provided', () => {
      /**
       * **Validates: Requirements 10.1, 10.2**
       * 
       * Property: When custom FAQs are provided, the component should
       * render exactly those FAQs instead of defaults.
       */
      fc.assert(
        fc.property(
          faqArrayArbitrary(),
          (faqs) => {
            const { container, unmount } = render(<FAQ faqs={faqs} />);
            
            // Should have exactly the number of FAQs provided
            const faqItems = container.querySelectorAll('.faq-item');
            expect(faqItems.length).toBe(faqs.length);
            
            // Each provided FAQ should be rendered
            faqs.forEach((faq) => {
              const questionButton = Array.from(
                container.querySelectorAll('.faq-item__question')
              ).find(btn => btn.textContent.includes(faq.question));
              
              expect(questionButton).not.toBeNull();
            });
            
            unmount();
            return true;
          }
        ),
        { numRuns: 5 }
      );
    });
  });

  describe('FAQ Accessibility Properties', () => {
    it('should always have proper ARIA attributes for accessibility', () => {
      /**
       * **Validates: Requirements 10.5**
       * 
       * Property: All FAQ items should have proper ARIA attributes
       * for screen reader accessibility.
       */
      fc.assert(
        fc.property(
          faqArrayArbitrary(),
          (faqs) => {
            const { container, unmount } = render(<FAQ faqs={faqs} />);
            
            const faqItems = container.querySelectorAll('.faq-item');
            
            faqItems.forEach((item) => {
              // Question button should have aria-expanded
              const button = item.querySelector('.faq-item__question');
              expect(button.hasAttribute('aria-expanded')).toBe(true);
              
              // Answer wrapper should have aria-hidden
              const answerWrapper = item.querySelector('.faq-item__answer-wrapper');
              expect(answerWrapper.hasAttribute('aria-hidden')).toBe(true);
              
              // Icon should have aria-hidden
              const icon = item.querySelector('.faq-item__icon');
              expect(icon.getAttribute('aria-hidden')).toBe('true');
              
              // Button should have type="button"
              expect(button.getAttribute('type')).toBe('button');
            });
            
            unmount();
            return true;
          }
        ),
        { numRuns: 5 }
      );
    });
  });
});
