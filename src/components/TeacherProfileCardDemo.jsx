import React from 'react';
import TeacherProfileCard from './TeacherProfileCard';
import Section from './Section';

/**
 * Teacher Profile Card Demo
 * 
 * Demonstrates the TeacherProfileCard component with sample data.
 */
const TeacherProfileCardDemo = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'var(--color-background)', minHeight: '100vh' }}>
      <Section 
        title="Teacher Profile Card Demo"
        subtitle="Showcasing the teacher profile card component"
      >
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ marginBottom: '20px' }}>With Photo Placeholder</h3>
          <TeacherProfileCard
            name="Mrs. Priya Sharma"
            credentials="B.Ed., M.A. in Education"
            experience="With over 15 years of teaching experience in primary education, I specialize in creating engaging learning environments that help students build strong foundations in core subjects. My approach focuses on understanding each child's unique learning style and providing personalized attention to ensure their academic success."
          />
        </div>
        
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ marginBottom: '20px' }}>Minimal Information</h3>
          <TeacherProfileCard
            name="Mr. Rajesh Kumar"
            credentials="B.Sc., B.Ed."
          />
        </div>
        
        <div>
          <h3 style={{ marginBottom: '20px' }}>Without Credentials</h3>
          <TeacherProfileCard
            name="Ms. Anjali Verma"
            experience="Passionate educator with 10 years of experience in teaching primary school students. I believe in making learning fun and interactive while ensuring strong conceptual understanding."
          />
        </div>
      </Section>
    </div>
  );
};

export default TeacherProfileCardDemo;
