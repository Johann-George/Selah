import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';

const CELL_SIZE = 13;
const CELL_GAP = 4;
const DAYS = 7;
const WEEKS = 12;

function getDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

interface ProgressScreenProps {
  heatmapData: Record<string, number>;
  totalSessions?: number;
}

export function ProgressScreen({ heatmapData, totalSessions = 0 }: ProgressScreenProps) {
  const { grid, maxCount } = useMemo(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - (DAYS * WEEKS - 1));
    const maxCount = Math.max(1, ...Object.values(heatmapData));
    const grid: (number | null)[][] = [];
    for (let d = 0; d < DAYS; d++) {
      const row: (number | null)[] = [];
      for (let w = 0; w < WEEKS; w++) {
        const date = new Date(start);
        date.setDate(start.getDate() + w * 7 + d);
        row.push(heatmapData[getDateKey(date)] ?? null);
      }
      grid.push(row);
    }
    return { grid, maxCount };
  }, [heatmapData]);

  const getColor = (count: number | null) => {
    if (count == null || count === 0) return colors.surfaceContainer;
    const intensity = Math.min(1, count / maxCount);
    if (intensity <= 0.25) return '#c8ddd7';
    if (intensity <= 0.5)  return '#a3c4bb';
    if (intensity <= 0.75) return '#7aab9f';
    return colors.primary;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.stat}>
          {totalSessions}{' '}
          <Text style={styles.statLabel}>session{totalSessions !== 1 ? 's' : ''} · 12 weeks</Text>
        </Text>
        <View style={styles.heatmap}>
          {grid.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((count, colIndex) => (
                <View key={colIndex} style={[styles.cell, { backgroundColor: getColor(count) }]} />
              ))}
            </View>
          ))}
        </View>
        <View style={styles.legend}>
          <Text style={styles.legendText}>Less</Text>
          {[colors.surfaceContainer, '#c8ddd7', '#a3c4bb', '#7aab9f', colors.primary].map((c, i) => (
            <View key={i} style={[styles.legendCell, { backgroundColor: c }]} />
          ))}
          <Text style={styles.legendText}>More</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, paddingHorizontal: 28, paddingTop: 24 },
  stat: { ...typography.h2, color: colors.onSurface, marginBottom: 24 },
  statLabel: { ...typography.body, color: colors.onSurfaceVariant },
  heatmap: { flexDirection: 'column', gap: CELL_GAP, marginBottom: 16 },
  row: { flexDirection: 'row', gap: CELL_GAP },
  cell: { width: CELL_SIZE, height: CELL_SIZE, borderRadius: 4 },
  legend: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendCell: { width: CELL_SIZE, height: CELL_SIZE, borderRadius: 4 },
  legendText: { ...typography.caption, color: colors.textMuted },
});
