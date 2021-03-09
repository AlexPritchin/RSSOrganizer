import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';

import { OrganizerTaskStatuses } from '../../../constants/OrganizerConstants';

import styles from './OrganizerListItemStyles';

const OrganizerListItem = props => {
  const textDecorationLineToApply = props.taskItem.status === OrganizerTaskStatuses.completed ? 'line-through' : 'none';
  return (
    <TouchableHighlight activeOpacity={0.4} underlayColor='white' onPress={props.onTaskItemPress}>
      <View style={styles.organizerListItemContainer}>
        <View style={styles.organizerListItemTextContainer}>
          <Text style={{...styles.organizerListItemDate, textDecorationLine: textDecorationLineToApply}} numberOfLines={1}>
            {props.taskItem.formattedCreationDate}
          </Text>
          <Text style={{...styles.organizerListItemTitle, textDecorationLine: textDecorationLineToApply}} numberOfLines={2}>
            {props.taskItem.title}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default OrganizerListItem;