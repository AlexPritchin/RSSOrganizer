import React, { useCallback, useLayoutEffect } from 'react';
import { View, Alert, RefreshControl } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useQuery, useMutation } from 'react-query';

import { OrganizerScreensNames } from '../../../constants/ScreensNames';
import { OrganizerTaskStatuses } from '../../../constants/OrganizerConstants';
import { Colors } from '../../../constants/Colors';
import * as Messages from '../../../constants/MessageConstants';

import { OrganizerTask } from '../../../models/OrganizerTask';

import { selectSQLTasks, updateSQLTask, deleteSQLTask } from '../../../services/data/Organizer/OrganizerDBDataService';

import OrganizerListItem from '../../../components/Organizer/OrganizerListItem/OrganizerListItem';
import GeneralHeaderButtonComponent from '../../../components/Navigation/NavigationHeader/GeneralHeaderButtonComponent';
import ScreenMessageView from '../../../components/General/ScreenMessageView/ScreenMessageView';
import DeleteIcon from '../../../components/Icons/Organizer/OrganizerDeleteIcon';

import { OrganizerStackParamList } from '../../../navigation/OrganizerNavigator';

import styles from './OrganizerListScreenStyles';

type OrganizerListScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<OrganizerStackParamList, OrganizerScreensNames.OrganizerList>,
  DrawerNavigationProp<any>
>;

type Props = {
  navigation: OrganizerListScreenNavigationProp;
};

interface SwipeViewActionStatusChangeData {
  isActivated: boolean;
  value: number;
  key: string;
};

const OrganizerListScreen: React.FC<Props> = props => {
  const { isLoading, isError, data, refetch } = useQuery('selectOrganizerTasks', selectSQLTasks);
  const updateTaskMutation = useMutation(updateSQLTask);
  const deleteTaskMutation = useMutation(deleteSQLTask);

  const showErrorAlert = () => {
      Alert.alert(Messages.alertHeaders.dbError, Messages.alertMessages.error);
  };

  const forceTasksRefresh = () => refetch();

  const goToTaskCreatorScreen = useCallback(() => {
    props.navigation.push(OrganizerScreensNames.OrganizerTaskCreator, {
      refreshTasksCallback: forceTasksRefresh
    });
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={GeneralHeaderButtonComponent}>
          <Item title='' iconName='drawer' onPress={() => {props.navigation.openDrawer();}} />
        </HeaderButtons>
      ),
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
      const taskToChange = data?.find(task => task.id === rowData.key);
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
          <DeleteIcon color={Colors.deleteIconColor}/>
      </View>
    );
  };

  const reloadButtonPressCallback = () => {
    refetch();
  };

  const noDataOrErrorOutput = (
    <ScreenMessageView
      messageText={isError
                    ? Messages.screenMessages.error
                    : Messages.screenMessages.noDataOrganizer}
      onReloadButtonPress={reloadButtonPressCallback}
    />
  );

  return (
    <View style={styles.organizerListContainer}>
      <SwipeListView
        data={data}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl colors={[Colors.tabNavigatorActiveTintColor]} refreshing={isLoading} onRefresh={() => refetch()} />}
        ListEmptyComponent={isLoading ? null : noDataOrErrorOutput}
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
  
};

export default OrganizerListScreen;