import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
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
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Entypo name="chevron-left" size={22} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Hero avatar */}
        <View style={styles.heroSection}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>{initials}</Text>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <StatTile label="Sessions" value={String(totalSessions)} />
          <StatTile label="Streak" value={`${currentStreak}d`} />
          <StatTile label="Months" value={String(totalMonths)} />
          <StatTile label="Since" value={memberSince.slice(0, 7)} />
        </View>

        {/* Preferences */}
        <Text style={styles.sectionLabel}>Preferences</Text>
        <View style={styles.prefGroup}>
          <PrefRow label="Show streaks" value={showStreaks} onChange={setShowStreaks} />
          <PrefRow label="Reminders" value={reminders} onChange={setReminders} />
          <PrefRow label="Points visibility" value={pointsVisibility} onChange={setPointsVisibility} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <View style={tileStyles.tile}>
      <Text style={tileStyles.value}>{value}</Text>
      <Text style={tileStyles.label}>{label}</Text>
    </View>
  );
}

const tileStyles = StyleSheet.create({
  tile: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    shadowColor: colors.onSurface,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 1,
  },
  value: { ...typography.h2, color: colors.primary, marginBottom: 4 },
  label: { ...typography.caption, color: colors.onSurfaceVariant },
});

function PrefRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <View style={prefStyles.row}>
      <Text style={prefStyles.label}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: colors.surfaceContainer, true: colors.primaryContainer }}
        thumbColor={value ? colors.primary : colors.textMuted}
      />
    </View>
  );
}

const prefStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  label: { ...typography.body, color: colors.onSurface },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.surfaceContainerLow,
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: { ...typography.h3, color: colors.onSurface },
  placeholder: { width: 40 },
  scroll: { paddingHorizontal: 28, paddingBottom: 48 },
  heroSection: { alignItems: 'center', paddingVertical: 32 },
  avatarLarge: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 16,
  },
  avatarLargeText: { fontFamily: 'Inter_700Bold', fontSize: 32, color: colors.primary },
  name: { ...typography.h2, color: colors.onSurface, marginBottom: 4 },
  email: { ...typography.bodySmall, color: colors.onSurfaceVariant },
  statsGrid: { flexDirection: 'row', gap: 10, marginBottom: 40 },
  sectionLabel: {
    ...typography.caption,
    fontFamily: 'Inter_500Medium',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  prefGroup: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 24,
    paddingHorizontal: 20,
    shadowColor: colors.onSurface,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 1,
  },
});
