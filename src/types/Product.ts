export interface Product {
    id: string
    title: string
    price: number
    description: string
    category: string
    image: string
    createdAt?: Date
    updatedAt?: Date
    rating: {
        rate: number
        count: number
    }
}