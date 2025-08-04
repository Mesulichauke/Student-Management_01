// Firebase v10 Configuration with improved error handling
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { getAuth, connectAuthEmulator } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
import { getFirestore, connectFirestoreEmulator } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';
import { getStorage, connectStorageEmulator } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js';

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
let app;
let auth;
let db;
let storage;

try {
    app = initializeApp(firebaseConfig);
    
    // Initialize Firebase services with error handling
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
    // Set auth settings for better reliability
    auth.settings = {
        appVerificationDisabledForTesting: false
    };
    
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization error:', error);
    // Fallback initialization attempt
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
        storage = getStorage(app);
        console.log('Firebase initialized on retry');
    } catch (retryError) {
        console.error('Firebase retry initialization failed:', retryError);
    }
}

// Export Firebase services
export { auth, db, storage };

// Export the app instance for other modules
export default app;
