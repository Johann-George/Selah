import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserDetailsScreen } from './UserDetailsScreen';
import { useAuthContext } from '../context/AuthContext';

export function UserDetailsScreenConnected() {
  const user = useAuthContext();
  const navigation = useNavigation();

  return (
    <UserDetailsScreen
      user={user}
      onBack={() => navigation.goBack()}
    />
  );
}
