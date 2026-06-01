import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Button, BiblePickerModal } from '../components';
import { useColors, typography } from '../theme';

interface Verse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export function ReadScreen() {
  const colors = useColors();
  const navigation = useNavigation<any>();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [passageText, setPassageText] = useState<string | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPassage = async (ref: string) => {
    setLoading(true);
    setError(null);
    try {
      // Replace en-dash with standard hyphen for URL safety
      const encodedRef = encodeURIComponent(ref.replace(/–/g, '-'));
      const response = await fetch(`https://bible-api.com/${encodedRef}`);
      if (!response.ok) {
        throw new Error('Passage not found or API error.');
      }
      const data = await response.json();
      if (data && data.text) {
        setPassageText(data.text);
        setVerses(data.verses || []);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Fetch passage error:', err);
      setError('Could not fetch the bible passage. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  const handlePassageConfirm = (ref: string) => {
    setPickerVisible(false);
    setReference(ref);
    fetchPassage(ref);
  };

  const handleMoveToReflect = () => {
    if (reference) {
      navigation.navigate('Reflect', { bibleReference: reference });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.onSurface }]}>Read</Text>
          {reference && (
            <TouchableOpacity
              style={[styles.changePassageBtn, { backgroundColor: colors.primaryContainer }]}
              onPress={() => setPickerVisible(true)}
              activeOpacity={0.8}
            >
              <Text style={[styles.changePassageText, { color: colors.primaryDim }]}>Change</Text>
            </TouchableOpacity>
          )}
        </View>

        {!reference ? (
          <View style={styles.placeholderContainer}>
            <View style={[styles.placeholderCard, { backgroundColor: colors.surfaceContainerLow }]}>
              <Text style={styles.placeholderEmoji}>📖</Text>
              <Text style={[styles.placeholderTitle, { color: colors.onSurface }]}>No passage selected</Text>
              <Text style={[styles.placeholderText, { color: colors.textMuted }]}>
                Choose a scripture portion to read and reflect upon.
              </Text>
              <Button
                title="Select Passage"
                onPress={() => setPickerVisible(true)}
                style={styles.selectBtn}
              />
            </View>
          </View>
        ) : loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.loadingText, { color: colors.textMuted }]}>Loading passage...</Text>
          </View>
        ) : error ? (
          <View style={[styles.errorCard, { backgroundColor: colors.surfaceContainerLow }]}>
            <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
            <Button title="Retry" onPress={() => fetchPassage(reference)} style={styles.retryBtn} />
            <Button title="Select Another Passage" onPress={() => setPickerVisible(true)} variant="ghost" style={{ marginTop: 8 }} />
          </View>
        ) : (
          <ScrollView
            style={styles.passageScroll}
            contentContainerStyle={styles.passageContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.passageHeader}>
              <Text style={[styles.passageRef, { color: colors.primary }]}>{reference}</Text>
              <Text style={[styles.translationLabel, { color: colors.textMuted }]}>World English Bible</Text>
            </View>

            {verses.length > 0 ? (
              <Text style={[styles.passageBody, { color: colors.onSurface }]}>
                {verses.map((v, i) => (
                  <React.Fragment key={i}>
                    <Text style={[styles.verseNumber, { color: colors.primaryDim }]}>{v.verse} </Text>
                    <Text style={styles.verseText}>{v.text.replace(/\n/g, ' ').trim()}  </Text>
                  </React.Fragment>
                ))}
              </Text>
            ) : passageText ? (
              <Text style={[styles.passageTextOnly, { color: colors.onSurface }]}>
                {passageText.trim()}
              </Text>
            ) : null}

            <Button
              title="Move to Reflect tab"
              onPress={handleMoveToReflect}
              style={styles.reflectBtn}
            />
          </ScrollView>
        )}
      </View>
      <BiblePickerModal
        visible={pickerVisible}
        onConfirm={handlePassageConfirm}
        onClose={() => setPickerVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    ...typography.displaySm,
  },
  changePassageBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  changePassageText: {
    ...typography.bodySmall,
    fontFamily: 'Inter_600SemiBold',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  placeholderCard: {
    width: '100%',
    borderRadius: 32,
    padding: 32,
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  placeholderTitle: {
    ...typography.h3,
    marginBottom: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  placeholderText: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  selectBtn: {
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.bodySmall,
    marginTop: 16,
    fontFamily: 'Inter_500Medium',
  },
  errorCard: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
  },
  errorText: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryBtn: {
    width: '100%',
  },
  passageScroll: {
    flex: 1,
  },
  passageContent: {
    paddingBottom: 40,
  },
  passageHeader: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(178,178,173,0.15)',
    paddingBottom: 16,
  },
  passageRef: {
    ...typography.h2,
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  translationLabel: {
    ...typography.caption,
    fontFamily: 'Inter_500Medium',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  passageBody: {
    ...typography.body,
    fontSize: 18,
    lineHeight: 32,
    fontFamily: 'Inter_400Regular',
    marginBottom: 36,
  },
  passageTextOnly: {
    ...typography.body,
    fontSize: 18,
    lineHeight: 32,
    fontFamily: 'Inter_400Regular',
    marginBottom: 36,
  },
  verseNumber: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  verseText: {
    fontFamily: 'Inter_400Regular',
  },
  reflectBtn: {
    marginTop: 16,
    width: '100%',
  },
});

