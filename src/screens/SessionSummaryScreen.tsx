import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card } from '../components';
import { colors, typography } from '../theme';

interface SessionSummaryScreenProps {
  duration: number;
  bibleReference: string;
  date: string;
  onDone: () => void;
}

export function SessionSummaryScreen({ duration, bibleReference, date, onDone }: SessionSummaryScreenProps) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.top}>
          <View style={styles.checkCircle}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
          <Text style={styles.title}>Well done.</Text>
          <Text style={styles.subtitle}>Your reflection has been saved.</Text>
        </View>

        <Card style={styles.statsCard} variant="elevated">
          <StatRow label="Passage" value={bibleReference} />
          <View style={styles.divider} />
          <StatRow label="Duration" value={`${minutes}m ${seconds}s`} />
          <View style={styles.divider} />
          <StatRow label="Date" value={date} />
        </Card>

        <Button title="Done" onPress={onDone} style={styles.doneButton} />
      </View>
    </SafeAreaView>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={statStyles.row}>
      <Text style={statStyles.label}>{label}</Text>
      <Text style={statStyles.value}>{value}</Text>
    </View>
  );
}

const statStyles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  label: { ...typography.bodySmall, color: colors.onSurfaceVariant },
  value: { ...typography.bodySmall, fontFamily: 'Inter_500Medium', color: colors.onSurface },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, paddingHorizontal: 28, justifyContent: 'center', gap: 32 },
  top: { alignItems: 'flex-start' },
  checkCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkMark: { fontSize: 24, color: colors.primary },
  title: { ...typography.displaySm, color: colors.onSurface, marginBottom: 8 },
  subtitle: { ...typography.body, color: colors.onSurfaceVariant },
  statsCard: { gap: 16 },
  divider: { height: 1, backgroundColor: colors.outlineVariant },
  doneButton: { alignSelf: 'stretch' },
});
