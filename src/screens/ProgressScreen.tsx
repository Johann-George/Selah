/**
 * Progress screen with GitHub-style contribution heatmap.
 * Uses last 12 weeks of data; cell color by activity level.
 */
import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '../theme';

const CELL_SIZE = 12;
const CELL_GAP = 3;
const DAYS = 7;
const WEEKS = 12;

function getDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

interface ProgressScreenProps {
  /** Map of date string (YYYY-MM-DD) to count of sessions that day */
  heatmapData: Record<string, number>;
  /** Optional: total sessions in range */
  totalSessions?: number;
}

export function ProgressScreen({
  heatmapData,
  totalSessions = 0,
}: ProgressScreenProps) {
  const { grid, maxCount } = useMemo(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - (DAYS * WEEKS - 1));
    const maxCount = Math.max(1, ...Object.values(heatmapData));
    // 7 rows = Mon..Sun, 12 cols = weeks (oldest left, newest right)
    const grid: (number | null)[][] = [];
    for (let d = 0; d < DAYS; d++) {
      const row: (number | null)[] = [];
      for (let w = 0; w < WEEKS; w++) {
        const date = new Date(start);
        date.setDate(start.getDate() + w * 7 + d);
        const key = getDateKey(date);
        row.push(heatmapData[key] ?? null);
      }
      grid.push(row);
    }
    return { grid, maxCount };
  }, [heatmapData]);

  const getColor = (count: number | null) => {
    if (count == null || count === 0) return colors.surfaceElevated;
    const intensity = Math.min(1, count / maxCount);
    if (intensity <= 0.25) return '#C4E6C4';
    if (intensity <= 0.5) return '#8BC98B';
    if (intensity <= 0.75) return '#5AAF5A';
    return colors.success;
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <Text style={styles.subtitle}>
          {totalSessions} session{totalSessions !== 1 ? 's' : ''} in the last 12 weeks
        </Text>
        <View style={styles.heatmap}>
          {grid.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((count, colIndex) => (
                <View
                  key={colIndex}
                  style={[styles.cell, { backgroundColor: getColor(count) }]}
                />
              ))}
            </View>
          ))}
        </View>
        <View style={styles.legend}>
          <Text style={styles.legendText}>Less</Text>
          <View style={[styles.legendCell, { backgroundColor: colors.surfaceElevated }]} />
          <View style={[styles.legendCell, { backgroundColor: '#C4E6C4' }]} />
          <View style={[styles.legendCell, { backgroundColor: '#8BC98B' }]} />
          <View style={[styles.legendCell, { backgroundColor: colors.success }]} />
          <Text style={styles.legendText}>More</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 24 },
  subtitle: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: 24 },
  heatmap: { flexDirection: 'column', marginBottom: 16, gap: CELL_GAP },
  row: { flexDirection: 'row', gap: CELL_GAP },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 3,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 3,
  },
  legendText: { ...typography.caption, color: colors.textMuted, marginRight: 4 },
});
