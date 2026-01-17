import { render, screen } from '@testing-library/react';
import BookAppointmentSection from '~/components/Homepage/BookAppointmentSection';

describe('BookAppointmentSection', () => {
  describe('Rendering without failure', () => {
    it('renders without crashing', () => {
      render(<BookAppointmentSection />);
      expect(screen.getByRole('heading', { name: /Step Into Luxury/i })).toBeInTheDocument();
    });
  });

  describe('UI driven by CMS data', () => {
    it('renders heading with correct text', () => {
      render(<BookAppointmentSection />);
      const heading = screen.getByRole('heading', { 
        name: /Step Into Luxury – Our New Jewellery Store Is Now Open/i 
      });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H3');
    });

    it('renders descriptive paragraph text', () => {
      render(<BookAppointmentSection />);
      expect(screen.getByText(/Step into luxury with our new jewellery store/i)).toBeInTheDocument();
      expect(screen.getByText(/Experience the finest selection of fine jewellery/i)).toBeInTheDocument();
    });

    it('renders the store image', () => {
      render(<BookAppointmentSection />);
      const image = screen.getByRole('img', { name: /Visit Showroom/i });
      expect(image).toBeInTheDocument();
    });
  });

  describe('User-visible links', () => {
    it('renders book appointment link with correct href', () => {
      render(<BookAppointmentSection />);
      const link = screen.getByRole('link', { name: /Book an appointment now/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/book-appointment');
    });
  });

  describe('Images', () => {
    it('renders store image with correct src and alt attributes', () => {
      render(<BookAppointmentSection />);
      const image = screen.getByRole('img', { name: /Visit Showroom/i });
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/assets/images/gate-view.webp');
      expect(image).toHaveAttribute('alt', 'Visit Showroom');
    });

    it('renders image with correct className for responsive display', () => {
      render(<BookAppointmentSection />);
      const image = screen.getByRole('img', { name: /Visit Showroom/i });
      expect(image).toBeInTheDocument();
      expect(image.className).toContain('w-full');
      expect(image.className).toContain('object-cover');
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<BookAppointmentSection />);
      const heading = screen.getByRole('heading', { 
        name: /Step Into Luxury – Our New Jewellery Store Is Now Open/i 
      });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H3');
    });

    it('has accessible images with alt text', () => {
      render(<BookAppointmentSection />);
      const image = screen.getByRole('img', { name: /Visit Showroom/i });
      expect(image).toHaveAttribute('alt', 'Visit Showroom');
    });

    it('has accessible link with descriptive text', () => {
      render(<BookAppointmentSection />);
      const link = screen.getByRole('link', { name: /Book an appointment now/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/book-appointment');
    });
  });

  describe('Component structure and layout', () => {
    it('renders section with proper structure', () => {
      render(<BookAppointmentSection />);
      const section = screen.getByRole('heading', { name: /Step Into Luxury/i }).closest('section');
      expect(section).toBeInTheDocument();
    });

    it('renders all text content correctly', () => {
      render(<BookAppointmentSection />);
      
      expect(screen.getByText(/Step Into Luxury – Our New Jewellery Store Is Now Open/i)).toBeInTheDocument();
      expect(screen.getByText(/Step into luxury with our new jewellery store/i)).toBeInTheDocument();
      expect(screen.getByText(/Experience the finest selection of fine jewellery/i)).toBeInTheDocument();
      expect(screen.getByText(/Book an appointment now/i)).toBeInTheDocument();
    });

    it('renders image and content in correct layout structure', () => {
      render(<BookAppointmentSection />);
      
      // Verify image exists
      const image = screen.getByRole('img', { name: /Visit Showroom/i });
      expect(image).toBeInTheDocument();
      
      // Verify heading exists
      const heading = screen.getByRole('heading', { name: /Step Into Luxury/i });
      expect(heading).toBeInTheDocument();
      
      // Verify link exists
      const link = screen.getByRole('link', { name: /Book an appointment now/i });
      expect(link).toBeInTheDocument();
    });
  });
});
