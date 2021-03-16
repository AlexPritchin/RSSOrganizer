import { Platform } from 'react-native';

import { Colors } from './Colors';

const DefaultStackNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.backgroundHeaderColor : Colors.backgroundIOSHeaderColor
    },
    headerTitleStyle: {
        fontSize: Platform.OS === 'ios' ? 19 : 20
    },
    headerTintColor: Platform.OS === 'android' ? Colors.headerTextColor : Colors.backgroundHeaderColor
};

export { DefaultStackNavigationOptions };