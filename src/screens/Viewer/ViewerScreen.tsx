import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import WebView from 'react-native-webview';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { STREAM_URL } from '../../services/camera/cameraConfig';

export const ViewerScreen = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

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
        onLoadEnd={() => setLoading(false)}
        onError={(e) => {
          console.log('WEBVIEW ERROR', e.nativeEvent);
        }}
        style={StyleSheet.absoluteFill}
      />

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#00ff66" />
          <Text style={styles.loadingText}>
            Connecting to Camera...
          </Text>
        </View>
      )}

      <View style={styles.overlay} pointerEvents="box-none">

        <View style={styles.topBar}>
          <Text style={styles.title}>BARQ CAM</Text>
          <Text style={styles.live}>● LIVE</Text>
        </View>

        <View style={styles.crosshair}>
          <View style={styles.horizontal} />
          <View style={styles.vertical} />
        </View>

        <View style={styles.bottomBar}>
          <Text style={styles.bottomText}>
            {STREAM_URL}
          </Text>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.exit}>
              EXIT
            </Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  loading: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },

  loadingText: {
    color: 'white',
    marginTop: 15,
    fontSize: 16,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: 24,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    color: 'white',
    fontWeight: '900',
    fontSize: 22,
    letterSpacing: 2,
  },

  live: {
    color: '#00ff66',
    fontWeight: 'bold',
    fontSize: 18,
  },

  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bottomText: {
    color: '#AAAAAA',
    fontSize: 11,
    flex: 1,
  },

  exit: {
    color: '#ff4444',
    fontWeight: '900',
    fontSize: 18,
  },

  crosshair: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -40,
    marginTop: -40,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },

  horizontal: {
    position: 'absolute',
    width: 80,
    height: 2,
    backgroundColor: '#00ff66',
  },

  vertical: {
    position: 'absolute',
    width: 2,
    height: 80,
    backgroundColor: '#00ff66',
  },

});
