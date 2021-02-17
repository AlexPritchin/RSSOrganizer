import { createStackNavigator } from 'react-navigation-stack';

import RSSListScreen from '../screens/RSSListScreen/RSSListScreen';
import RSSDetailsScreen from '../screens/RSSDetailsScreen/RSSDetailsScreen';

const RSSNavigator = createStackNavigator({
    RSSList: RSSListScreen,
    RSSDetails: RSSDetailsScreen
});

export default RSSNavigator;