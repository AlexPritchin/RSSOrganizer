import { StyleSheet } from 'react-native';

import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.backgroundScreenColor,
  },
  messageText: {
    textAlign: 'center',
  },
  reloadButtonContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 40,
    width: '40%',
    marginTop: 40,
    borderRadius: 5,
    backgroundColor: Colors.backgroundHeaderColor,
  },
  reloadButtonText: {
    color: Colors.headerTextColor,
    textAlign: 'center',
  }
});

export default styles;