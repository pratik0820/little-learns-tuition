import React from 'react';
import { Link } from 'react-router-dom';
import './ProgramsSection.css';

/**
 * Programs Section Component
 * 
 * Displays available class programs
 */
const ProgramsSection = () => {
  const programs = [
    {
      title: 'Classes 1st - 2nd',
      color: '#ffd54f',
      features: [
        'Basic Reading & Writing',
        'Fun with Numbers'
      ]
    },
    {
      title: 'Classes 3rd - 5th',
      color: '#81d4fa',
      features: [
        'Advanced Math & Science',
        'Exam Prep & Practice'
      ]
    }
  ];

  return (
    <section className="programs-section">
      <div className="container">
        <h2 className="programs-section__title">Our Programs</h2>
        <div className="programs-section__grid">
          {programs.map((program, index) => (
            <div key={index} className="programs-section__card">
              <div 
                className="programs-section__header"
                style={{ backgroundColor: program.color }}
              >
                <h3 className="programs-section__card-title">{program.title}</h3>
              </div>
              <div className="programs-section__content">
                <ul className="programs-section__features">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="programs-section__feature">
                      <span className="programs-section__check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/classes" className="programs-section__link">
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
