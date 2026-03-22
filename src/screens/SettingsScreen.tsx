import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { Button } from '../components';
import { colors, typography } from '../theme';
import type { User } from '../types';

interface SettingsScreenProps {
  user: User;
  onSignOut: () => void;
  onBack: () => void;
}

function SettingRow({ label, value, onPress }: { label: string; value?: string; onPress?: () => void }) {
  return (
    <TouchableOpacity style={rowStyles.row} onPress={onPress} disabled={!onPress}>
      <Text style={rowStyles.label}>{label}</Text>
      {value ? (
        <Text style={rowStyles.value}>{value}</Text>
      ) : (
        <Entypo name="chevron-right" size={18} color={colors.textMuted} />
      )}
    </TouchableOpacity>
  );
}

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  label: { ...typography.body, color: colors.onSurface },
  value: { ...typography.body, color: colors.onSurfaceVariant },
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={sectionStyles.container}>
      <Text style={sectionStyles.title}>{title}</Text>
      <View style={sectionStyles.body}>{children}</View>
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  container: { marginBottom: 32 },
  title: {
    ...typography.caption,
    fontFamily: 'Inter_500Medium',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  body: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 24,
    paddingHorizontal: 20,
    shadowColor: colors.onSurface,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 1,
  },
});

export function SettingsScreen({ user, onSignOut, onBack }: SettingsScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Entypo name="chevron-left" size={22} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Section title="Account">
          <SettingRow label="Name" value={user.name} />
          <SettingRow label="Email" value={user.email} />
        </Section>
        <Section title="Preferences">
          <SettingRow label="Notifications" onPress={() => {}} />
          <SettingRow label="Theme" onPress={() => {}} />
        </Section>
        <Section title="Data">
          <SettingRow label="Export data" onPress={() => {}} />
        </Section>
        <Button title="Sign out" onPress={onSignOut} variant="outline" style={styles.signOut} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.surfaceContainerLow,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { ...typography.h3, color: colors.onSurface },
  placeholder: { width: 40 },
  scroll: { paddingHorizontal: 28, paddingTop: 16, paddingBottom: 48 },
  signOut: { alignSelf: 'stretch', marginTop: 8 },
});
