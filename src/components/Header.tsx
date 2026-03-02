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
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.actions}>
        {showProfile && (
          <TouchableOpacity onPress={onProfilePress} style={styles.profileButton}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          </TouchableOpacity>
        )}
        {showSettings && (
          <TouchableOpacity onPress={onSettingsPress} style={styles.iconButton}>
            <Entypo name="cog" size={24} color={colors.text} />
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
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: colors.background,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  titleLarge: {
    fontSize: 36,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileButton: {
    padding: 4,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...typography.body,
    color: '#fff',
    fontWeight: '600',
  },
  iconButton: {
    padding: 4,
  },
});
