import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Card, Text, Icon, ActivityIndicator, useTheme } from 'react-native-paper';

interface MjpegViewerProps {
  streamUrl: string;
}

export const MjpegViewer: React.FC<MjpegViewerProps> = ({ streamUrl }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <Card style={[styles.card, { backgroundColor: theme.colors.surfaceVariant }]} mode="contained">
        <View style={styles.centerContainer}>
          <Icon source="video-off" size={48} color={theme.colors.onSurfaceVariant} />
          <Text variant="titleMedium" style={[styles.errorTitle, { color: theme.colors.onSurfaceVariant }]}>
            Camera Unavailable
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            Unable to connect to stream.
          </Text>
        </View>
      </Card>
    );
  }

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surfaceVariant, overflow: 'hidden' }]} mode="contained">
      <Image
        source={{ uri: streamUrl }}
        style={styles.image}
        onLoad={handleLoad}
        onError={handleError}
        resizeMode="cover"
      />
      {isLoading && (
        <View style={[StyleSheet.absoluteFill, styles.centerContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
          <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  errorTitle: {
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
  },
});
