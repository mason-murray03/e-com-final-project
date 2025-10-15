import { useCart } from '../features/useCart'
import { Button, Table, Form } from 'react-bootstrap'
import type { CartItem } from '../types/Cart'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
    const { items, updateItemQuantity, removeItem } = useCart()
    const navigate = useNavigate()
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div className='container py-5'>
            <h2 className='my-4'>🛒 Your Cart</h2>

            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <Table bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item: CartItem) => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        <Form.Control
                                            type='number'
                                            value={item.quantity}
                                            onChange={(e) => updateItemQuantity(item.id, Number(e.target.value))}
                                        />
                                    </td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <Button variant='danger' onClick={() => removeItem(item.id)}>
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className='d-flex justify-content-between align-items-center mt-4'>
                            <h3 className='my-4'>Total: ${totalPrice.toFixed(2)}</h3>
                            <div className='d-flex gap-3'>
                                <Button variant='secondary' href='/'>Keep Shopping</Button>
                                <Button variant='primary' size='lg' onClick={() => navigate('/order')}>Proceed to Checkout</Button>
                            </div>
                    </div> 
                </>
            )}
        </div>
    )
}

export default CartPage