import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AdmissionsUrgencyBanner from '../AdmissionsUrgencyBanner';

describe('AdmissionsUrgencyBanner', () => {
  it('renders with default message', () => {
    render(<AdmissionsUrgencyBanner />);
    
    const message = screen.getByText(/Limited Seats for June Batch – Admissions Open/i);
    expect(message).toBeInTheDocument();
  });

  it('renders with custom message', () => {
    const customMessage = "Hurry! Only 5 Seats Left!";
    render(<AdmissionsUrgencyBanner message={customMessage} />);
    
    const message = screen.getByText(customMessage);
    expect(message).toBeInTheDocument();
  });

  it('has proper banner role for accessibility', () => {
    const { container } = render(<AdmissionsUrgencyBanner />);
    
    const banner = container.querySelector('[role="banner"]');
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveAttribute('aria-label', 'Admissions urgency notice');
  });

  it('displays urgency icon', () => {
    const { container } = render(<AdmissionsUrgencyBanner />);
    
    const icon = container.querySelector('.admissions-banner__icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<AdmissionsUrgencyBanner />);
    
    expect(container.querySelector('.admissions-banner')).toBeInTheDocument();
    expect(container.querySelector('.admissions-banner__content')).toBeInTheDocument();
    expect(container.querySelector('.admissions-banner__message')).toBeInTheDocument();
  });

  it('message is contained in a paragraph element', () => {
    render(<AdmissionsUrgencyBanner />);
    
    const message = screen.getByText(/Limited Seats for June Batch – Admissions Open/i);
    expect(message.tagName).toBe('P');
  });
});
