import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeScreen } from './HomeScreen';
import { useAuthContext } from '../context/AuthContext';
import { useTodaySession } from '../hooks/useTodaySession';
import type { HomeStackParamList, MainTabParamList } from '../types';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type Nav = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'HomeTab'>,
  BottomTabNavigationProp<MainTabParamList>
>;

export function HomeScreenConnected() {
  const navigation = useNavigation<Nav>();
  const user = useAuthContext();
  const { duration, reference } = useTodaySession(user.id);

  return (
    <HomeScreen
      onStartSession={() => navigation.navigate('Session')}
      todayDuration={duration}
      todayReference={reference}
      userName={user.name}
      onProfilePress={() => navigation.navigate('Profile')}
    />
  );
}
