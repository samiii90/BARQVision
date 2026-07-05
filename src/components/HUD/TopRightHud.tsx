import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BatteryGauge, ClockIcon, PlugIcon, WifiBarsIcon } from '../Icons';
import { colors, spacing } from '../../theme/tokens';
import { TelemetrySnapshot } from '../../types';
import { HudPanel } from './HudPanel';
import { TelemetryItem } from './TelemetryItem';

interface TopRightHudProps {
  telemetry: TelemetrySnapshot;
}

function batteryColor(percent: number): string {
  if (percent <= 15) return colors.error;
  if (percent <= 35) return colors.warning;
  return colors.primary;
}

function latencyColor(ms: number): string {
  if (ms >= 300) return colors.error;
  if (ms >= 150) return colors.warning;
  return colors.text;
}

export function TopRightHud({ telemetry }: TopRightHudProps) {
  const { wifiBars, latencyMs, fps, batteryPercent, isCharging } = telemetry;

  return (
    <HudPanel style={styles.panel}>
      <TelemetryItem
        icon={<WifiBarsIcon bars={wifiBars} color={colors.text} size={14} />}
        value={`${wifiBars}/4`}
      />
      <Divider />
      <TelemetryItem
        icon={<ClockIcon size={13} color={colors.textMuted} />}
        value={`${latencyMs}ms`}
        valueColor={latencyColor(latencyMs)}
      />
      <Divider />
      <TelemetryItem icon={null} value={`${fps}FPS`} />
      <Divider />
      <TelemetryItem
        icon={
          isCharging ? (
            <PlugIcon size={13} color={colors.primary} />
          ) : (
            <BatteryGauge
              percent={batteryPercent}
              size={16}
              color={batteryColor(batteryPercent)}
              outlineColor={colors.textSecondary}
            />
          )
        }
        value={`${batteryPercent}%`}
        valueColor={batteryColor(batteryPercent)}
      />
    </HudPanel>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  panel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    height: 14,
    backgroundColor: colors.panelBorder,
    marginHorizontal: spacing.sm,
  },
});
