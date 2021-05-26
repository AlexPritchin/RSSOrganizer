import React, { useState, useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import { LogBox, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as SplashScreen from 'expo-splash-screen';

import { initializeDatabase } from './src/services/data/Organizer/OrganizerDBDataService';

// import BottomTabNavigator from './src/navigation/MainTabNavigator';
import DrawerNavigator from './src/navigation/MainDrawerNavigator';

import SignInScreen from './src/screens/Authorization/SignInScreen';

import { Colors } from './src/constants/Colors';

enableScreens();

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  queries: {
    retry: false
  }
});

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  const [userSignedIn, setUserSignedIn] = useState(false);

  useEffect(() => {
    async function initDB() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await initializeDatabase();;
      } catch (error) {
        console.log(error);
      } finally {
        setDbInitialized(true);
        await SplashScreen.hideAsync();
      }
    };

    initDB();
  }, []);

  if (!dbInitialized) {
    return null;
  }

  LogBox.ignoreLogs([
    'It appears that you are using old version of react-navigation library',
    'Deprecation in \'navigationOptions\'',
    'Your project is accessing'
  ]);
  return !userSignedIn ? (
    <SignInScreen userSignedInCallback={() => setUserSignedIn(true)} />
  ) : (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar backgroundColor={Colors.statusBarBackgroundColor} />
        {/* <BottomTabNavigator /> */}
        <DrawerNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};
