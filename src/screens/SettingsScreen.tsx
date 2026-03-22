import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { Button } from '../components';
import { useColors, useTheme, typography } from '../theme';
import type { User } from '../types';

type ThemeMode = 'system' | 'light' | 'dark';

interface SettingsScreenProps {
  user: User;
  onSignOut: () => void;
  onBack: () => void;
}

function SettingRow({ label, value, onPress, colors }: {
  label: string; value?: string; onPress?: () => void;
  colors: ReturnType<typeof useColors>;
}) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} disabled={!onPress}>
      <Text style={[styles.rowLabel, { color: colors.onSurface }]}>{label}</Text>
      {value ? (
        <Text style={[styles.rowValue, { color: colors.onSurfaceVariant }]}>{value}</Text>
      ) : (
        <Entypo name="chevron-right" size={18} color={colors.textMuted} />
      )}
    </TouchableOpacity>
  );
}

function SectionContainer({ title, children, colors }: {
  title: string; children: React.ReactNode;
  colors: ReturnType<typeof useColors>;
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.onSurfaceVariant }]}>{title}</Text>
      <View style={[styles.sectionBody, { backgroundColor: colors.surfaceContainerLowest, shadowColor: colors.onSurface }]}>
        {children}
      </View>
    </View>
  );
}

function ThemeOption({ label, value, current, onSelect, colors }: {
  label: string; value: ThemeMode; current: ThemeMode;
  onSelect: (v: ThemeMode) => void; colors: ReturnType<typeof useColors>;
}) {
  const selected = current === value;
  return (
    <TouchableOpacity style={styles.row} onPress={() => onSelect(value)}>
      <Text style={[styles.rowLabel, { color: colors.onSurface }]}>{label}</Text>
      <View style={[styles.radio, { borderColor: colors.primary }, selected && { backgroundColor: colors.primary }]}>
        {selected && <View style={styles.radioDot} />}
      </View>
    </TouchableOpacity>
  );
}

export function SettingsScreen({ user, onSignOut, onBack }: SettingsScreenProps) {
  const colors = useColors();
  const { mode, setMode } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={[styles.backBtn, { backgroundColor: colors.surfaceContainerLow }]}>
          <Entypo name="chevron-left" size={22} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.onSurface }]}>Settings</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <SectionContainer title="Account" colors={colors}>
          <SettingRow label="Name" value={user.name} colors={colors} />
          <SettingRow label="Email" value={user.email} colors={colors} />
        </SectionContainer>

        <SectionContainer title="Appearance" colors={colors}>
          <ThemeOption label="System default" value="system" current={mode} onSelect={setMode} colors={colors} />
          <ThemeOption label="Light" value="light" current={mode} onSelect={setMode} colors={colors} />
          <ThemeOption label="Dark" value="dark" current={mode} onSelect={setMode} colors={colors} />
        </SectionContainer>

        <SectionContainer title="Preferences" colors={colors}>
          <SettingRow label="Notifications" onPress={() => {}} colors={colors} />
        </SectionContainer>

        <SectionContainer title="Data" colors={colors}>
          <SettingRow label="Export data" onPress={() => {}} colors={colors} />
        </SectionContainer>

        <Button title="Sign out" onPress={onSignOut} variant="outline" style={styles.signOut} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  title: { ...typography.h3 },
  placeholder: { width: 40 },
  scroll: { paddingHorizontal: 28, paddingTop: 16, paddingBottom: 48 },
  section: { marginBottom: 32 },
  sectionTitle: { ...typography.caption, fontFamily: 'Inter_500Medium', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  sectionBody: { borderRadius: 24, paddingHorizontal: 20, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14 },
  rowLabel: { ...typography.body },
  rowValue: { ...typography.body },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, justifyContent: 'center', alignItems: 'center' },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' },
  signOut: { alignSelf: 'stretch', marginTop: 8 },
});
