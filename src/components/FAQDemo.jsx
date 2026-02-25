import React from 'react';
import FAQ from './FAQ';
import Section from './Section';

/**
 * FAQ Demo Component
 * 
 * Demonstrates the FAQ component with default questions and custom questions.
 */
const FAQDemo = () => {
  // Custom FAQ data example
  const customFAQs = [
    {
      id: 1,
      question: "What subjects do you teach?",
      answer: "We teach all core subjects including English, Mathematics, Science, and Social Studies for Class 1-5 students. Our curriculum is aligned with CBSE and state board requirements."
    },
    {
      id: 2,
      question: "What are the class timings?",
      answer: "We offer flexible batch timings to accommodate different schedules. Morning batches run from 8:00 AM to 10:00 AM, afternoon batches from 2:00 PM to 4:00 PM, and evening batches from 5:00 PM to 7:00 PM. Weekend batches are also available."
    },
    {
      id: 3,
      question: "How do you track student progress?",
      answer: "We conduct regular assessments and provide monthly progress reports to parents. We also maintain open communication through WhatsApp and parent-teacher meetings to discuss your child's development and areas of improvement."
    }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>FAQ Component Demo</h1>
      
      <Section
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our tuition classes"
        style="default"
      >
        <FAQ />
      </Section>

      <div style={{ marginTop: '60px' }}>
        <Section
          title="Custom FAQ Example"
          subtitle="FAQ component with custom questions"
          style="alternate"
        >
          <FAQ faqs={customFAQs} />
        </Section>
      </div>
    </div>
  );
};

export default FAQDemo;
