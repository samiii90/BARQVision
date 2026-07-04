import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Appbar, Button, Card, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { runDiagnostics, DiagnosticsResult, getDiagnosticsEndpoints } from '../../services/camera/diagnosticsService';

export const DiagnosticsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [results, setResults] = useState<DiagnosticsResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [summary, setSummary] = useState('Ready to run diagnostics.');

  const endpointCount = useMemo(() => getDiagnosticsEndpoints().length, []);

  const runAllDiagnostics = async () => {
    setIsRunning(true);
    setSummary('Running diagnostics...');

    try {
      const diagnostics = await runDiagnostics();
      setResults(diagnostics);
      const successful = diagnostics.filter((item) => item.status && item.status >= 200 && item.status < 400 && !item.error).length;
      setSummary(`Completed ${diagnostics.length} probes, ${successful} successful.`);
    } catch (error: any) {
      setSummary(`Diagnostics failed: ${error?.message || 'Unknown error'}`);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    runAllDiagnostics();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.BackAction color={theme.colors.onSurface} onPress={() => navigation.goBack()} />
        <Appbar.Content title="Diagnostics" titleStyle={{ color: theme.colors.onSurface }} />
      </Appbar.Header>

      <View style={styles.header}> 
        <Text variant="headlineSmall" style={[styles.title, { color: theme.colors.onBackground }]}>Camera Diagnostics</Text>
        <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>Probing {endpointCount} camera endpoints for HTTP and RTSP connectivity.</Text>
        <Text variant="labelLarge" style={[styles.summary, { color: theme.colors.primary }]}>{summary}</Text>
      </View>

      <Button
        mode="contained"
        onPress={runAllDiagnostics}
        loading={isRunning}
        disabled={isRunning}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
      >
        Run Diagnostics
      </Button>

      <ScrollView contentContainerStyle={styles.content}>
        {results.map((item) => (
          <Card key={item.url} style={[styles.card, { backgroundColor: theme.colors.surfaceVariant }]}>
            <Card.Content>
              <Text variant="titleMedium" style={[styles.cardTitle, { color: theme.colors.onBackground }]}>{item.url}</Text>
              <View style={styles.row}>
                <Text variant="labelLarge" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>Protocol:</Text>
                <Text variant="labelLarge" style={[styles.value, { color: theme.colors.onSurface }]}>{item.protocol}</Text>
              </View>
              <View style={styles.row}>
                <Text variant="labelLarge" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>Status:</Text>
                <Text variant="labelLarge" style={[styles.value, { color: theme.colors.onSurface }]}>{item.status ?? '--'} {item.statusText}</Text>
              </View>
              <View style={styles.row}>
                <Text variant="labelLarge" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>Content-Type:</Text>
                <Text variant="labelLarge" style={[styles.value, { color: theme.colors.onSurface }]}>{item.contentType ?? 'unknown'}</Text>
              </View>
              <View style={styles.row}>
                <Text variant="labelLarge" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>Content-Length:</Text>
                <Text variant="labelLarge" style={[styles.value, { color: theme.colors.onSurface }]}>{item.contentLength ?? 'unknown'}</Text>
              </View>
              <View style={styles.rowWrap}>
                <Text variant="labelLarge" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>Detected:</Text>
                <Text variant="labelLarge" style={[styles.value, styles.tag, item.looksLikeMJPEG ? styles.tagSuccess : styles.tagNeutral]}>MJPEG</Text>
                <Text variant="labelLarge" style={[styles.value, styles.tag, item.looksLikeJPEG ? styles.tagSuccess : styles.tagNeutral]}>JPEG</Text>
                <Text variant="labelLarge" style={[styles.value, styles.tag, item.looksLikeHTML ? styles.tagSuccess : styles.tagNeutral]}>HTML</Text>
                <Text variant="labelLarge" style={[styles.value, styles.tag, item.looksLikeH264 ? styles.tagSuccess : styles.tagNeutral]}>H264</Text>
                <Text variant="labelLarge" style={[styles.value, styles.tag, item.looksLikeProprietary ? styles.tagWarning : styles.tagNeutral]}>Proprietary</Text>
              </View>
              <Text variant="labelSmall" style={[styles.section, { color: theme.colors.onSurfaceVariant }]}>Headers</Text>
              {Object.entries(item.headers).map(([key, value]) => (
                <View key={key} style={styles.row}> 
                  <Text variant="bodySmall" style={[styles.headerKey, { color: theme.colors.onSurfaceVariant }]}>{key}:</Text>
                  <Text variant="bodySmall" style={[styles.headerValue, { color: theme.colors.onSurface }]}>{value}</Text>
                </View>
              ))}
              {item.first200 ? (
                <View style={styles.previewSection}>
                  <Text variant="labelSmall" style={[styles.section, { color: theme.colors.onSurfaceVariant }]}>Preview</Text>
                  <Text variant="bodySmall" style={[styles.previewText, { color: theme.colors.onSurface }]}>{item.first200}</Text>
                </View>
              ) : null}
              {item.error ? (
                <Text variant="bodySmall" style={[styles.errorText, { color: theme.colors.error }]}>Error: {item.error}</Text>
              ) : null}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 12,
  },
  title: {
    fontWeight: '900',
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 8,
    lineHeight: 22,
  },
  summary: {
    marginTop: 8,
    fontWeight: '700',
  },
  button: {
    marginHorizontal: 24,
    marginBottom: 12,
    borderRadius: 8,
  },
  buttonContent: {
    height: 52,
  },
  buttonLabel: {
    fontWeight: '900',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  cardTitle: {
    marginBottom: 10,
    fontWeight: '800',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  label: {
    marginRight: 6,
  },
  value: {
    fontWeight: '700',
  },
  tag: {
    marginRight: 8,
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tagSuccess: {
    backgroundColor: '#183F14',
    color: 'white',
  },
  tagWarning: {
    backgroundColor: '#503300',
    color: 'white',
  },
  tagNeutral: {
    backgroundColor: '#2D2D2D',
    color: 'white',
  },
  section: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: '700',
  },
  headerKey: {
    marginRight: 6,
    fontWeight: '700',
  },
  headerValue: {
    flexShrink: 1,
  },
  previewSection: {
    marginTop: 10,
  },
  previewText: {
    marginTop: 4,
    lineHeight: 18,
  },
  errorText: {
    marginTop: 10,
  },
});
