import { render, screen, fireEvent } from '@testing-library/react';
import ProductControls from '../components/ProductControls';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import React from 'react';

test('calls onViewToggle with correct view mode when buttons are clicked', () => {
  const mockToggle = jest.fn();

  render(
    <MemoryRouter>
      <ProductControls
        onSortChange={() => {}}
        onCategoryChange={() => {}}
        onViewToggle={mockToggle}
        categories={['hoodies', 'tees']}
        selectedCategory="hoodies"
      />
    </MemoryRouter>
  );

  const gridButton = screen.getByRole('button', { name: /grid/i });
  const listButton = screen.getByRole('button', { name: /list/i });

  fireEvent.click(gridButton);
  expect(mockToggle).toHaveBeenCalledWith('grid');

  fireEvent.click(listButton);
  expect(mockToggle).toHaveBeenCalledWith('list');
});
