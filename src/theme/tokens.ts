/**
 * BARQ CAM — Tactical Ground Station theme tokens.
 *
 * Single source of truth for color, spacing, radius and typography.
 * Kept deliberately flat (no design-system abstraction layers) so any
 * component can import `colors` / `spacing` / `type` directly.
 */

export const colors = {
  // Base
  background: '#0B0D10',
  backgroundElevated: '#111418',

  // Glass panels floating over the video feed
  panel: 'rgba(11, 13, 16, 0.55)',
  panelBorder: 'rgba(255, 255, 255, 0.10)',
  panelBorderStrong: 'rgba(255, 255, 255, 0.18)',

  // Brand / status
  primary: '#00C853',
  primaryDim: 'rgba(0, 200, 83, 0.35)',
  warning: '#FFB300',
  warningDim: 'rgba(255, 179, 0, 0.35)',
  error: '#FF3B30',
  errorDim: 'rgba(255, 59, 48, 0.35)',

  // Text
  text: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.72)',
  textMuted: 'rgba(255, 255, 255, 0.48)',
  textDisabled: 'rgba(255, 255, 255, 0.28)',

  // Overlays
  scrim: 'rgba(6, 7, 9, 0.72)',
  crosshair: 'rgba(0, 200, 83, 0.85)',
  crosshairDim: 'rgba(255, 255, 255, 0.35)',
} as const;

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  none: 0,
  sm: 2,
  md: 4,
  lg: 6,
} as const;

export const type = {
  mono: undefined as string | undefined, // set to a monospace font family if bundled, e.g. 'RobotoMono-Regular'
  label: {
    fontSize: 10,
    letterSpacing: 1.4,
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
  },
  value: {
    fontSize: 13,
    letterSpacing: 0.4,
    fontWeight: '600' as const,
  },
  title: {
    fontSize: 14,
    letterSpacing: 0.6,
    fontWeight: '700' as const,
  },
};

export const durations = {
  fast: 150,
  base: 250,
  slow: 400,
} as const;
