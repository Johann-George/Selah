import React, { createContext, useContext } from 'react';
import type { User } from '../types';

interface AuthContextValue {
  user: User | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext(): User {
  const ctx = useContext(AuthContext);
  if (!ctx?.user) throw new Error('useAuthContext used outside AuthProvider or user null');
  return ctx.user;
}
