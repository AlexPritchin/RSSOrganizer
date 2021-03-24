import React from 'react';
import { enableScreens } from 'react-native-screens';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { initializeDatabase } from './services/data/Organizer/OrganizerDBDataService';

import BottomTabNavigator from './navigation/MainTabNavigator';

enableScreens();

initializeDatabase();

export default function App() {
  LogBox.ignoreLogs([
    'It appears that you are using old version of react-navigation library',
    'Deprecation in \'navigationOptions\'',
    'Your project is accessing'
  ]);
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};
