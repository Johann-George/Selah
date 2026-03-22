import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input } from '../components';
import { colors, typography } from '../theme';
import { signUp, signIn } from '../services/auth';

type Mode = 'welcome' | 'signIn' | 'signUp';

interface OnboardingScreenProps {
  onComplete?: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
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
    try {
      await signUp(email.trim(), password, name.trim());
      onComplete?.();
    } catch (e: unknown) {
      setError((e as Error).message ?? 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    setError('');
    if (!email.trim() || !password) { setError('Email and password required'); return; }
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      onComplete?.();
    } catch (e: unknown) {
      setError((e as Error).message ?? 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  if (mode === 'welcome') {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.welcomeContent}>
          <View style={styles.heroArea}>
            <Text style={styles.wordmark}>Selah</Text>
            <Text style={styles.tagline}>A quiet space for{'\n'}your daily reflection.</Text>
          </View>
          <View style={styles.welcomeActions}>
            <Button title="Begin" onPress={() => setMode('signUp')} style={styles.primaryBtn} />
            <Button
              title="I have an account"
              onPress={() => setMode('signIn')}
              variant="ghost"
              style={styles.ghostBtn}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboard}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={styles.screenTitle}>{mode === 'signUp' ? 'Create account' : 'Welcome back'}</Text>
          <Text style={styles.screenSubtitle}>
            {mode === 'signUp' ? 'Begin your journey.' : 'Continue where you left off.'}
          </Text>
          {mode === 'signUp' && (
            <Input label="Name" value={name} onChangeText={setName} placeholder="Your name" autoCapitalize="words" />
          )}
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button
            title={mode === 'signUp' ? 'Sign up' : 'Sign in'}
            onPress={mode === 'signUp' ? handleSignUp : handleSignIn}
            loading={loading}
            style={styles.submit}
          />
          <Button title="Back" onPress={() => setMode('welcome')} variant="ghost" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  keyboard: { flex: 1 },
  welcomeContent: { flex: 1, paddingHorizontal: 32, justifyContent: 'space-between', paddingBottom: 48 },
  heroArea: { flex: 1, justifyContent: 'center' },
  wordmark: {
    ...typography.displayLg,
    color: colors.primary,
    marginBottom: 20,
  },
  tagline: {
    ...typography.h2,
    color: colors.onSurfaceVariant,
    lineHeight: 36,
  },
  welcomeActions: { gap: 8 },
  primaryBtn: { alignSelf: 'stretch' },
  ghostBtn: { alignSelf: 'stretch' },
  scroll: { paddingHorizontal: 32, paddingTop: 56, paddingBottom: 48 },
  screenTitle: { ...typography.displaySm, color: colors.onSurface, marginBottom: 8 },
  screenSubtitle: { ...typography.body, color: colors.onSurfaceVariant, marginBottom: 40 },
  submit: { marginTop: 8, marginBottom: 16 },
  error: { ...typography.bodySmall, color: colors.error, marginBottom: 16 },
});
