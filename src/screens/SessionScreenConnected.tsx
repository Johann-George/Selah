import React from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { SessionScreen } from './SessionScreen';
import { useAuthContext } from '../context/AuthContext';
import { createSession } from '../services/sessions';
import type { HomeStackParamList, MainTabParamList, ReflectionTabParamList } from '../types';

type Nav = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'Session'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList>,
    MaterialTopTabNavigationProp<ReflectionTabParamList>
  >
>;

export function SessionScreenConnected() {
  const navigation = useNavigation<Nav>();
  const user = useAuthContext();

  return (
    <SessionScreen
      onBack={() => navigation.goBack()}
      onFinish={async (duration, bibleReference) => {
        try {
          const session = await createSession(user.id, {
            date: new Date().toISOString().slice(0, 10),
            duration,
            bibleReference,
            qualities: [],
            undertakings: [],
            actions: [],
          });

          const parent = navigation.getParent();
          if (parent) {
            parent.navigate('Reflection', {
              screen: 'Reflect',
              params: {
                sessionId: session.id,
                duration,
                bibleReference,
              },
            });
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to create session. Please check your connection and try again.';
          console.error('Error creating session:', error);
          Alert.alert(
            'Could not save session',
            message,
            [{ text: 'OK' }]
          );
        }
      }}
    />
  );
}
