/**
 * Stack for Home tab: Home -> Session.
 */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreenConnected } from '../screens/HomeScreenConnected';
import { SessionScreenConnected } from '../screens/SessionScreenConnected';
import type { HomeStackParamList } from '../types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeTab"
    >
      <Stack.Screen
        name="HomeTab"
        component={HomeScreenConnected}
      />
      <Stack.Screen
        name="Session"
        component={SessionScreenConnected}
      />
    </Stack.Navigator>
  );
}
