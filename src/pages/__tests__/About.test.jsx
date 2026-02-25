import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from '../About';

describe('About Page', () => {
  it('renders the page title', () => {
    render(<About />);
    expect(screen.getByText('About the Teacher')).toBeInTheDocument();
  });

  it('renders the teacher profile card', () => {
    render(<About />);
    // TeacherProfileCard should be present
    const profileCard = document.querySelector('.teacher-profile-card');
    expect(profileCard).toBeInTheDocument();
  });

  it('renders the personal introduction section', () => {
    render(<About />);
    expect(screen.getByText('Personal Introduction')).toBeInTheDocument();
    expect(screen.getByText(/Hello! I'm a dedicated teacher/i)).toBeInTheDocument();
  });

  it('renders the teaching philosophy section', () => {
    render(<About />);
    expect(screen.getByText('Teaching Philosophy')).toBeInTheDocument();
    expect(screen.getByText('Concept-Based Learning')).toBeInTheDocument();
    expect(screen.getByText('Individual Attention')).toBeInTheDocument();
    expect(screen.getByText('Building Confidence')).toBeInTheDocument();
  });

  it('renders the background and experience section', () => {
    render(<About />);
    expect(screen.getByText('Background and Experience')).toBeInTheDocument();
    expect(screen.getByText(/Over the years, I've had the privilege/i)).toBeInTheDocument();
  });

  it('renders the why choose us section', () => {
    render(<About />);
    expect(screen.getByText('Why Choose Our Classes')).toBeInTheDocument();
    expect(screen.getByText('Small Batch Sizes')).toBeInTheDocument();
    expect(screen.getByText('Comprehensive Support')).toBeInTheDocument();
    expect(screen.getByText('Proven Results')).toBeInTheDocument();
    expect(screen.getByText('Interactive Learning')).toBeInTheDocument();
    expect(screen.getByText('Regular Assessments')).toBeInTheDocument();
    expect(screen.getByText('Parent Partnership')).toBeInTheDocument();
  });

  it('implements proper heading hierarchy', () => {
    render(<About />);
    
    // Check for h2 headings (section titles)
    const h2Headings = document.querySelectorAll('h2');
    expect(h2Headings.length).toBeGreaterThan(0);
    
    // Check for h3 headings (subsections)
    const h3Headings = document.querySelectorAll('h3');
    expect(h3Headings.length).toBeGreaterThan(0);
    
    // Verify specific headings exist
    expect(screen.getByRole('heading', { level: 2, name: 'Personal Introduction' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Teaching Philosophy' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Background and Experience' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Why Choose Our Classes' })).toBeInTheDocument();
  });

  it('renders all six reason cards in why choose section', () => {
    render(<About />);
    const reasonCards = document.querySelectorAll('.reason-card');
    expect(reasonCards.length).toBe(6);
  });

  it('renders all three philosophy points', () => {
    render(<About />);
    const philosophyPoints = document.querySelectorAll('.philosophy-point');
    expect(philosophyPoints.length).toBe(3);
  });

  it('uses semantic section elements', () => {
    render(<About />);
    const sections = document.querySelectorAll('section');
    expect(sections.length).toBeGreaterThan(0);
  });
});
