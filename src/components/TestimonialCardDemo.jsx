import React from 'react';
import TestimonialCard from './TestimonialCard';
import Section from './Section';

/**
 * TestimonialCardDemo Component
 * 
 * Demonstrates the TestimonialCard component with various examples
 * including testimonials with and without improvement stories.
 */
const TestimonialCardDemo = () => {
  return (
    <Section
      title="Testimonial Card Component Demo"
      subtitle="Examples of testimonial cards with parent feedback and student information"
    >
      <div style={{ 
        display: 'grid', 
        gap: 'var(--space-6)', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <TestimonialCard
          feedback="My daughter's confidence in mathematics has improved tremendously. The small batch size ensures she gets individual attention, and the teacher is very patient with her questions."
          parentName="Mrs. Sharma"
          studentName="Aarti"
          studentClass="Class 4"
          improvement="Math score increased from 65% to 85% in one term"
        />
        
        <TestimonialCard
          feedback="The homework support has been invaluable. My son now completes his assignments on time and understands the concepts better. The teacher explains everything clearly."
          parentName="Mr. Patel"
          studentName="Rohan"
          studentClass="Class 3"
          improvement="Now completes homework independently and on time"
        />
        
        <TestimonialCard
          feedback="Excellent teaching methods! My child looks forward to attending classes. The concept-based learning approach has made a real difference in her understanding."
          parentName="Mrs. Reddy"
          studentName="Priya"
          studentClass="Class 5"
        />
        
        <TestimonialCard
          feedback="The individual attention in small batches has helped my son overcome his fear of mathematics. He's now more confident and participates actively in class."
          parentName="Mr. Kumar"
          studentName="Arjun"
          studentClass="Class 2"
          improvement="Improved from struggling with basic concepts to solving problems independently"
        />
      </div>
    </Section>
  );
};

export default TestimonialCardDemo;
