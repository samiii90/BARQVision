import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import WebView from 'react-native-webview';
import { STREAM_URL } from '../../services/camera/cameraConfig';

interface VideoFeedSurfaceProps {
  /**
   * Called when the WebView starts loading the stream.
   */
  onLoadStart?: () => void;
  /**
   * Called when the WebView finishes loading the stream.
   */
  onLoadEnd?: () => void;
  /**
   * Called when the WebView encounters a loading error.
   */
  onError?: () => void;
  style?: ViewStyle;
}

/**
 * Full-bleed backdrop the live feed renders into. Uses a WebView to
 * display the MJPEG stream from the camera. Occupies effectively
 * the entire screen — all HUD / overlay elements are absolutely
 * positioned on top of this, never the other way around.
 */
export function VideoFeedSurface({ onLoadStart, onLoadEnd, onError, style }: VideoFeedSurfaceProps) {
  return (
    <View style={[styles.root, style]}>
      <WebView
        source={{ uri: STREAM_URL }}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        cacheEnabled={false}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        mixedContentMode="always"
        allowingReadAccessToURL={STREAM_URL}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onError={onError}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
