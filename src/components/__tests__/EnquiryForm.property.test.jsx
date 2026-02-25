import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as fc from 'fast-check';
import EnquiryForm from '../EnquiryForm';

/**
 * Property-Based Tests for EnquiryForm Component
 * 
 * These tests validate universal properties that should hold true
 * for all form validation scenarios.
 */

describe('EnquiryForm Component - Property-Based Tests', () => {
  /**
   * Property 5: Form Validation for Valid Input
   * 
   * **Validates: Requirements 7.6, 7.7**
   * 
   * For any enquiry form submission where all required fields 
   * (parent name, student standard, contact number) contain valid data,
   * the validation function should return success and display a 
   * confirmation message.
   * 
   * This test verifies that valid form data always passes validation
   * and triggers the onSubmit handler.
   */
  describe('Property 5: Form Validation for Valid Input', () => {
    it('should accept and submit any valid form data', () => {
      // Define arbitraries for valid form inputs
      const validParentNameArbitrary = fc.string({ minLength: 2, maxLength: 50 })
        .filter(name => /^[a-zA-Z\s]+$/.test(name.trim()) && name.trim().length >= 2);
      
      const validStudentStandardArbitrary = fc.constantFrom('1', '2', '3', '4', '5');
      
      const validContactNumberArbitrary = fc.integer({ min: 6000000000, max: 9999999999 })
        .map(num => num.toString());
      
      const validMessageArbitrary = fc.string({ maxLength: 500 });
      
      // Property: For any valid input combination, the form should submit successfully
      fc.assert(
        fc.property(
          validParentNameArbitrary,
          validStudentStandardArbitrary,
          validContactNumberArbitrary,
          validMessageArbitrary,
          (parentName, studentStandard, contactNumber, message) => {
            const handleSubmit = vi.fn();
            const { unmount } = render(<EnquiryForm onSubmit={handleSubmit} />);
            
            // Fill in the form with valid data
            const parentNameInput = screen.getByLabelText(/parent name/i);
            const studentStandardSelect = screen.getByLabelText(/student standard/i);
            const contactNumberInput = screen.getByLabelText(/contact number/i);
            const messageTextarea = screen.getByLabelText(/message/i);
            const submitButton = screen.getByRole('button', { name: /submit enquiry/i });
            
            fireEvent.change(parentNameInput, { target: { value: parentName } });
            fireEvent.change(studentStandardSelect, { target: { value: studentStandard } });
            fireEvent.change(contactNumberInput, { target: { value: contactNumber } });
            fireEvent.change(messageTextarea, { target: { value: message } });
            
            // Submit the form
            fireEvent.click(submitButton);
            
            // The onSubmit handler should have been called with the form data
            expect(handleSubmit).toHaveBeenCalledTimes(1);
            expect(handleSubmit).toHaveBeenCalledWith({
              parentName: parentName,
              studentStandard: studentStandard,
              contactNumber: contactNumber,
              message: message
            });
            
            // No error messages should be displayed
            expect(screen.queryByText(/parent name is required/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/name must be at least 2 characters/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/name must not exceed 50 characters/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/name can only contain letters and spaces/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/contact number is required/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/contact number must be 10 digits/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/please enter a valid indian mobile number/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/please select student's standard/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/message must not exceed 500 characters/i)).not.toBeInTheDocument();
            
            unmount();
            return true;
          }
        ),
        {
          numRuns: 5, // Run 5 test cases with different valid input combinations
          verbose: false
        }
      );
    });

    it('should accept valid parent names with various letter and space combinations', () => {
      // Generate valid parent names with letters and spaces
      const validParentNameArbitrary = fc.array(
        fc.constantFrom(...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ '.split('')),
        { minLength: 2, maxLength: 50 }
      ).map(chars => chars.join('').trim())
        .filter(name => name.length >= 2 && /^[a-zA-Z\s]+$/.test(name));
      
      fc.assert(
        fc.property(
          validParentNameArbitrary,
          (parentName) => {
            const handleSubmit = vi.fn();
            const { unmount } = render(<EnquiryForm onSubmit={handleSubmit} />);
            
            const parentNameInput = screen.getByLabelText(/parent name/i);
            const studentStandardSelect = screen.getByLabelText(/student standard/i);
            const contactNumberInput = screen.getByLabelText(/contact number/i);
            const submitButton = screen.getByRole('button', { name: /submit enquiry/i });
            
            fireEvent.change(parentNameInput, { target: { value: parentName } });
            fireEvent.change(studentStandardSelect, { target: { value: '3' } });
            fireEvent.change(contactNumberInput, { target: { value: '9876543210' } });
            
            fireEvent.click(submitButton);
            
            // Should submit successfully
            expect(handleSubmit).toHaveBeenCalledTimes(1);
            expect(handleSubmit).toHaveBeenCalledWith(
              expect.objectContaining({
                parentName: parentName
              })
            );
            
            unmount();
            return true;
          }
        ),
        {
          numRuns: 5,
          verbose: false
        }
      );
    });

    it('should accept all valid Indian mobile numbers (starting with 6-9)', () => {
      // Generate valid Indian mobile numbers
      const validContactNumberArbitrary = fc.integer({ min: 0, max: 3 })
        .chain(firstDigitIndex => {
          const firstDigit = [6, 7, 8, 9][firstDigitIndex];
          return fc.integer({ min: 0, max: 999999999 })
            .map(remaining => `${firstDigit}${remaining.toString().padStart(9, '0')}`);
        });
      
      fc.assert(
        fc.property(
          validContactNumberArbitrary,
          (contactNumber) => {
            const handleSubmit = vi.fn();
            const { unmount } = render(<EnquiryForm onSubmit={handleSubmit} />);
            
            const parentNameInput = screen.getByLabelText(/parent name/i);
            const studentStandardSelect = screen.getByLabelText(/student standard/i);
            const contactNumberInput = screen.getByLabelText(/contact number/i);
            const submitButton = screen.getByRole('button', { name: /submit enquiry/i });
            
            fireEvent.change(parentNameInput, { target: { value: 'John Doe' } });
            fireEvent.change(studentStandardSelect, { target: { value: '2' } });
            fireEvent.change(contactNumberInput, { target: { value: contactNumber } });
            
            fireEvent.click(submitButton);
            
            // Should submit successfully
            expect(handleSubmit).toHaveBeenCalledTimes(1);
            expect(handleSubmit).toHaveBeenCalledWith(
              expect.objectContaining({
                contactNumber: contactNumber
              })
            );
            
            unmount();
            return true;
          }
        ),
        {
          numRuns: 5,
          verbose: false
        }
      );
    });
  });

  /**
   * Property 6: Form Validation Error Display
   * 
   * **Validates: Requirements 7.8**
   * 
   * For any enquiry form submission where one or more required fields
   * contain invalid data, the validation function should return failure
   * and display specific error messages for each invalid field.
   * 
   * This test verifies that invalid form data always fails validation
   * and displays appropriate error messages.
   */
  describe('Property 6: Form Validation Error Display', () => {
    it('should reject and show error for any invalid parent name', () => {
      // Define arbitraries for invalid parent names
      const invalidParentNameArbitrary = fc.oneof(
        fc.constant(''), // Empty name
        fc.constant('A'), // Too short (1 character)
        fc.string({ minLength: 51, maxLength: 100 }), // Too long
        fc.string({ minLength: 2, maxLength: 50 })
          .filter(name => /[0-9!@#$%^&*(),.?":{}|<>]/.test(name)) // Contains invalid characters
      );
      
      // Property: For any invalid parent name, the form should not submit and show an error
      fc.assert(
        fc.property(
          invalidParentNameArbitrary,
          (invalidParentName) => {
            const handleSubmit = vi.fn();
            const { unmount } = render(<EnquiryForm onSubmit={handleSubmit} />);
            
            const parentNameInput = screen.getByLabelText(/parent name/i);
            const studentStandardSelect = screen.getByLabelText(/student standard/i);
            const contactNumberInput = screen.getByLabelText(/contact number/i);
            const submitButton = screen.getByRole('button', { name: /submit enquiry/i });
            
            // Fill in valid data for other fields
            fireEvent.change(studentStandardSelect, { target: { value: '3' } });
            fireEvent.change(contactNumberInput, { target: { value: '9876543210' } });
            
            // Fill in invalid parent name
            fireEvent.change(parentNameInput, { target: { value: invalidParentName } });
            
            // Submit the form
            fireEvent.click(submitButton);
            
            // The onSubmit handler should NOT have been called
            expect(handleSubmit).not.toHaveBeenCalled();
            
            // An error message should be displayed
            const errorMessages = [
              /parent name is required/i,
              /name must be at least 2 characters/i,
              /name must not exceed 50 characters/i,
              /name can only contain letters and spaces/i
            ];
            
            const hasError = errorMessages.some(pattern => 
              screen.queryByText(pattern) !== null
            );
            
            expect(hasError).toBe(true);
            
            unmount();
            return true;
          }
        ),
        {
          numRuns: 5,
          verbose: false
        }
      );
    });

    it('should reject and show error for any invalid contact number', () => {
      // Define arbitraries for invalid contact numbers
      const invalidContactNumberArbitrary = fc.oneof(
        fc.constant(''), // Empty
        fc.string({ minLength: 1, maxLength: 9 }).filter(s => /^\d+$/.test(s)), // Too short
        fc.string({ minLength: 11, maxLength: 15 }).filter(s => /^\d+$/.test(s)), // Too long
        fc.integer({ min: 1000000000, max: 5999999999 }).map(n => n.toString()), // Doesn't start with 6-9
        fc.string({ minLength: 10, maxLength: 10 }).filter(s => /[a-zA-Z]/.test(s)) // Contains letters
      );
      
      // Property: For any invalid contact number, the form should not submit and show an error
      fc.assert(
        fc.property(
          invalidContactNumberArbitrary,
          (invalidContactNumber) => {
            const handleSubmit = vi.fn();
            const { unmount } = render(<EnquiryForm onSubmit={handleSubmit} />);
            
            const parentNameInput = screen.getByLabelText(/parent name/i);
            const studentStandardSelect = screen.getByLabelText(/student standard/i);
            const contactNumberInput = screen.getByLabelText(/contact number/i);
            const submitButton = screen.getByRole('button', { name: /submit enquiry/i });
            
            // Fill in valid data for other fields
            fireEvent.change(parentNameInput, { target: { value: 'John Doe' } });
            fireEvent.change(studentStandardSelect, { target: { value: '3' } });
            
            // Fill in invalid contact number
            fireEvent.change(contactNumberInput, { target: { value: invalidContactNumber } });
            
            // Submit the form
            fireEvent.click(submitButton);
            
            // The onSubmit handler should NOT have been called
            expect(handleSubmit).not.toHaveBeenCalled();
            
            // An error message should be displayed
            const errorMessages = [
              /contact number is required/i,
              /contact number must be 10 digits/i,
              /please enter a valid indian mobile number/i
            ];
            
            const hasError = errorMessages.some(pattern => 
              screen.queryByText(pattern) !== null
            );
            
            expect(hasError).toBe(true);
            
            unmount();
            return true;
          }
        ),
        {
          numRuns: 5,
          verbose: false
        }
      );
    });

    it('should reject and show error when student standard is not selected', () => {
      const handleSubmit = vi.fn();
      render(<EnquiryForm onSubmit={handleSubmit} />);
      
      const parentNameInput = screen.getByLabelText(/parent name/i);
      const contactNumberInput = screen.getByLabelText(/contact number/i);
      const submitButton = screen.getByRole('button', { name: /submit enquiry/i });
      
      // Fill in valid data for other fields but leave student standard empty
      fireEvent.change(parentNameInput, { target: { value: 'John Doe' } });
      fireEvent.change(contactNumberInput, { target: { value: '9876543210' } });
      
      // Submit the form
      fireEvent.click(submitButton);
      
      // The onSubmit handler should NOT have been called
      expect(handleSubmit).not.toHaveBeenCalled();
      
      // An error message should be displayed
      expect(screen.getByText(/please select student's standard/i)).toBeInTheDocument();
    });

    it('should reject and show error when message exceeds 500 characters', () => {
      // Generate messages that exceed 500 characters
      const invalidMessageArbitrary = fc.string({ minLength: 501, maxLength: 1000 });
      
      fc.assert(
        fc.property(
          invalidMessageArbitrary,
          (invalidMessage) => {
            const handleSubmit = vi.fn();
            const { unmount } = render(<EnquiryForm onSubmit={handleSubmit} />);
            
            const parentNameInput = screen.getByLabelText(/parent name/i);
            const studentStandardSelect = screen.getByLabelText(/student standard/i);
            const contactNumberInput = screen.getByLabelText(/contact number/i);
            const messageTextarea = screen.getByLabelText(/message/i);
            const submitButton = screen.getByRole('button', { name: /submit enquiry/i });
            
            // Fill in valid data for required fields
            fireEvent.change(parentNameInput, { target: { value: 'John Doe' } });
            fireEvent.change(studentStandardSelect, { target: { value: '3' } });
            fireEvent.change(contactNumberInput, { target: { value: '9876543210' } });
            
            // Fill in invalid message
            fireEvent.change(messageTextarea, { target: { value: invalidMessage } });
            
            // Submit the form
            fireEvent.click(submitButton);
            
            // The onSubmit handler should NOT have been called
            expect(handleSubmit).not.toHaveBeenCalled();
            
            // An error message should be displayed
            expect(screen.getByText(/message must not exceed 500 characters/i)).toBeInTheDocument();
            
            unmount();
            return true;
          }
        ),
        {
          numRuns: 5,
          verbose: false
        }
      );
    });

    it('should display multiple error messages when multiple fields are invalid', () => {
      // Test with all fields invalid
      const handleSubmit = vi.fn();
      render(<EnquiryForm onSubmit={handleSubmit} />);
      
      const parentNameInput = screen.getByLabelText(/parent name/i);
      const contactNumberInput = screen.getByLabelText(/contact number/i);
      const messageTextarea = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /submit enquiry/i });
      
      // Fill in invalid data for all fields
      fireEvent.change(parentNameInput, { target: { value: 'A' } }); // Too short
      fireEvent.change(contactNumberInput, { target: { value: '123' } }); // Too short
      fireEvent.change(messageTextarea, { target: { value: 'A'.repeat(501) } }); // Too long
      
      // Submit the form
      fireEvent.click(submitButton);
      
      // The onSubmit handler should NOT have been called
      expect(handleSubmit).not.toHaveBeenCalled();
      
      // Multiple error messages should be displayed
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/contact number must be 10 digits/i)).toBeInTheDocument();
      expect(screen.getByText(/please select student's standard/i)).toBeInTheDocument();
      expect(screen.getByText(/message must not exceed 500 characters/i)).toBeInTheDocument();
    });

    it('should show error on blur for any invalid field', () => {
      // Test that validation happens on blur, not just on submit
      const invalidParentNameArbitrary = fc.oneof(
        fc.constant(''),
        fc.constant('A'),
        fc.string({ minLength: 2, maxLength: 50 }).filter(name => /[0-9]/.test(name))
      );
      
      fc.assert(
        fc.property(
          invalidParentNameArbitrary,
          (invalidParentName) => {
            const { unmount } = render(<EnquiryForm />);
            
            const parentNameInput = screen.getByLabelText(/parent name/i);
            
            // Fill in invalid parent name and blur
            fireEvent.change(parentNameInput, { target: { value: invalidParentName } });
            fireEvent.blur(parentNameInput);
            
            // An error message should be displayed immediately (without submitting)
            const errorMessages = [
              /parent name is required/i,
              /name must be at least 2 characters/i,
              /name can only contain letters and spaces/i
            ];
            
            const hasError = errorMessages.some(pattern => 
              screen.queryByText(pattern) !== null
            );
            
            expect(hasError).toBe(true);
            
            unmount();
            return true;
          }
        ),
        {
          numRuns: 5,
          verbose: false
        }
      );
    });
  });
});
