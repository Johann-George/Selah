import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProgressScreenConnected } from '../screens/ProgressScreenConnected';
import { ActivitiesScreenConnected } from '../screens/ActivitiesScreenConnected';
import type { ProfileTabParamList } from '../types';
import { colors, typography } from '../theme';

const Tab = createMaterialTopTabNavigator<ProfileTabParamList>();

function ProfileHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Profile</Text>
    </View>
  );
}

export function ProfileTabs() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ProfileHeader />
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
          name="Progress"
          component={ProgressScreenConnected}
          options={{ tabBarLabel: 'Progress' }}
        />
        <Tab.Screen
          name="Activities"
          component={ActivitiesScreenConnected}
          options={{ tabBarLabel: 'Activities' }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 12, backgroundColor: colors.background },
  title: { ...typography.h1, color: colors.text },
});
