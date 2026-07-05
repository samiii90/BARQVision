import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  CameraIcon,
  FullscreenIcon,
  LinkIcon,
  RecordIcon,
  SettingsIcon,
  StopIcon,
  UnlinkIcon,
} from '../Icons';
import { colors, radius, spacing } from '../../theme/tokens';
import { ConnectionState } from '../../types';
import { HudPanel } from '../HUD/HudPanel';
import { ToolbarButton } from './ToolbarButton';

interface FloatingToolbarProps {
  connectionState: ConnectionState;
  isRecording: boolean;
  onConnectPress: () => void;
  onSnapshotPress: () => void;
  onRecordPress: () => void;
  onFullscreenPress: () => void;
  onSettingsPress: () => void;
}

export function FloatingToolbar({
  connectionState,
  isRecording,
  onConnectPress,
  onSnapshotPress,
  onRecordPress,
  onFullscreenPress,
  onSettingsPress,
}: FloatingToolbarProps) {
  const isConnected = connectionState === 'connected';
  const isConnecting = connectionState === 'connecting';

  return (
    <HudPanel style={styles.panel}>
      <ToolbarButton
        icon={
          isConnected ? (
            <UnlinkIcon size={20} color={colors.error} />
          ) : (
            <LinkIcon size={20} color={isConnecting ? colors.textMuted : colors.primary} />
          )
        }
        label={isConnected ? 'DISCONNECT' : isConnecting ? 'LINKING' : 'CONNECT'}
        active={isConnected}
        activeColor={colors.error}
        disabled={isConnecting}
        onPress={onConnectPress}
      />

      <Separator />

      <ToolbarButton
        icon={<CameraIcon size={20} color={isConnected ? colors.text : colors.textDisabled} />}
        label="SNAPSHOT"
        disabled={!isConnected}
        onPress={onSnapshotPress}
      />

      <Separator />

      <ToolbarButton
        icon={
          isRecording ? (
            <StopIcon size={20} color={colors.error} />
          ) : (
            <RecordIcon size={20} color={isConnected ? colors.text : colors.textDisabled} />
          )
        }
        label={isRecording ? 'STOP' : 'RECORD'}
        active={isRecording}
        activeColor={colors.error}
        disabled={!isConnected}
        onPress={onRecordPress}
      />

      <Separator />

      <ToolbarButton
        icon={<FullscreenIcon size={20} color={colors.text} />}
        label="FULLSCREEN"
        onPress={onFullscreenPress}
      />

      <Separator />

      <ToolbarButton
        icon={<SettingsIcon size={20} color={colors.text} />}
        label="SETTINGS"
        onPress={onSettingsPress}
      />
    </HudPanel>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  panel: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
  },
  separator: {
    width: StyleSheet.hairlineWidth,
    height: 32,
    backgroundColor: colors.panelBorder,
    marginHorizontal: spacing.xs,
  },
});
