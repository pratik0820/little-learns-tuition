import { describe, it, expect } from 'vitest';
import { 
  generateWhatsAppURL, 
  getContextualWhatsAppURL,
  WHATSAPP_CONFIG,
  WHATSAPP_MESSAGES 
} from '../whatsapp';

/**
 * Integration tests for WhatsApp functionality
 * 
 * These tests verify that the WhatsApp integration works correctly
 * across different contexts and scenarios.
 */
describe('WhatsApp Integration Tests', () => {
  describe('URL Generation and Opening', () => {
    it('should generate valid WhatsApp URLs that can be opened', () => {
      const url = generateWhatsAppURL();
      
      // Verify URL structure
      expect(url).toMatch(/^https:\/\/wa\.me\/[\dX]+\?text=.+$/);
      
      // Verify URL is properly encoded (no spaces)
      expect(url).not.toContain(' ');
      
      // Verify URL contains phone number
      expect(url).toContain(WHATSAPP_CONFIG.phoneNumber);
    });

    it('should generate different URLs for different contexts', () => {
      const homeUrl = getContextualWhatsAppURL('home');
      const contactUrl = getContextualWhatsAppURL('contact');
      const aboutUrl = getContextualWhatsAppURL('about');
      
      // All URLs should be valid
      expect(homeUrl).toMatch(/^https:\/\/wa\.me\//);
      expect(contactUrl).toMatch(/^https:\/\/wa\.me\//);
      expect(aboutUrl).toMatch(/^https:\/\/wa\.me\//);
      
      // URLs should have different messages
      expect(homeUrl).not.toBe(contactUrl);
      expect(contactUrl).not.toBe(aboutUrl);
      expect(homeUrl).not.toBe(aboutUrl);
    });

    it('should generate class-specific URLs for classes page', () => {
      const class12Url = getContextualWhatsAppURL('classes', 'class12');
      const class35Url = getContextualWhatsAppURL('classes', 'class35');
      
      // Both should be valid
      expect(class12Url).toMatch(/^https:\/\/wa\.me\//);
      expect(class35Url).toMatch(/^https:\/\/wa\.me\//);
      
      // Should have different messages
      expect(class12Url).not.toBe(class35Url);
      
      // Should contain class-specific text
      expect(class12Url).toContain(encodeURIComponent('Class 1-2'));
      expect(class35Url).toContain(encodeURIComponent('Class 3-5'));
    });
  });

  describe('Phone Number Configuration', () => {
    it('should use configured phone number in all URLs', () => {
      const contexts = ['home', 'contact', 'about'];
      
      contexts.forEach(context => {
        const url = getContextualWhatsAppURL(context);
        expect(url).toContain(WHATSAPP_CONFIG.phoneNumber);
      });
    });

    it('should allow custom phone number override', () => {
      const customPhone = '919876543210';
      const url = generateWhatsAppURL(null, customPhone);
      
      expect(url).toContain(customPhone);
      expect(url).not.toContain(WHATSAPP_CONFIG.phoneNumber);
    });
  });

  describe('Message Templates', () => {
    it('should use appropriate message for each context', () => {
      const homeUrl = getContextualWhatsAppURL('home');
      const contactUrl = getContextualWhatsAppURL('contact');
      const aboutUrl = getContextualWhatsAppURL('about');
      
      // Verify each URL contains its respective message
      expect(homeUrl).toContain(encodeURIComponent(WHATSAPP_MESSAGES.home));
      expect(contactUrl).toContain(encodeURIComponent(WHATSAPP_MESSAGES.contact));
      expect(aboutUrl).toContain(encodeURIComponent(WHATSAPP_MESSAGES.about));
    });

    it('should properly encode all message templates', () => {
      const contexts = ['home', 'contact', 'about'];
      
      contexts.forEach(context => {
        const url = getContextualWhatsAppURL(context);
        
        // URL should not contain unencoded spaces
        expect(url).not.toContain(' ');
        
        // URL should contain encoded versions of spaces
        expect(url).toContain('%20'); // space
        
        // Note: encodeURIComponent doesn't encode: - _ . ! ~ * ' ( )
        // These characters are safe in URLs and don't need encoding
      });
    });
  });

  describe('URL Validity', () => {
    it('should generate URLs that match WhatsApp API format', () => {
      const url = generateWhatsAppURL();
      
      // Should start with wa.me
      expect(url).toMatch(/^https:\/\/wa\.me\//);
      
      // Should have phone number after wa.me/
      expect(url).toMatch(/wa\.me\/[\dX]+/);
      
      // Should have text parameter
      expect(url).toContain('?text=');
      
      // Should have only one query parameter
      expect(url.split('?').length).toBe(2);
    });

    it('should handle special characters in messages correctly', () => {
      const specialMessage = "Hello! I'm interested & want to know more?";
      const url = generateWhatsAppURL(specialMessage);
      
      // Should encode special characters
      expect(url).toContain('%20'); // space
      expect(url).toContain('%26'); // &
      expect(url).toContain('%3F'); // ?
      
      // Should not break URL structure
      expect(url).toMatch(/^https:\/\/wa\.me\/[\dX]+\?text=.+$/);
    });

    it('should handle long messages without breaking URL', () => {
      const longMessage = 'A'.repeat(500);
      const url = generateWhatsAppURL(longMessage);
      
      // Should still be a valid URL
      expect(url).toMatch(/^https:\/\/wa\.me\//);
      expect(url).toContain('?text=');
      
      // Should contain the long message (encoded)
      expect(url.length).toBeGreaterThan(500);
    });
  });

  describe('Context Fallback', () => {
    it('should fallback to home message for invalid context', () => {
      const invalidUrl = getContextualWhatsAppURL('invalid-context');
      const homeUrl = getContextualWhatsAppURL('home');
      
      // Should use home message as fallback
      expect(invalidUrl).toBe(homeUrl);
    });

    it('should fallback to home message for classes without subcontext', () => {
      const classesUrl = getContextualWhatsAppURL('classes');
      const homeUrl = getContextualWhatsAppURL('home');
      
      // Should use home message as fallback
      expect(classesUrl).toBe(homeUrl);
    });

    it('should fallback to home message for invalid subcontext', () => {
      const invalidSubUrl = getContextualWhatsAppURL('classes', 'invalid-class');
      const homeUrl = getContextualWhatsAppURL('home');
      
      // Should use home message as fallback
      expect(invalidSubUrl).toBe(homeUrl);
    });
  });

  describe('Real-world Scenarios', () => {
    it('should generate correct URL for home page hero button', () => {
      const url = getContextualWhatsAppURL('home');
      
      expect(url).toContain('wa.me');
      expect(url).toContain(WHATSAPP_CONFIG.phoneNumber);
      expect(url).toContain(encodeURIComponent("I'm interested in enrolling my child"));
    });

    it('should generate correct URL for classes page enquiry', () => {
      const url = getContextualWhatsAppURL('classes', 'class12');
      
      expect(url).toContain('wa.me');
      expect(url).toContain(WHATSAPP_CONFIG.phoneNumber);
      expect(url).toContain(encodeURIComponent('Class 1-2'));
    });

    it('should generate correct URL for contact page', () => {
      const url = getContextualWhatsAppURL('contact');
      
      expect(url).toContain('wa.me');
      expect(url).toContain(WHATSAPP_CONFIG.phoneNumber);
      expect(url).toContain(encodeURIComponent('via your website'));
    });

    it('should generate correct URL for about page', () => {
      const url = getContextualWhatsAppURL('about');
      
      expect(url).toContain('wa.me');
      expect(url).toContain(WHATSAPP_CONFIG.phoneNumber);
      expect(url).toContain(encodeURIComponent('teaching approach'));
    });
  });
});
