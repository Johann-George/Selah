import React from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ReflectionScreen } from './ReflectionScreen';
import { updateSession } from '../services/sessions';
import type { HomeStackParamList } from '../types';

type ReflectionRoute = RouteProp<HomeStackParamList, 'Reflection'>;
type Nav = NativeStackNavigationProp<HomeStackParamList, 'Reflection'>;

export function ReflectionScreenConnected() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<ReflectionRoute>();
  const { sessionId, duration, bibleReference } = route.params;

  return (
    <ReflectionScreen
      sessionId={sessionId}
      duration={duration}
      bibleReference={bibleReference}
      onBack={() => navigation.navigate('HomeTab')}
      onSave={async (data) => {
        await updateSession(sessionId, {
          qualities: data.qualities,
          undertakings: data.undertakings,
          actions: data.actions,
        });
      }}
    />
  );
}
