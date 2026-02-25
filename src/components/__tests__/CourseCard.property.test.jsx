import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import CourseCard from '../CourseCard';

/**
 * Property-Based Tests for Course Card Component
 * 
 * These tests validate universal properties that should hold true
 * for course cards across all configurations.
 */

describe('Course Card Component - Property-Based Tests', () => {
  /**
   * Property 3: Course Card Information Completeness
   * 
   * **Validates: Requirements 5.4**
   * 
   * For any course card displayed on the Classes page, the card should 
   * contain all required information: subjects covered, batch size, 
   * class duration, and teaching method.
   * 
   * This test verifies that all required information fields are present
   * and displayed in the course card regardless of the specific content.
   */
  describe('Property 3: Course Card Information Completeness', () => {
    it('should always display all required information fields (subjects, batch size, duration, method)', () => {
      // Define arbitraries for course card props
      const titleArbitrary = fc.string({ minLength: 5, maxLength: 50 });
      
      const ageRangeArbitrary = fc.string({ minLength: 5, maxLength: 20 });
      
      const subjectsArbitrary = fc.array(
        fc.string({ minLength: 3, maxLength: 30 }),
        { minLength: 1, maxLength: 6 }
      );
      
      const curriculumArbitrary = fc.array(
        fc.string({ minLength: 10, maxLength: 100 }),
        { minLength: 1, maxLength: 5 }
      );
      
      const batchSizeArbitrary = fc.string({ minLength: 5, maxLength: 30 });
      
      const durationArbitrary = fc.string({ minLength: 5, maxLength: 30 });
      
      const methodArbitrary = fc.string({ minLength: 10, maxLength: 100 });
      
      // Property: For any valid course card configuration, all required fields should be present
      fc.assert(
        fc.property(
          titleArbitrary,
          ageRangeArbitrary,
          subjectsArbitrary,
          curriculumArbitrary,
          batchSizeArbitrary,
          durationArbitrary,
          methodArbitrary,
          (title, ageRange, subjects, curriculum, batchSize, duration, method) => {
            // Render the course card with generated props
            const { container } = render(
              <CourseCard
                title={title}
                ageRange={ageRange}
                subjects={subjects}
                curriculum={curriculum}
                batchSize={batchSize}
                duration={duration}
                method={method}
              />
            );
            
            // 1. Verify subjects section is present and displays all subjects
            const subjectsSection = container.querySelector('.course-card__section');
            expect(subjectsSection).toBeInTheDocument();
            
            const subjectsList = container.querySelector('.course-card__list--subjects');
            expect(subjectsList).toBeInTheDocument();
            
            const subjectItems = subjectsList.querySelectorAll('.course-card__list-item');
            expect(subjectItems.length).toBe(subjects.length);
            
            // Verify each subject is displayed
            subjects.forEach((subject, index) => {
              expect(subjectItems[index].textContent).toBe(subject);
            });
            
            // 2. Verify batch size is present and displayed
            const batchSizeLabel = Array.from(container.querySelectorAll('.course-card__detail-label'))
              .find(el => el.textContent === 'Batch Size:');
            expect(batchSizeLabel).toBeInTheDocument();
            
            const batchSizeValue = batchSizeLabel.nextElementSibling;
            expect(batchSizeValue).toHaveClass('course-card__detail-value');
            expect(batchSizeValue.textContent).toBe(batchSize);
            
            // 3. Verify duration is present and displayed
            const durationLabel = Array.from(container.querySelectorAll('.course-card__detail-label'))
              .find(el => el.textContent === 'Duration:');
            expect(durationLabel).toBeInTheDocument();
            
            const durationValue = durationLabel.nextElementSibling;
            expect(durationValue).toHaveClass('course-card__detail-value');
            expect(durationValue.textContent).toBe(duration);
            
            // 4. Verify teaching method is present and displayed
            const methodLabel = Array.from(container.querySelectorAll('.course-card__detail-label'))
              .find(el => el.textContent === 'Method:');
            expect(methodLabel).toBeInTheDocument();
            
            const methodValue = methodLabel.nextElementSibling;
            expect(methodValue).toHaveClass('course-card__detail-value');
            expect(methodValue.textContent).toBe(method);
            
            return true;
          }
        ),
        {
          numRuns: 5, // Run 5 test cases with different configurations
          verbose: false
        }
      );
    });

    it('should display curriculum information when provided', () => {
      // Define arbitraries
      const titleArbitrary = fc.string({ minLength: 5, maxLength: 50 });
      
      const subjectsArbitrary = fc.array(
        fc.string({ minLength: 3, maxLength: 30 }),
        { minLength: 1, maxLength: 6 }
      );
      
      const curriculumArbitrary = fc.array(
        fc.string({ minLength: 10, maxLength: 100 }),
        { minLength: 1, maxLength: 5 }
      );
      
      const batchSizeArbitrary = fc.string({ minLength: 5, maxLength: 30 });
      const durationArbitrary = fc.string({ minLength: 5, maxLength: 30 });
      const methodArbitrary = fc.string({ minLength: 10, maxLength: 100 });
      
      // Property: Curriculum should be displayed when provided
      fc.assert(
        fc.property(
          titleArbitrary,
          subjectsArbitrary,
          curriculumArbitrary,
          batchSizeArbitrary,
          durationArbitrary,
          methodArbitrary,
          (title, subjects, curriculum, batchSize, duration, method) => {
            const { container } = render(
              <CourseCard
                title={title}
                subjects={subjects}
                curriculum={curriculum}
                batchSize={batchSize}
                duration={duration}
                method={method}
              />
            );
            
            // Verify curriculum section is present
            const curriculumList = container.querySelector('.course-card__list--curriculum');
            expect(curriculumList).toBeInTheDocument();
            
            // Verify all curriculum points are displayed
            const curriculumItems = curriculumList.querySelectorAll('.course-card__list-item');
            expect(curriculumItems.length).toBe(curriculum.length);
            
            curriculum.forEach((point, index) => {
              expect(curriculumItems[index].textContent).toBe(point);
            });
            
            return true;
          }
        ),
        {
          numRuns: 5,
          verbose: false
        }
      );
    });

    it('should always display title and age range when provided', () => {
      // Define arbitraries
      const titleArbitrary = fc.string({ minLength: 5, maxLength: 50 });
      const ageRangeArbitrary = fc.string({ minLength: 5, maxLength: 20 });
      
      const subjectsArbitrary = fc.array(
        fc.string({ minLength: 3, maxLength: 30 }),
        { minLength: 1, maxLength: 3 }
      );
      
      const curriculumArbitrary = fc.array(
        fc.string({ minLength: 10, maxLength: 50 }),
        { minLength: 1, maxLength: 3 }
      );
      
      const batchSizeArbitrary = fc.string({ minLength: 5, maxLength: 30 });
      const durationArbitrary = fc.string({ minLength: 5, maxLength: 30 });
      const methodArbitrary = fc.string({ minLength: 10, maxLength: 100 });
      
      // Property: Title and age range should always be displayed
      fc.assert(
        fc.property(
          titleArbitrary,
          ageRangeArbitrary,
          subjectsArbitrary,
          curriculumArbitrary,
          batchSizeArbitrary,
          durationArbitrary,
          methodArbitrary,
          (title, ageRange, subjects, curriculum, batchSize, duration, method) => {
            const { container } = render(
              <CourseCard
                title={title}
                ageRange={ageRange}
                subjects={subjects}
                curriculum={curriculum}
                batchSize={batchSize}
                duration={duration}
                method={method}
              />
            );
            
            // Verify title is displayed
            const titleElement = container.querySelector('.course-card__title');
            expect(titleElement).toBeInTheDocument();
            expect(titleElement.textContent).toBe(title);
            
            // Verify age range is displayed
            const ageRangeElement = container.querySelector('.course-card__age-range');
            expect(ageRangeElement).toBeInTheDocument();
            expect(ageRangeElement.textContent).toBe(ageRange);
            
            return true;
          }
        ),
        {
          numRuns: 5,
          verbose: false
        }
      );
    });

    it('should maintain proper structure with all detail items in footer', () => {
      // Define arbitraries
      const titleArbitrary = fc.string({ minLength: 5, maxLength: 50 });
      
      const subjectsArbitrary = fc.array(
        fc.string({ minLength: 3, maxLength: 30 }),
        { minLength: 1, maxLength: 3 }
      );
      
      const curriculumArbitrary = fc.array(
        fc.string({ minLength: 10, maxLength: 50 }),
        { minLength: 1, maxLength: 3 }
      );
      
      const batchSizeArbitrary = fc.string({ minLength: 5, maxLength: 30 });
      const durationArbitrary = fc.string({ minLength: 5, maxLength: 30 });
      const methodArbitrary = fc.string({ minLength: 10, maxLength: 100 });
      
      // Property: All three detail items should be present in the footer
      fc.assert(
        fc.property(
          titleArbitrary,
          subjectsArbitrary,
          curriculumArbitrary,
          batchSizeArbitrary,
          durationArbitrary,
          methodArbitrary,
          (title, subjects, curriculum, batchSize, duration, method) => {
            const { container } = render(
              <CourseCard
                title={title}
                subjects={subjects}
                curriculum={curriculum}
                batchSize={batchSize}
                duration={duration}
                method={method}
              />
            );
            
            // Verify the details section exists
            const detailsSection = container.querySelector('.course-card__details');
            expect(detailsSection).toBeInTheDocument();
            
            // Verify all three detail items are present
            const detailItems = detailsSection.querySelectorAll('.course-card__detail-item');
            expect(detailItems.length).toBe(3);
            
            // Verify each detail item has both label and value
            detailItems.forEach(item => {
              const label = item.querySelector('.course-card__detail-label');
              const value = item.querySelector('.course-card__detail-value');
              
              expect(label).toBeInTheDocument();
              expect(value).toBeInTheDocument();
              expect(label.textContent).toBeTruthy();
              expect(value.textContent).toBeTruthy();
            });
            
            return true;
          }
        ),
        {
          numRuns: 5,
          verbose: false
        }
      );
    });
  });
});
