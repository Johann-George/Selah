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
        <Text style={styles.emptyText}>Loading...</Text>
      </View>
    );
  }

  if (sessions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No activities yet</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Card style={styles.profileCard}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </Card>
      <Button title="Sign out" onPress={onSignOut} variant="outline" style={styles.signOut} />
      <Text style={styles.sectionTitle}>Recent Activities</Text>
      {sessions.map((session) => (
        <Card key={session.id} style={styles.card}>
          <Text style={styles.date}>{session.date}</Text>
          <Text style={styles.reference}>{session.bibleReference}</Text>
          <Text style={styles.duration}>{Math.floor(session.duration / 60)} min</Text>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24, paddingBottom: 48 },
  profileCard: { marginBottom: 16 },
  name: { ...typography.h3, color: colors.text, marginBottom: 4 },
  email: { ...typography.bodySmall, color: colors.textSecondary },
  signOut: { marginBottom: 24 },
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: 12 },
  card: { marginBottom: 12 },
  date: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: 4 },
  reference: { ...typography.body, color: colors.text, marginBottom: 2 },
  duration: { ...typography.caption, color: colors.textMuted },
  emptyText: { ...typography.body, color: colors.textMuted },
});
