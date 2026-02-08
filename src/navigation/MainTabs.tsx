import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { HomeStack } from './HomeStack';
import { ProgressScreenConnected } from '../screens/ProgressScreenConnected';
import { ProfileScreenConnected } from '../screens/ProfileScreenConnected';
import type { MainTabParamList } from '../types';
import { colors, typography } from '../theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: typography.caption,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ tabBarLabel: 'Today' }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreenConnected}
        options={{ tabBarLabel: 'Progress' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreenConnected}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}
