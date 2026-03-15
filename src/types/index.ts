/**
 * App-wide types. Align with Firestore schema.
 */

export interface User {
  id: string;
  name: string;
  email: string;
  memberSince?: string;
  totalSessions?: number;
  currentStreak?: number;
  totalMonths?: number;
}

export interface Session {
  id: string;
  userId: string;
  date: string; // ISO date YYYY-MM-DD
  duration: number; // seconds
  bibleReference: string;
  qualities: string[];
  undertakings: string[];
  actions: string[];
  livesOfPeople: string[];
  iniquities: string[];
  tellToOthers: string[];
  yield: string[];
  createdAt?: string; // ISO
  updatedAt?: string;
}

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Reflection: undefined;
  Groups: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeTab: undefined;
  Session: undefined;
};

export type ReflectionTabParamList = {
  Read: undefined;
  Reflect: { sessionId?: string; duration?: number; bibleReference?: string };
};

export type ProfileTabParamList = {
  Progress: undefined;
  Activities: undefined;
  ProfileInfo: undefined;
  UserDetails: undefined;
  Settings: undefined;
};
