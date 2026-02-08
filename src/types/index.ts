/**
 * App-wide types. Align with Firestore schema.
 */

export interface User {
  id: string;
  name: string;
  email: string;
}

/** Q U A L I T reflection points – full set for future extension. */
export interface ReflectionPoints {
  qualities?: string[];
  undertakings?: string[];
  actions?: string[];
  lifeObey?: string[];
  lifeAvoid?: string[];
  iniquities?: string[];
  tellToOthers?: string[];
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
  /** Placeholder for L/I/T; extend when adding those inputs. */
  points?: ReflectionPoints;
  createdAt?: string; // ISO
  updatedAt?: string;
}

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Progress: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeTab: undefined;
  Session: undefined;
  Reflection: { sessionId: string; duration: number; bibleReference: string };
};
