/**
 * Firebase initialization for Expo (React Native).
 * Uses getAuth() for compatibility with the default firebase/auth types.
 * For persistent auth in React Native, consider using the Firebase RN entry
 * (initializeAuth + getReactNativePersistence(AsyncStorage)) and ensuring
 * Metro resolves "firebase/auth" to the react-native build.
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, Auth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeFirestore, getFirestore, Firestore, setLogLevel } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID ?? '',
};

// Enable debug logging
setLogLevel('debug');

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0] as FirebaseApp;
}

auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

try {
  db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  });
} catch (e) {
  console.log('Firestore already initialized, using existing instance');
  db = getFirestore(app) as Firestore;
}

export { app, auth, db };

