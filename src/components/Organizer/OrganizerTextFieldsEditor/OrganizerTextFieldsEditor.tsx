import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, View, ScrollView, TextInput } from 'react-native';

import { Colors } from '../../../constants/Colors';

import styles from './OrganizerTextFieldsEditorStyles';

interface Props {
  initialTaskTitle: string;
  initialTaskDescription: string;
  updateTaskCallback: Function;
};

export interface TaskTextFieldsObject {
  title: string;
  description: string;
};

const OrganizerTextFieldsEditor: React.FC<Props> = props => {
  const { initialTaskTitle, initialTaskDescription, updateTaskCallback } = props;

  const [taskTitle, setTaskTitle] = useState(initialTaskTitle);
  const [taskDescription, setTaskDescription] = useState(initialTaskDescription);

  const titleTextInputTextChangeHandler = (newText: string) => {
    setTaskTitle(newText);
    updateTaskCallback({
        title: newText,
        description: taskDescription
    });
  };

  const descriptionTextInputTextChangeHandler = (newText: string) => {
    setTaskDescription(newText);
    updateTaskCallback({
        title: taskTitle,
        description: newText
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
        >
          <TextInput
            style={styles.titleInput}
            selectionColor={Colors.textInputsSelectionColor}
            placeholder="Task title"
            onChangeText={titleTextInputTextChangeHandler}
            value={taskTitle}
          />
          <TextInput
            style={styles.decriptionInput}
            selectionColor={Colors.textInputsSelectionColor}
            placeholder="Task description"
            multiline={true}
            maxLength={500}
            onChangeText={descriptionTextInputTextChangeHandler}
            value={taskDescription}
          />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OrganizerTextFieldsEditor;