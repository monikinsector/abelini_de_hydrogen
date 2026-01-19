import { render, screen } from '@testing-library/react';
import OurStore from '~/components/Homepage/OurStore';
import type { StoreLocation } from '~/components/Homepage/Data/homepage.data';

// Mock the data file to test component behavior, not specific data values
// Define mock data once using a function (hoisted) to avoid duplication
function getMockStoreLocations(): StoreLocation[] {
  return [
    {
      id: 1,
      image: "/assets/images/uk.png",
      address: "Abelini Ltd,14 St Cross Street,Hatton Garden, London, EC1N 8UN",
      country: "United Kingdom",
      link: "/",
      isLaunched: true,
    },
    {
      id: 2,
      image: "/assets/images/australia.png",
      address: "Abelini Pty Ltd Suite 804,365 Little Collins Street,Melbourne,VIC 3000",
      country: "Australia",
      link: "/",
      isLaunched: true,
    },
    {
      id: 3,
      image: "/assets/images/germany.png",
      address: "Coming soon",
      country: "Germany",
      link: "/",
      isLaunched: false,
    },
  ];
}

jest.mock('~/components/Homepage/Data/homepage.data', () => ({
  storeLocations: getMockStoreLocations(),
}));

describe('OurStore', () => {
  const mockStoreLocations = getMockStoreLocations();

  beforeEach(() => {
    render(<OurStore />);
  });

  it('renders the Our Stores heading with correct tag', () => {
    const heading = screen.getByRole('heading', { name: /Our Stores/i });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  it('displays the descriptive paragraph text', () => {
    expect(screen.getByText(/Across our global showrooms/i)).toBeInTheDocument();
    expect(screen.getByText(/crafted with precision/i)).toBeInTheDocument();
  });

  it('renders all store country names', () => {
    mockStoreLocations.forEach((store) => {
      expect(screen.getByText(store.country)).toBeInTheDocument();
    });
  });

  it('displays all store addresses', () => {
    mockStoreLocations.forEach((store) => {
      expect(screen.getByText(store.address)).toBeInTheDocument();
    });
  });

  it('renders store country flag images with correct attributes', () => {
    mockStoreLocations.forEach((store) => {
      const image = screen.getByRole('img', { name: store.country });
      expect(image).toHaveAttribute('src', store.image);
      expect(image).toHaveAttribute('alt', store.country);
      expect(image).toHaveAttribute('width', '48');
    });
  });

  it('renders Book An Appointment button for launched stores', () => {
    const launchedStores = mockStoreLocations.filter((store) => store.isLaunched);
    const appointmentButtons = screen.getAllByRole('link', { name: /Book An Appointment/i });
    
    expect(appointmentButtons).toHaveLength(launchedStores.length);
    appointmentButtons.forEach((button) => {
      expect(button).toHaveAttribute('href', '/');
    });
  });

  it('renders Launching Soon button for non-launched stores', () => {
    const nonLaunchedStores = mockStoreLocations.filter((store) => !store.isLaunched);
    const launchingSoonButtons = screen.getAllByRole('link', { name: /Launching Soon/i });
    
    expect(launchingSoonButtons).toHaveLength(nonLaunchedStores.length);
    launchingSoonButtons.forEach((button) => {
      expect(button).toHaveAttribute('href', '/');
    });
  });

  it('renders Rutvi image with correct attributes', () => {
    const rutviImage = screen.getByRole('img', { name: /Rutvi Image/i });
    expect(rutviImage).toBeInTheDocument();
    expect(rutviImage).toHaveAttribute('src', '/assets/images/rutvi_img.jpg');
    expect(rutviImage).toHaveAttribute('alt', 'Rutvi Image');
  });

  it('renders section element', () => {
    const section = screen.getByRole('heading', { name: /Our Stores/i }).closest('section');
    expect(section).toBeInTheDocument();
  });
});
