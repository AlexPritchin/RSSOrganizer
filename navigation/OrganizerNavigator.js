import { createStackNavigator } from 'react-navigation-stack';

import OrganizerListScreen from '../screens/Organizer/OrganizerListScreen/OrganizerListScreen';
import OrganizerTaskViewerScreen from '../screens/Organizer/OrganizerTaskViewerScreen/OrganizerTaskViewerScreen';
import OrganizerTaskEditorScreen from '../screens/Organizer/OrganizerTaskEditorScreen/OrganizerTaskEditorScreen';

import { DefaultStackNavigationOptions } from '../constants/GlobalNavigationOptions';

const OrganizerNavigator = createStackNavigator({
    OrganizerList: OrganizerListScreen,
    OrganizerTaskViewer: OrganizerTaskViewerScreen,
    OrganizerTaskEditor: OrganizerTaskEditorScreen
}, {
    defaultNavigationOptions: DefaultStackNavigationOptions
});

export default OrganizerNavigator;