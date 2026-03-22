import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Entypo } from '@expo/vector-icons';
import { useColors, useTheme, typography } from '../theme';
import { ProgressScreenConnected } from './ProgressScreenConnected';
import { ActivitiesScreenConnected } from './ActivitiesScreenConnected';
import type { User } from '../types';

type ThemeMode = 'system' | 'light' | 'dark';
const CYCLE: ThemeMode[] = ['system', 'light', 'dark'];
const ICON: Record<ThemeMode, React.ComponentProps<typeof Entypo>['name']> = {
  system: 'cycle',
  light:  'light-up',
  dark:   'moon',
};

const Tab = createMaterialTopTabNavigator();

interface ProfileScreenProps {
  user: User;
  onNavigateToUserDetails: () => void;
}

export function ProfileScreen({ user, onNavigateToUserDetails }: ProfileScreenProps) {
  const colors = useColors();
  const { mode, setMode } = useTheme();
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const cycleTheme = () => {
    const next = CYCLE[(CYCLE.indexOf(mode) + 1) % CYCLE.length];
    setMode(next);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onSurface }]}>Profile</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={cycleTheme} style={[styles.iconBtn, { backgroundColor: colors.surfaceContainerLow }]}>
            <Entypo name={ICON[mode]} size={18} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onNavigateToUserDetails}>
            <View style={[styles.avatar, { backgroundColor: colors.primaryContainer }]}>
              <Text style={[styles.avatarText, { color: colors.primary }]}>{initials}</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 28, paddingTop: 20, paddingBottom: 16 },
  title: { ...typography.displaySm },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  avatar: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  avatarText: { ...typography.body, fontFamily: 'Inter_600SemiBold' },
});
