/**
 * Profile / Settings. Sign out and placeholder for future settings.
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { Card, Header } from '../components';
import { colors, typography } from '../theme';
import type { User } from '../types';

interface ProfileScreenProps {
  user: User;
  onNavigateToProgress: () => void;
  onNavigateToActivities: () => void;
  onNavigateToSettings: () => void;
}

export function ProfileScreen({ 
  user, 
  onNavigateToProgress,
  onNavigateToActivities,
  onNavigateToSettings,
}: ProfileScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Header
        title="Profile"
        showProfile={true}
        showSettings={true}
        onSettingsPress={onNavigateToSettings}
        userName={user.name}
      />
      <View style={styles.content}>
        <Card style={styles.card}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </Text>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </Card>

        <TouchableOpacity style={styles.menuItem} onPress={onNavigateToProgress}>
          <Entypo name="bar-graph" size={24} color={colors.text} />
          <Text style={styles.menuText}>Progress</Text>
          <Entypo name="chevron-right" size={24} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={onNavigateToActivities}>
          <Entypo name="list" size={24} color={colors.text} />
          <Text style={styles.menuText}>Activities</Text>
          <Entypo name="chevron-right" size={24} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 24 },
  card: { marginBottom: 24, alignItems: 'center', padding: 24 },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarLargeText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '700',
  },
  name: { ...typography.h2, color: colors.text, marginBottom: 4 },
  email: { ...typography.bodySmall, color: colors.textSecondary },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginBottom: 12,
  },
  menuText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
    marginLeft: 16,
  },
});
