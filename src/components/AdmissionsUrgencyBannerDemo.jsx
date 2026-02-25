import React from 'react';
import AdmissionsUrgencyBanner from './AdmissionsUrgencyBanner';

/**
 * Demo page for AdmissionsUrgencyBanner component
 * Shows the banner with default and custom messages
 */
const AdmissionsUrgencyBannerDemo = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>AdmissionsUrgencyBanner Component Demo</h1>
      
      <section style={{ marginBottom: '40px' }}>
        <h2>Default Message</h2>
        <AdmissionsUrgencyBanner />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Custom Message</h2>
        <AdmissionsUrgencyBanner message="Hurry! Only 5 Seats Left for Summer Batch – Enroll Today!" />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>In Context (with content below)</h2>
        <AdmissionsUrgencyBanner />
        <div style={{ padding: '40px', background: '#f9fafb' }}>
          <h3>Sample Content Below Banner</h3>
          <p>This demonstrates how the banner looks when positioned above page content.</p>
        </div>
      </section>
    </div>
  );
};

export default AdmissionsUrgencyBannerDemo;
