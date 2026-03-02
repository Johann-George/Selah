import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SettingsScreen } from './SettingsScreen';
import { useAuthContext } from '../context/AuthContext';
import { signOut } from '../services/auth';

export function SettingsScreenConnected() {
  const user = useAuthContext();
  const navigation = useNavigation();

  const handleSignOut = async () => {
    await signOut();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return <SettingsScreen user={user} onSignOut={handleSignOut} onBack={handleBack} />;
}
