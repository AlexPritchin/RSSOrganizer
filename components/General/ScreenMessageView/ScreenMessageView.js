import React from 'react';
import { View, Text } from 'react-native';

import styles from './ScreenMessageViewStyles';

const ScreenMessageView = props => {
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>
        {props.messageText}
      </Text>
    </View>
  );
};

export default ScreenMessageView;