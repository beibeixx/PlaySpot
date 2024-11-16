import { auth } from "../firebase/firebaseSetup";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { store } from './store';
import { setUser, clearUser } from './authSlice';

export const initializeAuthListener = () => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      store.dispatch(setUser({
        email: user.email,
        uid: user.uid,
      }));
    } else {
      store.dispatch(clearUser());
    }
  });
};

export const handleSignOut = async () => {
  try {
    await signOut(auth);
    store.dispatch(clearUser());
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};