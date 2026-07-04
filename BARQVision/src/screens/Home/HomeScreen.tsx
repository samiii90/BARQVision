import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Appbar, Chip, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../navigation/types';
import { CameraService, CameraConnectionState } from '../../services/camera';
import { MjpegViewer } from '../../components/camera';

export const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<RootNavigationProp>();

  const cameraService = useMemo(() => new CameraService(), []);
  const [status, setStatus] = useState(cameraService.getStatus());

  const handleConnect = async () => {
    const connectPromise = cameraService.connect();
    setStatus(cameraService.getStatus());
    await connectPromise;
    setStatus(cameraService.getStatus());
  };

  const getStatusText = () => {
    switch (status.state) {
      case CameraConnectionState.Idle:
        return 'Offline';
      case CameraConnectionState.Connecting:
        return 'Connecting...';
      case CameraConnectionState.Connected:
        return 'Connected';
      default:
        return 'Offline';
    }
  };

  const isConnected = status.state === CameraConnectionState.Connected;
  const isConnecting = status.state === CameraConnectionState.Connecting;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.Content title="BARQ CAM" titleStyle={{ color: theme.colors.onSurface }} />
        <Appbar.Action icon="cog" color={theme.colors.onSurface} onPress={() => navigation.navigate('Settings')} />
        <Appbar.Action icon="information" color={theme.colors.onSurface} onPress={() => navigation.navigate('About')} />
      </Appbar.Header>

      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text variant="displayLarge" style={[styles.title, { color: theme.colors.onBackground }]}>
            BARQ CAM
          </Text>
          <Text variant="titleMedium" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Ready to Connect
          </Text>
          <Chip 
            mode="flat" 
            style={[styles.statusChip, { backgroundColor: theme.colors.surfaceVariant }]}
            textStyle={{ color: theme.colors.onSurfaceVariant, fontWeight: 'bold' }}
            compact
          >
            {getStatusText()}
          </Chip>
        </View>

        <View style={styles.actionSection}>
          {isConnected ? (
            <MjpegViewer streamUrl={cameraService.getStreamUrl()} />
          ) : (
            <Button
              mode="contained"
              onPress={handleConnect}
              disabled={isConnecting}
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              buttonColor={theme.colors.primary}
              textColor={theme.colors.onPrimary}
            >
              CONNECT CAMERA
            </Button>
          )}
        </View>

        <View style={styles.footerSection}>
          <Text variant="labelMedium" style={[styles.footerText, { color: theme.colors.onSurfaceVariant }]}>
            Powered by BARQ Vision
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  headerSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 48,
  },
  title: {
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    letterSpacing: 1,
    marginBottom: 16,
  },
  statusChip: {
    borderRadius: 8,
  },
  actionSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    borderRadius: 4,
    width: '100%',
    maxWidth: 320,
  },
  buttonContent: {
    height: 64,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  footerSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
  },
  footerText: {
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
