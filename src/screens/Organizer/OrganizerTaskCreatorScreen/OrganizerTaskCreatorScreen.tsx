import React, { useCallback, useState, useLayoutEffect } from 'react';
import { Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { OrganizerTask } from '../../../models/OrganizerTask';

import { OrganizerTaskStatuses } from '../../../constants/OrganizerConstants';
import { alertHeaders, alertMessages } from '../../../constants/MessageConstants';

import { addSQLTask } from '../../../services/data/Organizer/OrganizerDBDataService';

import GeneralHeaderButtonComponent from '../../../components/Navigation/NavigationHeader/GeneralHeaderButtonComponent';
import OrganizerTextFiledsEditor from '../../../components/Organizer/OrganizerTextFiledsEditor/OrganizerTextFiledsEditor';

const OrganizerTaskCreatorScreen = props => {
  const [taskToAdd, setTaskToAdd] = useState(new OrganizerTask('0', 0, '', '', OrganizerTaskStatuses.active));
  
  const listScreenRefreshCallback = props.route.params.refreshTasksCallback;

  const saveTask = useCallback(async () => {
    if (!validateInputs()) {
      Alert.alert(alertHeaders.validationError, alertMessages.fieldsNotEmpty);
      return;
    }
    try {
      taskToAdd.creationDate = new Date().getTime();
      await addSQLTask(taskToAdd);
      listScreenRefreshCallback();
      props.navigation.pop();
    } catch (error) {
      Alert.alert(alertHeaders.dbError, alertMessages.error);
    }
  }, [taskToAdd]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={GeneralHeaderButtonComponent}>
          <Item title="Save" onPress={saveTask} />
        </HeaderButtons>
      ),
    });
  }, [props.navigation, saveTask]);
  
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

export default OrganizerTaskCreatorScreen;
