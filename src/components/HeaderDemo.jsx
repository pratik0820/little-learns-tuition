import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

/**
 * Header Component Demo
 * 
 * This demo shows the Header component in action.
 * Note: The Header component requires React Router to be set up.
 */
function HeaderDemo() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh' }}>
        <Header />
        
        {/* Content area with padding to account for fixed header */}
        <main style={{ paddingTop: '80px' }}>
          <div className="container section">
            <h1>Header Component Demo</h1>
            <p>
              The header is fixed at the top of the viewport and will remain visible as you scroll.
            </p>
            
            <h2>Features Demonstrated:</h2>
            <ul>
              <li>✓ Sticky header structure (fixed position)</li>
              <li>✓ Logo/brand area on the left</li>
              <li>✓ Desktop navigation menu with links</li>
              <li>✓ Active page highlighting (Home is currently active)</li>
              <li>✓ Proper z-index layering (header above content)</li>
              <li>✓ Responsive height (64px mobile, 72px tablet/desktop)</li>
            </ul>
            
            <h2>Navigation Links:</h2>
            <p>
              The header includes links to all main pages:
            </p>
            <ul>
              <li>Home</li>
              <li>About Teacher</li>
              <li>Classes</li>
              <li>Testimonials</li>
              <li>Contact</li>
            </ul>
            
            <h2>Active Page Highlighting:</h2>
            <p>
              The current page is highlighted with:
            </p>
            <ul>
              <li>Primary color text</li>
              <li>Light background color</li>
              <li>Underline indicator</li>
              <li>Semibold font weight</li>
            </ul>
            
            <h2>Accessibility Features:</h2>
            <ul>
              <li>Semantic HTML with proper ARIA labels</li>
              <li>Keyboard navigation support</li>
              <li>Visible focus indicators</li>
              <li>aria-current="page" on active link</li>
            </ul>
            
            <h2>Responsive Behavior:</h2>
            <p>
              On mobile devices (below 768px), the navigation menu is hidden.
              Task 4.2 will implement the mobile hamburger menu.
            </p>
            
            {/* Add some content to demonstrate scrolling */}
            <div style={{ marginTop: '3rem' }}>
              <h2>Scroll Test</h2>
              <p>Scroll down to see the header remain fixed at the top.</p>
              {[...Array(20)].map((_, i) => (
                <p key={i}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              ))}
            </div>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default HeaderDemo;
