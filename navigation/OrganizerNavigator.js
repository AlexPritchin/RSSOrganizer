import { createStackNavigator } from 'react-navigation-stack';

import OrganizerListScreen from '../screens/Organizer/OrganizerListScreen/OrganizerListScreen';
import OrganizerTaskViewerEditorScreen from '../screens/Organizer/OrganizerTaskViewerEditorScreen/OrganizerTaskViewerEditorScreen';
import OrganizerTaskCreatorScreen from '../screens/Organizer/OrganizerTaskCreatorScreen/OrganizerTaskCreatorScreen';

import { DefaultStackNavigationOptions } from '../constants/GlobalNavigationOptions';

const OrganizerNavigator = createStackNavigator({
    OrganizerList: {
        screen: OrganizerListScreen,
        navigationOptions: {
            headerTitle: 'Tasks'
        }
    },
    OrganizerTaskViewerEditor: {
        screen: OrganizerTaskViewerEditorScreen,
        navigationOptions: {
            headerTitle: 'View task',
            headerBackTitleVisible: false
        }
    },
    OrganizerTaskCreator: {
        screen: OrganizerTaskCreatorScreen,
        navigationOptions: {
            headerBackTitleVisible: false
        }
    }
}, {
    defaultNavigationOptions: DefaultStackNavigationOptions
});

export default OrganizerNavigator;