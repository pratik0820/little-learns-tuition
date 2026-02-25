import { useState } from 'react';
import PropTypes from 'prop-types';
import FormInput from './FormInput';
import Button from './Button';
import './EnquiryForm.css';

/**
 * Validation Functions
 */

// Parent Name Validation
const validateParentName = (name) => {
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: "Parent name is required" };
  }
  if (trimmed.length < 2) {
    return { valid: false, error: "Name must be at least 2 characters" };
  }
  if (trimmed.length > 50) {
    return { valid: false, error: "Name must not exceed 50 characters" };
  }
  if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
    return { valid: false, error: "Name can only contain letters and spaces" };
  }
  return { valid: true, error: null };
};

// Contact Number Validation
const validateContactNumber = (number) => {
  const cleaned = number.replace(/\D/g, '');
  if (cleaned.length === 0) {
    return { valid: false, error: "Contact number is required" };
  }
  if (cleaned.length !== 10) {
    return { valid: false, error: "Contact number must be 10 digits" };
  }
  if (!/^[6-9]\d{9}$/.test(cleaned)) {
    return { valid: false, error: "Please enter a valid Indian mobile number" };
  }
  return { valid: true, error: null };
};

// Student Standard Validation
const validateStudentStandard = (standard) => {
  if (!standard || standard === "") {
    return { valid: false, error: "Please select student's standard" };
  }
  if (!["1", "2", "3", "4", "5"].includes(standard)) {
    return { valid: false, error: "Please select a valid standard" };
  }
  return { valid: true, error: null };
};

// Message Validation (Optional)
const validateMessage = (message) => {
  const trimmed = message.trim();
  if (trimmed.length > 500) {
    return { valid: false, error: "Message must not exceed 500 characters" };
  }
  return { valid: true, error: null };
};

/**
 * EnquiryForm Component
 * 
 * A form component for collecting parent enquiries about tuition classes.
 * Collects parent name, student standard, contact number, and optional message.
 * 
 * @param {Object} props - Component props
 * @param {function} props.onSubmit - Submit handler function
 * @param {string} props.className - Additional CSS classes
 */
const EnquiryForm = ({ onSubmit, className = '' }) => {
  // Form state
  const [formData, setFormData] = useState({
    parentName: '',
    studentStandard: '',
    contactNumber: '',
    message: ''
  });

  // Error state
  const [errors, setErrors] = useState({
    parentName: '',
    studentStandard: '',
    contactNumber: '',
    message: ''
  });

  // Submission state
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Student standard options
  const standardOptions = [
    { value: '1', label: 'Standard 1' },
    { value: '2', label: 'Standard 2' },
    { value: '3', label: 'Standard 3' },
    { value: '4', label: 'Standard 4' },
    { value: '5', label: 'Standard 5' }
  ];

  // Validate individual field
  const validateField = (name, value) => {
    switch (name) {
      case 'parentName':
        return validateParentName(value);
      case 'contactNumber':
        return validateContactNumber(value);
      case 'studentStandard':
        return validateStudentStandard(value);
      case 'message':
        return validateMessage(value);
      default:
        return { valid: true, error: null };
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle blur event for real-time validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const validation = validateField(name, value);
    
    if (!validation.valid) {
      setErrors(prev => ({
        ...prev,
        [name]: validation.error
      }));
    }
  };

  // Validate all fields
  const validateAllFields = () => {
    const newErrors = {};
    let isValid = true;
    let firstInvalidField = null;

    // Validate each field
    Object.keys(formData).forEach(fieldName => {
      const validation = validateField(fieldName, formData[fieldName]);
      if (!validation.valid) {
        newErrors[fieldName] = validation.error;
        isValid = false;
        // Track the first invalid field
        if (!firstInvalidField) {
          firstInvalidField = fieldName;
        }
      }
    });

    setErrors(newErrors);
    
    // Focus the first invalid field
    if (!isValid && firstInvalidField) {
      // Use setTimeout to ensure the error state is updated before focusing
      setTimeout(() => {
        const fieldElement = document.querySelector(`[name="${firstInvalidField}"]`);
        if (fieldElement) {
          fieldElement.focus();
        }
      }, 0);
    }
    
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    if (!validateAllFields()) {
      return;
    }
    
    // Call parent onSubmit handler if provided
    if (onSubmit) {
      onSubmit(formData);
    }
    
    // Show success confirmation
    setIsSubmitted(true);
  };

  const formClasses = ['enquiry-form', className].filter(Boolean).join(' ');

  // If form is successfully submitted, show success message
  if (isSubmitted) {
    return (
      <div className="enquiry-form__success" role="alert" aria-live="polite">
        <div className="enquiry-form__success-icon" aria-hidden="true">✓</div>
        <h3 className="enquiry-form__success-title">Thank You!</h3>
        <p className="enquiry-form__success-message">
          Your enquiry has been submitted successfully. We'll contact you within 24 hours.
        </p>
        <Button
          variant="outline"
          size="medium"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              parentName: '',
              studentStandard: '',
              contactNumber: '',
              message: ''
            });
            setErrors({
              parentName: '',
              studentStandard: '',
              contactNumber: '',
              message: ''
            });
          }}
        >
          Submit Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <form className={formClasses} onSubmit={handleSubmit} aria-label="Enquiry form">
      <FormInput
        type="text"
        label="Parent Name"
        name="parentName"
        value={formData.parentName}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        error={errors.parentName}
        placeholder="Enter your name"
      />

      <FormInput
        type="select"
        label="Student Standard"
        name="studentStandard"
        value={formData.studentStandard}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        error={errors.studentStandard}
        options={standardOptions}
        placeholder="Select standard"
      />

      <FormInput
        type="tel"
        label="Contact Number"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        error={errors.contactNumber}
        placeholder="Enter 10-digit mobile number"
      />

      <FormInput
        type="textarea"
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.message}
        placeholder="Tell us about your requirements (optional)"
        rows={4}
      />

      <Button
        type="submit"
        variant="primary"
        size="large"
        className="enquiry-form__submit"
      >
        Submit Enquiry
      </Button>
    </form>
  );
};

EnquiryForm.propTypes = {
  onSubmit: PropTypes.func,
  className: PropTypes.string
};

export default EnquiryForm;
