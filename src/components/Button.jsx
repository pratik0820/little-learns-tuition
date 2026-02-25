import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

/**
 * Button Component
 * 
 * A reusable button component with multiple variants and sizes.
 * Supports both button and link (anchor) rendering based on href prop.
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Button style variant: 'primary', 'secondary', 'whatsapp', 'outline'
 * @param {string} props.size - Button size: 'small', 'medium', 'large'
 * @param {function} props.onClick - Click handler (for button elements)
 * @param {string} props.href - URL for link buttons (renders as anchor tag)
 * @param {React.ReactNode} props.children - Button content
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.ariaLabel - Accessibility label
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.type - Button type attribute (button, submit, reset)
 */
const Button = ({
  variant = 'primary',
  size = 'medium',
  onClick,
  href,
  children,
  disabled = false,
  ariaLabel,
  className = '',
  type = 'button',
  ...rest
}) => {
  const buttonClasses = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    disabled && 'btn--disabled',
    className
  ].filter(Boolean).join(' ');

  // Render as anchor tag if href is provided
  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        className={buttonClasses}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        {...rest}
      >
        <span className="btn__text">{children}</span>
      </a>
    );
  }

  // Render as button element
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...rest}
    >
      <span className="btn__text">{children}</span>
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'whatsapp', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

export default Button;
