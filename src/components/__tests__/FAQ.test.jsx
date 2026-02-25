import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FAQ from '../FAQ';

describe('FAQ Component', () => {
  const mockFAQs = [
    {
      id: 1,
      question: "What is the batch size?",
      answer: "We maintain small batch sizes of 6-10 students."
    },
    {
      id: 2,
      question: "What are the fees?",
      answer: "Please contact us for detailed fee structure."
    }
  ];

  describe('Rendering', () => {
    it('should render with default FAQs when no faqs prop provided', () => {
      render(<FAQ />);
      
      // Check for default questions
      expect(screen.getByText(/What is the batch size\?/i)).toBeInTheDocument();
      expect(screen.getByText(/What are the fees\?/i)).toBeInTheDocument();
      expect(screen.getByText(/Do you provide homework support\?/i)).toBeInTheDocument();
      expect(screen.getByText(/Can we attend a demo class\?/i)).toBeInTheDocument();
    });

    it('should render custom FAQs when faqs prop is provided', () => {
      render(<FAQ faqs={mockFAQs} />);
      
      expect(screen.getByText("What is the batch size?")).toBeInTheDocument();
      expect(screen.getByText("What are the fees?")).toBeInTheDocument();
      expect(screen.queryByText(/Do you provide homework support\?/i)).not.toBeInTheDocument();
    });

    it('should render all FAQ items as collapsed by default', () => {
      render(<FAQ faqs={mockFAQs} />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('should render expand icons (+) for collapsed items', () => {
      render(<FAQ faqs={mockFAQs} />);
      
      const icons = screen.getAllByText('+');
      expect(icons).toHaveLength(mockFAQs.length);
    });
  });

  describe('Structure', () => {
    it('should have question and answer elements for each FAQ item', () => {
      render(<FAQ faqs={mockFAQs} />);
      
      mockFAQs.forEach(faq => {
        // Question should be visible
        expect(screen.getByText(faq.question)).toBeInTheDocument();
        
        // Answer should be in the document (even if hidden)
        expect(screen.getByText(faq.answer)).toBeInTheDocument();
      });
    });

    it('should render questions as buttons for accessibility', () => {
      render(<FAQ faqs={mockFAQs} />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(mockFAQs.length);
    });
  });

  describe('Expand/Collapse Functionality', () => {
    it('should expand FAQ item when question is clicked', () => {
      render(<FAQ faqs={mockFAQs} />);
      
      const firstButton = screen.getAllByRole('button')[0];
      
      // Initially collapsed
      expect(firstButton).toHaveAttribute('aria-expanded', 'false');
      
      // Click to expand
      fireEvent.click(firstButton);
      
      // Should be expanded
      expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should collapse FAQ item when clicked again', () => {
      render(<FAQ faqs={mockFAQs} />);
      
      const firstButton = screen.getAllByRole('button')[0];
      
      // Expand
      fireEvent.click(firstButton);
      expect(firstButton).toHaveAttribute('aria-expanded', 'true');
      
      // Collapse
      fireEvent.click(firstButton);
      expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('should toggle icon from + to − when expanded', () => {
      render(<FAQ faqs={mockFAQs} />);
      
      const firstButton = screen.getAllByRole('button')[0];
      
      // Initially shows +
      expect(firstButton.querySelector('.faq-item__icon')).toHaveTextContent('+');
      
      // Click to expand
      fireEvent.click(firstButton);
      
      // Should show −
      expect(firstButton.querySelector('.faq-item__icon')).toHaveTextContent('−');
    });

    it('should allow multiple FAQ items to be expanded simultaneously', () => {
      render(<FAQ faqs={mockFAQs} />);
      
      const buttons = screen.getAllByRole('button');
      
      // Expand first item
      fireEvent.click(buttons[0]);
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
      
      // Expand second item
      fireEvent.click(buttons[1]);
      expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
      
      // First item should still be expanded
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    });

    it('should add expanded class to FAQ item when expanded', () => {
      render(<FAQ faqs={mockFAQs} />);
      
      const firstButton = screen.getAllByRole('button')[0];
      const faqItem = firstButton.closest('.faq-item');
      
      // Initially not expanded
      expect(faqItem).not.toHaveClass('faq-item--expanded');
      
      // Click to expand
      fireEvent.click(firstButton);
      
      // Should have expanded class
      expect(faqItem).toHaveClass('faq-item--expanded');
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-expanded attributes', () => {
      render(<FAQ faqs={mockFAQs} />);
      
      const buttons = screen.getAllByRole('button');
      
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-expanded');
      });
    });

    it('should have aria-hidden on answer wrapper based on expanded state', () => {
      render(<FAQ faqs={mockFAQs} />);
      
      const firstButton = screen.getAllByRole('button')[0];
      const answerWrapper = firstButton.parentElement.querySelector('.faq-item__answer-wrapper');
      
      // Initially hidden
      expect(answerWrapper).toHaveAttribute('aria-hidden', 'true');
      
      // Expand
      fireEvent.click(firstButton);
      
      // Should not be hidden
      expect(answerWrapper).toHaveAttribute('aria-hidden', 'false');
    });

    it('should have aria-hidden="true" on icon', () => {
      render(<FAQ faqs={mockFAQs} />);
      
      const icons = screen.getAllByText('+');
      icons.forEach(icon => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('should be keyboard accessible', () => {
      render(<FAQ faqs={mockFAQs} />);
      
      const firstButton = screen.getAllByRole('button')[0];
      
      // Should be focusable
      firstButton.focus();
      expect(document.activeElement).toBe(firstButton);
      
      // Should respond to click (keyboard activation)
      fireEvent.click(firstButton);
      expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should toggle FAQ item when Enter key is pressed', () => {
      render(<FAQ faqs={mockFAQs} />);
      
      const firstButton = screen.getAllByRole('button')[0];
      
      // Initially collapsed
      expect(firstButton).toHaveAttribute('aria-expanded', 'false');
      
      // Press Enter key
      fireEvent.keyDown(firstButton, { key: 'Enter', code: 'Enter' });
      
      // Should be expanded
      expect(firstButton).toHaveAttribute('aria-expanded', 'true');
      
      // Press Enter again
      fireEvent.keyDown(firstButton, { key: 'Enter', code: 'Enter' });
      
      // Should be collapsed
      expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('should toggle FAQ item when Space key is pressed', () => {
      render(<FAQ faqs={mockFAQs} />);
      
      const firstButton = screen.getAllByRole('button')[0];
      
      // Initially collapsed
      expect(firstButton).toHaveAttribute('aria-expanded', 'false');
      
      // Press Space key
      fireEvent.keyDown(firstButton, { key: ' ', code: 'Space' });
      
      // Should be expanded
      expect(firstButton).toHaveAttribute('aria-expanded', 'true');
      
      // Press Space again
      fireEvent.keyDown(firstButton, { key: ' ', code: 'Space' });
      
      // Should be collapsed
      expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('should not toggle FAQ item when other keys are pressed', () => {
      render(<FAQ faqs={mockFAQs} />);
      
      const firstButton = screen.getAllByRole('button')[0];
      
      // Initially collapsed
      expect(firstButton).toHaveAttribute('aria-expanded', 'false');
      
      // Press other keys (should not toggle)
      fireEvent.keyDown(firstButton, { key: 'a', code: 'KeyA' });
      expect(firstButton).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.keyDown(firstButton, { key: 'Escape', code: 'Escape' });
      expect(firstButton).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.keyDown(firstButton, { key: 'Tab', code: 'Tab' });
      expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Styling', () => {
    it('should apply correct CSS classes to FAQ container', () => {
      const { container } = render(<FAQ faqs={mockFAQs} />);
      
      expect(container.querySelector('.faq')).toBeInTheDocument();
      expect(container.querySelector('.faq__list')).toBeInTheDocument();
    });

    it('should apply correct CSS classes to FAQ items', () => {
      const { container } = render(<FAQ faqs={mockFAQs} />);
      
      const faqItems = container.querySelectorAll('.faq-item');
      expect(faqItems).toHaveLength(mockFAQs.length);
      
      faqItems.forEach(item => {
        expect(item.querySelector('.faq-item__question')).toBeInTheDocument();
        expect(item.querySelector('.faq-item__question-text')).toBeInTheDocument();
        expect(item.querySelector('.faq-item__icon')).toBeInTheDocument();
        expect(item.querySelector('.faq-item__answer-wrapper')).toBeInTheDocument();
        expect(item.querySelector('.faq-item__answer')).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty faqs array', () => {
      render(<FAQ faqs={[]} />);
      
      // Should render default FAQs
      expect(screen.getByText(/What is the batch size\?/i)).toBeInTheDocument();
    });

    it('should handle FAQ with long answer text', () => {
      const longFAQ = [
        {
          id: 1,
          question: "Test question?",
          answer: "This is a very long answer. ".repeat(50)
        }
      ];
      
      render(<FAQ faqs={longFAQ} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('should handle FAQ with special characters in question', () => {
      const specialFAQ = [
        {
          id: 1,
          question: "What's the fee? (Including GST)",
          answer: "₹5000 per month"
        }
      ];
      
      render(<FAQ faqs={specialFAQ} />);
      
      expect(screen.getByText("What's the fee? (Including GST)")).toBeInTheDocument();
    });
  });
});
