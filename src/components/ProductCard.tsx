import React from "react";
import { Button, Card } from 'react-bootstrap'
import type { Product } from "../types/Product";
import { Link } from 'react-router-dom'

interface ProductCardProps extends Product {
    viewMode: 'grid' | 'list'
    onAddToCart: (product: Product) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, image, description, rating, viewMode, onAddToCart, id, category }) => {
    return (
        <Card className={`h-100 shadow-sm border-0 ${viewMode === 'list' ? 'flex-row' : ''}`}>
            <Card.Img variant='top' src={image} alt={title} />
            <Card.Body>
                <Card.Title className='fw-bold'>{title}</Card.Title>
                <Card.Text className='text-muted'>${price ? price.toFixed(2) : 'N/A'}</Card.Text>
                <Card.Text className='small text-secondary'>{description}</Card.Text>
                <Card.Text data-testid="product-rating" className='small text-warning'>⭐ {rating?.rate ?? 'N/A'} ({rating?.count ?? 0} reviews)</Card.Text>

                <Button variant='success' onClick={() => onAddToCart({ id, title, price, image, description, rating, category })}>Add to Cart</Button>

                <Link to={`/products/${id}`} className="btn btn-primary m-3 ">View Details</Link>
            </Card.Body>
        </Card>
    )
}

export default ProductCard
