export const lightColors = {
  // Core surfaces
  background:             '#fbf9f5',
  surface:                '#fbf9f5',
  surfaceContainerLow:    '#f5f4ef',
  surfaceContainer:       '#efeee9',
  surfaceContainerLowest: '#ffffff',

  // Brand
  primary:              '#4f645b',
  primaryContainer:     '#d1e8dd',
  primaryDim:           '#43574f',
  onPrimary:            '#e7fef3',

  secondary:            '#4a6070',
  secondaryContainer:   '#cde6f6',
  secondaryFixedDim:    '#bfd8e7',

  tertiary:             '#6b5c52',
  tertiaryContainer:    '#f2e8e1',

  // Text
  text:                 '#1c1f1d',
  onSurface:            '#1c1f1d',
  onSurfaceVariant:     '#5e605b',
  textMuted:            '#8a8d87',

  // Utility
  outlineVariant:       'rgba(178,178,173,0.15)',
  border:               'rgba(178,178,173,0.15)',
  success:              '#4f645b',
  successLight:         '#d1e8dd',
  error:                '#8c3a35',
  warning:              '#b5956a',
} as const;

export const darkColors = {
  // Core surfaces — deep ink hierarchy
  background:             '#141714',
  surface:                '#141714',
  surfaceContainerLow:    '#1c201c',
  surfaceContainer:       '#222622',
  surfaceContainerLowest: '#1a1e1a',

  // Brand — sage lifted for dark backgrounds
  primary:              '#8fbfb0',
  primaryContainer:     '#1e3530',
  primaryDim:           '#6fa898',
  onPrimary:            '#0d1f1b',

  secondary:            '#8ab4c8',
  secondaryContainer:   '#1a2e3a',
  secondaryFixedDim:    '#4a7a94',

  tertiary:             '#c4a98e',
  tertiaryContainer:    '#2a211a',

  // Text
  text:                 '#e8ebe6',
  onSurface:            '#e8ebe6',
  onSurfaceVariant:     '#9ea89a',

  textMuted:            '#5c6358',

  // Utility
  outlineVariant:       'rgba(255,255,255,0.07)',
  border:               'rgba(255,255,255,0.07)',
  success:              '#8fbfb0',
  successLight:         '#1e3530',
  error:                '#e07b76',
  warning:              '#c4a98e',
} as const;

// Static fallback (light) — used only before ThemeContext is available
export const colors = lightColors;

export type Colors = typeof lightColors;
