import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, List, Divider, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export const SettingsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.BackAction color={theme.colors.onSurface} onPress={() => navigation.goBack()} />
        <Appbar.Content title="Settings" titleStyle={{ color: theme.colors.onSurface }} />
      </Appbar.Header>

      <List.Section>
        <List.Item
          title="App Theme"
          description="Dark Theme"
          left={props => <List.Icon {...props} icon="theme-light-dark" color={theme.colors.primary} />}
          titleStyle={{ color: theme.colors.onBackground }}
          descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
        />
        <Divider style={{ backgroundColor: theme.colors.surfaceVariant }} />
        
        <List.Item
          title="Camera Address"
          description="http://192.168.25.1:8080/?action=stream"
          left={props => <List.Icon {...props} icon="video-marker" color={theme.colors.primary} />}
          titleStyle={{ color: theme.colors.onBackground }}
          descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
        />
        <Divider style={{ backgroundColor: theme.colors.surfaceVariant }} />

        <List.Item
          title="Version"
          description="2.0.0"
          left={props => <List.Icon {...props} icon="information" color={theme.colors.primary} />}
          titleStyle={{ color: theme.colors.onBackground }}
          descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
        />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
