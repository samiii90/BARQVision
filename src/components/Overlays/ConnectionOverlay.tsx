import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { colors, durations, spacing, type } from '../../theme/tokens';
import { ConnectionState } from '../../types';
import { UnlinkIcon } from '../Icons';

interface ConnectionOverlayProps {
  state: ConnectionState;
}

/**
 * Renders nothing once `connected` — telemetry HUDs are the only
 * indicator of a healthy link. For `disconnected` / `connecting` this
 * sits above the video surface and fades in/out, never a hard cut.
 */
export function ConnectionOverlay({ state }: ConnectionOverlayProps) {
  const opacity = useRef(new Animated.Value(state === 'connected' ? 0 : 1)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: state === 'connected' ? 0 : 1,
      duration: durations.slow,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [state, opacity]);

  if (state === 'connected') return null;

  return (
    <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity }]}>
      <View style={styles.blur} />
      <View style={styles.scrim} />
      <View style={styles.center}>
        {state === 'connecting' ? <ConnectingSpinner /> : <UnlinkIcon size={26} color={colors.textMuted} />}
        <Text style={styles.title}>
          {state === 'connecting' ? 'ESTABLISHING LINK' : 'WAITING FOR CAMERA'}
        </Text>
        <Text style={styles.subtitle}>
          {state === 'connecting' ? 'Negotiating video channel…' : 'No active feed from unit'}
        </Text>
      </View>
    </Animated.View>
  );
}

function ConnectingSpinner() {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [spin]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <Animated.View style={[styles.spinner, { transform: [{ rotate }] }]}>
      <View style={styles.spinnerArc} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  blur: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(6, 7, 9, 0.45)',
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.scrim,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...type.title,
    color: colors.text,
    marginTop: spacing.lg,
  },
  subtitle: {
    ...type.value,
    fontWeight: '400',
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  spinner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerArc: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'transparent',
    borderTopColor: colors.primary,
  },
});
