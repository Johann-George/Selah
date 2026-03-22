import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Card } from '../components';
import { useColors, typography } from '../theme';
import type { User } from '../types';

interface ProfileInfoScreenProps {
  user: User;
  onSignOut: () => void;
}

export function ProfileInfoScreen({ user, onSignOut }: ProfileInfoScreenProps) {
  const colors = useColors();
  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <Text style={[styles.name, { color: colors.onSurface }]}>{user.name}</Text>
        <Text style={[styles.email, { color: colors.onSurfaceVariant }]}>{user.email}</Text>
      </Card>
      <Button title="Sign out" onPress={onSignOut} variant="outline" style={styles.signOut} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24 },
  card: { marginBottom: 24 },
  name: { ...typography.h3, marginBottom: 4 },
  email: { ...typography.bodySmall },
  signOut: { alignSelf: 'stretch' },
});
