import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { View, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { SwipeListView } from 'react-native-swipe-list-view';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { OrganizerScreensNames } from '../../../constants/ScreensNames';
import { OrganizerTaskStatuses } from '../../../constants/OrganizerConstants';
import { DataLoadingStatuses } from '../../../constants/DataLoadingStatuses';
import { Colors } from '../../../constants/Colors';
import * as Messages from '../../../constants/MessageConstants';

import { selectSQLTasks, updateSQLTask, deleteSQLTask } from '../../../services/data/Organizer/OrganizerDBDataService';

import OrganizerListItem from '../../../components/Organizer/OrganizerListItem/OrganizerListItem';
import GeneralHeaderButtonComponent from '../../../components/Navigation/NavigationHeader/GeneralHeaderButtonComponent';
import DataLoadingView from '../../../components/General/DataLoadingView/DataLoadingView';
import ScreenMessageView from '../../../components/General/ScreenMessageView/ScreenMessageView';

import styles from './OrganizerListScreenStyles';

const OrganizerListScreen = props => {
  const [dataLoadingStatus, setDataLoadingStatus] = useState(DataLoadingStatuses.loading);
  const [tasks, setTasks] = useState([]);

  const selectTasksFromDB = async () => {
    try {
      const tasks = await selectSQLTasks();
      if (tasks.length === 0) {
        setDataLoadingStatus(DataLoadingStatuses.noData);
        return;
      }
      setTasks(tasks);
      setDataLoadingStatus(DataLoadingStatuses.success);
    } catch (error) {
      setDataLoadingStatus(DataLoadingStatuses.error);
    }
  };

  useEffect(() => {
    if (dataLoadingStatus === DataLoadingStatuses.loading) {
      selectTasksFromDB();
    }
  }, [dataLoadingStatus]);

  const showErrorAlert = () => {
      Alert.alert(Messages.alertHeaders.dbError, Messages.alertMessages.error);
  };

  const forceTasksRefresh = () => setDataLoadingStatus(DataLoadingStatuses.loading);

  const goToTaskCreatorScreen = useCallback(() => {
    props.navigation.push(OrganizerScreensNames.OrganizerTaskCreator, {
      refreshTasksCallback: forceTasksRefresh
    });
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (<HeaderButtons HeaderButtonComponent={GeneralHeaderButtonComponent}>
        <Item iconName='add' onPress={goToTaskCreatorScreen} />
      </HeaderButtons>),
    });
  }, [props.navigation, goToTaskCreatorScreen]);

  const listItemPressCallback = (navigation, taskToPassToViewer) => {
    navigation.push(OrganizerScreensNames.OrganizerTaskViewerEditor, {
      taskToViewOrUpdate: taskToPassToViewer,
      refreshTasksCallback: forceTasksRefresh
    });
  };

  const markTaskCompleted = async rowData => {
    if (!rowData.isActivated) {
      return;
    }
    try {
      const taskToChange = tasks.find(task => task.id === rowData.key);
      taskToChange.status = OrganizerTaskStatuses.completed;
      await updateSQLTask(taskToChange);
      forceTasksRefresh();
    } catch (error) {
      showErrorAlert();
    }
  };

  const deleteTaskFromDB = async (taskId) => {
    try {
      await deleteSQLTask(taskId);
      forceTasksRefresh();
    } catch (error) {
      showErrorAlert();
    }
  } 

  const deleteTaskAction = async rowData => {
    if (!rowData.isActivated) {
      return;
    } 
    Alert.alert(Messages.alertHeaders.confirmAction, Messages.alertMessages.deleteTaskConfirm, [
      {
        text: Messages.alertButtons.cancel,
        style: 'cancel'
      },
      {
        text: Messages.alertButtons.ok,
        onPress: async () => {
          await deleteTaskFromDB(rowData.key);
        }
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
          <FontAwesomeIcon name='trash' color={Colors.deleteIconColor} size={25}/>
      </View>
    );
  };

  const reloadButtonPressCallback = () => {
    setDataLoadingStatus(DataLoadingStatuses.loading);
  };

  const loadingOutput = ( <DataLoadingView /> );

  const noDataOrErrorOutput = (
    <ScreenMessageView
      messageText={dataLoadingStatus === DataLoadingStatuses.noData
                    ? Messages.screenMessages.noDataOrganizer
                    : Messages.screenMessages.error}
      onReloadButtonPress={reloadButtonPressCallback}
    />
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

export default OrganizerListScreen;