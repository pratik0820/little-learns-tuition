import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import OptimizedImage from './OptimizedImage';
import './TeacherProfileCard.css';

/**
 * Teacher Profile Card Component
 * 
 * Displays teacher profile information including photo, name, credentials,
 * and experience summary. Uses the Card component as a base.
 * 
 * @param {Object} props - Component props
 * @param {string} props.photoUrl - URL for teacher photo (optional, shows placeholder if not provided)
 * @param {string} props.photoAlt - Alt text for teacher photo
 * @param {string} props.name - Teacher's name
 * @param {string} props.credentials - Teacher's credentials/qualifications
 * @param {string} props.experience - Experience summary text
 * @param {string} props.className - Additional CSS classes
 */
const TeacherProfileCard = ({
  photoUrl,
  photoAlt = 'Teacher photo',
  name,
  credentials,
  experience,
  className = '',
  ...rest
}) => {
  return (
    <Card 
      type="info" 
      className={`teacher-profile-card ${className}`}
      {...rest}
    >
      <div className="teacher-profile-card__photo-container">
        {photoUrl ? (
          <OptimizedImage 
            src={photoUrl} 
            alt={photoAlt}
            className="teacher-profile-card__photo"
            width={200}
            height={200}
            lazy={false}
          />
        ) : (
          <div className="teacher-profile-card__photo-placeholder">
            <svg 
              className="teacher-profile-card__photo-icon"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        )}
      </div>
      
      <div className="teacher-profile-card__info">
        <h2 className="teacher-profile-card__name">{name}</h2>
        {credentials && (
          <p className="teacher-profile-card__credentials">{credentials}</p>
        )}
      </div>
      
      {experience && (
        <div className="teacher-profile-card__experience">
          <h3 className="teacher-profile-card__experience-title">Experience</h3>
          <p className="teacher-profile-card__experience-text">{experience}</p>
        </div>
      )}
    </Card>
  );
};

TeacherProfileCard.propTypes = {
  photoUrl: PropTypes.string,
  photoAlt: PropTypes.string,
  name: PropTypes.string.isRequired,
  credentials: PropTypes.string,
  experience: PropTypes.string,
  className: PropTypes.string
};

export default TeacherProfileCard;
