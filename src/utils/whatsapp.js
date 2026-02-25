/**
 * WhatsApp Integration Utilities
 * 
 * Helper functions for generating WhatsApp URLs with pre-filled messages
 */

/**
 * WhatsApp configuration
 */
export const WHATSAPP_CONFIG = {
  phoneNumber: '8669775438', // Replace with actual phone number (without + or spaces)
  // defaultMessage: "Hi! I'm interested in enrolling my child in your tuition classes. I'd like to know more about batch timings and fees."
  defaultMessage: "Hi Shivani madam, I'm interested in enrolling in tuition class."
};

/**
 * Generate WhatsApp URL with encoded message
 * 
 * @param {string} customMessage - Optional custom message (uses default if not provided)
 * @param {string} phoneNumber - Optional phone number (uses config default if not provided)
 * @returns {string} Complete WhatsApp URL with encoded message
 * 
 * @example
 * // Use default message
 * const url = generateWhatsAppURL();
 * 
 * @example
 * // Use custom message
 * const url = generateWhatsAppURL("I want to know about Class 3-5 batch");
 * 
 * @example
 * // Use custom message and phone number
 * const url = generateWhatsAppURL("Custom message", "919876543210");
 */
export const generateWhatsAppURL = (customMessage = null, phoneNumber = null) => {
  const message = customMessage || WHATSAPP_CONFIG.defaultMessage;
  const phone = phoneNumber || WHATSAPP_CONFIG.phoneNumber;
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${phone}?text=${encodedMessage}`;
};

/**
 * Generate context-aware WhatsApp messages for different pages
 */
export const WHATSAPP_MESSAGES = {
  home: "Hi! I'm interested in enrolling my child in your tuition classes. I'd like to know more about batch timings and fees.",
  classes: {
    class12: "Hi! I'm interested in the Class 1-2 batch. Could you please share the timings and fees?",
    class35: "Hi! I'm interested in the Class 3-5 batch. Could you please share the timings and fees?"
  },
  contact: "Hi! I'm contacting you via your website. I'd like to know more about your tuition classes.",
  about: "Hi! I read about your teaching approach and I'm interested in enrolling my child. Could you share more details?"
};

/**
 * Get WhatsApp URL for specific page context
 * 
 * @param {string} context - Page context ('home', 'classes', 'contact', 'about')
 * @param {string} subContext - Optional sub-context (e.g., 'class12' or 'class35' for classes page)
 * @returns {string} WhatsApp URL with context-appropriate message
 * 
 * @example
 * // Home page
 * const url = getContextualWhatsAppURL('home');
 * 
 * @example
 * // Classes page for Class 1-2
 * const url = getContextualWhatsAppURL('classes', 'class12');
 */
export const getContextualWhatsAppURL = (context = 'home', subContext = null) => {
  let message = WHATSAPP_MESSAGES.home;
  
  if (context === 'classes' && subContext && WHATSAPP_MESSAGES.classes[subContext]) {
    message = WHATSAPP_MESSAGES.classes[subContext];
  } else if (context === 'classes') {
    // If classes context without valid subcontext, use home message
    message = WHATSAPP_MESSAGES.home;
  } else if (WHATSAPP_MESSAGES[context] && typeof WHATSAPP_MESSAGES[context] === 'string') {
    message = WHATSAPP_MESSAGES[context];
  }
  
  return generateWhatsAppURL(message);
};
