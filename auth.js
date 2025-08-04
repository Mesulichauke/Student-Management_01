// Authentication functionality
import { auth, db, storage } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
import { 
    doc, 
    setDoc, 
    getDoc,
    serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';
import { 
    ref, 
    uploadBytes, 
    getDownloadURL 
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js';

// DOM elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Authentication state observer
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is signed in:', user.uid);
        // Redirect based on user role
        redirectUserBasedOnRole(user.uid);
    } else {
        console.log('User is signed out');
        // User is on login page, no action needed
    }
});

// Login form handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    
    if (!email || !password) {
        showMessage('form-error', 'Please enter both email and password.');
        return;
    }
    
    showLoading();
    hideMessage('form-error');
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        showMessage('success-message', 'Login successful! Redirecting...', 'success');
        
        // Redirect will be handled by onAuthStateChanged
        
    } catch (error) {
        console.error('Login error:', error);
        let errorMessage = 'Login failed. ';
        
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage += 'No account found with this email address. Please register first.';
                break;
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                errorMessage += 'Incorrect email or password. Please check your credentials.';
                break;
            case 'auth/invalid-email':
                errorMessage += 'Invalid email address format.';
                break;
            case 'auth/too-many-requests':
                errorMessage += 'Too many failed attempts. Please try again later.';
                break;
            default:
                errorMessage += error.message;
        }
        
        showMessage('form-error', errorMessage);
    } finally {
        hideLoading();
    }
});

// Registration form handler
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        firstName: document.getElementById('register-firstname').value.trim(),
        lastName: document.getElementById('register-lastname').value.trim(),
        email: document.getElementById('register-email').value.trim(),
        password: document.getElementById('register-password').value.trim(),
        identity: document.getElementById('register-identity').value.trim(),
        phone: document.getElementById('register-phone').value.trim(),
        address: document.getElementById('register-address').value.trim(),
        role: document.getElementById('register-role').value
    };
    
    // Validation
    if (!validateRegistrationForm(formData)) {
        return;
    }
    
    showLoading();
    hideMessage('form-error');
    
    try {
        // Create user account
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        
        // Prepare user data
        const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            identity: formData.identity,
            phone: formData.phone,
            address: formData.address,
            role: formData.role,
            createdAt: serverTimestamp(),
            uid: user.uid
        };
        
        // Handle student-specific data
        if (formData.role === 'Student') {
            userData.studentId = 'STU' + Date.now().toString().slice(-6);
        }
        
        // Save user data to Firestore first (faster)
        await setDoc(doc(db, 'users', user.uid), userData);
        
        // Upload student documents in background (if student)
        if (formData.role === 'Student') {
            uploadStudentDocumentsInBackground(user.uid);
        }
        
        showMessage('success-message', 'Registration successful! Redirecting...', 'success');
        
        // Reset form
        registerForm.reset();
        document.getElementById('student-fields').classList.add('hidden');
        
        // Redirect will be handled by onAuthStateChanged
        
    } catch (error) {
        console.error('Registration error:', error);
        let errorMessage = 'Registration failed. ';
        
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage += 'An account with this email already exists.';
                break;
            case 'auth/weak-password':
                errorMessage += 'Password is too weak. Please choose a stronger password.';
                break;
            case 'auth/invalid-email':
                errorMessage += 'Invalid email address format.';
                break;
            default:
                errorMessage += error.message;
        }
        
        showMessage('form-error', errorMessage);
    } finally {
        hideLoading();
    }
});

// Validate registration form
function validateRegistrationForm(formData) {
    const { firstName, lastName, email, password, identity, phone, address, role } = formData;
    
    if (!firstName || !lastName || !email || !password || !identity || !phone || !address || !role) {
        showMessage('form-error', 'Please fill in all required fields.');
        return false;
    }
    
    if (password.length < 6) {
        showMessage('form-error', 'Password must be at least 6 characters long.');
        return false;
    }
    
    // Validate student documents if role is Student
    if (role === 'Student') {
        const idCopy = document.getElementById('student-id-copy').files[0];
        const birthCert = document.getElementById('student-birth-cert').files[0];
        const clinicCard = document.getElementById('student-clinic-card').files[0];
        
        if (!idCopy || !birthCert || !clinicCard) {
            showMessage('form-error', 'Please upload all required student documents.');
            return false;
        }
    }
    
    return true;
}

