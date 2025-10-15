import type {CartItem} from './Cart'

export interface Order {
    id: number
    userId: number
    items: CartItem[]
    total: number
    createdAt: string
}