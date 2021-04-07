import React, { useCallback, useLayoutEffect } from 'react';
import { View, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { SwipeListView } from 'react-native-swipe-list-view';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { useQuery, useMutation } from 'react-query';

import { OrganizerScreensNames } from '../../../constants/ScreensNames';
import { OrganizerTaskStatuses } from '../../../constants/OrganizerConstants';
import { Colors } from '../../../constants/Colors';
import * as Messages from '../../../constants/MessageConstants';

import { OrganizerTask } from '../../../models/OrganizerTask';

import { selectSQLTasks, updateSQLTask, deleteSQLTask } from '../../../services/data/Organizer/OrganizerDBDataService';

import OrganizerListItem from '../../../components/Organizer/OrganizerListItem/OrganizerListItem';
import GeneralHeaderButtonComponent from '../../../components/Navigation/NavigationHeader/GeneralHeaderButtonComponent';
import DataLoadingView from '../../../components/General/DataLoadingView/DataLoadingView';
import ScreenMessageView from '../../../components/General/ScreenMessageView/ScreenMessageView';

import { OrganizerStackParamList } from '../../../navigation/OrganizerNavigator';

import styles from './OrganizerListScreenStyles';

type OrganizerListScreenNavigationProp = StackNavigationProp<OrganizerStackParamList, OrganizerScreensNames.OrganizerList>;

type Props = {
  navigation: OrganizerListScreenNavigationProp;
};

interface SwipeViewActionStatusChangeData {
  isActivated: boolean;
  value: number;
  key: string;
};

const OrganizerListScreen: React.FC<Props> = props => {
  const queryResult = useQuery('selectOrganizerTasks', selectSQLTasks);
  const updateTaskMutation = useMutation(updateSQLTask);
  const deleteTaskMutation = useMutation(deleteSQLTask);

  const showErrorAlert = () => {
      Alert.alert(Messages.alertHeaders.dbError, Messages.alertMessages.error);
  };

  const forceTasksRefresh = () => queryResult.refetch();

  const goToTaskCreatorScreen = useCallback(() => {
    props.navigation.push(OrganizerScreensNames.OrganizerTaskCreator, {
      refreshTasksCallback: forceTasksRefresh
    });
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (<HeaderButtons HeaderButtonComponent={GeneralHeaderButtonComponent}>
        <Item title='' iconName='add' onPress={goToTaskCreatorScreen} />
      </HeaderButtons>),
    });
  }, [props.navigation, goToTaskCreatorScreen]);

  const listItemPressCallback = (navigation: OrganizerListScreenNavigationProp, taskToPassToViewer: OrganizerTask) => {
    navigation.push(OrganizerScreensNames.OrganizerTaskViewerEditor, {
      taskToViewOrUpdate: taskToPassToViewer,
      refreshTasksCallback: forceTasksRefresh
    });
  };

  const markTaskCompleted = async (rowData: SwipeViewActionStatusChangeData) => {
    if (!rowData.isActivated) {
      return;
    }
    try {
      const taskToChange = queryResult.data?.find(task => task.id === rowData.key);
      if (taskToChange) {
        taskToChange.status = OrganizerTaskStatuses.completed;
        await updateTaskMutation.mutateAsync(taskToChange);
        forceTasksRefresh();
      }
    } catch (error) {
      showErrorAlert();
    }
  };

  const deleteTaskFromDB = async (taskId: string) => {
    try {
      await deleteTaskMutation.mutateAsync(taskId);
      forceTasksRefresh();
    } catch (error) {
      showErrorAlert();
    }
  };

  const deleteTaskAction = async (rowData: SwipeViewActionStatusChangeData) => {
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

  const renderOrganizerTaskItem = (item: OrganizerTask) => {
    return (
      <OrganizerListItem
        taskItem={item}
        onTaskItemPress={() => {
          listItemPressCallback(props.navigation, item);
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
    queryResult.refetch();
  };

  const loadingOutput = ( <DataLoadingView /> );

  const noDataOrErrorOutput = (
    <ScreenMessageView
      messageText={queryResult.isError
                    ? Messages.screenMessages.error
                    : Messages.screenMessages.noDataOrganizer}
      onReloadButtonPress={reloadButtonPressCallback}
    />
  );

  const successOutput = (
    <View style={styles.organizerListContainer}>
      <SwipeListView
        data={queryResult.data}
        keyExtractor={item => item.id}
        renderItem={itemData => renderOrganizerTaskItem(itemData.item)}
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

  if (queryResult.isLoading) {
    return loadingOutput;
  }
  if (queryResult.isSuccess) {
    return successOutput;
  }
  return noDataOrErrorOutput;
  
};

export default OrganizerListScreen;