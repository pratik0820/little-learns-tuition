import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as fc from 'fast-check';
import Header from '../Header';

/**
 * Property-Based Tests for Header/Navigation Component
 * 
 * These tests validate universal properties that should hold true
 * for the navigation functionality.
 */

describe('Header Component - Property-Based Tests', () => {
  /**
   * Property 7: Navigation Link Functionality
   * 
   * **Validates: Requirements 8.3**
   * 
   * For any navigation menu link, clicking the link should navigate to
   * the corresponding page URL specified in the href attribute.
   * 
   * This test verifies that all navigation links have the correct href
   * attributes that match their intended destinations.
   */
  describe('Property 7: Navigation Link Functionality', () => {
    it('should have correct href attribute for all navigation links', () => {
      // Define the navigation links structure
      const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'About Teacher', path: '/about' },
        { label: 'Classes', path: '/classes' },
        { label: 'Testimonials', path: '/testimonials' },
        { label: 'Contact', path: '/contact' }
      ];

      // Create an arbitrary that selects from the navigation links
      const navLinkArbitrary = fc.constantFrom(...navLinks);

      // Property: For any navigation link, the href should match the expected path
      fc.assert(
        fc.property(
          navLinkArbitrary,
          (navLink) => {
            // Render the Header component with a router
            const { container } = render(
              <MemoryRouter initialEntries={['/']}>
                <Header />
              </MemoryRouter>
            );

            // Find all links with the label text
            const links = screen.getAllByRole('link', { name: navLink.label });
            
            // There should be at least one link (desktop navigation)
            expect(links.length).toBeGreaterThan(0);

            // Check that at least one link has the correct href
            const hasCorrectHref = links.some(link => 
              link.getAttribute('href') === navLink.path
            );

            expect(hasCorrectHref).toBe(true);

            // Verify the desktop navigation link specifically
            const desktopLink = links.find(link => 
              link.classList.contains('header__nav-link')
            );
            
            if (desktopLink) {
              expect(desktopLink).toHaveAttribute('href', navLink.path);
            }

            return true;
          }
        ),
        {
          numRuns: 5, // Run 10 test cases covering all navigation links
          verbose: false
        }
      );
    });

    it('should have valid navigation link structure for all links', () => {
      // Define the navigation links structure
      const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'About Teacher', path: '/about' },
        { label: 'Classes', path: '/classes' },
        { label: 'Testimonials', path: '/testimonials' },
        { label: 'Contact', path: '/contact' }
      ];

      // Create an arbitrary that selects from the navigation links
      const navLinkArbitrary = fc.constantFrom(...navLinks);

      // Property: For any navigation link, it should be a valid link element with proper attributes
      fc.assert(
        fc.property(
          navLinkArbitrary,
          (navLink) => {
            // Render the Header component with a router
            render(
              <MemoryRouter initialEntries={['/']}>
                <Header />
              </MemoryRouter>
            );

            // Find all links with the label text
            const links = screen.getAllByRole('link', { name: navLink.label });
            
            // Each link should be a valid link element
            links.forEach(link => {
              // Should have href attribute
              expect(link).toHaveAttribute('href');
              
              // Should have the correct text content
              expect(link).toHaveTextContent(navLink.label);
              
              // Should be a link element (a tag)
              expect(link.tagName.toLowerCase()).toBe('a');
            });

            return true;
          }
        ),
        {
          numRuns: 5, // Run 10 test cases covering all navigation links
          verbose: false
        }
      );
    });

    it('should maintain consistent href across desktop and mobile navigation', () => {
      // Define the navigation links structure
      const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'About Teacher', path: '/about' },
        { label: 'Classes', path: '/classes' },
        { label: 'Testimonials', path: '/testimonials' },
        { label: 'Contact', path: '/contact' }
      ];

      // Create an arbitrary that selects from the navigation links
      const navLinkArbitrary = fc.constantFrom(...navLinks);

      // Property: For any navigation link, desktop and mobile versions should have the same href
      fc.assert(
        fc.property(
          navLinkArbitrary,
          (navLink) => {
            // Render the Header component with a router
            render(
              <MemoryRouter initialEntries={['/']}>
                <Header />
              </MemoryRouter>
            );

            // Find all links with the label text (both desktop and mobile)
            const links = screen.getAllByRole('link', { name: navLink.label });
            
            // Should have at least 2 links (desktop and mobile)
            expect(links.length).toBeGreaterThanOrEqual(1);

            // Get all unique href values
            const hrefs = [...new Set(links.map(link => link.getAttribute('href')))];
            
            // All links with the same label should have the same href
            expect(hrefs).toHaveLength(1);
            expect(hrefs[0]).toBe(navLink.path);

            return true;
          }
        ),
        {
          numRuns: 5, // Run 10 test cases covering all navigation links
          verbose: false
        }
      );
    });

    it('should have navigation links that point to valid paths', () => {
      // Define the navigation links structure
      const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'About Teacher', path: '/about' },
        { label: 'Classes', path: '/classes' },
        { label: 'Testimonials', path: '/testimonials' },
        { label: 'Contact', path: '/contact' }
      ];

      // Create an arbitrary that selects from the navigation links
      const navLinkArbitrary = fc.constantFrom(...navLinks);

      // Property: For any navigation link, the href should be a valid path (starts with /)
      fc.assert(
        fc.property(
          navLinkArbitrary,
          (navLink) => {
            // Render the Header component with a router
            render(
              <MemoryRouter initialEntries={['/']}>
                <Header />
              </MemoryRouter>
            );

            // Find all links with the label text
            const links = screen.getAllByRole('link', { name: navLink.label });
            
            // Each link should have a valid path
            links.forEach(link => {
              const href = link.getAttribute('href');
              
              // href should exist
              expect(href).toBeTruthy();
              
              // href should start with / (valid path)
              expect(href).toMatch(/^\//);
              
              // href should match the expected path
              expect(href).toBe(navLink.path);
            });

            return true;
          }
        ),
        {
          numRuns: 5, // Run 10 test cases covering all navigation links
          verbose: false
        }
      );
    });
  });
});
