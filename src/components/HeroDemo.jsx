import React from 'react';
import Hero from './Hero';

/**
 * Hero Component Demo
 * 
 * Demonstrates the Hero component with default and custom props.
 */
const HeroDemo = () => {
  return (
    <div className="demo-container">
      <h1 style={{ padding: '2rem', textAlign: 'center' }}>Hero Component Demo</h1>
      
      {/* Default Hero */}
      <div className="demo-section">
        <h2 style={{ padding: '1rem 2rem', background: '#f0f0f0' }}>Default Hero</h2>
        <Hero />
      </div>

      {/* Custom Hero */}
      <div className="demo-section" style={{ marginTop: '2rem' }}>
        <h2 style={{ padding: '1rem 2rem', background: '#f0f0f0' }}>Custom Hero</h2>
        <Hero
          headline="Quality Education for Your Child"
          subheadline="Expert teachers, proven methods, and personalized attention for every student"
          enrollLink="#enroll"
          whatsappLink="https://wa.me/919876543210?text=Hello!%20I%20want%20to%20know%20more%20about%20your%20classes."
          highlights={[
            { icon: "🏆", text: "Proven Results" },
            { icon: "👨‍🏫", text: "Expert Teachers" },
            { icon: "📖", text: "Comprehensive Curriculum" },
            { icon: "💯", text: "100% Success Rate" }
          ]}
          quickInfo={{
            standards: "Class 1-5",
            subjects: "All Subjects",
            location: "Mumbai, India"
          }}
        />
      </div>
    </div>
  );
};

export default HeroDemo;
