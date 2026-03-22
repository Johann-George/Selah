/**
 * Start session screen — opens Bible picker on Start, then hands off to ReflectionScreenConnected.
 */
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
        <Card style={styles.card}>
          <Text style={styles.heading}>Ready to begin?</Text>
          <Text style={styles.sub}>Select a Bible passage to start your quiet time.</Text>
          <Button
            title="Start"
            onPress={() => setPickerVisible(true)}
            style={styles.btn}
          />
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
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  card: { alignItems: 'center', gap: 8 },
  heading: { ...typography.h2, color: colors.text, marginBottom: 4 },
  sub: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginBottom: 16 },
  btn: { minWidth: 140 },
});
