/**
 * Design system colors – calm, devotional aesthetic.
 * Assumption: Figma uses a warm, minimal palette; extend with actual tokens if needed.
 */
export const colors = {
  primary: '#5C4D3C',
  primaryLight: '#8B7355',
  secondary: '#C4A77D',
  background: '#FAF8F5',
  surface: '#FFFFFF',
  surfaceElevated: '#F5F1EB',
  text: '#2D2A26',
  textSecondary: '#6B6560',
  textMuted: '#9C958D',
  border: '#E8E4DE',
  success: '#4A7C59',
  error: '#B85450',
  warning: '#C4A77D',
} as const;

export type Colors = typeof colors;
