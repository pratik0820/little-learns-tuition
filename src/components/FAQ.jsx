import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './FAQ.css';

/**
 * FAQItem Component
 * 
 * Individual FAQ item with expand/collapse functionality.
 * 
 * @param {Object} props - Component props
 * @param {string} props.question - The FAQ question
 * @param {string} props.answer - The FAQ answer
 * @param {boolean} props.isExpanded - Whether the item is expanded
 * @param {Function} props.onToggle - Toggle handler
 */
const FAQItem = ({ question, answer, isExpanded, onToggle }) => {
  /**
   * Handle keyboard events for accessibility
   * Supports Enter and Space keys to toggle the FAQ item
   */
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent space from scrolling the page
      onToggle();
    }
  };

  return (
    <div className={`faq-item ${isExpanded ? 'faq-item--expanded' : ''}`}>
      <button
        className="faq-item__question"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        type="button"
      >
        <span className="faq-item__question-text">{question}</span>
        <span className="faq-item__icon" aria-hidden="true">
          {isExpanded ? '−' : '+'}
        </span>
      </button>

      <div
        className="faq-item__answer-wrapper"
        aria-hidden={!isExpanded}
      >
        <div className="faq-item__answer">
          {answer}
        </div>
      </div>
    </div>
  );
}

FAQItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

/**
 * FAQ Component
 * 
 * Displays a list of frequently asked questions with accordion-style
 * expand/collapse functionality. Includes common questions about batch size,
 * fees, homework support, and demo classes.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.faqs - Array of FAQ objects with question and answer
 */
const FAQ = ({ faqs = [] }) => {
  // State to track which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState(new Set());

  // Default FAQs if none provided
  const defaultFAQs = [
    {
      id: 1,
      question: "What is the batch size?",
      answer: "We maintain small batch sizes of 6-10 students depending on the class level. Class 1-2 batches have 6-8 students, while Class 3-5 batches have 8-10 students. This ensures each child receives individual attention and personalized guidance."
    },
    {
      id: 2,
      question: "What are the fees?",
      answer: "Our fees are competitive and vary based on the class level and subjects. Please contact us via WhatsApp or phone for detailed fee structure and any ongoing offers. We also offer sibling discounts and flexible payment options."
    },
    {
      id: 3,
      question: "Do you provide homework support?",
      answer: "Yes, homework support is an important part of our program. We help students complete their school homework, clear their doubts, and ensure they understand the concepts well. This is included in the regular class time."
    },
    {
      id: 4,
      question: "Can we attend a demo class?",
      answer: "Absolutely! We encourage parents and students to attend a free demo class before enrolling. This helps you experience our teaching methodology and see if it's the right fit for your child. Contact us to schedule a demo class at your convenience."
    }
  ];

  const displayFAQs = faqs.length > 0 ? faqs : defaultFAQs;

  const toggleItem = (id) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="faq">
      <div className="faq__list">
        {displayFAQs.map((faq) => (
          <FAQItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            isExpanded={expandedItems.has(faq.id)}
            onToggle={() => toggleItem(faq.id)}
          />
        ))}
      </div>
    </div>
  );
};

FAQ.propTypes = {
  faqs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired
    })
  )
};

export default FAQ;
