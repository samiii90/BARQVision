import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, type } from '../../theme/tokens';

interface LiveIndicatorProps {
  active: boolean;
  label?: string;
}

/**
 * Slow, deliberate pulse — not a bounce, not a blink. Reads as
 * "signal is alive" rather than a notification badge.
 */
export function LiveIndicator({ active, label = 'LIVE' }: LiveIndicatorProps) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!active) {
      pulse.setValue(1);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 0.35,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [active, pulse]);

  return (
    <View style={styles.row}>
      <Animated.View
        style={[
          styles.dot,
          { backgroundColor: active ? colors.error : colors.textDisabled, opacity: pulse },
        ]}
      />
      <Text style={[styles.label, { color: active ? colors.text : colors.textMuted }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 6,
  },
  label: {
    ...type.label,
  },
});
