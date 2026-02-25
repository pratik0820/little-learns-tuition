import PropTypes from 'prop-types';
import './GoogleMapsEmbed.css';

/**
 * Google Maps Embed Component
 * 
 * Displays a responsive Google Maps embed with a placeholder location.
 * Maintains proper aspect ratio and sizing across all devices.
 * 
 * @param {Object} props - Component props
 * @param {string} props.embedUrl - Google Maps embed URL
 * @param {string} props.title - Accessible title for the iframe
 * @param {string} props.className - Additional CSS classes
 */
const GoogleMapsEmbed = ({
  embedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977736716633!2d-122.41941548468186!3d37.77492977975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus',
  title = 'Location Map',
  className = ''
}) => {
  return (
    <div className={`google-maps-embed ${className}`}>
      <div className="google-maps-embed__container">
        <iframe
          src={embedUrl}
          className="google-maps-embed__iframe"
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          aria-label={title}
        />
      </div>
    </div>
  );
};

GoogleMapsEmbed.propTypes = {
  embedUrl: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string
};

export default GoogleMapsEmbed;
