import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';

import { HomeScreen } from '../screens/Home';
import { SettingsScreen } from '../screens/Settings';
import { AboutScreen } from '../screens/About';
import { DiagnosticsScreen } from '../screens/Diagnostics';
import { GroundStationScreen } from '../screens/GroundStationScreen';

import { ViewerScreen } from '../screens/Viewer';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />

      <Stack.Screen
        name="GroundStation"
        component={GroundStationScreen}
      />

      <Stack.Screen
        name="Viewer"
        component={ViewerScreen}
      />
      <Stack.Screen
        name="Diagnostics"
        component={DiagnosticsScreen}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />

      <Stack.Screen
        name="About"
        component={AboutScreen}
      />
    </Stack.Navigator>
  );
};
