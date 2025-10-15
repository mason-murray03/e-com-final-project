import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import type { CartItem } from "../types/Cart";
import { addToCart, clearCart, removeFromCart, updateQuantity } from "./cartSlice";

export const useCart = () => {
    const dispatch = useDispatch()
    const items = useAppSelector(state => state.cart.items)
    const addItem = (item: CartItem) => dispatch(addToCart(item))
    const removeItem = (id: number) => dispatch(removeFromCart(id))
    const updateItemQuantity = (id: number, quantity: number) => dispatch(updateQuantity({id, quantity}))
    const clear = () => dispatch(clearCart())
    const total = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)

    return { items, total, addItem, removeItem, updateItemQuantity, clear}
}