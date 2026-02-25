import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CourseCard from '../CourseCard';

describe('CourseCard Component', () => {
  const mockCourseData = {
    title: "Class 1-2",
    ageRange: "6-8 years",
    subjects: ["English", "Mathematics", "EVS"],
    curriculum: [
      "Reading & writing foundation",
      "Basic maths concepts",
      "Homework guidance"
    ],
    batchSize: "6-8 students",
    duration: "1.5 hours",
    method: "Interactive learning with activities"
  };

  describe('Rendering', () => {
    it('should render the course card with all required props', () => {
      render(<CourseCard {...mockCourseData} />);
      
      // Check title
      expect(screen.getByText('Class 1-2')).toBeInTheDocument();
      
      // Check age range
      expect(screen.getByText('6-8 years')).toBeInTheDocument();
      
      // Check subjects section
      expect(screen.getByText('Subjects Covered')).toBeInTheDocument();
      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('Mathematics')).toBeInTheDocument();
      expect(screen.getByText('EVS')).toBeInTheDocument();
      
      // Check curriculum section
      expect(screen.getByText('What We Cover')).toBeInTheDocument();
      expect(screen.getByText('Reading & writing foundation')).toBeInTheDocument();
      expect(screen.getByText('Basic maths concepts')).toBeInTheDocument();
      expect(screen.getByText('Homework guidance')).toBeInTheDocument();
      
      // Check details
      expect(screen.getByText('Batch Size:')).toBeInTheDocument();
      expect(screen.getByText('6-8 students')).toBeInTheDocument();
      expect(screen.getByText('Duration:')).toBeInTheDocument();
      expect(screen.getByText('1.5 hours')).toBeInTheDocument();
      expect(screen.getByText('Method:')).toBeInTheDocument();
      expect(screen.getByText('Interactive learning with activities')).toBeInTheDocument();
    });

    it('should render without age range when not provided', () => {
      const dataWithoutAge = { ...mockCourseData };
      delete dataWithoutAge.ageRange;
      
      render(<CourseCard {...dataWithoutAge} />);
      
      expect(screen.getByText('Class 1-2')).toBeInTheDocument();
      expect(screen.queryByText('6-8 years')).not.toBeInTheDocument();
    });

    it('should render all subjects in a list', () => {
      render(<CourseCard {...mockCourseData} />);
      
      const subjectsList = screen.getByText('English').closest('ul');
      expect(subjectsList).toBeInTheDocument();
      expect(subjectsList.children).toHaveLength(3);
    });

    it('should render all curriculum points in a list', () => {
      render(<CourseCard {...mockCourseData} />);
      
      const curriculumList = screen.getByText('Reading & writing foundation').closest('ul');
      expect(curriculumList).toBeInTheDocument();
      expect(curriculumList.children).toHaveLength(3);
    });
  });

  describe('Class 3-5 Course', () => {
    it('should render Class 3-5 course data correctly', () => {
      const class35Data = {
        title: "Class 3-5",
        ageRange: "8-11 years",
        subjects: ["English", "Mathematics", "Science", "Social Studies"],
        curriculum: [
          "Concept clarity",
          "Exam preparation",
          "Practice tests"
        ],
        batchSize: "8-10 students",
        duration: "2 hours",
        method: "Concept-based learning with regular assessments"
      };

      render(<CourseCard {...class35Data} />);
      
      expect(screen.getByText('Class 3-5')).toBeInTheDocument();
      expect(screen.getByText('8-11 years')).toBeInTheDocument();
      expect(screen.getByText('Science')).toBeInTheDocument();
      expect(screen.getByText('Social Studies')).toBeInTheDocument();
      expect(screen.getByText('Concept clarity')).toBeInTheDocument();
      expect(screen.getByText('Exam preparation')).toBeInTheDocument();
      expect(screen.getByText('Practice tests')).toBeInTheDocument();
      expect(screen.getByText('8-10 students')).toBeInTheDocument();
      expect(screen.getByText('2 hours')).toBeInTheDocument();
      expect(screen.getByText('Concept-based learning with regular assessments')).toBeInTheDocument();
    });
  });

  describe('Styling and Structure', () => {
    it('should apply course-card class', () => {
      const { container } = render(<CourseCard {...mockCourseData} />);
      
      const courseCard = container.querySelector('.course-card');
      expect(courseCard).toBeInTheDocument();
    });

    it('should use Card component with course type', () => {
      const { container } = render(<CourseCard {...mockCourseData} />);
      
      const card = container.querySelector('.card--course');
      expect(card).toBeInTheDocument();
    });

    it('should apply additional className when provided', () => {
      const { container } = render(
        <CourseCard {...mockCourseData} className="custom-class" />
      );
      
      const courseCard = container.querySelector('.custom-class');
      expect(courseCard).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should use proper heading hierarchy', () => {
      render(<CourseCard {...mockCourseData} />);
      
      const mainHeading = screen.getByRole('heading', { level: 3, name: 'Class 1-2' });
      expect(mainHeading).toBeInTheDocument();
      
      const subHeadings = screen.getAllByRole('heading', { level: 4 });
      expect(subHeadings).toHaveLength(2); // "Subjects Covered" and "What We Cover"
    });

    it('should use semantic list elements', () => {
      render(<CourseCard {...mockCourseData} />);
      
      const lists = screen.getAllByRole('list');
      expect(lists.length).toBeGreaterThanOrEqual(2); // At least subjects and curriculum lists
    });
  });

  describe('Requirements Validation', () => {
    it('should display class level (Requirement 5.1)', () => {
      render(<CourseCard {...mockCourseData} />);
      expect(screen.getByText('Class 1-2')).toBeInTheDocument();
    });

    it('should display subjects covered list (Requirement 5.1)', () => {
      render(<CourseCard {...mockCourseData} />);
      expect(screen.getByText('Subjects Covered')).toBeInTheDocument();
      expect(screen.getByText('English')).toBeInTheDocument();
    });

    it('should display batch size information (Requirement 5.4)', () => {
      render(<CourseCard {...mockCourseData} />);
      expect(screen.getByText('Batch Size:')).toBeInTheDocument();
      expect(screen.getByText('6-8 students')).toBeInTheDocument();
    });

    it('should display class duration (Requirement 5.4)', () => {
      render(<CourseCard {...mockCourseData} />);
      expect(screen.getByText('Duration:')).toBeInTheDocument();
      expect(screen.getByText('1.5 hours')).toBeInTheDocument();
    });

    it('should display teaching method (Requirement 5.4)', () => {
      render(<CourseCard {...mockCourseData} />);
      expect(screen.getByText('Method:')).toBeInTheDocument();
      expect(screen.getByText('Interactive learning with activities')).toBeInTheDocument();
    });

    it('should display curriculum points as list (Requirement 5.2, 5.3)', () => {
      render(<CourseCard {...mockCourseData} />);
      expect(screen.getByText('What We Cover')).toBeInTheDocument();
      expect(screen.getByText('Reading & writing foundation')).toBeInTheDocument();
      expect(screen.getByText('Basic maths concepts')).toBeInTheDocument();
      expect(screen.getByText('Homework guidance')).toBeInTheDocument();
    });
  });
});
