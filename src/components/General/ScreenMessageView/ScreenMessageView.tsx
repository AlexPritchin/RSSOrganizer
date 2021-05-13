import React from 'react';
import { View, Text } from 'react-native';

import BlueButton from '../BlueButton/BlueButton';

import styles from './ScreenMessageViewStyles';

interface Props {
  messageText: string;
  onReloadButtonPress: () => void;
};

const ScreenMessageView: React.FC<Props> = props => {
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>
        {props.messageText}
      </Text>
      <BlueButton
        style={styles.reloadButton}
        title='Reload'
        onButtonPress={props.onReloadButtonPress}
      />
    </View>
  );
};

export default ScreenMessageView;