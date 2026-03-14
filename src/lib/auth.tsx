import { auth, db } from './firebase';
import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
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

const requireCurrentUser = () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("You need to be logged in.");
  }
  return user;
};

const reauthenticateUser = async (currentPassword: string) => {
  const user = requireCurrentUser();

  if (!user.email) {
    throw new Error("No email is attached to this account.");
  }

  if (!currentPassword) {
    throw new Error("Enter your current password to make this change.");
  }

  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
  return user;
};

export const updateAccountProfile = async ({
  name,
  email,
  currentPassword,
}: {
  name: string;
  email: string;
  currentPassword?: string;
}) => {
  const user = requireCurrentUser();
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();

  if (trimmedName && trimmedName !== user.displayName) {
    await updateProfile(user, { displayName: trimmedName });
  }

  if (trimmedEmail && trimmedEmail !== user.email) {
    await reauthenticateUser(currentPassword ?? "");
    await updateEmail(user, trimmedEmail);
  }

  await setDoc(
    doc(db, 'users', user.uid),
    {
      name: trimmedName,
      email: trimmedEmail || user.email,
      updatedAt: new Date().toISOString(),
    },
    { merge: true },
  );

  return auth.currentUser;
};

export const changeAccountPassword = async ({
  currentPassword,
  nextPassword,
}: {
  currentPassword: string;
  nextPassword: string;
}) => {
  if (nextPassword.length < 6) {
    throw new Error("New password must be at least 6 characters.");
  }

  const user = await reauthenticateUser(currentPassword);
  await updatePassword(user, nextPassword);
};

// Logout
export const logOut = () => signOut(auth);
