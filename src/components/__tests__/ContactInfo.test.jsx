import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactInfo from '../ContactInfo';

describe('ContactInfo Component', () => {
  describe('Phone Number Display', () => {
    it('should display phone number with click-to-call link', () => {
      const phoneNumber = '+91 9876543210';
      render(<ContactInfo phoneNumber={phoneNumber} />);
      
      const phoneLink = screen.getByRole('link', { name: /call/i });
      expect(phoneLink).toBeInTheDocument();
      expect(phoneLink).toHaveAttribute('href', 'tel:+919876543210');
      expect(screen.getByText(phoneNumber)).toBeInTheDocument();
    });

    it('should format phone number correctly for tel: protocol', () => {
      render(<ContactInfo phoneNumber="+91 98765-43210" />);
      
      const phoneLink = screen.getByRole('link', { name: /call/i });
      expect(phoneLink).toHaveAttribute('href', 'tel:+919876543210');
    });

    it('should display "Call Us" heading', () => {
      render(<ContactInfo />);
      
      expect(screen.getByRole('heading', { name: /call us/i })).toBeInTheDocument();
    });
  });

  describe('WhatsApp Button Display', () => {
    it('should display WhatsApp button', () => {
      render(<ContactInfo />);
      
      const whatsappButton = screen.getByRole('link', { name: /contact us on whatsapp/i });
      expect(whatsappButton).toBeInTheDocument();
      expect(whatsappButton).toHaveAttribute('href');
      expect(whatsappButton.getAttribute('href')).toContain('wa.me');
    });

    it('should use custom WhatsApp message', () => {
      const customMessage = 'Custom enquiry message';
      render(<ContactInfo whatsappMessage={customMessage} />);
      
      const whatsappButton = screen.getByRole('link', { name: /contact us on whatsapp/i });
      const href = whatsappButton.getAttribute('href');
      expect(href).toContain(encodeURIComponent(customMessage));
    });

    it('should display "WhatsApp" heading', () => {
      render(<ContactInfo />);
      
      expect(screen.getByRole('heading', { name: /whatsapp/i })).toBeInTheDocument();
    });
  });

  describe('Address Display', () => {
    it('should display address with proper formatting', () => {
      const address = {
        street: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001'
      };
      render(<ContactInfo address={address} />);
      
      expect(screen.getByText(address.street)).toBeInTheDocument();
      expect(screen.getByText(`${address.city}, ${address.state}`)).toBeInTheDocument();
      expect(screen.getByText(address.pincode)).toBeInTheDocument();
    });

    it('should display "Visit Us" heading', () => {
      render(<ContactInfo />);
      
      expect(screen.getByRole('heading', { name: /visit us/i })).toBeInTheDocument();
    });

    it('should use semantic address element', () => {
      render(<ContactInfo />);
      
      const addressElement = document.querySelector('address');
      expect(addressElement).toBeInTheDocument();
    });
  });

  describe('Operating Hours Display', () => {
    it('should display operating hours when provided', () => {
      const operatingHours = {
        weekdays: 'Monday - Friday',
        timing: '9:00 AM - 5:00 PM',
        closed: 'Sunday'
      };
      render(<ContactInfo operatingHours={operatingHours} />);
      
      expect(screen.getByText(/monday - friday/i)).toBeInTheDocument();
      expect(screen.getByText(/9:00 AM - 5:00 PM/i)).toBeInTheDocument();
      expect(screen.getByText(/sunday/i)).toBeInTheDocument();
      expect(screen.getByText(/closed/i)).toBeInTheDocument();
    });

    it('should display "Operating Hours" heading', () => {
      render(<ContactInfo />);
      
      expect(screen.getByRole('heading', { name: /operating hours/i })).toBeInTheDocument();
    });

    it('should not display operating hours card when operatingHours is null', () => {
      render(<ContactInfo operatingHours={null} />);
      
      expect(screen.queryByRole('heading', { name: /operating hours/i })).not.toBeInTheDocument();
    });
  });

  describe('Card Layout', () => {
    it('should render all information in card components', () => {
      const { container } = render(<ContactInfo />);
      
      const cards = container.querySelectorAll('.card');
      expect(cards.length).toBeGreaterThanOrEqual(3); // Phone, WhatsApp, Address, and optionally Operating Hours
    });

    it('should apply contact-info class to container', () => {
      const { container } = render(<ContactInfo />);
      
      expect(container.querySelector('.contact-info')).toBeInTheDocument();
    });

    it('should apply custom className when provided', () => {
      const { container } = render(<ContactInfo className="custom-class" />);
      
      expect(container.querySelector('.contact-info.custom-class')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels on links', () => {
      const phoneNumber = '+91 9876543210';
      render(<ContactInfo phoneNumber={phoneNumber} />);
      
      const phoneLink = screen.getByRole('link', { name: `Call ${phoneNumber}` });
      expect(phoneLink).toBeInTheDocument();
      
      const whatsappLink = screen.getByRole('link', { name: /contact us on whatsapp/i });
      expect(whatsappLink).toBeInTheDocument();
    });

    it('should have aria-hidden on decorative icons', () => {
      const { container } = render(<ContactInfo />);
      
      const icons = container.querySelectorAll('svg[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('should have proper heading hierarchy', () => {
      render(<ContactInfo />);
      
      const headings = screen.getAllByRole('heading', { level: 3 });
      expect(headings.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Default Props', () => {
    it('should render with default props', () => {
      render(<ContactInfo />);
      
      expect(screen.getByText('+91XXXXXXXXXX')).toBeInTheDocument();
      expect(screen.getByText('123 Main Street')).toBeInTheDocument();
      expect(screen.getByText('City Name, State')).toBeInTheDocument();
    });
  });

  describe('Requirements Validation', () => {
    it('should satisfy Requirement 7.1: Display phone number placeholder', () => {
      render(<ContactInfo />);
      
      const phoneLink = screen.getByRole('link', { name: /call/i });
      expect(phoneLink).toBeInTheDocument();
    });

    it('should satisfy Requirement 7.2: Display WhatsApp button', () => {
      render(<ContactInfo />);
      
      const whatsappButton = screen.getByRole('link', { name: /contact us on whatsapp/i });
      expect(whatsappButton).toBeInTheDocument();
    });

    it('should satisfy Requirement 7.3: Display address placeholder', () => {
      render(<ContactInfo />);
      
      const addressElement = document.querySelector('address');
      expect(addressElement).toBeInTheDocument();
    });
  });
});
