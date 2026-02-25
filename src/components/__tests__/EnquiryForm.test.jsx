import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EnquiryForm from '../EnquiryForm';

describe('EnquiryForm', () => {
  it('renders all form fields', () => {
    render(<EnquiryForm />);
    
    expect(screen.getByLabelText(/parent name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/student standard/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<EnquiryForm />);
    
    expect(screen.getByRole('button', { name: /submit enquiry/i })).toBeInTheDocument();
  });

  it('displays required indicators for required fields', () => {
    render(<EnquiryForm />);
    
    const requiredIndicators = screen.getAllByText('*');
    expect(requiredIndicators).toHaveLength(3); // Parent name, student standard, contact number
  });

  it('has all 5 standard options in dropdown', () => {
    render(<EnquiryForm />);
    
    const select = screen.getByLabelText(/student standard/i);
    const options = select.querySelectorAll('option');
    
    // 6 options total: placeholder + 5 standards
    expect(options).toHaveLength(6);
    expect(options[1]).toHaveValue('1');
    expect(options[2]).toHaveValue('2');
    expect(options[3]).toHaveValue('3');
    expect(options[4]).toHaveValue('4');
    expect(options[5]).toHaveValue('5');
  });

  it('updates form state when inputs change', () => {
    render(<EnquiryForm />);
    
    const parentNameInput = screen.getByLabelText(/parent name/i);
    const studentStandardSelect = screen.getByLabelText(/student standard/i);
    const contactNumberInput = screen.getByLabelText(/contact number/i);
    const messageTextarea = screen.getByLabelText(/message/i);
    
    fireEvent.change(parentNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(studentStandardSelect, { target: { value: '3' } });
    fireEvent.change(contactNumberInput, { target: { value: '9876543210' } });
    fireEvent.change(messageTextarea, { target: { value: 'Test message' } });
    
    expect(parentNameInput).toHaveValue('John Doe');
    expect(studentStandardSelect).toHaveValue('3');
    expect(contactNumberInput).toHaveValue('9876543210');
    expect(messageTextarea).toHaveValue('Test message');
  });

  it('calls onSubmit handler when form is submitted', () => {
    const handleSubmit = vi.fn();
    render(<EnquiryForm onSubmit={handleSubmit} />);
    
    const parentNameInput = screen.getByLabelText(/parent name/i);
    const studentStandardSelect = screen.getByLabelText(/student standard/i);
    const contactNumberInput = screen.getByLabelText(/contact number/i);
    const submitButton = screen.getByRole('button', { name: /submit enquiry/i });
    
    fireEvent.change(parentNameInput, { target: { value: 'Jane Smith' } });
    fireEvent.change(studentStandardSelect, { target: { value: '4' } });
    fireEvent.change(contactNumberInput, { target: { value: '9123456789' } });
    
    fireEvent.click(submitButton);
    
    expect(handleSubmit).toHaveBeenCalledWith({
      parentName: 'Jane Smith',
      studentStandard: '4',
      contactNumber: '9123456789',
      message: ''
    });
  });

  it('submits form with optional message field empty', () => {
    const handleSubmit = vi.fn();
    render(<EnquiryForm onSubmit={handleSubmit} />);
    
    const parentNameInput = screen.getByLabelText(/parent name/i);
    const studentStandardSelect = screen.getByLabelText(/student standard/i);
    const contactNumberInput = screen.getByLabelText(/contact number/i);
    const submitButton = screen.getByRole('button', { name: /submit enquiry/i });
    
    fireEvent.change(parentNameInput, { target: { value: 'Test Parent' } });
    fireEvent.change(studentStandardSelect, { target: { value: '2' } });
    fireEvent.change(contactNumberInput, { target: { value: '9999999999' } });
    
    fireEvent.click(submitButton);
    
    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        message: ''
      })
    );
  });

  it('has proper accessibility attributes', () => {
    render(<EnquiryForm />);
    
    const form = screen.getByRole('form', { name: /enquiry form/i });
    expect(form).toBeInTheDocument();
    
    const parentNameInput = screen.getByLabelText(/parent name/i);
    expect(parentNameInput).toHaveAttribute('aria-required', 'true');
    
    const studentStandardSelect = screen.getByLabelText(/student standard/i);
    expect(studentStandardSelect).toHaveAttribute('aria-required', 'true');
    
    const contactNumberInput = screen.getByLabelText(/contact number/i);
    expect(contactNumberInput).toHaveAttribute('aria-required', 'true');
  });

  it('contact number input has tel type', () => {
    render(<EnquiryForm />);
    
    const contactNumberInput = screen.getByLabelText(/contact number/i);
    expect(contactNumberInput).toHaveAttribute('type', 'tel');
  });

  it('message field is a textarea', () => {
    render(<EnquiryForm />);
    
    const messageField = screen.getByLabelText(/message/i);
    expect(messageField.tagName).toBe('TEXTAREA');
  });

  it('applies custom className when provided', () => {
    const { container } = render(<EnquiryForm className="custom-class" />);
    
    const form = container.querySelector('.enquiry-form');
    expect(form).toHaveClass('custom-class');
  });

  // Validation tests
  describe('Form Validation', () => {
    it('shows error when parent name is empty on blur', () => {
      render(<EnquiryForm />);
      
      const parentNameInput = screen.getByLabelText(/parent name/i);
      fireEvent.blur(parentNameInput);
      
      expect(screen.getByText(/parent name is required/i)).toBeInTheDocument();
    });

    it('shows error when parent name is too short', () => {
      render(<EnquiryForm />);
      
      const parentNameInput = screen.getByLabelText(/parent name/i);
      fireEvent.change(parentNameInput, { target: { value: 'A' } });
      fireEvent.blur(parentNameInput);
      
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
    });

    it('shows error when parent name is too long', () => {
      render(<EnquiryForm />);
      
      const parentNameInput = screen.getByLabelText(/parent name/i);
      fireEvent.change(parentNameInput, { target: { value: 'A'.repeat(51) } });
      fireEvent.blur(parentNameInput);
      
      expect(screen.getByText(/name must not exceed 50 characters/i)).toBeInTheDocument();
    });

    it('shows error when parent name contains invalid characters', () => {
      render(<EnquiryForm />);
      
      const parentNameInput = screen.getByLabelText(/parent name/i);
      fireEvent.change(parentNameInput, { target: { value: 'John123' } });
      fireEvent.blur(parentNameInput);
      
      expect(screen.getByText(/name can only contain letters and spaces/i)).toBeInTheDocument();
    });

    it('shows error when contact number is empty on blur', () => {
      render(<EnquiryForm />);
      
      const contactNumberInput = screen.getByLabelText(/contact number/i);
      fireEvent.blur(contactNumberInput);
      
      expect(screen.getByText(/contact number is required/i)).toBeInTheDocument();
    });

    it('shows error when contact number is not 10 digits', () => {
      render(<EnquiryForm />);
      
      const contactNumberInput = screen.getByLabelText(/contact number/i);
      fireEvent.change(contactNumberInput, { target: { value: '12345' } });
      fireEvent.blur(contactNumberInput);
      
      expect(screen.getByText(/contact number must be 10 digits/i)).toBeInTheDocument();
    });

    it('shows error when contact number is not a valid Indian mobile number', () => {
      render(<EnquiryForm />);
      
      const contactNumberInput = screen.getByLabelText(/contact number/i);
      fireEvent.change(contactNumberInput, { target: { value: '1234567890' } });
      fireEvent.blur(contactNumberInput);
      
      expect(screen.getByText(/please enter a valid indian mobile number/i)).toBeInTheDocument();
    });

    it('shows error when student standard is not selected on blur', () => {
      render(<EnquiryForm />);
      
      const studentStandardSelect = screen.getByLabelText(/student standard/i);
      fireEvent.blur(studentStandardSelect);
      
      expect(screen.getByText(/please select student's standard/i)).toBeInTheDocument();
    });

    it('shows error when message exceeds 500 characters', () => {
      render(<EnquiryForm />);
      
      const messageTextarea = screen.getByLabelText(/message/i);
      fireEvent.change(messageTextarea, { target: { value: 'A'.repeat(501) } });
      fireEvent.blur(messageTextarea);
      
      expect(screen.getByText(/message must not exceed 500 characters/i)).toBeInTheDocument();
    });

    it('clears error when user starts typing', () => {
      render(<EnquiryForm />);
      
      const parentNameInput = screen.getByLabelText(/parent name/i);
      fireEvent.blur(parentNameInput);
      
      expect(screen.getByText(/parent name is required/i)).toBeInTheDocument();
      
      fireEvent.change(parentNameInput, { target: { value: 'John' } });
      
      expect(screen.queryByText(/parent name is required/i)).not.toBeInTheDocument();
    });

    it('prevents form submission when validation fails', () => {
      const handleSubmit = vi.fn();
      render(<EnquiryForm onSubmit={handleSubmit} />);
      
      const submitButton = screen.getByRole('button', { name: /submit enquiry/i });
      fireEvent.click(submitButton);
      
      expect(handleSubmit).not.toHaveBeenCalled();
      expect(screen.getByText(/parent name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/contact number is required/i)).toBeInTheDocument();
      expect(screen.getByText(/please select student's standard/i)).toBeInTheDocument();
    });

    it('allows form submission when all required fields are valid', () => {
      const handleSubmit = vi.fn();
      render(<EnquiryForm onSubmit={handleSubmit} />);
      
      const parentNameInput = screen.getByLabelText(/parent name/i);
      const studentStandardSelect = screen.getByLabelText(/student standard/i);
      const contactNumberInput = screen.getByLabelText(/contact number/i);
      const submitButton = screen.getByRole('button', { name: /submit enquiry/i });
      
      fireEvent.change(parentNameInput, { target: { value: 'John Doe' } });
      fireEvent.change(studentStandardSelect, { target: { value: '3' } });
      fireEvent.change(contactNumberInput, { target: { value: '9876543210' } });
      
      fireEvent.click(submitButton);
      
      expect(handleSubmit).toHaveBeenCalledWith({
        parentName: 'John Doe',
        studentStandard: '3',
        contactNumber: '9876543210',
        message: ''
      });
    });

    it('accepts valid parent name with spaces', () => {
      render(<EnquiryForm />);
      
      const parentNameInput = screen.getByLabelText(/parent name/i);
      fireEvent.change(parentNameInput, { target: { value: 'John Michael Doe' } });
      fireEvent.blur(parentNameInput);
      
      expect(screen.queryByText(/name can only contain letters and spaces/i)).not.toBeInTheDocument();
    });

    it('accepts valid Indian mobile numbers starting with 6-9', () => {
      render(<EnquiryForm />);
      
      const contactNumberInput = screen.getByLabelText(/contact number/i);
      
      // Test with 6
      fireEvent.change(contactNumberInput, { target: { value: '6123456789' } });
      fireEvent.blur(contactNumberInput);
      expect(screen.queryByText(/please enter a valid indian mobile number/i)).not.toBeInTheDocument();
      
      // Test with 7
      fireEvent.change(contactNumberInput, { target: { value: '7123456789' } });
      fireEvent.blur(contactNumberInput);
      expect(screen.queryByText(/please enter a valid indian mobile number/i)).not.toBeInTheDocument();
      
      // Test with 8
      fireEvent.change(contactNumberInput, { target: { value: '8123456789' } });
      fireEvent.blur(contactNumberInput);
      expect(screen.queryByText(/please enter a valid indian mobile number/i)).not.toBeInTheDocument();
      
      // Test with 9
      fireEvent.change(contactNumberInput, { target: { value: '9123456789' } });
      fireEvent.blur(contactNumberInput);
      expect(screen.queryByText(/please enter a valid indian mobile number/i)).not.toBeInTheDocument();
    });

    it('focuses first invalid field when validation fails on submit', async () => {
      render(<EnquiryForm />);
      
      const parentNameInput = screen.getByLabelText(/parent name/i);
      const studentStandardSelect = screen.getByLabelText(/student standard/i);
      const contactNumberInput = screen.getByLabelText(/contact number/i);
      const submitButton = screen.getByRole('button', { name: /submit enquiry/i });
      
      // Leave all fields empty and submit
      fireEvent.click(submitButton);
      
      // Wait for focus to be set (using setTimeout in the component)
      await waitFor(() => {
        // The first invalid field (parentName) should be focused
        expect(document.activeElement).toBe(parentNameInput);
      });
    });

    it('focuses first invalid field when multiple fields are invalid', async () => {
      render(<EnquiryForm />);
      
      const parentNameInput = screen.getByLabelText(/parent name/i);
      const studentStandardSelect = screen.getByLabelText(/student standard/i);
      const contactNumberInput = screen.getByLabelText(/contact number/i);
      const submitButton = screen.getByRole('button', { name: /submit enquiry/i });
      
      // Fill in valid contact number but leave others invalid
      fireEvent.change(contactNumberInput, { target: { value: '9876543210' } });
      
      // Submit with parentName and studentStandard invalid
      fireEvent.click(submitButton);
      
      // Wait for focus to be set
      await waitFor(() => {
        // The first invalid field (parentName) should be focused
        expect(document.activeElement).toBe(parentNameInput);
      });
    });
  });

  // Form submission success tests
  describe('Form Submission Success', () => {
    it('displays success confirmation message after valid submission', () => {
      render(<EnquiryForm />);
      
      const parentNameInput = screen.getByLabelText(/parent name/i);
      const studentStandardSelect = screen.getByLabelText(/student standard/i);
      const contactNumberInput = screen.getByLabelText(/contact number/i);
      const submitButton = screen.getByRole('button', { name: /submit enquiry/i });
      
      // Fill in valid data
      fireEvent.change(parentNameInput, { target: { value: 'John Doe' } });
      fireEvent.change(studentStandardSelect, { target: { value: '3' } });
      fireEvent.change(contactNumberInput, { target: { value: '9876543210' } });
      
      // Submit the form
      fireEvent.click(submitButton);
      
      // Success message should be displayed
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
      expect(screen.getByText(/your enquiry has been submitted successfully/i)).toBeInTheDocument();
      expect(screen.getByText(/we'll contact you within 24 hours/i)).toBeInTheDocument();
    });

    it('hides form fields when success message is displayed', () => {
      render(<EnquiryForm />);
      
      const parentNameInput = screen.getByLabelText(/parent name/i);
      const studentStandardSelect = screen.getByLabelText(/student standard/i);
      const contactNumberInput = screen.getByLabelText(/contact number/i);
      const submitButton = screen.getByRole('button', { name: /submit enquiry/i });
      
      // Fill in valid data
      fireEvent.change(parentNameInput, { target: { value: 'Jane Smith' } });
      fireEvent.change(studentStandardSelect, { target: { value: '4' } });
      fireEvent.change(contactNumberInput, { target: { value: '9123456789' } });
      
      // Submit the form
      fireEvent.click(submitButton);
      
      // Form fields should not be visible
      expect(screen.queryByLabelText(/parent name/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/student standard/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/contact number/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/message/i)).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /submit enquiry/i })).not.toBeInTheDocument();
    });

    it('allows submitting another enquiry after success', () => {
      render(<EnquiryForm />);
      
      const parentNameInput = screen.getByLabelText(/parent name/i);
      const studentStandardSelect = screen.getByLabelText(/student standard/i);
      const contactNumberInput = screen.getByLabelText(/contact number/i);
      const submitButton = screen.getByRole('button', { name: /submit enquiry/i });
      
      // Fill in and submit first enquiry
      fireEvent.change(parentNameInput, { target: { value: 'John Doe' } });
      fireEvent.change(studentStandardSelect, { target: { value: '3' } });
      fireEvent.change(contactNumberInput, { target: { value: '9876543210' } });
      fireEvent.click(submitButton);
      
      // Success message should be displayed
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
      
      // Click "Submit Another Enquiry" button
      const anotherEnquiryButton = screen.getByRole('button', { name: /submit another enquiry/i });
      fireEvent.click(anotherEnquiryButton);
      
      // Form should be visible again with empty fields
      expect(screen.getByLabelText(/parent name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/parent name/i)).toHaveValue('');
      expect(screen.getByLabelText(/student standard/i)).toHaveValue('');
      expect(screen.getByLabelText(/contact number/i)).toHaveValue('');
      expect(screen.getByLabelText(/message/i)).toHaveValue('');
    });

    it('success message has proper accessibility attributes', () => {
      render(<EnquiryForm />);
      
      const parentNameInput = screen.getByLabelText(/parent name/i);
      const studentStandardSelect = screen.getByLabelText(/student standard/i);
      const contactNumberInput = screen.getByLabelText(/contact number/i);
      const submitButton = screen.getByRole('button', { name: /submit enquiry/i });
      
      // Fill in valid data and submit
      fireEvent.change(parentNameInput, { target: { value: 'John Doe' } });
      fireEvent.change(studentStandardSelect, { target: { value: '3' } });
      fireEvent.change(contactNumberInput, { target: { value: '9876543210' } });
      fireEvent.click(submitButton);
      
      // Success message should have proper ARIA attributes
      const successMessage = screen.getByRole('alert');
      expect(successMessage).toHaveAttribute('aria-live', 'polite');
    });
  });
});
