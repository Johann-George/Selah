import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components';
import { useColors, typography } from '../theme';

interface ReflectionScreenProps {
  sessionId: string;
  duration: number;
  bibleReference: string;
  onSave: (data: {
    qualities: string[]; undertakings: string[]; actions: string[];
    livesOfPeople: string[]; iniquities: string[]; tellToOthers: string[]; yield: string[];
  }) => Promise<void>;
  onBack: () => void;
}

function ReflectionField({ letter, label, value, onChangeText, placeholder, numberOfLines = 3, colors }: {
  letter: string; label: string; value: string; onChangeText: (t: string) => void;
  placeholder: string; numberOfLines?: number; colors: ReturnType<typeof useColors>;
}) {
  return (
    <View style={fieldStyles.container}>
      <View style={fieldStyles.labelRow}>
        <Text style={[fieldStyles.letter, { color: colors.primary }]}>{letter}</Text>
        <Text style={[fieldStyles.label, { color: colors.onSurfaceVariant }]}>{label}</Text>
      </View>
      <TextInput
        style={[fieldStyles.input, { color: colors.onSurface, backgroundColor: colors.surfaceContainerLowest, shadowColor: colors.onSurface }]}
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
  letter: { ...typography.h2, opacity: 0.35, lineHeight: 28 },
  label: { ...typography.bodySmall, fontFamily: 'Inter_500Medium', textTransform: 'uppercase', letterSpacing: 0.8 },
  input: {
    ...typography.body, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 16, minHeight: 80,
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 1,
  },
});

export function ReflectionScreen({ sessionId, duration, bibleReference, onSave, onBack }: ReflectionScreenProps) {
  const colors = useColors();
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
    setError(''); setLoading(true);
    try {
      await onSave({
        qualities: qualities.split('\n').map(s => s.trim()).filter(Boolean),
        undertakings: undertakings.split('\n').map(s => s.trim()).filter(Boolean),
        actions: actions.split('\n').map(s => s.trim()).filter(Boolean),
        livesOfPeople: livesOfPeople.split('\n').map(s => s.trim()).filter(Boolean),
        iniquities: iniquities.split('\n').map(s => s.trim()).filter(Boolean),
        tellToOthers: tellToOthers.split('\n').map(s => s.trim()).filter(Boolean),
        yield: yieldField.split('\n').map(s => s.trim()).filter(Boolean),
      });
    } catch (e: unknown) { setError((e as Error).message ?? 'Failed to save'); }
    finally { setLoading(false); }
  };

  const field = (letter: string, label: string, value: string, onChange: (t: string) => void, placeholder: string, lines?: number) => (
    <ReflectionField key={letter} letter={letter} label={label} value={value} onChangeText={onChange} placeholder={placeholder} numberOfLines={lines} colors={colors} />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.passageRow}>
          <Text style={[styles.passageRef, { color: colors.primary }]}>{bibleReference}</Text>
          {duration > 0 && <Text style={[styles.passageDuration, { color: colors.textMuted }]}>{Math.floor(duration / 60)} min</Text>}
        </View>
        <Text style={[styles.pageTitle, { color: colors.onSurface }]}>Reflection</Text>
        {field('Q', 'Qualities of God', qualities, setQualities, 'Attributes of God (Father / Son / Holy Spirit)', 4)}
        {field('U', 'Undertakings & Promises', undertakings, setUndertakings, 'What promises does God make?', 4)}
        {field('A', 'Actions to obey', actions, setActions, 'Commands in the passage')}
        {field('L', 'Lives of People', livesOfPeople, setLivesOfPeople, 'Examples to follow or avoid')}
        {field('I', 'Iniquities', iniquities, setIniquities, 'What sin or struggle is God addressing?')}
        {field('T', 'Tell to Others', tellToOthers, setTellToOthers, 'What truth should I share?')}
        {field('Y', 'Yield', yieldField, setYieldField, 'How to produce this learning in my circumstances?')}
        {error ? <Text style={[styles.error, { color: colors.error }]}>{error}</Text> : null}
        <Button title="Save reflection" onPress={handleSave} loading={loading} style={styles.save} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 28, paddingTop: 32, paddingBottom: 56 },
  passageRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 },
  passageRef: { ...typography.bodySmall, fontFamily: 'Inter_500Medium' },
  passageDuration: { ...typography.caption },
  pageTitle: { ...typography.displaySm, marginBottom: 40 },
  error: { ...typography.bodySmall, marginBottom: 16 },
  save: { marginTop: 8, alignSelf: 'stretch' },
});
