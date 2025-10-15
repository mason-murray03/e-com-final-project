import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ProductUIState {
    selectedCategory: string
    searchTerm: string
    sortBy: 'price-asc' | 'price-desc' | 'rating-asc' | 'rating-desc' | 'default'
    viewMode: 'grid' | 'list'
}

const initialState: ProductUIState = {
    selectedCategory: 'all',
    searchTerm: '',
    sortBy: 'default',
    viewMode: 'grid',
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setSelectedCategory(state, action: PayloadAction<string>) {
            state.selectedCategory = action.payload
        },
        setSearchTerm(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload
        },
        setSortBy(state, action: PayloadAction<ProductUIState['sortBy']>) {
            state.sortBy = action.payload
        },
        setViewMode(state, action: PayloadAction<ProductUIState['viewMode']>) {
            state.viewMode = action.payload
        },
    },
})

export const { setSelectedCategory, setSearchTerm, setSortBy, setViewMode } = productSlice.actions
export default productSlice.reducer