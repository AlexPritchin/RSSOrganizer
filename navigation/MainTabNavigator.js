import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import RSSNavigator from './RSSNavigator';
import OrganizerNavigator from './OrganizerNavigator';

const MainTabNavigator = createBottomTabNavigator({
    RSS: {
        screen: RSSNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => <Ionicons name='newspaper-outline' />
        }
    },
    Organizer: {
        screen: OrganizerNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => <Ionicons name='file-tray-full-outline' />
        }
    }
});

export default createAppContainer(MainTabNavigator);