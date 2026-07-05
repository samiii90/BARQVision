import React, { useCallback, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Crosshair } from '../components/Crosshair';
import { TopLeftHud } from '../components/HUD/TopLeftHud';
import { TopRightHud } from '../components/HUD/TopRightHud';
import { ConnectionOverlay } from '../components/Overlays/ConnectionOverlay';
import { FloatingToolbar } from '../components/Toolbar/FloatingToolbar';
import { VideoFeedSurface } from '../components/Video/VideoFeedSurface';
import { useMockTelemetry } from '../hooks/useMockTelemetry';
import { colors } from '../theme/tokens';
import { CameraInfo, ConnectionState } from '../types';

const CAMERA: CameraInfo = {
  name: 'UGV-07 / FRONT',
  resolution: '1920×1080',
};

/**
 * Root screen for the tactical ground station. This is the only place
 * connection/recording/snapshot state lives — everything below is a
 * pure presentational component driven by props.
 *
 * Connection state is driven by WebView callbacks from VideoFeedSurface:
 * onLoadStart → 'connecting', onLoadEnd → 'connected', onError → 'disconnected'.
 */
export function GroundStationScreen() {
  const [connectionState, setConnectionState] = useState<ConnectionState>('connecting');
  const [isRecording, setIsRecording] = useState(false);
  const telemetry = useMockTelemetry(connectionState);

  const handleLoadStart = useCallback(() => {
    setConnectionState('connecting');
  }, []);

  const handleLoadEnd = useCallback(() => {
    setConnectionState('connected');
  }, []);

  const handleLoadError = useCallback(() => {
    setConnectionState('disconnected');
    setIsRecording(false);
  }, []);

  const handleConnectPress = useCallback(() => {
    if (connectionState === 'connected') {
      setConnectionState('disconnected');
      setIsRecording(false);
    }
  }, [connectionState]);

  const handleSnapshotPress = useCallback(() => {
  }, []);

  const handleRecordPress = useCallback(() => {
    setIsRecording((prev) => !prev);
  }, []);

  const handleFullscreenPress = useCallback(() => {
  }, []);

  const handleSettingsPress = useCallback(() => {
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar hidden />

      <VideoFeedSurface
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleLoadError}
      />

      <ConnectionOverlay state={connectionState} />

      <Crosshair visible={connectionState === 'connected'} />

      <SafeAreaView style={styles.overlayLayer} pointerEvents="box-none">
        <View style={styles.topRow} pointerEvents="box-none">
          <TopLeftHud connectionState={connectionState} camera={CAMERA} />
          <TopRightHud telemetry={telemetry} />
        </View>

        <View style={styles.bottomRow} pointerEvents="box-none">
          <FloatingToolbar
            connectionState={connectionState}
            isRecording={isRecording}
            onConnectPress={handleConnectPress}
            onSnapshotPress={handleSnapshotPress}
            onRecordPress={handleRecordPress}
            onFullscreenPress={handleFullscreenPress}
            onSettingsPress={handleSettingsPress}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  overlayLayer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'space-between',
    padding: 14,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  bottomRow: {
    alignItems: 'center',
  },
});
