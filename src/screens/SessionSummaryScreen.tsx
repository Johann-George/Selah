import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card } from '../components';
import { useColors, typography } from '../theme';

interface SessionSummaryScreenProps {
  duration: number;
  bibleReference: string;
  date: string;
  onDone: () => void;
}

export function SessionSummaryScreen({ duration, bibleReference, date, onDone }: SessionSummaryScreenProps) {
  const colors = useColors();
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.top}>
          <View style={[styles.checkCircle, { backgroundColor: colors.primaryContainer }]}>
            <Text style={[styles.checkMark, { color: colors.primary }]}>✓</Text>
          </View>
          <Text style={[styles.title, { color: colors.onSurface }]}>Well done.</Text>
          <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>Your reflection has been saved.</Text>
        </View>
        <Card style={styles.statsCard} variant="elevated">
          <StatRow label="Passage" value={bibleReference} colors={colors} />
          <View style={[styles.divider, { backgroundColor: colors.outlineVariant }]} />
          <StatRow label="Duration" value={`${minutes}m ${seconds}s`} colors={colors} />
          <View style={[styles.divider, { backgroundColor: colors.outlineVariant }]} />
          <StatRow label="Date" value={date} colors={colors} />
        </Card>
        <Button title="Done" onPress={onDone} style={styles.doneButton} />
      </View>
    </SafeAreaView>
  );
}

function StatRow({ label, value, colors }: { label: string; value: string; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={statStyles.row}>
      <Text style={[statStyles.label, { color: colors.onSurfaceVariant }]}>{label}</Text>
      <Text style={[statStyles.value, { color: colors.onSurface }]}>{value}</Text>
    </View>
  );
}

const statStyles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  label: { ...typography.bodySmall },
  value: { ...typography.bodySmall, fontFamily: 'Inter_500Medium' },
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 28, justifyContent: 'center', gap: 32 },
  top: { alignItems: 'flex-start' },
  checkCircle: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  checkMark: { fontSize: 24 },
  title: { ...typography.displaySm, marginBottom: 8 },
  subtitle: { ...typography.body },
  statsCard: { gap: 16 },
  divider: { height: 1 },
  doneButton: { alignSelf: 'stretch' },
});
