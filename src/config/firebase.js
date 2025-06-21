import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

// Firebase configuration using environment variables for production security
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app)

// Initialize Authentication
export const auth = getAuth(app)

// Admin authentication functions
export const adminLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const adminLogout = async () => {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getCurrentUser = () => {
  return auth.currentUser
}

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

export default app 