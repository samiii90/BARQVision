import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../navigation/types';

export const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<RootNavigationProp>();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.Content title="BARQ CAM" titleStyle={{ color: theme.colors.onSurface }} />
        <Appbar.Action icon="cog" color={theme.colors.onSurface} onPress={() => navigation.navigate('Settings')} />
        <Appbar.Action icon="information" color={theme.colors.onSurface} onPress={() => navigation.navigate('About')} />
      </Appbar.Header>

      <View style={styles.content}>
        <Text variant="displayMedium" style={[styles.title, { color: theme.colors.onBackground }]}>
          BARQ CAM
        </Text>
        <Text variant="titleMedium" style={[styles.subtitle, { color: theme.colors.onBackground }]}>
          Ready to Connect
        </Text>

        <Button
          mode="contained"
          onPress={() => {}}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          CONNECT CAMERA
        </Button>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 48,
  },
  button: {
    borderRadius: 8,
    width: '100%',
    maxWidth: 320,
  },
  buttonContent: {
    height: 64,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
