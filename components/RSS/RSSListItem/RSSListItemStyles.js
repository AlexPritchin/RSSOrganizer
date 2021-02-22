import { StyleSheet } from 'react-native';

import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
    rssListItemContainer: {
        flexDirection: 'row',
        height: 80,
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.backgroundListItemColor,
      },
      rssListItemImage: {
        flexBasis: 60,
        resizeMode: 'contain'
      },
      rssListItemTextContainer: {
        justifyContent: 'space-evenly',
        flex: 1,
        marginLeft: 10,
      },
      rssListItemDate: {
        fontSize: 12,
        color: Colors.listItemTitleColor,
        paddingBottom: 2
      },
      rssListItemTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingTop: 2
      },
});

export default styles;