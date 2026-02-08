/**
 * Reflection entry: Q (Qualities), U (Undertakings), A (Actions).
 * L/I/T can be added later as extra sections – structure is ready.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input, Card } from '../components';
import { colors, typography } from '../theme';

interface ReflectionScreenProps {
  sessionId: string;
  duration: number;
  bibleReference: string;
  onSave: (data: {
    qualities: string[];
    undertakings: string[];
    actions: string[];
  }) => Promise<void>;
  onBack: () => void;
}

export function ReflectionScreen({
  sessionId,
  duration,
  bibleReference,
  onSave,
  onBack,
}: ReflectionScreenProps) {
  const [qualities, setQualities] = useState('');
  const [undertakings, setUndertakings] = useState('');
  const [actions, setActions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setError('');
    setLoading(true);
    try {
      await onSave({
        qualities: qualities.split('\n').map((s) => s.trim()).filter(Boolean),
        undertakings: undertakings.split('\n').map((s) => s.trim()).filter(Boolean),
        actions: actions.split('\n').map((s) => s.trim()).filter(Boolean),
      });
      onBack();
    } catch (e: unknown) {
      setError((e as Error).message ?? 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Card style={styles.summary}>
          <Text style={styles.summaryText}>
            {bibleReference} · {Math.floor(duration / 60)} min
          </Text>
        </Card>
        <Text style={styles.sectionLabel}>Q – Qualities of God</Text>
        <Input
          value={qualities}
          onChangeText={setQualities}
          placeholder="One per line"
          multiline
          numberOfLines={3}
          containerStyle={styles.inputBlock}
        />
        <Text style={styles.sectionLabel}>U – Undertakings / Promises</Text>
        <Input
          value={undertakings}
          onChangeText={setUndertakings}
          placeholder="One per line"
          multiline
          numberOfLines={3}
          containerStyle={styles.inputBlock}
        />
        <Text style={styles.sectionLabel}>A – Actions / Commands to obey</Text>
        <Input
          value={actions}
          onChangeText={setActions}
          placeholder="One per line"
          multiline
          numberOfLines={3}
          containerStyle={styles.inputBlock}
        />
        {/* L – Life (Obey/Avoid), I – Iniquities, T – Tell to others: add inputs here when needed */}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button title="Save reflection" onPress={handleSave} loading={loading} style={styles.save} />
        <Button title="Back" onPress={onBack} variant="ghost" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 24, paddingBottom: 48 },
  summary: { marginBottom: 24 },
  summaryText: { ...typography.body, color: colors.textSecondary },
  sectionLabel: { ...typography.bodySmall, color: colors.primary, marginBottom: 8, marginTop: 8 },
  inputBlock: { marginBottom: 8 },
  error: { ...typography.bodySmall, color: colors.error, marginBottom: 12 },
  save: { marginTop: 16, marginBottom: 12 },
});
