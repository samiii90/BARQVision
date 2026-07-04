import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export const AboutScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.BackAction color={theme.colors.onSurface} onPress={() => navigation.goBack()} />
        <Appbar.Content title="About" titleStyle={{ color: theme.colors.onSurface }} />
      </Appbar.Header>

      <View style={styles.content}>
        <Text variant="displaySmall" style={[styles.title, { color: theme.colors.primary }]}>
          BARQ CAM
        </Text>
        <Text variant="titleLarge" style={[styles.version, { color: theme.colors.onBackground }]}>
          Version 2.0
        </Text>
        
        <Text variant="bodyLarge" style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
          Professional wireless camera control application.
        </Text>

        <Text variant="labelLarge" style={[styles.footer, { color: theme.colors.onBackground }]}>
          Powered by BARQ Vision
        </Text>
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
    alignItems: 'center',
    padding: 32,
    paddingTop: 64,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  version: {
    marginBottom: 32,
  },
  description: {
    textAlign: 'center',
    marginBottom: 48,
  },
  footer: {
    marginTop: 'auto',
    opacity: 0.7,
  },
});
