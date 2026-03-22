import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components';
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

function ReflectionField({
  label,
  letter,
  value,
  onChangeText,
  placeholder,
  numberOfLines = 3,
}: {
  label: string;
  letter: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
  numberOfLines?: number;
}) {
  return (
    <View style={fieldStyles.container}>
      <View style={fieldStyles.labelRow}>
        <Text style={fieldStyles.letter}>{letter}</Text>
        <Text style={fieldStyles.label}>{label}</Text>
      </View>
      <TextInput
        style={fieldStyles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        multiline
        numberOfLines={numberOfLines}
        textAlignVertical="top"
      />
    </View>
  );
}

const fieldStyles = StyleSheet.create({
  container: { marginBottom: 32 },
  labelRow: { flexDirection: 'row', alignItems: 'baseline', gap: 10, marginBottom: 10 },
  letter: {
    ...typography.h2,
    color: colors.primary,
    opacity: 0.35,
    lineHeight: 28,
  },
  label: {
    ...typography.bodySmall,
    fontFamily: 'Inter_500Medium',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  input: {
    ...typography.body,
    color: colors.onSurface,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 80,
    shadowColor: colors.onSurface,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 1,
  },
});

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
    } catch (e: unknown) {
      setError((e as Error).message ?? 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Passage header */}
        <View style={styles.passageRow}>
          <Text style={styles.passageRef}>{bibleReference}</Text>
          {duration > 0 && (
            <Text style={styles.passageDuration}>{Math.floor(duration / 60)} min</Text>
          )}
        </View>
        <Text style={styles.pageTitle}>Reflection</Text>

        <ReflectionField
          letter="Q" label="Qualities of God"
          value={qualities} onChangeText={setQualities}
          placeholder="Attributes of God (Father / Son / Holy Spirit)"
          numberOfLines={4}
        />
        <ReflectionField
          letter="U" label="Undertakings & Promises"
          value={undertakings} onChangeText={setUndertakings}
          placeholder="What promises does God make?"
          numberOfLines={4}
        />
        <ReflectionField
          letter="A" label="Actions to obey"
          value={actions} onChangeText={setActions}
          placeholder="Commands in the passage"
        />
        <ReflectionField
          letter="L" label="Lives of People"
          value={livesOfPeople} onChangeText={setLivesOfPeople}
          placeholder="Examples to follow or avoid"
        />
        <ReflectionField
          letter="I" label="Iniquities"
          value={iniquities} onChangeText={setIniquities}
          placeholder="What sin or struggle is God addressing?"
        />
        <ReflectionField
          letter="T" label="Tell to Others"
          value={tellToOthers} onChangeText={setTellToOthers}
          placeholder="What truth should I share?"
        />
        <ReflectionField
          letter="Y" label="Yield"
          value={yieldField} onChangeText={setYieldField}
          placeholder="How to produce this learning in my circumstances?"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button title="Save reflection" onPress={handleSave} loading={loading} style={styles.save} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 28, paddingTop: 32, paddingBottom: 56 },
  passageRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  passageRef: { ...typography.bodySmall, fontFamily: 'Inter_500Medium', color: colors.primary },
  passageDuration: { ...typography.caption, color: colors.textMuted },
  pageTitle: { ...typography.displaySm, color: colors.onSurface, marginBottom: 40 },
  error: { ...typography.bodySmall, color: colors.error, marginBottom: 16 },
  save: { marginTop: 8, alignSelf: 'stretch' },
});
