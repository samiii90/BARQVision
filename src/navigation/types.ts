import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Viewer: undefined;
  Settings: undefined;
  About: undefined;
};

export type RootNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
