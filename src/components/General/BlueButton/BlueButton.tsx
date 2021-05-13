import React from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

import styles from './BlueButtonStyles';

interface Props {
  style: StyleProp<ViewStyle>;
  title: string;
  disabled?: boolean | null;
  onButtonPress: () => void;
};

const BlueButton: React.FC<Props> = props => {
  return (
    <TouchableOpacity disabled={props.disabled} onPress={() => {
      props.onButtonPress();
    }}>
        <View style={[styles.buttonContainer, props.style]}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </View>
    </TouchableOpacity>
  );
};

export default BlueButton;