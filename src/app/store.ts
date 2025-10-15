import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../features/cartSlice'
import orderReducer from '../features/orderSlice'
import productReducer from '../features/productSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: orderReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;