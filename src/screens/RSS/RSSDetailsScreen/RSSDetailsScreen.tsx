import React, { useLayoutEffect } from 'react';
import { ScrollView, View, Text, Image, Alert } from 'react-native';

import { alertHeaders, alertMessages } from '../../../constants/MessageConstants';

import { openURL } from '../../../utils/UrlHelper';

import BlueButton from '../../../components/General/BlueButton/BlueButton';

import styles from './RSSDetailsScreenStyles';

const RSSDetailsScreen = props => {
  const noImageAvailableImageAssetLink = '../../../assets/no-image-available.png';

  const articleItem = props.route.params.articleItem;

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: articleItem.publicationDate,
    });
  }, [props.navigation]);

  const openUrlCallback = async () => {
    const isUrlOpened = await openURL(articleItem.link);
    if (!isUrlOpened) {
      Alert.alert(alertHeaders.error, alertMessages.error);
      return;
    }
  };

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
          onButtonPress={openUrlCallback}
        />
      </ScrollView>
    </View>
  );
};

export default RSSDetailsScreen;
