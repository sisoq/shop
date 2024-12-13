// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBiFmMXh7lChc7-AXyGf9NA-90GQ1hk80",
  authDomain: "shop-fifa.firebaseapp.com",
  projectId: "shop-fifa",
  storageBucket: "shop-fifa.firebasestorage.app",
  messagingSenderId: "1047710864451",
  appId: "1:1047710864451:web:305977be0b98f419a630f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };
