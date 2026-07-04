import { MD3DarkTheme } from 'react-native-paper';
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

/**
 * Main application theme integrating customized colors, spacing, and typography
 * extending the Material Design 3 Dark Theme.
 */
export const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...colors,
  },
  spacing,
  typography,
};

export type AppTheme = typeof theme;
