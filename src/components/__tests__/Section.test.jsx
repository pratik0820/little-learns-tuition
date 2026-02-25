import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Section from '../Section';

describe('Section Component', () => {
  it('renders children content', () => {
    render(
      <Section>
        <p>Test content</p>
      </Section>
    );
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders with default variant', () => {
    const { container } = render(
      <Section>
        <p>Content</p>
      </Section>
    );
    
    const section = container.querySelector('.section');
    expect(section).toHaveClass('section--default');
  });

  it('renders with alternate variant', () => {
    const { container } = render(
      <Section variant="alternate">
        <p>Content</p>
      </Section>
    );
    
    const section = container.querySelector('.section');
    expect(section).toHaveClass('section--alternate');
  });

  it('renders with hero variant', () => {
    const { container } = render(
      <Section variant="hero">
        <p>Content</p>
      </Section>
    );
    
    const section = container.querySelector('.section');
    expect(section).toHaveClass('section--hero');
  });

  it('renders title when provided', () => {
    render(
      <Section title="Test Title">
        <p>Content</p>
      </Section>
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Title').tagName).toBe('H2');
  });

  it('renders subtitle when provided', () => {
    render(
      <Section subtitle="Test Subtitle">
        <p>Content</p>
      </Section>
    );
    
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders both title and subtitle', () => {
    render(
      <Section title="Test Title" subtitle="Test Subtitle">
        <p>Content</p>
      </Section>
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('applies additional className when provided', () => {
    const { container } = render(
      <Section className="custom-class">
        <p>Content</p>
      </Section>
    );
    
    const section = container.querySelector('.section');
    expect(section).toHaveClass('custom-class');
  });

  it('renders container div', () => {
    const { container } = render(
      <Section>
        <p>Content</p>
      </Section>
    );
    
    expect(container.querySelector('.container')).toBeInTheDocument();
  });

  it('renders section__content wrapper', () => {
    const { container } = render(
      <Section>
        <p>Content</p>
      </Section>
    );
    
    expect(container.querySelector('.section__content')).toBeInTheDocument();
  });

  it('does not render title when not provided', () => {
    const { container } = render(
      <Section>
        <p>Content</p>
      </Section>
    );
    
    expect(container.querySelector('.section__title')).not.toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    const { container } = render(
      <Section>
        <p>Content</p>
      </Section>
    );
    
    expect(container.querySelector('.section__subtitle')).not.toBeInTheDocument();
  });
});
