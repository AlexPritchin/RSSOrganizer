import { StyleSheet, Platform } from 'react-native';

import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.headerTextColor,
  },
  taskDateContainer: {
    height: 30,
    width: '50%',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: Colors.tabNavigatorActiveTintColor,
  },
  taskTitleInput: {
    marginTop: Platform.OS === 'ios' ? 50 : 40,
    marginBottom: 60,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tabNavigatorActiveTintColor,
  },
  taskDecriptionInput: {
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.tabNavigatorActiveTintColor,
  },
});

export default styles;
