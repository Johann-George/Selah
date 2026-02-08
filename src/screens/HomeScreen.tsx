/**
 * Home / Today. Entry point to start a session; shows today's summary if any.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card } from '../components';
import { colors, typography } from '../theme';

interface HomeScreenProps {
  onStartSession: () => void;
  todayDuration?: number;
  todayReference?: string;
}

export function HomeScreen({
  onStartSession,
  todayDuration = 0,
  todayReference = '',
}: HomeScreenProps) {
  const hasSession = todayDuration > 0 || todayReference;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <Text style={styles.title}>Today</Text>
        <Text style={styles.subtitle}>Your quiet time</Text>
        {hasSession ? (
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Today&apos;s session</Text>
            {todayDuration > 0 && (
              <Text style={styles.body}>
                Duration: {Math.floor(todayDuration / 60)} min
              </Text>
            )}
            {todayReference ? (
              <Text style={styles.body}>Passage: {todayReference}</Text>
            ) : null}
          </Card>
        ) : (
          <Text style={styles.hint}>No session yet today. Start one below.</Text>
        )}
        <Button
          title="Start quiet time"
          onPress={onStartSession}
          style={styles.cta}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 24 },
  title: { ...typography.h1, color: colors.text, marginBottom: 4 },
  subtitle: { ...typography.body, color: colors.textSecondary, marginBottom: 24 },
  card: { marginBottom: 24 },
  cardTitle: { ...typography.h3, color: colors.text, marginBottom: 8 },
  body: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: 4 },
  hint: { ...typography.body, color: colors.textMuted, marginBottom: 24 },
  cta: { alignSelf: 'stretch' },
});
