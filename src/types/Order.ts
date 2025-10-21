export interface Order {
    id: string
    userId: number
    items: {
        id: string
        title: string
        price: number
        quantity: number
        image?: string
    }[];
    total: number
    createdAt: Date | { seconds: number; nanoseconds: number}
}