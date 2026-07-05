import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Orientation from 'react-native-orientation-locker';
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

export function GroundStationScreen() {

 const [connectionState, setConnectionState] =
  useState<ConnectionState>('connected');

  const [isRecording, setIsRecording] = useState(false);

  const telemetry = useMockTelemetry(connectionState);

  useEffect(() => {
    Orientation.lockToLandscape();

    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  const handleLoadStart = useCallback(() => {
    setConnectionState('connecting');
  }, []);

  const handleLoadEnd = useCallback(() => {
    setConnectionState('connected');
  }, []);

  const handleLoadError = useCallback(() => {
    setConnectionState('disconnected');
  }, []);

  return (
    <View style={styles.root}>

      <StatusBar hidden />

      <VideoFeedSurface
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleLoadError}
      />

      

      <Crosshair visible={true} />

      <SafeAreaView
        style={styles.overlayLayer}
        pointerEvents="box-none">

        <View
          style={styles.topRow}
          pointerEvents="box-none">

          <TopLeftHud
            connectionState={connectionState}
            camera={CAMERA}
          />

          <TopRightHud
            telemetry={telemetry}
          />

        </View>

        <View style={styles.bottomRow}>

          <FloatingToolbar
            connectionState={connectionState}
            isRecording={isRecording}
            onConnectPress={() => {}}
            onSnapshotPress={() => {}}
            onRecordPress={() =>
              setIsRecording(!isRecording)
            }
            onFullscreenPress={() => {}}
            onSettingsPress={() => {}}
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