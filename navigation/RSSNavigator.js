import { createStackNavigator } from 'react-navigation-stack';

import RSSListScreen from '../screens/RSS/RSSListScreen/RSSListScreen';
import RSSDetailsScreen from '../screens/RSS/RSSDetailsScreen/RSSDetailsScreen';

import { DefaultStackNavigationOptions } from '../constants/GlobalNavigationOptions';

const RSSNavigator = createStackNavigator({
    RSSList: {
        screen: RSSListScreen,
        navigationOptions: {
            headerTitle: 'The NY Times RSS: Europe'
        }
    },
    RSSDetails: {
        screen: RSSDetailsScreen,
        navigationOptions: {
            headerBackTitleVisible: false
        }
    }
}, {
    defaultNavigationOptions: DefaultStackNavigationOptions
});

export default RSSNavigator;