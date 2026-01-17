import { render, screen } from '@testing-library/react';
import SpotlightSection from '~/components/Homepage/SpotlightSection';

// Mock the data file to test component behavior, not specific data values
// Define mock data inside the mock factory to avoid hoisting issues
// Do not import from data file - use local mock data only


// Define the same mock data locally for use in tests (do not import from data file)
const SpotlightLogos = [
  { id: 1, name: 'Sun Newspaper', image: '/assets/images/home/spotlight/sun_newspaper.svg' },
  { id: 2, name: 'Daily Express', image: '/assets/images/home/spotlight/daily_express.svg' },
  { id: 3, name: 'Marie Claire', image: '/assets/images/home/spotlight/marie_claire.svg' },
  { id: 4, name: 'Hatched', image: '/assets/images/home/spotlight/hatched.svg' },
  { id: 5, name: 'Mirror', image: '/assets/images/home/spotlight/mirrorlogo.svg' },
];

describe('SpotlightSection', () => {
  describe('Rendering without failure', () => {
    it('renders without crashing', () => {
      render(<SpotlightSection />);
      expect(screen.getByRole('heading', { name: /Abelini In The Spotlight/i })).toBeInTheDocument();
    });
  });

  describe('UI driven by CMS data', () => {
    it('renders heading with correct text', () => {
      render(<SpotlightSection />);
      const heading = screen.getByRole('heading', { name: /Abelini In The Spotlight/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    });

    it('renders introductory paragraph text', () => {
      render(<SpotlightSection />);
      expect(screen.getByText(/WHERE DO THEY MENTION US\?/i)).toBeInTheDocument();
    });

    it('renders all spotlight logos from provided data', () => {
      render(<SpotlightSection />);
      
      SpotlightLogos.forEach((logo) => {
        const logoImage = screen.getByRole('img', { name: logo.name });
        expect(logoImage).toBeInTheDocument();
      });
    });

    it('renders correct number of logo images based on data length', () => {
      render(<SpotlightSection />);
      const logoImages = screen.getAllByRole('img');
      expect(logoImages).toHaveLength(SpotlightLogos.length);
    });
  });

  describe('Images', () => {
    it('renders spotlight logo images with correct src and alt attributes from data', () => {
      render(<SpotlightSection />);
      
      SpotlightLogos.forEach((logo) => {
        const logoImage = screen.getByRole('img', { name: logo.name });
        expect(logoImage).toBeInTheDocument();
        expect(logoImage).toHaveAttribute('src', logo.image);
        expect(logoImage).toHaveAttribute('alt', logo.name);
      });
    });

    it('renders images with correct loading attribute', () => {
      render(<SpotlightSection />);
      
      SpotlightLogos.forEach((logo) => {
        const logoImage = screen.getByRole('img', { name: logo.name });
        expect(logoImage).toHaveAttribute('loading', 'lazy');
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<SpotlightSection />);
      const heading = screen.getByRole('heading', { name: /Abelini In The Spotlight/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    });

    it('has accessible images with alt text from data', () => {
      render(<SpotlightSection />);
      
      SpotlightLogos.forEach((logo) => {
        const image = screen.getByRole('img', { name: logo.name });
        expect(image).toHaveAttribute('alt', logo.name);
      });
    });
  });

  describe('Data mapping behavior', () => {
    it('maps each spotlight logo item to an image with correct structure', () => {
      render(<SpotlightSection />);
      
      // Verify that for each logo, we have:
      // 1. An image with the correct src
      // 2. An image with the correct alt text
      // 3. Proper loading attribute
      SpotlightLogos.forEach((logo) => {
        const image = screen.getByRole('img', { name: logo.name });
        expect(image).toHaveAttribute('src', logo.image);
        expect(image).toHaveAttribute('alt', logo.name);
        expect(image).toHaveAttribute('loading', 'lazy');
      });
    });
  });
});
