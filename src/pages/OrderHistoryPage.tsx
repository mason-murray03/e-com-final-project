import { useEffect, useState } from 'react';
import { getUserOrders, deleteOrder } from '../service/orderService';
import { useAuth } from '../types/useAuth';
import { Link } from 'react-router-dom';
import type { Order } from '../types/Order';
import { Button } from 'react-bootstrap';

export default function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user?.uid) return

    const fetchOrders = async () => {
      const data = await getUserOrders(user.uid);
      setOrders(data as Order[]);
    };
    fetchOrders();
  }, [user]);

  const handleDelete = async (orderId: string) => {
    const confirm = window.confirm('Are you sure you want to delete this order?')
    if(!confirm) return

    try {
      await deleteOrder(orderId)
      setOrders(prev => prev.filter(order => order.id !== orderId))
      alert('Order deleted')
    } catch (err) {
      console.error('Delete failed:', err)
      alert('Failed to delete order.')
    } 
  }

  return (
    <div className='container py-4'>
      <h2>Your Orders</h2>
      {orders.map(order => (
        <div key={order.id} className='border p-3 mb-3 rounded'>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Date:</strong> {new Date(typeof order.createdAt === 'object' && 'seconds' in order.createdAt ? order.createdAt.seconds * 1000 : order.createdAt).toLocaleString()}</p>
          <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
          <div className='d-flex justify-content-between align-items-center'>
            <Link to={`/orders/${order.id}`} className='btn btn-outline-primary'>View Details</Link>
            <Button variant='danger'onClick={() => handleDelete(order.id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
