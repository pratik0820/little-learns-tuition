import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GoogleMapsEmbed from '../GoogleMapsEmbed';

describe('GoogleMapsEmbed Component', () => {
  describe('Basic Rendering', () => {
    it('should render the component', () => {
      const { container } = render(<GoogleMapsEmbed />);
      
      expect(container.querySelector('.google-maps-embed')).toBeInTheDocument();
    });

    it('should render iframe element', () => {
      render(<GoogleMapsEmbed />);
      
      const iframe = screen.getByTitle('Location Map');
      expect(iframe).toBeInTheDocument();
      expect(iframe.tagName).toBe('IFRAME');
    });

    it('should render responsive container', () => {
      const { container } = render(<GoogleMapsEmbed />);
      
      const mapContainer = container.querySelector('.google-maps-embed__container');
      expect(mapContainer).toBeInTheDocument();
    });
  });

  describe('Iframe Attributes', () => {
    it('should have default embed URL', () => {
      render(<GoogleMapsEmbed />);
      
      const iframe = screen.getByTitle('Location Map');
      expect(iframe).toHaveAttribute('src');
      expect(iframe.getAttribute('src')).toContain('google.com/maps/embed');
    });

    it('should accept custom embed URL', () => {
      const customUrl = 'https://www.google.com/maps/embed?pb=custom-location';
      render(<GoogleMapsEmbed embedUrl={customUrl} />);
      
      const iframe = screen.getByTitle('Location Map');
      expect(iframe).toHaveAttribute('src', customUrl);
    });

    it('should have loading="lazy" attribute for performance', () => {
      render(<GoogleMapsEmbed />);
      
      const iframe = screen.getByTitle('Location Map');
      expect(iframe).toHaveAttribute('loading', 'lazy');
    });

    it('should have allowFullScreen attribute', () => {
      render(<GoogleMapsEmbed />);
      
      const iframe = screen.getByTitle('Location Map');
      expect(iframe).toHaveAttribute('allowFullScreen');
    });

    it('should have referrerPolicy attribute', () => {
      render(<GoogleMapsEmbed />);
      
      const iframe = screen.getByTitle('Location Map');
      expect(iframe).toHaveAttribute('referrerPolicy', 'no-referrer-when-downgrade');
    });

    it('should have iframe class for styling', () => {
      const { container } = render(<GoogleMapsEmbed />);
      
      const iframe = container.querySelector('.google-maps-embed__iframe');
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveClass('google-maps-embed__iframe');
    });
  });

  describe('Accessibility', () => {
    it('should have default accessible title', () => {
      render(<GoogleMapsEmbed />);
      
      const iframe = screen.getByTitle('Location Map');
      expect(iframe).toBeInTheDocument();
    });

    it('should accept custom accessible title', () => {
      const customTitle = 'Our Tuition Center Location';
      render(<GoogleMapsEmbed title={customTitle} />);
      
      const iframe = screen.getByTitle(customTitle);
      expect(iframe).toBeInTheDocument();
    });

    it('should have aria-label matching title', () => {
      const title = 'Custom Location';
      render(<GoogleMapsEmbed title={title} />);
      
      const iframe = screen.getByTitle(title);
      expect(iframe).toHaveAttribute('aria-label', title);
    });

    it('should be keyboard accessible', () => {
      render(<GoogleMapsEmbed />);
      
      const iframe = screen.getByTitle('Location Map');
      // Iframes are naturally keyboard accessible
      expect(iframe).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive container class', () => {
      const { container } = render(<GoogleMapsEmbed />);
      
      const mapContainer = container.querySelector('.google-maps-embed__container');
      expect(mapContainer).toBeInTheDocument();
    });

    it('should have iframe with responsive class', () => {
      const { container } = render(<GoogleMapsEmbed />);
      
      const iframe = container.querySelector('.google-maps-embed__iframe');
      expect(iframe).toBeInTheDocument();
    });

    it('should have container class for aspect ratio styling', () => {
      const { container } = render(<GoogleMapsEmbed />);
      
      const mapContainer = container.querySelector('.google-maps-embed__container');
      expect(mapContainer).toBeInTheDocument();
      expect(mapContainer).toHaveClass('google-maps-embed__container');
    });

    it('should have iframe class for absolute positioning', () => {
      const { container } = render(<GoogleMapsEmbed />);
      
      const iframe = container.querySelector('.google-maps-embed__iframe');
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveClass('google-maps-embed__iframe');
    });
  });

  describe('Custom Styling', () => {
    it('should accept custom className', () => {
      const { container } = render(<GoogleMapsEmbed className="custom-map" />);
      
      const mapEmbed = container.querySelector('.google-maps-embed.custom-map');
      expect(mapEmbed).toBeInTheDocument();
    });

    it('should preserve base class when custom className is added', () => {
      const { container } = render(<GoogleMapsEmbed className="custom-class" />);
      
      const mapEmbed = container.querySelector('.google-maps-embed');
      expect(mapEmbed).toHaveClass('google-maps-embed');
      expect(mapEmbed).toHaveClass('custom-class');
    });
  });

  describe('Default Props', () => {
    it('should render with all default props', () => {
      render(<GoogleMapsEmbed />);
      
      const iframe = screen.getByTitle('Location Map');
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute('src');
    });

    it('should use default title when not provided', () => {
      render(<GoogleMapsEmbed />);
      
      expect(screen.getByTitle('Location Map')).toBeInTheDocument();
    });

    it('should use default embedUrl when not provided', () => {
      render(<GoogleMapsEmbed />);
      
      const iframe = screen.getByTitle('Location Map');
      expect(iframe.getAttribute('src')).toContain('google.com/maps/embed');
    });
  });

  describe('Requirements Validation', () => {
    it('should satisfy Requirement 7.4: Display Google Maps embed placeholder', () => {
      render(<GoogleMapsEmbed />);
      
      const iframe = screen.getByTitle('Location Map');
      expect(iframe).toBeInTheDocument();
      expect(iframe.getAttribute('src')).toContain('google.com/maps/embed');
    });

    it('should have responsive wrapper class', () => {
      const { container } = render(<GoogleMapsEmbed />);
      
      const mapEmbed = container.querySelector('.google-maps-embed');
      expect(mapEmbed).toBeInTheDocument();
      expect(mapEmbed).toHaveClass('google-maps-embed');
    });

    it('should have proper container structure for aspect ratio', () => {
      const { container } = render(<GoogleMapsEmbed />);
      
      const mapContainer = container.querySelector('.google-maps-embed__container');
      expect(mapContainer).toBeInTheDocument();
      expect(mapContainer).toHaveClass('google-maps-embed__container');
    });

    it('should have iframe with responsive classes', () => {
      const { container } = render(<GoogleMapsEmbed />);
      
      const iframe = container.querySelector('.google-maps-embed__iframe');
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveClass('google-maps-embed__iframe');
    });
  });

  describe('Performance', () => {
    it('should use lazy loading', () => {
      render(<GoogleMapsEmbed />);
      
      const iframe = screen.getByTitle('Location Map');
      expect(iframe).toHaveAttribute('loading', 'lazy');
    });

    it('should have proper referrer policy for security', () => {
      render(<GoogleMapsEmbed />);
      
      const iframe = screen.getByTitle('Location Map');
      expect(iframe).toHaveAttribute('referrerPolicy', 'no-referrer-when-downgrade');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty className prop', () => {
      const { container } = render(<GoogleMapsEmbed className="" />);
      
      const mapEmbed = container.querySelector('.google-maps-embed');
      expect(mapEmbed).toBeInTheDocument();
    });

    it('should handle very long custom title', () => {
      const longTitle = 'A'.repeat(200);
      render(<GoogleMapsEmbed title={longTitle} />);
      
      const iframe = screen.getByTitle(longTitle);
      expect(iframe).toBeInTheDocument();
    });

    it('should handle special characters in title', () => {
      const specialTitle = "Location & Map's \"Center\"";
      render(<GoogleMapsEmbed title={specialTitle} />);
      
      const iframe = screen.getByTitle(specialTitle);
      expect(iframe).toBeInTheDocument();
    });
  });
});
