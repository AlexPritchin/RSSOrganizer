import { StyleSheet } from 'react-native';

import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.headerTextColor
  },
  taskDueDate: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15
  },
  taskDescription: {
    textAlign: 'justify',
    fontSize: 18,
    marginTop: 25
  },
});

export default styles;
