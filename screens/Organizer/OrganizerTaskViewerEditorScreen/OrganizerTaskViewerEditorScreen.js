import React, { useState, useCallback, useLayoutEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { OrganizerViewerEditorModes } from '../../../constants/OrganizerConstants';
import { alertHeaders, alertMessages } from '../../../constants/MessageConstants';

import { formatDateToString } from '../../../utils/DateFormatter';

import { updateSQLTask } from '../../../services/data/Organizer/OrganizerDBDataService';

import GeneralHeaderButtonComponent from '../../../components/Navigation/NavigationHeader/GeneralHeaderButtonComponent';
import OrganizerTextFiledsEditor from '../../../components/Organizer/OrganizerTextFiledsEditor/OrganizerTextFiledsEditor';

import styles from './OrganizerTaskViewerEditorScreenStyles';

const OrganizerTaskViewerEditorScreen = props => {
  const taskToShowAndEdit = props.route.params.taskToViewOrUpdate;
  const listScreenRefreshCallback = props.route.params.refreshTasksCallback;
  
  const [screenMode, setScreenMode] = useState(OrganizerViewerEditorModes.view);
  const [taskItem, setTaskItem] = useState(taskToShowAndEdit);

  const sqlBoolResultCallback = result => {
    if (!result) {
      Alert.alert(alertHeaders.dbError, alertMessages.error);
      return;
    }
    listScreenRefreshCallback(true);
    setScreenMode(OrganizerViewerEditorModes.view);
  };

  const toggleScreenModeAndSaveTask = useCallback(() => {
    if (screenMode === OrganizerViewerEditorModes.view) {
      setScreenMode(OrganizerViewerEditorModes.edit);
      return;
    }
    if (!validateInputs()) {
      Alert.alert(alertHeaders.validationError, alertMessages.fieldsNotEmpty);
      return;
    }
    updateSQLTask(taskItem, sqlBoolResultCallback);
  }, [screenMode, taskItem]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: screenMode === OrganizerViewerEditorModes.edit ? 'Edit task' : 'View task',
      headerRight: () => (<HeaderButtons HeaderButtonComponent={GeneralHeaderButtonComponent}>
        <Item title={screenMode === OrganizerViewerEditorModes.edit ? 'Save' : 'Edit'} onPress={toggleScreenModeAndSaveTask} />
      </HeaderButtons>),
    });
  }, [props.navigation, toggleScreenModeAndSaveTask]);

  const validateInputs = () => taskItem.title !== '' && taskItem.description !== '';
  
  const updateTaskFromTextFieldsEditor = (editorData) => {
    setTaskItem(currentTask => {
      const newTask = Object.assign({}, currentTask);
      newTask.title = editorData.title;
      newTask.description = editorData.description;
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
    <OrganizerTextFiledsEditor
      initialTaskTitle={taskItem.title}
      initialTaskDescription={taskItem.description}
      updateTaskCallback={updateTaskFromTextFieldsEditor}
    />
  );

};

export default OrganizerTaskViewerEditorScreen;
