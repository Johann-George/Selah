import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input } from '../components';
import { useColors, typography } from '../theme';
import { signUp, signIn } from '../services/auth';

type Mode = 'welcome' | 'signIn' | 'signUp';

interface OnboardingScreenProps {
  onComplete?: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const colors = useColors();
  const [mode, setMode] = useState<Mode>('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setError('');
    if (!email.trim() || !password) { setError('Email and password required'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    try { await signUp(email.trim(), password, name.trim()); onComplete?.(); }
    catch (e: unknown) { setError((e as Error).message ?? 'Sign up failed'); }
    finally { setLoading(false); }
  };

  const handleSignIn = async () => {
    setError('');
    if (!email.trim() || !password) { setError('Email and password required'); return; }
    setLoading(true);
    try { await signIn(email.trim(), password); onComplete?.(); }
    catch (e: unknown) { setError((e as Error).message ?? 'Sign in failed'); }
    finally { setLoading(false); }
  };

  if (mode === 'welcome') {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
        <View style={styles.welcomeContent}>
          <View style={styles.heroArea}>
            <Text style={[styles.wordmark, { color: colors.primary }]}>Selah</Text>
            <Text style={[styles.tagline, { color: colors.onSurfaceVariant }]}>
              A quiet space for{'\n'}your daily reflection.
            </Text>
          </View>
          <View style={styles.welcomeActions}>
            <Button title="Begin" onPress={() => setMode('signUp')} style={styles.fullWidth} />
            <Button title="I have an account" onPress={() => setMode('signIn')} variant="ghost" style={styles.fullWidth} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboard}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={[styles.screenTitle, { color: colors.onSurface }]}>
            {mode === 'signUp' ? 'Create account' : 'Welcome back'}
          </Text>
          <Text style={[styles.screenSubtitle, { color: colors.onSurfaceVariant }]}>
            {mode === 'signUp' ? 'Begin your journey.' : 'Continue where you left off.'}
          </Text>
          {mode === 'signUp' && (
            <Input label="Name" value={name} onChangeText={setName} placeholder="Your name" autoCapitalize="words" />
          )}
          <Input label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
          <Input label="Password" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
          {error ? <Text style={[styles.error, { color: colors.error }]}>{error}</Text> : null}
          <Button title={mode === 'signUp' ? 'Sign up' : 'Sign in'} onPress={mode === 'signUp' ? handleSignUp : handleSignIn} loading={loading} style={styles.submit} />
          <Button title="Back" onPress={() => setMode('welcome')} variant="ghost" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboard: { flex: 1 },
  welcomeContent: { flex: 1, paddingHorizontal: 32, justifyContent: 'space-between', paddingBottom: 48 },
  heroArea: { flex: 1, justifyContent: 'center' },
  wordmark: { ...typography.displayLg, marginBottom: 20 },
  tagline: { ...typography.h2, lineHeight: 36 },
  welcomeActions: { gap: 8 },
  fullWidth: { alignSelf: 'stretch' },
  scroll: { paddingHorizontal: 32, paddingTop: 56, paddingBottom: 48 },
  screenTitle: { ...typography.displaySm, marginBottom: 8 },
  screenSubtitle: { ...typography.body, marginBottom: 40 },
  submit: { marginTop: 8, marginBottom: 16 },
  error: { ...typography.bodySmall, marginBottom: 16 },
});
