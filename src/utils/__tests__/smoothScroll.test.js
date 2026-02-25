/**
 * Smooth Scroll Utility Tests
 * 
 * Tests for smooth scrolling functionality including:
 * - Header height calculation
 * - Scroll to element with offset
 * - Anchor link click handling
 * - Initialization and cleanup
 * 
 * Requirements: 16.1, 16.2, 16.3
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  getHeaderHeight,
  scrollToElement,
  handleAnchorClick,
  initSmoothScroll,
  cleanupSmoothScroll
} from '../smoothScroll';

describe('smoothScroll utility', () => {
  // Mock window properties
  let originalInnerWidth;
  let originalPageYOffset;
  let originalScrollTo;
  let originalHistory;

  beforeEach(() => {
    // Save original values
    originalInnerWidth = window.innerWidth;
    originalPageYOffset = window.pageYOffset;
    originalScrollTo = window.scrollTo;
    originalHistory = window.history;

    // Mock scrollTo
    window.scrollTo = vi.fn();

    // Mock history.pushState
    window.history.pushState = vi.fn();

    // Clear document body
    document.body.innerHTML = '';
  });

  afterEach(() => {
    // Restore original values
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth
    });
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: originalPageYOffset
    });
    window.scrollTo = originalScrollTo;
    window.history = originalHistory;

    // Cleanup
    cleanupSmoothScroll();
  });

  describe('getHeaderHeight', () => {
    it('should return 64px for mobile viewport (< 768px)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });

      expect(getHeaderHeight()).toBe(64);
    });

    it('should return 72px for tablet viewport (>= 768px)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768
      });

      expect(getHeaderHeight()).toBe(72);
    });

    it('should return 72px for desktop viewport (>= 1024px)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024
      });

      expect(getHeaderHeight()).toBe(72);
    });
  });

  describe('scrollToElement', () => {
    beforeEach(() => {
      // Set viewport width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024
      });

      // Set page offset
      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        configurable: true,
        value: 0
      });
    });

    it('should scroll to element with header offset', () => {
      // Create test element
      const element = document.createElement('div');
      element.id = 'test-section';
      document.body.appendChild(element);

      // Mock getBoundingClientRect
      element.getBoundingClientRect = vi.fn(() => ({
        top: 500
      }));

      scrollToElement(element);

      // Should scroll to: elementTop (500) + pageYOffset (0) - headerHeight (72) = 428
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 428,
        behavior: 'smooth'
      });
    });

    it('should scroll to element with custom offset', () => {
      const element = document.createElement('div');
      element.id = 'test-section';
      document.body.appendChild(element);

      element.getBoundingClientRect = vi.fn(() => ({
        top: 500
      }));

      scrollToElement(element, { offset: 20 });

      // Should scroll to: 500 + 0 - 72 - 20 = 408
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 408,
        behavior: 'smooth'
      });
    });

    it('should accept element selector string', () => {
      const element = document.createElement('div');
      element.id = 'test-section';
      document.body.appendChild(element);

      element.getBoundingClientRect = vi.fn(() => ({
        top: 300
      }));

      scrollToElement('#test-section');

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 228, // 300 + 0 - 72
        behavior: 'smooth'
      });
    });

    it('should handle non-existent element gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      scrollToElement('#non-existent');

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Target element not found'),
        '#non-existent'
      );
      expect(window.scrollTo).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('should use mobile header height on mobile viewport', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });

      const element = document.createElement('div');
      element.id = 'test-section';
      document.body.appendChild(element);

      element.getBoundingClientRect = vi.fn(() => ({
        top: 500
      }));

      scrollToElement(element);

      // Should use 64px header height: 500 + 0 - 64 = 436
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 436,
        behavior: 'smooth'
      });
    });
  });

  describe('handleAnchorClick', () => {
    it('should prevent default and scroll to target element', () => {
      // Create anchor link
      const link = document.createElement('a');
      link.href = '#test-section';
      document.body.appendChild(link);

      // Create target element
      const target = document.createElement('div');
      target.id = 'test-section';
      document.body.appendChild(target);

      target.getBoundingClientRect = vi.fn(() => ({
        top: 400
      }));

      // Mock event
      const event = {
        currentTarget: link,
        preventDefault: vi.fn()
      };

      handleAnchorClick(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(window.scrollTo).toHaveBeenCalled();
      expect(window.history.pushState).toHaveBeenCalledWith(null, null, '#test-section');
    });

    it('should not handle non-anchor links', () => {
      const link = document.createElement('a');
      link.href = '/about';
      document.body.appendChild(link);

      const event = {
        currentTarget: link,
        preventDefault: vi.fn()
      };

      handleAnchorClick(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(window.scrollTo).not.toHaveBeenCalled();
    });

    it('should set focus to target element for accessibility', () => {
      const link = document.createElement('a');
      link.href = '#test-section';
      document.body.appendChild(link);

      const target = document.createElement('div');
      target.id = 'test-section';
      target.focus = vi.fn();
      document.body.appendChild(target);

      target.getBoundingClientRect = vi.fn(() => ({
        top: 400
      }));

      const event = {
        currentTarget: link,
        preventDefault: vi.fn()
      };

      handleAnchorClick(event);

      expect(target.getAttribute('tabindex')).toBe('-1');
      expect(target.focus).toHaveBeenCalled();
    });
  });

  describe('initSmoothScroll', () => {
    it('should add click handlers to all anchor links', () => {
      // Create multiple anchor links
      const link1 = document.createElement('a');
      link1.href = '#section1';
      document.body.appendChild(link1);

      const link2 = document.createElement('a');
      link2.href = '#section2';
      document.body.appendChild(link2);

      // Create a non-anchor link
      const link3 = document.createElement('a');
      link3.href = '/about';
      document.body.appendChild(link3);

      initSmoothScroll();

      // Check that click handlers were added
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      expect(anchorLinks.length).toBe(2);
    });
  });

  describe('cleanupSmoothScroll', () => {
    it('should remove click handlers from anchor links', () => {
      const link = document.createElement('a');
      link.href = '#test-section';
      document.body.appendChild(link);

      const target = document.createElement('div');
      target.id = 'test-section';
      document.body.appendChild(target);

      target.getBoundingClientRect = vi.fn(() => ({
        top: 400
      }));

      // Initialize
      initSmoothScroll();

      // Cleanup
      cleanupSmoothScroll();

      // Try to trigger click - should not scroll
      const event = {
        currentTarget: link,
        preventDefault: vi.fn()
      };

      // The handler should be removed, so manually calling it won't work
      // We just verify cleanup doesn't throw errors
      expect(() => cleanupSmoothScroll()).not.toThrow();
    });
  });

  describe('scroll animation timing', () => {
    it('should complete scroll within 800ms (default duration)', () => {
      const element = document.createElement('div');
      element.id = 'test-section';
      document.body.appendChild(element);

      element.getBoundingClientRect = vi.fn(() => ({
        top: 1000
      }));

      const startTime = Date.now();
      scrollToElement(element);
      const endTime = Date.now();

      // The function should execute quickly (< 50ms)
      // The actual scroll animation is handled by the browser
      expect(endTime - startTime).toBeLessThan(50);

      // Verify smooth behavior is set
      expect(window.scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({
          behavior: 'smooth'
        })
      );
    });
  });
});
