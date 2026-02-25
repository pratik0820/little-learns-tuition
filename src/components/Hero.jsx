import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { getContextualWhatsAppURL } from '../utils/whatsapp';
import './Hero.css';

/**
 * Hero Component
 * 
 * The main hero section for the home page featuring headline, CTAs,
 * key highlights, and quick info strip.
 * 
 * @param {Object} props - Component props
 * @param {string} props.headline - Main headline text
 * @param {string} props.subheadline - Secondary headline text
 * @param {string} props.enrollLink - URL for Enroll Now button
 * @param {string} props.whatsappLink - URL for WhatsApp Enquiry button
 * @param {Array} props.highlights - Array of highlight objects with icon and text
 * @param {Object} props.quickInfo - Quick info object with standards, subjects, and location
 */
const Hero = ({
  headline = "Little Learner's - Personalized Classes for 1st to 5th Standard",
  subheadline = "Building Bright Futures with Individual Attention & Care",
  enrollLink = "/contact",
  whatsappLink = getContextualWhatsAppURL('home'),
  heroImage = "/images/student-image.jpg",
  highlights = [
    { icon: "👥", text: "Small Batch Size" },
    { icon: "⭐", text: "Individual Attention" },
    { icon: "📚", text: "Homework Support" },
    { icon: "🎯", text: "Concept Based Learning" }
  ],
  quickInfo = {
    standards: "Class 1-5",
    subjects: "English, Maths, Science, EVS",
    location: "Pune"
  }
}) => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__wrapper">
          {/* Left Content Section */}
          <div className="hero__content">
            {/* Headline Section */}
            <div className="hero__headline-wrapper">
              <h1 className="hero__headline">{headline}</h1>
              <p className="hero__subheadline">{subheadline}</p>
            </div>

            {/* CTA Buttons */}
            <div className="hero__cta-group">
              <Button 
                variant="primary" 
                size="large" 
                href={enrollLink}
                ariaLabel="Enroll now at Little Learner's"
              >
                Enroll Now
              </Button>
              <Button 
                variant="whatsapp" 
                size="large" 
                href={whatsappLink}
                ariaLabel="Contact us on WhatsApp"
              >
                WhatsApp Us
              </Button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="hero__image-wrapper">
            <img 
              src={heroImage} 
              alt="Happy children learning together at Little Learner's" 
              className="hero__image"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

Hero.propTypes = {
  headline: PropTypes.string,
  subheadline: PropTypes.string,
  tagline: PropTypes.string,
  enrollLink: PropTypes.string,
  whatsappLink: PropTypes.string,
  heroImage: PropTypes.string,
  highlights: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired
    })
  )
};

export default Hero;
