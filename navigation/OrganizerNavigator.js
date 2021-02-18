import { createStackNavigator } from 'react-navigation-stack';

import OrganizerListScreen from '../screens/OrganizerListScreen/OrganizerListScreen';

import defaultStackNavigationOptions from '../constants/GlobalNavigationOptions';

const OrganizerNavigator = createStackNavigator({
    OrganizerList: OrganizerListScreen
}, {
    defaultNavigationOptions: defaultStackNavigationOptions
});

export default OrganizerNavigator;