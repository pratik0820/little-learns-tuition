import React from 'react';
import PropTypes from 'prop-types';
import './AdmissionsUrgencyBanner.css';

/**
 * AdmissionsUrgencyBanner Component
 * 
 * Displays an urgency message about admissions with prominent styling
 * to draw attention and encourage immediate action.
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - The urgency message to display
 */
const AdmissionsUrgencyBanner = ({
  message = "Limited Seats for June Batch – Admissions Open"
}) => {
  return (
    <div className="admissions-banner" role="banner" aria-label="Admissions urgency notice">
      <div className="container">
        <div className="admissions-banner__content">
          <span className="admissions-banner__icon" aria-hidden="true">⚡</span>
          <p className="admissions-banner__message">{message}</p>
        </div>
      </div>
    </div>
  );
};

AdmissionsUrgencyBanner.propTypes = {
  message: PropTypes.string
};

export default AdmissionsUrgencyBanner;
