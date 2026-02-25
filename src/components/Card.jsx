import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

/**
 * Card Component
 * 
 * A reusable card component with multiple variants and optional sections.
 * Supports testimonial, course, and info card types.
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Card type variant: 'testimonial', 'course', 'info'
 * @param {React.ReactNode} props.children - Card content
 * @param {React.ReactNode} props.header - Optional header content
 * @param {React.ReactNode} props.body - Optional body content (alternative to children)
 * @param {React.ReactNode} props.footer - Optional footer content
 * @param {string} props.className - Additional CSS classes
 */
const Card = ({
  type = 'info',
  children,
  header,
  body,
  footer,
  className = '',
  ...rest
}) => {
  const cardClasses = [
    'card',
    `card--${type}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...rest}>
      {header && (
        <div className="card__header">
          {header}
        </div>
      )}
      
      {(body || children) && (
        <div className="card__body">
          {body || children}
        </div>
      )}
      
      {footer && (
        <div className="card__footer">
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  type: PropTypes.oneOf(['testimonial', 'course', 'info']),
  children: PropTypes.node,
  header: PropTypes.node,
  body: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string
};

export default Card;
