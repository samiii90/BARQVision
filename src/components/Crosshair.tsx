import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { colors } from '../theme/tokens';

interface CrosshairProps {
  size?: number;
  visible?: boolean;
}

/**
 * Small, restrained reticle — a center dot, a broken ring, and four
 * tick marks. Deliberately not a full FPV-style targeting reticle;
 * this is a framing aid, not a weapons sight.
 */
export function Crosshair({ size = 56, visible = true }: CrosshairProps) {
  if (!visible) return null;

  const c = size / 2;
  const ringRadius = size * 0.32;
  const tickOuter = size * 0.5;
  const tickInner = size * 0.4;
  const stroke = colors.crosshairDim;

  return (
    <View
      pointerEvents="none"
      style={[styles.wrap, { marginLeft: -c, marginTop: -c }]}
    >
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle cx={c} cy={c} r={ringRadius} stroke={stroke} strokeWidth={1} fill="none" opacity={0.8} />
        <Circle cx={c} cy={c} r={1.5} fill={colors.crosshair} />

        {/* Tick marks — N / S / E / W, with gaps at the ring instead of a full cross */}
        <Line x1={c} y1={0} x2={c} y2={tickOuter - ringRadius} stroke={stroke} strokeWidth={1} />
        <Line x1={c} y1={size - (tickOuter - ringRadius)} x2={c} y2={size} stroke={stroke} strokeWidth={1} />
        <Line x1={0} y1={c} x2={tickOuter - ringRadius} y2={c} stroke={stroke} strokeWidth={1} />
        <Line x1={size - (tickOuter - ringRadius)} y1={c} x2={size} y2={c} stroke={stroke} strokeWidth={1} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
