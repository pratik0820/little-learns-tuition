import React from 'react';
import PropTypes from 'prop-types';
import './FormInput.css';

/**
 * FormInput Component
 * 
 * A reusable form input component supporting multiple input types with
 * validation states, error messages, and full accessibility support.
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Input type: 'text', 'tel', 'select', 'textarea'
 * @param {string} props.label - Label text for the input
 * @param {string} props.name - Input name attribute
 * @param {string} props.value - Input value
 * @param {function} props.onChange - Change handler
 * @param {boolean} props.required - Whether field is required
 * @param {string} props.error - Error message to display
 * @param {string} props.placeholder - Placeholder text
 * @param {Array} props.options - Options array for select input (objects with value and label)
 * @param {number} props.rows - Number of rows for textarea
 * @param {string} props.id - Custom ID (auto-generated if not provided)
 * @param {string} props.className - Additional CSS classes
 */
const FormInput = ({
  type = 'text',
  label,
  name,
  value,
  onChange,
  required = false,
  error = '',
  placeholder = '',
  options = [],
  rows = 4,
  id,
  className = '',
  ...rest
}) => {
  // Generate unique ID if not provided
  const inputId = id || `form-input-${name}`;
  const errorId = `${inputId}-error`;
  
  // Determine if input is invalid
  const isInvalid = Boolean(error);
  
  // Build CSS classes
  const formGroupClasses = ['form-group', className].filter(Boolean).join(' ');
  const inputClasses = [
    'form-input',
    isInvalid && 'form-input--error'
  ].filter(Boolean).join(' ');

  // Render the appropriate input element based on type
  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            className={inputClasses}
            aria-invalid={isInvalid}
            aria-describedby={isInvalid ? errorId : undefined}
            aria-required={required}
            {...rest}
          >
            <option value="">{placeholder || 'Select an option'}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={inputClasses}
            aria-invalid={isInvalid}
            aria-describedby={isInvalid ? errorId : undefined}
            aria-required={required}
            {...rest}
          />
        );
      
      case 'text':
      case 'tel':
      default:
        return (
          <input
            type={type}
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={inputClasses}
            aria-invalid={isInvalid}
            aria-describedby={isInvalid ? errorId : undefined}
            aria-required={required}
            {...rest}
          />
        );
    }
  };

  return (
    <div className={formGroupClasses}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="required" aria-label="required"> *</span>}
        </label>
      )}
      
      {renderInput()}
      
      {isInvalid && (
        <span id={errorId} className="form-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

FormInput.propTypes = {
  type: PropTypes.oneOf(['text', 'tel', 'select', 'textarea']),
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  rows: PropTypes.number,
  id: PropTypes.string,
  className: PropTypes.string
};

export default FormInput;
