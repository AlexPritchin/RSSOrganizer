import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, View, ScrollView, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import { Colors } from '../../../constants/Colors';

import styles from './OrganizerTextFiledsEditorStyles';

const OrganizerTextFiledsEditor = props => {
  const { initialTaskTitle, initialTaskDescription, updateTaskCallback } = props;

  const [taskTitle, setTaskTitle] = useState(initialTaskTitle);
  const [taskDescription, setTaskDescription] = useState(initialTaskDescription);

  const titleTextInputTextChangeHandler = newText => {
    setTaskTitle(newText);
    updateTaskCallback({
        title: newText,
        description: taskDescription
    });
  };

  const descriptionTextInputTextChangeHandler = newText => {
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

OrganizerTextFiledsEditor.propTypes = {
  initialTaskTitle: PropTypes.string,
  initialTaskDescription: PropTypes.string,
  updateTaskCallback: PropTypes.func
};

export default OrganizerTextFiledsEditor;