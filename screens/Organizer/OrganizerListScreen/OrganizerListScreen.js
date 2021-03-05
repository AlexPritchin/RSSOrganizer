import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import { OrganizerTask } from '../../../models/OrganizerTask';

import { OrganizerScreensNames } from '../../../constants/ScreensNames';

import OrganizerListItem from '../../../components/Organizer/OrganizerListItem/OrganizerListItem';
import GeneralHeaderButtonComponent from '../../../components/NavigationHeader/GeneralHeaderButtonComponent';

import { deleteTask } from '../../../store/actions/OrganizerActions';

import styles from './OrganizerListScreenStyles';

const OrganizerListScreen = props => {
  const tasks = useSelector(state => state.organizerTasks.tasks);

  const dispatch = useDispatch();

  const listItemPressCallback = (navigation, taskIdToPassToViewer) => {
    navigation.push(OrganizerScreensNames.OrganizerTaskViewer, {
      taskId: taskIdToPassToViewer,
    });
  };

  const listItemDeleteCallback = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const renderOrganizerTaskItem = itemData => {
    return (
      <OrganizerListItem
        taskItem={itemData.item}
        onTaskItemPress={() => {
          listItemPressCallback(props.navigation, itemData.item.id);
        }}
        onTaskItemDelete={() => {
          listItemDeleteCallback(itemData.item.id);
        }}
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

OrganizerListScreen.navigationOptions = navData => {
  return {
    headerRight: (<HeaderButtons HeaderButtonComponent={GeneralHeaderButtonComponent}>
      <Item iconName='add' onPress={() => {
        navData.navigation.push(OrganizerScreensNames.OrganizerTaskEditor, {
          mode: 'add'
        });
      }} />
    </HeaderButtons>)
  };
};

export default OrganizerListScreen;