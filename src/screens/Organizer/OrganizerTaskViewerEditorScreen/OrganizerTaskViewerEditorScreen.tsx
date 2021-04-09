import React, { useState, useCallback, useLayoutEffect, useRef } from 'react';
import { View, Text, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useMutation } from 'react-query';

import { OrganizerTask } from '../../../models/OrganizerTask';

import { OrganizerViewerEditorModes } from '../../../constants/OrganizerConstants';
import { alertHeaders, alertMessages } from '../../../constants/MessageConstants';
import { OrganizerScreensNames } from '../../../constants/ScreensNames';

import { formatDateToString } from '../../../utils/DateFormatter';

import { updateSQLTask } from '../../../services/data/Organizer/OrganizerDBDataService';

import GeneralHeaderButtonComponent from '../../../components/Navigation/NavigationHeader/GeneralHeaderButtonComponent';
import OrganizerTextFieldsEditor, { TaskTextFieldsObject } from '../../../components/Organizer/OrganizerTextFieldsEditor/OrganizerTextFieldsEditor';

import { OrganizerStackParamList } from '../../../navigation/OrganizerNavigator';

import styles from './OrganizerTaskViewerEditorScreenStyles';

type OrganizerTaskViewerEditorScreenNavigationProp = StackNavigationProp<OrganizerStackParamList, OrganizerScreensNames.OrganizerTaskViewerEditor>;
type OrganizerTaskViewerEditorScreenRouteProp = RouteProp<OrganizerStackParamList, OrganizerScreensNames.OrganizerTaskViewerEditor>;

type Props = {
  navigation: OrganizerTaskViewerEditorScreenNavigationProp;
  route: OrganizerTaskViewerEditorScreenRouteProp;
};

const OrganizerTaskViewerEditorScreen: React.FC<Props> = props => {
  const taskToShowAndEdit = props.route.params.taskToViewOrUpdate;
  const listScreenRefreshCallback = props.route.params.refreshTasksCallback;
  
  const [screenMode, setScreenMode] = useState(OrganizerViewerEditorModes.view);
  const [taskItem, setTaskItem] = useState(taskToShowAndEdit);
  const taskFormValid = useRef(false);
  const taskFormSubmitFunction = useRef(new Function());

  const updateTaskMutation = useMutation(updateSQLTask);

  const toggleScreenModeAndSaveTaskFromHeader = useCallback(async () => {
    if (screenMode === OrganizerViewerEditorModes.view) {
      setScreenMode(OrganizerViewerEditorModes.edit);
      return;
    }
    if (taskFormValid.current) {
      taskFormSubmitFunction.current();
    }
  }, [screenMode, taskItem]);

  const saveTask = async (taskToSave: OrganizerTask) => {
    console.log(taskToSave);
    try {
      await updateTaskMutation.mutateAsync(taskToSave);
      listScreenRefreshCallback();
      setScreenMode(OrganizerViewerEditorModes.view);
    } catch (error) {
      Alert.alert(alertHeaders.dbError, alertMessages.error);
    }
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: screenMode === OrganizerViewerEditorModes.edit ? 'Edit task' : 'View task',
      headerRight: () => (<HeaderButtons HeaderButtonComponent={GeneralHeaderButtonComponent}>
        <Item title={screenMode === OrganizerViewerEditorModes.edit ? 'Save' : 'Edit'} onPress={toggleScreenModeAndSaveTaskFromHeader} />
      </HeaderButtons>),
    });
  }, [props.navigation, toggleScreenModeAndSaveTaskFromHeader]);
  
  const updateFormValidationStateAndSubmitCallback = (isFormValid: boolean, formSubmitFunction: Function) => {
    taskFormValid.current = isFormValid;
    taskFormSubmitFunction.current = formSubmitFunction;
  };

  const updateTaskFromTextFieldsEditor = (editorData: TaskTextFieldsObject) => {
    setTaskItem(currentTask => {
      const newTask = Object.assign({}, currentTask);
      newTask.title = editorData.title;
      newTask.description = editorData.description;
      saveTask(newTask);
      return newTask;
    });

  };

  if (screenMode === OrganizerViewerEditorModes.view) {
    return (
      <View style={styles.taskContainer}>
        <Text style={styles.taskCreationDate}>{formatDateToString(taskItem.creationDate)}</Text>
        <Text style={styles.taskTitle}>{taskItem.title}</Text>
        <Text style={styles.taskDescription}>{taskItem.description}</Text>
      </View>
    );
  };

  return (
    <OrganizerTextFieldsEditor
      initialTaskTitle={taskItem.title}
      initialTaskDescription={taskItem.description}
      updateFormValidationAndSubmitCallback={updateFormValidationStateAndSubmitCallback}
      updateTaskCallback={updateTaskFromTextFieldsEditor}
    />
  );

};

export default OrganizerTaskViewerEditorScreen;
