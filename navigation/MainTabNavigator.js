import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import RSSNavigator from './RSSNavigator';
import OrganizerNavigator from './OrganizerNavigator';

import { Colors } from '../constants/Colors';

const BottomTab = createBottomTabNavigator();
const MaterialTab = createMaterialBottomTabNavigator();

const tabNavigatorsScreenOptions = ({ route }) => ({
    tabBarIcon: ({ color }) => {
        let iconName;
        if (route.name === 'RSS') {
            iconName = 'newspaper-outline';
        } else {
            iconName = 'file-tray-full-outline';
        }
        return <Ionicons name={iconName} size={23} color={color}/>
    },
    tabBarColor: () => route.name === 'RSS' ? Colors.tabNavigatorMaterialRSSColor : Colors.tabNavigatorMaterialOrganizerColor
});

const IosBottomTabNavigator = () => {
    return (
        <BottomTab.Navigator
            screenOptions={tabNavigatorsScreenOptions}
            tabBarOptions={{
                activeTintColor: Colors.tabNavigatorActiveTintColor,
                inactiveTintColor: Colors.tabNavigatorInactiveTintColor,
                keyboardHidesTabBar: true
            }}
        >
            <BottomTab.Screen 
                name='RSS'
                component={RSSNavigator}
            />
            <BottomTab.Screen 
                name='Organizer'
                component={OrganizerNavigator}
            />
        </BottomTab.Navigator>
    );
};

const AndroidBottomTabNavigator = () => {
    return (
        <MaterialTab.Navigator
            screenOptions={tabNavigatorsScreenOptions}
            activeColor={Colors.headerTextColor}
            inactiveColor={Colors.tabNavigatorMaterialInactiveColor}
            shifting={true}
        >
            <MaterialTab.Screen 
                name='RSS'
                component={RSSNavigator}
            />
            <MaterialTab.Screen 
                name='Organizer'
                component={OrganizerNavigator}
            />
        </MaterialTab.Navigator>
    );
};

const BottomTabNavigatorForCurrentPlatform = Platform.select({
                                                ios: IosBottomTabNavigator,
                                                android: AndroidBottomTabNavigator
                                            });

export default BottomTabNavigatorForCurrentPlatform;