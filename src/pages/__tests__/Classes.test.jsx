import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Classes from '../Classes';

// Helper function to render with Router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Classes Page', () => {
  test('renders the page title', () => {
    renderWithRouter(<Classes />);
    expect(screen.getByText('Our Classes')).toBeInTheDocument();
  });

  test('renders the intro text', () => {
    renderWithRouter(<Classes />);
    expect(screen.getByText(/We offer specialized tuition programs/i)).toBeInTheDocument();
  });

  test('renders Class 1-2 course card', () => {
    renderWithRouter(<Classes />);
    expect(screen.getByText('Class 1-2')).toBeInTheDocument();
    expect(screen.getByText('6-8 years')).toBeInTheDocument();
  });

  test('renders Class 3-5 course card', () => {
    renderWithRouter(<Classes />);
    expect(screen.getByText('Class 3-5')).toBeInTheDocument();
    expect(screen.getByText('8-11 years')).toBeInTheDocument();
  });

  test('renders Class 1-2 curriculum points', () => {
    renderWithRouter(<Classes />);
    expect(screen.getByText('Reading & writing foundation')).toBeInTheDocument();
    expect(screen.getByText('Basic maths concepts')).toBeInTheDocument();
    expect(screen.getByText('Homework guidance')).toBeInTheDocument();
  });

  test('renders Class 3-5 curriculum points', () => {
    renderWithRouter(<Classes />);
    expect(screen.getByText('Concept clarity')).toBeInTheDocument();
    expect(screen.getByText('Exam preparation')).toBeInTheDocument();
    expect(screen.getByText('Practice tests')).toBeInTheDocument();
  });

  test('renders Class 1-2 subjects', () => {
    renderWithRouter(<Classes />);
    const subjects = screen.getAllByText(/English|Mathematics|EVS/);
    expect(subjects.length).toBeGreaterThan(0);
  });

  test('renders Class 3-5 subjects', () => {
    renderWithRouter(<Classes />);
    expect(screen.getByText('Science')).toBeInTheDocument();
    expect(screen.getByText('Social Studies')).toBeInTheDocument();
  });

  test('renders Class 1-2 batch size', () => {
    renderWithRouter(<Classes />);
    expect(screen.getByText('6-8 students')).toBeInTheDocument();
  });

  test('renders Class 3-5 batch size', () => {
    renderWithRouter(<Classes />);
    expect(screen.getByText('8-10 students')).toBeInTheDocument();
  });

  test('renders Class 1-2 duration', () => {
    renderWithRouter(<Classes />);
    expect(screen.getByText('1.5 hours')).toBeInTheDocument();
  });

  test('renders Class 3-5 duration', () => {
    renderWithRouter(<Classes />);
    expect(screen.getByText('2 hours')).toBeInTheDocument();
  });

  test('renders Class 1-2 teaching method', () => {
    renderWithRouter(<Classes />);
    expect(screen.getByText('Interactive learning with activities')).toBeInTheDocument();
  });

  test('renders Class 3-5 teaching method', () => {
    renderWithRouter(<Classes />);
    expect(screen.getByText('Concept-based learning with regular assessments')).toBeInTheDocument();
  });

  test('renders features section', () => {
    renderWithRouter(<Classes />);
    expect(screen.getByText('What Makes Our Classes Special')).toBeInTheDocument();
    expect(screen.getByText('Comprehensive Curriculum')).toBeInTheDocument();
    expect(screen.getByText('Daily Homework Support')).toBeInTheDocument();
    expect(screen.getByText('Regular Practice Tests')).toBeInTheDocument();
    expect(screen.getByText('Personalized Attention')).toBeInTheDocument();
  });

  test('renders enrollment CTA section', () => {
    renderWithRouter(<Classes />);
    expect(screen.getByText('Ready to Enroll?')).toBeInTheDocument();
    expect(screen.getByText(/Limited seats available/i)).toBeInTheDocument();
  });

  test('renders Contact Us button', () => {
    renderWithRouter(<Classes />);
    const contactButtons = screen.getAllByRole('link', { name: /Contact Us/i });
    expect(contactButtons.length).toBeGreaterThan(0);
    expect(contactButtons[0]).toHaveAttribute('href', '/contact');
  });

  test('renders WhatsApp Enquiry button', () => {
    renderWithRouter(<Classes />);
    const whatsappButton = screen.getByRole('link', { name: /WhatsApp Enquiry/i });
    expect(whatsappButton).toBeInTheDocument();
    expect(whatsappButton).toHaveAttribute('target', '_blank');
    expect(whatsappButton).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('uses responsive grid layout for course cards', () => {
    const { container } = renderWithRouter(<Classes />);
    const coursesGrid = container.querySelector('.courses-grid');
    expect(coursesGrid).toBeInTheDocument();
  });

  test('displays both course cards in the grid', () => {
    renderWithRouter(<Classes />);
    // Both course titles should be present
    expect(screen.getByText('Class 1-2')).toBeInTheDocument();
    expect(screen.getByText('Class 3-5')).toBeInTheDocument();
  });
});
