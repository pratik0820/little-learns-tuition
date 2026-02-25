import React from 'react';
import PropTypes from 'prop-types';
import './Section.css';

/**
 * Section Component
 * 
 * A reusable section container component that provides consistent spacing,
 * layout, and styling across the website.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.id] - Optional section ID for anchor links
 * @param {string} [props.variant='default'] - Section style variant: 'default', 'alternate', or 'hero'
 * @param {string} [props.title] - Optional section title
 * @param {string} [props.subtitle] - Optional section subtitle
 * @param {React.ReactNode} props.children - Section content
 * @param {string} [props.className] - Additional CSS classes
 */
const Section = ({ id, variant = 'default', title, subtitle, children, className = '' }) => {
  const sectionClass = `section section--${variant} ${className}`.trim();

  return (
    <section id={id} className={sectionClass}>
      <div className="container">
        {title && <h2 className="section__title">{title}</h2>}
        {subtitle && <p className="section__subtitle">{subtitle}</p>}
        <div className="section__content">
          {children}
        </div>
      </div>
    </section>
  );
};

Section.propTypes = {
  id: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'alternate', 'hero']),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Section;
