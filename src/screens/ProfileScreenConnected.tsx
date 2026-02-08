import React from 'react';
import { ProfileScreen } from './ProfileScreen';
import { useAuthContext } from '../context/AuthContext';
import { signOut } from '../services/auth';

export function ProfileScreenConnected() {
  const user = useAuthContext();

  return (
    <ProfileScreen
      user={user}
      onSignOut={() => signOut()}
    />
  );
}
