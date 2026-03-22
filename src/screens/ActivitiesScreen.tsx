import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from '../components';
import { useColors, typography } from '../theme';
import type { Session, User } from '../types';

interface ActivitiesScreenProps {
  user: User;
  sessions: Session[];
  loading: boolean;
  onSignOut: () => void;
}

export function ActivitiesScreen({ user, sessions, loading, onSignOut }: ActivitiesScreenProps) {
  const colors = useColors();

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.center}>
          <Text style={[styles.emptyText, { color: colors.textMuted }]}>Loading…</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.profileStrip}>
          <View style={[styles.avatar, { backgroundColor: colors.primaryContainer }]}>
            <Text style={[styles.avatarText, { color: colors.primary }]}>
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.name, { color: colors.onSurface }]}>{user.name}</Text>
            <Text style={[styles.email, { color: colors.onSurfaceVariant }]}>{user.email}</Text>
          </View>
        </View>
        <Button title="Sign out" onPress={onSignOut} variant="ghost" style={styles.signOut} />
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Recent</Text>
        {sessions.length === 0 ? (
          <Text style={[styles.emptyText, { color: colors.textMuted }]}>No activities yet.</Text>
        ) : (
          sessions.map((session) => (
            <View key={session.id} style={[styles.activityItem, { backgroundColor: colors.surfaceContainerLowest, shadowColor: colors.onSurface }]}>
              <View style={styles.activityLeft}>
                <Text style={[styles.activityRef, { color: colors.onSurface }]}>{session.bibleReference}</Text>
                <Text style={[styles.activityDate, { color: colors.onSurfaceVariant }]}>{session.date}</Text>
              </View>
              <Text style={[styles.activityDuration, { color: colors.primary }]}>{Math.floor(session.duration / 60)}m</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scroll: { paddingHorizontal: 28, paddingTop: 24, paddingBottom: 48 },
  profileStrip: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 8 },
  avatar: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  avatarText: { ...typography.body, fontFamily: 'Inter_600SemiBold' },
  profileInfo: { flex: 1 },
  name: { ...typography.body, fontFamily: 'Inter_600SemiBold' },
  email: { ...typography.bodySmall },
  signOut: { alignSelf: 'flex-start', marginBottom: 32 },
  sectionTitle: { ...typography.h3, marginBottom: 16 },
  activityItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderRadius: 20, paddingHorizontal: 20, paddingVertical: 16, marginBottom: 10,
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 1,
  },
  activityLeft: { flex: 1 },
  activityRef: { ...typography.body, fontFamily: 'Inter_500Medium', marginBottom: 2 },
  activityDate: { ...typography.caption },
  activityDuration: { ...typography.bodySmall, fontFamily: 'Inter_500Medium' },
  emptyText: { ...typography.body },
});
