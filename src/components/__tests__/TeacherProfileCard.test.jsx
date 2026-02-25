import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TeacherProfileCard from '../TeacherProfileCard';

describe('TeacherProfileCard', () => {
  describe('Required Props', () => {
    it('renders teacher name', () => {
      render(
        <TeacherProfileCard
          name="Mrs. Priya Sharma"
        />
      );
      
      expect(screen.getByText('Mrs. Priya Sharma')).toBeInTheDocument();
    });
  });

  describe('Photo Display', () => {
    it('renders photo placeholder when no photoUrl provided', () => {
      render(
        <TeacherProfileCard
          name="Mrs. Priya Sharma"
        />
      );
      
      const placeholder = document.querySelector('.teacher-profile-card__photo-placeholder');
      expect(placeholder).toBeInTheDocument();
    });

    it('renders photo image when photoUrl provided', () => {
      render(
        <TeacherProfileCard
          name="Mrs. Priya Sharma"
          photoUrl="/images/teacher.jpg"
          photoAlt="Teacher Priya Sharma"
        />
      );
      
      const image = screen.getByAltText('Teacher Priya Sharma');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/images/teacher.jpg');
    });

    it('uses default alt text when not provided', () => {
      render(
        <TeacherProfileCard
          name="Mrs. Priya Sharma"
          photoUrl="/images/teacher.jpg"
        />
      );
      
      const image = screen.getByAltText('Teacher photo');
      expect(image).toBeInTheDocument();
    });
  });

  describe('Credentials Display', () => {
    it('renders credentials when provided', () => {
      render(
        <TeacherProfileCard
          name="Mrs. Priya Sharma"
          credentials="B.Ed., M.A. in Education"
        />
      );
      
      expect(screen.getByText('B.Ed., M.A. in Education')).toBeInTheDocument();
    });

    it('does not render credentials section when not provided', () => {
      render(
        <TeacherProfileCard
          name="Mrs. Priya Sharma"
        />
      );
      
      const credentials = document.querySelector('.teacher-profile-card__credentials');
      expect(credentials).not.toBeInTheDocument();
    });
  });

  describe('Experience Display', () => {
    it('renders experience section when provided', () => {
      const experience = 'With over 15 years of teaching experience';
      
      render(
        <TeacherProfileCard
          name="Mrs. Priya Sharma"
          experience={experience}
        />
      );
      
      expect(screen.getByText('Experience')).toBeInTheDocument();
      expect(screen.getByText(experience)).toBeInTheDocument();
    });

    it('does not render experience section when not provided', () => {
      render(
        <TeacherProfileCard
          name="Mrs. Priya Sharma"
        />
      );
      
      const experienceSection = document.querySelector('.teacher-profile-card__experience');
      expect(experienceSection).not.toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('uses Card component as base', () => {
      render(
        <TeacherProfileCard
          name="Mrs. Priya Sharma"
        />
      );
      
      const card = document.querySelector('.card');
      expect(card).toBeInTheDocument();
    });

    it('applies teacher-profile-card class', () => {
      render(
        <TeacherProfileCard
          name="Mrs. Priya Sharma"
        />
      );
      
      const card = document.querySelector('.teacher-profile-card');
      expect(card).toBeInTheDocument();
    });

    it('accepts additional className prop', () => {
      render(
        <TeacherProfileCard
          name="Mrs. Priya Sharma"
          className="custom-class"
        />
      );
      
      const card = document.querySelector('.custom-class');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Complete Profile', () => {
    it('renders all sections when all props provided', () => {
      render(
        <TeacherProfileCard
          name="Mrs. Priya Sharma"
          photoUrl="/images/teacher.jpg"
          photoAlt="Teacher Priya Sharma"
          credentials="B.Ed., M.A. in Education"
          experience="With over 15 years of teaching experience"
        />
      );
      
      expect(screen.getByText('Mrs. Priya Sharma')).toBeInTheDocument();
      expect(screen.getByAltText('Teacher Priya Sharma')).toBeInTheDocument();
      expect(screen.getByText('B.Ed., M.A. in Education')).toBeInTheDocument();
      expect(screen.getByText('Experience')).toBeInTheDocument();
      expect(screen.getByText('With over 15 years of teaching experience')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('uses proper heading hierarchy', () => {
      render(
        <TeacherProfileCard
          name="Mrs. Priya Sharma"
          experience="Teaching experience"
        />
      );
      
      const nameHeading = screen.getByRole('heading', { name: 'Mrs. Priya Sharma' });
      expect(nameHeading.tagName).toBe('H2');
      
      const experienceHeading = screen.getByRole('heading', { name: 'Experience' });
      expect(experienceHeading.tagName).toBe('H3');
    });

    it('hides decorative icon from screen readers', () => {
      render(
        <TeacherProfileCard
          name="Mrs. Priya Sharma"
        />
      );
      
      const icon = document.querySelector('.teacher-profile-card__photo-icon');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
