import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useColors } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated';
}

export function Card({ children, style, variant = 'default' }: CardProps) {
  const colors = useColors();
  return (
    <View style={[
      styles.card,
      { backgroundColor: colors.surfaceContainerLowest, shadowColor: colors.onSurface },
      variant === 'elevated' && styles.elevated,
      style,
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 32,
    padding: 28,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 2,
  },
  elevated: {
    shadowOpacity: 0.09,
    shadowRadius: 40,
    elevation: 4,
  },
});
