import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../navigation/types';

export const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<RootNavigationProp>();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}>

      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.Content
          title="BARQ CAM"
          titleStyle={{ color: theme.colors.onSurface }}
        />

        <Appbar.Action
          icon="cog"
          color={theme.colors.onSurface}
          onPress={() => navigation.navigate('Settings')}
        />

        <Appbar.Action
          icon="information"
          color={theme.colors.onSurface}
          onPress={() => navigation.navigate('About')}
        />
      </Appbar.Header>

      <View style={styles.content}>

        <View style={styles.header}>

          <Text
            variant="displayLarge"
            style={[
              styles.title,
              { color: theme.colors.onBackground },
            ]}>
            BARQ CAM
          </Text>

          <Text
            variant="titleLarge"
            style={[
              styles.subtitle,
              { color: theme.colors.onSurfaceVariant },
            ]}>
            UGV GROUND STATION
          </Text>

        </View>

        <View style={styles.center}>

          <Button
            mode="contained"
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            onPress={() => navigation.navigate('Viewer')}>
            CONNECT
          </Button>

          <Button
            mode="outlined"
            style={[styles.button, styles.secondaryButton]}
            contentStyle={styles.buttonContent}
            labelStyle={[styles.buttonLabel, styles.secondaryButtonLabel]}
            onPress={() => navigation.navigate('Diagnostics')}>
            RUN DIAGNOSTICS
          </Button>

        </View>

        <View style={styles.footer}>

          <Text
            variant="labelMedium"
            style={[
              styles.footerText,
              { color: theme.colors.onSurfaceVariant },
            ]}>
            BARQ VISION
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

  header: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
  },

  title: {
    fontWeight: '900',
    letterSpacing: 3,
  },

  subtitle: {
    marginTop: 12,
    letterSpacing: 2,
  },

  button: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 6,
  },

  secondaryButton: {
    marginTop: 12,
  },

  secondaryButtonLabel: {
    fontWeight: '900',
  },

  buttonContent: {
    height: 64,
  },

  buttonLabel: {
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: 2,
  },

  footerText: {
    letterSpacing: 2,
  },

});
