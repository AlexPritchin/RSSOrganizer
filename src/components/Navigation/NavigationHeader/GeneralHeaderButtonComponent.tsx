import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import { Colors } from '../../../constants/Colors';

import styles from './GeneralHeaderButtonComponentStyles';

const GeneralHeaderButtonComponent: React.FC<any> = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={IoniconsIcon}
      iconSize={27}
      color={Platform.OS === 'android' ? Colors.headerTextColor : Colors.backgroundHeaderColor}
      buttonStyle={props.title === '' ? {} : styles.buttonStyle}
    />
  );
};

export default GeneralHeaderButtonComponent;
