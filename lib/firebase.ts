import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

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
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Analytics handles separately (client-side only)
let analytics: any = null;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, auth, storage, analytics };
