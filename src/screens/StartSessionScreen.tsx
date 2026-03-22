import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card, BiblePickerModal } from '../components';
import { useColors, typography } from '../theme';

interface StartSessionScreenProps {
  onStart: (duration: number, bibleReference: string) => void;
  onTimerUpdate?: (seconds: number, isRunning: boolean) => void;
}

export function StartSessionScreen({ onStart }: StartSessionScreenProps) {
  const colors = useColors();
  const [pickerVisible, setPickerVisible] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.heading, { color: colors.onSurface }]}>Begin</Text>
        <Text style={[styles.sub, { color: colors.onSurfaceVariant }]}>
          Select a passage and enter{'\n'}your quiet time.
        </Text>
        <Card style={{ backgroundColor: colors.surfaceContainerLow }}>
          <Text style={[styles.cardLabel, { color: colors.onSurfaceVariant }]}>Today's reading</Text>
          <Text style={[styles.cardHint, { color: colors.textMuted }]}>Tap Start to choose a Bible passage</Text>
          <Button title="Start" onPress={() => setPickerVisible(true)} style={styles.btn} />
        </Card>
      </View>
      <BiblePickerModal
        visible={pickerVisible}
        onConfirm={(reference) => { setPickerVisible(false); onStart(0, reference); }}
        onClose={() => setPickerVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 28, paddingTop: 48 },
  heading: { ...typography.displaySm, marginBottom: 8 },
  sub: { ...typography.body, lineHeight: 26, marginBottom: 40 },
  cardLabel: { ...typography.caption, fontFamily: 'Inter_500Medium', textTransform: 'uppercase', letterSpacing: 0.8 },
  cardHint: { ...typography.body, marginBottom: 16 },
  btn: { alignSelf: 'flex-start' },
});
