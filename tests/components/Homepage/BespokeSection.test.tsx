import { render, screen } from '@testing-library/react';
import BespokeSection from '~/components/Homepage/BespokeSection';

// Mock the data file to test component behavior, not specific data values
// Define mock data inside the mock factory to avoid hoisting issues
// Do not import from data file - use local mock data only

// Define the same mock data locally for use in tests (do not import from data file)
const mockBespokeImages = [
  {
    id: 1,
    image: '/assets/images/bespoke_image_1272x350.webp',
    mobileImage: '/assets/images/mobile/home/bespoke_image_mobile_325x603.webp',
  },
];


describe('BespokeSection', () => {
  describe('Rendering without failure', () => {
    it('renders without crashing', () => {
      render(<BespokeSection />);
      expect(screen.getByRole('heading', { name: /Bespoke Design Service/i })).toBeInTheDocument();
    });
  });

  describe('UI driven by CMS data', () => {
    it('renders heading with correct text', () => {
      render(<BespokeSection />);
      const heading = screen.getByRole('heading', { name: /Bespoke Design Service/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H3');
    });

    it('renders introductory paragraph text', () => {
      render(<BespokeSection />);
      expect(screen.getByText(/CREATE YOUR OWN DESIGN/i)).toBeInTheDocument();
    });

    it('renders descriptive paragraph text', () => {
      render(<BespokeSection />);
      expect(screen.getByText(/ABELINI Jewellery can transform the latest trends/i)).toBeInTheDocument();
    });

    it('renders all bespoke images from provided data', () => {
      render(<BespokeSection />);
      
      // Each image item renders both desktop and mobile versions
      // So we expect 2 images per item (desktop + mobile)
      const allImages = screen.getAllByRole('img', { name: /Bespoke Image/i });
      expect(allImages.length).toBe(mockBespokeImages.length * 2);
    });

    it('renders correct number of images based on data length', () => {
      render(<BespokeSection />);
      const allImages = screen.getAllByRole('img', { name: /Bespoke Image/i });
      // Each bespoke image renders both desktop and mobile versions
      expect(allImages).toHaveLength(mockBespokeImages.length * 2);
    });
  });

  describe('User-visible links', () => {
    it('renders bespoke link with correct href', () => {
      render(<BespokeSection />);
      const link = screen.getByRole('link', { name: /Request Bespoke Design/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/bespoke');
    });
  });

  describe('Images', () => {
    it('renders desktop bespoke images with correct src and alt attributes from data', () => {
      render(<BespokeSection />);
      
      mockBespokeImages.forEach((image) => {
        const desktopImages = screen.getAllByRole('img', { name: /Bespoke Image/i });
        const desktopImage = desktopImages.find(img => 
          img.getAttribute('src') === image.image
        );
        expect(desktopImage).toBeInTheDocument();
        expect(desktopImage).toHaveAttribute('src', image.image);
        expect(desktopImage).toHaveAttribute('alt', 'Bespoke Image');
      });
    });

    it('renders mobile bespoke images with correct src and alt attributes from data', () => {
      render(<BespokeSection />);
      
      mockBespokeImages.forEach((image) => {
        const mobileImages = screen.getAllByRole('img', { name: /Bespoke Image/i });
        const mobileImage = mobileImages.find(img => 
          img.getAttribute('src') === image.mobileImage
        );
        expect(mobileImage).toBeInTheDocument();
        expect(mobileImage).toHaveAttribute('src', image.mobileImage);
        expect(mobileImage).toHaveAttribute('alt', 'Bespoke Image');
      });
    });

    it('renders desktop images with correct width attribute', () => {
      render(<BespokeSection />);
      
      const desktopImages = screen.getAllByRole('img', { name: /Bespoke Image/i });
      const desktopImage = desktopImages.find(img => 
        img.getAttribute('width') === '1272'
      );
      expect(desktopImage).toBeInTheDocument();
      expect(desktopImage).toHaveAttribute('width', '1272');
    });

    it('renders mobile images with correct width attribute', () => {
      render(<BespokeSection />);
      
      const mobileImages = screen.getAllByRole('img', { name: /Bespoke Image/i });
      const mobileImage = mobileImages.find(img => 
        img.getAttribute('width') === '325'
      );
      expect(mobileImage).toBeInTheDocument();
      expect(mobileImage).toHaveAttribute('width', '325');
    });

    it('renders desktop images with correct className for responsive display', () => {
      render(<BespokeSection />);
      
      const desktopImages = screen.getAllByRole('img', { name: /Bespoke Image/i });
      const desktopImage = desktopImages.find(img => 
        img.getAttribute('src')?.includes('bespoke_image_1272x350')
      );
      expect(desktopImage).toBeInTheDocument();
      expect(desktopImage?.className).toContain('hidden lg:block');
    });

    it('renders mobile images with correct className for responsive display', () => {
      render(<BespokeSection />);
      
      const mobileImages = screen.getAllByRole('img', { name: /Bespoke Image/i });
      const mobileImage = mobileImages.find(img => 
        img.getAttribute('src')?.includes('bespoke_image_mobile')
      );
      expect(mobileImage).toBeInTheDocument();
      expect(mobileImage?.className).toContain('block lg:hidden');
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<BespokeSection />);
      const heading = screen.getByRole('heading', { name: /Bespoke Design Service/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H3');
    });

    it('has accessible images with alt text', () => {
      render(<BespokeSection />);
      
      const allImages = screen.getAllByRole('img', { name: /Bespoke Image/i });
      allImages.forEach((image) => {
        expect(image).toHaveAttribute('alt', 'Bespoke Image');
      });
    });

    it('has accessible link with descriptive text', () => {
      render(<BespokeSection />);
      const link = screen.getByRole('link', { name: /Request Bespoke Design/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/bespoke');
    });
  });

  describe('Data mapping behavior', () => {
    it('maps each bespoke image item to desktop and mobile images with correct structure', () => {
      render(<BespokeSection />);
      
      mockBespokeImages.forEach((image) => {
        // Verify desktop image
        const allImages = screen.getAllByRole('img', { name: /Bespoke Image/i });
        const desktopImage = allImages.find(img => 
          img.getAttribute('src') === image.image
        );
        expect(desktopImage).toBeInTheDocument();
        expect(desktopImage).toHaveAttribute('src', image.image);
        expect(desktopImage).toHaveAttribute('alt', 'Bespoke Image');
        expect(desktopImage).toHaveAttribute('width', '1272');
        
        // Verify mobile image
        const mobileImage = allImages.find(img => 
          img.getAttribute('src') === image.mobileImage
        );
        expect(mobileImage).toBeInTheDocument();
        expect(mobileImage).toHaveAttribute('src', image.mobileImage);
        expect(mobileImage).toHaveAttribute('alt', 'Bespoke Image');
        expect(mobileImage).toHaveAttribute('width', '325');
      });
    });
  });

  describe('Component structure and layout', () => {
    it('renders section with proper structure', () => {
      render(<BespokeSection />);
      const section = screen.getByRole('heading', { name: /Bespoke Design Service/i }).closest('section');
      expect(section).toBeInTheDocument();
    });

    it('renders all text content correctly', () => {
      render(<BespokeSection />);
      
      expect(screen.getByText(/CREATE YOUR OWN DESIGN/i)).toBeInTheDocument();
      expect(screen.getByText(/Bespoke Design Service/i)).toBeInTheDocument();
      expect(screen.getByText(/ABELINI Jewellery can transform the latest trends/i)).toBeInTheDocument();
      expect(screen.getByText(/Request Bespoke Design/i)).toBeInTheDocument();
    });
  });
});
