import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WhatsAppButton from '../WhatsAppButton';

describe('WhatsAppButton Component', () => {
  describe('Rendering', () => {
    it('should render the WhatsApp button', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('link', { name: /contact us on whatsapp/i });
      expect(button).toBeInTheDocument();
    });

    it('should render with correct default aria-label', () => {
      render(<WhatsAppButton />);
      const button = screen.getByLabelText('Contact us on WhatsApp');
      expect(button).toBeInTheDocument();
    });

    it('should render with custom aria-label', () => {
      render(<WhatsAppButton ariaLabel="Chat with us" />);
      const button = screen.getByLabelText('Chat with us');
      expect(button).toBeInTheDocument();
    });

    it('should render WhatsApp icon', () => {
      const { container } = render(<WhatsAppButton />);
      const icon = container.querySelector('.whatsapp-button__icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('should render pulse animation element', () => {
      const { container } = render(<WhatsAppButton />);
      const pulse = container.querySelector('.whatsapp-button__pulse');
      expect(pulse).toBeInTheDocument();
    });
  });

  describe('WhatsApp URL Generation', () => {
    it('should generate correct WhatsApp URL with default phone number and message', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('link');
      const href = button.getAttribute('href');
      
      expect(href).toContain('https://wa.me/91XXXXXXXXXX');
      expect(href).toContain('text=');
      expect(href).toContain(encodeURIComponent("Hi! I'm interested in enrolling my child"));
    });

    it('should generate correct WhatsApp URL with custom phone number', () => {
      render(<WhatsAppButton phoneNumber="919876543210" />);
      const button = screen.getByRole('link');
      const href = button.getAttribute('href');
      
      expect(href).toContain('https://wa.me/919876543210');
    });

    it('should generate correct WhatsApp URL with custom message', () => {
      const customMessage = "I want to know about Class 3-5 batch";
      render(<WhatsAppButton message={customMessage} />);
      const button = screen.getByRole('link');
      const href = button.getAttribute('href');
      
      expect(href).toContain(encodeURIComponent(customMessage));
    });

    it('should properly encode special characters in message', () => {
      const messageWithSpecialChars = "Hello! I'm interested & want to know more?";
      render(<WhatsAppButton message={messageWithSpecialChars} />);
      const button = screen.getByRole('link');
      const href = button.getAttribute('href');
      
      // Check that special characters are encoded
      expect(href).toContain('%20'); // space
      expect(href).toContain('%26'); // &
      expect(href).toContain('%3F'); // ?
    });
  });

  describe('Link Attributes', () => {
    it('should open in new tab', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('link');
      expect(button).toHaveAttribute('target', '_blank');
    });

    it('should have security attributes for external link', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('link');
      expect(button).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should have correct CSS class', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('link');
      expect(button).toHaveClass('whatsapp-button');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible label', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('link');
      expect(button).toHaveAttribute('aria-label');
    });

    it('should hide icon from screen readers', () => {
      const { container } = render(<WhatsAppButton />);
      const icon = container.querySelector('.whatsapp-button__icon');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('should be keyboard accessible', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('link');
      
      // Link elements are naturally keyboard accessible
      expect(button.tagName).toBe('A');
      expect(button).toHaveAttribute('href');
    });
  });

  describe('Fixed Positioning', () => {
    it('should have fixed position class', () => {
      const { container } = render(<WhatsAppButton />);
      const button = container.querySelector('.whatsapp-button');
      
      // Check that the element has the class that applies fixed positioning
      expect(button).toHaveClass('whatsapp-button');
    });
  });

  describe('Component Props', () => {
    it('should accept and use phoneNumber prop', () => {
      const phoneNumber = '919123456789';
      render(<WhatsAppButton phoneNumber={phoneNumber} />);
      const button = screen.getByRole('link');
      
      expect(button.getAttribute('href')).toContain(phoneNumber);
    });

    it('should accept and use message prop', () => {
      const message = 'Custom test message';
      render(<WhatsAppButton message={message} />);
      const button = screen.getByRole('link');
      
      expect(button.getAttribute('href')).toContain(encodeURIComponent(message));
    });

    it('should accept and use ariaLabel prop', () => {
      const ariaLabel = 'Custom accessibility label';
      render(<WhatsAppButton ariaLabel={ariaLabel} />);
      const button = screen.getByLabelText(ariaLabel);
      
      expect(button).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty message gracefully', () => {
      render(<WhatsAppButton message="" />);
      const button = screen.getByRole('link');
      const href = button.getAttribute('href');
      
      expect(href).toContain('https://wa.me/');
      expect(href).toContain('text=');
    });

    it('should handle very long messages', () => {
      const longMessage = 'A'.repeat(500);
      render(<WhatsAppButton message={longMessage} />);
      const button = screen.getByRole('link');
      const href = button.getAttribute('href');
      
      expect(href).toContain('https://wa.me/');
      expect(href.length).toBeGreaterThan(100);
    });

    it('should handle phone number with different formats', () => {
      // Test with phone number that has no country code prefix
      render(<WhatsAppButton phoneNumber="9876543210" />);
      const button = screen.getByRole('link');
      
      expect(button.getAttribute('href')).toContain('9876543210');
    });
  });
});
