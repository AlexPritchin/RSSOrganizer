import { createStackNavigator } from 'react-navigation-stack';

import RSSListScreen from '../screens/RSSListScreen/RSSListScreen';
import RSSDetailsScreen from '../screens/RSSDetailsScreen/RSSDetailsScreen';

import defaultStackNavigationOptions from '../constants/GlobalNavigationOptions';

const RSSNavigator = createStackNavigator({
    RSSList: RSSListScreen,
    RSSDetails: RSSDetailsScreen
}, {
    defaultNavigationOptions: defaultStackNavigationOptions
});

export default RSSNavigator;