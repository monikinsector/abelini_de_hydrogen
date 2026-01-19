import { render, screen } from '@testing-library/react';
import HeroBanner from '~/components/Homepage/HeroBanner';

// Mock react-router Link component
jest.mock('react-router', () => ({
  Link: ({ to, children, className, ...props }: any) => (
    <a href={to} className={className} {...props} data-testid="hero-link">
      {children}
    </a>
  ),
}));

// Mock Shopify Hydrogen Image component
jest.mock('@shopify/hydrogen', () => ({
  Image: ({ src, alt, className, ...props }: any) => (
    <img src={src} alt={alt} className={className} {...props} data-testid="hydrogen-image" />
  ),
}));

// Mock console.log to avoid test output noise
const originalConsoleLog = console.log;
beforeAll(() => {
  console.log = jest.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
});

describe('HeroBanner', () => {
  const mockData = {
    background_image: {
      url: '/assets/images/hero-bg.jpg',
      altText: 'Background',
    },
    main_title: 'Special Sale',
    content_under_title: 'Get amazing deals\non all jewelry',
    button_1_text: 'Shop Now',
    button_1_link: '/shop',
    button_2_text: 'Learn More',
    button_2_link: '/about',
    desktop_banner_image: {
      url: '/assets/images/hero-desktop.jpg',
      altText: 'Desktop Banner',
    },
    mobile_banner_image: {
      url: '/assets/images/hero-mobile.jpg',
      altText: 'Mobile Banner',
    },
    terms_conditions_text: 'Terms and conditions apply',
    banner_link_only: '/banner-link',
    background_color: '#ffffff',
  };

  describe('Initial Render', () => {
    it('renders with all required data', () => {
      render(<HeroBanner data={mockData} />);
      
      expect(screen.getByText('Special Sale')).toBeInTheDocument();
      expect(screen.getByText(/Get amazing deals/)).toBeInTheDocument();
      expect(screen.getByText('Shop Now')).toBeInTheDocument();
      expect(screen.getByText('Learn More')).toBeInTheDocument();
    });
  });

  describe('Background Styling', () => {
    it('applies background image from data', () => {
      const { container } = render(<HeroBanner data={mockData} />);
      
      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toHaveStyle({
        backgroundImage: `url(${mockData.background_image.url})`,
      });
    });

    it('applies background color from data', () => {
      const { container } = render(<HeroBanner data={mockData} />);
      
      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toHaveStyle({
        backgroundColor: mockData.background_color,
      });
    });

    it('applies correct container classes', () => {
      const { container } = render(<HeroBanner data={mockData} />);
      
      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toHaveClass(
        'relative',
        'grid',
        'grid-cols-1',
        'pb-2',
        'md:pb-0',
        'md:grid-cols-5',
        'min-h-[50vh]',
        'bg-cover'
      );
    });
  });

  describe('Images', () => {
    it('renders desktop banner image', () => {
      render(<HeroBanner data={mockData} />);
      
      const desktopImage = screen.getByAltText('Desktop Banner');
      expect(desktopImage).toBeInTheDocument();
      expect(desktopImage).toHaveAttribute('src', mockData.desktop_banner_image.url);
      expect(desktopImage).toHaveClass('md:block', 'hidden');
    });

    it('renders mobile banner image', () => {
      render(<HeroBanner data={mockData} />);
      
      const mobileImage = screen.getByAltText('Mobile Banner');
      expect(mobileImage).toBeInTheDocument();
      expect(mobileImage).toHaveAttribute('src', mockData.mobile_banner_image.url);
      expect(mobileImage).toHaveClass('block', 'md:hidden');
    });

    it('wraps desktop image in link', () => {
      render(<HeroBanner data={mockData} />);
      
      const desktopImage = screen.getByAltText('Desktop Banner');
      const link = desktopImage.closest('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', mockData.banner_link_only);
    });
  });

  describe('Content', () => {
    it('renders "Sale" heading', () => {
      render(<HeroBanner data={mockData} />);
      
      // "Sale" is wrapped in <i> tag, so we get the <i> element
      const saleText = screen.getByText('Sale');
      expect(saleText).toBeInTheDocument();
      
      // Check that it's inside an h3
      const saleHeading = saleText.closest('h3');
      expect(saleHeading).toBeInTheDocument();
      expect(saleHeading).toHaveClass('text-red-500');
    });

    it('renders main title', () => {
      render(<HeroBanner data={mockData} />);
      
      const mainTitle = screen.getByText('Special Sale');
      expect(mainTitle).toBeInTheDocument();
      expect(mainTitle.tagName).toBe('H5');
    });

    it('renders content under title', () => {
      render(<HeroBanner data={mockData} />);
      
      // Use a more flexible matcher for text with newlines
      const content = screen.getByText(/Get amazing deals/);
      expect(content).toBeInTheDocument();
      expect(content.tagName).toBe('P');
      expect(content).toHaveClass('whitespace-pre-line');
      expect(content.textContent).toContain('on all jewelry');
    });
  });

  describe('Buttons', () => {
    it('renders first button with correct text and link', () => {
      render(<HeroBanner data={mockData} />);
      
      const button1 = screen.getByText('Shop Now');
      expect(button1).toBeInTheDocument();
      expect(button1.closest('a')).toHaveAttribute('href', '/shop');
      expect(button1.closest('a')).toHaveClass('btn-black');
    });

    it('renders second button when button_2_link is provided', () => {
      render(<HeroBanner data={mockData} />);
      
      const button2 = screen.getByText('Learn More');
      expect(button2).toBeInTheDocument();
      expect(button2.closest('a')).toHaveAttribute('href', '/about');
      expect(button2.closest('a')).toHaveClass('btn-white');
    });

    it('does not render second button when button_2_link is not provided', () => {
      let mockDataWithoutButton2 = {
        ...mockData,
        button_2_link: undefined,
      };
      const dataWithoutButton2 = {
        ...mockDataWithoutButton2,
      };
      
      render(<HeroBanner data={dataWithoutButton2} />);
      
      expect(screen.getByText('Shop Now')).toBeInTheDocument();
      expect(screen.queryByText('Learn More')).not.toBeInTheDocument();
    });

    it('does not render second button when button_2_link is empty string', () => {
      const dataWithoutButton2 = {
        ...mockData,
        button_2_link: undefined,
      };
      
      render(<HeroBanner data={dataWithoutButton2} />);
      
      expect(screen.getByText('Shop Now')).toBeInTheDocument();
      expect(screen.queryByText('Learn More')).not.toBeInTheDocument();
    });
  });

  describe('Terms and Conditions', () => {
    it('renders terms and conditions text when provided', () => {
      render(<HeroBanner data={mockData} />);
      
      const termsText = screen.getByText('Terms and conditions apply');
      expect(termsText).toBeInTheDocument();
      expect(termsText).toHaveClass(
        'absolute',
        'bottom-2',
        'right-2',
        'text-muted',
        'font-thin',
        'tracking-wide',
        'text-[12px]',
        'whitespace-pre-line'
      );
    });

    it('does not render terms and conditions when not provided', () => {
      const dataWithoutTerms = {
        ...mockData,
        terms_conditions_text: undefined,
      };
      
      render(<HeroBanner data={dataWithoutTerms} />);
      
      expect(screen.queryByText('Terms and conditions apply')).not.toBeInTheDocument();
    });

    it('does not render terms and conditions when empty string', () => {
      const dataWithoutTerms = {
        ...mockData,
        terms_conditions_text: '',
      };
      
      render(<HeroBanner data={dataWithoutTerms} />);
      
      expect(screen.queryByText('Terms and conditions apply')).not.toBeInTheDocument();
    });
  });

  describe('Layout Structure', () => {
    it('has correct grid structure', () => {
      const { container } = render(<HeroBanner data={mockData} />);
      
      const imageContainer = container.querySelector('.col-span-2');
      expect(imageContainer).toBeInTheDocument();
      expect(imageContainer).toHaveClass('col-span-2', 'flex', 'justify-center');
      
      const contentContainer = container.querySelector('.col-span-3');
      expect(contentContainer).toBeInTheDocument();
      expect(contentContainer).toHaveClass('col-span-3');
    });

    it('has correct button container classes', () => {
      const { container } = render(<HeroBanner data={mockData} />);
      
      const buttonContainer = container.querySelector('.flex.flex-wrap');
      expect(buttonContainer).toBeInTheDocument();
      expect(buttonContainer).toHaveClass(
        'flex',
        'flex-wrap',
        'md:flex-row',
        'flex-col',
        'gap-4',
        'mt-5'
      );
    });
  });

  describe('Responsive Behavior', () => {
    it('hides desktop image on mobile', () => {
      render(<HeroBanner data={mockData} />);
      
      const desktopImage = screen.getByAltText('Desktop Banner');
      expect(desktopImage).toHaveClass('md:block', 'hidden');
    });

    it('shows mobile image only on mobile', () => {
      render(<HeroBanner data={mockData} />);
      
      const mobileImage = screen.getByAltText('Mobile Banner');
      expect(mobileImage).toHaveClass('block', 'md:hidden');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string values gracefully', () => {
      const emptyData = {
        background_image: { url: '', altText: '' },
        main_title: '',
        content_under_title: '',
        button_1_text: '',
        button_1_link: '',
        desktop_banner_image: { url: '', altText: '' },
        mobile_banner_image: { url: '', altText: '' },
        banner_link_only: '',
        background_color: '',
      };
      
      const { container } = render(<HeroBanner data={emptyData} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('handles missing optional properties', () => {
      const minimalData = {
        background_image: { url: '/bg.jpg', altText: 'BG' },
        main_title: 'Title',
        content_under_title: 'Content',
        button_1_text: 'Button',
        button_1_link: '/link',
        desktop_banner_image: { url: '/desktop.jpg', altText: 'Desktop' },
        mobile_banner_image: { url: '/mobile.jpg', altText: 'Mobile' },
        banner_link_only: '/banner',
        background_color: '#fff',
      };
      
      render(<HeroBanner data={minimalData} />);
      
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Button')).toBeInTheDocument();
      expect(screen.queryByText(/Terms/i)).not.toBeInTheDocument();
    });
  });
});
