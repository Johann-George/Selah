import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { useColors, typography } from '../theme';
import type { User } from '../types';

interface UserDetailsScreenProps {
  user: User;
  onBack: () => void;
}

export function UserDetailsScreen({ user, onBack }: UserDetailsScreenProps) {
  const colors = useColors();
  const [showStreaks, setShowStreaks] = useState(true);
  const [reminders, setReminders] = useState(false);
  const [pointsVisibility, setPointsVisibility] = useState(true);

  const memberSince = user.memberSince || new Date().toISOString().slice(0, 7);
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={[styles.backBtn, { backgroundColor: colors.surfaceContainerLow }]}>
          <Entypo name="chevron-left" size={22} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.onSurface }]}>Details</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.heroSection}>
          <View style={[styles.avatarLarge, { backgroundColor: colors.primaryContainer }]}>
            <Text style={[styles.avatarLargeText, { color: colors.primary }]}>{initials}</Text>
          </View>
          <Text style={[styles.name, { color: colors.onSurface }]}>{user.name}</Text>
          <Text style={[styles.email, { color: colors.onSurfaceVariant }]}>{user.email}</Text>
        </View>

        <View style={styles.statsGrid}>
          {[
            { label: 'Sessions', value: String(user.totalSessions || 0) },
            { label: 'Streak', value: `${user.currentStreak || 0}d` },
            { label: 'Months', value: String(user.totalMonths || 0) },
            { label: 'Since', value: memberSince.slice(0, 7) },
          ].map(({ label, value }) => (
            <View key={label} style={[styles.tile, { backgroundColor: colors.surfaceContainerLowest, shadowColor: colors.onSurface }]}>
              <Text style={[styles.tileValue, { color: colors.primary }]}>{value}</Text>
              <Text style={[styles.tileLabel, { color: colors.onSurfaceVariant }]}>{label}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionLabel, { color: colors.onSurfaceVariant }]}>Preferences</Text>
        <View style={[styles.prefGroup, { backgroundColor: colors.surfaceContainerLowest, shadowColor: colors.onSurface }]}>
          {[
            { label: 'Show streaks', value: showStreaks, onChange: setShowStreaks },
            { label: 'Reminders', value: reminders, onChange: setReminders },
            { label: 'Points visibility', value: pointsVisibility, onChange: setPointsVisibility },
          ].map(({ label, value, onChange }) => (
            <View key={label} style={styles.prefRow}>
              <Text style={[styles.prefLabel, { color: colors.onSurface }]}>{label}</Text>
              <Switch
                value={value}
                onValueChange={onChange}
                trackColor={{ false: colors.surfaceContainer, true: colors.primaryContainer }}
                thumbColor={value ? colors.primary : colors.textMuted}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { ...typography.h3 },
  placeholder: { width: 40 },
  scroll: { paddingHorizontal: 28, paddingBottom: 48 },
  heroSection: { alignItems: 'center', paddingVertical: 32 },
  avatarLarge: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  avatarLargeText: { fontFamily: 'Inter_700Bold', fontSize: 32 },
  name: { ...typography.h2, marginBottom: 4 },
  email: { ...typography.bodySmall },
  statsGrid: { flexDirection: 'row', gap: 10, marginBottom: 40 },
  tile: { flex: 1, borderRadius: 24, padding: 20, alignItems: 'center', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 1 },
  tileValue: { ...typography.h2, marginBottom: 4 },
  tileLabel: { ...typography.caption },
  sectionLabel: { ...typography.caption, fontFamily: 'Inter_500Medium', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  prefGroup: { borderRadius: 24, paddingHorizontal: 20, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 1 },
  prefRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14 },
  prefLabel: { ...typography.body },
});
