import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components';
import { useAuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../theme';

export function GroupsScreen() {
  const user = useAuthContext();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Header
        title="Groups"
        showProfile={true}
        userName={user.name}
        onProfilePress={() => navigation.navigate('Profile' as never)}
      />
      <View style={styles.content}>
        <Text style={styles.message}>Groups functionality is coming soon…</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  message: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
});
