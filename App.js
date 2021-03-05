import React from 'react';
import { enableScreens } from 'react-native-screens';
import { LogBox } from 'react-native';

import MainNavigator from './navigation/MainTabNavigator';

enableScreens();

export default function App() {
  LogBox.ignoreLogs([
    'It appears that you are using old version of react-navigation library',
    'Deprecation in \'navigationOptions\''
  ]);
  return <MainNavigator />;
}
