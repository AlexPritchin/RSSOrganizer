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
    marginBottom: 70,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tabNavigatorActiveTintColor,
  },
  decriptionInput: {
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.tabNavigatorActiveTintColor,
  },
});

export default styles;
