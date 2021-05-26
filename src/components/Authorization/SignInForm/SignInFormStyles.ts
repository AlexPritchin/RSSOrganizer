import { StyleSheet, Platform } from 'react-native';

import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    height: '30%',
    padding: 20,
    backgroundColor: Colors.headerTextColor,
    borderRadius: 10
  },
  emailInput: {
    marginTop: Platform.OS === 'ios' ? 25 : 30,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tabNavigatorActiveTintColor,
  },
  emailErrorTextContainer: {
    marginBottom: -18
  },
  emailErrorText: {
    color: Colors.deleteIconColor
  },
  passwordInput: {
    marginTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tabNavigatorActiveTintColor,
  },
  passwordErrorTextContainer: {
    marginBottom: -18
  },
  passwordErrorText: {
    color: Colors.deleteIconColor
  },
  submitButton: {
    alignSelf: 'center',
    marginTop: 55,
    width: '35%',
  },
});

export default styles;