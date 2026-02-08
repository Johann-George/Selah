import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeScreen } from './HomeScreen';
import { useAuthContext } from '../context/AuthContext';
import { useTodaySession } from '../hooks/useTodaySession';
import type { HomeStackParamList } from '../types';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'HomeTab'>;

export function HomeScreenConnected() {
  const navigation = useNavigation<Nav>();
  const user = useAuthContext();
  const { duration, reference } = useTodaySession(user.id);

  return (
    <HomeScreen
      onStartSession={() => navigation.navigate('Session')}
      todayDuration={duration}
      todayReference={reference}
    />
  );
}
