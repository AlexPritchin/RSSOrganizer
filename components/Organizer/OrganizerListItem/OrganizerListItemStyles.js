import { StyleSheet } from 'react-native';

import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  organizerListItemContainer: {
    flexDirection: 'row',
    height: 80,
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.backgroundListItemColor,
  },
  organizerListItemTextContainer: {
    justifyContent: 'space-evenly',
    flex: 1,
    marginLeft: 10,
  },
  organizerListItemDate: {
    fontSize: 11,
    color: Colors.listItemTitleColor,
    paddingBottom: 1,
  },
  organizerListItemTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 1,
  },
  organizerListItemDeleteContainer: {
    flexBasis: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7
  },
});

export default styles;
