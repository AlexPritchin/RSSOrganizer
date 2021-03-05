import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import RSSNavigator from './RSSNavigator';
import OrganizerNavigator from './OrganizerNavigator';

import { Colors } from '../constants/Colors';

const MainTabNavigator = createBottomTabNavigator({
    RSS: {
        screen: RSSNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => <Ionicons name='newspaper-outline' size={23} color={tabInfo.tintColor}/>
        }
    },
    Organizer: {
        screen: OrganizerNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => <Ionicons name='file-tray-full-outline' size={23} color={tabInfo.tintColor}/>
        }
    }
},{
    tabBarOptions: {
        activeTintColor: Colors.tabNavigatorActiveTintColor,
        inactiveTintColor: Colors.tabNavigatorInactiveTintColor,
        keyboardHidesTabBar: true
    }
});

export default createAppContainer(MainTabNavigator);