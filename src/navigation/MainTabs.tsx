import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { HomeStack } from './HomeStack';
import { ReflectionTabs } from './ReflectionTabs';
import { GroupsScreen } from '../screens/GroupsScreen';
import { ProfileTabs } from './ProfileTabs';
import type { MainTabParamList } from '../types';
import { useColors, typography } from '../theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  const colors = useColors();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { ...typography.caption, fontFamily: 'Inter_500Medium' },
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: colors.onSurface,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 24,
          height: 64,
          paddingBottom: 8,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: 'Today', tabBarIcon: ({ color, size }) => <Entypo name="home" size={size} color={color} /> }} />
      <Tab.Screen name="Reflection" component={ReflectionTabs} options={{ tabBarLabel: 'Reflect', headerShown: false, tabBarIcon: ({ color, size }) => <Entypo name="book" size={size} color={color} /> }} />
      <Tab.Screen name="Groups" component={GroupsScreen} options={{ tabBarLabel: 'Groups', tabBarIcon: ({ color, size }) => <Entypo name="users" size={size} color={color} /> }} />
      <Tab.Screen name="Profile" component={ProfileTabs} options={{ tabBarLabel: 'Profile', headerShown: false, tabBarIcon: ({ color, size }) => <Entypo name="user" size={size} color={color} /> }} />
    </Tab.Navigator>
  );
}
