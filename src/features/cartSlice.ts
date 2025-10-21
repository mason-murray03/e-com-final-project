import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../types/Cart";

const loadCartFromLocalStorage = (): CartItem[] => {
    try{
        const stored = localStorage.getItem('cart')
        return stored ? JSON.parse(stored) : []
    } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
        return []
    }
}

const saveCartToLocalStorage = (cart: CartItem[]) => {
    try {
        localStorage.setItem('cart', JSON.stringify(cart))
    } catch (error) {
        console.error('Failed to save cart to localStorage:', error)
    }
}

interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: loadCartFromLocalStorage(),
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const existing = state.items.find(item => item.id === action.payload.id)
            if (existing) {
                existing.quantity += action.payload.quantity
            } else {
                state.items.push(action.payload)
            }
            saveCartToLocalStorage(state.items)
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload)
            saveCartToLocalStorage(state.items)
        },
        updateQuantity(state, action: PayloadAction<{id: string; quantity: number}>) {
            const item = state.items.find(i => i.id === action.payload.id)
            if (item) {
                item.quantity = action.payload.quantity
            }
            saveCartToLocalStorage(state.items)
        },
        clearCart(state) {
            state.items = []
            saveCartToLocalStorage(state.items)
        },
    }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer