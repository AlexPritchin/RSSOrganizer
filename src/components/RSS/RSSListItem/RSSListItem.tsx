import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';

import { RSSArticle } from '../../../models/RSSArticle';

import styles from './RSSListItemStyles';

interface Props {
  articleItem: RSSArticle;
  onListItemPress: Function;
};

const RSSListItem: React.FC<Props> = props => {
  const noImageAvailableImageAssetLink = '../../../assets/no-image-available.png';

  const { imageLink, publicationDate, title } = props.articleItem;

  return (
    <TouchableOpacity onPress={() => props.onListItemPress}>
      <View style={styles.rssListItemContainer}>
        <Image
          style={
            imageLink === ''
              ? styles.rssListItemImageLocal
              : styles.rssListItemImageWeb
          }
          source={
            imageLink === ''
              ? require(noImageAvailableImageAssetLink)
              : { uri: imageLink }
          }
        />
        <View style={styles.rssListItemTextContainer}>
          <Text style={styles.rssListItemDate} numberOfLines={1}>
            {publicationDate}
          </Text>
          <Text style={styles.rssListItemTitle} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RSSListItem;
