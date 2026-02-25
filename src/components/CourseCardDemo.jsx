import React from 'react';
import CourseCard from './CourseCard';

/**
 * CourseCard Demo Component
 * 
 * Demonstrates the CourseCard component with sample data for both
 * Class 1-2 and Class 3-5 offerings.
 */
const CourseCardDemo = () => {
  const class12Data = {
    title: "Class 1-2",
    ageRange: "6-8 years",
    subjects: ["English", "Mathematics", "EVS"],
    curriculum: [
      "Reading & writing foundation",
      "Basic maths concepts",
      "Homework guidance"
    ],
    batchSize: "6-8 students",
    duration: "1.5 hours",
    method: "Interactive learning with activities"
  };

  const class35Data = {
    title: "Class 3-5",
    ageRange: "8-11 years",
    subjects: ["English", "Mathematics", "Science", "Social Studies"],
    curriculum: [
      "Concept clarity",
      "Exam preparation",
      "Practice tests"
    ],
    batchSize: "8-10 students",
    duration: "2 hours",
    method: "Concept-based learning with regular assessments"
  };

  return (
    <div style={{ 
      padding: '40px 20px', 
      backgroundColor: 'var(--color-background)',
      minHeight: '100vh'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '40px',
          color: 'var(--color-text)'
        }}>
          Course Card Component Demo
        </h1>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginBottom: '40px'
        }}>
          <CourseCard {...class12Data} />
          <CourseCard {...class35Data} />
        </div>

        <div style={{ 
          marginTop: '60px',
          padding: '24px',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <h2 style={{ marginTop: 0, color: 'var(--color-text)' }}>
            Component Features
          </h2>
          <ul style={{ color: 'var(--color-text)', lineHeight: '1.8' }}>
            <li>Displays class level with age range</li>
            <li>Shows all subjects covered in a bulleted list</li>
            <li>Displays curriculum points with checkmarks</li>
            <li>Shows batch size, duration, and teaching method</li>
            <li>Fully responsive design (mobile, tablet, desktop)</li>
            <li>Uses the base Card component with "course" variant</li>
            <li>Visually appealing with proper spacing and typography</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseCardDemo;
