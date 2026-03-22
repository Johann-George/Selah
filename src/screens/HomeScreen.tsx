import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Header } from '../components';
import { useColors, typography } from '../theme';

interface HomeScreenProps {
  onStartSession: () => void;
  todayDuration?: number;
  todayReference?: string;
  userName?: string;
  onProfilePress?: () => void;
}

export function HomeScreen({
  onStartSession, todayDuration = 0, todayReference = '', userName = 'User', onProfilePress,
}: HomeScreenProps) {
  const colors = useColors();
  const hasSession = todayDuration > 0 || todayReference;
  const firstName = userName.split(' ')[0];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <Header title={`Good morning,\n${firstName}.`} subtitle="Your quiet time awaits." showProfile userName={userName} onProfilePress={onProfilePress} large />
      <View style={styles.content}>
        {hasSession ? (
          <Card style={{ backgroundColor: colors.primaryContainer }}>
            <Text style={[styles.sessionLabel, { color: colors.primaryDim }]}>Today's session</Text>
            {todayDuration > 0 && (
              <Text style={[styles.sessionStat, { color: colors.primary }]}>{Math.floor(todayDuration / 60)} min</Text>
            )}
            {todayReference ? <Text style={[styles.sessionRef, { color: colors.primaryDim }]}>{todayReference}</Text> : null}
          </Card>
        ) : (
          <View style={styles.emptyArea}>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>No session yet today.</Text>
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <Button title="Start quiet time" onPress={onStartSession} style={styles.cta} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 28, paddingTop: 8 },
  sessionLabel: { ...typography.caption, fontFamily: 'Inter_500Medium', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 },
  sessionStat: { ...typography.displaySm, marginBottom: 4 },
  sessionRef: { ...typography.body },
  emptyArea: { flex: 1, justifyContent: 'center' },
  emptyText: { ...typography.body },
  footer: { paddingHorizontal: 28, paddingBottom: 32, paddingTop: 16 },
  cta: { alignSelf: 'stretch' },
});
