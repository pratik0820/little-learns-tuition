import React from 'react';
import Hero from '../components/Hero';
import AdmissionsUrgencyBanner from '../components/AdmissionsUrgencyBanner';
import WhyChooseUs from '../components/WhyChooseUs';
import ProgramsSection from '../components/ProgramsSection';
import TestimonialsPreview from '../components/TestimonialsPreview';
import TeacherSection from '../components/TeacherSection';
import ContactFormSection from '../components/ContactFormSection';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import './Home.css';

/**
 * Home Page Component
 * 
 * The main landing page matching the reference design with:
 * - Hero section with children's image
 * - Admissions urgency banner
 * - Why Choose Us section
 * - Our Programs section
 * - Parent Testimonials
 * - Meet Your Teacher section
 * - Get In Touch contact form
 * 
 * Requirements: 1.1, 1.2, 1.3, 1.4, 9.1, 10.1
 */
const Home = () => {
  return (
    <main className="home">
      <SEO 
        title="Home"
        description="Little Learner's offers quality tuition classes for primary school students (Class 1-5). Small batch sizes, individual attention, homework support, and concept-based learning. Admissions open for new batch."
        keywords="tuition classes, primary school, class 1-5, homework help, small batch, individual attention, concept-based learning, Pune"
      />
      <StructuredData type="organization" />
      
      {/* Hero Section with Image */}
      <Hero />

      {/* Admissions Urgency Banner */}
      <AdmissionsUrgencyBanner />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Our Programs Section */}
      <ProgramsSection />

      {/* Parent Testimonials Section */}
      <section className="home__testimonials">
        <div className="container">
          <h2 className="home__section-title">Parent Testimonials</h2>
          <TestimonialsPreview />
        </div>
      </section>

      {/* Meet Your Teacher Section */}
      <TeacherSection />

      {/* Get In Touch Contact Form */}
      <ContactFormSection />
    </main>
  );
};

export default Home;
