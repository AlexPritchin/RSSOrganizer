import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabNavigator from './MainTabNavigator';
import UserProfileNavigator from './UserProfileNavigator';

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name='TabNavigator' options={{title: 'Home'}} component={MainTabNavigator} />
            <Drawer.Screen name='UserProfileSettings' options={{title: 'Settings'}} component={UserProfileNavigator} />
        </Drawer.Navigator>
    );
};

export default MainDrawerNavigator;