import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase configuration - REAL KEYS
const firebaseConfig = {
  apiKey: "AIzaSyCVz6HO-I3Rd-Sh5r5_tgIr1qqSX9DNCw8",
  authDomain: "prayanmasale.firebaseapp.com",
  projectId: "prayanmasale",
  storageBucket: "prayanmasale.firebasestorage.app",
  messagingSenderId: "1004240730582",
  appId: "1:1004240730582:web:1823850a1c2bed9425cc77",
  measurementId: "G-Y8WFB72MS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;