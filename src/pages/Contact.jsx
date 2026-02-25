import React from 'react';
import Section from '../components/Section';
import ContactInfo from '../components/ContactInfo';
import GoogleMapsEmbed from '../components/GoogleMapsEmbed';
import EnquiryForm from '../components/EnquiryForm';
import SEO from '../components/SEO';
import './Contact.css';

/**
 * Contact Page Component
 * 
 * Assembles the contact page with:
 * - Contact information (phone, WhatsApp, address, hours)
 * - Google Maps embed
 * - Enquiry form
 * 
 * Layout:
 * - Two-column layout on desktop (info/map on left, form on right)
 * - Stacked layout on mobile
 * 
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 */
const Contact = () => {
  const handleFormSubmit = (formData) => {
    // In a real application, this would send data to a backend
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-page">
      <SEO 
        title="Contact Us"
        description="Get in touch with us for tuition class enquiries. Call, WhatsApp, or fill out our enquiry form. We respond within 24 hours. Find our location, operating hours, and contact information."
        keywords="contact tuition classes, enquiry form, phone number, WhatsApp contact, location, operating hours, admission enquiry"
      />
      
      <Section style="hero" title="Contact Us">
        <p className="contact-intro">
          Have questions about Little Learner's? We'd love to hear from you. 
          Reach out using any of the methods below, and we'll get back to you soon.
        </p>
      </Section>

      <Section style="default" className="contact-content-section">
        <div className="contact-layout">
          {/* Left Column: Contact Info and Map */}
          <div className="contact-layout__info">
            <h2 className="contact-section-title">Get in Touch</h2>
            <ContactInfo
              phoneNumber="+918669775438"
              whatsappNumber="918669775438"
              whatsappMessage="Hi! I'm contacting you via your website. I'd like to know more about Little Learner's."
              address={{
                street: 'Dattanagar behind Siddhivinayak Mandir',
                city: 'At Little Pearls Nursery School, Pune',
                state: 'Maharashtra',
                pincode: '411046'
              }}
              operatingHours={{
                weekdays: 'Monday - Saturday',
                timing: '6:00 PM - 8:00 PM',
                closed: 'Sunday'
              }}
            />

            <div className="contact-map-container">
              <h3 className="contact-subsection-title">Find Us</h3>
              <GoogleMapsEmbed
                embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977736716633!2d-122.41941548468186!3d37.77492977975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                title="Little Learner's Location"
              />
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="contact-layout__form">
            <h2 className="contact-section-title">Send Us an Enquiry</h2>
            <p className="contact-form-description">
              Fill out the form below and we'll contact you within 24 hours to discuss 
              your child's needs.
            </p>
            <EnquiryForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
