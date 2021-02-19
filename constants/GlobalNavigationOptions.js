import { Platform } from 'react-native';

import Colors from './Colors';

const defaultStackNavigationOptions = {
    headerStyle: {
        backgroundColor: Colors.backgroundHeaderColor
    },
    headerTitleStyle: {
        fontSize: Platform.OS === 'ios' ? 19 : 20
    },
    headerTintColor: Colors.headerTextColor
};

export {defaultStackNavigationOptions as default};