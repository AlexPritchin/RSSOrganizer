import { createStackNavigator } from 'react-navigation-stack';

import OrganizerListScreen from '../screens/Organizer/OrganizerListScreen/OrganizerListScreen';

import { DefaultStackNavigationOptions } from '../constants/GlobalNavigationOptions';

const OrganizerNavigator = createStackNavigator({
    OrganizerList: OrganizerListScreen
}, {
    defaultNavigationOptions: DefaultStackNavigationOptions
});

export default OrganizerNavigator;