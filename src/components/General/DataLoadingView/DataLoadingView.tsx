import React from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';

import { Colors } from '../../../constants/Colors';

import styles from './DataLoadingViewStyles';

const DataLoadingView: React.FC<any> = props => {
  return (
    <View style={styles.loadingIndicatorContainer}>
      <ActivityIndicator
        size={'large'}
        color={
          Platform.OS === 'android'
            ? Colors.tabNavigatorActiveTintColor
            : Colors.textInputsSelectionColor
        }
      />
    </View>
  );
};

export default DataLoadingView;
