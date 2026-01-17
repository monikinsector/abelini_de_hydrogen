import '@testing-library/jest-dom';
import React from 'react';

// Mock react-router Link component
jest.mock('react-router', () => ({
  Link: ({ to, children, className, id, ...props }: any) => (
    React.createElement('a', { href: to, className, ...props }, children)
  ),
}));

// Mock Shopify Hydrogen Image component
jest.mock('@shopify/hydrogen', () => ({
  Image: ({ src, alt, className, width, height, ...props }: any) => (
    React.createElement('img', { 
      src, 
      alt, 
      className, 
      width, 
      height, 
      ...props 
    })
  ),
}));