/**
 * Profile screen with tabs for Progress and Activities.
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { colors, typography } from '../theme';
import type { User } from '../types';

interface ProfileScreenProps {
  user: User;
  onNavigateToProgress: () => void;
  onNavigateToActivities: () => void;
  onNavigateToUserDetails: () => void;
}

export function ProfileScreen({ 
  user, 
  onNavigateToProgress,
  onNavigateToActivities,
  onNavigateToUserDetails,
}: ProfileScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={onNavigateToUserDetails} style={styles.profileButton}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.tab} onPress={onNavigateToProgress}>
          <Entypo name="bar-graph" size={24} color={colors.text} />
          <Text style={styles.tabText}>Progress</Text>
          <Entypo name="chevron-right" size={24} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab} onPress={onNavigateToActivities}>
          <Entypo name="list" size={24} color={colors.text} />
          <Text style={styles.tabText}>Activities</Text>
          <Entypo name="chevron-right" size={24} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: { ...typography.h1, color: colors.text },
  profileButton: { padding: 4 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { ...typography.body, color: '#fff', fontWeight: '600' },
  content: { flex: 1, padding: 24 },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginBottom: 12,
  },
  tabText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
    marginLeft: 16,
  },
});
