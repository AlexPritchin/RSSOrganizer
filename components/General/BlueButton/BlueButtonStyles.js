import { StyleSheet } from 'react-native';

import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    height: 40,
    marginTop: 40,
    borderRadius: 5,
    backgroundColor: Colors.backgroundHeaderColor,
  },
  buttonText: {
    color: Colors.headerTextColor,
    textAlign: 'center',
  }
});

export default styles;