import React from 'react';
import { FlatList, View } from 'react-native';

import styles from './OrganizerListScreenStyles';

const OrganizerListScreen = props => {

  return (
    <View style={styles.organizerListContainer}>
      <FlatList
        data={rssArticlesList}
        renderItem={item => renderRSSListItem(item, props.navigation)}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default OrganizerListScreen;