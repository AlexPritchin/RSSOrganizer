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
    color: Colors.textInputsSelectionColor
  },
  reloadButton: {
    alignSelf: 'center',
    width: '40%',
  },
});

export default styles;