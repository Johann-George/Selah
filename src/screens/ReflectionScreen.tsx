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
    livesOfPeople: string[];
    iniquities: string[];
    tellToOthers: string[];
    yield: string[];
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
  const [livesOfPeople, setLivesOfPeople] = useState('');
  const [iniquities, setIniquities] = useState('');
  const [tellToOthers, setTellToOthers] = useState('');
  const [yieldField, setYieldField] = useState('');
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
        livesOfPeople: livesOfPeople.split('\n').map((s) => s.trim()).filter(Boolean),
        iniquities: iniquities.split('\n').map((s) => s.trim()).filter(Boolean),
        tellToOthers: tellToOthers.split('\n').map((s) => s.trim()).filter(Boolean),
        yield: yieldField.split('\n').map((s) => s.trim()).filter(Boolean),
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
          placeholder="Attribute of God (Father/Son/Holy Spirit)"
          multiline
          numberOfLines={10}
          containerStyle={styles.inputBlock}
        />
        <Text style={styles.sectionLabel}>U - Undertakings / Promises</Text>
        <Input
          value={undertakings}
          onChangeText={setUndertakings}
          placeholder="What promises does God make?"
          multiline
          numberOfLines={10}
          containerStyle={styles.inputBlock}
        />
        <Text style={styles.sectionLabel}>A - Actions / Commands to obey</Text>
        <Input
          value={actions}
          onChangeText={setActions}
          placeholder="Commands in the passage"
          multiline
          numberOfLines={3}
          containerStyle={styles.inputBlock}
        />
        <Text style={styles.sectionLabel}>L – Lives of People</Text>
        <Input
          value={livesOfPeople}
          onChangeText={setLivesOfPeople}
          placeholder="Examples to follow or avoid"
          multiline
          numberOfLines={3}
          containerStyle={styles.inputBlock}
        />
        <Text style={styles.sectionLabel}>I – Iniquities</Text>
        <Input
          value={iniquities}
          onChangeText={setIniquities}
          placeholder="What sin or struggle is God addressing?"
          multiline
          numberOfLines={3}
          containerStyle={styles.inputBlock}
        />
        <Text style={styles.sectionLabel}>T – Tell to Others</Text>
        <Input
          value={tellToOthers}
          onChangeText={setTellToOthers}
          placeholder="What truth should I share with others?"
          multiline
          numberOfLines={3}
          containerStyle={styles.inputBlock}
        />
        <Text style={styles.sectionLabel}>Y – Yield</Text>
        <Input
          value={yieldField}
          onChangeText={setYieldField}
          placeholder="How to produce the above learning in my present circumstances?"
          multiline
          numberOfLines={3}
          containerStyle={styles.inputBlock}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button title="Save reflection" onPress={handleSave} loading={loading} style={styles.save} />
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
