import { StyleSheet, Platform } from 'react-native';

import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
    taskContainer: {
        flex: 1,
        padding: 20,
      },
      taskTitleInput: {
          marginTop: Platform.OS === 'ios' ? 30 : 15,
          marginBottom: 40,
          borderBottomWidth: 1,
          borderBottomColor: Colors.tabNavigatorActiveTintColor
      },
      taskDecriptionInput: {
          textAlignVertical: 'top',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderWidth: 1,
          borderColor: Colors.tabNavigatorActiveTintColor,
      }
});

export default styles;