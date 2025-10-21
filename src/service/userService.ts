import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';

export const createUserProfile = async (uid: string, data: object) => {
  await setDoc(doc(db, 'users', uid), data);
};

export const getUserProfile = async (uid: string) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
};

export const deleteUserProfile = async (uid: string) => {
  await deleteDoc(doc(db, 'users', uid));
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user to delete');
  await deleteUser(user); // requires re-authentication if session is old
};

export const updateUserProfile = async (uid: string, updatedData: object) => {
  await updateDoc(doc(db, 'users', uid), {
    ...updatedData,
    updatedAt: new Date(),
  });
};
