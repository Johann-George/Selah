import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Entypo } from '@expo/vector-icons';
import { colors, typography } from '../theme';
import { ProgressScreenConnected } from './ProgressScreenConnected';
import { ActivitiesScreenConnected } from './ActivitiesScreenConnected';
import type { User } from '../types';

const Tab = createMaterialTopTabNavigator();

interface ProfileScreenProps {
  user: User;
  onNavigateToUserDetails: () => void;
}

export function ProfileScreen({ user, onNavigateToUserDetails }: ProfileScreenProps) {
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={onNavigateToUserDetails}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarLabelStyle: { ...typography.bodySmall, fontFamily: 'Inter_500Medium' },
          tabBarIndicatorStyle: { backgroundColor: colors.primary, height: 2, borderRadius: 2 },
          tabBarStyle: { backgroundColor: colors.background, elevation: 0, shadowOpacity: 0 },
          tabBarShowIcon: false,
        }}
      >
        <Tab.Screen name="Progress" component={ProgressScreenConnected} options={{ tabBarLabel: 'Progress' }} />
        <Tab.Screen name="Activities" component={ActivitiesScreenConnected} options={{ tabBarLabel: 'Activities' }} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: { ...typography.displaySm, color: colors.onSurface },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { ...typography.body, fontFamily: 'Inter_600SemiBold', color: colors.primary },
});
