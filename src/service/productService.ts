import { db } from '../firebaseConfig';
import { collection, doc, setDoc, updateDoc, deleteDoc, } from 'firebase/firestore';

export const createProduct = async (uid: string, productData: object) => {
  const productRef = doc(collection(db, 'products'));
  await setDoc(productRef, {
    ...productData,
    owner: uid,
    createdAt: new Date(),
    id: productRef.id,
  });
};

export const updateProduct = async (productId: string, updatedData: object) => {
  const productRef = doc(db, 'products', productId);
  await updateDoc(productRef, {
    ...updatedData,
    updatedAt: new Date(),
  });
};

export const deleteProduct = async (productId: string) => {
  await deleteDoc(doc(db, 'products', productId));
};

