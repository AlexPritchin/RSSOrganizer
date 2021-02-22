import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';

import styles from './RSSListItemStyles';

const RSSListItem = props => {
    const { imageLink, publicationDate, title } = props.articleItem;

    return (
        <TouchableOpacity onPress={props.onListItemPress}>
          <View style={styles.rssListItemContainer}>
            <Image
              style={styles.rssListItemImage}
              source={{ uri: imageLink }}
            />
            <View style={styles.rssListItemTextContainer}>
              <Text style={styles.rssListItemDate} numberOfLines={1}>{publicationDate}</Text>
              <Text style={styles.rssListItemTitle} numberOfLines={2}>{title}</Text>
            </View>
          </View>
          </TouchableOpacity>
    );
};

export default RSSListItem;