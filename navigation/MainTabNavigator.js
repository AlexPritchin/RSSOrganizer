import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import RSSNavigator from './RSSNavigator';
import OrganizerNavigator from './OrganizerNavigator';

import { Colors } from '../constants/Colors';

const tabNavigatorScreens = {
    RSS: {
        screen: RSSNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => <Ionicons name='newspaper-outline' size={23} color={tabInfo.tintColor}/>,
            tabBarColor: Colors.tabNavigatorMaterialRSSColor
        }
    },
    Organizer: {
        screen: OrganizerNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => <Ionicons name='file-tray-full-outline' size={23} color={tabInfo.tintColor}/>,
            tabBarColor: Colors.tabNavigatorMaterialOrganizerColor
        }
    }
};

const MainTabNavigator = 
        Platform.OS === 'ios'
            ? createBottomTabNavigator(tabNavigatorScreens,
                {
                    tabBarOptions: {
                        activeTintColor: Colors.tabNavigatorActiveTintColor,
                        inactiveTintColor: Colors.tabNavigatorInactiveTintColor,
                        keyboardHidesTabBar: true
                    }
                }
              )
            : createMaterialBottomTabNavigator(tabNavigatorScreens, 
                {
                    activeColor: Colors.headerTextColor,
                    inactiveColor: Colors.tabNavigatorMaterialInactiveColor,
                    shifting: true
                }
              );

export default createAppContainer(MainTabNavigator);