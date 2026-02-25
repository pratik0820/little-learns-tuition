import React from 'react';
import ContactInfo from './ContactInfo';

/**
 * ContactInfo Component Demo
 * 
 * Demonstrates the ContactInfo component with sample data.
 * This file can be used for visual testing and development.
 */
const ContactInfoDemo = () => {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#F9FAFB' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Contact Information Display Demo</h1>
      
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Default Contact Info</h2>
        <ContactInfo />
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Custom Contact Info</h2>
        <ContactInfo
          phoneNumber="+91 98765 43210"
          whatsappNumber="919876543210"
          whatsappMessage="Hi! I'd like to enquire about tuition classes for my child."
          address={{
            street: '456 Education Street',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001'
          }}
          operatingHours={{
            weekdays: 'Monday - Friday',
            timing: '9:00 AM - 7:00 PM',
            closed: 'Saturday & Sunday'
          }}
        />
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Without Operating Hours</h2>
        <ContactInfo
          phoneNumber="+91 99999 88888"
          address={{
            street: '789 Learning Avenue',
            city: 'Delhi',
            state: 'Delhi',
            pincode: '110001'
          }}
          operatingHours={null}
        />
      </section>

      <section>
        <h2 style={{ marginBottom: '1rem' }}>With Custom Class</h2>
        <ContactInfo
          className="custom-contact-info"
          phoneNumber="+91 77777 66666"
          address={{
            street: '321 Knowledge Road',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560001'
          }}
        />
      </section>
    </div>
  );
};

export default ContactInfoDemo;
