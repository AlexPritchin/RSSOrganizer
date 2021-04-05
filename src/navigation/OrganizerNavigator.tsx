import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import OrganizerListScreen from '../screens/Organizer/OrganizerListScreen/OrganizerListScreen';
import OrganizerTaskViewerEditorScreen from '../screens/Organizer/OrganizerTaskViewerEditorScreen/OrganizerTaskViewerEditorScreen';
import OrganizerTaskCreatorScreen from '../screens/Organizer/OrganizerTaskCreatorScreen/OrganizerTaskCreatorScreen';

import { OrganizerTask } from '../models/OrganizerTask';

import { DefaultStackNavigationOptions } from '../constants/GlobalNavigationOptions';
import { OrganizerScreensNames } from '../constants/ScreensNames';

export type OrganizerStackParamList = {
    OrganizerList: undefined;
    OrganizerTaskCreator: { refreshTasksCallback: Function };
    OrganizerTaskViewerEditor: { taskToViewOrUpdate: OrganizerTask, refreshTasksCallback: Function };
}

const Stack = createStackNavigator<OrganizerStackParamList>();

const OrganizerNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={DefaultStackNavigationOptions}
        >
            <Stack.Screen 
                name={OrganizerScreensNames.OrganizerList}
                component={OrganizerListScreen}
                options={{
                    headerTitle: 'Tasks'
                }}
            />
            <Stack.Screen 
                name={OrganizerScreensNames.OrganizerTaskCreator}
                component={OrganizerTaskCreatorScreen}
                options={{
                    headerTitle: 'Add task',
                    headerBackTitleVisible: false
                }}
            />
            <Stack.Screen 
                name={OrganizerScreensNames.OrganizerTaskViewerEditor}
                component={OrganizerTaskViewerEditorScreen}
                options={{
                    headerBackTitleVisible: false
                }}
            />
        </Stack.Navigator>
    );
};

export default OrganizerNavigator;