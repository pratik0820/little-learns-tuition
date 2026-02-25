import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import Home from '../pages/Home';
import About from '../pages/About';
import Classes from '../pages/Classes';
import Testimonials from '../pages/Testimonials';
import Contact from '../pages/Contact';

// Helper function to render with router
function renderWithRouter(ui) {
  return render(<Router>{ui}</Router>);
}

describe('App Routing Configuration', () => {
  it('should render Home page component', () => {
    renderWithRouter(<Home />);
    
    // Home page should have the hero section with headline
    expect(screen.getByText(/Personalized Tuition Classes/i)).toBeInTheDocument();
  });

  it('should render About page component', () => {
    renderWithRouter(<About />);
    
    // About page should have teacher profile content - use unique text
    expect(screen.getByText(/About the Teacher/i)).toBeInTheDocument();
  });

  it('should render Classes page component', () => {
    renderWithRouter(<Classes />);
    
    // Classes page should have course information - use getAllByText for multiple matches
    const classesHeadings = screen.getAllByText(/Our Classes/i);
    expect(classesHeadings.length).toBeGreaterThan(0);
  });

  it('should render Testimonials page component', () => {
    renderWithRouter(<Testimonials />);
    
    // Testimonials page should have testimonials heading
    expect(screen.getByText(/What Parents Say/i)).toBeInTheDocument();
  });

  it('should render Contact page component', () => {
    renderWithRouter(<Contact />);
    
    // Contact page should have contact form
    expect(screen.getByText(/Get in Touch/i)).toBeInTheDocument();
  });

  it('should render Header component with navigation', () => {
    renderWithRouter(<Header />);
    
    // Header should be present with navigation
    expect(screen.getByRole('banner')).toBeInTheDocument();
    
    // Should have navigation links - use getAllByText for multiple matches (desktop + mobile)
    const homeLinks = screen.getAllByText('Home');
    expect(homeLinks.length).toBeGreaterThan(0);
    
    const aboutLinks = screen.getAllByText(/About/i);
    expect(aboutLinks.length).toBeGreaterThan(0);
  });

  it('should render Footer component', () => {
    renderWithRouter(<Footer />);
    
    // Footer should be present
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should render WhatsApp button component', () => {
    renderWithRouter(<WhatsAppButton />);
    
    // WhatsApp button should be present
    const whatsappButton = screen.getByLabelText(/WhatsApp/i);
    expect(whatsappButton).toBeInTheDocument();
  });

  it('should have all required page components defined', () => {
    // This test verifies all page components can be imported
    expect(Home).toBeDefined();
    expect(About).toBeDefined();
    expect(Classes).toBeDefined();
    expect(Testimonials).toBeDefined();
    expect(Contact).toBeDefined();
  });
});
