import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';

import { Colors } from '../../../constants/Colors';

import AddIcon from '../../Icons/Organizer/OrganizerAddIcon';
import HamburgerIcon from '../../Icons/Navigation/MainDrawerNavigator/DrawerHamburgerIcon';

import styles from './GeneralHeaderButtonComponentStyles';

const GeneralHeaderButtonComponent: React.FC<any> = props => {
  let neededIconComponent = props.iconName === 'drawer' ? HamburgerIcon : AddIcon;
  return (
    <HeaderButton
      {...props}
      IconComponent={neededIconComponent}
      color={Platform.OS === 'android' ? Colors.headerTextColor : Colors.backgroundHeaderColor}
      buttonStyle={props.title === '' ? {} : styles.buttonStyle}
    />
  );
};

export default GeneralHeaderButtonComponent;
