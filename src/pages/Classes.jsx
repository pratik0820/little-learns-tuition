import React from 'react';
import Section from '../components/Section';
import CourseCard from '../components/CourseCard';
import SEO from '../components/SEO';
import { getContextualWhatsAppURL } from '../utils/whatsapp';
import './Classes.css';

function Classes() {
  return (
    <div className="classes-page">
      <SEO 
        title="Our Classes"
        description="Specialized tuition programs for Class 1-5 students. Small batch sizes (6-10 students), comprehensive curriculum covering English, Math, Science, and Social Studies. Daily homework support and regular assessments."
        keywords="class 1-2 tuition, class 3-5 tuition, primary school classes, small batch tuition, homework support, exam preparation, practice tests"
      />
      
      <Section style="hero" title="Our Classes">
        <p className="classes-intro">
          We offer specialized tuition programs for primary school students, designed to build strong foundations and help them excel. Our small batch sizes ensure every child gets the individual attention they deserve. Learn more <a href="/about">about our experienced teacher</a> and teaching approach.
        </p>
      </Section>

      <Section style="default" className="courses-section">
        <h2 className="section__title">Available Programs</h2>
        <div className="courses-grid">
          <CourseCard
            title="Class 1-2"
            ageRange="6-8 years"
            subjects={['English', 'Mathematics', 'EVS']}
            curriculum={[
              'Reading & writing foundation',
              'Basic maths concepts',
              'Homework guidance'
            ]}
            batchSize="6-8 students"
            duration="1.5 hours"
            method="Interactive learning with activities"
          />

          <CourseCard
            title="Class 3-5"
            ageRange="8-11 years"
            subjects={['English', 'Mathematics', 'Science', 'Social Studies']}
            curriculum={[
              'Concept clarity',
              'Exam preparation',
              'Practice tests'
            ]}
            batchSize="8-10 students"
            duration="2 hours"
            method="Concept-based learning with regular assessments"
          />
        </div>
      </Section>

      <Section style="alternate" className="class-features-section">
        <h2 className="section__title">What Makes Our Classes Special</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">📖</div>
            <h3>Comprehensive Curriculum</h3>
            <p>
              Our curriculum covers all subjects from the school board, ensuring students stay ahead in their regular classes while building strong understanding of key concepts.
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✍️</div>
            <h3>Daily Homework Support</h3>
            <p>
              We help students complete their school homework with proper understanding, ensuring they don't just finish assignments but truly learn from them.
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎯</div>
            <h3>Regular Practice Tests</h3>
            <p>
              Regular tests help identify learning gaps and track progress. Students get comfortable with exam formats and learn to manage their time better.
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">👨‍🏫</div>
            <h3>Personalized Attention</h3>
            <p>
              Small batch sizes allow us to understand each child's learning style and pace, providing customized support where needed.
            </p>
          </div>
        </div>
      </Section>

      <Section style="default" className="enrollment-cta-section">
        <h2 className="section__title">Ready to Enroll?</h2>
        <p className="enrollment-text">
          Limited seats available for the current batch. <a href="/contact">Contact us today</a> to secure your child's spot and give them the academic support they deserve. Read <a href="/testimonials">what other parents say</a> about our classes.
        </p>
        <div className="cta-buttons">
          <a href="/contact" className="btn btn--primary btn--large">
            Contact Us
          </a>
          <a 
            href={getContextualWhatsAppURL('classes')}
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

export default Classes;
