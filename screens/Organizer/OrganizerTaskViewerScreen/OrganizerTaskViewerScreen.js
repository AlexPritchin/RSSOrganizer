import React from 'react';
import { View, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import GeneralHeaderButtonComponent from '../../../components/NavigationHeader/GeneralHeaderButtonComponent';

import styles from './OrganizerTaskViewerScreenStyles';

const OrganizerTaskViewerScreen = props => {
  const taskItemId = props.navigation.getParam('taskId');
  const tasks = useSelector(state => state.organizerTasks.tasks);
  const taskToShow = tasks.find(task => task.id === taskItemId);

  return (
    <View style={styles.taskContainer}>
      <Text style={styles.taskDueDate}>{taskToShow.formattedDueDate}</Text>
      <Text style={styles.taskTitle}>{taskToShow.title}</Text>
      <Text style={styles.taskDescription}>{taskToShow.description}</Text>
    </View>
  );
};

OrganizerTaskViewerScreen.navigationOptions = navData => {
  return {
    headerRight: (<HeaderButtons HeaderButtonComponent={GeneralHeaderButtonComponent}>
      <Item title='Edit' onPress={() => {}} />
    </HeaderButtons>)
  };
};

export default OrganizerTaskViewerScreen;
