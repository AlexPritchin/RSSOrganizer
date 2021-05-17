import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';

import { Colors } from '../../../constants/Colors';

import AddIcon from '../../Icons/Organizer/OrganizerAddIcon';

import styles from './GeneralHeaderButtonComponentStyles';

const GeneralHeaderButtonComponent: React.FC<any> = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={AddIcon}
      color={Platform.OS === 'android' ? Colors.headerTextColor : Colors.backgroundHeaderColor}
      buttonStyle={props.title === '' ? {} : styles.buttonStyle}
    />
  );
};

export default GeneralHeaderButtonComponent;
