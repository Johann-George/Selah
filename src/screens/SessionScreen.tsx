/**
 * Quiet time session: timer + Bible reference. On stop, navigates to Reflection.
 */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input, Card } from '../components';
import { colors, typography } from '../theme';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

interface SessionScreenProps {
  onFinish: (duration: number, bibleReference: string) => void;
  onBack: () => void;
}

export function SessionScreen({ onFinish, onBack }: SessionScreenProps) {
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
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const handleStop = () => {
    setRunning(false);
    if (seconds > 0) {
      onFinish(seconds, bibleReference.trim() || 'Not specified');
    } else {
      onBack();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <Card style={styles.timerCard}>
          <Text style={styles.timer}>{formatTime(seconds)}</Text>
          <View style={styles.timerActions}>
            <Button
              title={running ? 'Pause' : 'Start'}
              onPress={() => setRunning(!running)}
              variant={running ? 'secondary' : 'primary'}
              style={styles.timerBtn}
            />
            <Button
              title="End session"
              onPress={handleStop}
              variant="outline"
              style={styles.timerBtn}
            />
          </View>
        </Card>
        <Input
          label="Bible passage"
          value={bibleReference}
          onChangeText={setBibleReference}
          placeholder="e.g. John 3:16"
        />
        <Button title="Back" onPress={onBack} variant="ghost" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 24 },
  timerCard: { marginBottom: 24, alignItems: 'center' },
  timer: { fontSize: 48, fontWeight: '700', color: colors.primary, marginBottom: 16 },
  timerActions: { flexDirection: 'row', gap: 12 },
  timerBtn: { minWidth: 120 },
});
