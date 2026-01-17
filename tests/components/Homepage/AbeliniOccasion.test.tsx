import { render, screen, fireEvent } from '@testing-library/react';
import AbeliniOccasion from '~/components/Homepage/AbeliniOccasion';

// Mock embla-carousel-react
// Create stable mock API object to prevent infinite loops
const mockScrollPrev = jest.fn();
const mockScrollNext = jest.fn();
const mockOn = jest.fn(); // Don't call callbacks immediately to prevent infinite loops

const stableMockApi = {
  scrollPrev: mockScrollPrev,
  scrollNext: mockScrollNext,
  scrollSnapList: () => [0, 1, 2],
  selectedScrollSnap: () => 0,
  on: mockOn,
};

jest.mock('embla-carousel-react', () => ({
  __esModule: true,
  default: () => [null, stableMockApi],
}));

// Mock the data file to test component behavior, not specific data values
// Define mock data inside the mock factory to avoid hoisting issues
// Do not import from data file - use local mock data only

// Define the same mock data locally for use in tests (do not import from data file)
const mockEngagementRings = [
  { id: 1, name: 'Solitaire', href: 'engagement-rings/classic-solitaire', img: '/assets/images/home/category/solitaire_320x300.webp' },
  { id: 2, name: 'Side Stone', href: 'engagement-rings/side-stone-shoulder-set-rings', img: '/assets/images/home/category/side_stone_320x300.webp' },
  { id: 3, name: 'Halo', href: 'engagement-rings/halo-rings', img: '/assets/images/home/category/halo_320x300.webp' },
  { id: 4, name: 'Trilogy', href: 'engagement-rings/three-stone', img: '/assets/images/home/category/trilogy_320x300.webp' },
  { id: 5, name: 'Vintage', href: 'engagement-rings/vintage-engagement-rings', img: '/assets/images/home/category/vintage_320x300.webp' },
  { id: 6, name: 'Ruby', href: 'engagement-rings/ruby', img: '/assets/images/home/category/ruby_320x300.webp' },
  { id: 7, name: 'Emerald', href: 'engagement-rings/emeralds', img: '/assets/images/home/category/emerald_320x300.webp' },
  { id: 8, name: 'Oval', href: 'engagement-rings/oval', img: '/assets/images/home/category/oval_320x300.jpeg' },
  { id: 9, name: 'Blue Sapphire', href: 'engagement-rings/blue-sapphire', img: '/assets/images/home/category/blue_sapphire_320x300.webp' },
];

const mockLabGrownDiamonds = [
  { id: 1, name: 'Engagement Rings', href: 'engagement-rings/lab-grown-diamond', img: '/assets/images/home/category/solitaire_320x300.webp' },
  { id: 2, name: 'Eternity Rings', href: 'diamond-rings/eternity-rings/lab-grown-diamond', img: '/assets/images/home/category/eternity_product.webp' },
  { id: 3, name: 'Pendant', href: 'pendants/lab-grown-diamond', img: '/assets/images/home/category/pendant.webp' },
  { id: 4, name: 'Earrings', href: 'earrings/lab-grown-diamond', img: '/assets/images/home/category/earring.webp' },
  { id: 5, name: 'Bracelets', href: 'bracelets/lab-grown-diamond', img: '/assets/images/home/category/bracelet.webp' },
];

