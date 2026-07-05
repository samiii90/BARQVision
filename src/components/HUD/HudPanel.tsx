import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../../theme/tokens';

interface HudPanelProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

/**
 * Thin translucent chrome — a hairline border and a dark scrim, never a
 * card/shadow. This is the only "container" visual language in the app.
 */
export function HudPanel({ children, style }: HudPanelProps) {
  return <View style={[styles.root, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.panel,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.panelBorder,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
});
