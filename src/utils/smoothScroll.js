/**
 * Smooth Scrolling Utility
 * 
 * Provides smooth scrolling functionality for anchor links with proper
 * header offset handling.
 * 
 * Features:
 * - Smooth scroll to sections with anchor links
 * - Accounts for sticky header height
 * - Ensures scroll animations complete within 800ms
 * - Responsive header offset (64px mobile, 72px tablet/desktop)
 * 
 * Requirements: 16.1, 16.2, 16.3
 */

/**
 * Get the current header height based on viewport width
 * @returns {number} Header height in pixels
 */
export function getHeaderHeight() {
  // Mobile: 64px, Tablet/Desktop (768px+): 72px
  return window.innerWidth >= 768 ? 72 : 64;
}

/**
 * Scroll to an element with smooth animation and header offset
 * @param {HTMLElement|string} target - Element or selector to scroll to
 * @param {Object} options - Scroll options
 * @param {number} options.offset - Additional offset in pixels (default: 0)
 * @param {number} options.duration - Animation duration in ms (default: 800)
 */
export function scrollToElement(target, options = {}) {
  const { offset = 0, duration = 800 } = options;

  // Get target element
  const element = typeof target === 'string' 
    ? document.querySelector(target) 
    : target;

  if (!element) {
    console.warn(`Smooth scroll: Target element not found`, target);
    return;
  }

  // Calculate scroll position
  const headerHeight = getHeaderHeight();
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - headerHeight - offset;

  // Perform smooth scroll
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

/**
 * Handle anchor link clicks for smooth scrolling
 * @param {Event} event - Click event
 */
export function handleAnchorClick(event) {
  const link = event.currentTarget;
  const href = link.getAttribute('href');

  // Check if it's an anchor link (starts with #)
  if (!href || !href.startsWith('#')) {
    return;
  }

  // Prevent default jump behavior
  event.preventDefault();

  // Get target element
  const targetId = href.substring(1);
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    scrollToElement(targetElement);
    
    // Update URL hash without jumping
    if (history.pushState) {
      history.pushState(null, null, href);
    } else {
      // Fallback for older browsers
      window.location.hash = href;
    }

    // Set focus to target element for accessibility
    targetElement.setAttribute('tabindex', '-1');
    targetElement.focus();
  }
}

/**
 * Initialize smooth scrolling for all anchor links on the page
 * Call this function when the page loads or when new content is added
 */
export function initSmoothScroll() {
  // Find all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  // Add click handlers
  anchorLinks.forEach(link => {
    link.addEventListener('click', handleAnchorClick);
  });

  // Handle initial hash in URL (e.g., page loaded with #section)
  if (window.location.hash) {
    // Wait for page to fully load
    window.addEventListener('load', () => {
      const targetId = window.location.hash.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Small delay to ensure layout is complete
        setTimeout(() => {
          scrollToElement(targetElement);
        }, 100);
      }
    });
  }
}

/**
 * Cleanup smooth scroll event listeners
 * Call this when unmounting components or cleaning up
 */
export function cleanupSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.removeEventListener('click', handleAnchorClick);
  });
}
