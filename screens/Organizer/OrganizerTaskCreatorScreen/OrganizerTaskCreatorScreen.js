import React, { useCallback, useState, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import { OrganizerTask } from '../../../models/OrganizerTask';

import { OrganizerTaskStatuses } from '../../../constants/OrganizerConstants';

import GeneralHeaderButtonComponent from '../../../components/NavigationHeader/GeneralHeaderButtonComponent';

import { addTask } from '../../../store/actions/OrganizerActions';

import styles from './OrganizerTaskCreatorScreenStyles';

const OrganizerTaskCreatorScreen = props => {
  const [taskToAdd, setTaskToAdd] = useState(new OrganizerTask('0', new Date(), '', '', OrganizerTaskStatuses.active));

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

  const titleTextInputTextChangeHandler = newText => {
    setTaskToAdd(currentTask => {
      const newTask = OrganizerTask.copyFromInstance(currentTask);
      newTask.title = newText;
      return newTask;
    });
  };

  const descriptionTextInputTextChangeHandler = newText => {
    setTaskToAdd(currentTask => {
      const newTask = OrganizerTask.copyFromInstance(currentTask);
      newTask.description = newText;
      return newTask;
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.taskContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
        >
          <TextInput
            style={styles.taskTitleInput}
            selectionColor={'black'}
            placeholder="Task title"
            onChangeText={titleTextInputTextChangeHandler}
            value={taskToAdd.title}
          />
          <TextInput
            style={styles.taskDecriptionInput}
            selectionColor={'black'}
            placeholder="Task description"
            multiline={true}
            maxLength={500}
            onChangeText={descriptionTextInputTextChangeHandler}
            value={taskToAdd.description}
          />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
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
