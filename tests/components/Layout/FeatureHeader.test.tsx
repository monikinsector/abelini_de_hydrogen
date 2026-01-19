import { render, screen } from '@testing-library/react';
import FeatureHeader from '~/components/Layout/FeatureHeader';

// Mock Shopify Hydrogen Image component
jest.mock('@shopify/hydrogen', () => ({
  Image: ({ src, alt, width, className, ...props }: any) => (
    <img src={src} alt={alt} width={width} className={className} {...props} data-testid="hydrogen-image" />
  ),
}));

describe('FeatureHeader', () => {
  describe('Initial Render', () => {
    it('renders with trustpilotText prop', () => {
      render(<FeatureHeader trustpilotText="Excellent" />);
      
      // trustpilotText is rendered within a paragraph with other content
      expect(screen.getByText(/Excellent/)).toBeInTheDocument();
    });

    it('renders all static text content', () => {
      render(<FeatureHeader trustpilotText="4.8" />);
      
      expect(screen.getByText('100% money back guarantee')).toBeInTheDocument();
      expect(screen.getByText('Fairly Priced Diamonds')).toBeInTheDocument();
      // Trustpilot text is part of the trustpilotText paragraph
      expect(screen.getByText(/Trustpilot/)).toBeInTheDocument();
    });

    it('renders trustpilot text with icon', () => {
      render(<FeatureHeader trustpilotText="4.8" />);
      
      const trustpilotText = screen.getByText(/4\.8/);
      expect(trustpilotText).toBeInTheDocument();
      
      // Check that Trustpilot icon is rendered
      const trustpilotIcon = screen.getByAltText('Trustpilot');
      expect(trustpilotIcon).toBeInTheDocument();
    });
  });

  describe('Images', () => {
    it('renders phone icon for mobile', () => {
      render(<FeatureHeader trustpilotText="Test" />);
      
      const phoneImage = screen.getByAltText('Phone');
      expect(phoneImage).toBeInTheDocument();
      expect(phoneImage).toHaveAttribute('src', '/assets/images/icons/phone.svg');
      expect(phoneImage).toHaveClass('block', 'md:hidden');
    });

    it('renders location icon for mobile', () => {
      render(<FeatureHeader trustpilotText="Test" />);
      
      const locationImage = screen.getByAltText('Location');
      expect(locationImage).toBeInTheDocument();
      expect(locationImage).toHaveAttribute('src', '/assets/images/icons/location.svg');
      expect(locationImage).toHaveClass('block', 'md:hidden');
    });

    it('renders trustpilot icon', () => {
      render(<FeatureHeader trustpilotText="Test" />);
      
      const trustpilotImage = screen.getByAltText('Trustpilot');
      expect(trustpilotImage).toBeInTheDocument();
      expect(trustpilotImage).toHaveAttribute('src', '/assets/images/icons/trustpilot.svg');
      expect(trustpilotImage).toHaveClass('!w-4');
    });
  });

  describe('Styling', () => {
    it('applies correct container classes', () => {
      const { container } = render(<FeatureHeader trustpilotText="Test" />);
      
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass('w-full', 'bg-[#F3E7D7]');
    });

    it('applies correct inner container classes', () => {
      const { container } = render(<FeatureHeader trustpilotText="Test" />);
      
      const innerContainer = container.querySelector('.max-w-5xl');
      expect(innerContainer).toHaveClass('mx-auto', 'max-w-5xl', 'px-4');
    });

    it('applies correct flex container classes', () => {
      const { container } = render(<FeatureHeader trustpilotText="Test" />);
      
      const flexContainer = container.querySelector('.flex.justify-between');
      expect(flexContainer).toHaveClass('w-full', 'flex', 'justify-between', 'py-3', 'px-2');
    });
  });

  describe('Responsive Behavior', () => {
    it('hides phone icon on desktop', () => {
      render(<FeatureHeader trustpilotText="Test" />);
      
      const phoneImage = screen.getByAltText('Phone');
      expect(phoneImage).toHaveClass('md:hidden');
    });

    it('hides location icon on desktop', () => {
      render(<FeatureHeader trustpilotText="Test" />);
      
      const locationImage = screen.getByAltText('Location');
      expect(locationImage).toHaveClass('md:hidden');
    });

    it('shows static text on desktop only', () => {
      render(<FeatureHeader trustpilotText="Test" />);
      
      const guaranteeText = screen.getByText('100% money back guarantee');
      expect(guaranteeText).toHaveClass('md:block', 'hidden');
      
      const diamondsText = screen.getByText('Fairly Priced Diamonds');
      expect(diamondsText).toHaveClass('md:block', 'hidden');
    });
  });
});
