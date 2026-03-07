/**
 * Profile screen with tabs for Progress and Activities.
 */
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
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={onNavigateToUserDetails} style={styles.profileButton}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        initialRouteName="Progress"
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarLabelStyle: typography.body,
          tabBarIndicatorStyle: { backgroundColor: colors.primary },
          tabBarStyle: { backgroundColor: colors.background },
          tabBarShowIcon: true,
        }}
      >
        <Tab.Screen
          name="Progress"
          component={ProgressScreenConnected}
          options={{
            tabBarLabel: 'Progress',
            tabBarIcon: () => <Entypo name="bar-graph" size={24} color="black" />,
          }}
        />
        <Tab.Screen
          name="Activities"
          component={ActivitiesScreenConnected}
          options={{
            tabBarLabel: 'Activities',
            tabBarIcon: () => <Entypo name="list" size={24} color="black" />,
          }}
        />
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: { ...typography.h1, color: colors.text },
  profileButton: { padding: 4 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { ...typography.body, color: '#fff', fontWeight: '600' },
});
