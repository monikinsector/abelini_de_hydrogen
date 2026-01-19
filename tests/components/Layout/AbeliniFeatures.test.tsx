/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

import React from 'react';
import { render, screen } from '@testing-library/react';
import AbeliniFeatures from '~/components/Category/AbeliniFeatures';
import { features } from '~/components/Category/Data/category.data';

// Mock Shopify Hydrogen Image component
jest.mock('@shopify/hydrogen', () => ({
  Image: ({ src, alt, width, ...props }: any) => (
    <img src={src} alt={alt} width={width} {...props} data-testid="hydrogen-image" />
  ),
}));

describe('AbeliniFeatures', () => {
  it('renders all features from the data file', () => {
    render(<AbeliniFeatures />);

    // Check that all feature names are rendered
    features.forEach((feature) => {
      expect(screen.getByText(feature.name)).toBeInTheDocument();
    });
  });

  it('renders the correct number of feature items', () => {
    render(<AbeliniFeatures />);

    // Get all feature text elements
    const featureElements = features.map((feature) =>
      screen.getByText(feature.name)
    );

    expect(featureElements).toHaveLength(features.length);
  });

  it('renders images for each feature', () => {
    render(<AbeliniFeatures />);

    // Check that images are rendered with correct alt text
    features.forEach((feature) => {
      const image = screen.getByAltText(feature.name);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', `/assets/images/icons/${feature.image}`);
    });
  });

  it('applies correct styling classes', () => {
    const { container } = render(<AbeliniFeatures />);

    // Check main container classes
    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass('py-4', 'mb-4', 'w-full', 'overflow-hidden');

    // Check inner scrollable container
    const scrollContainer = mainContainer.querySelector('.overflow-auto');
    expect(scrollContainer).toHaveClass(
      'overflow-auto',
      'mx-0',
      'md:mx-14',
      'flex',
      'gap-3',
      'rounded-none',
      'md:rounded-[50rem]',
      'bg-white',
      'border-1',
      'border-[#E4E4E4]'
    );
  });

  it('applies border-left to all items except the first', () => {
    const { container } = render(<AbeliniFeatures />);

    const featureItems = container.querySelectorAll('[class*="min-w-[150px]"]');

    // First item should not have border-l
    expect(featureItems[0]).not.toHaveClass('border-l-1', 'border-l-[#E4E4E4]');

    // All other items should have border-l
    for (let i = 1; i < featureItems.length; i++) {
      expect(featureItems[i]).toHaveClass('border-l-1', 'border-l-[#E4E4E4]');
    }
  });

  it('renders feature items with correct structure', () => {
    const { container } = render(<AbeliniFeatures />);

    features.forEach((feature, index) => {
      const featureItem = container.querySelectorAll('[class*="min-w-[150px]"]')[index];
      
      expect(featureItem).toBeInTheDocument();
      expect(featureItem).toHaveClass(
        'min-w-[150px]',
        'flex-1',
        'flex',
        'justify-between',
        'items-center',
        'py-3',
        'px-3'
      );

      // Check that feature name is inside the item
      expect(featureItem).toContainElement(screen.getByText(feature.name));
    });
  });

  it('renders images with correct width attribute', () => {
    render(<AbeliniFeatures />);

    const images = screen.getAllByRole('img');
    const featureImages = images.filter((img) =>
      features.some((feature) => img.getAttribute('alt') === feature.name)
    );

    featureImages.forEach((image) => {
      expect(image).toHaveAttribute('width', '20');
    });
  });

  it('has accessible structure for screen readers', () => {
    render(<AbeliniFeatures />);

    // Each feature should have descriptive alt text
    features.forEach((feature) => {
      const image = screen.getByAltText(feature.name);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('alt', feature.name);
    });
  });
});
