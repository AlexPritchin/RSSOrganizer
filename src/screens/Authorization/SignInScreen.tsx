import React from 'react';
import { View, Text, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

import { alertHeaders } from '../../constants/MessageConstants';

import SignInForm, { UserCredentialsObject } from '../../components/Authorization/SignInForm/SignInForm';

import styles from './SignInScreenStyles';

type Props = {
  userSignedInCallback: () => void;
};

const SignInScreen: React.FC<Props> = props => {
  const trySignInUser = async (userCredentials: UserCredentialsObject) => {
    try {
      await auth().signInWithEmailAndPassword(userCredentials.email, userCredentials.password);
      props.userSignedInCallback();
    } catch (error) {
      let errorTypeClosingSquareBracketIndex = error.message.indexOf(']');
      let errorMessageCleaned = error.message.slice(errorTypeClosingSquareBracketIndex + 2);
      Alert.alert(alertHeaders.error, errorMessageCleaned);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{'RSSOrganizer'}</Text>
        </View>
      <SignInForm userCredentialsSubmitCallback={trySignInUser} />
    </View>
  );
};

export default SignInScreen;
