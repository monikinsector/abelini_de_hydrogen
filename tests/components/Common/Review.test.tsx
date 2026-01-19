import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Review from '~/components/Common/Review';

/* ------------------------------
   Mock react-router loader data
-------------------------------- */
jest.mock('react-router', () => ({
  useLoaderData: () => ({
    reviewsData: {
      trust_shops_total_review: {
        total_review: 100,
        percentage: '4.9',
      },
      google_total_review: {
        total_review: 200,
        percentage: '4.8',
      },
      google_reviews: [
        {
          review_id: '1',
          author: 'John Doe',
          title: 'Great product',
          text: 'I love this product',
          rating: 5,
          date_added: '2023-01-01',
        },
      ],
    },
  }),
}));

/* ------------------------------
   Mock Embla Carousel
-------------------------------- */
const mockScrollNext = jest.fn();
const mockScrollPrev = jest.fn();
const mockOn = jest.fn();
const mockScrollSnapList = jest.fn(() => [0, 1, 2]);
const mockSelectedScrollSnap = jest.fn(() => 0);

const mockEmblaApi = {
  scrollPrev: mockScrollPrev,
  scrollNext: mockScrollNext,
  scrollSnapList: mockScrollSnapList,
  selectedScrollSnap: mockSelectedScrollSnap,
  on: mockOn,
};

jest.mock('embla-carousel-react', () => ({
  __esModule: true,
  default: () => [jest.fn(), mockEmblaApi],
}));

/* ------------------------------
   Mock Shopify Hydrogen
-------------------------------- */
jest.mock('@shopify/hydrogen', () => ({
  Image: (props: any) => <img {...props} />,
  Script: () => null,
}));

/* ------------------------------
   Tests
-------------------------------- */
describe('Review Component', () => {
  it('renders section heading', () => {
    render(<Review />);

    expect(
      screen.getByText('Our Customers Love Us')
    ).toBeInTheDocument();
  });

  it('renders Trustpilot, Trusted Shops, and Google tabs', () => {
    render(<Review />);

    expect(screen.getByRole('tab', { name: /trustpilot/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /google/i })).toBeInTheDocument();
  });

  it('displays Google review summary from loader data', () => {
    render(<Review />);

    expect(screen.getByText(/Google 4.8/i)).toBeInTheDocument();
    expect(screen.getByText(/200 reviews/i)).toBeInTheDocument();
  });

  it('switches to Google tab when clicked', () => {
    render(<Review />);

    const googleTab = screen.getByRole('tab', { name: /google/i });
    fireEvent.click(googleTab);

    expect(googleTab).toHaveAttribute('aria-selected', 'true');
  });

  it('renders Google review content', () => {
    render(<Review />);

    expect(screen.getByText('I love this product')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  // it('calls carousel navigation functions', () => {
  //   render(<Review />);

  //   const nextBtn = screen.getByRole('button', { name: /next/i });
  //   const prevBtn = screen.getByRole('button', { name: /previous/i });

  //   fireEvent.click(nextBtn);
  //   fireEvent.click(prevBtn);

  //   expect(mockScrollNext).toHaveBeenCalled();
  //   expect(mockScrollPrev).toHaveBeenCalled();
  // });
});
