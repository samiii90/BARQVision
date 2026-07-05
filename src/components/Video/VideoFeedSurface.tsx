import React from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

import { STREAM_URL } from '../../services/camera/cameraConfig';

interface VideoFeedSurfaceProps {
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  onError?: () => void;
}

export function VideoFeedSurface({
  onLoadStart,
  onLoadEnd,
  onError,
}: VideoFeedSurfaceProps) {
  return (
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
  );
}
