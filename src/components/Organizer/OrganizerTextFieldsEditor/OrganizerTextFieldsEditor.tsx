import React, { Fragment } from 'react';
import { TouchableWithoutFeedback, Keyboard, View, ScrollView, TextInput, Text } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';

import { Colors } from '../../../constants/Colors';

import BlueButton from '../../General/BlueButton/BlueButton';

import styles from './OrganizerTextFieldsEditorStyles';

interface Props {
  initialTaskTitle: string;
  initialTaskDescription: string;
  updateTaskCallback: Function;
  updateFormValidationAndSubmitCallback: Function;
};

export interface TaskTextFieldsObject {
  title: string;
  description: string;
};

const OrganizerTextFieldsEditor: React.FC<Props> = props => {
  const { initialTaskTitle,
          initialTaskDescription,
          updateTaskCallback,
          updateFormValidationAndSubmitCallback } = props;

  let taskValidationSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required().max(500)
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
        >
          <Formik
            initialValues={{ title: initialTaskTitle, description: initialTaskDescription }}
            validationSchema={taskValidationSchema}
            onSubmit={(values) => {
              updateTaskCallback(values);
            }}
          >
            {({ values, touched, errors, isValid, setFieldTouched, handleChange, handleSubmit }) => {
              updateFormValidationAndSubmitCallback(isValid, handleSubmit);
              const showTitleError = touched.title && errors.title;
              const showDescriptionError = touched.description && errors.description;
              return (
              <Fragment>
                <TextInput
                  style={[styles.titleInput, showTitleError ? {borderBottomColor: Colors.deleteIconColor} : null]}
                  selectionColor={Colors.textInputsSelectionColor}
                  placeholder="Task title"
                  onChange={() => setFieldTouched('title')}
                  onChangeText={handleChange('title')}
                  value={values.title}
                  />
                {showTitleError
                    ? <Text style={styles.titleErrorText}>{errors.title}</Text>
                    : null
                }
                <TextInput
                  style={[styles.decriptionInput, showDescriptionError ? {borderColor: Colors.deleteIconColor} : null]}
                  selectionColor={Colors.textInputsSelectionColor}
                  placeholder="Task description"
                  multiline={true}
                  onChange={() => setFieldTouched('description')}
                  onChangeText={handleChange('description')}
                  value={values.description}
                  />
                {showDescriptionError
                    ? <Text style={styles.decriptionErrorText}>{errors.description}</Text>
                    : null
                }
                <BlueButton
                  style={styles.submitButton}
                  title='Save'
                  disabled={!isValid}
                  onButtonPress={handleSubmit}
                />
              </Fragment>
            );
            }}
          </Formik>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OrganizerTextFieldsEditor;