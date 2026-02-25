import React from 'react';
import Section from './Section';
import TestimonialsPreview from './TestimonialsPreview';

/**
 * TestimonialsPreviewDemo Component
 * 
 * Demonstrates the TestimonialsPreview component within a Section container.
 * This shows how it would appear on the home page.
 */
const TestimonialsPreviewDemo = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <Section
        variant="default"
        title="What Parents Say"
        subtitle="Hear from parents who have seen their children thrive in our classes"
      >
        <TestimonialsPreview />
      </Section>
    </div>
  );
};

export default TestimonialsPreviewDemo;
