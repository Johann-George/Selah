import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Card } from '../components';
import { colors, typography } from '../theme';
import type { Session, User } from '../types';

interface ActivitiesScreenProps {
  user: User;
  sessions: Session[];
  loading: boolean;
  onSignOut: () => void;
}

export function ActivitiesScreen({ user, sessions, loading, onSignOut }: ActivitiesScreenProps) {
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.emptyText}>Loading…</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Profile strip */}
        <View style={styles.profileStrip}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>

        <Button title="Sign out" onPress={onSignOut} variant="ghost" style={styles.signOut} />

        <Text style={styles.sectionTitle}>Recent</Text>

        {sessions.length === 0 ? (
          <Text style={styles.emptyText}>No activities yet.</Text>
        ) : (
          sessions.map((session) => (
            <View key={session.id} style={styles.activityItem}>
              <View style={styles.activityLeft}>
                <Text style={styles.activityRef}>{session.bibleReference}</Text>
                <Text style={styles.activityDate}>{session.date}</Text>
              </View>
              <Text style={styles.activityDuration}>{Math.floor(session.duration / 60)}m</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scroll: { paddingHorizontal: 28, paddingTop: 24, paddingBottom: 48 },
  profileStrip: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 8 },
  avatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { ...typography.body, fontFamily: 'Inter_600SemiBold', color: colors.primary },
  profileInfo: { flex: 1 },
  name: { ...typography.body, fontFamily: 'Inter_600SemiBold', color: colors.onSurface },
  email: { ...typography.bodySmall, color: colors.onSurfaceVariant },
  signOut: { alignSelf: 'flex-start', marginBottom: 32 },
  sectionTitle: { ...typography.h3, color: colors.onSurface, marginBottom: 16 },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 10,
    shadowColor: colors.onSurface,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 1,
  },
  activityLeft: { flex: 1 },
  activityRef: { ...typography.body, fontFamily: 'Inter_500Medium', color: colors.onSurface, marginBottom: 2 },
  activityDate: { ...typography.caption, color: colors.onSurfaceVariant },
  activityDuration: { ...typography.bodySmall, fontFamily: 'Inter_500Medium', color: colors.primary },
  emptyText: { ...typography.body, color: colors.textMuted },
});
