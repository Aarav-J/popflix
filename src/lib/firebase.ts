import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC-vSm0rCxLt3BzZsMjqU_xIa85SOi9DJQ",
  authDomain: "popcornflix-b325c.firebaseapp.com",
  projectId: "popcornflix-b325c",
  storageBucket: "popcornflix-b325c.firebasestorage.app",
  messagingSenderId: "672625167561",
  appId: "1:672625167561:web:b0d97c7fb1d44d3cfc5118"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);