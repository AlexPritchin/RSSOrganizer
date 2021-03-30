import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { OrganizerTask } from '../../../models/OrganizerTask';

import { OrganizerTaskStatuses } from '../../../constants/OrganizerConstants';
import { Colors } from '../../../constants/Colors';

import { formatDateToString } from '../../../utils/DateFormatter';

import styles from './OrganizerListItemStyles';

const OrganizerListItem = props => {
  const textDecorationLineToApply = props.taskItem.status === OrganizerTaskStatuses.completed ? 'line-through' : 'none';
  return (
    <TouchableHighlight activeOpacity={0.4} underlayColor={Colors.headerTextColor} onPress={props.onTaskItemPress}>
      <View style={styles.organizerListItemContainer}>
        <View style={styles.organizerListItemTextContainer}>
          <Text style={{...styles.organizerListItemDate, textDecorationLine: textDecorationLineToApply}} numberOfLines={1}>
            {formatDateToString(props.taskItem.creationDate)}
          </Text>
          <Text style={{...styles.organizerListItemTitle, textDecorationLine: textDecorationLineToApply}} numberOfLines={2}>
            {props.taskItem.title}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

OrganizerListItem.propTypes = {
  taskItem: PropTypes.instanceOf(OrganizerTask),
  onTaskItemPress: PropTypes.func
};

export default OrganizerListItem;