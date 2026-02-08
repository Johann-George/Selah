/**
 * Profile / Settings. Sign out and placeholder for future settings.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card } from '../components';
import { colors, typography } from '../theme';
import type { User } from '../types';

interface ProfileScreenProps {
  user: User;
  onSignOut: () => void;
}

export function ProfileScreen({ user, onSignOut }: ProfileScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Card style={styles.card}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </Card>
        {/* Extend: notifications, theme, data export, etc. */}
        <Button title="Sign out" onPress={onSignOut} variant="outline" style={styles.signOut} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 24 },
  title: { ...typography.h1, color: colors.text, marginBottom: 24 },
  card: { marginBottom: 24 },
  name: { ...typography.h3, color: colors.text, marginBottom: 4 },
  email: { ...typography.bodySmall, color: colors.textSecondary },
  signOut: { alignSelf: 'stretch' },
});
