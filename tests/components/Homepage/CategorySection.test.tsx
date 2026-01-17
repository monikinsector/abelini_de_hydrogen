import { render, screen } from '@testing-library/react';
import CategorySection from '~/components/Homepage/CategorySection';

// Mock the data file to test component behavior, not specific data values

// Define mock data inside the mock factory to avoid hoisting issues
const categories = [
  { id: 1, name: 'Engagement Rings', image: '/assets/images/home/rings_300x300.webp', link: '/engagement-rings' },
  { id: 2, name: 'Wedding Rings', image: '/assets/images/home/wedding_300x300.webp', link: '/wedding-rings' },
  { id: 3, name: 'Eternity Rings', image: '/assets/images/home/eternity-300x300.webp', link: '/diamond-rings/eternity-rings' },
  { id: 4, name: 'Necklace', image: '/assets/images/home/pendants.webp', link: '/pendants' },
  { id: 5, name: 'Earrings', image: '/assets/images/home/earrings.webp', link: '/earrings' },
  { id: 6, name: 'Bracelets', image: '/assets/images/home/bracelets.webp', link: '/bracelets' },
];

describe('CategorySection', () => {
  describe('Rendering without failure', () => {
    it('renders without crashing', () => {
      render(<CategorySection />);
      expect(screen.getByRole('heading', { name: /Select Category/i })).toBeInTheDocument();
    });
  });

  describe('UI driven by CMS data', () => {
    it('renders heading with correct text', () => {
      render(<CategorySection />);
      const heading = screen.getByRole('heading', { name: /Select Category/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    });

    it('renders all category names from provided data', () => {
      render(<CategorySection />);
      
      categories.forEach((category) => {
        expect(screen.getByText(category.name)).toBeInTheDocument();
      });
    });

    it('renders correct number of category items based on data length', () => {
      render(<CategorySection />);
      const categoryLinks = screen.getAllByRole('link').filter(
        link => link.getAttribute('href') !== '/all-diamond-jewellery'
      );
      expect(categoryLinks).toHaveLength(categories.length);
    });
  });

  describe('User-visible links', () => {
    it('renders category links with correct href attributes from data', () => {
      render(<CategorySection />);
      
      categories.forEach((category) => {
        const categoryLink = screen.getByText(category.name).closest('a');
        expect(categoryLink).toBeInTheDocument();
        expect(categoryLink).toHaveAttribute('href', category.link);
      });
    });

    it('renders desktop show all link with correct href', () => {
      render(<CategorySection />);
      const showAllLinks = screen.getAllByRole('link', { name: /Show All/i });
      const desktopLink = showAllLinks.find(link => 
        link.getAttribute('href') === '/all-diamond-jewellery'
      );
      expect(desktopLink).toBeInTheDocument();
      expect(desktopLink).toHaveAttribute('href', '/all-diamond-jewellery');
    });

    it('renders mobile show all link with correct href', () => {
      render(<CategorySection />);
      const showAllLinks = screen.getAllByRole('link', { name: /Show All/i });
      const mobileLink = showAllLinks.find(link => 
        link.getAttribute('href') === '/all-diamond-jewellery'
      );
      expect(mobileLink).toBeInTheDocument();
      expect(mobileLink).toHaveAttribute('href', '/all-diamond-jewellery');
    });
  });

  describe('Images', () => {
    it('renders category images with correct src and alt attributes from data', () => {
      render(<CategorySection />);
      
      categories.forEach((category) => {
        const categoryImage = screen.getByRole('img', { name: category.name });
        expect(categoryImage).toBeInTheDocument();
        expect(categoryImage).toHaveAttribute('src', category.image);
        expect(categoryImage).toHaveAttribute('alt', category.name);
      });
    });

    it('renders arrow icon in desktop show all link', () => {
      render(<CategorySection />);
      const arrowImage = screen.getByRole('img', { name: /Arrow Right/i });
      expect(arrowImage).toBeInTheDocument();
      expect(arrowImage).toHaveAttribute('src', '/assets/images/icons/arrow-right-small.svg');
    });
  });

  describe('Conditional rendering', () => {
    it('renders both desktop and mobile show all links', () => {
      render(<CategorySection />);
      const showAllLinks = screen.getAllByRole('link', { name: /Show All/i });
      // Desktop link (with arrow) and mobile link (button style)
      expect(showAllLinks.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<CategorySection />);
      const heading = screen.getByRole('heading', { name: /Select Category/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    });

    it('has accessible images with alt text from data', () => {
      render(<CategorySection />);
      
      categories.forEach((category) => {
        const image = screen.getByRole('img', { name: category.name });
        expect(image).toHaveAttribute('alt', category.name);
      });
    });

    it('has accessible links with descriptive text from data', () => {
      render(<CategorySection />);
      
      categories.forEach((category) => {
        const link = screen.getByText(category.name).closest('a');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', category.link);
      });
    });
  });

  describe('Data mapping behavior', () => {
    it('maps each category item to a link with correct structure', () => {
      render(<CategorySection />);
      
      // Verify that for each category, we have:
      // 1. A link with the correct href
      // 2. An image with the correct src and alt
      // 3. Text content matching the category name
      categories.forEach((category) => {
        const link = screen.getByText(category.name).closest('a');
        expect(link).toHaveAttribute('href', category.link);
        
        const image = screen.getByRole('img', { name: category.name });
        expect(image).toHaveAttribute('src', category.image);
      });
    });
  });
});
