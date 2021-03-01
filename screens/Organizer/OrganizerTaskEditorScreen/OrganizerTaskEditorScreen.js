import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { format } from 'date-fns';

import { OrganizerTask } from '../../../models/OrganizerTask';

import { OrganizerEditorModes } from '../../../constants/OrganizerConstants';
import { dateFormatMask } from '../../../constants/DateConstants';

import GeneralHeaderButtonComponent from '../../../components/NavigationHeader/GeneralHeaderButtonComponent';

import styles from './OrganizerTaskEditorScreenStyles';

const OrganizerTaskEditorScreen = props => {
  const taskToEdit = props.navigation.getParam('taskToEdit');
  const editorMode = useRef(taskToEdit === undefined ? OrganizerEditorModes.add : OrganizerEditorModes.edit);

  const [taskDate, setTaskDate] = useState(editorMode.current === OrganizerEditorModes.add ? new Date() : taskToEdit.dueDate);
  const [taskTitle, setTaskTitle] = useState(editorMode.current === OrganizerEditorModes.add ? '' : taskToEdit.title);
  const [taskDescription, setTaskDescription] = useState(editorMode.current === OrganizerEditorModes.add ? '' : taskToEdit.description);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.taskContainer}>
      {/* <TextInput editable={false} onPress={() => alert('test')} value={taskDate} /> */}
      <TextInput style={styles.taskTitleInput} selectionColor={'black'} placeholder='Task title' onChangeText={(newText) => setTaskTitle(newText)} value={taskTitle} />
      <TextInput style={styles.taskDecriptionInput} selectionColor={'black'} placeholder='Task description' multiline={true} maxLength={500} numberOfLines={20} onChangeText={(newText) => setTaskDescription(newText)} value={taskDescription} />
    </KeyboardAvoidingView>
  );
};

OrganizerTaskEditorScreen.navigationOptions = navData => {
  const taskToEdit = navData.navigation.getParam('taskToEdit');
  return {
    headerTitle: taskToEdit === undefined ? 'Add task' : 'Edit task',
    headerRight: (<HeaderButtons HeaderButtonComponent={GeneralHeaderButtonComponent}>
      <Item title='Save' onPress={() => {}} />
    </HeaderButtons>)
  };
};

export default OrganizerTaskEditorScreen;