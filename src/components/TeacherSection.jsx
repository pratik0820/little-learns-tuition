import React from 'react';
import { Link } from 'react-router-dom';
import './TeacherSection.css';

/**
 * Teacher Section Component
 * 
 * Displays teacher profile with photo and location map
 */
const TeacherSection = () => {
  return (
    <section className="teacher-section">
      <div className="container">
        <h2 className="teacher-section__title">Meet Your Teacher</h2>
        <div className="teacher-section__content">
          <div className="teacher-section__profile">
            <img 
              src="/images/shivani.jpeg" 
              alt="Mrs. Shivani - Teacher at Little Learner's" 
              className="teacher-section__photo"
            />
          </div>
          <div className="teacher-section__info">
            <h3 className="teacher-section__name">Mrs. Shivani</h3>
            <p className="teacher-section__subtitle">Experienced & Caring Educator</p>
            <div className="teacher-section__details">
              <p className="teacher-section__detail">
                <span className="teacher-section__icon">✓</span>
                2+ Years of Teaching Experience
              </p>
              <p className="teacher-section__quote">
                "I believe in making learning fun and engaging for every child."
              </p>
            </div>
            <Link to="/about" className="teacher-section__link">
              Learn More About Me →
            </Link>
          </div>
          <div className="teacher-section__map">
            <img 
              src="/images/location-map.png" 
              alt="Little Learner's Location - Dattanagar, Pune" 
              className="teacher-section__map-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherSection;
