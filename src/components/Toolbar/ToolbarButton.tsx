import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, durations, radius, spacing, type } from '../../theme/tokens';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  active?: boolean;
  activeColor?: string;
  disabled?: boolean;
}

/**
 * Flat rectangular hit target with a hairline border. On press, only
 * opacity shifts — no scale, no bounce, consistent with the rest of
 * the interface's restrained motion language.
 */
export function ToolbarButton({
  icon,
  label,
  onPress,
  active = false,
  activeColor = colors.primary,
  disabled = false,
}: ToolbarButtonProps) {
  const opacity = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(opacity, { toValue: 0.55, duration: durations.fast, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.timing(opacity, { toValue: 1, duration: durations.fast, useNativeDriver: true }).start();
  };

  const tint = disabled ? colors.textDisabled : active ? activeColor : colors.text;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled, selected: active }}
    >
      <Animated.View
        style={[
          styles.root,
          active && { borderColor: activeColor },
          disabled && styles.disabled,
          { opacity },
        ]}
      >
        <View style={styles.iconSlot}>{icon}</View>
        <Text style={[styles.label, { color: tint }]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
    minWidth: 64,
  },
  disabled: {
    opacity: 0.4,
  },
  iconSlot: {
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...type.label,
    marginTop: 4,
  },
});
