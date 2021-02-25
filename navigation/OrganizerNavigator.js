import { createStackNavigator } from 'react-navigation-stack';

import OrganizerListScreen from '../screens/Organizer/OrganizerListScreen/OrganizerListScreen';
import OrganizerTaskViewerScreen from '../screens/Organizer/OrganizerTaskViewerScreen/OrganizerTaskViewerScreen';
import OrganizerTaskEditorScreen from '../screens/Organizer/OrganizerTaskEditorScreen/OrganizerTaskEditorScreen';

import { DefaultStackNavigationOptions } from '../constants/GlobalNavigationOptions';

const OrganizerNavigator = createStackNavigator({
    OrganizerList: {
        screen: OrganizerListScreen,
        navigationOptions: {
            headerTitle: 'Tasks'
        }
    },
    OrganizerTaskViewer: {
        screen: OrganizerTaskViewerScreen,
        navigationOptions: {
            headerTitle: 'View task'
        }
    },
    OrganizerTaskEditor: OrganizerTaskEditorScreen
}, {
    defaultNavigationOptions: DefaultStackNavigationOptions
});

export default OrganizerNavigator;