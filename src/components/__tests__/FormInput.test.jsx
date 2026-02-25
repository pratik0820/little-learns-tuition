import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormInput from '../FormInput';

describe('FormInput Component', () => {
  it('renders text input with label', () => {
    const handleChange = vi.fn();
    render(
      <FormInput
        type="text"
        label="Parent Name"
        name="parentName"
        value=""
        onChange={handleChange}
      />
    );
    
    expect(screen.getByLabelText('Parent Name')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays required indicator when required prop is true', () => {
    const handleChange = vi.fn();
    render(
      <FormInput
        type="text"
        label="Parent Name"
        name="parentName"
        value=""
        onChange={handleChange}
        required={true}
      />
    );
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders tel input type', () => {
    const handleChange = vi.fn();
    render(
      <FormInput
        type="tel"
        label="Contact Number"
        name="contactNumber"
        value=""
        onChange={handleChange}
      />
    );
    
    const input = screen.getByLabelText('Contact Number');
    expect(input).toHaveAttribute('type', 'tel');
  });

  it('renders select input with options', () => {
    const handleChange = vi.fn();
    const options = [
      { value: '1', label: 'Class 1' },
      { value: '2', label: 'Class 2' },
      { value: '3', label: 'Class 3' }
    ];
    
    render(
      <FormInput
        type="select"
        label="Student Standard"
        name="studentStandard"
        value=""
        onChange={handleChange}
        options={options}
      />
    );
    
    const select = screen.getByLabelText('Student Standard');
    expect(select).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Class 1' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Class 2' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Class 3' })).toBeInTheDocument();
  });

  it('renders textarea input', () => {
    const handleChange = vi.fn();
    render(
      <FormInput
        type="textarea"
        label="Message"
        name="message"
        value=""
        onChange={handleChange}
        rows={5}
      />
    );
    
    const textarea = screen.getByLabelText('Message');
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('rows', '5');
  });

  it('displays error message when error prop is provided', () => {
    const handleChange = vi.fn();
    render(
      <FormInput
        type="text"
        label="Parent Name"
        name="parentName"
        value=""
        onChange={handleChange}
        error="This field is required"
      />
    );
    
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
  });

  it('sets aria-invalid to true when error is present', () => {
    const handleChange = vi.fn();
    render(
      <FormInput
        type="text"
        label="Parent Name"
        name="parentName"
        value=""
        onChange={handleChange}
        error="This field is required"
      />
    );
    
    const input = screen.getByLabelText(/Parent Name/);
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-describedby when error is present', () => {
    const handleChange = vi.fn();
    render(
      <FormInput
        type="text"
        label="Parent Name"
        name="parentName"
        value=""
        onChange={handleChange}
        error="This field is required"
      />
    );
    
    const input = screen.getByLabelText(/Parent Name/);
    const errorId = input.getAttribute('aria-describedby');
    expect(errorId).toBeTruthy();
    expect(screen.getByRole('alert')).toHaveAttribute('id', errorId);
  });

  it('calls onChange handler when input value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(
      <FormInput
        type="text"
        label="Parent Name"
        name="parentName"
        value=""
        onChange={handleChange}
      />
    );
    
    const input = screen.getByLabelText('Parent Name');
    await user.type(input, 'John');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const handleChange = vi.fn();
    render(
      <FormInput
        type="text"
        label="Parent Name"
        name="parentName"
        value=""
        onChange={handleChange}
        className="custom-class"
      />
    );
    
    const formGroup = screen.getByLabelText('Parent Name').closest('.form-group');
    expect(formGroup).toHaveClass('custom-class');
  });

  it('uses custom id when provided', () => {
    const handleChange = vi.fn();
    render(
      <FormInput
        type="text"
        label="Parent Name"
        name="parentName"
        value=""
        onChange={handleChange}
        id="custom-id"
      />
    );
    
    const input = screen.getByLabelText('Parent Name');
    expect(input).toHaveAttribute('id', 'custom-id');
  });

  it('generates unique id when not provided', () => {
    const handleChange = vi.fn();
    render(
      <FormInput
        type="text"
        label="Parent Name"
        name="parentName"
        value=""
        onChange={handleChange}
      />
    );
    
    const input = screen.getByLabelText('Parent Name');
    expect(input).toHaveAttribute('id', 'form-input-parentName');
  });

  it('applies error styling class when error is present', () => {
    const handleChange = vi.fn();
    render(
      <FormInput
        type="text"
        label="Parent Name"
        name="parentName"
        value=""
        onChange={handleChange}
        error="This field is required"
      />
    );
    
    const input = screen.getByLabelText(/Parent Name/);
    expect(input).toHaveClass('form-input--error');
  });

  it('sets aria-required when required prop is true', () => {
    const handleChange = vi.fn();
    render(
      <FormInput
        type="text"
        label="Parent Name"
        name="parentName"
        value=""
        onChange={handleChange}
        required={true}
      />
    );
    
    const input = screen.getByLabelText(/Parent Name/);
    expect(input).toHaveAttribute('aria-required', 'true');
  });
});
