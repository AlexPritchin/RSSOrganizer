import React, { useCallback, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import { OrganizerTask } from '../../../models/OrganizerTask';

import { OrganizerTaskStatuses } from '../../../constants/OrganizerConstants';

import GeneralHeaderButtonComponent from '../../../components/NavigationHeader/GeneralHeaderButtonComponent';
import OrganizerTextFiledsEditor from '../../../components/Organizer/OrganizerTextFiledsEditor/OrganizerTextFiledsEditor';

import { addTask } from '../../../store/actions/OrganizerActions';

const OrganizerTaskCreatorScreen = props => {
  const [taskToAdd, setTaskToAdd] = useState(new OrganizerTask('0', new Date().getTime(), '', '', OrganizerTaskStatuses.active));

  const dispatch = useDispatch();
  
  const saveTask = useCallback(() => {
    if (!validateInputs()) {
      Alert.alert('Validation error', 'All fields must be filled');
      return;
    }
    dispatch(addTask(taskToAdd));
    props.navigation.pop();
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
