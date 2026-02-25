import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';
import './Footer.css';

/**
 * Footer Demo Component
 * 
 * Demonstrates the Footer component in isolation with:
 * - Full footer structure
 * - Quick links navigation
 * - Contact information
 * - Social media links
 * - Responsive layout preview
 */
function FooterDemo() {
  return (
    <BrowserRouter>
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: 'var(--color-background)'
      }}>
        {/* Main content area to push footer down */}
        <div style={{ 
          flex: 1, 
          padding: 'var(--space-8)',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}>
          <h1 style={{ 
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-size-4xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-6)'
          }}>
            Footer Component Demo
          </h1>
          
          <div style={{
            backgroundColor: 'var(--color-surface)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            marginBottom: 'var(--space-8)'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text)',
              marginBottom: 'var(--space-4)'
            }}>
              Features
            </h2>
            
            <ul style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--font-size-base)',
              color: 'var(--color-text)',
              lineHeight: 'var(--line-height-relaxed)',
              paddingLeft: 'var(--space-6)'
            }}>
              <li><strong>Quick Links:</strong> Navigation to all main pages (Home, About Teacher, Classes, Testimonials, Contact)</li>
              <li><strong>Contact Information:</strong> Phone number with click-to-call and address display</li>
              <li><strong>Social Media Links:</strong> Facebook and Instagram links with icons</li>
              <li><strong>Responsive Layout:</strong> Multi-column on desktop, stacked on mobile</li>
              <li><strong>Design System:</strong> Uses consistent colors, typography, and spacing</li>
              <li><strong>Accessibility:</strong> Semantic HTML, ARIA labels, keyboard navigation</li>
            </ul>
          </div>

          <div style={{
            backgroundColor: 'var(--color-surface)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            marginBottom: 'var(--space-8)'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text)',
              marginBottom: 'var(--space-4)'
            }}>
              Requirements Validated
            </h2>
            
            <ul style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--font-size-base)',
              color: 'var(--color-text)',
              lineHeight: 'var(--line-height-relaxed)',
              paddingLeft: 'var(--space-6)'
            }}>
              <li><strong>11.1:</strong> Footer displayed on all pages ✓</li>
              <li><strong>11.2:</strong> Quick links to all main pages ✓</li>
              <li><strong>11.3:</strong> Contact information including phone and address ✓</li>
              <li><strong>11.4:</strong> Social media links (optional) ✓</li>
              <li><strong>11.5:</strong> Multi-column desktop layout, stacked mobile layout, design system colors ✓</li>
            </ul>
          </div>

          <div style={{
            backgroundColor: 'var(--color-info)',
            color: 'var(--color-surface)',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-8)'
          }}>
            <p style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--font-size-base)',
              margin: 0,
              lineHeight: 'var(--line-height-normal)'
            }}>
              <strong>Note:</strong> Scroll down to see the Footer component at the bottom of the page. 
              Resize your browser window to see the responsive layout changes.
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--color-surface)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text)',
              marginBottom: 'var(--space-4)'
            }}>
              Responsive Breakpoints
            </h2>
            
            <ul style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--font-size-base)',
              color: 'var(--color-text)',
              lineHeight: 'var(--line-height-relaxed)',
              paddingLeft: 'var(--space-6)'
            }}>
              <li><strong>Mobile (&lt; 768px):</strong> Stacked single-column layout</li>
              <li><strong>Tablet (768px - 1023px):</strong> 3-column grid layout</li>
              <li><strong>Desktop (≥ 1024px):</strong> 3-column grid with increased spacing</li>
            </ul>
          </div>
        </div>

        {/* Footer Component */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default FooterDemo;
