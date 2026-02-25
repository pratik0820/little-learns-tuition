import React from 'react';
import PropTypes from 'prop-types';
import './TestimonialCard.css';

/**
 * TestimonialCard Component
 * 
 * Displays parent feedback with student information and optional improvement story.
 * Used on the Testimonials page to showcase parent testimonials.
 * 
 * @param {Object} props - Component props
 * @param {string} props.feedback - Parent feedback text (required)
 * @param {string} props.parentName - Name of the parent (required)
 * @param {string} props.studentName - Name of the student (required)
 * @param {string} props.studentClass - Student's class/standard (required)
 * @param {string} props.improvement - Optional improvement story
 * @param {string} props.className - Additional CSS classes
 */
const TestimonialCard = ({
  feedback,
  parentName,
  studentName,
  studentClass,
  improvement,
  className = '',
  ...rest
}) => {
  const cardClasses = [
    'testimonial-card',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...rest}>
      <div className="testimonial-card__body">
        <p className="testimonial-card__feedback">"{feedback}"</p>
      </div>
      
      <div className="testimonial-card__footer">
        <div className="testimonial-card__author">
          <p className="testimonial-card__parent-name">{parentName}</p>
          <p className="testimonial-card__student-info">
            Parent of {studentName}, {studentClass}
          </p>
        </div>
        
        {improvement && (
          <div className="testimonial-card__improvement">
            <p className="testimonial-card__improvement-text">{improvement}</p>
          </div>
        )}
      </div>
    </div>
  );
};

TestimonialCard.propTypes = {
  feedback: PropTypes.string.isRequired,
  parentName: PropTypes.string.isRequired,
  studentName: PropTypes.string.isRequired,
  studentClass: PropTypes.string.isRequired,
  improvement: PropTypes.string,
  className: PropTypes.string
};

export default TestimonialCard;
