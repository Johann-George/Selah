/**
 * Quiet time session: timer + Bible reference. On stop, navigates to Reflection.
 */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { Button, Input, Card, Header } from '../components';
import { colors, typography } from '../theme';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

interface SessionScreenProps {
  onFinish: (duration: number, bibleReference: string) => void;
  onBack: () => void;
  userName?: string;
  onProfilePress?: () => void;
}

export function SessionScreen({ onFinish, onBack, userName = 'User', onProfilePress }: SessionScreenProps) {
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
    onFinish(seconds, bibleReference.trim() || 'Not specified');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Entypo name="chevron-left" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Quiet time</Text>
        <TouchableOpacity onPress={onProfilePress} style={styles.profileButton}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 4,
  },
  title: {
    ...typography.h2,
    color: colors.text,
  },
  profileButton: {
    padding: 4,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...typography.body,
    color: '#fff',
    fontWeight: '600',
  },
  content: { flex: 1, padding: 24 },
  timerCard: { marginBottom: 24, alignItems: 'center' },
  timer: { fontSize: 48, fontWeight: '700', color: colors.primary, marginBottom: 16 },
  timerActions: { flexDirection: 'row', gap: 12 },
  timerBtn: { minWidth: 120 },
});