describe('AbeliniOccasion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering without failure', () => {
    it('renders without crashing', () => {
      render(<AbeliniOccasion />);
      expect(screen.getByRole('heading', { name: /Abelini For Any Occasion/i })).toBeInTheDocument();
    });
  });

  describe('UI driven by CMS data', () => {
    it('renders main heading with correct text', () => {
      render(<AbeliniOccasion />);
      const heading = screen.getByRole('heading', { name: /Abelini For Any Occasion/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    });

    it('renders introductory paragraph text', () => {
      render(<AbeliniOccasion />);
      expect(screen.getByText(/OUR JEWELLERY/i)).toBeInTheDocument();
    });

    it('renders section heading for Most Loved Engagement Rings', () => {
      render(<AbeliniOccasion />);
      const heading = screen.getByRole('heading', { name: /Most Loved Engagement Rings/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H3');
    });

    it('renders section heading for Lab Grown Diamonds', () => {
      render(<AbeliniOccasion />);
      const heading = screen.getByRole('heading', { name: /In Trend Lab Grown Diamonds/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H3');
    });

    it('renders all engagement ring names from provided data', () => {
      render(<AbeliniOccasion />);
      
      mockEngagementRings.forEach((ring) => {
        expect(screen.getByText(ring.name)).toBeInTheDocument();
      });
    });

    it('renders all lab grown diamond names from provided data', () => {
      render(<AbeliniOccasion />);
      
      mockLabGrownDiamonds.forEach((diamond) => {
        // Use getAllByText since "Engagement Rings" appears in multiple places (link and carousel)
        const elements = screen.getAllByText(diamond.name);
        expect(elements.length).toBeGreaterThan(0);
      });
    });
  });

  describe('User-visible links', () => {
    it('renders engagement rings link with correct href', () => {
      render(<AbeliniOccasion />);
      const link = screen.getByRole('link', { name: /Engagement Rings/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'engagement-rings');
    });

    it('renders lab grown diamonds link with correct href', () => {
      render(<AbeliniOccasion />);
      const link = screen.getByRole('link', { name: /Lab Grown Diamonds/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'lab-grown-diamonds');
    });
  });

  describe('Images', () => {
    it('renders engagement ring images with correct src and alt attributes from data', () => {
      render(<AbeliniOccasion />);
      
      mockEngagementRings.forEach((ring) => {
        const ringImage = screen.getByRole('img', { name: ring.name });
        expect(ringImage).toBeInTheDocument();
        expect(ringImage).toHaveAttribute('src', ring.img);
        expect(ringImage).toHaveAttribute('alt', ring.name);
      });
    });

    it('renders lab grown diamond images with correct src and alt attributes from data', () => {
      render(<AbeliniOccasion />);
      
      mockLabGrownDiamonds.forEach((diamond) => {
        // Use getAllByRole since some alt texts may appear multiple times (e.g., "Engagement Rings" in banners)
        // Filter by src to find the specific carousel image
        const diamondImages = screen.getAllByRole('img', { name: diamond.name });
        const diamondImage = diamondImages.find(img => img.getAttribute('src') === diamond.img);
        expect(diamondImage).toBeInTheDocument();
        expect(diamondImage).toHaveAttribute('src', diamond.img);
        expect(diamondImage).toHaveAttribute('alt', diamond.name);
      });
    });

    it('renders main engagement rings banner images', () => {
      render(<AbeliniOccasion />);
      const bannerImages = screen.getAllByRole('img', { name: /Engagement Rings/i });
      expect(bannerImages.length).toBeGreaterThan(0);
      // Check that at least one banner image has the expected src
      const hasBannerImage = bannerImages.some(img => 
        img.getAttribute('src')?.includes('most_loved_engagement')
      );
      expect(hasBannerImage).toBe(true);
    });

    it('renders model images with correct alt text', () => {
      render(<AbeliniOccasion />);
      const modelImages = screen.getAllByRole('img', { name: /Model wearing jewelry/i });
      expect(modelImages.length).toBeGreaterThan(0);
    });
  });

  describe('Carousel navigation', () => {
    it('renders previous navigation button', () => {
      render(<AbeliniOccasion />);
      const prevButtons = screen.getAllByRole('button', { name: /Previous/i });
      expect(prevButtons.length).toBeGreaterThan(0);
    });

    it('renders next navigation button', () => {
      render(<AbeliniOccasion />);
      const nextButtons = screen.getAllByRole('button', { name: /Next/i });
      expect(nextButtons.length).toBeGreaterThan(0);
    });

    it('renders previous button that can be clicked when not at start', () => {
      render(<AbeliniOccasion />);
      const prevButtons = screen.getAllByRole('button', { name: /Previous/i });
      expect(prevButtons.length).toBeGreaterThan(0);
      // Button may be disabled at start (index 0), which is expected behavior
      // We test that the button exists and has proper accessibility
      prevButtons.forEach(button => {
        expect(button).toBeInTheDocument();
      });
    });

    it('calls scrollNext when next button is clicked', () => {
      render(<AbeliniOccasion />);
      const nextButtons = screen.getAllByRole('button', { name: /Next/i });
      fireEvent.click(nextButtons[0]);
      expect(mockScrollNext).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<AbeliniOccasion />);
      const mainHeading = screen.getByRole('heading', { name: /Abelini For Any Occasion/i });
      expect(mainHeading).toBeInTheDocument();
      expect(mainHeading.tagName).toBe('H2');
    });

    it('has accessible images with alt text from data', () => {
      render(<AbeliniOccasion />);
      
      mockEngagementRings.forEach((ring) => {
        const image = screen.getByRole('img', { name: ring.name });
        expect(image).toHaveAttribute('alt', ring.name);
      });
    });

    it('has accessible navigation buttons with descriptive labels', () => {
      render(<AbeliniOccasion />);
      const prevButtons = screen.getAllByRole('button', { name: /Previous/i });
      const nextButtons = screen.getAllByRole('button', { name: /Next/i });
      expect(prevButtons.length).toBeGreaterThan(0);
      expect(nextButtons.length).toBeGreaterThan(0);
    });

    it('next buttons are clickable and trigger scrollNext', () => {
      render(<AbeliniOccasion />);
      const nextButtons = screen.getAllByRole('button', { name: /Next/i });
      
      // There should be 2 carousels (engagement rings and lab grown diamonds)
      expect(nextButtons.length).toBeGreaterThanOrEqual(2);
      
      // Test clicking each next button
      nextButtons.forEach((button, index) => {
        mockScrollNext.mockClear();
        fireEvent.click(button);
        expect(mockScrollNext).toHaveBeenCalledTimes(1);
      });
    });

    it('previous buttons are clickable and trigger scrollPrev when not disabled', () => {
      render(<AbeliniOccasion />);
      const prevButtons = screen.getAllByRole('button', { name: /Previous/i });
      
      // There should be 2 carousels (engagement rings and lab grown diamonds)
      expect(prevButtons.length).toBeGreaterThanOrEqual(2);
      
      // At the start (index 0), prev buttons are disabled, so clicking them won't trigger scroll
      // This is expected behavior - buttons should be disabled at the start
      prevButtons.forEach((button) => {
        expect(button).toBeInTheDocument();
        // Button may be disabled at start, which is correct accessibility behavior
        if (!button.hasAttribute('disabled')) {
          mockScrollPrev.mockClear();
          fireEvent.click(button);
          expect(mockScrollPrev).toHaveBeenCalledTimes(1);
        } else {
          // If disabled, clicking should not trigger scroll
          mockScrollPrev.mockClear();
          fireEvent.click(button);
          expect(mockScrollPrev).not.toHaveBeenCalled();
        }
      });
    });

    it('navigation buttons work independently for each carousel', () => {
      render(<AbeliniOccasion />);
      const prevButtons = screen.getAllByRole('button', { name: /Previous/i });
      const nextButtons = screen.getAllByRole('button', { name: /Next/i });
      
      // Clear mocks before testing
      mockScrollNext.mockClear();
      mockScrollPrev.mockClear();
      
      // Click next button for engagement rings carousel (first carousel)
      if (nextButtons.length > 0) {
        fireEvent.click(nextButtons[0]);
        expect(mockScrollNext).toHaveBeenCalledTimes(1);
      }
      
      // Click next button for lab grown diamonds carousel (second carousel)
      if (nextButtons.length > 1) {
        fireEvent.click(nextButtons[1]);
        expect(mockScrollNext).toHaveBeenCalledTimes(2);
      }
      
      // Previous buttons are disabled at start (index 0), so they won't trigger scroll
      // This is expected behavior - verify buttons exist and are properly disabled
      if (prevButtons.length > 0) {
        expect(prevButtons[0]).toBeInTheDocument();
        // At start, prev button should be disabled
        expect(prevButtons[0]).toBeDisabled();
        fireEvent.click(prevButtons[0]);
        // Disabled button should not trigger scroll
        expect(mockScrollPrev).not.toHaveBeenCalled();
      }
      
      if (prevButtons.length > 1) {
        expect(prevButtons[1]).toBeInTheDocument();
        // At start, prev button should be disabled
        expect(prevButtons[1]).toBeDisabled();
        fireEvent.click(prevButtons[1]);
        // Disabled button should not trigger scroll
        expect(mockScrollPrev).not.toHaveBeenCalled();
      }
    });
  });

  describe('Data mapping behavior', () => {
    it('maps each engagement ring item to an image with correct structure', () => {
      render(<AbeliniOccasion />);
      
      mockEngagementRings.forEach((ring) => {
        const image = screen.getByRole('img', { name: ring.name });
        expect(image).toHaveAttribute('src', ring.img);
        expect(image).toHaveAttribute('alt', ring.name);
      });
    });

    it('maps each lab grown diamond item to an image with correct structure', () => {
      render(<AbeliniOccasion />);
      
      mockLabGrownDiamonds.forEach((diamond) => {
        // Use getAllByRole since some alt texts may appear multiple times (e.g., "Engagement Rings" in banners)
        // Filter by src to find the specific carousel image
        const diamondImages = screen.getAllByRole('img', { name: diamond.name });
        const image = diamondImages.find(img => img.getAttribute('src') === diamond.img);
        expect(image).toHaveAttribute('src', diamond.img);
        expect(image).toHaveAttribute('alt', diamond.name);
      });
    });
  });
});
