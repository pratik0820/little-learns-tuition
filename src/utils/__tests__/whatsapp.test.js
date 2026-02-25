import { describe, it, expect } from 'vitest';
import { 
  generateWhatsAppURL, 
  getContextualWhatsAppURL,
  WHATSAPP_CONFIG,
  WHATSAPP_MESSAGES 
} from '../whatsapp';

describe('WhatsApp Utility Functions', () => {
  describe('generateWhatsAppURL', () => {
    it('should generate URL with default phone number and message', () => {
      const url = generateWhatsAppURL();
      
      expect(url).toContain('https://wa.me/');
      expect(url).toContain(WHATSAPP_CONFIG.phoneNumber);
      expect(url).toContain('text=');
      expect(url).toContain(encodeURIComponent(WHATSAPP_CONFIG.defaultMessage));
    });

    it('should generate URL with custom message', () => {
      const customMessage = 'I want to know about Class 1-2';
      const url = generateWhatsAppURL(customMessage);
      
      expect(url).toContain(encodeURIComponent(customMessage));
      expect(url).toContain(WHATSAPP_CONFIG.phoneNumber);
    });

    it('should generate URL with custom phone number', () => {
      const customPhone = '919876543210';
      const url = generateWhatsAppURL(null, customPhone);
      
      expect(url).toContain(customPhone);
      expect(url).toContain(encodeURIComponent(WHATSAPP_CONFIG.defaultMessage));
    });

    it('should generate URL with both custom message and phone number', () => {
      const customMessage = 'Custom enquiry message';
      const customPhone = '919123456789';
      const url = generateWhatsAppURL(customMessage, customPhone);
      
      expect(url).toContain(customPhone);
      expect(url).toContain(encodeURIComponent(customMessage));
    });

    it('should properly encode special characters in message', () => {
      const messageWithSpecialChars = "Hello! I'm interested & want to know more?";
      const url = generateWhatsAppURL(messageWithSpecialChars);
      
      // Check that special characters are encoded
      // Note: encodeURIComponent doesn't encode: - _ . ! ~ * ' ( )
      expect(url).toContain('%20'); // space
      expect(url).toContain('%26'); // &
      expect(url).toContain('%3F'); // ?
      // Apostrophe (') is not encoded by encodeURIComponent
      expect(url).toContain("'"); // apostrophe remains unencoded
    });

    it('should handle empty message', () => {
      const url = generateWhatsAppURL('');
      
      // Empty string is falsy, so it should use default message
      expect(url).toContain('https://wa.me/');
      expect(url).toContain(encodeURIComponent(WHATSAPP_CONFIG.defaultMessage));
    });

    it('should handle message with line breaks', () => {
      const messageWithLineBreaks = 'Line 1\nLine 2\nLine 3';
      const url = generateWhatsAppURL(messageWithLineBreaks);
      
      expect(url).toContain(encodeURIComponent(messageWithLineBreaks));
      expect(url).toContain('%0A'); // encoded newline
    });

    it('should handle very long messages', () => {
      const longMessage = 'A'.repeat(500);
      const url = generateWhatsAppURL(longMessage);
      
      expect(url).toContain('https://wa.me/');
      expect(url.length).toBeGreaterThan(500);
    });
  });

  describe('getContextualWhatsAppURL', () => {
    it('should return home page message by default', () => {
      const url = getContextualWhatsAppURL();
      
      expect(url).toContain(encodeURIComponent(WHATSAPP_MESSAGES.home));
    });

    it('should return home page message for "home" context', () => {
      const url = getContextualWhatsAppURL('home');
      
      expect(url).toContain(encodeURIComponent(WHATSAPP_MESSAGES.home));
    });

    it('should return contact page message for "contact" context', () => {
      const url = getContextualWhatsAppURL('contact');
      
      expect(url).toContain(encodeURIComponent(WHATSAPP_MESSAGES.contact));
    });

    it('should return about page message for "about" context', () => {
      const url = getContextualWhatsAppURL('about');
      
      expect(url).toContain(encodeURIComponent(WHATSAPP_MESSAGES.about));
    });

    it('should return Class 1-2 message for classes context with class12 subcontext', () => {
      const url = getContextualWhatsAppURL('classes', 'class12');
      
      expect(url).toContain(encodeURIComponent(WHATSAPP_MESSAGES.classes.class12));
    });

    it('should return Class 3-5 message for classes context with class35 subcontext', () => {
      const url = getContextualWhatsAppURL('classes', 'class35');
      
      expect(url).toContain(encodeURIComponent(WHATSAPP_MESSAGES.classes.class35));
    });

    it('should return home message for invalid context', () => {
      const url = getContextualWhatsAppURL('invalid-context');
      
      expect(url).toContain(encodeURIComponent(WHATSAPP_MESSAGES.home));
    });

    it('should return home message for classes context without subcontext', () => {
      const url = getContextualWhatsAppURL('classes');
      
      expect(url).toContain(encodeURIComponent(WHATSAPP_MESSAGES.home));
    });

    it('should return home message for classes context with invalid subcontext', () => {
      const url = getContextualWhatsAppURL('classes', 'invalid-class');
      
      expect(url).toContain(encodeURIComponent(WHATSAPP_MESSAGES.home));
    });

    it('should always include phone number in URL', () => {
      const contexts = ['home', 'contact', 'about'];
      
      contexts.forEach(context => {
        const url = getContextualWhatsAppURL(context);
        expect(url).toContain(WHATSAPP_CONFIG.phoneNumber);
      });
    });

    it('should always start with wa.me URL', () => {
      const contexts = ['home', 'contact', 'about', 'classes'];
      
      contexts.forEach(context => {
        const url = getContextualWhatsAppURL(context);
        expect(url).toMatch(/^https:\/\/wa\.me\//);
      });
    });
  });

  describe('WHATSAPP_CONFIG', () => {
    it('should have phoneNumber property', () => {
      expect(WHATSAPP_CONFIG).toHaveProperty('phoneNumber');
      expect(typeof WHATSAPP_CONFIG.phoneNumber).toBe('string');
    });

    it('should have defaultMessage property', () => {
      expect(WHATSAPP_CONFIG).toHaveProperty('defaultMessage');
      expect(typeof WHATSAPP_CONFIG.defaultMessage).toBe('string');
    });

    it('should have non-empty phoneNumber', () => {
      expect(WHATSAPP_CONFIG.phoneNumber.length).toBeGreaterThan(0);
    });

    it('should have non-empty defaultMessage', () => {
      expect(WHATSAPP_CONFIG.defaultMessage.length).toBeGreaterThan(0);
    });
  });

  describe('WHATSAPP_MESSAGES', () => {
    it('should have home message', () => {
      expect(WHATSAPP_MESSAGES).toHaveProperty('home');
      expect(typeof WHATSAPP_MESSAGES.home).toBe('string');
    });

    it('should have contact message', () => {
      expect(WHATSAPP_MESSAGES).toHaveProperty('contact');
      expect(typeof WHATSAPP_MESSAGES.contact).toBe('string');
    });

    it('should have about message', () => {
      expect(WHATSAPP_MESSAGES).toHaveProperty('about');
      expect(typeof WHATSAPP_MESSAGES.about).toBe('string');
    });

    it('should have classes messages object', () => {
      expect(WHATSAPP_MESSAGES).toHaveProperty('classes');
      expect(typeof WHATSAPP_MESSAGES.classes).toBe('object');
    });

    it('should have class12 message in classes', () => {
      expect(WHATSAPP_MESSAGES.classes).toHaveProperty('class12');
      expect(typeof WHATSAPP_MESSAGES.classes.class12).toBe('string');
    });

    it('should have class35 message in classes', () => {
      expect(WHATSAPP_MESSAGES.classes).toHaveProperty('class35');
      expect(typeof WHATSAPP_MESSAGES.classes.class35).toBe('string');
    });

    it('should have non-empty messages', () => {
      expect(WHATSAPP_MESSAGES.home.length).toBeGreaterThan(0);
      expect(WHATSAPP_MESSAGES.contact.length).toBeGreaterThan(0);
      expect(WHATSAPP_MESSAGES.about.length).toBeGreaterThan(0);
      expect(WHATSAPP_MESSAGES.classes.class12.length).toBeGreaterThan(0);
      expect(WHATSAPP_MESSAGES.classes.class35.length).toBeGreaterThan(0);
    });
  });

  describe('URL Format Validation', () => {
    it('should generate valid URL format', () => {
      const url = generateWhatsAppURL();
      
      // Check URL structure (phone number contains X placeholders)
      expect(url).toMatch(/^https:\/\/wa\.me\/[\dX]+\?text=.+$/);
    });

    it('should have proper query parameter format', () => {
      const url = generateWhatsAppURL('Test message');
      
      expect(url).toContain('?text=');
      expect(url.split('?text=').length).toBe(2);
    });

    it('should not have spaces in URL', () => {
      const url = generateWhatsAppURL('Message with spaces');
      
      expect(url).not.toContain(' ');
    });

    it('should properly encode all special characters', () => {
      const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const url = generateWhatsAppURL(specialChars);
      
      // encodeURIComponent doesn't encode: - _ . ! ~ * ' ( )
      // So we check that other special characters are encoded
      expect(url).toContain('%40'); // @
      expect(url).toContain('%23'); // #
      expect(url).toContain('%24'); // $
      expect(url).toContain('%5E'); // ^
      expect(url).toContain('%26'); // &
    });
  });
});
