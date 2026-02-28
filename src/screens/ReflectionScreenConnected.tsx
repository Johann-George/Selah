import React from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ReflectionScreen } from './ReflectionScreen';
import { updateSession } from '../services/sessions';
import type { ReflectionTabParamList, MainTabParamList } from '../types';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '../theme';

type ReflectionRoute = RouteProp<ReflectionTabParamList, 'Reflect'>;
type Nav = CompositeNavigationProp<
  MaterialTopTabNavigationProp<ReflectionTabParamList, 'Reflect'>,
  BottomTabNavigationProp<MainTabParamList>
>;

export function ReflectionScreenConnected() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<ReflectionRoute>();
  const { sessionId, duration, bibleReference } = route.params || {};

  if (!sessionId || !duration || !bibleReference) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No active session</Text>
          <Text style={styles.emptySubtext}>Start a session from the Today tab to reflect</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <ReflectionScreen
      sessionId={sessionId}
      duration={duration}
      bibleReference={bibleReference}
      onBack={() => navigation.navigate('Home')}
      onSave={async (data) => {
        await updateSession(sessionId, {
          qualities: data.qualities,
          undertakings: data.undertakings,
          actions: data.actions,
        });
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
