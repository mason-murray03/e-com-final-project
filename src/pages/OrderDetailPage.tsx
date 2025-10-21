import { useParams } from 'react-router-dom';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useEffect, useState } from 'react';
import type { Order } from '../types/Order';

export default function OrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const ref = doc(db, 'orders', orderId!);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data()
        setOrder({
            id: snap.id,
            userId: data.userId,
            total: data.total,
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(),
            items: data.items,
        })
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) return <p>Loading order...</p>;

  return (
    <div className='container py-4'>
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Date:</strong> {order.createdAt.toLocaleString()}</p>
      <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
      <h4>Items:</h4>
      <ul>
        {order.items.map((item, i) => (
          <div key={i} className='d-flex align-items-center border rounded p-3 mb-3 shadow-sm'>
            <img
              src={item.image}
              alt={item.title}
              style={{ width: '100px', height: '100px', objectFit: 'contain' }}
              className='me-4'
            />
            <div className='flex-grow-1'>
              <h5 className='mb-1'>{item.title}</h5>
              <div className='text-muted small'>${item.price.toFixed(2)} × {item.quantity}</div>
            </div>
            <div className='text-end'>
              <div className='fw-bold fs-5'>${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
