import { useAppSelector, useAppDispatch } from '../app/hooks'
import { placeOrder, clearOrders } from './orderSlice'
import type { CartItem } from '../types/Cart'

export const useOrder = () => {
    const dispatch = useAppDispatch()
    const history = useAppSelector(state => state.orders.history)

    const createOrder = (items: CartItem[], userId: number) => {
        dispatch(placeOrder({ items, userId }))
    }

    const clear = () => dispatch(clearOrders())

    const lastOrder = history[history.length - 1] || null
    return { history, createOrder, clear, lastOrder }
}