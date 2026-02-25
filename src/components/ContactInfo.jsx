import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Button from './Button';
import { generateWhatsAppURL } from '../utils/whatsapp';
import './ContactInfo.css';

/**
 * Contact Information Display Component
 * 
 * Displays contact information including phone number, WhatsApp button,
 * address, and operating hours in a clear, card-based layout.
 * 
 * @param {Object} props - Component props
 * @param {string} props.phoneNumber - Phone number for display and click-to-call
 * @param {string} props.whatsappNumber - WhatsApp number (defaults to phoneNumber if not provided)
 * @param {string} props.whatsappMessage - Custom WhatsApp message
 * @param {Object} props.address - Address object with street, city, state, pincode
 * @param {Object} props.operatingHours - Operating hours object with days and times
 * @param {string} props.className - Additional CSS classes
 */
const ContactInfo = ({
  phoneNumber = '+918669775438',
  whatsappNumber,
  whatsappMessage = "Hi! I'm contacting you via your website. I'd like to know more about Little Learner's.",
  address = {
    street: 'Dattanagar behind Siddhivinayak Mandir',
    city: 'At Little Pearls Nursery School, Pune',
    state: 'Maharashtra',
    pincode: '411046'
  },
  operatingHours = {
    weekdays: 'Monday - Saturday',
    timing: '6:00 PM - 8:00 PM',
    closed: 'Sunday'
  },
  className = ''
}) => {
  const whatsappUrl = generateWhatsAppURL(
    whatsappMessage,
    whatsappNumber || phoneNumber.replace(/[^0-9]/g, '')
  );

  const formatPhoneForCall = (phone) => {
    return `tel:${phone.replace(/[^0-9+]/g, '')}`;
  };

  return (
    <div className={`contact-info ${className}`}>
      {/* Phone Number Card */}
      <Card type="info" className="contact-info__card">
        <div className="contact-info__icon-wrapper">
          <svg
            className="contact-info__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </div>
        <h3 className="contact-info__title">Call Us</h3>
        <a
          href={formatPhoneForCall(phoneNumber)}
          className="contact-info__link contact-info__phone"
          aria-label={`Call ${phoneNumber}`}
        >
          {phoneNumber}
        </a>
        <p className="contact-info__description">
          Call us directly for immediate assistance
        </p>
      </Card>

      {/* WhatsApp Card */}
      <Card type="info" className="contact-info__card">
        <div className="contact-info__icon-wrapper contact-info__icon-wrapper--whatsapp">
          <svg
            className="contact-info__icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </div>
        <h3 className="contact-info__title">WhatsApp</h3>
        <Button
          variant="whatsapp"
          size="medium"
          href={whatsappUrl}
          ariaLabel="Contact us on WhatsApp"
          className="contact-info__whatsapp-btn"
        >
          Chat on WhatsApp
        </Button>
        <p className="contact-info__description">
          Get instant responses to your queries
        </p>
      </Card>

      {/* Address Card */}
      <Card type="info" className="contact-info__card">
        <div className="contact-info__icon-wrapper">
          <svg
            className="contact-info__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <h3 className="contact-info__title">Visit Us</h3>
        <address className="contact-info__address">
          <p className="contact-info__address-line">{address.street}</p>
          <p className="contact-info__address-line">
            {address.city}, {address.state}
          </p>
          <p className="contact-info__address-line">{address.pincode}</p>
        </address>
      </Card>

      {/* Operating Hours Card */}
      {operatingHours && (
        <Card type="info" className="contact-info__card">
          <div className="contact-info__icon-wrapper">
            <svg
              className="contact-info__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <h3 className="contact-info__title">Operating Hours</h3>
          <div className="contact-info__hours">
            <p className="contact-info__hours-line">
              <span className="contact-info__hours-label">{operatingHours.weekdays}:</span>
              <span className="contact-info__hours-value">{operatingHours.timing}</span>
            </p>
            {operatingHours.closed && (
              <p className="contact-info__hours-line contact-info__hours-line--closed">
                <span className="contact-info__hours-label">{operatingHours.closed}:</span>
                <span className="contact-info__hours-value">Closed</span>
              </p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

ContactInfo.propTypes = {
  phoneNumber: PropTypes.string,
  whatsappNumber: PropTypes.string,
  whatsappMessage: PropTypes.string,
  address: PropTypes.shape({
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    pincode: PropTypes.string
  }),
  operatingHours: PropTypes.shape({
    weekdays: PropTypes.string,
    timing: PropTypes.string,
    closed: PropTypes.string
  }),
  className: PropTypes.string
};

export default ContactInfo;
