import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBCx3IK3LAMAl1KlmOU9cYf0ZnrEPggaWI",
  authDomain: "veggie-hackathon.firebaseapp.com",
  projectId: "veggie-hackathon",
  storageBucket: "veggie-hackathon.firebasestorage.app",
  messagingSenderId: "222948437397",
  appId: "1:222948437397:web:05db0584738b9ee6015a9c",
  measurementId: "G-B5MXD0LG6G"
};

const app = initializeApp(firebaseConfig);
console.log('Firebase initialized:', app.name);
export const auth = getAuth(app);
console.log('Auth initialized:', auth); 
export const db = getFirestore(app);
