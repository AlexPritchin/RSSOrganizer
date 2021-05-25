import React, { Fragment } from 'react';
import { TouchableWithoutFeedback, Keyboard, View, ScrollView, TextInput, Text } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';

import { Colors } from '../../../constants/Colors';

import BlueButton from '../../General/BlueButton/BlueButton';

import styles from './SignInFormStyles';

export type FormSubmitFunction = (e?: React.FormEvent<HTMLFormElement> | undefined) => void;

interface Props {
  userCredentialsSubmitCallback: (values: UserCredentialsObject) => void;
  // updateFormValidationAndSubmitCallback: (isValid: boolean, handleSubmit: FormSubmitFunction) => void;
};

export interface UserCredentialsObject {
  email: string;
  password: string;
};

const SignInForm: React.FC<Props> = props => {
  // const { initialTaskTitle,
  //         initialTaskDescription,
  //         updateTaskCallback,
  //         updateFormValidationAndSubmitCallback } = props;

  let userCredentialsValidationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
        >
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={userCredentialsValidationSchema}
            onSubmit={(values) => {
              props.userCredentialsSubmitCallback(values);
            }}
          >
            {({ values, touched, errors, isValid, setFieldTouched, handleChange, handleSubmit }) => {
              const showEmailError = touched.email && errors.email;
              const showPasswordError = touched.password && errors.password;
              return (
              <Fragment>
                <TextInput
                  style={[styles.emailInput, showEmailError ? {borderBottomColor: Colors.deleteIconColor} : null]}
                  selectionColor={Colors.textInputsSelectionColor}
                  placeholder="User email"
                  onChange={() => setFieldTouched('email')}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  autoCapitalize='none'
                  />
                {showEmailError
                    ? (<View style={styles.emailErrorTextContainer}>
                        <Text style={styles.emailErrorText}>{errors.email}</Text>
                      </View>)
                    : null
                }
                <TextInput
                  style={[styles.passwordInput, showPasswordError ? {borderBottomColor: Colors.deleteIconColor} : null]}
                  selectionColor={Colors.textInputsSelectionColor}
                  placeholder="User password"
                  onChange={() => setFieldTouched('password')}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  autoCapitalize='none'
                  secureTextEntry={true}
                  />
                {showPasswordError
                    ? (<View style={styles.passwordErrorTextContainer}>
                      <Text style={styles.passwordErrorText}>{errors.password}</Text>
                      </View>)
                    : null
                }
                <BlueButton
                  style={styles.submitButton}
                  title='Sign in'
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

export default SignInForm;