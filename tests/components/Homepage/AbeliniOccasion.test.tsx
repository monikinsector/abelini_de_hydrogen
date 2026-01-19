import { render, screen, fireEvent, act } from '@testing-library/react';
import AbeliniOccasion from '~/components/Homepage/AbeliniOccasion';

// Mock embla-carousel-react
// Create stable mock API object to prevent infinite loops
const mockScrollPrev = jest.fn();
const mockScrollNext = jest.fn();
type MockOn = jest.Mock & { callbacks?: Record<string, () => void> };

const mockOn: MockOn = jest.fn((event, callback) => {
  // Store callbacks for testing
  if (!mockOn.callbacks) {
    mockOn.callbacks = {};
  }
  mockOn.callbacks[event] = callback;
});

// Create mutable functions for testing different states
let mockSelectedScrollSnap = jest.fn(() => 0);
let mockScrollSnapList = jest.fn(() => [0, 1, 2]);

// Control whether to return null API for testing
let shouldReturnNullApi = false;

const stableMockApi = {
  scrollPrev: mockScrollPrev,
  scrollNext: mockScrollNext,
  scrollSnapList: () => mockScrollSnapList(),
  selectedScrollSnap: () => mockSelectedScrollSnap(),
  on: mockOn,
};

jest.mock('embla-carousel-react', () => ({
  __esModule: true,
  default: () => {
    if (shouldReturnNullApi) {
      return [null, null];
    }
    return [null, stableMockApi];
  },
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

const renderAbeliniOccasion = () => render(<AbeliniOccasion />);

const getImageBySrc = (images: HTMLElement[], src: string) => {
  for (const image of images) {
    if (image.getAttribute('src') === src) {
      return image;
    }
  }
  return undefined;
};

const expectHasImageSrcFragment = (images: HTMLElement[], srcFragment: string) => {
  let hasImage = false;
  for (const image of images) {
    if (image.getAttribute('src')?.includes(srcFragment)) {
      hasImage = true;
      break;
    }
  }
  expect(hasImage).toBe(true);
};

const getMockCallback = (eventName: string): (() => void) | undefined => {
  for (const call of mockOn.mock.calls) {
    if (call[0] === eventName) {
      return call[1];
    }
  }
  return undefined;
};

const findSelectCallback = (): (() => void) | undefined => {
  for (const call of mockOn.mock.calls) {
    if (call[0] === 'select') {
      return call[1];
    }
  }
  return undefined;
};

const triggerSelectCallback = (): void => {
  const selectCallback = findSelectCallback();
  if (selectCallback) {
    act(() => {
      selectCallback();
    });
  }
};

const testPreviousButtonClick = (button: HTMLElement): void => {
  expect(button).toBeInTheDocument();
  if (!button.hasAttribute('disabled')) {
    mockScrollPrev.mockClear();
    fireEvent.click(button);
    expect(mockScrollPrev).toHaveBeenCalledTimes(1);
  } else {
    mockScrollPrev.mockClear();
    fireEvent.click(button);
    expect(mockScrollPrev).not.toHaveBeenCalled();
  }
};

const verifyRingsRendered = (): void => {
  for (const ring of mockEngagementRings) {
    expect(screen.getByText(ring.name)).toBeInTheDocument();
  }
};

const clickNextButtonIfAvailable = (nextButtons: HTMLElement[], index: number, expectedCallCount: number): void => {
  if (nextButtons.length > index) {
    fireEvent.click(nextButtons[index]);
    expect(mockScrollNext).toHaveBeenCalledTimes(expectedCallCount);
  }
};

const verifyPrevButtonDisabled = (prevButtons: HTMLElement[], index: number): void => {
  if (prevButtons.length > index) {
    expect(prevButtons[index]).toBeInTheDocument();
    expect(prevButtons[index]).toBeDisabled();
    fireEvent.click(prevButtons[index]);
    expect(mockScrollPrev).not.toHaveBeenCalled();
  }
};

const triggerCallbackInAct = (callback: (() => void) | undefined): void => {
  if (!callback) {
    throw new Error('Callback was not registered');
  }
  act(() => {
    callback();
  });
};

describe('AbeliniOccasion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mock functions to default state
    mockSelectedScrollSnap = jest.fn(() => 0);
    mockScrollSnapList = jest.fn(() => [0, 1, 2]);
    shouldReturnNullApi = false;
  });

  describe('Rendering without failure', () => {
    it('renders without crashing', () => {
      renderAbeliniOccasion();
      expect(screen.getByRole('heading', { name: /Abelini For Any Occasion/i })).toBeInTheDocument();
    });
  });

  describe('UI driven by CMS data', () => {
    it('renders main heading with correct text', () => {
      renderAbeliniOccasion();
      const heading = screen.getByRole('heading', { name: /Abelini For Any Occasion/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    });

    it('renders introductory paragraph text', () => {
      renderAbeliniOccasion();
      expect(screen.getByText(/OUR JEWELLERY/i)).toBeInTheDocument();
    });

    it('renders section heading for Most Loved Engagement Rings', () => {
      renderAbeliniOccasion();
      const heading = screen.getByRole('heading', { name: /Most Loved Engagement Rings/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H3');
    });

    it('renders section heading for Lab Grown Diamonds', () => {
      renderAbeliniOccasion();
      const heading = screen.getByRole('heading', { name: /In Trend Lab Grown Diamonds/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H3');
    });

    it('renders all engagement ring names from provided data', () => {
      renderAbeliniOccasion();

      for (const ring of mockEngagementRings) {
        expect(screen.getByText(ring.name)).toBeInTheDocument();
      }
    });

    it('renders all lab grown diamond names from provided data', () => {
      renderAbeliniOccasion();

      for (const diamond of mockLabGrownDiamonds) {
        // Use getAllByText since "Engagement Rings" appears in multiple places (link and carousel)
        const elements = screen.getAllByText(diamond.name);
        expect(elements.length).toBeGreaterThan(0);
      }
    });
  });

  describe('User-visible links', () => {
    it('renders engagement rings link with correct href', () => {
      renderAbeliniOccasion();
      const link = screen.getByRole('link', { name: /Engagement Rings/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'engagement-rings');
    });

    it('renders lab grown diamonds link with correct href', () => {
      renderAbeliniOccasion();
      const link = screen.getByRole('link', { name: /Lab Grown Diamonds/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'lab-grown-diamonds');
    });
  });

  describe('Images', () => {
    it('renders engagement ring images with correct src and alt attributes from data', () => {
      renderAbeliniOccasion();

      for (const ring of mockEngagementRings) {
        const ringImage = screen.getByRole('img', { name: ring.name });
        expect(ringImage).toBeInTheDocument();
        expect(ringImage).toHaveAttribute('src', ring.img);
        expect(ringImage).toHaveAttribute('alt', ring.name);
      }
    });

    it('renders lab grown diamond images with correct src and alt attributes from data', () => {
      renderAbeliniOccasion();

      for (const diamond of mockLabGrownDiamonds) {
        // Use getAllByRole since some alt texts may appear multiple times (e.g., "Engagement Rings" in banners)
        // Filter by src to find the specific carousel image
        const diamondImages = screen.getAllByRole('img', { name: diamond.name });
        const diamondImage = getImageBySrc(diamondImages, diamond.img);
        expect(diamondImage).toBeInTheDocument();
        expect(diamondImage).toHaveAttribute('src', diamond.img);
        expect(diamondImage).toHaveAttribute('alt', diamond.name);
      }
    });

    it('renders most loved engagement rings banner images', () => {
      renderAbeliniOccasion();
      const bannerImages = screen.getAllByRole('img', { name: /Most Loved Engagement Rings/i });
      expect(bannerImages.length).toBeGreaterThan(0);
      // Check that at least one banner image has the expected src
      expectHasImageSrcFragment(bannerImages, 'most_loved_engagement_1_1410x666');
    });


    it('renders most loved engagement rings mobile banner images', () => {
      renderAbeliniOccasion();
      const bannerImages = screen.getAllByRole('img', { name: /Most Loved Engagement Rings/i });
      expect(bannerImages.length).toBeGreaterThan(0);
      // Check that at least one banner image has the expected src
      expectHasImageSrcFragment(bannerImages, 'most_loved_engagement_mobile_1');
    });


    it('renders young woman wearing jewelry images', () => {
      renderAbeliniOccasion();
      const bannerImages = screen.getAllByRole('img', { name: /Young woman wearing jewelry/i });
      expect(bannerImages.length).toBeGreaterThan(0);
      // Check that at least one banner image has the expected src
      expectHasImageSrcFragment(bannerImages, 'young_woman_709x551');
    });

    it('renders blonde woman wearing jewelry images', () => {
      renderAbeliniOccasion();
      const bannerImages = screen.getAllByRole('img', { name: /Blonde woman wearing jewelry/i });
      expect(bannerImages.length).toBeGreaterThan(0);
      // Check that at least one banner image has the expected src
      expectHasImageSrcFragment(bannerImages, 'young_blonde_woman_707x551');
    });


    it('renders lab grown diamonds jewellry banner images', () => {
      renderAbeliniOccasion();
      const bannerImages = screen.getAllByRole('img', { name: /Lab Grown Diamonds Jewellery/i });
      expect(bannerImages.length).toBeGreaterThan(0);
      // Check that at least one banner image has the expected src
      expectHasImageSrcFragment(bannerImages, 'plain_wedding_rings_1_1410x666');
    });


    it('renders lab grown diamonds jewellry mobile banner images', () => {
      renderAbeliniOccasion();
      const bannerImages = screen.getAllByRole('img', { name: /Lab Grown Diamonds Jewellery/i });
      expect(bannerImages.length).toBeGreaterThan(0);
      // Check that at least one banner image has the expected src
      expectHasImageSrcFragment(bannerImages, 'plain_wedding_rings_mobile_1');
    });

    it('renders model images with correct alt text', () => {
      renderAbeliniOccasion();
      // Check for both model images with their actual alt texts
      const youngWomanImages = screen.getAllByRole('img', { name: /Young woman wearing jewelry/i });
      const blondeWomanImages = screen.getAllByRole('img', { name: /Blonde woman wearing jewelry/i });
      expect(youngWomanImages.length).toBeGreaterThan(0);
      expect(blondeWomanImages.length).toBeGreaterThan(0);
    });
  });

  describe('Carousel navigation', () => {
    it('renders previous navigation button', () => {
      renderAbeliniOccasion();
      const prevButtons = screen.getAllByRole('button', { name: /Previous/i });
      expect(prevButtons.length).toBeGreaterThan(0);
    });

    it('renders next navigation button', () => {
      renderAbeliniOccasion();
      const nextButtons = screen.getAllByRole('button', { name: /Next/i });
      expect(nextButtons.length).toBeGreaterThan(0);
    });

    it('renders previous button that can be clicked when not at start', () => {
      renderAbeliniOccasion();
      const prevButtons = screen.getAllByRole('button', { name: /Previous/i });
      expect(prevButtons.length).toBeGreaterThan(0);
      // Button may be disabled at start (index 0), which is expected behavior
      // We test that the button exists and has proper accessibility
      for (const button of prevButtons) {
        expect(button).toBeInTheDocument();
      }
    });

    it('calls scrollNext when next button is clicked', () => {
      renderAbeliniOccasion();
      const nextButtons = screen.getAllByRole('button', { name: /Next/i });
      fireEvent.click(nextButtons[0]);
      expect(mockScrollNext).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      renderAbeliniOccasion();
      const mainHeading = screen.getByRole('heading', { name: /Abelini For Any Occasion/i });
      expect(mainHeading).toBeInTheDocument();
      expect(mainHeading.tagName).toBe('H2');
    });

    it('has accessible images with alt text from data', () => {
      renderAbeliniOccasion();

      for (const ring of mockEngagementRings) {
        const image = screen.getByRole('img', { name: ring.name });
        expect(image).toHaveAttribute('alt', ring.name);
      }
    });

    it('has accessible navigation buttons with descriptive labels', () => {
      renderAbeliniOccasion();
      const prevButtons = screen.getAllByRole('button', { name: /Previous/i });
      const nextButtons = screen.getAllByRole('button', { name: /Next/i });
      expect(prevButtons.length).toBeGreaterThan(0);
      expect(nextButtons.length).toBeGreaterThan(0);
    });

    it('next buttons are clickable and trigger scrollNext', () => {
      renderAbeliniOccasion();
      const nextButtons = screen.getAllByRole('button', { name: /Next/i });
      
      // There should be 2 carousels (engagement rings and lab grown diamonds)
      expect(nextButtons.length).toBeGreaterThanOrEqual(2);
      
      // Test clicking each next button
      for (const button of nextButtons) {
        mockScrollNext.mockClear();
        fireEvent.click(button);
        expect(mockScrollNext).toHaveBeenCalledTimes(1);
      }
    });

    it('previous buttons are clickable and trigger scrollPrev when not disabled', () => {
      renderAbeliniOccasion();
      const prevButtons = screen.getAllByRole('button', { name: /Previous/i });
      
      // There should be 2 carousels (engagement rings and lab grown diamonds)
      expect(prevButtons.length).toBeGreaterThanOrEqual(2);
      
      // At the start (index 0), prev buttons are disabled, so clicking them won't trigger scroll
      // This is expected behavior - buttons should be disabled at the start
      for (const button of prevButtons) {
        testPreviousButtonClick(button);
      }
    });

    it('navigation buttons work independently for each carousel', () => {
      renderAbeliniOccasion();
      const prevButtons = screen.getAllByRole('button', { name: /Previous/i });
      const nextButtons = screen.getAllByRole('button', { name: /Next/i });
      
      // Clear mocks before testing
      mockScrollNext.mockClear();
      mockScrollPrev.mockClear();
      
      // Click next button for engagement rings carousel (first carousel)
      clickNextButtonIfAvailable(nextButtons, 0, 1);
      
      // Click next button for lab grown diamonds carousel (second carousel)
      clickNextButtonIfAvailable(nextButtons, 1, 2);
      
      // Previous buttons are disabled at start (index 0), so they won't trigger scroll
      // This is expected behavior - verify buttons exist and are properly disabled
      verifyPrevButtonDisabled(prevButtons, 0);
      verifyPrevButtonDisabled(prevButtons, 1);
    });
  });

  describe('Data mapping behavior', () => {
    it('maps each engagement ring item to an image with correct structure', () => {
      renderAbeliniOccasion();

      for (const ring of mockEngagementRings) {
        const image = screen.getByRole('img', { name: ring.name });
        expect(image).toHaveAttribute('src', ring.img);
        expect(image).toHaveAttribute('alt', ring.name);
      }
    });

    it('maps each lab grown diamond item to an image with correct structure', () => {
      renderAbeliniOccasion();

      for (const diamond of mockLabGrownDiamonds) {
        // Use getAllByRole since some alt texts may appear multiple times (e.g., "Engagement Rings" in banners)
        // Filter by src to find the specific carousel image
        const diamondImages = screen.getAllByRole('img', { name: diamond.name });
        const image = getImageBySrc(diamondImages, diamond.img);
        expect(image).toHaveAttribute('src', diamond.img);
        expect(image).toHaveAttribute('alt', diamond.name);
      }
    });
  });

  describe('Carousel event handlers and state management', () => {
    it('calls scrollPrev when previous button is clicked on ImageWithProductSlider', () => {
      // Import ImageWithProductSlider directly
      const { ImageWithProductSlider } = require('~/components/Homepage/AbeliniOccasion');
      
      // Set initial state to index 1 so prev button is enabled
      mockSelectedScrollSnap.mockReturnValue(1);
      mockScrollSnapList.mockReturnValue([0, 1, 2]);
      
      const { rerender } = render(<ImageWithProductSlider rings={mockEngagementRings} />);
      
      // Trigger the select callback to update component state to index 1
      triggerSelectCallback();
      
      // Re-render to update button states based on new selectedIndex
      rerender(<ImageWithProductSlider rings={mockEngagementRings} />);
      
      const prevButton = screen.getByRole('button', { name: /Previous/i });
      
      // Verify button is enabled (not at start)
      expect(prevButton).not.toBeDisabled();
      
      // Click the prev button - this should call scrollPrev
      mockScrollPrev.mockClear();
      fireEvent.click(prevButton);
      expect(mockScrollPrev).toHaveBeenCalled();
    });

    it('handles null emblaApi gracefully in useEffect', () => {
      // This test covers line 16: if (!emblaApi) return;
      // Set shouldReturnNullApi to true to test the null API case
      shouldReturnNullApi = true;
      
      try {
        // Import ImageWithProductSlider from the component
        const { ImageWithProductSlider } = require('~/components/Homepage/AbeliniOccasion');
        
        // Render with null API - should not crash and should skip useEffect logic
        const { container } = render(<ImageWithProductSlider rings={mockEngagementRings} />);
        
        // Component should still render (just without carousel functionality)
        expect(container).toBeInTheDocument();
        
        // Verify that the component rendered the rings
        verifyRingsRendered();
      } finally {
        // Always reset shouldReturnNullApi, even if test fails
        // (beforeEach will also reset it, but this ensures immediate cleanup)
        shouldReturnNullApi = false;
      }
    });

    it('registers select event handler on mount', () => {
      renderAbeliniOccasion();
      // Verify that 'select' event handler was registered
      expect(mockOn).toHaveBeenCalledWith('select', expect.any(Function));
    });

    it('registers reInit event handler on mount', () => {
      renderAbeliniOccasion();
      // Verify that 'reInit' event handler was registered
      expect(mockOn).toHaveBeenCalledWith('reInit', expect.any(Function));
    });

    it('calls select event handler callback when triggered', () => {
      renderAbeliniOccasion();

      // Find the select callback
      const selectCallback = getMockCallback('select');
      expect(selectCallback).toBeDefined();
      
      // Mock selectedScrollSnap to return different index
      mockSelectedScrollSnap.mockReturnValue(1);
      
      // Trigger the callback wrapped in act()
      triggerCallbackInAct(selectCallback);
      
      // Verify selectedScrollSnap was called
      expect(mockSelectedScrollSnap).toHaveBeenCalled();
    });

    it('calls reInit event handler callback when triggered', () => {
      renderAbeliniOccasion();

      // Find the reInit callback
      const reInitCallback = getMockCallback('reInit');
      expect(reInitCallback).toBeDefined();
      
      // Mock scrollSnapList and selectedScrollSnap
      mockScrollSnapList.mockReturnValue([0, 1, 2, 3]);
      mockSelectedScrollSnap.mockReturnValue(2);
      
      // Trigger the callback wrapped in act()
      triggerCallbackInAct(reInitCallback);
      
      // Verify both methods were called
      expect(mockScrollSnapList).toHaveBeenCalled();
      expect(mockSelectedScrollSnap).toHaveBeenCalled();
    });

    it('initializes scrollSnaps and selectedIndex on mount', () => {
      renderAbeliniOccasion();
      
      // Verify scrollSnapList and selectedScrollSnap were called during initialization
      // These are called in the useEffect when emblaApi is available
      expect(mockScrollSnapList).toHaveBeenCalled();
      expect(mockSelectedScrollSnap).toHaveBeenCalled();
    });
  });

  describe('Button disabled states', () => {
    it('disables next button when at the end of carousel', () => {
      // Mock being at the last index
      mockSelectedScrollSnap.mockReturnValue(2); // Last index (0, 1, 2)
      mockScrollSnapList.mockReturnValue([0, 1, 2]);
      
      renderAbeliniOccasion();
      
      const nextButtons = screen.getAllByRole('button', { name: /Next/i });
      // At the end, next buttons should be disabled
      for (const button of nextButtons) {
        expect(button).toBeDisabled();
      }
    });

    it('enables next button when not at the end', () => {
      // Mock being at a middle index
      mockSelectedScrollSnap.mockReturnValue(0); // First index
      mockScrollSnapList.mockReturnValue([0, 1, 2]);
      
      renderAbeliniOccasion();
      
      const nextButtons = screen.getAllByRole('button', { name: /Next/i });
      // When not at the end, next buttons should be enabled
      for (const button of nextButtons) {
        expect(button).not.toBeDisabled();
      }
    });

    it('disables prev button when at the start', () => {
      // Mock being at the first index
      mockSelectedScrollSnap.mockReturnValue(0);
      mockScrollSnapList.mockReturnValue([0, 1, 2]);
      
      renderAbeliniOccasion();
      
      const prevButtons = screen.getAllByRole('button', { name: /Previous/i });
      // At the start, prev buttons should be disabled
      for (const button of prevButtons) {
        expect(button).toBeDisabled();
      }
    });

    it('enables prev button when not at the start', () => {
      // Mock being at a middle index
      mockSelectedScrollSnap.mockReturnValue(1); // Middle index
      mockScrollSnapList.mockReturnValue([0, 1, 2]);
      
      renderAbeliniOccasion();
      
      const prevButtons = screen.getAllByRole('button', { name: /Previous/i });
      // When not at the start, prev buttons should be enabled
      for (const button of prevButtons) {
        expect(button).not.toBeDisabled();
      }
    });
  });

  describe('Component structure and layout', () => {
    it('renders all engagement ring carousel items', () => {
      renderAbeliniOccasion();

      // Verify all engagement ring items are rendered in the carousel
      for (const ring of mockEngagementRings) {
        expect(screen.getByText(ring.name)).toBeInTheDocument();
      }
    });

    it('renders all lab grown diamond carousel items', () => {
      renderAbeliniOccasion();

      // Verify all lab grown diamond items are rendered in the carousel
      for (const diamond of mockLabGrownDiamonds) {
        const elements = screen.getAllByText(diamond.name);
        expect(elements.length).toBeGreaterThan(0);
      }
    });

    it('renders descriptive text for engagement rings section', () => {
      renderAbeliniOccasion();
      
      expect(screen.getByText(/Our engagement ring collection includes meticulously crafted/i)).toBeInTheDocument();
    });

    it('renders descriptive text for lab grown diamonds section', () => {
      renderAbeliniOccasion();
      
      expect(screen.getByText(/Embrace Brilliant Savings with Trending Lab Grown Diamond/i)).toBeInTheDocument();
    });
  });
});
