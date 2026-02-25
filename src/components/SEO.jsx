import { useEffect } from 'react';

/**
 * SEO Component
 * 
 * Manages page-specific meta tags for SEO optimization.
 * Updates document title and meta tags dynamically based on props.
 * 
 * Props:
 * - title: Page title (will be appended with site name)
 * - description: Meta description for the page
 * - keywords: Comma-separated keywords for the page
 * - ogImage: Open Graph image URL (optional)
 * - canonical: Canonical URL (optional, defaults to current URL)
 * 
 * Requirements: 13.2
 */
const SEO = ({ 
  title, 
  description, 
  keywords = '',
  ogImage = '/og-image.jpg',
  canonical = null
}) => {
  useEffect(() => {
    // Update document title
    const fullTitle = `${title} | Little Learner's - Classes for 1st to 5th Standard`;
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:url', canonical || window.location.href, true);
    updateMetaTag('og:image', ogImage, true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical || window.location.href);

  }, [title, description, keywords, ogImage, canonical]);

  return null; // This component doesn't render anything
};

export default SEO;
