/**
 * Start session screen with timer and Bible reference input.
 */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input, Card } from '../components';
import { colors, typography } from '../theme';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

interface StartSessionScreenProps {
  onStart: (duration: number, bibleReference: string) => void;
  onTimerUpdate?: (seconds: number, isRunning: boolean) => void;
}

export function StartSessionScreen({ onStart, onTimerUpdate }: StartSessionScreenProps) {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [bibleReference, setBibleReference] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    onTimerUpdate?.(seconds, running);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, seconds, onTimerUpdate]);

  const handleStart = () => {
    setRunning(false);
    onStart(seconds, bibleReference.trim() || 'Not specified');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.timerCard}>
          <Text style={styles.timer}>{formatTime(seconds)}</Text>
          <Button
            title={running ? 'Pause' : 'Start'}
            onPress={() => setRunning(!running)}
            variant={running ? 'secondary' : 'primary'}
            style={styles.timerBtn}
          />
        </Card>
        <Input
          label="Bible passage"
          value={bibleReference}
          onChangeText={setBibleReference}
          placeholder="e.g. John 3:16"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 24 },
  timerCard: { marginBottom: 24, alignItems: 'center' },
  timer: { fontSize: 48, fontWeight: '700', color: colors.primary, marginBottom: 16 },
  timerBtn: { minWidth: 120 },
});
