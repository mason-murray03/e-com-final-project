import { useCart } from '../features/useCart';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../types/useAuth';
import { createOrder } from '../service/orderService';

const OrderSummaryPage = () => {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth()

  const handlePlaceOrder = async () => {
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (!user?.uid) {
      alert('Yuo must be logged in to place an order.')
      return
    }

    try {
      await createOrder(user.uid, items, totalPrice);
      clear(); // clears Redux cart
      localStorage.removeItem('cart'); // clears persisted cart
      alert('✅ Order placed!');
      navigate('/orders'); // or '/account'
    } catch (err) {
      console.error('Order placement failed:', err);
      alert('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <div className='container py-5'>
      <h2 className='mb-4'>📦 Order Summary</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map(item => (
            <div key={item.id} className='d-flex align-items-center border rounded p-3 mb-3 shadow-sm'>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                className='me-4'
              />
              <div className='flex-grow-1'>
                <h5 className='mb-1'>{item.title}</h5>
                <div className='text-muted small'>{item.category}</div>
                <div className='mt-2'>
                  <span className='fw-bold'>${item.price.toFixed(2)}</span> × {item.quantity}
                </div>
              </div>
              <div className='text-end'>
                <div className='fw-bold fs-5'>${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            </div>
          ))}

          <div className='d-flex justify-content-between align-items-center mt-4'>
            <h3>Total: ${total.toFixed(2)}</h3>
            <Button variant='primary' size='lg' onClick={() => navigate('/cart')}>🛒 Edit Cart</Button>
            <Button variant='success' size='lg' onClick={handlePlaceOrder}>🛍️ Place Order</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummaryPage;
