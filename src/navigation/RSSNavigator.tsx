import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RSSListScreen from '../screens/RSS/RSSListScreen/RSSListScreen';
import RSSDetailsScreen from '../screens/RSS/RSSDetailsScreen/RSSDetailsScreen';

import { DefaultStackNavigationOptions } from '../constants/GlobalNavigationOptions';
import { RSSScreensNames } from '../constants/ScreensNames';

const Stack = createStackNavigator();

const RSSNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={DefaultStackNavigationOptions}
        >
            <Stack.Screen 
                name={RSSScreensNames.RSSList}
                component={RSSListScreen}
                options={{
                    headerTitle: 'The NY Times RSS: Europe'
                }}
            />
            <Stack.Screen 
                name={RSSScreensNames.RSSDetails}
                component={RSSDetailsScreen}
                options={{
                    headerBackTitleVisible: false
                }}
            />
        </Stack.Navigator>
    );
};

export default RSSNavigator;