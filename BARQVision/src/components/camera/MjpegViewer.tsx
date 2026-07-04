import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Icon, useTheme } from 'react-native-paper';

interface MjpegViewerProps {
  streamUrl: string;
}

export const MjpegViewer: React.FC<MjpegViewerProps> = ({ streamUrl }) => {
  const theme = useTheme();

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surfaceVariant }]} mode="contained">
      <Card.Content style={styles.content}>
        <Text variant="titleMedium" style={[styles.title, { color: theme.colors.onSurfaceVariant }]}>
          Camera Stream
        </Text>
        <View style={styles.placeholderContainer}>
          <Icon source="video-off" size={48} color={theme.colors.onSurfaceVariant} />
          <Text variant="bodyLarge" style={[styles.placeholderText, { color: theme.colors.onSurfaceVariant }]}>
            No Stream Connected
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 16,
    fontWeight: '500',
  },
});
