import React, { useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import auth from '@react-native-firebase/auth';

import { UserProfileScreensNames } from '../../../constants/ScreensNames';

import GeneralHeaderButtonComponent from '../../../components/Navigation/NavigationHeader/GeneralHeaderButtonComponent';

import { UserProfileParamList } from '../../../navigation/UserProfileNavigator';

import styles from './UserProfileSettingsScreenStyles';

type UserProfileSettingsScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<UserProfileParamList, UserProfileScreensNames.UserProfileSettings>,
    DrawerNavigationProp<any>
>;

type Props = {
  navigation: UserProfileSettingsScreenNavigationProp;
};

const UserProfileSettingsScreen: React.FC<Props> = props => {
    useLayoutEffect(() => {
        props.navigation.setOptions({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={GeneralHeaderButtonComponent}>
              <Item title='' iconName='drawer' onPress={() => {props.navigation.openDrawer();}} />
            </HeaderButtons>
          ),
        });
      }, [props.navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.userEmailContainer}>
                <Text style={styles.userEmailTitleText}>{'E-mail:'}</Text>
                <Text style={styles.userEmailValueText}>{auth().currentUser?.email}</Text>
            </View>
        </View>
    );
};

export default UserProfileSettingsScreen;