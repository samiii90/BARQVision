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
      javaScriptEnabled={true}
      domStorageEnabled={true}
      cacheEnabled={false}
      allowsInlineMediaPlayback={true}
      mediaPlaybackRequiresUserAction={false}
      mixedContentMode="always"
      allowingReadAccessToURL={STREAM_URL}
      onLoadStart={onLoadStart}
      onLoadEnd={onLoadEnd}
      onError={(e) => {
        console.log('WEBVIEW ERROR', e.nativeEvent);
        onError?.();
      }}
      style={StyleSheet.absoluteFill}
    />
  );
}
