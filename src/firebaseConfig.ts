import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFaZExtaRq-T6x-ixd-1Q4Kh-HLPF6JFQ",
  authDomain: "stacked-goods.firebaseapp.com",
  projectId: "stacked-goods",
  storageBucket: "stacked-goods.firebasestorage.app",
  messagingSenderId: "547905898251",
  appId: "1:547905898251:web:d4ac6b9e648dd1e711c40e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)