import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Alert, TouchableWithoutFeedback, ScrollView, TextInput, Keyboard } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import { OrganizerTask } from '../../../models/OrganizerTask';

import { OrganizerViewerEditorModes } from '../../../constants/OrganizerConstants';

import GeneralHeaderButtonComponent from '../../../components/NavigationHeader/GeneralHeaderButtonComponent';

import { editTask } from '../../../store/actions/OrganizerActions';

import styles from './OrganizerTaskViewerEditorScreenStyles';

const OrganizerTaskViewerEditorScreen = props => {
  const taskItemId = props.navigation.getParam('taskId');
  const tasks = useSelector(state => state.organizerTasks.tasks);
  const taskToShowAndEdit = tasks.find(task => task.id === taskItemId);
  
  const [screenMode, setScreenMode] = useState(OrganizerViewerEditorModes.view);
  const [taskItem, setTaskItem] = useState(taskToShowAndEdit);

  const dispatch = useDispatch();

  const toggleScreenModeAndSaveTask = useCallback(() => {
    if (screenMode === OrganizerViewerEditorModes.view) {
      setScreenMode(OrganizerViewerEditorModes.edit);
      return;
    }
    if (!validateInputs()) {
      Alert.alert('Validation error', 'All fields must be filled');
      return;
    }
    dispatch(editTask(taskItem));
    setScreenMode(OrganizerViewerEditorModes.view);
  }, [screenMode, taskItem]);

  useEffect(() => {
    props.navigation.setParams({
      currentScreenMode: screenMode,
      toggleScreenModeCallback: toggleScreenModeAndSaveTask
    });
  }, [toggleScreenModeAndSaveTask]);

  if (screenMode === OrganizerViewerEditorModes.view) {
    return (
      <View style={styles.taskContainer}>
        <Text style={styles.taskCreationDate}>{taskItem.formattedCreationDate}</Text>
        <Text style={styles.taskTitle}>{taskItem.title}</Text>
        <Text style={styles.taskDescription}>{taskItem.description}</Text>
      </View>
    );
  };

  const validateInputs = () => taskItem.title !== '' && taskItem.description !== '';
  
  const titleTextInputTextChangeHandler = newText => {
    setTaskItem(currentTask => {
      const newTask = OrganizerTask.copyFromInstance(currentTask);
      newTask.title = newText;
      return newTask;
    });
  };

  const descriptionTextInputTextChangeHandler = newText => {
    setTaskItem(currentTask => {
      const newTask = OrganizerTask.copyFromInstance(currentTask);
      newTask.description = newText;
      return newTask;
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.taskContainer2}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
        >
          <TextInput
            style={styles.taskTitleInput}
            selectionColor={'black'}
            placeholder="Task title"
            onChangeText={titleTextInputTextChangeHandler}
            value={taskItem.title}
          />
          <TextInput
            style={styles.taskDecriptionInput}
            selectionColor={'black'}
            placeholder="Task description"
            multiline={true}
            maxLength={500}
            onChangeText={descriptionTextInputTextChangeHandler}
            value={taskItem.description}
          />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
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
