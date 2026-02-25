import React from 'react';
import Section from './Section';
import './Section.css';

/**
 * Section Component Demo
 * 
 * Demonstrates the usage of the Section component with different variants
 */
const SectionDemo = () => {
  return (
    <div className="section-demo">
      {/* Default variant */}
      <Section 
        variant="default" 
        title="Default Section" 
        subtitle="This is a default section with white background"
      >
        <p>This is the content of a default section. It has a white background and standard padding.</p>
      </Section>

      {/* Alternate variant */}
      <Section 
        variant="alternate" 
        title="Alternate Section" 
        subtitle="This is an alternate section with off-white background"
      >
        <p>This is the content of an alternate section. It has an off-white background for visual separation.</p>
      </Section>

      {/* Hero variant */}
      <Section 
        variant="hero" 
        title="Hero Section" 
        subtitle="This is a hero section with larger spacing and primary color"
      >
        <p>This is the content of a hero section. It has larger spacing and the title uses the primary color.</p>
      </Section>

      {/* Section without title and subtitle */}
      <Section variant="default">
        <h3>Custom Content</h3>
        <p>This section has no title or subtitle props, just custom children content.</p>
      </Section>

      {/* Section with custom className */}
      <Section 
        variant="alternate" 
        title="Custom Styled Section" 
        className="my-custom-section"
      >
        <p>This section has an additional custom class applied.</p>
      </Section>
    </div>
  );
};

export default SectionDemo;
