import { useState } from 'react'
import { Link } from 'react-router-dom';

interface ProductControlsProps {
    onSortChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onViewToggle: (view: 'grid' | 'list') => void;
    categories: string[];
    selectedCategory: string;
}

const ProductControls = ({ onSortChange, onCategoryChange, onViewToggle, categories, selectedCategory }: ProductControlsProps) => {
    const [sort, setSort] = useState('default')

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSort(value)
        onSortChange(value)
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        onCategoryChange(value)
    }

    return (
        <div className='d-flex justify-content-between align-items-center my-4 flex-wrap gap-3'>
            <select className='form-select w-auto' value={sort} onChange={handleSortChange}>
                <option value='default'>Sort: Default</option>
                <option value='price-asc'>Price: Low to high</option>
                <option value='price-desc'>Price: High to Low</option>
                <option value='rating-asc'>Rating: Low to High</option>
                <option value='rating-desc'>Rating: High to Low</option>
            </select>

            <select className='form-select w-auto' value={selectedCategory} onChange={handleCategoryChange}>
                <option value='all'>All Categories</option>
                {categories.map((cat) => {
                    if (!cat) return null

                    const label = cat.charAt(0).toUpperCase() + cat.slice(1)
                    return (
                        <option key={cat} value={cat}>{label}</option>
                    )
                })}
            </select>

            <div className='btn-group' role='group'>
                <button className='btn btn-outline-primary' onClick={() => onViewToggle('grid')}>Grid</button>
                <button className='btn btn-outline-primary' onClick={() => onViewToggle('list')}>List</button>
            </div>

            <Link to='/products/create' className='btn btn-primary'>+ Add Product</Link>
        </div>
    )
}

export default ProductControls