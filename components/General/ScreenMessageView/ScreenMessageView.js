import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './ScreenMessageViewStyles';

const ScreenMessageView = props => {
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>
        {props.messageText}
      </Text>
      <TouchableOpacity onPress={props.onReloadButtonPress}>
          <View style={styles.reloadButtonContainer}>
              <Text style={styles.reloadButtonText}>{'Reload'}</Text>
          </View>
      </TouchableOpacity>
    </View>
  );
};

export default ScreenMessageView;