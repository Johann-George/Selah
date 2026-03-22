export const colors = {
  // Core surfaces — stacked paper hierarchy
  background:           '#fbf9f5',
  surface:              '#fbf9f5',
  surfaceContainerLow:  '#f5f4ef',
  surfaceContainer:     '#efeee9',
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
  onSurface:            '#31332f',
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

export type Colors = typeof colors;
