import React, { useState } from 'react';
import { FlatList, View, Dimensions, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { FontAwesome } from '@expo/vector-icons';

import { OrganizerTask } from '../../../models/OrganizerTask';

import { OrganizerScreensNames } from '../../../constants/ScreensNames';
import { OrganizerTaskStatuses } from '../../../constants/OrganizerConstants'

import OrganizerListItem from '../../../components/Organizer/OrganizerListItem/OrganizerListItem';
import GeneralHeaderButtonComponent from '../../../components/NavigationHeader/GeneralHeaderButtonComponent';

import styles from './OrganizerListScreenStyles';

const OrganizerListScreen = props => {
  const tasks = useSelector(state => state.organizerTasks.tasks);

  const dispatch = useDispatch();

  const listItemPressCallback = (navigation, taskIdToPassToViewer) => {
    navigation.push(OrganizerScreensNames.OrganizerTaskViewerEditor, {
      taskId: taskIdToPassToViewer,
    });
  };

  const markTaskCompleted = rowData => {
    if (!rowData.isActivated) {
      return;
    }
    const taskToChange = tasks.find(task => task.id === rowData.key);
    taskToChange.status = OrganizerTaskStatuses.completed;
    dispatch(editTask(taskToChange));
  }

  const deleteTaskAction = rowData => {
    if (!rowData.isActivated) {
      return;
    }
    Alert.alert('Confirm action', 'Do you really want to delete this task', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Ok',
        onPress: () => dispatch(deleteTask(rowData.key))
      }
    ]);
  };

  const renderOrganizerTaskItem = itemData => {
    return (
      <OrganizerListItem
        taskItem={itemData.item}
        onTaskItemPress={() => {
          listItemPressCallback(props.navigation, itemData.item.id);
        }}
      />
    );
  };

  const renderOrganizerTaskHiddenItem = () => {
    return (
      <View style={styles.organizerListItemHiddenItem}>
              <FontAwesome name='trash' color={'red'} size={25}/>
          </View>
    );
  };

  return (
    <View style={styles.organizerListContainer}>
      <SwipeListView
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={item => renderOrganizerTaskItem(item)}
        renderHiddenItem={renderOrganizerTaskHiddenItem}
        leftOpenValue={100}
        leftActivationValue={90}
        rightOpenValue={-200}
        rightActivationValue={-190}
        onLeftActionStatusChange={markTaskCompleted}
        onRightActionStatusChange={deleteTaskAction}
        onRowDidOpen={(rowKey, rowMap) => {
          rowMap[rowKey].closeRow();
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

OrganizerListScreen.navigationOptions = navData => {
  return {
    headerRight: (<HeaderButtons HeaderButtonComponent={GeneralHeaderButtonComponent}>
      <Item iconName='add' onPress={() => {
        navData.navigation.push(OrganizerScreensNames.OrganizerTaskCreator);
      }} />
    </HeaderButtons>)
  };
};

export default OrganizerListScreen;