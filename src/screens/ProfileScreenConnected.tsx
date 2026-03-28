import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ProfileScreen } from './ProfileScreen';
import { useAuthContext } from '../context/AuthContext';

export function ProfileScreenConnected() {
  const user = useAuthContext();
  const navigation = useNavigation();

  return (
    <ProfileScreen
      user={user}
      // onNavigateToProgress={() => navigation.navigate('Progress' as never)}
      // onNavigateToActivities={() => navigation.navigate('Activities' as never)}
      onNavigateToUserDetails={() => navigation.navigate('UserDetails' as never)}
    />
  );
}
