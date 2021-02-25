import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  Text,
  Platform,
} from 'react-native';

import { RSSScreensNames } from '../../../constants/ScreensNames';
import { DataLoadingStatuses } from '../../../constants/DataLoadingStatuses';
import { Colors } from '../../../constants/Colors';

import { getRSSArticles } from '../../../services/data/RSSDataService';

import RSSListItem from '../../../components/RSS/RSSListItem/RSSListItem';

import styles from './RSSListScreenStyles';

const RSSListScreen = props => {
  const [rssArticlesList, setRssArticlesList] = useState([]);
  const [dataLoadingStatus, setDataLoadingStatus] = useState(
    DataLoadingStatuses.loading
  );

  useEffect(() => {
    const fetchRSSData = async () => {
      const RSSData = await getRSSArticles();
      if (RSSData === null) {
        setDataLoadingStatus(DataLoadingStatuses.error);
      } else if (RSSData === []) {
        setDataLoadingStatus(DataLoadingStatuses.noData);
      } else {
        setRssArticlesList(RSSData);
        setDataLoadingStatus(DataLoadingStatuses.success);
      }
    };

    fetchRSSData();
  }, []);

  const listItemPressCallback = (navigation, articleItemToPassToDetails) => {
    navigation.push(RSSScreensNames.RSSDetails, {
      articleItem: articleItemToPassToDetails,
    });
  };

  const renderRSSListItem = itemData => {
    return (
      <RSSListItem
        articleItem={itemData.item}
        onListItemPress={() => {
          listItemPressCallback(props.navigation, itemData.item);
        }}
      />
    );
  };

  const noDataMessage =
    'No RSS data available at the moment. Please try again later.';

  const errorMessage = 'An error occured. Please try again later.';

  const loadingOutput = (
    <View style={styles.loadingIndicatorAndMessageContainer}>
      <ActivityIndicator
        size={'large'}
        color={
          Platform.OS === 'android' ? Colors.tabNavigatorActiveTintColor : ''
        }
      />
    </View>
  );

  const noDataOrErrorOutput = (
    <View style={styles.loadingIndicatorAndMessageContainer}>
      <Text style={styles.messageText}>
        {dataLoadingStatus === DataLoadingStatuses.noData
          ? noDataMessage
          : errorMessage}
      </Text>
    </View>
  );

  const successOutput = (
    <View style={styles.rssListContainer}>
      <FlatList
        data={rssArticlesList}
        renderItem={item => renderRSSListItem(item, props.navigation)}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  switch (dataLoadingStatus) {
    case DataLoadingStatuses.loading:
      return loadingOutput;
    case DataLoadingStatuses.success:
      return successOutput;
    default:
      return noDataOrErrorOutput;
  }
};

export default RSSListScreen;
