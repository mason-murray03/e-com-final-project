
import { render, screen } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

const mockProduct = {
  id: 'abc123',
  title: 'Stacked Hoodie',
  price: 49.99,
  rating: {
    rate: 4.5,
    count: 120,
  },
  viewMode: 'grid' as const,
  description: 'Premium cotton hoodie with stacked logo',
  category: "mens' clothing",
  image: 'https://via.placeholder.com/150',
  onAddToCart: jest.fn(), // mock function for testing
};


test('renders product title, price, and rating', () => {
  render( <MemoryRouter><ProductCard {...mockProduct} /></MemoryRouter> );

  expect(screen.getByText('Stacked Hoodie')).toBeInTheDocument();
  expect(screen.getByText('$49.99')).toBeInTheDocument();
  expect(screen.getByTestId('product-rating')).toHaveTextContent('⭐ 4.5 (120 reviews)');
});
