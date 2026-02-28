import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Card } from '../components';
import { colors, typography } from '../theme';
import type { User } from '../types';

interface ProfileInfoScreenProps {
  user: User;
  onSignOut: () => void;
}

export function ProfileInfoScreen({ user, onSignOut }: ProfileInfoScreenProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </Card>
      <Button title="Sign out" onPress={onSignOut} variant="outline" style={styles.signOut} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24 },
  card: { marginBottom: 24 },
  name: { ...typography.h3, color: colors.text, marginBottom: 4 },
  email: { ...typography.bodySmall, color: colors.textSecondary },
  signOut: { alignSelf: 'stretch' },
});
