import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { Button, Card } from '../components';
import { colors, typography } from '../theme';
import type { User } from '../types';

interface SettingsScreenProps {
  user: User;
  onSignOut: () => void;
  onBack: () => void;
}

export function SettingsScreen({ user, onSignOut, onBack }: SettingsScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Entypo name="chevron-left" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView style={styles.content}>
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.item}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{user.name}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.label}>Notifications</Text>
            <Entypo name="chevron-right" size={20} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.label}>Theme</Text>
            <Entypo name="chevron-right" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.label}>Export data</Text>
            <Entypo name="chevron-right" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </Card>

        <Button
          title="Sign out"
          onPress={onSignOut}
          variant="outline"
          style={styles.signOut}
        />
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 4,
  },
  title: {
    ...typography.h2,
    color: colors.text,
  },
  placeholder: {
    width: 36,
  },
  content: { flex: 1, padding: 24 },
  section: { marginBottom: 16, padding: 16 },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    ...typography.body,
    color: colors.text,
  },
  value: {
    ...typography.body,
    color: colors.textSecondary,
  },
  signOut: { marginTop: 24 },
});
