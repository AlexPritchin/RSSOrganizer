import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UserProfileSettingsScreen from '../screens/UserProfile/UserProfileSettingsScreen/UserProfileSettingsScreen';

import { DefaultStackNavigationOptions } from '../constants/GlobalNavigationOptions';

export type UserProfileParamList = {
    UserProfileSettings: undefined;
}

const Stack = createStackNavigator<UserProfileParamList>();

const UserProfileNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={DefaultStackNavigationOptions}
        >
            <Stack.Screen 
                name={'UserProfileSettings'}
                component={UserProfileSettingsScreen}
                options={{
                    headerTitle: 'User profile settings'
                }}
            />
        </Stack.Navigator>
    );
};

export default UserProfileNavigator;