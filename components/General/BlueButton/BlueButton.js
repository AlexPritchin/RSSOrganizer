import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './BlueButtonStyles';

const BlueButton = props => {
  return (
    <TouchableOpacity onPress={props.onButtonPress}>
        <View style={{...styles.buttonContainer, ...props.style}}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </View>
    </TouchableOpacity>
  );
};

export default BlueButton;