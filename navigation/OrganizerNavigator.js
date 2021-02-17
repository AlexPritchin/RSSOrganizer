import { createStackNavigator } from 'react-navigation-stack';

import OrganizerListScreen from '../screens/OrganizerListScreen/OrganizerListScreen';

const OrganizerNavigator = createStackNavigator({
    OrganizerList: OrganizerListScreen
});

export default OrganizerNavigator;