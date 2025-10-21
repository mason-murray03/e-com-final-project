import { db } from '../firebaseConfig';
import { collection, doc, setDoc, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import type { CartItem } from '../types/Cart';
import type { Order } from '../types/Order';

export const createOrder = async (uid: string, cartItems: CartItem[], total: number) => {
    const sanitizedItems = cartItems.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image ?? '',    
    }))
    
  const orderRef = doc(collection(db, 'orders'));
  await setDoc(orderRef, {
    id: orderRef.id,
    user: uid,
    items: sanitizedItems,
    total,
    createdAt: new Date(),
  });
};

export const getUserOrders = async (uid: string): Promise<Order[]> => {
  const ordersRef = collection(db, 'orders');
  const q = query(ordersRef, where('user', '==', uid));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => {
    const data = doc.data()
    return {
        id: doc.id,
        userId: data.user,
        items: data.items,
        total: data.total,
        createdAt: data.createdAt,
    }
  });
};

export const deleteOrder = async (orderId: string) => {
  const orderRef = doc(db, 'orders', orderId);
  await deleteDoc(orderRef);
};