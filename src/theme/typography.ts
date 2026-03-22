import { TextStyle } from 'react-native';

export const fontSizes = {
  xs:      12,
  sm:      14,
  md:      16,
  lg:      24,
  xl:      28,
  xxl:     36,
  display: 56,
} as const;

export const fontWeights = {
  regular:  '400' as const,
  medium:   '500' as const,
  semibold: '600' as const,
  bold:     '700' as const,
};

export const typography: Record<string, TextStyle> = {
  // Display — hero moments, mantras
  displayLg: {
    fontFamily: 'Inter_700Bold',
    fontSize: fontSizes.display,
    letterSpacing: -1.12,
    lineHeight: 64,
  },
  displaySm: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: fontSizes.xxl,
    letterSpacing: -0.72,
    lineHeight: 44,
  },
  // Headlines — navigation, section headers
  h1: {
    fontFamily: 'Inter_700Bold',
    fontSize: fontSizes.xxl,
    letterSpacing: -0.5,
    lineHeight: 40,
  },
  h2: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: fontSizes.xl,
    letterSpacing: -0.3,
    lineHeight: 36,
  },
  h3: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: fontSizes.lg,
    letterSpacing: -0.2,
    lineHeight: 32,
  },
  // Body — workhorse, airy line-height
  body: {
    fontFamily: 'Inter_400Regular',
    fontSize: fontSizes.md,
    lineHeight: 26,
  },
  bodySmall: {
    fontFamily: 'Inter_400Regular',
    fontSize: fontSizes.sm,
    lineHeight: 22,
  },
  // Label — metadata
  caption: {
    fontFamily: 'Inter_400Regular',
    fontSize: fontSizes.xs,
    lineHeight: 18,
  },
};
