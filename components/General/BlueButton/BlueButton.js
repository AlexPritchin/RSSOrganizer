import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

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

BlueButton.propTypes = {
  title: PropTypes.string,
  onButtonPress: PropTypes.func
};

export default BlueButton;