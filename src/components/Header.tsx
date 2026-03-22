import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useColors } from '../theme';
import { typography } from '../theme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showProfile?: boolean;
  showSettings?: boolean;
  onProfilePress?: () => void;
  onSettingsPress?: () => void;
  userName?: string;
  large?: boolean;
}

export function Header({
  title, subtitle, showProfile = true, showSettings = false,
  onProfilePress, onSettingsPress, userName = 'User', large = false,
}: HeaderProps) {
  const colors = useColors();
  const initials = userName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, large && styles.titleLarge, { color: colors.onSurface }]}>{title}</Text>
        {subtitle ? <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>{subtitle}</Text> : null}
      </View>
      <View style={styles.actions}>
        {showSettings && (
          <TouchableOpacity onPress={onSettingsPress} style={[styles.iconButton, { backgroundColor: colors.surfaceContainerLow }]}>
            <Entypo name="cog" size={22} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        )}
        {showProfile && (
          <TouchableOpacity onPress={onProfilePress}>
            <View style={[styles.avatar, { backgroundColor: colors.primaryContainer }]}>
              <Text style={[styles.avatarText, { color: colors.primary }]}>{initials}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 16,
  },
  titleContainer: { flex: 1 },
  title: { ...typography.h2 },
  titleLarge: { ...typography.displaySm },
  subtitle: { ...typography.bodySmall, marginTop: 4 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingTop: 4 },
  avatar: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  avatarText: { ...typography.bodySmall, fontFamily: 'Inter_600SemiBold' },
  iconButton: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
});
