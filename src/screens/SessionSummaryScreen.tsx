/**
 * Session summary screen showing completed quiet time details.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card } from '../components';
import { colors, typography } from '../theme';
import { Entypo } from '@expo/vector-icons';

interface SessionSummaryScreenProps {
  duration: number;
  bibleReference: string;
  date: string;
  onDone: () => void;
}

export function SessionSummaryScreen({
  duration,
  bibleReference,
  date,
  onDone,
}: SessionSummaryScreenProps) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Entypo name="check" size={44} color={colors.success} />
        </View>
        <Text style={styles.title}>Quiet Time Complete</Text>
        <Text style={styles.subtitle}>Well done! You've completed your reflection.</Text>
        
        <Card style={styles.statsCard}>
          <View style={styles.statRow}>
            <Entypo name="clock" size={24} color={colors.primary} />
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>Duration</Text>
              <Text style={styles.statValue}>
                {minutes}m {seconds}s
              </Text>
            </View>
          </View>
          
          <View style={styles.statRow}>
            <Entypo name="book" size={24} color={colors.primary} />
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>Bible Passage</Text>
              <Text style={styles.statValue}>{bibleReference}</Text>
            </View>
          </View>
          
          <View style={styles.statRow}>
            <Entypo name="calendar" size={24} color={colors.primary} />
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>Date</Text>
              <Text style={styles.statValue}>{date}</Text>
            </View>
          </View>
        </Card>

        <Button title="Done" onPress={onDone} style={styles.doneButton} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 60,
    backgroundColor: colors.successLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: { ...typography.h1, color: colors.text, marginBottom: 8, textAlign: 'center' },
  subtitle: { ...typography.body, color: colors.textSecondary, marginBottom: 32, textAlign: 'center' },
  statsCard: { width: '100%', marginBottom: 32 },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  statContent: { flex: 1, marginLeft: 16 },
  statLabel: { ...typography.bodySmall, color: colors.textMuted, marginBottom: 4 },
  statValue: { ...typography.h3, color: colors.text },
  doneButton: { width: '100%' },
});
