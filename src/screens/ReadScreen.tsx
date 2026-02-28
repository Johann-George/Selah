import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Card } from '../components';
import { colors, typography } from '../theme';

export function ReadScreen() {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <Input
          value={search}
          onChangeText={setSearch}
          placeholder="Search Bible passage (e.g. John 3:16)"
          containerStyle={styles.searchInput}
        />
        <ScrollView style={styles.results}>
          {search ? (
            <Card style={styles.placeholder}>
              <Text style={styles.placeholderText}>
                Bible search coming soon...
              </Text>
            </Card>
          ) : (
            <Card style={styles.placeholder}>
              <Text style={styles.placeholderText}>
                Enter a Bible reference to search
              </Text>
            </Card>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 24 },
  searchInput: { marginBottom: 16 },
  results: { flex: 1 },
  placeholder: { padding: 24, alignItems: 'center' },
  placeholderText: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
});
