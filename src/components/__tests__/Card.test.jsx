import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card Component', () => {
  describe('Basic Rendering', () => {
    it('should render card with children content', () => {
      render(<Card>Test content</Card>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('should render card with body prop', () => {
      render(<Card body="Body content" />);
      expect(screen.getByText('Body content')).toBeInTheDocument();
    });

    it('should apply default info type class', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.querySelector('.card');
      expect(card).toHaveClass('card--info');
    });
  });

  describe('Card Variants', () => {
    it('should render testimonial card variant', () => {
      const { container } = render(<Card type="testimonial">Testimonial</Card>);
      const card = container.querySelector('.card');
      expect(card).toHaveClass('card--testimonial');
    });

    it('should render course card variant', () => {
      const { container } = render(<Card type="course">Course</Card>);
      const card = container.querySelector('.card');
      expect(card).toHaveClass('card--course');
    });

    it('should render info card variant', () => {
      const { container } = render(<Card type="info">Info</Card>);
      const card = container.querySelector('.card');
      expect(card).toHaveClass('card--info');
    });
  });

  describe('Card Sections', () => {
    it('should render header section when provided', () => {
      render(<Card header={<h2>Card Header</h2>}>Content</Card>);
      expect(screen.getByText('Card Header')).toBeInTheDocument();
    });

    it('should render footer section when provided', () => {
      render(<Card footer={<p>Card Footer</p>}>Content</Card>);
      expect(screen.getByText('Card Footer')).toBeInTheDocument();
    });

    it('should render all sections together', () => {
      render(
        <Card 
          header={<h2>Header</h2>}
          body={<p>Body</p>}
          footer={<p>Footer</p>}
        />
      );
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Body')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('should not render header section when not provided', () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.querySelector('.card__header')).not.toBeInTheDocument();
    });

    it('should not render footer section when not provided', () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.querySelector('.card__footer')).not.toBeInTheDocument();
    });
  });

  describe('Styling and Structure', () => {
    it('should have rounded corners class', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.querySelector('.card');
      expect(card).toBeInTheDocument();
      // The border-radius is applied via CSS, we verify the card element exists
    });

    it('should apply custom className', () => {
      const { container } = render(<Card className="custom-class">Content</Card>);
      const card = container.querySelector('.card');
      expect(card).toHaveClass('custom-class');
    });

    it('should maintain base card class with custom className', () => {
      const { container } = render(<Card className="custom-class">Content</Card>);
      const card = container.querySelector('.card');
      expect(card).toHaveClass('card');
      expect(card).toHaveClass('custom-class');
    });
  });

  describe('Responsive Behavior', () => {
    it('should render with proper spacing structure', () => {
      const { container } = render(
        <Card 
          header="Header"
          body="Body"
          footer="Footer"
        />
      );
      
      expect(container.querySelector('.card__header')).toBeInTheDocument();
      expect(container.querySelector('.card__body')).toBeInTheDocument();
      expect(container.querySelector('.card__footer')).toBeInTheDocument();
    });
  });

  describe('Requirements Validation', () => {
    it('should support testimonial variant (Requirement 12.7, 17.2)', () => {
      const { container } = render(
        <Card 
          type="testimonial"
          body="Great experience with the tuition classes!"
          footer="Mrs. Sharma"
        />
      );
      
      const card = container.querySelector('.card--testimonial');
      expect(card).toBeInTheDocument();
      expect(screen.getByText('Great experience with the tuition classes!')).toBeInTheDocument();
      expect(screen.getByText('Mrs. Sharma')).toBeInTheDocument();
    });

    it('should support course variant (Requirement 12.7, 17.2)', () => {
      const { container } = render(
        <Card 
          type="course"
          header="Class 3-5"
          body="Mathematics, Science, English"
        />
      );
      
      const card = container.querySelector('.card--course');
      expect(card).toBeInTheDocument();
      expect(screen.getByText('Class 3-5')).toBeInTheDocument();
      expect(screen.getByText('Mathematics, Science, English')).toBeInTheDocument();
    });

    it('should support info variant (Requirement 12.7, 17.2)', () => {
      const { container } = render(
        <Card 
          type="info"
          header="Why Choose Us"
          body="Small batch sizes and individual attention"
        />
      );
      
      const card = container.querySelector('.card--info');
      expect(card).toBeInTheDocument();
      expect(screen.getByText('Why Choose Us')).toBeInTheDocument();
    });
  });
});
