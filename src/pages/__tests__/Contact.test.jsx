import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Contact from '../Contact';

/**
 * Contact Page Tests
 * 
 * Tests for the Contact page assembly and layout.
 * 
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 */

describe('Contact Page', () => {
  const renderContact = () => {
    return render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );
  };

  describe('Page Structure', () => {
    it('should render the contact page', () => {
      renderContact();
      expect(screen.getByText('Contact Us')).toBeInTheDocument();
    });

    it('should display the intro text', () => {
      renderContact();
      expect(screen.getByText(/Have questions about our tuition classes/i)).toBeInTheDocument();
    });
  });

  describe('Contact Information Section (Requirement 7.1, 7.2, 7.3)', () => {
    it('should display phone number', () => {
      renderContact();
      expect(screen.getAllByText(/Call Us/i)[0]).toBeInTheDocument();
      expect(screen.getByText(/\+91XXXXXXXXXX/)).toBeInTheDocument();
    });

    it('should display WhatsApp button', () => {
      renderContact();
      expect(screen.getAllByText(/WhatsApp/i)[0]).toBeInTheDocument();
      expect(screen.getByText(/Chat on WhatsApp/i)).toBeInTheDocument();
    });

    it('should display address', () => {
      renderContact();
      expect(screen.getByText(/Visit Us/i)).toBeInTheDocument();
      expect(screen.getByText(/123 Main Street/i)).toBeInTheDocument();
      expect(screen.getByText(/City Name, State/i)).toBeInTheDocument();
    });

    it('should display operating hours', () => {
      renderContact();
      expect(screen.getByText(/Operating Hours/i)).toBeInTheDocument();
      expect(screen.getByText(/Monday - Saturday/i)).toBeInTheDocument();
      expect(screen.getByText(/9:00 AM - 6:00 PM/i)).toBeInTheDocument();
    });
  });

  describe('Google Maps Section (Requirement 7.4)', () => {
    it('should display map section title', () => {
      renderContact();
      expect(screen.getByText(/Find Us/i)).toBeInTheDocument();
    });

    it('should render Google Maps embed', () => {
      renderContact();
      const iframe = screen.getByTitle('Tuition Classes Location');
      expect(iframe).toBeInTheDocument();
      expect(iframe.tagName).toBe('IFRAME');
    });
  });

  describe('Enquiry Form Section (Requirement 7.5)', () => {
    it('should display form section title', () => {
      renderContact();
      expect(screen.getByText(/Send Us an Enquiry/i)).toBeInTheDocument();
    });

    it('should display form description', () => {
      renderContact();
      expect(screen.getByText(/Fill out the form below/i)).toBeInTheDocument();
    });

    it('should render enquiry form with all required fields', () => {
      renderContact();
      expect(screen.getByLabelText(/Parent Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Student Standard/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Contact Number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    });

    it('should render submit button', () => {
      renderContact();
      expect(screen.getByRole('button', { name: /Submit Enquiry/i })).toBeInTheDocument();
    });
  });

  describe('Layout Structure', () => {
    it('should have proper section structure', () => {
      renderContact();
      expect(screen.getByText('Get in Touch')).toBeInTheDocument();
      expect(screen.getByText('Send Us an Enquiry')).toBeInTheDocument();
    });

    it('should render all three main components', () => {
      const { container } = renderContact();
      
      // Check for ContactInfo component
      expect(screen.getAllByText(/Call Us/i)[0]).toBeInTheDocument();
      
      // Check for GoogleMapsEmbed component
      expect(screen.getByTitle('Tuition Classes Location')).toBeInTheDocument();
      
      // Check for EnquiryForm component
      expect(screen.getByRole('button', { name: /Submit Enquiry/i })).toBeInTheDocument();
    });
  });

  describe('Responsive Layout Classes', () => {
    it('should have contact layout container', () => {
      const { container } = renderContact();
      const layoutContainer = container.querySelector('.contact-layout');
      expect(layoutContainer).toBeInTheDocument();
    });

    it('should have info column', () => {
      const { container } = renderContact();
      const infoColumn = container.querySelector('.contact-layout__info');
      expect(infoColumn).toBeInTheDocument();
    });

    it('should have form column', () => {
      const { container } = renderContact();
      const formColumn = container.querySelector('.contact-layout__form');
      expect(formColumn).toBeInTheDocument();
    });
  });
});
