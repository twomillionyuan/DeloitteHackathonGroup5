import { auth, db } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Sign up + save user to Firestore
export const signUp = async (email: string, password: string, name: string) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  
  // save extra user data to Firestore
  await setDoc(doc(db, 'users', user.uid), {
    name,
    email,
    createdAt: new Date().toISOString(),
    quizCompleted: false,
  });

  return user;
};

// Login
export const logIn = async (email: string, password: string) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

// Logout
export const logOut = () => signOut(auth);