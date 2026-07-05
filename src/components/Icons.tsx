import React from 'react';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

export interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

/** Signal bars, 0-4 filled, rest rendered dim. */
export function WifiBarsIcon({
  bars,
  size = 16,
  color,
  dimColor = 'rgba(255,255,255,0.25)',
}: IconProps & { bars: number; dimColor?: string }) {
  const heights = [4, 7, 10, 13];
  const barWidth = 3;
  const gap = 2;
  const width = heights.length * barWidth + (heights.length - 1) * gap;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${width} 14`}>
      {heights.map((h, i) => (
        <Rect
          key={i}
          x={i * (barWidth + gap)}
          y={14 - h}
          width={barWidth}
          height={h}
          fill={i < bars ? color : dimColor}
        />
      ))}
    </Svg>
  );
}

/**
 * Battery outline with a proportional fill and terminal nub — one
 * self-contained SVG, color-coded by the caller based on charge level.
 */
export function BatteryGauge({
  percent,
  size = 18,
  color = '#FFFFFF',
  outlineColor = '#FFFFFF',
  strokeWidth = 1.5,
}: {
  percent: number;
  size?: number;
  color?: string;
  outlineColor?: string;
  strokeWidth?: number;
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  const innerWidth = 17;
  return (
    <Svg width={size} height={size * 0.55} viewBox="0 0 24 13">
      <Rect
        x="0.75"
        y="0.75"
        width="19.5"
        height="11.5"
        rx="2"
        stroke={outlineColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Rect x="2.25" y="2.25" width={(clamped / 100) * innerWidth} height="8.5" rx="1" fill={color} />
      <Rect x="21.5" y="4" width="2" height="5" rx="1" fill={outlineColor} />
    </Svg>
  );
}

export function ClockIcon({ size = 14, color = '#FFFFFF', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9.5" stroke={color} strokeWidth={strokeWidth} />
      <Path d="M12 7v5.5l4 2.2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function PlugIcon({ size = 14, color = '#FFFFFF', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 3v5M16 3v5M6 8h12v4a6 6 0 0 1-12 0V8ZM12 18v3"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CameraIcon({ size = 20, color = '#FFFFFF', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1-2h7l1 2h2A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-9Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="12.5" r="3.5" stroke={color} strokeWidth={strokeWidth} />
    </Svg>
  );
}

export function RecordIcon({ size = 20, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth={1.6} fill="none" />
      <Circle cx="12" cy="12" r="4.5" fill={color} />
    </Svg>
  );
}

export function StopIcon({ size = 20, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth={1.6} fill="none" />
      <Rect x="9" y="9" width="6" height="6" rx="1" fill={color} />
    </Svg>
  );
}

export function FullscreenIcon({ size = 20, color = '#FFFFFF', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SettingsIcon({ size = 20, color = '#FFFFFF', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} />
      <Path
        d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6M18.4 18.4l-1.6-1.6M7.2 7.2 5.6 5.6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function PowerPlugIcon(props: IconProps) {
  return <PlugIcon {...props} />;
}

/** Chevron used inside the Connect button to suggest "link". */
export function LinkIcon({ size = 20, color = '#FFFFFF', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.5 14.5 14.5 9.5M8 16 6.5 17.5A3.5 3.5 0 1 1 1.5 12.5L3 11M16 8l1.5-1.5A3.5 3.5 0 1 1 22.5 11.5L21 13"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function UnlinkIcon({ size = 20, color = '#FFFFFF', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.5 14.5 14.5 9.5M8 16 6.5 17.5A3.5 3.5 0 1 1 1.5 12.5L3 11M16 8l1.5-1.5A3.5 3.5 0 1 1 22.5 11.5L21 13M3 3l18 18"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
