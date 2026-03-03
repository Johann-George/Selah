import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { Card } from '../components';
import { colors, typography } from '../theme';
import type { User } from '../types';

interface UserDetailsScreenProps {
  user: User;
  onBack: () => void;
}

export function UserDetailsScreen({ user, onBack }: UserDetailsScreenProps) {
  const [showStreaks, setShowStreaks] = useState(true);
  const [reminders, setReminders] = useState(false);
  const [pointsVisibility, setPointsVisibility] = useState(true);

  const memberSince = user.memberSince || new Date().toISOString().slice(0, 7);
  const totalSessions = user.totalSessions || 0;
  const currentStreak = user.currentStreak || 0;
  const totalMonths = user.totalMonths || 0;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Entypo name="chevron-left" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>User Details</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView style={styles.content}>
        <Card style={styles.profileCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </Text>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </Card>

        <Card style={styles.statsCard}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Member since</Text>
            <Text style={styles.statValue}>{memberSince}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Sessions</Text>
            <Text style={styles.statValue}>{totalSessions}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Streak</Text>
            <Text style={styles.statValue}>{currentStreak} days</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Months</Text>
            <Text style={styles.statValue}>{totalMonths}</Text>
          </View>
        </Card>

        <Card style={styles.preferencesCard}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>Show streaks</Text>
            <Switch
              value={showStreaks}
              onValueChange={setShowStreaks}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#fff"
            />
          </View>
          <View style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>Reminders</Text>
            <Switch
              value={reminders}
              onValueChange={setReminders}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#fff"
            />
          </View>
          <View style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>Points Visibility</Text>
            <Switch
              value={pointsVisibility}
              onValueChange={setPointsVisibility}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#fff"
            />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: { padding: 4 },
  title: { ...typography.h2, color: colors.text },
  placeholder: { width: 36 },
  content: { flex: 1, padding: 24 },
  profileCard: { marginBottom: 16, alignItems: 'center', padding: 24 },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarLargeText: { fontSize: 32, color: '#fff', fontWeight: '700' },
  name: { ...typography.h2, color: colors.text, marginBottom: 4 },
  email: { ...typography.bodySmall, color: colors.textSecondary },
  statsCard: { marginBottom: 16, padding: 16 },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statLabel: { ...typography.body, color: colors.text },
  statValue: { ...typography.body, color: colors.textSecondary },
  preferencesCard: { marginBottom: 16, padding: 16 },
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: 12 },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  preferenceLabel: { ...typography.body, color: colors.text },
});