// Upload student documents to Firebase Storage
async function uploadStudentDocuments(uid) {
    const documents = {};
    const fileInputs = {
        idCopy: document.getElementById('student-id-copy'),
        birthCert: document.getElementById('student-birth-cert'),
        clinicCard: document.getElementById('student-clinic-card')
    };
    
    for (const [docType, input] of Object.entries(fileInputs)) {
        if (input.files[0]) {
            const file = input.files[0];
            const storageRef = ref(storage, `students/${uid}/documents/${docType}-${Date.now()}`);
            
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            
            documents[docType] = {
                url: downloadURL,
                fileName: file.name,
                uploadedAt: new Date().toISOString()
            };
        }
    }
    
    return documents;
}

// Upload student documents in background (non-blocking)
async function uploadStudentDocumentsInBackground(uid) {
    try {
        const documents = await uploadStudentDocuments(uid);
        
        // Update user document with file URLs
        const userDocRef = doc(db, 'users', uid);
        await setDoc(userDocRef, { documents }, { merge: true });
        
        console.log('Student documents uploaded successfully');
    } catch (error) {
        console.error('Error uploading student documents:', error);
        // Don't show error to user since this is background operation
    }
}

// Redirect user based on role
async function redirectUserBasedOnRole(uid) {
    try {
        // Wait a bit for database write to complete
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const userDoc = await getDoc(doc(db, 'users', uid));
        
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const role = userData.role;
            
            // Store user data in sessionStorage for use in other pages
            sessionStorage.setItem('currentUser', JSON.stringify(userData));
            
            setTimeout(() => {
                switch (role) {
                    case 'Student':
                        window.location.href = 'student-profile.html';
                        break;
                    case 'Teacher':
                        window.location.href = 'teacher-profile.html';
                        break;
                    case 'Parent':
                        window.location.href = 'parent-profile.html';
                        break;
                    case 'Teacher Assistant':
                        window.location.href = 'teacher-assistant-profile.html';
                        break;
                    case 'Principal':
                        window.location.href = 'principal-profile.html';
                        break;
                    case 'Admin':
                        window.location.href = 'admin-profile.html';
                        break;
                    case 'SGB':
                        window.location.href = 'sgb-profile.html';
                        break;
                    default:
                        console.error('Unknown role:', role);
                        window.location.href = 'student-profile.html';
                }
            }, 1000);
        } else {
            console.error('User document not found, retrying...');
            // Retry once after a longer delay
            setTimeout(async () => {
                try {
                    const retryDoc = await getDoc(doc(db, 'users', uid));
                    if (retryDoc.exists()) {
                        const userData = retryDoc.data();
                        sessionStorage.setItem('currentUser', JSON.stringify(userData));
                        // Redirect based on role
                        switch(userData.role) {
                            case 'Student':
                                window.location.href = 'student-profile.html';
                                break;
                            case 'Teacher':
                                window.location.href = 'teacher-profile.html';
                                break;
                            case 'Parent':
                                window.location.href = 'parent-profile.html';
                                break;
                            case 'Teacher Assistant':
                                window.location.href = 'teacher-assistant-profile.html';
                                break;
                            case 'Principal':
                                window.location.href = 'principal-profile.html';
                                break;
                            case 'Admin':
                                window.location.href = 'admin-profile.html';
                                break;
                            case 'SGB':
                                window.location.href = 'sgb-profile.html';
                                break;
                            default:
                                window.location.href = 'student-profile.html';
                        }
                    } else {
                        showMessage('form-error', 'Registration completed but profile not found. Please try logging in again.');
                    }
                } catch (retryError) {
                    console.error('Retry error:', retryError);
                    showMessage('form-error', 'Registration completed. Please try logging in manually.');
                }
            }, 2000);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        showMessage('form-error', 'Registration completed. Please try logging in manually.');
    }
}

// Global logout function (available to all pages)
window.logout = async function() {
    try {
        await signOut(auth);
        sessionStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Logout error:', error);
        alert('Error signing out. Please try again.');
    }
};

// Utility functions (make them global)
window.showMessage = function(elementId, message, type = 'error') {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.className = type === 'error' ? 'error-message' : 'success-message';
        element.classList.remove('hidden');
    }
};

window.hideMessage = function(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('hidden');
    }
};

window.showLoading = function() {
    const element = document.getElementById('loading-indicator');
    if (element) {
        element.classList.remove('hidden');
    }
};

window.hideLoading = function() {
    const element = document.getElementById('loading-indicator');
    if (element) {
        element.classList.add('hidden');
    }
};
