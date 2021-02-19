import { createStackNavigator } from 'react-navigation-stack';

import RSSListScreen from '../screens/RSS/RSSListScreen/RSSListScreen';
import RSSDetailsScreen from '../screens/RSS/RSSDetailsScreen/RSSDetailsScreen';

import { DefaultStackNavigationOptions } from '../constants/GlobalNavigationOptions';

const RSSNavigator = createStackNavigator({
    RSSList: RSSListScreen,
    RSSDetails: RSSDetailsScreen
}, {
    defaultNavigationOptions: DefaultStackNavigationOptions
});

export default RSSNavigator;