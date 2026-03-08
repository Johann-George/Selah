import React, { useState, useRef } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ReflectionScreen } from './ReflectionScreen';
import { StartSessionScreen } from './StartSessionScreen';
import { SessionSummaryScreen } from './SessionSummaryScreen';
import { useAuthContext } from '../context/AuthContext';
import { createSession, updateSession } from '../services/sessions';
import type { ReflectionTabParamList, MainTabParamList } from '../types';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { colors, typography } from '../theme';

type ReflectionRoute = RouteProp<ReflectionTabParamList, 'Reflect'>;
type Nav = CompositeNavigationProp<
  MaterialTopTabNavigationProp<ReflectionTabParamList, 'Reflect'>,
  BottomTabNavigationProp<MainTabParamList>
>;

export function ReflectionScreenConnected() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<ReflectionRoute>();
  const user = useAuthContext();
  const [sessionData, setSessionData] = useState<{
    sessionId: string;
    duration: number;
    bibleReference: string;
  } | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const timerRef = useRef({ seconds: 0, isRunning: false });

  // If showing summary, display summary screen
  if (showSummary && sessionData) {
    return (
      <SessionSummaryScreen
        duration={sessionData.duration}
        bibleReference={sessionData.bibleReference}
        date={new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
        onDone={() => {
          setShowSummary(false);
          setSessionData(null);
          navigation.navigate('Home');
        }}
      />
    );
  }

  // If no session data yet, show start session screen
  if (!sessionData) {
    return (
      <StartSessionScreen
        onTimerUpdate={(seconds, isRunning) => {
          timerRef.current = { seconds, isRunning };
        }}
        onStart={async (duration, bibleReference) => {
          try {
            const session = await createSession(user.id, {
              date: new Date().toISOString().slice(0, 10),
              duration: timerRef.current.seconds,
              bibleReference,
              qualities: [],
              undertakings: [],
              actions: [],
            });
            setSessionData({
              sessionId: session.id,
              duration: timerRef.current.seconds,
              bibleReference,
            });
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create session';
            Alert.alert('Error', message);
          }
        }}
      />
    );
  }

  return (
    <ReflectionScreen
      sessionId={sessionData.sessionId}
      duration={sessionData.duration}
      bibleReference={sessionData.bibleReference}
      onBack={() => navigation.navigate('Home')}
      onSave={async (data) => {
        await updateSession(sessionData.sessionId, {
          qualities: data.qualities,
          undertakings: data.undertakings,
          actions: data.actions,
          livesOfPeople: data.livesOfPeople,
          iniquities: data.iniquities,
          tellToOthers: data.tellToOthers,
          yield: data.yield,
        });
        setShowSummary(true);
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  emptyText: { ...typography.h2, color: colors.text, marginBottom: 8 },
  emptySubtext: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
});
