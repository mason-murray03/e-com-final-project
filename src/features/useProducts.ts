import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Product } from "../types/Product";
const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
}

export const useProducts = () => {
    return useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });
}