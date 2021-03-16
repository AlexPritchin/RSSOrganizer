import React from 'react';
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
      color={Colors.headerTextColor}
      buttonStyle={props.title === undefined ? {} : styles.buttonStyle}
    />
  );
};

export default GeneralHeaderButtonComponent;
