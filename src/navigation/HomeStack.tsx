/**
 * Stack for Home tab: Home -> Session -> Reflection.
 */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreenConnected } from '../screens/HomeScreenConnected';
import { SessionScreenConnected } from '../screens/SessionScreenConnected';
import { ReflectionScreenConnected } from '../screens/ReflectionScreenConnected';
import type { HomeStackParamList } from '../types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, headerBackTitle: 'Back' }}
      initialRouteName="HomeTab"
    >
      <Stack.Screen
        name="HomeTab"
        component={HomeScreenConnected}
        options={{ title: 'Selah' }}
      />
      <Stack.Screen
        name="Session"
        component={SessionScreenConnected}
        options={{ title: 'Quiet time' }}
      />
      <Stack.Screen
        name="Reflection"
        component={ReflectionScreenConnected}
        options={{ title: 'Reflection' }}
      />
    </Stack.Navigator>
  );
}
