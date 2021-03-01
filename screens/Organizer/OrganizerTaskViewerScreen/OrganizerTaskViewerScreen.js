import React from 'react';
import { View, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import GeneralHeaderButtonComponent from '../../../components/NavigationHeader/GeneralHeaderButtonComponent';

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

OrganizerTaskViewerScreen.navigationOptions = navData => {
  return {
    headerRight: (<HeaderButtons HeaderButtonComponent={GeneralHeaderButtonComponent}>
      <Item title='Edit' onPress={() => {}} />
    </HeaderButtons>)
  };
};

export default OrganizerTaskViewerScreen;
