import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    padding: 20,
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
