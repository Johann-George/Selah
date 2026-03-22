import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { useColors } from '../theme';
import { typography } from '../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export function Input({ label, error, containerStyle, style, placeholderTextColor, ...rest }: InputProps) {
  const colors = useColors();
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <Text style={[styles.label, { color: colors.onSurfaceVariant }]}>{label}</Text>
      ) : null}
      <TextInput
        style={[
          styles.input,
          { color: colors.onSurface, backgroundColor: colors.surfaceContainerLowest, shadowColor: colors.onSurface },
          error ? { borderBottomWidth: 2, borderBottomColor: colors.error } : null,
          style,
        ]}
        placeholderTextColor={placeholderTextColor ?? colors.textMuted}
        {...rest}
      />
      {error ? <Text style={[styles.error, { color: colors.error }]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  label: {
    ...typography.caption,
    fontFamily: 'Inter_500Medium',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  input: {
    ...typography.body,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 14,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 1,
  },
  error: { ...typography.caption, marginTop: 6 },
});
