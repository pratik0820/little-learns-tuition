import GoogleMapsEmbed from './GoogleMapsEmbed';
import Section from './Section';

/**
 * Demo page for GoogleMapsEmbed component
 * Shows the component with default placeholder location
 */
const GoogleMapsEmbedDemo = () => {
  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--color-background, #F9FAFB)' }}>
      <Section
        title="Google Maps Embed Component"
        subtitle="Responsive map embed with proper aspect ratio"
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ marginBottom: '1rem' }}>Default Map (Placeholder Location)</h3>
          <GoogleMapsEmbed />

          <h3 style={{ marginTop: '3rem', marginBottom: '1rem' }}>Custom Title</h3>
          <GoogleMapsEmbed title="Our Tuition Center Location" />

          <h3 style={{ marginTop: '3rem', marginBottom: '1rem' }}>With Custom Class</h3>
          <GoogleMapsEmbed className="custom-map" />
        </div>
      </Section>

      <Section style={{ marginTop: '2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3>Component Features</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li>Responsive iframe container with proper aspect ratio</li>
            <li>16:9 aspect ratio on desktop and tablet</li>
            <li>4:3 aspect ratio on mobile for better visibility</li>
            <li>Lazy loading for performance optimization</li>
            <li>Rounded corners matching design system</li>
            <li>Shadow for visual depth</li>
            <li>Accessible with proper title and aria-label</li>
            <li>Print-friendly with placeholder text</li>
          </ul>
        </div>
      </Section>
    </div>
  );
};

export default GoogleMapsEmbedDemo;
