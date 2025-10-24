import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { addToCart } from '../features/cartSlice';
import ProductCard from '../components/ProductCard';

const mockProduct = {
  id: 'abc123',
  title: 'Stacked Hoodie',
  price: 49.99,
  rating: { rate: 4.5, count: 120 },
  description: 'Premium cotton hoodie with stacked logo',
  category: 'Apparel',
  image: 'https://via.placeholder.com/150',
};

test('cart state updates when product is added', () => {
  const store = configureStore({
    reducer: { cart: cartReducer },
    preloadedState: { cart: { items: [] } },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <ProductCard
          {...mockProduct}
          viewMode="grid"
          onAddToCart={(product) => {
            store.dispatch(addToCart({ ...product, quantity: 1 }));
          }}
        />
      </MemoryRouter>
    </Provider>
  );

  fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

  const state = store.getState();
  expect(state.cart.items).toHaveLength(1);
  expect(state.cart.items[0]).toMatchObject({
    id: 'abc123',
    title: 'Stacked Hoodie',
    quantity: 1,
  });
});

