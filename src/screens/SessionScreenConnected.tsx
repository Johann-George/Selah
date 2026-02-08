import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SessionScreen } from './SessionScreen';
import { useAuthContext } from '../context/AuthContext';
import { createSession } from '../services/sessions';
import type { HomeStackParamList } from '../types';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'Session'>;

export function SessionScreenConnected() {
  const navigation = useNavigation<Nav>();
  const user = useAuthContext();

  return (
    <SessionScreen
      onBack={() => navigation.goBack()}
      onFinish={async (duration, bibleReference) => {
        const session = await createSession(user.id, {
          date: new Date().toISOString().slice(0, 10),
          duration,
          bibleReference,
          qualities: [],
          undertakings: [],
          actions: [],
        });
        navigation.navigate('Reflection', {
          sessionId: session.id,
          duration,
          bibleReference,
        });
      }}
    />
  );
}
