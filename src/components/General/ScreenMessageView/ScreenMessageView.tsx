import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import BlueButton from '../BlueButton/BlueButton';

import styles from './ScreenMessageViewStyles';

const ScreenMessageView = props => {
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

ScreenMessageView.propTypes = {
  messageText: PropTypes.string,
  onReloadButtonPress: PropTypes.func
};

export default ScreenMessageView;