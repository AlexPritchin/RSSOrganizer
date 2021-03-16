import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../../constants/Colors';

import styles from './GeneralHeaderButtonComponentStyles';

const GeneralHeaderButtonComponent = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={27}
      color={Platform.OS === 'android' ? Colors.headerTextColor : Colors.backgroundHeaderColor}
      buttonStyle={props.title === undefined ? {} : styles.buttonStyle}
    />
  );
};

export default GeneralHeaderButtonComponent;
