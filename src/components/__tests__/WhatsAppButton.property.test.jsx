import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import WhatsAppButton from '../WhatsAppButton';

/**
 * Property-Based Tests for WhatsApp Button Component
 * 
 * These tests validate universal properties that should hold true
 * for the WhatsApp button across all pages and configurations.
 */

describe('WhatsApp Button Component - Property-Based Tests', () => {
  /**
   * Property 2: Global WhatsApp Button Presence
   * 
   * **Validates: Requirements 3.1**
   * 
   * For any page in the website, a WhatsApp contact button should be 
   * present and visible in the DOM.
   * 
   * This test verifies that the WhatsApp button is always rendered
   * with the correct structure, accessibility attributes, and link
   * regardless of the configuration provided.
   */
  describe('Property 2: Global WhatsApp Button Presence', () => {
    it('should always render a WhatsApp button with valid link structure', () => {
      // Define arbitraries for WhatsApp button props
      const phoneNumberArbitrary = fc.string({ minLength: 10, maxLength: 15 })
        .map(s => s.replace(/\D/g, '').slice(0, 12)); // Generate numeric phone numbers
      
      const messageArbitrary = fc.string({ minLength: 1, maxLength: 200 });
      
      const ariaLabelArbitrary = fc.string({ minLength: 5, maxLength: 100 });
      
      // Property: For any configuration, the WhatsApp button should be present and valid
      fc.assert(
        fc.property(
          phoneNumberArbitrary,
          messageArbitrary,
          ariaLabelArbitrary,
          (phoneNumber, message, ariaLabel) => {
            // Render the WhatsApp button with generated props
            const { container } = render(
              <WhatsAppButton 
                phoneNumber={phoneNumber}
                message={message}
                ariaLabel={ariaLabel}
              />
            );
            
            // 1. Verify the button is present in the DOM
            const whatsappLink = container.querySelector('a.whatsapp-button');
            expect(whatsappLink).toBeInTheDocument();
            
            // 2. Verify the link has the correct WhatsApp URL structure
            const href = whatsappLink.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toMatch(/^https:\/\/wa\.me\//);
            
            // 3. Verify the link contains the phone number
            if (phoneNumber && phoneNumber.length > 0) {
              expect(href).toContain(phoneNumber);
            }
            
            // 4. Verify the link contains the encoded message
            if (message && message.length > 0) {
              expect(href).toContain('?text=');
              expect(href).toContain(encodeURIComponent(message));
            }
            
            // 5. Verify accessibility attributes
            expect(whatsappLink).toHaveAttribute('aria-label');
            const actualAriaLabel = whatsappLink.getAttribute('aria-label');
            expect(actualAriaLabel).toBe(ariaLabel);
            
            // 6. Verify security attributes for external links
            expect(whatsappLink).toHaveAttribute('target', '_blank');
            expect(whatsappLink).toHaveAttribute('rel', 'noopener noreferrer');
            
            // 7. Verify the WhatsApp icon is present
            const icon = whatsappLink.querySelector('svg.whatsapp-button__icon');
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveAttribute('aria-hidden', 'true');
            
            // 8. Verify the pulse animation element is present
            const pulse = whatsappLink.querySelector('.whatsapp-button__pulse');
            expect(pulse).toBeInTheDocument();
            
            return true;
          }
        ),
        {
          numRuns: 5, // Run 5 test cases with different configurations
          verbose: false
        }
      );
    });

    it('should render with default props when no props are provided', () => {
      // Property: The button should always render even without explicit props
      const { container } = render(<WhatsAppButton />);
      
      // Verify the button is present
      const whatsappLink = container.querySelector('a.whatsapp-button');
      expect(whatsappLink).toBeInTheDocument();
      
      // Verify default values are used
      const href = whatsappLink.getAttribute('href');
      expect(href).toMatch(/^https:\/\/wa\.me\//);
      expect(href).toContain('91XXXXXXXXXX'); // Default phone number
      
      // Verify default aria-label
      expect(whatsappLink).toHaveAttribute('aria-label', 'Contact us on WhatsApp');
      
      // Verify structure
      const icon = whatsappLink.querySelector('svg.whatsapp-button__icon');
      expect(icon).toBeInTheDocument();
      
      const pulse = whatsappLink.querySelector('.whatsapp-button__pulse');
      expect(pulse).toBeInTheDocument();
    });

    it('should always have the whatsapp-button CSS class for styling', () => {
      // Define arbitrary for phone number
      const phoneNumberArbitrary = fc.string({ minLength: 10, maxLength: 15 })
        .map(s => s.replace(/\D/g, '').slice(0, 12));
      
      // Property: The button should always have the correct CSS class
      fc.assert(
        fc.property(
          phoneNumberArbitrary,
          (phoneNumber) => {
            const { container } = render(
              <WhatsAppButton phoneNumber={phoneNumber} />
            );
            
            // Verify the whatsapp-button class is present
            const whatsappLink = container.querySelector('a');
            expect(whatsappLink).toHaveClass('whatsapp-button');
            
            return true;
          }
        ),
        {
          numRuns: 5,
          verbose: false
        }
      );
    });

    it('should properly encode special characters in messages', () => {
      // Define arbitrary for messages with special characters
      const specialMessageArbitrary = fc.string({ minLength: 1, maxLength: 100 })
        .map(s => s + ' & special chars: @#$%');
      
      // Property: Special characters in messages should be properly URL encoded
      fc.assert(
        fc.property(
          specialMessageArbitrary,
          (message) => {
            const { container } = render(
              <WhatsAppButton message={message} />
            );
            
            const whatsappLink = container.querySelector('a.whatsapp-button');
            const href = whatsappLink.getAttribute('href');
            
            // Verify the message is URL encoded
            expect(href).toContain('?text=');
            expect(href).toContain(encodeURIComponent(message));
            
            // Verify special characters are encoded (not raw)
            if (message.includes('&')) {
              expect(href).toContain('%26'); // & should be encoded
            }
            if (message.includes(' ')) {
              expect(href).toContain('%20'); // space should be encoded
            }
            
            return true;
          }
        ),
        {
          numRuns: 5,
          verbose: false
        }
      );
    });
  });
});
