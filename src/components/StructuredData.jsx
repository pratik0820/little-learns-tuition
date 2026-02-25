import { useEffect } from 'react';

/**
 * StructuredData Component
 * 
 * Adds JSON-LD structured data to the page for better SEO.
 * Supports LocalBusiness and EducationalOrganization schema types.
 * 
 * Props:
 * - type: Schema type ('organization' or 'breadcrumb')
 * - data: Schema data object
 * 
 * Requirements: 13.2
 */
const StructuredData = ({ type = 'organization', data = null }) => {
  useEffect(() => {
    // Default organization schema
    const defaultOrgSchema = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Little Learner's - Tuition Classes for Primary Students",
      "description": "Little Learner's offers quality tuition classes for primary school students (Class 1-5) with small batch sizes, individual attention, and concept-based learning",
      "url": window.location.origin,
      "telephone": "+91XXXXXXXXXX",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Dattanagar behind Siddhivinayak Mandir, At Little Pearls Nursery School",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411046",
        "addressCountry": "IN"
      },
      "priceRange": "$$",
      "openingHours": "Mo-Sa 18:00-20:00",
      "areaServed": {
        "@type": "City",
        "name": "City Name"
      },
      "educationalCredentialAwarded": "Primary Education Support",
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": "student",
        "audienceType": "Primary School Students (Class 1-5)"
      }
    };

    let schema;
    
    if (type === 'organization') {
      schema = data || defaultOrgSchema;
    } else if (type === 'breadcrumb' && data) {
      schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": data
      };
    }

    if (schema) {
      // Create or update script tag
      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      
      scriptTag.textContent = JSON.stringify(schema);
    }

    // Cleanup function
    return () => {
      // Keep the script tag for SEO purposes
      // It will be updated on next render if needed
    };
  }, [type, data]);

  return null; // This component doesn't render anything
};

export default StructuredData;
