import React from "react";
import { Container, Row, Col } from 'react-bootstrap'
import ProductCard from './ProductCard'
import type { Product } from "../types/Product";

interface ProductGridProps {
    products: Product[]
    viewMode: 'grid' | 'list'
    onAddToCart: (product: Product) => void
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, viewMode, onAddToCart }) => {
    return (
        <Container fluid className='py-4'>
            <Row className='g-4'>
                {products.map((product: Product, index: number) => (
                    <Col key={product.id || index} xs={12} sm={viewMode === 'list'? 12 : 6} md={viewMode === 'list' ? 12 : 4} lg={viewMode === 'list' ? 12 : 3}>
                        <ProductCard {...product} viewMode={viewMode} onAddToCart={onAddToCart} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default ProductGrid