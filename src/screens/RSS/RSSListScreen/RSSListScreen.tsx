import React from 'react';
import { FlatList, View, RefreshControl } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useQuery } from 'react-query';

import { RSSScreensNames } from '../../../constants/ScreensNames';
import { screenMessages } from '../../../constants/MessageConstants';
import { Colors } from '../../../constants/Colors';

import { RSSArticle } from '../../../models/RSSArticle';

import { getRSSArticles } from '../../../services/data/RSS/RSSDataService';

import RSSListItem from '../../../components/RSS/RSSListItem/RSSListItem';
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

  const noDataOrErrorOutput = (
    <ScreenMessageView
      messageText={queryResult.isError
                    ? screenMessages.error
                    : screenMessages.noDataRSS}
      onReloadButtonPress={reloadButtonPressCallback}
    />
  );

  return (
    <View style={styles.rssListContainer}>
      <FlatList
        data={queryResult.data}
        refreshControl={<RefreshControl colors={[Colors.tabNavigatorActiveTintColor]} refreshing={queryResult.isLoading} onRefresh={() => queryResult.refetch()} />}
        ListEmptyComponent={queryResult.isLoading ? null : noDataOrErrorOutput}
        renderItem={itemData => renderRSSListItem(itemData.item)}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

};

export default RSSListScreen;
