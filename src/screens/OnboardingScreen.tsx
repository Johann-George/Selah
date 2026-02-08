/**
 * Welcome / Onboarding. Assumption: single welcome screen with Get Started;
 * extend with slides or skip logic if Figma specifies.
 */
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
    if (!email.trim() || !password) {
      setError('Email and password required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
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
    if (!email.trim() || !password) {
      setError('Email and password required');
      return;
    }
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
        <View style={styles.content}>
          <Text style={styles.title}>Selah</Text>
          <Text style={styles.subtitle}>Quiet time & Bible study tracking</Text>
          <View style={styles.actions}>
            <Button title="Get started" onPress={() => setMode('signUp')} style={styles.button} />
            <Button
              title="I already have an account"
              onPress={() => setMode('signIn')}
              variant="outline"
              style={styles.button}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboard}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={styles.screenTitle}>{mode === 'signUp' ? 'Create account' : 'Sign in'}</Text>
          {mode === 'signUp' && (
            <Input
              label="Name"
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              autoCapitalize="words"
            />
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
          <Button
            title={mode === 'signUp' ? 'Back' : 'Back'}
            onPress={() => setMode('welcome')}
            variant="ghost"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  keyboard: { flex: 1 },
  scroll: { padding: 24, paddingTop: 48 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  title: { ...typography.h1, color: colors.primary, textAlign: 'center', marginBottom: 8 },
  subtitle: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginBottom: 48 },
  screenTitle: { ...typography.h2, color: colors.text, marginBottom: 24 },
  actions: { gap: 12 },
  button: { marginBottom: 12 },
  submit: { marginTop: 8, marginBottom: 12 },
  error: { ...typography.bodySmall, color: colors.error, marginBottom: 12 },
});
