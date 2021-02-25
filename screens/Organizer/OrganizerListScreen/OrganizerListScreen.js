import React, { useState } from 'react';
import { FlatList, View } from 'react-native';

import { OrganizerTask } from '../../../models/OrganizerTask';

import OrganizerListItem from '../../../components/Organizer/OrganizerListItem/OrganizerListItem';

import styles from './OrganizerListScreenStyles';

const OrganizerListScreen = props => {
  const [tasks, setTasks] = useState([
    new OrganizerTask(1, '25.02.21' , 'the title', 'the task description')
  ]);

  const listItemPressCallback = (navigation, articleItemToPassToDetails) => {
    navigation.push(RSSScreensNames.RSSDetails, {
      articleItem: articleItemToPassToDetails,
    });
  };

  const renderOrganizerTaskItem = itemData => {
    return (
      <OrganizerListItem
        taskItem={itemData.item}
        onTaskItemPress={() => {
          //listItemPressCallback(props.navigation, itemData.item);
        }}
        onTaskItemDelete={() => {}}
      />
    );
  };

  return (
    <View style={styles.organizerListContainer}>
      <FlatList
        data={tasks}
        renderItem={item => renderOrganizerTaskItem(item)}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default OrganizerListScreen;