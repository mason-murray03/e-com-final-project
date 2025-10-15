import ProductControls from '../components/ProductControls'
import ProductGrid from '../components/ProductGrid'
import { useState, useEffect } from 'react'
import type { Product } from '../types/Product'
import { useQuery } from '@tanstack/react-query'
import { useCart } from '../features/useCart'

const HomePage = () => {
    const [sort, setSort] = useState('default')
    const [category, setCategory] = useState('all')
    const [view, setView] = useState<'grid' | 'list'>('grid')
    const {addItem} = useCart()
    const [shouldScrollToProducts, setShouldScrollToProducts] = useState(false)

    const handleAddToCart = (product: Product) => {
        const cartItem = { ...product, quantity: 1 }
        addItem(cartItem)
    }
   
    const fetchCategories = async (): Promise<string[]> => {
        const response = await fetch('https://fakestoreapi.com/products/categories')
        if (!response.ok) throw new Error('Failed to fetch products')
            return response.json()
    }

    const fetchProductsByCategory = async (): Promise<Product[]> => {
        const url = 
            category === 'all'
                ? 'https://fakestoreapi.com/products'
                : `https://fakestoreapi.com/products/category/${category}`

        const response = await fetch(url)
        if (!response.ok) throw new Error('Failed to fetch products')
        return response.json()
    }

    const { data: categories = [], isLoading: loadingCategories} =useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    })

    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['products', category],
        queryFn: fetchProductsByCategory,
    })

    const handleCategoryChange = (value: string) => {
        setCategory(value)
        setShouldScrollToProducts(true)
        setTimeout(() => {
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
        })
    }

    useEffect(() => {
        if (shouldScrollToProducts) {
            const el = document.getElementById('products')
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' })
                setShouldScrollToProducts(false)
            }
        }
    }, [products, shouldScrollToProducts])

    if (isLoading || loadingCategories) return <div>Loading...</div>
    if (error instanceof Error) return <div>Error: {error.message}</div>

     const filteredProducts = products.sort((a: Product, b: Product) => {
        switch (sort) {
        case 'price-asc':
            return a.price - b.price;
        case 'price-desc':
            return b.price - a.price;
        case 'rating-asc':
            return a.rating.rate - b.rating.rate;
        case 'rating-desc':
            return b.rating.rate - a.rating.rate;
        default:
            return 0;
        }
    });

    return (
        <div>
            <div id='stackedGoodsCarousel' className='carousel slide' data-bs-ride='carousel'>
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <img src='../src/assets/carousel-clothing.png' className='d-block w-100' alt='Slide 1' />
                    </div>
                    <div className='carousel-item'>
                        <img src='../src/assets/carousel-electronics.png' className='d-block w-100' alt='Slide 2' />
                    </div>
                    <div className='carousel-item'>
                        <img src='../src/assets/carousel-shoes.png' className='d-block w-100' alt='Slide 3' />
                    </div>
                </div>

                <button className='carousel-control-prev' type='button' data-bs-target='#stackedGoodsCarousel' data-bs-slide='prev'>
                    <span className='carousel-control-prev-icon' aria-hidden='true'> </span>
                    <span className='visually-hidden'>⬅</span>
                </button>
                <button className='carousel-control-next' type='button' data-bs-target='#stackedGoodsCarousel' data-bs-slide='next'>
                    <span className='carousel-control-next-icon' aria-hidden='true'> </span>
                    <span className='visually-hidden'>➡</span>
                </button>
            </div>
            <div id='products'>
                <ProductControls onSortChange={setSort} onCategoryChange={handleCategoryChange} onViewToggle={setView} categories={categories} selectedCategory={category}/>
                <ProductGrid products={filteredProducts} viewMode={view} onAddToCart={handleAddToCart}/>
            </div>
        </div>
    )
}


export default HomePage