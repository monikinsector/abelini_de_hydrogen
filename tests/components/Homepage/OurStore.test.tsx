import { render, screen } from '@testing-library/react';
import OurStore from '~/components/Homepage/OurStore';

// Mock the data file to test component behavior, not specific data values
// Define mock data locally for use in tests (do not import from data file)
const mockStoreLocations = [
  {
    id: 1,
    image: "/assets/images/uk.png",
    address: "Abelini Ltd,14 St Cross Street,Hatton Garden, London, EC1N 8UN",
    country: "United Kingdom",
    link: "/",
    isLaunched: true
  },
  {
    id: 2,
    image: "/assets/images/australia.png",
    address: "Abelini Pty Ltd Suite 804,365 Little Collins Street,Melbourne,VIC 3000",
    country: "Australia",
    link: "/",
    isLaunched: true
  },
  {
    id: 3,
    image: "/assets/images/germany.png",
    address: "Coming soon",
    country: "Germany",
    link: "/",
    isLaunched: false
  },
];

describe('OurStore', () => {
  it('renders the Our Stores heading', () => {
    render(<OurStore />);
    const heading = screen.getByRole('heading', { name: /Our Stores/i });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  it('displays the descriptive paragraph', () => {
    render(<OurStore />);
    expect(screen.getByText(/Across our global showrooms/i)).toBeInTheDocument();
    expect(screen.getByText(/crafted with precision/i)).toBeInTheDocument();
    
  });

  it('renders all store locations', () => {
    render(<OurStore />);
    
    mockStoreLocations.forEach((store) => {
      expect(screen.getByText(store.country)).toBeInTheDocument();
    });
  });

  it('displays store addresses', () => {
    render(<OurStore />);
    
    mockStoreLocations.forEach((store) => {
      expect(screen.getByText(store.address)).toBeInTheDocument();
    });
  });

  it('renders store country flag images', () => {
    render(<OurStore />);
    
    mockStoreLocations.forEach((store) => {
      const image = screen.getByRole('img', { name: store.country });
      expect(image).toHaveAttribute('src', store.image);
      expect(image).toHaveAttribute('alt', store.country);
      expect(image).toHaveAttribute('width', '48');
    });
  });

  it('renders Book An Appointment button for launched stores', () => {
    render(<OurStore />);
    
    const launchedStores = mockStoreLocations.filter(store => store.isLaunched);
    const appointmentButtons = screen.getAllByRole('link', { name: /Book An Appointment/i });
    expect(appointmentButtons.length).toBe(launchedStores.length);
    appointmentButtons.forEach((button) => {
      const expectedLink = launchedStores[0].link; // All stores have the same link value
      expect(button).toHaveAttribute('href', expectedLink);
    });
  });

  it('renders Launching Soon button for non-launched stores', () => {
    render(<OurStore />);
    
    const nonLaunchedStores = mockStoreLocations.filter(store => !store.isLaunched);
    const launchingSoonButtons = screen.getAllByRole('link', { name: /Launching Soon/i });
    expect(launchingSoonButtons.length).toBe(nonLaunchedStores.length);
    launchingSoonButtons.forEach((button) => {
      const expectedLink = nonLaunchedStores[0].link; // All stores have the same link value
      expect(button).toHaveAttribute('href', expectedLink);
    });
  });

  it('renders Rutvi image', () => {
    render(<OurStore />);
    const rutviImage = screen.getByRole('img', { name: /Rutvi Image/i });
    expect(rutviImage).toBeInTheDocument();
    expect(rutviImage).toHaveAttribute('src', '/assets/images/rutvi_img.jpg');
    expect(rutviImage).toHaveAttribute('alt', 'Rutvi Image');
  });

  it('renders section element', () => {
    const { container } = render(<OurStore />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});
