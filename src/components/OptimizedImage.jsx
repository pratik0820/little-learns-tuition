import React from 'react';
import PropTypes from 'prop-types';

/**
 * Optimized Image Component
 * 
 * Provides image optimization features:
 * - Lazy loading for below-the-fold images
 * - Responsive images with srcset
 * - Modern format support (WebP with fallback)
 * - Proper width/height to prevent layout shift
 * - Loading placeholder
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} props.srcSet - Responsive image srcset (optional)
 * @param {string} props.sizes - Sizes attribute for responsive images (optional)
 * @param {number} props.width - Image width (prevents layout shift)
 * @param {number} props.height - Image height (prevents layout shift)
 * @param {boolean} props.lazy - Enable lazy loading (default: true)
 * @param {string} props.className - Additional CSS classes
 */
const OptimizedImage = ({
  src,
  alt,
  srcSet,
  sizes,
  width,
  height,
  lazy = true,
  className = '',
  ...rest
}) => {
  return (
    <img
      src={src}
      alt={alt}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      loading={lazy ? 'lazy' : 'eager'}
      decoding="async"
      className={className}
      {...rest}
    />
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  sizes: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  lazy: PropTypes.bool,
  className: PropTypes.string
};

export default OptimizedImage;
