import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { Button, Input, Card } from '../components';
import { useColors, typography } from '../theme';

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
  const colors = useColors();
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
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={[styles.iconBtn, { backgroundColor: colors.surfaceContainerLow }]}>
          <Entypo name="chevron-left" size={24} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.onSurface }]}>Quiet time</Text>
        <TouchableOpacity onPress={onProfilePress}>
          <View style={[styles.avatar, { backgroundColor: colors.primaryContainer }]}>
            <Text style={[styles.avatarText, { color: colors.primary }]}>
              {userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Card style={{ backgroundColor: colors.surfaceContainerLow, alignItems: 'center' as const, marginBottom: 32 }}>
          <Text style={[styles.timer, { color: colors.primary }]}>{formatTime(seconds)}</Text>
          <View style={styles.timerActions}>
            <Button
              title={running ? 'Pause' : 'Start'}
              onPress={() => { setRunning(!running); onFinish(seconds, bibleReference.trim() || 'Not specified'); }}
              variant={running ? 'secondary' : 'primary'}
              style={styles.timerBtn}
            />
            <Button title="End session" onPress={() => setRunning(false)} variant="outline" style={styles.timerBtn} />
          </View>
        </Card>
        <Input label="Bible passage" value={bibleReference} onChangeText={setBibleReference} placeholder="e.g. John 3:16" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { ...typography.h3 },
  avatar: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  avatarText: { ...typography.bodySmall, fontFamily: 'Inter_600SemiBold' },
  content: { flex: 1, paddingHorizontal: 28, paddingTop: 16 },
  timer: { fontFamily: 'Inter_700Bold', fontSize: 64, letterSpacing: -2, marginBottom: 24 },
  timerActions: { flexDirection: 'row', gap: 12 },
  timerBtn: { flex: 1 },
});
