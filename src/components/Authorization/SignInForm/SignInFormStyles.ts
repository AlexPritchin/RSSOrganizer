import { StyleSheet, Platform } from 'react-native';

import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    marginHorizontal: 30,
    height: '30%',
    //marginVertical: 100,
    padding: 20,
    backgroundColor: Colors.headerTextColor,
    borderRadius: 10
  },
  emailInput: {
    marginTop: Platform.OS === 'ios' ? 25 : 30,
    //marginBottom: 10,
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
    //textAlignVertical: 'top',
    //paddingHorizontal: 10,
    //paddingVertical: 5,
    marginTop: 50,
    //marginBottom: 15,
    //borderWidth: 1,
    //borderColor: Colors.tabNavigatorActiveTintColor,
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