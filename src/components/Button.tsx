import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography } from '../theme';

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

const variantStyles: Record<Variant, { container: ViewStyle; text: TextStyle }> = {
  primary: {
    container: { backgroundColor: colors.primary },
    text: { color: colors.onPrimary, fontFamily: 'Inter_600SemiBold' },
  },
  secondary: {
    container: { backgroundColor: colors.secondaryContainer },
    text: { color: colors.secondary, fontFamily: 'Inter_600SemiBold' },
  },
  outline: {
    container: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.primary },
    text: { color: colors.primary, fontFamily: 'Inter_600SemiBold' },
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    text: { color: colors.primary, fontFamily: 'Inter_600SemiBold' },
  },
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const vs = variantStyles[variant];
  return (
    <TouchableOpacity
      style={[styles.base, vs.container, style, (disabled || loading) && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.82}
    >
      {loading ? (
        <ActivityIndicator color={vs.text.color as string} size="small" />
      ) : (
        <Text style={[styles.text, vs.text, textStyle]}>{title}</Text>
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
  text: {
    ...typography.body,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.2,
  },
  disabled: { opacity: 0.45 },
});
