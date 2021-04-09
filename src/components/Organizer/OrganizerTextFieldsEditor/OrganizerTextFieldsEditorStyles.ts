import { StyleSheet, Platform } from 'react-native';

import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.headerTextColor,
  },
  titleInput: {
    marginTop: Platform.OS === 'ios' ? 40 : 30,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tabNavigatorActiveTintColor,
  },
  titleErrorText: {
    color: Colors.deleteIconColor
  },
  decriptionInput: {
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.tabNavigatorActiveTintColor,
  },
  decriptionErrorText: {
    color: Colors.deleteIconColor
  },
  submitButton: {
    alignSelf: 'center',
    marginTop: 40,
    width: '35%',
  },
});

export default styles;
