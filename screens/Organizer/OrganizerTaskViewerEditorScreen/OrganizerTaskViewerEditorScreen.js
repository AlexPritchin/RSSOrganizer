import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { OrganizerViewerEditorModes } from '../../../constants/OrganizerConstants';

import { formatDateToString } from '../../../utils/DateFormatter';

import { updateSQLTask } from '../../../services/data/Organizer/OrganizerDBDataService';

import GeneralHeaderButtonComponent from '../../../components/NavigationHeader/GeneralHeaderButtonComponent';
import OrganizerTextFiledsEditor from '../../../components/Organizer/OrganizerTextFiledsEditor/OrganizerTextFiledsEditor';

import styles from './OrganizerTaskViewerEditorScreenStyles';

const OrganizerTaskViewerEditorScreen = props => {
  const taskToShowAndEdit = props.navigation.getParam('taskToViewOrUpdate');
  const listScreenRefreshCallback = props.navigation.getParam('refreshTasksCallback');
  
  const [screenMode, setScreenMode] = useState(OrganizerViewerEditorModes.view);
  const [taskItem, setTaskItem] = useState(taskToShowAndEdit);

  const sqlBoolResultCallback = result => {
    if (!result) {
      Alert.alert('Database error', 'An error occured. Please try again later.');
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
      Alert.alert('Validation error', 'All fields must be filled');
      return;
    }
    updateSQLTask(taskItem, sqlBoolResultCallback);
  }, [screenMode, taskItem]);

  useEffect(() => {
    props.navigation.setParams({
      currentScreenMode: screenMode,
      toggleScreenModeCallback: toggleScreenModeAndSaveTask
    });
  }, [toggleScreenModeAndSaveTask]);

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

OrganizerTaskViewerEditorScreen.navigationOptions = navData => {
  const screenMode = navData.navigation.getParam('currentScreenMode');
  const toggleScreenModeCallback = navData.navigation.getParam('toggleScreenModeCallback');
  return {
    headerTitle: screenMode === OrganizerViewerEditorModes.edit ? 'Edit task' : 'View task',
    headerRight: (<HeaderButtons HeaderButtonComponent={GeneralHeaderButtonComponent}>
      <Item title={screenMode === OrganizerViewerEditorModes.edit ? 'Save' : 'Edit'} onPress={toggleScreenModeCallback} />
    </HeaderButtons>)
  };
};

export default OrganizerTaskViewerEditorScreen;
