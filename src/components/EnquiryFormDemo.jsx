import React from 'react';
import EnquiryForm from './EnquiryForm';
import Section from './Section';

/**
 * EnquiryFormDemo Component
 * 
 * Demonstrates the EnquiryForm component with a sample submit handler.
 */
const EnquiryFormDemo = () => {
  const handleSubmit = (formData) => {
    console.log('Form submitted:', formData);
    alert(`Thank you! We received your enquiry.\n\nParent: ${formData.parentName}\nStandard: ${formData.studentStandard}\nContact: ${formData.contactNumber}\nMessage: ${formData.message || 'N/A'}`);
  };

  return (
    <Section title="Enquiry Form Demo" style="default">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p style={{ marginBottom: 'var(--space-6)', color: 'var(--color-text-light)' }}>
          Fill out the form below to enquire about our tuition classes.
        </p>
        <EnquiryForm onSubmit={handleSubmit} />
      </div>
    </Section>
  );
};

export default EnquiryFormDemo;
