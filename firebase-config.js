// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbSZRvUsFuepNW8W2D5x-5EwHEE_O2UdE",
  authDomain: "aixynztestseries-fc5da.firebaseapp.com",
  projectId: "aixynztestseries-fc5da",
  storageBucket: "aixynztestseries-fc5da.firebasestorage.app",
  messagingSenderId: "354795848617",
  appId: "1:354795848617:web:ab50b9095256b6febbfab8",
  measurementId: "G-100C6XRQH1"
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { app, auth, db, storage, analytics };
