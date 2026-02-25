import React from 'react';
import Section from '../components/Section';
import TestimonialCard from '../components/TestimonialCard';
import SEO from '../components/SEO';
import { getContextualWhatsAppURL } from '../utils/whatsapp';
import './Testimonials.css';

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      feedback: "My son's grades improved significantly after joining these classes. The teacher's individual attention and concept-based teaching really made a difference. He now looks forward to attending classes!",
      parentName: "Mrs. Sharma",
      studentName: "Aarav",
      studentClass: "Class 4",
      improvement: "Math score increased from 65% to 85%"
    },
    {
      id: 2,
      feedback: "The small batch size ensures my daughter gets proper attention. Her confidence in English and Math has grown tremendously. The homework support is especially helpful for working parents like us.",
      parentName: "Mr. Patel",
      studentName: "Diya",
      studentClass: "Class 3",
      improvement: "Overall improvement from B grade to A grade"
    },
    {
      id: 3,
      feedback: "Excellent teaching methodology! My child struggled with basic concepts, but the patient and caring approach here helped him catch up with his peers. Highly recommend for primary school students.",
      parentName: "Mrs. Reddy",
      studentName: "Arjun",
      studentClass: "Class 2",
      improvement: "Reading skills improved dramatically"
    },
    {
      id: 4,
      feedback: "The regular practice tests and feedback helped my daughter prepare well for her exams. She scored her best marks this year. The teacher truly cares about each student's progress.",
      parentName: "Mr. Kumar",
      studentName: "Ananya",
      studentClass: "Class 5",
      improvement: "Scored 92% in final exams"
    },
    {
      id: 5,
      feedback: "My son was weak in mathematics, but the step-by-step teaching approach here built his foundation strong. Now he solves problems confidently and even helps his classmates!",
      parentName: "Mrs. Desai",
      studentName: "Rohan",
      studentClass: "Class 3",
      improvement: "Math confidence and problem-solving skills improved"
    },
    {
      id: 6,
      feedback: "The personalized attention and friendly environment make learning enjoyable for my daughter. She has become more curious and asks more questions. Great place for young learners!",
      parentName: "Mr. Singh",
      studentName: "Priya",
      studentClass: "Class 1",
      improvement: "Developed love for learning and reading"
    }
  ];

  return (
    <div className="testimonials-page">
      <SEO 
        title="Parent Testimonials"
        description="Read real feedback from parents whose children have excelled in our tuition classes. See how our small batch sizes, individual attention, and concept-based teaching have helped students improve their grades and confidence."
        keywords="parent reviews, student success stories, tuition testimonials, grade improvement, academic excellence, parent feedback"
      />
      
      <Section style="hero" title="What Parents Say">
        <p className="testimonials-intro">
          Don't just take our word for it. Here's what parents say about their children's learning journey with us. Real feedback from real parents who have seen their children grow and excel. Explore our <a href="/classes">tuition programs</a> to see how we can help your child.
        </p>
      </Section>

      <Section style="default" className="testimonials-grid-section">
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              feedback={testimonial.feedback}
              parentName={testimonial.parentName}
              studentName={testimonial.studentName}
              studentClass={testimonial.studentClass}
              improvement={testimonial.improvement}
            />
          ))}
        </div>
      </Section>

      <Section style="alternate" className="testimonials-cta-section">
        <h2 className="section__title">Join Our Happy Parents</h2>
        <p className="testimonials-cta-text">
          Give your child the same opportunity to excel. Limited seats available in our small batches. <a href="/contact">Contact us today</a> to schedule a demo class and see the difference. Learn more <a href="/about">about our experienced teacher</a> and teaching approach.
        </p>
        <div className="cta-buttons">
          <a href="/contact" className="btn btn--primary btn--large">
            Contact Us
          </a>
          <a 
            href={getContextualWhatsAppURL('home')}
            className="btn btn--whatsapp btn--large"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Enquiry
          </a>
        </div>
      </Section>
    </div>
  );
}

export default Testimonials;
