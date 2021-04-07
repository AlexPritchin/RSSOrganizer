import { StyleSheet } from 'react-native';

import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.headerTextColor
  },
  taskCreationDate: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    color: Colors.textInputsSelectionColor
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    color: Colors.textInputsSelectionColor
  },
  taskDescription: {
    textAlign: 'justify',
    fontSize: 18,
    marginTop: 35,
    color: Colors.textInputsSelectionColor
  },
});

export default styles;