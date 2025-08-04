// Firebase v10 Configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7CpErf98utaNmXfXyJGK_YY9JY0f7jSY",
    authDomain: "nyikarisanawebsite-html.firebaseapp.com",
    projectId: "nyikarisanawebsite-html",
    storageBucket: "nyikarisanawebsite-html.firebasestorage.app",
    messagingSenderId: "454911232732",
    appId: "1:454911232732:web:84a2540f5f342c06fd8219",
    measurementId: "G-KN4N9FW2H1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Export the app instance for other modules
export default app;

console.log('Firebase initialized successfully');
