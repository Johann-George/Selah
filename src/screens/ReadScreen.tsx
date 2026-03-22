import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../components';
import { colors, typography } from '../theme';

export function ReadScreen() {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <Text style={styles.title}>Read</Text>
        <Input
          value={search}
          onChangeText={setSearch}
          placeholder="Search a passage — e.g. John 3:16"
          containerStyle={styles.searchInput}
        />
        <ScrollView style={styles.results} showsVerticalScrollIndicator={false}>
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              {search ? 'Bible search coming soon…' : 'Enter a reference above to begin.'}
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, paddingHorizontal: 28, paddingTop: 24 },
  title: { ...typography.displaySm, color: colors.onSurface, marginBottom: 24 },
  searchInput: { marginBottom: 24 },
  results: { flex: 1 },
  placeholder: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
  },
  placeholderText: { ...typography.body, color: colors.textMuted, textAlign: 'center', lineHeight: 26 },
});
