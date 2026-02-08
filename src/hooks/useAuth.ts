/**
 * Auth state hook. Use in root to gate onboarding vs main app.
 */
import { useState, useEffect } from 'react';
import { subscribeToAuth, firebaseUserToAppUser } from '../services/auth';
import type { User } from '../types';

export function useAuth(): { user: User | null; loading: boolean } {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((fbUser) => {
      setUser(fbUser ? firebaseUserToAppUser(fbUser) : null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, loading };
}
