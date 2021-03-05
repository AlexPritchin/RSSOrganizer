import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import styles from './OrganizerListItemStyles';

const OrganizerListItem = props => {
  return (
    <TouchableOpacity onPress={props.onTaskItemPress}>
      <View style={styles.organizerListItemContainer}>
        <View style={styles.organizerListItemTextContainer}>
          <Text style={styles.organizerListItemDate} numberOfLines={1}>
            {props.taskItem.formattedDueDate}
          </Text>
          <Text style={styles.organizerListItemTitle} numberOfLines={2}>
            {props.taskItem.title}
          </Text>
        </View>
        <TouchableOpacity onPress={props.onTaskItemDelete}>
          <View style={styles.organizerListItemDeleteContainer}>
              <FontAwesome name='trash' color={'red'} size={25}/>
          </View>
      </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default OrganizerListItem;