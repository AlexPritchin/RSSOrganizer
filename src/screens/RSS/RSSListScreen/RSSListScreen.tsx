import React from 'react';
import { FlatList, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useQuery } from 'react-query';

import { RSSScreensNames } from '../../../constants/ScreensNames';
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
  const queryResult = useQuery('fetchRSSFeed', getRSSArticles);

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
    queryResult.refetch();
  };

  const loadingOutput = ( <DataLoadingView /> );

  const noDataOrErrorOutput = (
    <ScreenMessageView
      messageText={queryResult.isError
                    ? screenMessages.error
                    : screenMessages.noDataRSS}
      onReloadButtonPress={reloadButtonPressCallback}
    />
  );

  const successOutput = (
    <View style={styles.rssListContainer}>
      <FlatList
        data={queryResult.data}
        renderItem={itemData => renderRSSListItem(itemData.item)}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  if (queryResult.isLoading) {
    return loadingOutput;
  }
  if (queryResult.isSuccess) {
    return successOutput;
  }
  return noDataOrErrorOutput;
};

export default RSSListScreen;
