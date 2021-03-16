import React, { useCallback, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { OrganizerTask } from '../../../models/OrganizerTask';

import { OrganizerTaskStatuses } from '../../../constants/OrganizerConstants';

import { addSQLTask } from '../../../services/data/Organizer/OrganizerDBDataService';

import GeneralHeaderButtonComponent from '../../../components/Navigation/NavigationHeader/GeneralHeaderButtonComponent';
import OrganizerTextFiledsEditor from '../../../components/Organizer/OrganizerTextFiledsEditor/OrganizerTextFiledsEditor';

const OrganizerTaskCreatorScreen = props => {
  const [taskToAdd, setTaskToAdd] = useState(new OrganizerTask('0', 0, '', '', OrganizerTaskStatuses.active));
  
  const listScreenRefreshCallback = props.navigation.getParam('refreshTasksCallback');

  const sqlBoolResultCallback = result => {
    if (!result) {
      Alert.alert('Database error', 'An error occured. Please try again later.');
      return;
    }
    listScreenRefreshCallback(true);
    props.navigation.pop();
  };

  const saveTask = useCallback(() => {
    if (!validateInputs()) {
      Alert.alert('Validation error', 'All fields must be filled');
      return;
    }
    taskToAdd.creationDate = new Date().getTime();
    addSQLTask(taskToAdd, sqlBoolResultCallback);
  }, [taskToAdd]);
  
  useEffect(() => {
    props.navigation.setParams({saveTaskCallback: saveTask});
  }, [saveTask]);
  
  const validateInputs = () => taskToAdd.title !== '' && taskToAdd.description !== '';

  const updateTaskFromTextFieldsEditor = (editorData) => {
    setTaskToAdd(currentTask => {
      const newTask = Object.assign({}, currentTask);
      newTask.title = editorData.title;
      newTask.description = editorData.description;
      return newTask;
    });
  };

  return (
    <OrganizerTextFiledsEditor
      initialTaskTitle={taskToAdd.title}
      initialTaskDescription={taskToAdd.description}
      updateTaskCallback={updateTaskFromTextFieldsEditor}
    />
  );
};

OrganizerTaskCreatorScreen.navigationOptions = navData => {
  const saveTask = navData.navigation.getParam('saveTaskCallback');
  return {
    headerTitle: 'Add task',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={GeneralHeaderButtonComponent}>
        <Item title="Save" onPress={saveTask} />
      </HeaderButtons>
    ),
  };
};

export default OrganizerTaskCreatorScreen;
