import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';

import { openURL } from '../../../utils/UrlHelper';

import BlueButton from '../../../components/General/BlueButton/BlueButton';

import styles from './RSSDetailsScreenStyles';

const RSSDetailsScreen = props => {
  const noImageAvailableImageAssetLink = '../../../assets/no-image-available.png';

  const articleItem = props.navigation.getParam('articleItem');

  return (
    <View style={styles.articleContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
      >
        <Text style={styles.articleTitle}>{articleItem.title}</Text>
        <Image
          style={styles.articleImage}
          source={
            articleItem.imageLink === ''
              ? require(noImageAvailableImageAssetLink)
              : { uri: articleItem.imageLink }
          }
        />
        <Text style={styles.articleDescription}>{articleItem.description}</Text>
        <Text style={styles.articleCreator}>{articleItem.creator}</Text>
        <BlueButton
          style={styles.articleLinkButton}
          title='Open in browser'
          onButtonPress={() => openURL(articleItem.link)}
        />
      </ScrollView>
    </View>
  );
};

RSSDetailsScreen.navigationOptions = navigationData => {
  const articlePubDate = navigationData.navigation.getParam('articleItem')
    .publicationDate;

  return {
    headerTitle: articlePubDate,
  };
};

export default RSSDetailsScreen;
