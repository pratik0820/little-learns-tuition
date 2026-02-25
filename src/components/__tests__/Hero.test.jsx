import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

describe('Hero Component', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<Hero />);
      
      // Check headline
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Personalized Tuition Classes for 1st to 5th Standard Students'
      );
      
      // Check subheadline
      expect(screen.getByText(/Building strong foundations/i)).toBeInTheDocument();
    });

    it('should render custom headline and subheadline', () => {
      render(
        <Hero
          headline="Custom Headline"
          subheadline="Custom Subheadline"
        />
      );
      
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Custom Headline');
      expect(screen.getByText('Custom Subheadline')).toBeInTheDocument();
    });

    it('should render both CTA buttons', () => {
      render(<Hero />);
      
      const enrollButton = screen.getByRole('link', { name: /enroll now/i });
      const whatsappButton = screen.getByRole('link', { name: /contact us on whatsapp/i });
      
      expect(enrollButton).toBeInTheDocument();
      expect(whatsappButton).toBeInTheDocument();
    });

    it('should render CTA buttons with correct links', () => {
      const enrollLink = '/contact.html';
      const whatsappLink = 'https://wa.me/919876543210';
      
      render(
        <Hero
          enrollLink={enrollLink}
          whatsappLink={whatsappLink}
        />
      );
      
      const enrollButton = screen.getByRole('link', { name: /enroll now/i });
      const whatsappButton = screen.getByRole('link', { name: /contact us on whatsapp/i });
      
      expect(enrollButton).toHaveAttribute('href', enrollLink);
      expect(whatsappButton).toHaveAttribute('href', whatsappLink);
    });

    it('should render all four default highlights', () => {
      render(<Hero />);
      
      expect(screen.getByText('Small batch size')).toBeInTheDocument();
      expect(screen.getByText('Individual attention')).toBeInTheDocument();
      expect(screen.getByText('Homework support')).toBeInTheDocument();
      expect(screen.getByText('Concept-based learning')).toBeInTheDocument();
    });

    it('should render custom highlights', () => {
      const customHighlights = [
        { icon: '🏆', text: 'Proven Results' },
        { icon: '👨‍🏫', text: 'Expert Teachers' }
      ];
      
      render(<Hero highlights={customHighlights} />);
      
      expect(screen.getByText('Proven Results')).toBeInTheDocument();
      expect(screen.getByText('Expert Teachers')).toBeInTheDocument();
      expect(screen.queryByText('Small batch size')).not.toBeInTheDocument();
    });

    it('should render quick info strip with all three items', () => {
      render(<Hero />);
      
      expect(screen.getByText('Standards:')).toBeInTheDocument();
      expect(screen.getByText('Class 1-5')).toBeInTheDocument();
      
      expect(screen.getByText('Subjects:')).toBeInTheDocument();
      expect(screen.getByText('English, Maths, Science, EVS')).toBeInTheDocument();
      
      expect(screen.getByText('Location:')).toBeInTheDocument();
      expect(screen.getByText('Your Location')).toBeInTheDocument();
    });

    it('should render custom quick info', () => {
      const customQuickInfo = {
        standards: 'Class 1-3',
        subjects: 'Math and Science',
        location: 'Mumbai'
      };
      
      render(<Hero quickInfo={customQuickInfo} />);
      
      expect(screen.getByText('Class 1-3')).toBeInTheDocument();
      expect(screen.getByText('Math and Science')).toBeInTheDocument();
      expect(screen.getByText('Mumbai')).toBeInTheDocument();
    });
  });

  describe('Structure', () => {
    it('should have hero section with proper class', () => {
      const { container } = render(<Hero />);
      const heroSection = container.querySelector('.hero');
      
      expect(heroSection).toBeInTheDocument();
      expect(heroSection.tagName).toBe('SECTION');
    });

    it('should have container div', () => {
      const { container } = render(<Hero />);
      const containerDiv = container.querySelector('.container');
      
      expect(containerDiv).toBeInTheDocument();
    });

    it('should have hero content wrapper', () => {
      const { container } = render(<Hero />);
      const contentWrapper = container.querySelector('.hero__content');
      
      expect(contentWrapper).toBeInTheDocument();
    });

    it('should have highlights container', () => {
      const { container } = render(<Hero />);
      const highlightsContainer = container.querySelector('.hero__highlights');
      
      expect(highlightsContainer).toBeInTheDocument();
    });

    it('should have quick info container', () => {
      const { container } = render(<Hero />);
      const quickInfoContainer = container.querySelector('.hero__quick-info');
      
      expect(quickInfoContainer).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<Hero />);
      
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
    });

    it('should have aria-labels on CTA buttons', () => {
      render(<Hero />);
      
      const enrollButton = screen.getByRole('link', { name: /enroll now in tuition classes/i });
      const whatsappButton = screen.getByRole('link', { name: /contact us on whatsapp/i });
      
      expect(enrollButton).toBeInTheDocument();
      expect(whatsappButton).toBeInTheDocument();
    });

    it('should have aria-hidden on decorative icons', () => {
      const { container } = render(<Hero />);
      const icons = container.querySelectorAll('.hero__highlight-icon');
      
      icons.forEach(icon => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('Requirements Validation', () => {
    it('should display headline as per Requirement 1.1', () => {
      render(<Hero />);
      
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Personalized Tuition Classes for 1st to 5th Standard Students'
      );
    });

    it('should display two primary CTAs as per Requirement 1.2', () => {
      render(<Hero />);
      
      const enrollButton = screen.getByRole('link', { name: /enroll now/i });
      const whatsappButton = screen.getByRole('link', { name: /contact us on whatsapp/i });
      
      expect(enrollButton).toBeInTheDocument();
      expect(whatsappButton).toBeInTheDocument();
    });

    it('should display four key highlights as per Requirement 1.3', () => {
      const { container } = render(<Hero />);
      const highlights = container.querySelectorAll('.hero__highlight-item');
      
      expect(highlights).toHaveLength(4);
      expect(screen.getByText('Small batch size')).toBeInTheDocument();
      expect(screen.getByText('Individual attention')).toBeInTheDocument();
      expect(screen.getByText('Homework support')).toBeInTheDocument();
      expect(screen.getByText('Concept-based learning')).toBeInTheDocument();
    });

    it('should display quick info strip as per Requirement 1.4', () => {
      const { container } = render(<Hero />);
      const infoItems = container.querySelectorAll('.hero__info-item');
      
      expect(infoItems).toHaveLength(3);
      expect(screen.getByText('Standards:')).toBeInTheDocument();
      expect(screen.getByText('Subjects:')).toBeInTheDocument();
      expect(screen.getByText('Location:')).toBeInTheDocument();
    });

    it('should have Enroll Now button linking to Contact page as per Requirement 1.5', () => {
      render(<Hero />);
      
      const enrollButton = screen.getByRole('link', { name: /enroll now/i });
      expect(enrollButton).toHaveAttribute('href', '/contact');
    });

    it('should have WhatsApp button with pre-filled message as per Requirement 1.6', () => {
      render(<Hero />);
      
      const whatsappButton = screen.getByRole('link', { name: /contact us on whatsapp/i });
      const href = whatsappButton.getAttribute('href');
      
      expect(href).toContain('wa.me');
      expect(href).toContain('text=');
    });
  });
});
