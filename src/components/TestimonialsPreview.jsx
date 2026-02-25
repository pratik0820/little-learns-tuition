import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Button from './Button';
import './TestimonialsPreview.css';

/**
 * TestimonialsPreview Component
 * 
 * Displays a preview of 2-3 testimonials on the home page with a CTA
 * to view all testimonials. Uses the Card component for testimonial display.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.testimonials - Array of testimonial objects
 * @param {number} props.maxDisplay - Maximum number of testimonials to display (default: 3)
 */
const TestimonialsPreview = ({ testimonials = [], maxDisplay = 3 }) => {
  // Use default testimonials if none provided
  const defaultTestimonials = [
    {
      id: 1,
      feedback: "My daughter's confidence in mathematics has improved tremendously. The small batch size ensures she gets individual attention.",
      parentName: "Mrs. Sharma",
      studentInfo: "Parent of Class 4 student"
    },
    {
      id: 2,
      feedback: "The homework support has been invaluable. My son now completes his assignments on time and understands the concepts better.",
      parentName: "Mr. Patel",
      studentInfo: "Parent of Class 3 student"
    },
    {
      id: 3,
      feedback: "Excellent teaching methods! My child looks forward to attending classes. The teacher is patient and explains concepts clearly.",
      parentName: "Mrs. Reddy",
      studentInfo: "Parent of Class 5 student"
    }
  ];

  const displayTestimonials = testimonials.length > 0 
    ? testimonials.slice(0, maxDisplay) 
    : defaultTestimonials.slice(0, maxDisplay);

  return (
    <div className="testimonials-preview">
      <div className="testimonials-preview__grid">
        {displayTestimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            type="testimonial"
            body={
              <p className="testimonials-preview__feedback">
                "{testimonial.feedback}"
              </p>
            }
            footer={
              <div className="testimonials-preview__author">
                <p className="testimonials-preview__name">{testimonial.parentName}</p>
                <p className="testimonials-preview__info">{testimonial.studentInfo}</p>
              </div>
            }
          />
        ))}
      </div>
      
      <div className="testimonials-preview__cta">
        <Button
          variant="outline"
          size="large"
          href="/testimonials"
        >
          View All Testimonials
        </Button>
      </div>
    </div>
  );
};

TestimonialsPreview.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      feedback: PropTypes.string.isRequired,
      parentName: PropTypes.string.isRequired,
      studentInfo: PropTypes.string.isRequired
    })
  ),
  maxDisplay: PropTypes.number
};

export default TestimonialsPreview;
