import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';

import { RSSScreensNames } from '../../../constants/ScreensNames';
import { DataLoadingStatuses } from '../../../constants/DataLoadingStatuses';

import { getRSSArticles } from '../../../services/data/RSS/RSSDataService';

import RSSListItem from '../../../components/RSS/RSSListItem/RSSListItem';
import DataLoadingView from '../../../components/General/DataLoadingView/DataLoadingView';
import ScreenMessageView from '../../../components/General/ScreenMessageView/ScreenMessageView';

import styles from './RSSListScreenStyles';

const RSSListScreen = props => {
  const [rssArticlesList, setRssArticlesList] = useState([]);
  const [dataLoadingStatus, setDataLoadingStatus] = useState(
    DataLoadingStatuses.loading
  );

  useEffect(() => {
    const fetchRSSData = async () => {
      try {
        const RSSData = await getRSSArticles();
        if (RSSData.length === 0) {
          setDataLoadingStatus(DataLoadingStatuses.noData);
        } else {
          setRssArticlesList(RSSData);
          setDataLoadingStatus(DataLoadingStatuses.success);
        }
      } catch (error) {
        setDataLoadingStatus(DataLoadingStatuses.error);
      }
    };

    if (dataLoadingStatus === DataLoadingStatuses.loading) {
      fetchRSSData();
    }
  }, [dataLoadingStatus]);

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

  const reloadButtonPressCallback = () => {
    setDataLoadingStatus(DataLoadingStatuses.loading);
  };

  const noDataMessage =
    'No RSS data available at the moment. Please try again later.';

  const errorMessage = 'An error occured. Please try again later.';

  const loadingOutput = ( <DataLoadingView /> );

  const noDataOrErrorOutput = (
    <ScreenMessageView
      messageText={dataLoadingStatus === DataLoadingStatuses.noData
                    ? noDataMessage
                    : errorMessage}
      onReloadButtonPress={reloadButtonPressCallback}
    />
  );

  const successOutput = (
    <View style={styles.rssListContainer}>
      <FlatList
        data={rssArticlesList}
        renderItem={item => renderRSSListItem(item)}
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
