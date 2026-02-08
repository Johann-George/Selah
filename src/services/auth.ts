/**
 * Firebase Authentication service.
 * Email auth is implemented; Google sign-in requires additional native config
 * (e.g. @react-native-google-signin or expo-auth-session) – extend here.
 */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import type { User } from '../types';

export function getCurrentUser(): FirebaseUser | null {
  return auth.currentUser;
}

export function subscribeToAuth(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function signUp(email: string, password: string, displayName: string) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName.trim()) {
    await updateProfile(user, { displayName: displayName.trim() });
  }
  return user;
}

export async function signIn(email: string, password: string) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

export async function signOut() {
  await firebaseSignOut(auth);
}

/**
 * Google sign-in: requires OAuth token from expo-auth-session or
 * @react-native-google-signin. Placeholder – implement when adding Google.
 */
export async function signInWithGoogle(idToken: string) {
  const credential = GoogleAuthProvider.credential(idToken);
  const { user } = await signInWithCredential(auth, credential);
  return user;
}

export function firebaseUserToAppUser(fb: FirebaseUser): User {
  return {
    id: fb.uid,
    name: fb.displayName ?? fb.email ?? 'User',
    email: fb.email ?? '',
  };
}
