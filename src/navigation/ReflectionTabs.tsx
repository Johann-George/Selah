import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ReadScreen } from '../screens/ReadScreen';
import { ReflectionScreenConnected } from '../screens/ReflectionScreenConnected';
import type { ReflectionTabParamList } from '../types';
import { colors, typography } from '../theme';

const Tab = createMaterialTopTabNavigator<ReflectionTabParamList>();

export function ReflectionTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: typography.body,
        tabBarIndicatorStyle: { backgroundColor: colors.primary },
        tabBarStyle: { backgroundColor: colors.background },
      }}
    >
      <Tab.Screen
        name="Read"
        component={ReadScreen}
        options={{ tabBarLabel: 'Read' }}
      />
      <Tab.Screen
        name="Reflect"
        component={ReflectionScreenConnected}
        options={{ tabBarLabel: 'Reflect' }}
      />
    </Tab.Navigator>
  );
}
