import { render, screen } from '@testing-library/react';
import WhyAbeliniSection from '~/components/Homepage/WhyAbeliniSection';

jest.mock('~/components/Homepage/Data/homepage.data', () => ({
  supportIcons: [
    { id: 1, name: 'Assay Office London', image: '/assets/images/why_abelini/assay_office_london_logo_230x90.webp' },
    { id: 2, name: 'Assay Assured', image: '/assets/images/why_abelini/assay_assured_230x90.webp' },
    { id: 3, name: 'Stop Blood Diamonds', image: '/assets/images/why_abelini/stop_blood_icon_230x90.webp' },
    { id: 4, name: 'The National Association of Jewellers', image: '/assets/images/why_abelini/the_national_icon_230x90.webp' },
    { id: 5, name: 'GIA', image: '/assets/images/why_abelini/gia_logo_230x90.webp' },
  ],
}));

describe('WhyAbeliniSection', () => {
  it('renders the Why Abelini heading', () => {
    render(<WhyAbeliniSection />);
    const heading = screen.getByRole('heading', { name: /Why Abelini/i });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  it('shows the value proposition text', () => {
    render(<WhyAbeliniSection />);
    expect(screen.getByText(/It's easy to lose sight of what value really means/i)).toBeInTheDocument();
    expect(screen.getByText(/can save up to 70%/i)).toBeInTheDocument();
  });

  it('has a Learn more link to about-us page', () => {
    render(<WhyAbeliniSection />);
    const link = screen.getByRole('link', { name: /Learn more/i });
    expect(link).toHaveAttribute('href', '/about-us');
  });

  it('displays arrow icon with Learn more link', () => {
    render(<WhyAbeliniSection />);
    const arrow = screen.getByRole('img', { name: /Arrow Right/i });
    expect(arrow).toHaveAttribute('src', '/assets/images/icons/arrow-right.svg');
  });

  it('renders all support icons with correct alt text and images', () => {
    render(<WhyAbeliniSection />);
    
    expect(screen.getByRole('img', { name: 'Assay Office London' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Assay Assured' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Stop Blood Diamonds' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'The National Association of Jewellers' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'GIA' })).toBeInTheDocument();
  });

  it('sets correct width and height for support icons', () => {
    render(<WhyAbeliniSection />);
    const supportIcons = screen.getAllByRole('img').filter(img => 
      img.getAttribute('alt')?.includes('Assay') || 
      img.getAttribute('alt')?.includes('Stop') || 
      img.getAttribute('alt')?.includes('National') || 
      img.getAttribute('alt') === 'GIA'
    );
    
    supportIcons.forEach(icon => {
      expect(icon).toHaveAttribute('width', '230');
      expect(icon).toHaveAttribute('height', '90');
    });
  });
});
