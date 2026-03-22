import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { colors, typography } from '../theme';

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
  title,
  subtitle,
  showProfile = true,
  showSettings = false,
  onProfilePress,
  onSettingsPress,
  userName = 'User',
  large = false,
}: HeaderProps) {
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, large && styles.titleLarge]}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.actions}>
        {showSettings && (
          <TouchableOpacity onPress={onSettingsPress} style={styles.iconButton}>
            <Entypo name="cog" size={22} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        )}
        {showProfile && (
          <TouchableOpacity onPress={onProfilePress} style={styles.profileButton}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
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
    backgroundColor: colors.background,
  },
  titleContainer: { flex: 1 },
  title: {
    ...typography.h2,
    color: colors.onSurface,
  },
  titleLarge: {
    ...typography.displaySm,
    color: colors.onSurface,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 4,
  },
  profileButton: {},
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...typography.bodySmall,
    fontFamily: 'Inter_600SemiBold',
    color: colors.primary,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
