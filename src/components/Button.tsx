import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { useColors } from '../theme';
import { typography } from '../theme';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title, onPress, variant = 'primary', disabled = false, loading = false, style, textStyle,
}: ButtonProps) {
  const colors = useColors();

  const variantStyles = {
    primary:   { container: { backgroundColor: colors.primary },            text: { color: colors.onPrimary } },
    secondary: { container: { backgroundColor: colors.secondaryContainer }, text: { color: colors.secondary } },
    outline:   { container: { backgroundColor: 'transparent' as const, borderWidth: 1.5, borderColor: colors.primary }, text: { color: colors.primary } },
    ghost:     { container: { backgroundColor: 'transparent' as const },    text: { color: colors.primary } },
  };

  const vs = variantStyles[variant];

  return (
    <TouchableOpacity
      style={[styles.base, vs.container, style, (disabled || loading) && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.82}
    >
      {loading ? (
        <ActivityIndicator color={vs.text.color} size="small" />
      ) : (
        <Text style={[styles.text, vs.text, { fontFamily: 'Inter_600SemiBold' }, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  text: { ...typography.body, letterSpacing: 0.2 },
  disabled: { opacity: 0.45 },
});
