import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey:            'AIzaSyBsDQ0XIG0I_OTOfi9ZtZoxMcl-tE9Kwfo',
  authDomain:        'e-cellwebsite.firebaseapp.com',
  projectId:         'e-cellwebsite',
  storageBucket:     'e-cellwebsite.firebasestorage.app',
  messagingSenderId: '369101743376',
  appId:             '1:369101743376:web:e82c07f5e9481419e13195',
  measurementId:     'G-E4ZD645BJ2',
};

const app = initializeApp(firebaseConfig);

// Analytics (only in browser)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export const auth           = getAuth(app);
export const db             = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
