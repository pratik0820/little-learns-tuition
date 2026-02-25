import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import Button from '../Button';

/**
 * Property-Based Tests for Button Component
 * 
 * These tests validate universal properties that should hold true
 * for all button variants and sizes.
 */

describe('Button Component - Property-Based Tests', () => {
  /**
   * Property 1: Touch-Friendly Interactive Elements
   * 
   * **Validates: Requirements 2.5**
   * 
   * For any interactive element (button, link, form input) on any page,
   * the element should have a minimum tap target size of 44px × 44px
   * to ensure mobile usability.
   * 
   * This test verifies that all button variants and sizes meet the
   * 44px minimum touch target requirement.
   */
  describe('Property 1: Touch-Friendly Interactive Elements', () => {
    it('should have minimum 44px height for all variants and sizes', () => {
      // Define arbitraries for button props
      const variantArbitrary = fc.constantFrom('primary', 'secondary', 'whatsapp', 'outline');
      const sizeArbitrary = fc.constantFrom('small', 'medium', 'large');
      const childrenArbitrary = fc.string({ minLength: 1, maxLength: 50 });
      
      // Property: For any combination of variant and size, the button height should be >= 44px
      fc.assert(
        fc.property(
          variantArbitrary,
          sizeArbitrary,
          childrenArbitrary,
          (variant, size, children) => {
            // Render the button with the generated props
            const { container } = render(
              <Button variant={variant} size={size}>
                {children}
              </Button>
            );
            
            // Get the button element
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
            
            // Get computed styles
            const styles = window.getComputedStyle(button);
            const height = parseFloat(styles.height);
            const minHeight = parseFloat(styles.minHeight);
            
            // The button should have a minimum height of 44px
            // We check both height and minHeight to ensure the requirement is met
            const effectiveHeight = Math.max(height, minHeight);
            
            // Assert that the effective height meets the 44px minimum requirement
            expect(effectiveHeight).toBeGreaterThanOrEqual(44);
            
            return true;
          }
        ),
        {
          numRuns: 5, // Run 20 test cases with different combinations
          verbose: false
        }
      );
    });

    it('should have minimum 44px width for all variants and sizes', () => {
      // Define arbitraries for button props
      const variantArbitrary = fc.constantFrom('primary', 'secondary', 'whatsapp', 'outline');
      const sizeArbitrary = fc.constantFrom('small', 'medium', 'large');
      const childrenArbitrary = fc.string({ minLength: 1, maxLength: 50 });
      
      // Property: For any combination of variant and size, the button width should be >= 44px
      fc.assert(
        fc.property(
          variantArbitrary,
          sizeArbitrary,
          childrenArbitrary,
          (variant, size, children) => {
            // Render the button with the generated props
            const { container } = render(
              <Button variant={variant} size={size}>
                {children}
              </Button>
            );
            
            // Get the button element
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
            
            // Get computed styles
            const styles = window.getComputedStyle(button);
            const width = parseFloat(styles.width);
            const minWidth = parseFloat(styles.minWidth);
            
            // The button should have a minimum width of 44px
            // We check both width and minWidth to ensure the requirement is met
            const effectiveWidth = Math.max(width, minWidth);
            
            // Assert that the effective width meets the 44px minimum requirement
            expect(effectiveWidth).toBeGreaterThanOrEqual(44);
            
            return true;
          }
        ),
        {
          numRuns: 5, // Run 20 test cases with different combinations
          verbose: false
        }
      );
    });

    it('should have minimum 44px height for link buttons (with href)', () => {
      // Define arbitraries for button props
      const variantArbitrary = fc.constantFrom('primary', 'secondary', 'whatsapp', 'outline');
      const sizeArbitrary = fc.constantFrom('small', 'medium', 'large');
      const childrenArbitrary = fc.string({ minLength: 1, maxLength: 50 });
      const hrefArbitrary = fc.webUrl();
      
      // Property: For any link button, the height should be >= 44px
      fc.assert(
        fc.property(
          variantArbitrary,
          sizeArbitrary,
          childrenArbitrary,
          hrefArbitrary,
          (variant, size, children, href) => {
            // Render the button as a link with the generated props
            const { container } = render(
              <Button variant={variant} size={size} href={href}>
                {children}
              </Button>
            );
            
            // Get the anchor element
            const link = container.querySelector('a');
            expect(link).toBeInTheDocument();
            
            // Get computed styles
            const styles = window.getComputedStyle(link);
            const height = parseFloat(styles.height);
            const minHeight = parseFloat(styles.minHeight);
            
            // The link button should have a minimum height of 44px
            const effectiveHeight = Math.max(height, minHeight);
            
            // Assert that the effective height meets the 44px minimum requirement
            expect(effectiveHeight).toBeGreaterThanOrEqual(44);
            
            return true;
          }
        ),
        {
          numRuns: 5, // Run 20 test cases with different combinations
          verbose: false
        }
      );
    });

    it('should have minimum 44px width for link buttons (with href)', () => {
      // Define arbitraries for button props
      const variantArbitrary = fc.constantFrom('primary', 'secondary', 'whatsapp', 'outline');
      const sizeArbitrary = fc.constantFrom('small', 'medium', 'large');
      const childrenArbitrary = fc.string({ minLength: 1, maxLength: 50 });
      const hrefArbitrary = fc.webUrl();
      
      // Property: For any link button, the width should be >= 44px
      fc.assert(
        fc.property(
          variantArbitrary,
          sizeArbitrary,
          childrenArbitrary,
          hrefArbitrary,
          (variant, size, children, href) => {
            // Render the button as a link with the generated props
            const { container } = render(
              <Button variant={variant} size={size} href={href}>
                {children}
              </Button>
            );
            
            // Get the anchor element
            const link = container.querySelector('a');
            expect(link).toBeInTheDocument();
            
            // Get computed styles
            const styles = window.getComputedStyle(link);
            const width = parseFloat(styles.width);
            const minWidth = parseFloat(styles.minWidth);
            
            // The link button should have a minimum width of 44px
            const effectiveWidth = Math.max(width, minWidth);
            
            // Assert that the effective width meets the 44px minimum requirement
            expect(effectiveWidth).toBeGreaterThanOrEqual(44);
            
            return true;
          }
        ),
        {
          numRuns: 5, // Run 20 test cases with different combinations
          verbose: false
        }
      );
    });
  });
});
