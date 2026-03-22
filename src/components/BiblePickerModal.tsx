import React, { useState, useMemo } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useColors, typography } from '../theme';
import bibleData from '../../data/bible.json';

interface BibleBook {
  abbr: string;
  book: string;
  chapters: { chapter: string; verses: string }[];
}

interface Props {
  visible: boolean;
  onConfirm: (reference: string) => void;
  onClose: () => void;
}

const books: BibleBook[] = bibleData as BibleBook[];
type Section = 'book' | 'chapter' | 'verse';

export function BiblePickerModal({ visible, onConfirm, onClose }: Props) {
  const colors = useColors();
  const [section, setSection] = useState<Section>('book');
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [fromVerse, setFromVerse] = useState<number | null>(null);
  const [tillVerse, setTillVerse] = useState<number | null>(null);

  const verseCount = useMemo(() => {
    if (!selectedBook || !selectedChapter) return 0;
    const ch = selectedBook.chapters.find((c) => c.chapter === selectedChapter);
    return ch ? parseInt(ch.verses, 10) : 0;
  }, [selectedBook, selectedChapter]);

  const verses = useMemo(() => Array.from({ length: verseCount }, (_, i) => i + 1), [verseCount]);

  const reset = () => { setSection('book'); setSelectedBook(null); setSelectedChapter(null); setFromVerse(null); setTillVerse(null); };
  const handleClose = () => { reset(); onClose(); };

  const handleBookSelect = (book: BibleBook) => {
    setSelectedBook(book); setSelectedChapter(null); setFromVerse(null); setTillVerse(null); setSection('chapter');
  };
  const handleChapterSelect = (chapter: string) => {
    setSelectedChapter(chapter); setFromVerse(null); setTillVerse(null); setSection('verse');
  };
  const handleConfirm = () => {
    if (!selectedBook || !selectedChapter) return;
    let ref = `${selectedBook.book} ${selectedChapter}`;
    if (fromVerse) ref += `:${fromVerse}`;
    if (fromVerse && tillVerse && tillVerse !== fromVerse) ref += `–${tillVerse}`;
    onConfirm(ref); reset();
  };

  const canConfirm = selectedBook && selectedChapter;
  const breadcrumb = [
    selectedBook?.book,
    selectedChapter ? `Ch. ${selectedChapter}` : null,
    fromVerse ? `v.${fromVerse}${tillVerse && tillVerse !== fromVerse ? `–${tillVerse}` : ''}` : null,
  ].filter(Boolean).join('  ›  ');

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <SafeAreaView style={[styles.sheet, { backgroundColor: colors.background, shadowColor: colors.onSurface }]}>
          <View style={[styles.handle, { backgroundColor: colors.surfaceContainer }]} />

          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose}>
              <Text style={[styles.cancelText, { color: colors.onSurfaceVariant }]}>Cancel</Text>
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.onSurface }]}>Select Passage</Text>
            <TouchableOpacity onPress={handleConfirm} disabled={!canConfirm}>
              <Text style={[styles.doneText, { color: colors.primary }, !canConfirm && { color: colors.textMuted }]}>Done</Text>
            </TouchableOpacity>
          </View>

          {breadcrumb ? (
            <View style={[styles.breadcrumbRow, { backgroundColor: colors.primaryContainer, marginHorizontal: 16 }]}>
              <Text style={[styles.breadcrumb, { color: colors.primaryDim }]}>{breadcrumb}</Text>
            </View>
          ) : null}

          <View style={styles.tabs}>
            {(['book', 'chapter', 'verse'] as Section[]).map((s) => {
              const label = s === 'book' ? 'Book' : s === 'chapter' ? 'Chapter' : 'Verses';
              const active = section === s;
              const disabled = (s === 'chapter' && !selectedBook) || (s === 'verse' && !selectedChapter);
              return (
                <TouchableOpacity
                  key={s}
                  style={[styles.tab, { backgroundColor: active ? colors.primary : colors.surfaceContainerLow }]}
                  onPress={() => !disabled && setSection(s)}
                  disabled={disabled}
                >
                  <Text style={[styles.tabText, { color: active ? colors.onPrimary : colors.onSurfaceVariant }, disabled && { opacity: 0.4 }]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {section === 'book' && (
            <ScrollView contentContainerStyle={styles.list}>
              {books.map((b) => (
                <TouchableOpacity
                  key={b.abbr}
                  style={[styles.bookItem, selectedBook?.abbr === b.abbr && { backgroundColor: colors.primaryContainer, marginHorizontal: -20, paddingHorizontal: 24, borderRadius: 16 }]}
                  onPress={() => handleBookSelect(b)}
                >
                  <Text style={[styles.bookText, { color: colors.onSurface }, selectedBook?.abbr === b.abbr && { color: colors.primary, fontFamily: 'Inter_600SemiBold' }]}>
                    {b.book}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {section === 'chapter' && selectedBook && (
            <ScrollView contentContainerStyle={styles.grid}>
              {selectedBook.chapters.map((c) => (
                <TouchableOpacity
                  key={c.chapter}
                  style={[styles.cell, { backgroundColor: selectedChapter === c.chapter ? colors.primary : colors.surfaceContainerLow }]}
                  onPress={() => handleChapterSelect(c.chapter)}
                >
                  <Text style={[styles.cellText, { color: selectedChapter === c.chapter ? colors.onPrimary : colors.onSurface }]}>
                    {c.chapter}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {section === 'verse' && selectedChapter && (
            <View style={styles.verseSection}>
              <VerseRow label="From" verses={verses} selected={fromVerse} colors={colors}
                onSelect={(v) => { setFromVerse(v); if (tillVerse && tillVerse < v) setTillVerse(v); }} />
              <VerseRow label="Till" verses={verses.filter((v) => !fromVerse || v >= fromVerse)} selected={tillVerse} colors={colors} onSelect={setTillVerse} />
            </View>
          )}
        </SafeAreaView>
      </View>
    </Modal>
  );
}

function VerseRow({ label, verses, selected, onSelect, colors }: {
  label: string; verses: number[]; selected: number | null;
  onSelect: (v: number) => void; colors: ReturnType<typeof useColors>;
}) {
  return (
    <View style={styles.verseRow}>
      <Text style={[styles.verseLabel, { color: colors.onSurfaceVariant }]}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.verseScroll}>
        {verses.map((v) => (
          <TouchableOpacity
            key={v}
            style={[styles.cell, { backgroundColor: selected === v ? colors.primary : colors.surfaceContainerLow }]}
            onPress={() => onSelect(v)}
          >
            <Text style={[styles.cellText, { color: selected === v ? colors.onPrimary : colors.onSurface }]}>{v}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheet: { borderTopLeftRadius: 32, borderTopRightRadius: 32, maxHeight: '82%', paddingBottom: 16, shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.06, shadowRadius: 32, elevation: 8 },
  handle: { width: 36, height: 4, borderRadius: 2, alignSelf: 'center', marginTop: 12, marginBottom: 4 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16 },
  title: { ...typography.body, fontFamily: 'Inter_600SemiBold' },
  cancelText: { ...typography.body },
  doneText: { ...typography.body, fontFamily: 'Inter_600SemiBold' },
  breadcrumbRow: { borderRadius: 16, paddingHorizontal: 16, paddingVertical: 10, marginBottom: 4 },
  breadcrumb: { ...typography.bodySmall, fontFamily: 'Inter_500Medium' },
  tabs: { flexDirection: 'row', paddingHorizontal: 24, paddingVertical: 12, gap: 8 },
  tab: { paddingVertical: 8, paddingHorizontal: 18, borderRadius: 100 },
  tabText: { ...typography.bodySmall, fontFamily: 'Inter_500Medium' },
  list: { paddingHorizontal: 24, paddingBottom: 16 },
  bookItem: { paddingVertical: 14, paddingHorizontal: 4 },
  bookText: { ...typography.body },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, paddingBottom: 16, gap: 8 },
  cell: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  cellText: { ...typography.bodySmall, fontFamily: 'Inter_500Medium' },
  verseSection: { paddingVertical: 8 },
  verseRow: { marginBottom: 20 },
  verseLabel: { ...typography.caption, fontFamily: 'Inter_500Medium', textTransform: 'uppercase', letterSpacing: 0.8, paddingHorizontal: 24, marginBottom: 10 },
  verseScroll: { paddingHorizontal: 16, gap: 8, flexDirection: 'row', alignItems: 'center' },
});
