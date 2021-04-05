import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RSSScreensNames } from '../../../constants/ScreensNames';
import { DataLoadingStatuses } from '../../../constants/DataLoadingStatuses';
import { screenMessages } from '../../../constants/MessageConstants';

import { RSSArticle } from '../../../models/RSSArticle';

import { getRSSArticles } from '../../../services/data/RSS/RSSDataService';

import RSSListItem from '../../../components/RSS/RSSListItem/RSSListItem';
import DataLoadingView from '../../../components/General/DataLoadingView/DataLoadingView';
import ScreenMessageView from '../../../components/General/ScreenMessageView/ScreenMessageView';

import { RSSStackParamList } from '../../../navigation/RSSNavigator';

import styles from './RSSListScreenStyles';

type RSSListScreenNavigationProp = StackNavigationProp<RSSStackParamList, RSSScreensNames.RSSList>;

type Props = {
  navigation: RSSListScreenNavigationProp;
};

const RSSListScreen: React.FC<Props> = props => {
  const [rssArticlesList, setRssArticlesList] = useState<RSSArticle[]>([]);
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

  const listItemPressCallback = (navigation: RSSListScreenNavigationProp, articleItemToPassToDetails: RSSArticle) => {
    navigation.push(RSSScreensNames.RSSDetails, {
      articleItem: articleItemToPassToDetails,
    });
  };

  const renderRSSListItem = (item: RSSArticle) => {
    return (
      <RSSListItem
        articleItem={item}
        onListItemPress={() => {
          listItemPressCallback(props.navigation, item);
        }}
      />
    );
  };

  const reloadButtonPressCallback = () => {
    setDataLoadingStatus(DataLoadingStatuses.loading);
  };

  const loadingOutput = ( <DataLoadingView /> );

  const noDataOrErrorOutput = (
    <ScreenMessageView
      messageText={dataLoadingStatus === DataLoadingStatuses.noData
                    ? screenMessages.noDataRSS
                    : screenMessages.error}
      onReloadButtonPress={reloadButtonPressCallback}
    />
  );

  const successOutput = (
    <View style={styles.rssListContainer}>
      <FlatList
        data={rssArticlesList}
        renderItem={itemData => renderRSSListItem(itemData.item)}
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
