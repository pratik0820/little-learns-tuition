import React, { useState } from 'react';
import FormInput from './FormInput';

/**
 * FormInput Demo Component
 * 
 * Demonstrates all FormInput variants and validation states
 */
const FormInputDemo = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    contactNumber: '',
    studentStandard: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent name is required';
    } else if (formData.parentName.trim().length < 2) {
      newErrors.parentName = 'Name must be at least 2 characters';
    }
    
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
      newErrors.contactNumber = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!formData.studentStandard) {
      newErrors.studentStandard = 'Please select student\'s standard';
    }
    
    if (formData.message.length > 500) {
      newErrors.message = 'Message must not exceed 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      alert('Form is valid! Data: ' + JSON.stringify(formData, null, 2));
    }
  };

  const standardOptions = [
    { value: '1', label: 'Class 1' },
    { value: '2', label: 'Class 2' },
    { value: '3', label: 'Class 3' },
    { value: '4', label: 'Class 4' },
    { value: '5', label: 'Class 5' }
  ];

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h1>FormInput Component Demo</h1>
      
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          label="Parent Name"
          name="parentName"
          value={formData.parentName}
          onChange={handleChange}
          required={true}
          error={errors.parentName}
          placeholder="Enter your full name"
        />

        <FormInput
          type="tel"
          label="Contact Number"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          required={true}
          error={errors.contactNumber}
          placeholder="Enter 10-digit mobile number"
        />

        <FormInput
          type="select"
          label="Student Standard"
          name="studentStandard"
          value={formData.studentStandard}
          onChange={handleChange}
          required={true}
          error={errors.studentStandard}
          options={standardOptions}
          placeholder="Select student's class"
        />

        <FormInput
          type="textarea"
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          placeholder="Enter your message (optional)"
          rows={5}
        />

        <button 
          type="submit"
          style={{
            padding: '12px 24px',
            backgroundColor: '#3B82F6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '16px'
          }}
        >
          Submit Form
        </button>
      </form>

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
        <h2>Form Data:</h2>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
        
        {Object.keys(errors).length > 0 && (
          <>
            <h2>Errors:</h2>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </>
        )}
      </div>
    </div>
  );
};

export default FormInputDemo;
