import React, { useState, useEffect } from 'react';
import { View, Alert, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { FontAwesome } from '@expo/vector-icons';

import { OrganizerScreensNames } from '../../../constants/ScreensNames';
import { OrganizerTaskStatuses } from '../../../constants/OrganizerConstants';
import { DataLoadingStatuses } from '../../../constants/DataLoadingStatuses';

import { selectSQLTasks, updateSQLTask, deleteSQLTask } from '../../../services/data/Organizer/OrganizerDBDataService';

import OrganizerListItem from '../../../components/Organizer/OrganizerListItem/OrganizerListItem';
import GeneralHeaderButtonComponent from '../../../components/NavigationHeader/GeneralHeaderButtonComponent';

import styles from './OrganizerListScreenStyles';

const OrganizerListScreen = props => {
  const [dataLoadingStatus, setDataLoadingStatus] = useState(DataLoadingStatuses.loading);
  const [tasks, setTasks] = useState([]);

  const tasksReceivingCallback = tasks => {
    if (tasks === null) {
      setDataLoadingStatus(DataLoadingStatuses.error);
      return;
    }
    if (tasks.length === 0) {
      setDataLoadingStatus(DataLoadingStatuses.noData);
      return;
    }
    setTasks(tasks);
    setDataLoadingStatus(DataLoadingStatuses.success);
  };

  useEffect(() => {
    selectSQLTasks(tasksReceivingCallback);
  }, []);

  const sqlBoolResultCallback = result => {
    if (!result) {
      setDataLoadingStatus(DataLoadingStatuses.error);
      return;
    }
    selectSQLTasks(tasksReceivingCallback);
    setDataLoadingStatus(DataLoadingStatuses.loading);
  };

  const listItemPressCallback = (navigation, taskToPassToViewer) => {
    navigation.push(OrganizerScreensNames.OrganizerTaskViewerEditor, {
      task: taskToPassToViewer,
    });
  };

  const markTaskCompleted = rowData => {
    if (!rowData.isActivated) {
      return;
    }
    const taskToChange = tasks.find(task => task.id === rowData.key);
    taskToChange.status = OrganizerTaskStatuses.completed;
    updateSQLTask(taskToChange, sqlBoolResultCallback);
  };

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
        onPress: () => deleteSQLTask(rowData.key, sqlBoolResultCallback)
      }
    ]);
  };

  const renderOrganizerTaskItem = itemData => {
    return (
      <OrganizerListItem
        taskItem={itemData.item}
        onTaskItemPress={() => {
          listItemPressCallback(props.navigation, itemData.item);
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

  const noDataMessage =
    'No data from database available at the moment. Please try again later.';

  const errorMessage = 'An error occured. Please try again later.';

  const loadingOutput = (
    <View style={styles.loadingIndicatorAndMessageContainer}>
      <ActivityIndicator
        size={'large'}
        color={
          Platform.OS === 'android' ? Colors.tabNavigatorActiveTintColor : ''
        }
      />
    </View>
  );

  const noDataOrErrorOutput = (
    <View style={styles.loadingIndicatorAndMessageContainer}>
      <Text style={styles.messageText}>
        {dataLoadingStatus === DataLoadingStatuses.noData
          ? noDataMessage
          : errorMessage}
      </Text>
    </View>
  );

  const successOutput = (
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

  switch (dataLoadingStatus) {
    case DataLoadingStatuses.loading:
      return loadingOutput;
    case DataLoadingStatuses.success:
      return successOutput;
    default:
      return noDataOrErrorOutput;
  }
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