// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOk-QCZYYqPp6hRX6RUGAM_XGOIKuBT1w",
  authDomain: "codsyn.firebaseapp.com",
  projectId: "codsyn",
  storageBucket: "codsyn.firebasestorage.app",
  messagingSenderId: "331523795241",
  appId: "1:331523795241:web:3918b8b9bb02bf7c63ef38",
  measurementId: "G-06VQYQCV5B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only on client side
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export { analytics };
