import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components';
import { useAuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useColors, typography } from '../theme';

export function GroupsScreen() {
  const colors = useColors();
  const user = useAuthContext();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <Header title="Groups" showProfile userName={user.name} onProfilePress={() => navigation.navigate('Profile' as never)} />
      <View style={styles.content}>
        <Text style={[styles.message, { color: colors.textMuted }]}>Groups functionality is coming soon…</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  message: { ...typography.body, textAlign: 'center' },
});
