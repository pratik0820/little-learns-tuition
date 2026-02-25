import React from 'react';
import EnquiryForm from './EnquiryForm';
import Button from './Button';
import { getContextualWhatsAppURL } from '../utils/whatsapp';
import './ContactFormSection.css';

/**
 * Contact Form Section Component
 * 
 * Displays contact form with phone and WhatsApp buttons
 */
const ContactFormSection = () => {
  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
  };

  return (
    <section className="contact-form-section">
      <div className="container">
        <h2 className="contact-form-section__title">Get In Touch</h2>
        <div className="contact-form-section__content">
          <div className="contact-form-section__form">
            <EnquiryForm onSubmit={handleFormSubmit} />
          </div>
          <div className="contact-form-section__buttons">
            <Button
              variant="primary"
              size="large"
              href="tel:+918669775438"
              className="contact-form-section__button"
            >
              📞 +91 98765 43210
            </Button>
            <Button
              variant="whatsapp"
              size="large"
              href={getContextualWhatsAppURL('home')}
              className="contact-form-section__button"
            >
              💬 Message Us on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
