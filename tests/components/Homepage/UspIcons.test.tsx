import { render, screen } from '@testing-library/react';
import UspIcons from '~/components/Homepage/UspIcons';

// Mock the data file to test component behavior, not specific data values
// Define mock data locally for use in tests (do not import from data file)
const mockUspItems = [
  {
    id: 1,
    target: '#free_resizing',
    src: 'resize.svg',
    alt: 'Abelini Free Resizing',
    label: 'Free Resizing'
  },
  {
    id: 2,
    target: '#information',
    src: 'free_delivery.svg',
    alt: 'Abelini Free Delivery',
    label: 'Free Delivery'
  },
  {
    id: 3,
    target: '#sixty_day_return',
    src: 'return.svg',
    alt: 'Abelini 60-Day Risk-Free Returns',
    label: '60-Day Risk-Free Returns'
  },
  {
    id: 4,
    target: '#diamond_certificate',
    src: 'certificate.svg',
    alt: 'Abelini Diamond & Valuation Certificate',
    label: 'Diamond & Valuation Certificate'
  },
  {
    id: 5,
    target: '#attractive_packing',
    src: 'gifts.svg',
    alt: 'Abelini Attractive Packaging',
    label: 'Attractive Packaging'
  },
  {
    id: 6,
    target: '#life_time_warranty',
    src: 'warranty.svg',
    alt: 'Abelini Lifetime Warranty',
    label: 'Lifetime Warranty'
  }
];

describe('UspIcons', () => {

  it('renders all USP items as links', () => {
    render(<UspIcons />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(mockUspItems.length);
  });

  it('renders links with correct href targets', () => {
    render(<UspIcons />);
    
    mockUspItems.forEach((item) => {
      const link = screen.getByRole('link', { name: new RegExp(item.label, 'i') });
      expect(link).toHaveAttribute('href', item.target);
    });
  });

  it('displays all USP labels', () => {
    render(<UspIcons />);
    
    mockUspItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it('renders images with correct src, alt, and dimensions', () => {
    render(<UspIcons />);
    
    mockUspItems.forEach((item) => {
      const image = screen.getByRole('img', { name: new RegExp(item.alt, 'i') });
      expect(image).toHaveAttribute('src', `/assets/images/icons/${item.src}`);
      expect(image).toHaveAttribute('alt', item.alt);
      expect(image).toHaveAttribute('width', '42');
      expect(image).toHaveAttribute('height', '42');
    });
  });

  it('renders all images with correct dimensions', () => {
    render(<UspIcons />);
    const images = screen.getAllByRole('img');
    
    images.forEach(image => {
      expect(image).toHaveAttribute('width', '42');
      expect(image).toHaveAttribute('height', '42');
    });
  });

  it('renders section element', () => {
    const { container } = render(<UspIcons />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});
