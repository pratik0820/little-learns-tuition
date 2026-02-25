import './TopBanner.css';

/**
 * TopBanner Component
 * 
 * A blue banner that appears at the very top of the page, above the header.
 * Provides a visual accent and can contain contact info or announcements.
 * 
 * Requirements: Visual enhancement for header area
 */
function TopBanner() {
  return (
    <div className="top-banner">
      <div className="top-banner__container">
        {/* Optional: Add contact info, social links, or announcements here */}
      </div>
    </div>
  );
}

export default TopBanner;
