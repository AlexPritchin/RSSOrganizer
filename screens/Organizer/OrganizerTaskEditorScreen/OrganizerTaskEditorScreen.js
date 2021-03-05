import React, { useRef, useState } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { format } from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { OrganizerTask } from '../../../models/OrganizerTask';

import {
  OrganizerEditorModes,
  OrganizerDatePickerModes,
} from '../../../constants/OrganizerConstants';
import { dateFormatMask } from '../../../constants/DateConstants';

import GeneralHeaderButtonComponent from '../../../components/NavigationHeader/GeneralHeaderButtonComponent';

import styles from './OrganizerTaskEditorScreenStyles';

const OrganizerTaskEditorScreen = props => {
  const taskToEdit = props.navigation.getParam('taskToEdit');
  const editorMode = useRef(
    taskToEdit === undefined
      ? OrganizerEditorModes.add
      : OrganizerEditorModes.edit
  );

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [datePickerCurrentMode, setDatePickerCurrentMode] = useState(
    OrganizerDatePickerModes.date
  );
  const [taskDate, setTaskDate] = useState(
    editorMode.current === OrganizerEditorModes.add
      ? new Date()
      : taskToEdit.dueDate
  );
  const [taskTitle, setTaskTitle] = useState(
    editorMode.current === OrganizerEditorModes.add ? '' : taskToEdit.title
  );
  const [taskDescription, setTaskDescription] = useState(
    editorMode.current === OrganizerEditorModes.add
      ? ''
      : taskToEdit.description
  );

  const formattedDateString = format(taskDate, dateFormatMask);

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);

  const setTaskDateHandler = newDate => {
    hideDatePicker();
    setTaskDate(newDate);
    if (datePickerCurrentMode === OrganizerDatePickerModes.date) {
      setDatePickerCurrentMode(OrganizerDatePickerModes.time);
      showDatePicker();
    } else {
      setDatePickerCurrentMode(OrganizerDatePickerModes.date);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.taskContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
        >
          <TouchableWithoutFeedback onPress={showDatePicker}>
            <View style={styles.taskDateContainer}>
              <Text>{formattedDateString}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TextInput
            style={styles.taskTitleInput}
            selectionColor={'black'}
            placeholder="Task title"
            onChangeText={newText => setTaskTitle(newText)}
            value={taskTitle}
          />
          <TextInput
            style={styles.taskDecriptionInput}
            selectionColor={'black'}
            placeholder="Task description"
            multiline={true}
            maxLength={400}
            numberOfLines={15}
            onChangeText={newText => setTaskDescription(newText)}
            value={taskDescription}
          />
          <DateTimePickerModal
            isVisible={datePickerVisible}
            mode={
              datePickerCurrentMode === OrganizerDatePickerModes.date
                ? 'date'
                : 'time'
            }
            date={taskDate}
            onConfirm={setTaskDateHandler}
            onCancel={hideDatePicker}
          />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

OrganizerTaskEditorScreen.navigationOptions = navData => {
  const taskToEdit = navData.navigation.getParam('taskToEdit');
  return {
    headerTitle: taskToEdit === undefined ? 'Add task' : 'Edit task',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={GeneralHeaderButtonComponent}>
        <Item title="Save" onPress={() => {}} />
      </HeaderButtons>
    ),
  };
};

export default OrganizerTaskEditorScreen;
