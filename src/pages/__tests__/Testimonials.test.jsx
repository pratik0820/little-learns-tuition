import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Testimonials from '../Testimonials';

describe('Testimonials Page', () => {
  it('renders the page heading', () => {
    render(<Testimonials />);
    expect(screen.getByText('What Parents Say')).toBeInTheDocument();
  });

  it('renders the introduction text', () => {
    render(<Testimonials />);
    expect(screen.getByText(/Don't just take our word for it/i)).toBeInTheDocument();
  });

  it('renders multiple testimonial cards', () => {
    render(<Testimonials />);
    
    // Check for specific parent names
    expect(screen.getByText('Mrs. Sharma')).toBeInTheDocument();
    expect(screen.getByText('Mr. Patel')).toBeInTheDocument();
    expect(screen.getByText('Mrs. Reddy')).toBeInTheDocument();
  });

  it('displays testimonial feedback text', () => {
    render(<Testimonials />);
    
    // Check for part of a testimonial feedback
    expect(screen.getByText(/My son's grades improved significantly/i)).toBeInTheDocument();
  });

  it('displays student information', () => {
    render(<Testimonials />);
    
    // Check for student info format
    expect(screen.getByText(/Parent of Aarav, Class 4/i)).toBeInTheDocument();
  });

  it('displays improvement stories', () => {
    render(<Testimonials />);
    
    // Check for improvement text
    expect(screen.getByText(/Math score increased from 65% to 85%/i)).toBeInTheDocument();
  });

  it('renders the testimonials grid', () => {
    const { container } = render(<Testimonials />);
    const grid = container.querySelector('.testimonials-grid');
    expect(grid).toBeInTheDocument();
  });

  it('renders CTA section with heading', () => {
    render(<Testimonials />);
    expect(screen.getByText('Join Our Happy Parents')).toBeInTheDocument();
  });

  it('renders Contact Us button', () => {
    render(<Testimonials />);
    const contactButton = screen.getByRole('link', { name: /Contact Us/i });
    expect(contactButton).toBeInTheDocument();
    expect(contactButton).toHaveAttribute('href', '/contact');
  });

  it('renders WhatsApp Enquiry button', () => {
    render(<Testimonials />);
    const whatsappButton = screen.getByRole('link', { name: /WhatsApp Enquiry/i });
    expect(whatsappButton).toBeInTheDocument();
    expect(whatsappButton).toHaveAttribute('target', '_blank');
    expect(whatsappButton).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders at least 6 testimonials', () => {
    const { container } = render(<Testimonials />);
    const testimonialCards = container.querySelectorAll('.testimonial-card');
    expect(testimonialCards.length).toBeGreaterThanOrEqual(6);
  });

  it('has proper responsive grid classes', () => {
    const { container } = render(<Testimonials />);
    const grid = container.querySelector('.testimonials-grid');
    expect(grid).toHaveClass('testimonials-grid');
  });
});
