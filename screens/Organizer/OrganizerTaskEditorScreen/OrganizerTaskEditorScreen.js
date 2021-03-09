import React, { useRef, useCallback, useState, useEffect } from 'react';
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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSelector, useDispatch } from 'react-redux';

import { OrganizerTask } from '../../../models/OrganizerTask';

import {
  OrganizerEditorModes,
  OrganizerTaskStatuses,
  OrganizerDateTimePickerModes,
} from '../../../constants/OrganizerConstants';

import GeneralHeaderButtonComponent from '../../../components/NavigationHeader/GeneralHeaderButtonComponent';

import { addTask, editTask } from '../../../store/actions/OrganizerActions';

import styles from './OrganizerTaskEditorScreenStyles';

const OrganizerTaskEditorScreen = props => {
  const taskToEditId = props.navigation.getParam('taskToEditId');
  
  const editorMode = useRef(
    taskToEditId === undefined
      ? OrganizerEditorModes.add
      : OrganizerEditorModes.edit
  );

  const getTaskToAddOrEdit = useCallback(() => {
    if (editorMode.current === OrganizerEditorModes.add) {
      return new OrganizerTask('0', new Date(), '', '', OrganizerTaskStatuses.active);
    }
    const tasks = useSelector(state => state.organizerTasks.tasks);
    return tasks.find(task => task.id === taskToEditId);
  }, []);

  const [taskToAddOrEdit, setTaskToAddOrEdit] = useState(getTaskToAddOrEdit());
  const [dateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  const [dateTimePickerCurrentMode, setDateTimePickerCurrentMode] = useState(
    OrganizerDateTimePickerModes.date
  );
    
  const dateTimePickerInitialMinimumDate = useRef(taskToAddOrEdit.creationDate);

  const dispatch = useDispatch();

  const validateInputs = () => taskToAddOrEdit.title !== '' && taskToAddOrEdit.description !== '';

  const saveTask = useCallback(() => {
    if (!validateInputs()) {
      Alert.alert('Validation error', 'All fields must be filled');
      return;
    }
    if (editorMode.current === OrganizerEditorModes.add) {
      dispatch(addTask(taskToAddOrEdit));
    } else {
      dispatch(editTask(taskToAddOrEdit));
    }
    props.navigation.pop();
  }, [taskToAddOrEdit]);

  useEffect(() => {
    props.navigation.setParams({saveTaskCallback: saveTask});
  }, [saveTask]);

  const titleTextInputTextChangeHandler = newText => {
    setTaskToAddOrEdit(currentTask => {
      const newTask = OrganizerTask.copyFromInstance(currentTask);
      newTask.title = newText;
      return newTask;
    });
  };

  const descriptionTextInputTextChangeHandler = newText => {
    setTaskToAddOrEdit(currentTask => {
      const newTask = OrganizerTask.copyFromInstance(currentTask);
      newTask.description = newText;
      return newTask;
    });
  };

  const showDateTimePicker = () => setDateTimePickerVisible(true);
  const hideDateTimePicker = () => setDateTimePickerVisible(false);

  const setTaskDateHandler = newDate => {
    hideDateTimePicker();
    setTaskToAddOrEdit(currentTask => {
      const newTask = OrganizerTask.copyFromInstance(currentTask);
      newTask.creationDate = newDate;
      return newTask;
    });
    if (dateTimePickerCurrentMode === OrganizerDateTimePickerModes.date) {
      setDateTimePickerCurrentMode(OrganizerDateTimePickerModes.time);
      showDateTimePicker();
    } else {
      setDateTimePickerCurrentMode(OrganizerDateTimePickerModes.date);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.taskContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
        >
          <TouchableWithoutFeedback onPress={showDateTimePicker}>
            <View style={styles.taskDateContainer}>
              <Text>{taskToAddOrEdit.formattedCreationDate}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TextInput
            style={styles.taskTitleInput}
            selectionColor={'black'}
            placeholder="Task title"
            onChangeText={titleTextInputTextChangeHandler}
            value={taskToAddOrEdit.title}
          />
          <TextInput
            style={styles.taskDecriptionInput}
            selectionColor={'black'}
            placeholder="Task description"
            multiline={true}
            maxLength={500}
            onChangeText={descriptionTextInputTextChangeHandler}
            value={taskToAddOrEdit.description}
          />
          <DateTimePickerModal
            isVisible={dateTimePickerVisible}
            mode={
              dateTimePickerCurrentMode === OrganizerDateTimePickerModes.date
                ? 'date'
                : 'time'
            }
            minimumDate={dateTimePickerInitialMinimumDate.current}
            date={taskToAddOrEdit.creationDate}
            locale='en_GB'
            onConfirm={setTaskDateHandler}
            onCancel={hideDateTimePicker}
          />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

OrganizerTaskEditorScreen.navigationOptions = navData => {
  const taskToEditId = navData.navigation.getParam('taskToEditId');
  const saveTask = navData.navigation.getParam('saveTaskCallback');
  return {
    headerTitle: taskToEditId === undefined ? 'Add task' : 'Edit task',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={GeneralHeaderButtonComponent}>
        <Item title="Save" onPress={saveTask} />
      </HeaderButtons>
    ),
  };
};

export default OrganizerTaskEditorScreen;
