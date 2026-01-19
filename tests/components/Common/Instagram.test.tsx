import { render, screen, waitFor } from '@testing-library/react';
import Instagram from '~/components/Common/Instagram';

// Mock Hydrogen Image component
jest.mock('@shopify/hydrogen', () => ({
  Image: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

describe('Instagram Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (globalThis as any).fetch = jest.fn();
  });

  const mockInstagramResponse = {
    data: [
      {
        id: '1',
        link: 'https://instagram.com/p/1',
        images: {
          standard_resolution: {
            url: 'https://cdn.instagram.com/image1.jpg',
          },
        },
        alt: 'Post 1',
      },
      {
        id: '18166609282334512', // excluded ID
        link: 'https://instagram.com/p/excluded',
        images: {
          standard_resolution: {
            url: 'https://cdn.instagram.com/excluded.jpg',
          },
        },
        alt: 'Excluded Post',
      },
      {
        id: '2',
        permalink: 'https://instagram.com/p/2',
        media_url: 'https://cdn.instagram.com/image2.jpg',
        alt: 'Post 2',
      },
    ],
  };

  it('shows loading state initially', () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockInstagramResponse,
    });

    render(<Instagram />);

    expect(screen.getByText('Loading Feed...')).toBeInTheDocument();
  });

  it('renders instagram posts after fetch', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockInstagramResponse,
    });

    render(<Instagram />);

    await waitFor(() => {
      expect(screen.queryByText('Loading Feed...')).not.toBeInTheDocument();
    });

    // Heading
    expect(screen.getByText('@abelinijewellery')).toBeInTheDocument();

    // Images: 1 Instagram icon + 2 feed images
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(3);
  });

  it('filters out excluded Instagram IDs', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockInstagramResponse,
    });

    render(<Instagram />);

    await waitFor(() => {
      expect(screen.getAllByRole('link').length).toBe(2);
    });

    expect(
      screen.queryByAltText('Excluded Post')
    ).not.toBeInTheDocument();
  });

  it('limits feed to a maximum of 6 items', async () => {
    const largeFeed = {
      data: Array.from({ length: 10 }).map((_, i) => ({
        id: `${i}`,
        link: `https://instagram.com/p/${i}`,
        media_url: `https://cdn.instagram.com/${i}.jpg`,
        alt: `Post ${i}`,
      })),
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => largeFeed,
    });

    render(<Instagram />);

    await waitFor(() => {
      expect(screen.getAllByRole('link').length).toBe(6);
    });
  });

  it('renders nothing when feed is empty', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ data: [] }),
    });

    const { container } = render(<Instagram />);

    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });

  it('handles fetch errors gracefully', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));

    const { container } = render(<Instagram />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    expect(container.firstChild).toBeNull();

    consoleSpy.mockRestore();
  });
});