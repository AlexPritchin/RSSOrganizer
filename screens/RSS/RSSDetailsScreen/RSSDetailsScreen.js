import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';

import { openURL } from '../../../utils/UrlHelper';

import styles from './RSSDetailsScreenStyles';

const RSSDetailsScreen = props => {
  const articleItem = props.navigation.getParam('articleItem');

  return (
    <View style={styles.articleContainer}>
    <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={false}>
      <Text style={styles.articleTitle}>{articleItem.title}</Text>
      <Image style={styles.articleImage} source={{uri: articleItem.imageLink}} />
      <Text style={styles.articleDescription}>{articleItem.description}</Text>
      <Text style={styles.articleCreator}>{articleItem.creator}</Text>
      <TouchableOpacity onPress={() => openURL(articleItem.link)}>
        <View style={styles.articleLinkContainer}>
        <Text style={styles.articleLinkText}>Open in browser</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
};

RSSDetailsScreen.navigationOptions = navigationData => {
  const articlePubDate = navigationData.navigation.getParam('articleItem').publicationDate;

  return {
    headerTitle: articlePubDate
  };
};

export default RSSDetailsScreen;