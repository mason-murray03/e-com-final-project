import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "../types/Order";
import type { CartItem } from "../types/Cart";

interface OrderState {
    history: Order[]
}

const initialState: OrderState = {
    history: [],
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        placeOrder( state, action: PayloadAction<{ items: CartItem[]; userId: number }>) {
            const total = action.payload.items.reduce(( sum:number, item: CartItem) => sum +item.price * item.quantity, 0)

            const newOrder: Order = {
                id: Date.now().toString(),
                userId: action.payload.userId,
                items: action.payload.items,
                total,
                createdAt: new Date(),
            }

            state.history.push(newOrder)
        },
        clearOrders(state) {
            state.history = []
        },
    },
})

export const { placeOrder, clearOrders } = orderSlice.actions
export default orderSlice.reducer