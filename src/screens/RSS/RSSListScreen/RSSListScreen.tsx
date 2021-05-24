import React, { Suspense } from 'react';
import { FlatList, View, RefreshControl } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useQuery, QueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { RSSScreensNames } from '../../../constants/ScreensNames';
import { screenMessages } from '../../../constants/MessageConstants';
import { Colors } from '../../../constants/Colors';

import { RSSArticle } from '../../../models/RSSArticle';

import { getRSSArticles } from '../../../services/data/RSS/RSSDataService';

import RSSListItem from '../../../components/RSS/RSSListItem/RSSListItem';
import ScreenMessageView from '../../../components/General/ScreenMessageView/ScreenMessageView';
import DataLoadingView from '../../../components/General/DataLoadingView/DataLoadingView';

import { RSSStackParamList } from '../../../navigation/RSSNavigator';

import styles from './RSSListScreenStyles';

type RSSListScreenNavigationProp = StackNavigationProp<RSSStackParamList, RSSScreensNames.RSSList>;

type Props = {
  navigation: RSSListScreenNavigationProp;
};

const RSSListScreen: React.FC<Props> = props => {
  
  const listItemPressCallback = (articleItemToPassToDetails: RSSArticle) => {
    props.navigation.push(RSSScreensNames.RSSDetails, {
      articleItem: articleItemToPassToDetails,
    });
  };

  return (
    <View style={{flex: 1}}>
      <QueryErrorResetBoundary>
        { ({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({error, resetErrorBoundary}) => (
              <ScreenMessageView
                messageText={error.name + '/n' + error.message}
                onReloadButtonPress={resetErrorBoundary}
              />
            )}
            >
              <Suspense fallback={<DataLoadingView />}>
                <RSSList listItemPressFunction={listItemPressCallback} />
              </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      </View>
  );

};



type ListProps = {
  listItemPressFunction: (item: RSSArticle) => void;
};

const RSSList: React.FC<ListProps> = props => {
  const { isLoading, data, refetch } = useQuery('fetchRSSFeed', getRSSArticles, {suspense: true});

  const renderRSSListItem = (item: RSSArticle) => {
    return (
      <RSSListItem
        articleItem={item}
        onListItemPress={() => {
          props.listItemPressFunction(item);
        }}
      />
    );
  };

  return (
    <View style={styles.rssListContainer}>
                      <FlatList
                        data={data}
                        refreshControl={<RefreshControl colors={[Colors.tabNavigatorActiveTintColor]} refreshing={isLoading} onRefresh={() => refetch()} />}
                        ListEmptyComponent={<ScreenMessageView
                                              messageText={screenMessages.noDataRSS}
                                              onReloadButtonPress={refetch}
                                            />}
                        renderItem={itemData => renderRSSListItem(itemData.item)}
                        showsVerticalScrollIndicator={false}
                      />
                    </View>
  );
};

export default RSSListScreen;
