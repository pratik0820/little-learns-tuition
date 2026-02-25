import React from 'react';
import WhatsAppButton from './WhatsAppButton';
import './WhatsAppButton.css';

/**
 * WhatsApp Button Demo Component
 * 
 * Demonstrates the WhatsApp floating button component with different configurations
 */
const WhatsAppButtonDemo = () => {
  return (
    <div style={{ 
      padding: '40px',
      minHeight: '100vh',
      backgroundColor: 'var(--color-background)'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ 
          fontFamily: 'var(--font-primary)',
          fontSize: 'var(--font-size-4xl)',
          color: 'var(--color-text)',
          marginBottom: 'var(--space-6)'
        }}>
          WhatsApp Floating Button Demo
        </h1>
        
        <div style={{ 
          backgroundColor: 'var(--color-surface)',
          padding: 'var(--space-8)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: 'var(--space-8)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <h2 style={{ 
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-size-2xl)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-4)'
          }}>
            Component Features
          </h2>
          
          <ul style={{ 
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-size-base)',
            color: 'var(--color-text)',
            lineHeight: 'var(--line-height-relaxed)',
            paddingLeft: 'var(--space-6)'
          }}>
            <li>Fixed position in bottom-right corner</li>
            <li>Circular button with WhatsApp icon</li>
            <li>Pulse animation to draw attention</li>
            <li>Hover effects with scale transformation</li>
            <li>Opens WhatsApp with pre-filled message</li>
            <li>Responsive sizing for mobile, tablet, and desktop</li>
            <li>Proper z-index (1000) - above content, below modals</li>
            <li>Accessibility features (aria-label, focus states)</li>
            <li>Respects prefers-reduced-motion</li>
          </ul>
        </div>

        <div style={{ 
          backgroundColor: 'var(--color-surface)',
          padding: 'var(--space-8)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: 'var(--space-8)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <h2 style={{ 
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-size-2xl)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-4)'
          }}>
            Usage Example
          </h2>
          
          <pre style={{ 
            backgroundColor: 'var(--color-background)',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-md)',
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: 'var(--font-size-sm)'
          }}>
{`import WhatsAppButton from './components/WhatsAppButton';

// Default usage
<WhatsAppButton />

// Custom phone number and message
<WhatsAppButton 
  phoneNumber="919876543210"
  message="I want to know about Class 3-5 batch"
  ariaLabel="Contact us on WhatsApp"
/>`}
          </pre>
        </div>

        <div style={{ 
          backgroundColor: 'var(--color-surface)',
          padding: 'var(--space-8)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <h2 style={{ 
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-size-2xl)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-4)'
          }}>
            Responsive Behavior
          </h2>
          
          <table style={{ 
            width: '100%',
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-size-base)',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th style={{ padding: 'var(--space-3)', textAlign: 'left' }}>Breakpoint</th>
                <th style={{ padding: 'var(--space-3)', textAlign: 'left' }}>Button Size</th>
                <th style={{ padding: 'var(--space-3)', textAlign: 'left' }}>Position</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: 'var(--space-3)' }}>Mobile (&lt; 768px)</td>
                <td style={{ padding: 'var(--space-3)' }}>56px × 56px</td>
                <td style={{ padding: 'var(--space-3)' }}>bottom: 16px, right: 16px</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: 'var(--space-3)' }}>Tablet (768px+)</td>
                <td style={{ padding: 'var(--space-3)' }}>64px × 64px</td>
                <td style={{ padding: 'var(--space-3)' }}>bottom: 20px, right: 20px</td>
              </tr>
              <tr>
                <td style={{ padding: 'var(--space-3)' }}>Desktop (1024px+)</td>
                <td style={{ padding: 'var(--space-3)' }}>68px × 68px</td>
                <td style={{ padding: 'var(--space-3)' }}>bottom: 24px, right: 24px</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ 
          marginTop: 'var(--space-12)',
          padding: 'var(--space-6)',
          backgroundColor: 'var(--color-info)',
          color: 'var(--color-surface)',
          borderRadius: 'var(--radius-md)',
          fontFamily: 'var(--font-primary)',
          fontSize: 'var(--font-size-base)'
        }}>
          <strong>Note:</strong> The WhatsApp button is visible in the bottom-right corner of this page. 
          Try hovering over it to see the animation effects. Click it to test the WhatsApp integration 
          (it will open WhatsApp with a pre-filled message).
        </div>

        {/* Add some content to demonstrate scrolling */}
        <div style={{ marginTop: 'var(--space-16)', marginBottom: 'var(--space-16)' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-size-2xl)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-4)'
          }}>
            Scroll Test
          </h2>
          <p style={{ 
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-size-base)',
            color: 'var(--color-text)',
            lineHeight: 'var(--line-height-relaxed)',
            marginBottom: 'var(--space-4)'
          }}>
            Scroll down to verify that the WhatsApp button remains fixed in position 
            and visible during page scrolling.
          </p>
          {[...Array(20)].map((_, i) => (
            <p key={i} style={{ 
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--font-size-base)',
              color: 'var(--color-text-light)',
              lineHeight: 'var(--line-height-relaxed)',
              marginBottom: 'var(--space-4)'
            }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris.
            </p>
          ))}
        </div>
      </div>

      {/* WhatsApp Button - Fixed position, visible on all pages */}
      <WhatsAppButton />
    </div>
  );
};

export default WhatsAppButtonDemo;
