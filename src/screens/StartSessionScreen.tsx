import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card, BiblePickerModal } from '../components';
import { colors, typography } from '../theme';

interface StartSessionScreenProps {
  onStart: (duration: number, bibleReference: string) => void;
  onTimerUpdate?: (seconds: number, isRunning: boolean) => void;
}

export function StartSessionScreen({ onStart }: StartSessionScreenProps) {
  const [pickerVisible, setPickerVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Begin</Text>
        <Text style={styles.sub}>Select a passage and enter{'\n'}your quiet time.</Text>
        <Card style={styles.card}>
          <Text style={styles.cardLabel}>Today's reading</Text>
          <Text style={styles.cardHint}>Tap Start to choose a Bible passage</Text>
          <Button title="Start" onPress={() => setPickerVisible(true)} style={styles.btn} />
        </Card>
      </View>

      <BiblePickerModal
        visible={pickerVisible}
        onConfirm={(reference) => {
          setPickerVisible(false);
          onStart(0, reference);
        }}
        onClose={() => setPickerVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, paddingHorizontal: 28, paddingTop: 48, justifyContent: 'flex-start' },
  heading: { ...typography.displaySm, color: colors.onSurface, marginBottom: 8 },
  sub: { ...typography.body, color: colors.onSurfaceVariant, lineHeight: 26, marginBottom: 40 },
  card: { backgroundColor: colors.surfaceContainerLow, gap: 8 },
  cardLabel: {
    ...typography.caption,
    fontFamily: 'Inter_500Medium',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  cardHint: { ...typography.body, color: colors.textMuted, marginBottom: 16 },
  btn: { alignSelf: 'flex-start' },
});
