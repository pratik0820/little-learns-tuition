import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './CourseCard.css';

/**
 * CourseCard Component
 * 
 * Displays detailed information about a class offering (Class 1-2 or Class 3-5).
 * Shows class level, subjects, batch size, duration, teaching method, and curriculum.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Class level title (e.g., "Class 1-2")
 * @param {string} props.ageRange - Age range for the class (e.g., "6-8 years")
 * @param {string[]} props.subjects - Array of subjects covered
 * @param {string[]} props.curriculum - Array of curriculum points
 * @param {string} props.batchSize - Batch size information
 * @param {string} props.duration - Class duration
 * @param {string} props.method - Teaching method description
 * @param {string} props.className - Additional CSS classes
 */
const CourseCard = ({
  title,
  ageRange,
  subjects,
  curriculum,
  batchSize,
  duration,
  method,
  className = '',
  ...rest
}) => {
  const header = (
    <div className="course-card__title-section">
      <h3 className="course-card__title">{title}</h3>
      {ageRange && <p className="course-card__age-range">{ageRange}</p>}
    </div>
  );

  const body = (
    <div className="course-card__content">
      {/* Subjects Section */}
      {subjects && subjects.length > 0 && (
        <div className="course-card__section">
          <h4 className="course-card__section-title">Subjects Covered</h4>
          <ul className="course-card__list course-card__list--subjects">
            {subjects.map((subject, index) => (
              <li key={index} className="course-card__list-item">
                {subject}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Curriculum Section */}
      {curriculum && curriculum.length > 0 && (
        <div className="course-card__section">
          <h4 className="course-card__section-title">What We Cover</h4>
          <ul className="course-card__list course-card__list--curriculum">
            {curriculum.map((point, index) => (
              <li key={index} className="course-card__list-item">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const footer = (
    <div className="course-card__details">
      {batchSize && (
        <div className="course-card__detail-item">
          <span className="course-card__detail-label">Batch Size:</span>
          <span className="course-card__detail-value">{batchSize}</span>
        </div>
      )}
      {duration && (
        <div className="course-card__detail-item">
          <span className="course-card__detail-label">Duration:</span>
          <span className="course-card__detail-value">{duration}</span>
        </div>
      )}
      {method && (
        <div className="course-card__detail-item">
          <span className="course-card__detail-label">Method:</span>
          <span className="course-card__detail-value">{method}</span>
        </div>
      )}
    </div>
  );

  return (
    <Card
      type="course"
      header={header}
      body={body}
      footer={footer}
      className={`course-card ${className}`}
      {...rest}
    />
  );
};

CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  ageRange: PropTypes.string,
  subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
  curriculum: PropTypes.arrayOf(PropTypes.string).isRequired,
  batchSize: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default CourseCard;
