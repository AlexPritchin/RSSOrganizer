import { StyleSheet } from 'react-native';

import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
    organizerListContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.backgroundScreenColor,
      },
      organizerListItemHiddenItem: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: 27,
        paddingRight: 10
      },
});

export default styles;