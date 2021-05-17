import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { RouteProp } from '@react-navigation/native';

import RSSNavigator from './RSSNavigator';
import OrganizerNavigator from './OrganizerNavigator';

import { Colors } from '../constants/Colors';

import RSSIcon from '../components/Icons/General/TabBarRSSIcon';
import OrganizerIcon from '../components/Icons/General/TabBarOrganizerIcon';

const BottomTab = createBottomTabNavigator();
const MaterialTab = createMaterialBottomTabNavigator();

interface TabNavigatorScreenOptionsFuncData {
    route: RouteProp<Record<string, object | undefined>, string>;
    navigation: any;
};

interface TabNavigatorScreenOptionsTabBarIconFuncData {
    focused: boolean;
    color: string;
};

const tabNavigatorsScreenOptions = (data: TabNavigatorScreenOptionsFuncData) => ({
    tabBarIcon: (iconData: TabNavigatorScreenOptionsTabBarIconFuncData) => {
        let iconName;
        if (data.route.name === 'RSS') {
            return <RSSIcon color={iconData.color} />
        }
        return <OrganizerIcon color={iconData.color} />
    },
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
            barStyle={{backgroundColor: Colors.tabNavigatorMaterialColor}}
            shifting={false}
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
                                                android: AndroidBottomTabNavigator,
                                                default: IosBottomTabNavigator
                                            });

export default BottomTabNavigatorForCurrentPlatform;