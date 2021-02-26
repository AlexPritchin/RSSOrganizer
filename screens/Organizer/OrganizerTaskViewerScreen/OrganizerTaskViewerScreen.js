import React from 'react';
import { View, Text } from 'react-native';

import styles from './OrganizerTaskViewerScreenStyles';

const OrganizerTaskViewerScreen = props => {
  const taskItem = props.navigation.getParam('task');

  return (
    <View style={styles.taskContainer}>
      <Text style={styles.taskDueDate}>{taskItem.dueDate}</Text>
      <Text style={styles.taskTitle}>{taskItem.title}</Text>
      <Text style={styles.taskDescription}>{taskItem.description}</Text>
    </View>
  );
};

export default OrganizerTaskViewerScreen;
