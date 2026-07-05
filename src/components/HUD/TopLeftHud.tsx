import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, type } from '../../theme/tokens';
import { CameraInfo, ConnectionState } from '../../types';
import { HudPanel } from './HudPanel';
import { LiveIndicator } from './LiveIndicator';

interface TopLeftHudProps {
  connectionState: ConnectionState;
  camera: CameraInfo;
}

export function TopLeftHud({ connectionState, camera }: TopLeftHudProps) {
  const isConnected = connectionState === 'connected';

  return (
    <HudPanel style={styles.panel}>
      <LiveIndicator active={isConnected} />
      <View style={styles.divider} />
      <Text style={styles.cameraName} numberOfLines={1}>
        {camera.name}
      </Text>
      <Text style={styles.resolution}>{camera.resolution}</Text>
    </HudPanel>
  );
}

const styles = StyleSheet.create({
  panel: {
    minWidth: 160,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.panelBorder,
    marginVertical: spacing.xs,
  },
  cameraName: {
    ...type.title,
    color: colors.text,
  },
  resolution: {
    ...type.value,
    color: colors.textMuted,
    marginTop: 2,
  },
});
