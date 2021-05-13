import React from 'react';
import { enableScreens } from 'react-native-screens';
import { LogBox, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';

import { initializeDatabase } from './src/services/data/Organizer/OrganizerDBDataService';

import BottomTabNavigator from './src/navigation/MainTabNavigator';

import { Colors } from './src/constants/Colors';

enableScreens();

initializeDatabase();

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  queries: {
    retry: false
  }
});

export default function App() {
  LogBox.ignoreLogs([
    'It appears that you are using old version of react-navigation library',
    'Deprecation in \'navigationOptions\'',
    'Your project is accessing'
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar backgroundColor={Colors.statusBarBackgroundColor} />
        <BottomTabNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};
