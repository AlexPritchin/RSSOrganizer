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
  const { isLoading, isError, data, refetch } = useQuery('fetchRSSFeed', getRSSArticles);

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
    refetch();
  };

  const noDataOrErrorOutput = (
    <ScreenMessageView
      messageText={isError
                    ? screenMessages.error
                    : screenMessages.noDataRSS}
      onReloadButtonPress={reloadButtonPressCallback}
    />
  );

  return (
    <View style={styles.rssListContainer}>
      <FlatList
        data={data}
        refreshControl={<RefreshControl colors={[Colors.tabNavigatorActiveTintColor]} refreshing={isLoading} onRefresh={() => refetch()} />}
        ListEmptyComponent={isLoading ? null : noDataOrErrorOutput}
        renderItem={itemData => renderRSSListItem(itemData.item)}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

};

export default RSSListScreen;
