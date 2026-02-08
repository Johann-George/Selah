/**
 * Typography scale. Adjust to match Figma type styles when available.
 */
import { TextStyle } from 'react-native';

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
} as const;

export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const typography: Record<string, TextStyle> = {
  h1: { fontSize: fontSizes.xxl, fontWeight: fontWeights.bold },
  h2: { fontSize: fontSizes.xl, fontWeight: fontWeights.semibold },
  h3: { fontSize: fontSizes.lg, fontWeight: fontWeights.semibold },
  body: { fontSize: fontSizes.md, fontWeight: fontWeights.regular },
  bodySmall: { fontSize: fontSizes.sm, fontWeight: fontWeights.regular },
  caption: { fontSize: fontSizes.xs, fontWeight: fontWeights.regular },
};
