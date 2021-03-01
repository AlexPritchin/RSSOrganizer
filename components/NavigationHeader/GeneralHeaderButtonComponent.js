import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/Colors';

const GeneralHeaderButtonComponent = props => {
  return <HeaderButton {...props} IconComponent={Ionicons} iconSize={29} color={Colors.headerTextColor} />;
};

export default GeneralHeaderButtonComponent;